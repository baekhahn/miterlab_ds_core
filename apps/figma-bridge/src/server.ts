import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { DesignPrompt } from "../../../packages/figma-generator/src/types/designPrompt";
import { createPromptFromMakerPrompt, createPromptFromScreen } from "./promptLibrary";
import { generateFromPrompt } from "./generate";
import { analyzeSelectionNodeViaMcp, extractViaMcp, refreshExtractedDocs } from "./extractViaMcp";
import type { GenerateFromPromptRequest, GenerateScreenRequest } from "./contracts/generateScreenRequest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../..");
const port = Number(process.env.PORT ?? 8787);
const host = process.env.HOST ?? "127.0.0.1";
const defaultTheme = process.env.BRIDGE_DEFAULT_THEME ?? "core";
const artifactsDir = path.resolve(repoRoot, "artifacts/bridge");
const figmaSelectionsDir = path.resolve(repoRoot, "artifacts/figma-selections");
const componentBlueprintsDir = path.resolve(repoRoot, "artifacts/component-blueprints");
const figmaRawDir = path.resolve(repoRoot, "artifacts/figma-raw");
const figmaMcpExtractionsDir = path.resolve(repoRoot, "artifacts/figma-extractions");
const figmaPromotionsDir = path.resolve(repoRoot, "artifacts/figma-promotions");

const json = (status: number, payload: unknown) => {
  return {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type"
    },
    body: `${JSON.stringify(payload, null, 2)}\n`
  };
};

const readJsonBody = async <T>(req: http.IncomingMessage): Promise<T> => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf-8").trim();
  if (!raw) {
    return {} as T;
  }
  return JSON.parse(raw) as T;
};

const write = (res: http.ServerResponse, response: { status: number; headers: Record<string, string>; body: string }) => {
  res.writeHead(response.status, response.headers);
  res.end(response.body);
};

const writeArtifact = (name: string, data: unknown) => {
  fs.mkdirSync(artifactsDir, { recursive: true });
  fs.writeFileSync(path.resolve(artifactsDir, name), `${JSON.stringify(data, null, 2)}\n`, "utf-8");
};

const sanitizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "") || "figma-extraction";

const sanitizeFileSegment = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "") || "selection";

const isInputComponentName = (value?: string) => Boolean(value && /(textinput|textfield|input)/i.test(value));

const deriveInputBlueprintFromRaw = (rawComponent?: {
  name?: string;
  extractedAt?: string;
  rootType?: string;
  document?: Record<string, unknown>;
}) => {
  if (!rawComponent?.document || !isInputComponentName(rawComponent.name)) return undefined;

  const document = rawComponent.document as {
    type?: string;
    name?: string;
    children?: Array<Record<string, unknown>>;
    size?: { width?: number; height?: number };
    autoLayout?: {
      paddingTop?: number;
      paddingRight?: number;
      paddingBottom?: number;
      paddingLeft?: number;
      itemSpacing?: number;
      layoutMode?: string;
    };
    cornerRadius?: number;
    component?: {
      componentPropertyDefinitions?: Record<string, unknown>;
    };
    layoutSizing?: {
      layoutSizingHorizontal?: string;
      layoutSizingVertical?: string;
    };
    sizeLimits?: {
      minWidth?: number;
      maxWidth?: number;
      minHeight?: number;
      maxHeight?: number;
    };
  };

  const representative =
    document.type === "COMPONENT_SET"
      ? document.children?.find((child) => child.type === "COMPONENT")
      : document;

  const node = (representative ?? document) as {
    size?: { width?: number; height?: number };
    autoLayout?: {
      paddingTop?: number;
      paddingRight?: number;
      paddingBottom?: number;
      paddingLeft?: number;
      itemSpacing?: number;
      layoutMode?: string;
    };
    cornerRadius?: number;
    layoutSizing?: {
      layoutSizingHorizontal?: string;
      layoutSizingVertical?: string;
    };
    sizeLimits?: {
      minWidth?: number;
      maxWidth?: number;
      minHeight?: number;
      maxHeight?: number;
    };
  };

  return {
    targetComponent: "Input",
    sourceComponentName: rawComponent.name ?? document.name ?? "Input",
    updatedAt: rawComponent.extractedAt ?? new Date().toISOString(),
    metrics: {
      width: node.size?.width,
      height: node.size?.height,
      paddingTop: node.autoLayout?.paddingTop,
      paddingRight: node.autoLayout?.paddingRight,
      paddingBottom: node.autoLayout?.paddingBottom,
      paddingLeft: node.autoLayout?.paddingLeft,
      itemSpacing: node.autoLayout?.itemSpacing,
      radius: node.cornerRadius,
      layoutMode: node.autoLayout?.layoutMode,
      layoutSizingHorizontal: node.layoutSizing?.layoutSizingHorizontal,
      layoutSizingVertical: node.layoutSizing?.layoutSizingVertical,
      minWidth: node.sizeLimits?.minWidth,
      maxWidth: node.sizeLimits?.maxWidth,
      minHeight: node.sizeLimits?.minHeight,
      maxHeight: node.sizeLimits?.maxHeight
    },
    properties: {
      keys: Object.keys(document.component?.componentPropertyDefinitions ?? {})
    }
  };
};

