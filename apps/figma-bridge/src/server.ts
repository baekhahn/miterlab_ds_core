import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPromptFromScreen } from "./promptLibrary";
import { generateFromPrompt } from "./generate";
import { extractViaMcp, refreshExtractedDocs } from "./extractViaMcp";
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

  write(res, json(404, { error: "Not found" }));
});

server.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`[figma-bridge] listening on http://${host}:${port}`);
});