const inferMakerScreen = (prompt: string) => {
  const normalized = prompt.toLowerCase();
  if (/(login|log in|sign in|로그인|로그 인|signin)/i.test(normalized)) return "login";
  if (/(settings|setting|설정|preferences)/i.test(normalized)) return "settings";
  if (/(dashboard|대시보드)/i.test(normalized)) return "dashboard";
  if (/(list|목록|리스트|filter|검색결과)/i.test(normalized)) return "list";
  return "login";
};

type MakerSelectionSummary = {
  fileKey?: string;
  pageName?: string;
  nodeIds?: string[];
  primaryName?: string;
  primaryType?: string;
  selectionCount?: number;
  selectionIntent?: {
    kind?: "single-component" | "component-group" | "section" | "screen-fragment" | "unknown";
    componentKinds?: string[];
    parentName?: string | null;
    notes?: string[];
  };
  nodes?: Array<{
    id?: string;
    name?: string;
    type?: string;
    isFigmaComponent?: boolean;
    componentRole?: string;
    mainComponentName?: string | null;
    variantProperties?: Record<string, string | boolean>;
  }>;
};

const looksLikeFullWidthPrompt = (value: string) =>
  /(full|full width|가득|꽉|채워|좌우 full|전체 너비|좌우 폭|폭 늘려)/i.test(value);

const looksLikeCenterAlignPrompt = (value: string) =>
  /(가운데 정렬|중앙 정렬|센터 정렬|center align|centered|가운데로|중앙으로)/i.test(value);

const buildMakerAnalysisNode = (selectionSummary: MakerSelectionSummary) => {
  const primaryNode = selectionSummary.nodes?.[0];
  const nodeId = primaryNode?.id ?? selectionSummary.nodeIds?.[0];
  if (!selectionSummary.fileKey || !nodeId) return null;

  return {
    id: nodeId,
    name: primaryNode?.name ?? selectionSummary.primaryName ?? "selection",
    type: primaryNode?.type ?? selectionSummary.primaryType ?? "UNKNOWN",
    url:
      primaryNode?.url ??
      `https://www.figma.com/design/${selectionSummary.fileKey}/${encodeURIComponent("selection")}?node-id=${nodeId.replace(":", "-")}`,
    isFigmaComponent: Boolean(primaryNode?.isFigmaComponent),
    componentRole: primaryNode?.componentRole ?? "node",
    mainComponentName: primaryNode?.mainComponentName ?? null,
    componentKey: undefined,
    variantProperties: primaryNode?.variantProperties ?? undefined
  } as const;
};

const inferDirectEditIntent = async (rawPrompt: string, selectionSummary?: MakerSelectionSummary) => {
  if (!selectionSummary) return null;
  if (!looksLikeFullWidthPrompt(rawPrompt) && !looksLikeCenterAlignPrompt(rawPrompt)) {
    return null;
  }

  const analysisNode = buildMakerAnalysisNode(selectionSummary);
  if (!analysisNode) {
    return null;
  }

  const mcp = await analyzeSelectionNodeViaMcp(selectionSummary.fileKey!, analysisNode);
  const selectionIntentKind = selectionSummary.selectionIntent?.kind ?? "unknown";
  const hasContainerChildren = selectionIntentKind === "section" || selectionIntentKind === "screen-fragment";

  if (looksLikeFullWidthPrompt(rawPrompt)) {
    return {
      kind: "direct-edit" as const,
      targetScope: hasContainerChildren ? "container-children" as const : "selection" as const,
      message:
        hasContainerChildren
          ? "선택된 container 안의 요소를 full width로 맞춥니다."
          : "선택된 요소를 full width로 맞춥니다.",
      commands: hasContainerChildren
        ? [
            { type: "set-node-layout-align", value: "STRETCH" as const },
            { type: "set-node-layout-sizing-horizontal", value: "FILL" as const },
            { type: "set-node-layout-grow", value: 0 }
          ]
        : [
            { type: "set-node-layout-align", value: "STRETCH" as const },
            { type: "set-node-layout-sizing-horizontal", value: "FILL" as const },
            { type: "resize-node-width-to-parent-inner" as const }
          ],
      analysis: {
        componentName: mcp.component.mainComponentName ?? mcp.component.name,
        role: mcp.component.role,
        resolvedStructureKind: mcp.resolvedStructure.kind,
        selectionIntentKind
      },
      mcp
    };
  }

  if (looksLikeCenterAlignPrompt(rawPrompt)) {
    return {
      kind: "direct-edit" as const,
      targetScope: hasContainerChildren ? "container" as const : "selection" as const,
      message:
        hasContainerChildren
          ? "선택된 container의 정렬을 가운데 기준으로 맞춥니다."
          : "선택된 요소를 가운데 정렬합니다.",
      commands: hasContainerChildren
        ? [
            { type: "set-container-cross-align", value: "CENTER" as const },
            { type: "set-node-layout-align", value: "INHERIT" as const },
            { type: "set-node-layout-grow", value: 0 },
            { type: "shrink-node-to-hug-content" as const }
          ]
        : [
            { type: "set-container-cross-align", value: "CENTER" as const },
            { type: "set-node-layout-align", value: "INHERIT" as const },
            { type: "set-node-layout-grow", value: 0 },
            { type: "shrink-node-to-hug-content" as const },
            { type: "center-node-in-parent" as const }
          ],
      analysis: {
        componentName: mcp.component.mainComponentName ?? mcp.component.name,
        role: mcp.component.role,
        resolvedStructureKind: mcp.resolvedStructure.kind,
        selectionIntentKind
      },
      mcp
    };
  }

  return null;
};

const looksLikeInput = (node?: {
  name?: string;
  mainComponentName?: string | null;
  type?: string;
}) => /(input|textinput|textfield|text field|field)/i.test(`${node?.name ?? ""} ${node?.mainComponentName ?? ""} ${node?.type ?? ""}`);

const looksLikeButton = (node?: {
  name?: string;
  mainComponentName?: string | null;
  type?: string;
}) => /(button|cta|action)/i.test(`${node?.name ?? ""} ${node?.mainComponentName ?? ""} ${node?.type ?? ""}`);

const inferSelectionPrompt = (rawPrompt: string, selectionSummary?: MakerSelectionSummary): DesignPrompt | null => {
  if (!selectionSummary) return null;

  const normalized = rawPrompt.toLowerCase();
  const wantsFullWidth = /(full|full width|가득|꽉|채워|좌우 full|전체 너비)/i.test(normalized);
  if (!wantsFullWidth) return null;

  const selectedNodes = selectionSummary.nodes ?? [];
  const inputNodes = selectedNodes.filter((node) => looksLikeInput(node));
  const buttonNodes = selectedNodes.filter((node) => looksLikeButton(node));
  const selectionIntent = selectionSummary.selectionIntent;
  const isFormSection =
    selectionIntent?.kind === "section" ||
    /form|login|로그인|input|field/i.test(selectionSummary.primaryName ?? "") ||
    /form|field/i.test(selectionIntent?.parentName ?? "");

  const impliedInputKinds = selectionIntent?.componentKinds?.includes("input");
  const impliedButtonKinds = selectionIntent?.componentKinds?.includes("button");
  const inputCount = inputNodes.length > 0 ? inputNodes.length : impliedInputKinds || isFormSection ? 2 : 0;
  const buttonCount = buttonNodes.length > 0 ? buttonNodes.length : impliedButtonKinds ? 1 : 0;

  if (inputCount === 0 && buttonCount === 0) {
    return null;
  }

  const components: DesignPrompt["components"] = [];

  for (let index = 0; index < inputCount; index += 1) {
    const source = inputNodes[index];
    const label =
      source?.name ??
      (inputCount >= 2
        ? index === 0
          ? "아이디"
          : "비밀번호"
        : "입력값");

    components.push({
      type: "input",
      section: "form",
      intent: index === 1 && inputCount >= 2 ? "text-input" : "text-input",
      label,
      size: "md",
      width: "full",
      fullWidth: true
    });
  }

  for (let index = 0; index < buttonCount; index += 1) {
    const source = buttonNodes[index];
    components.push({
      type: "button",
      section: "action",
      intent: index === 0 ? "primary-action" : "secondary-action",
      label: source?.name ?? (index === 0 ? "확인" : "보조 액션"),
      size: "md",
      width: "full",
      fullWidth: true,
      variant: index === 0 ? "primary" : "neutral"
    });
  }

  return {
    screen: "selection-refine",
    theme: defaultTheme,
    density: "comfortable",
    sections: buttonCount > 0 ? ["form", "action"] : ["form"],
    primaryAction: buttonCount > 0 ? "Apply selection changes" : undefined,
    components
  };
};

const server = http.createServer(async (req, res) => {
  const method = req.method ?? "GET";
  const url = req.url ?? "/";

  if (method === "OPTIONS") {
    write(res, json(200, { ok: true }));
    return;
  }

  if (method === "GET" && url === "/health") {
    write(
      res,
      json(200, {
        ok: true,
        service: "miterlab-figma-bridge",
        time: new Date().toISOString()
      })
    );
    return;
  }

  if (method === "POST" && url === "/generate-screen") {
    try {
      const body = await readJsonBody<GenerateScreenRequest>(req);
      const screen = (body.screen ?? "login").trim();
      const theme = (body.theme ?? defaultTheme).trim();
      const prompt = createPromptFromScreen(screen, theme);
      const result = generateFromPrompt(prompt, body.project);
      writeArtifact("last-generate-screen.json", result);
      write(res, json(200, result));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/generate-from-prompt") {
    try {
      const body = await readJsonBody<GenerateFromPromptRequest>(req);
      if (!body.prompt) {
        write(res, json(400, { error: "prompt is required" }));
        return;
      }
      const result = generateFromPrompt(body.prompt);
      writeArtifact("last-generate-from-prompt.json", result);
      write(res, json(200, result));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/maker-generate") {
    try {
      const body = await readJsonBody<{
        prompt?: string;
        selectionSummary?: MakerSelectionSummary;
      }>(req);

      const rawPrompt = body.prompt?.trim();
      if (!rawPrompt) {
        write(res, json(400, { error: "prompt is required" }));
        return;
      }

      const selectionPrompt = inferSelectionPrompt(rawPrompt, body.selectionSummary);
      const inferredScreen = selectionPrompt ? "selection-refine" : inferMakerScreen(rawPrompt);
      const result = generateFromPrompt(
        selectionPrompt ?? createPromptFromMakerPrompt(rawPrompt, defaultTheme)
      );
      writeArtifact("last-maker-generate.json", {
        prompt: rawPrompt,
        inferredScreen,
        selectionSummary: body.selectionSummary ?? null,
        result
      });
      write(
        res,
        json(200, {
          ...result,
          maker: {
            prompt: rawPrompt,
            inferredScreen
          }
        })
      );
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/maker-analyze") {
    try {
      const body = await readJsonBody<{
        prompt?: string;
        selectionSummary?: MakerSelectionSummary;
      }>(req);
      const rawPrompt = body.prompt?.trim();
      if (!rawPrompt) {
        write(res, json(400, { error: "prompt is required" }));
        return;
      }

      const intent = await inferDirectEditIntent(rawPrompt, body.selectionSummary);
      if (!intent) {
        write(
          res,
          json(200, {
            ok: true,
            directEdit: null
          })
        );
        return;
      }

      writeArtifact("last-maker-analyze.json", {
        prompt: rawPrompt,
        selectionSummary: body.selectionSummary ?? null,
        directEdit: intent
      });

      write(
        res,
        json(200, {
          ok: true,
          directEdit: intent
        })
      );
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/save-extraction") {
    try {
      const body = await readJsonBody<{
        extractionKey?: string;
        extractionName?: string;
        snapshot?: {
          key?: string;
          name?: string;
          updatedAt?: string;
          parts?: Record<string, unknown>;
        };
        inputBlueprint?: unknown;
        rawComponent?: {
          key?: string;
          name?: string;
          extractedAt?: string;
          rootType?: string;
          document?: Record<string, unknown>;
        };
      }>(req);

      if (!body.extractionKey || !body.snapshot) {
        write(res, json(400, { error: "extractionKey and snapshot are required" }));
        return;
      }

      const saved: string[] = [];
      fs.mkdirSync(figmaSelectionsDir, { recursive: true });
      const extractionPath = path.resolve(figmaSelectionsDir, `${sanitizeFileSegment(body.extractionKey)}.json`);
      const existingSnapshot =
        fs.existsSync(extractionPath)
          ? (JSON.parse(fs.readFileSync(extractionPath, "utf-8")) as {
              name?: string;
              savedAt?: string;
              snapshot?: { key?: string; name?: string; updatedAt?: string; parts?: Record<string, unknown> };
            })
          : undefined;
      const mergedParts = {
        ...(existingSnapshot?.snapshot?.parts ?? {}),
        ...(body.snapshot?.parts ?? {})
      };
      fs.writeFileSync(
        extractionPath,
        `${JSON.stringify(
          {
            name: body.extractionName ?? body.extractionKey,
            savedAt: new Date().toISOString(),
            snapshot: {
              key: body.snapshot?.key ?? body.extractionKey,
              name: body.snapshot?.name ?? body.extractionName ?? body.extractionKey,
              updatedAt: body.snapshot?.updatedAt ?? new Date().toISOString(),
              parts: mergedParts
            }
          },
          null,
          2
        )}\n`,
        "utf-8"
      );
      saved.push(extractionPath);

      if (body.rawComponent?.document) {
        fs.mkdirSync(figmaRawDir, { recursive: true });
        const rawPath = path.resolve(
          figmaRawDir,
          `${sanitizeFileSegment(body.rawComponent.key ?? body.extractionKey)}.raw.json`
        );
        fs.writeFileSync(
          rawPath,
          `${JSON.stringify(
            {
              name: body.rawComponent.name ?? body.extractionName ?? body.extractionKey,
              extractedAt: body.rawComponent.extractedAt ?? new Date().toISOString(),
              rootType: body.rawComponent.rootType ?? "UNKNOWN",
              document: body.rawComponent.document
            },
            null,
            2
          )}\n`,
          "utf-8"
        );
        saved.push(rawPath);
      }

      const normalizedInputBlueprint = deriveInputBlueprintFromRaw(body.rawComponent) ?? body.inputBlueprint;

      if (normalizedInputBlueprint) {
        fs.mkdirSync(componentBlueprintsDir, { recursive: true });
        const inputBlueprintPath = path.resolve(componentBlueprintsDir, "input.json");
        fs.writeFileSync(inputBlueprintPath, `${JSON.stringify(normalizedInputBlueprint, null, 2)}\n`, "utf-8");
        saved.push(inputBlueprintPath);
      }

      write(res, json(200, { ok: true, saved }));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/load-extraction") {
    try {
      const body = await readJsonBody<{ extractionKey?: string }>(req);
      if (!body.extractionKey) {
        write(res, json(400, { error: "extractionKey is required" }));
        return;
      }
      const rawPath = path.resolve(figmaRawDir, `${sanitizeFileSegment(body.extractionKey)}.raw.json`);
      if (!fs.existsSync(rawPath)) {
        write(res, json(404, { error: `raw extraction not found: ${rawPath}` }));
        return;
      }
      const raw = JSON.parse(fs.readFileSync(rawPath, "utf-8"));
      write(res, json(200, { ok: true, key: body.extractionKey, raw }));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/extract-via-mcp") {
    try {
      const body = await readJsonBody<{
        extractionName?: string;
        selectionSvg?: string;
        reference?: {
          fileKey?: string;
          pageName?: string;
          selectionCount?: number;
          nodes?: Array<{
            id?: string;
            name?: string;
            type?: string;
            url?: string;
            isFigmaComponent?: boolean;
            componentRole?: "instance" | "component" | "component-set" | "node";
            mainComponentName?: string | null;
            componentKey?: string;
            variantProperties?: Record<string, string | boolean>;
          }>;
        };
      }>(req);

      if (!body.reference?.fileKey || !Array.isArray(body.reference.nodes) || body.reference.nodes.length === 0) {
        write(res, json(400, { error: "reference.fileKey and reference.nodes are required" }));
        return;
      }

      const result = await extractViaMcp({
        extractionName: body.extractionName ?? body.reference.nodes[0]?.name ?? "figma-selection",
        outputDir: figmaMcpExtractionsDir,
        selectionSvg: typeof body.selectionSvg === "string" ? body.selectionSvg : undefined,
        reference: {
          fileKey: body.reference.fileKey,
          pageName: body.reference.pageName ?? "",
          selectionCount: body.reference.selectionCount ?? body.reference.nodes.length,
          nodes: body.reference.nodes.map((node) => ({
            id: node.id ?? "",
            name: node.name ?? "node",
            type: node.type ?? "UNKNOWN",
            url: node.url ?? "",
            isFigmaComponent: Boolean(node.isFigmaComponent),
            componentRole: node.componentRole ?? "node",
            mainComponentName: node.mainComponentName ?? null,
            componentKey: node.componentKey,
            variantProperties: node.variantProperties ?? undefined
          }))
        }
      });

      write(res, json(200, result));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/extraction-status") {
    try {
      const body = await readJsonBody<{ extractionName?: string }>(req);
      if (!body.extractionName) {
        write(res, json(400, { error: "extractionName is required" }));
        return;
      }

      const summaryPath = path.resolve(
        figmaMcpExtractionsDir,
        sanitizeSlug(body.extractionName),
        "summary.json"
      );

      if (!fs.existsSync(summaryPath)) {
        write(res, json(404, { error: "summary not found" }));
        return;
      }

      const summary = JSON.parse(fs.readFileSync(summaryPath, "utf-8"));
      write(res, json(200, summary));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/delete-extraction") {
    try {
      const body = await readJsonBody<{ slug?: string }>(req);
      const slug = sanitizeSlug(body.slug ?? "");
      if (!slug) {
        write(res, json(400, { error: "slug is required" }));
        return;
      }

      const targetDir = path.resolve(figmaMcpExtractionsDir, slug);
      if (!fs.existsSync(targetDir)) {
        write(res, json(404, { error: "extraction not found" }));
        return;
      }

      fs.rmSync(targetDir, { recursive: true, force: true });
      await refreshExtractedDocs();
      write(res, json(200, { ok: true, slug }));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  if (method === "POST" && url === "/promote-extraction") {
    try {
      const body = await readJsonBody<{ slug?: string }>(req);
      const slug = sanitizeSlug(body.slug ?? "");
      if (!slug) {
        write(res, json(400, { error: "slug is required" }));
        return;
      }

      const targetDir = path.resolve(figmaMcpExtractionsDir, slug);
      const summaryPath = path.resolve(targetDir, "summary.json");
      if (!fs.existsSync(summaryPath)) {
        write(res, json(404, { error: "summary not found" }));
        return;
      }

      const summary = JSON.parse(fs.readFileSync(summaryPath, "utf-8"));
      const next = {
        ...summary,
        promotionStatus: "accepted",
        promotedAt: new Date().toISOString()
      };

      fs.writeFileSync(summaryPath, `${JSON.stringify(next, null, 2)}\n`, "utf-8");
      fs.mkdirSync(figmaPromotionsDir, { recursive: true });
      fs.writeFileSync(path.resolve(figmaPromotionsDir, `${slug}.json`), `${JSON.stringify(next, null, 2)}\n`, "utf-8");
      await refreshExtractedDocs();
      write(res, json(200, { ok: true, slug, promotedAt: next.promotedAt }));
      return;
    } catch (error) {
      write(
        res,
        json(400, {
          error: error instanceof Error ? error.message : String(error)
        })
      );
      return;
    }
  }

  write(res, json(404, { error: "Not found" }));
});

server.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`[figma-bridge] listening on http://${host}:${port}`);
});
