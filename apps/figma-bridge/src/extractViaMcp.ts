import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createHttpMcpClient } from "../../../packages/figma-generator/src/mcp/client/httpMcpClient";

export interface ExtractionReference {
  fileKey: string;
  pageName: string;
  selectionCount: number;
  nodes: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    isFigmaComponent: boolean;
    componentRole: "instance" | "component" | "component-set" | "node";
    mainComponentName?: string | null;
    componentKey?: string;
    variantProperties?: Record<string, string | boolean>;
  }>;
}

export interface ExtractViaMcpInput {
  extractionName: string;
  outputDir: string;
  reference: ExtractionReference;
  selectionSvg?: string;
}

export interface MakerSelectionMcpAnalysis {
  component: ExtractionNodeSummary["component"];
  figmaProperties?: ExtractionNodeSummary["figmaProperties"];
  figmaVariants?: ExtractionNodeSummary["figmaVariants"];
  properties: ExtractionNodeSummary["properties"];
  nestedInstances: ExtractionNodeSummary["nestedInstances"];
  resolvedStructure: ExtractionNodeSummary["resolvedStructure"];
  semantics: ExtractionNodeSummary["semantics"];
  metrics: ExtractionNodeSummary["metrics"];
}

type ExtractedNodeArtifacts = {
  node: ExtractionReference["nodes"][number];
  metadata: unknown;
  designContext: unknown;
  screenshot: unknown;
};

type ExtractionInsight = {
  kind: string;
  headline: string;
  structure: string[];
  notes: string[];
  metrics: string[];
  detectedSlots: string[];
};

type ExtractionNodeSummary = {
  component: {
    name: string;
    type: string;
    isFigmaComponent: boolean;
    role: ExtractionReference["nodes"][number]["componentRole"];
    mainComponentName: string | null;
  };
  figmaProperties?: Array<{
    name: string;
    values: string[];
  }>;
  figmaVariants?: Array<{
    id: string;
    name: string;
    signature: string[];
  }>;
  figmaInstances?: Array<{
    name: string;
    role: string;
  }>;
  properties: {
    variantProperties: Record<string, string | boolean>;
    enabled: string[];
    summary: string[];
    groups: Array<{
      label: string;
      items: string[];
    }>;
    hierarchy: Array<{
      name: string;
      value: string;
      children: Array<{
        name: string;
        value: string;
      }>;
    }>;
  };
  nestedInstances: {
    present: string[];
    available: string[];
  };
  resolvedStructure: {
    kind: string;
    slots: string[];
    flow: string[];
  };
  semantics: {
    headline: string;
    notes: string[];
  };
  metrics: string[];
};

const FIGMA_SKILL_PATH = "/Users/baekhahnwork/.codex/skills/figma/SKILL.md";
const REPO_ROOT = path.resolve(new URL("../..", import.meta.url).pathname, "..");
const execFileAsync = promisify(execFile);
const GENERATED_EXTRACTED_SCRIPT = path.resolve(REPO_ROOT, "apps/docs/scripts/generate-extracted.mjs");

const sanitize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "") || "figma-extraction";

const normalizeMcpNodeId = (value: string) => {
  const raw = String(value).trim();
  if (!raw) return raw;

  const direct = raw.match(/^\d+:\d+$/);
  if (direct) return raw;

  const dashed = raw.match(/^\d+-\d+$/);
  if (dashed) return raw.replace("-", ":");

  const embedded = raw.match(/(\d+[:-]\d+)/);
  if (embedded?.[1]) {
    return embedded[1].replace("-", ":");
  }

  return raw;
};

const writeJson = (filePath: string, value: unknown) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf-8");
};

const readJson = <T>(filePath: string): T | null => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return null;
  }
};

const collectToolTexts = (result: unknown) => {
  if (!result || typeof result !== "object") return [];
  const content = (result as { content?: unknown }).content;
  if (!Array.isArray(content)) return [];
  return content
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const type = (item as { type?: unknown }).type;
      const text = (item as { text?: unknown }).text;
      if (type !== "text" || typeof text !== "string") return null;
      return text;
    })
    .filter((item): item is string => Boolean(item));
};

const unique = (items: string[]) => [...new Set(items)];

const formatPropertyValue = (value: string | boolean | undefined) => {
  if (value === undefined || value === "") return undefined;
  if (value === true || value === "True" || value === "true") return "on";
  if (value === false || value === "False" || value === "false") return "off";
  return String(value);
};

const getPropertyValue = (
  variantProperties: Record<string, string | boolean>,
  candidates: string[]
): string | boolean | undefined => {
  for (const candidate of candidates) {
    const entry = Object.entries(variantProperties).find(([key]) => key === candidate || key.startsWith(`${candidate}#`));
    if (entry) {
      return entry[1];
    }
  }
  return undefined;
};

const summarizeVariantProperties = (variantProperties: Record<string, string | boolean>) => {
  const items: string[] = [];
  const push = (label: string, value: string | boolean | undefined) => {
    const formatted = formatPropertyValue(value);
    if (!formatted) return;
    items.push(`${label}: ${formatted}`);
  };

  push("Trailing Button", getPropertyValue(variantProperties, ["Trailing Button", "Button"]));
  push("Status", getPropertyValue(variantProperties, ["Status"]));
  push("Active", getPropertyValue(variantProperties, ["Active"]));
  push("Focus", getPropertyValue(variantProperties, ["Focus"]));
  push("Disable", getPropertyValue(variantProperties, ["Disable"]));
  push("Label", getPropertyValue(variantProperties, ["Label"]));
  push("Placeholder", getPropertyValue(variantProperties, ["Placeholder"]));
  push("Leading Content", getPropertyValue(variantProperties, ["Leading Content"]));
  push("Trailing Content", getPropertyValue(variantProperties, ["Trailing Content"]));
  push("Heading", getPropertyValue(variantProperties, ["Heading"]));
  push("Description", getPropertyValue(variantProperties, ["Description"]));

  return unique(items);
};

const buildPropertyGroups = (variantProperties: Record<string, string | boolean>) => {
  const group = (label: string, entries: Array<[string, string | boolean | undefined]>) => ({
    label,
    items: entries
      .map(([name, value]) => {
        const formatted = formatPropertyValue(value);
        return formatted ? `${name}: ${formatted}` : null;
      })
      .filter((item): item is string => Boolean(item))
  });

  return [
    group("State", [
      ["Status", getPropertyValue(variantProperties, ["Status"])],
      ["Active", getPropertyValue(variantProperties, ["Active"])],
      ["Focus", getPropertyValue(variantProperties, ["Focus"])],
      ["Disable", getPropertyValue(variantProperties, ["Disable"])]
    ]),
    group("Content", [
      ["Label", getPropertyValue(variantProperties, ["Label"])],
      ["Placeholder", getPropertyValue(variantProperties, ["Placeholder"])],
      ["Heading", getPropertyValue(variantProperties, ["Heading"])],
      ["Description", getPropertyValue(variantProperties, ["Description"])]
    ]),
    group("Adornments", [
      ["Trailing Button", getPropertyValue(variantProperties, ["Trailing Button", "Button"])],
      ["Leading Content", getPropertyValue(variantProperties, ["Leading Content"])],
      ["Trailing Content", getPropertyValue(variantProperties, ["Trailing Content"])]
    ])
  ].filter((entry) => entry.items.length > 0);
};

const normalizePropertyLabel = (key: string) =>
  key
    .replace(/#.*/, "")
    .replace(/\u200b/g, "")
    .replace(/^┗\s*/, "")
    .trim();

const buildPropertyHierarchy = (variantProperties: Record<string, string | boolean>) => {
  const hierarchy: Array<{
    name: string;
    value: string;
    children: Array<{
      name: string;
      value: string;
    }>;
  }> = [];

  let currentParent:
    | {
        name: string;
        value: string;
        children: Array<{
          name: string;
          value: string;
        }>;
      }
    | undefined;

  for (const [rawKey, rawValue] of Object.entries(variantProperties)) {
    const value = formatPropertyValue(rawValue);
    if (!value) continue;

    const isChild = rawKey.trim().startsWith("┗");
    const normalizedKey = normalizePropertyLabel(rawKey);

    if (isChild && currentParent) {
      currentParent.children.push({
        name: normalizedKey,
        value
      });
      continue;
    }

    currentParent = {
      name: normalizedKey,
      value,
      children: []
    };
    hierarchy.push(currentParent);
  }

  return hierarchy;
};

const buildNestedInstances = (designCode: string, variantProperties: Record<string, string | boolean>) => {
  const dataNames = unique(
    Array.from(designCode.matchAll(/data-name="([^"]+)"/g), (match) => match[1].trim())
  );

  const present = unique(
    dataNames.filter((name) =>
      [
        "Background",
        "Icon",
        "Leading Content",
        "Trailing Content",
        "Trailing Content 2",
        "Trailing Button",
        "Menu"
      ].includes(name)
    )
  );

  const available = unique(
    [
      ...present,
      ...(Object.keys(variantProperties)
        .map((key) => normalizePropertyLabel(key))
        .flatMap((key) => {
          if (key === "Button" || key === "Trailing Button") return ["Trailing Button"];
          if (key === "Leading Content") return ["Leading Content"];
          if (key === "Trailing Content") return ["Trailing Content", "Trailing Content 2"];
          if (key === "Menu") return ["Menu", "Icon"];
          return [];
        }) ?? [])
    ].filter(Boolean)
  );

  return { present, available };
};

const parseVariantSignature = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const buildComponentSetSummary = (node: ExtractionReference["nodes"][number], metadataXml: string) => {
  const symbolMatches = Array.from(
    metadataXml.matchAll(/<symbol id="([^"]+)" name="([^"]+)"[^>]*\/>/g),
    (match) => ({
      id: match[1],
      name: match[2],
      signature: parseVariantSignature(match[2])
    })
  );

  const propertyMap = new Map<string, Set<string>>();
  for (const variant of symbolMatches) {
    for (const token of variant.signature) {
      const [rawName, rawValue] = token.split("=");
      const name = rawName?.trim();
      const value = rawValue?.trim();
      if (!name || !value) continue;
      if (!propertyMap.has(name)) propertyMap.set(name, new Set());
      propertyMap.get(name)?.add(value);
    }
  }

  const figmaProperties = Array.from(propertyMap.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values)
  }));

  const variantCount = symbolMatches.length;
  const metrics = [];
  const widthMatch = metadataXml.match(/width="(\d+)"/);
  const heightMatch = metadataXml.match(/height="(\d+)"/);
  if (widthMatch?.[1] && heightMatch?.[1]) {
    metrics.push(`set frame ${widthMatch[1]} × ${heightMatch[1]}`);
  }
  metrics.push(`variants ${variantCount}`);

  const propertySummary = figmaProperties.map((entry) => `${entry.name}: ${entry.values.join(", ")}`);
  const propertyGroups = [
    {
      label: "Figma Properties",
      items: propertySummary
    }
  ];

  return {
    insight: {
      kind: "component-set",
      headline: `${node.name}의 Figma variant set입니다.`,
      structure: [],
      notes: [`${variantCount}개의 variant가 포함되어 있습니다.`],
      metrics,
      detectedSlots: []
    },
    summary: {
      component: {
        name: node.name,
        type: node.type,
        isFigmaComponent: node.isFigmaComponent,
        role: node.componentRole,
        mainComponentName: node.mainComponentName ?? null
      },
      figmaProperties,
      figmaVariants: symbolMatches,
      figmaInstances: [],
      properties: {
        variantProperties: {},
        enabled: [],
        summary: propertySummary,
        groups: propertyGroups,
        hierarchy: []
      },
      nestedInstances: {
        present: [],
        available: []
      },
      resolvedStructure: {
        kind: "component-set",
        slots: [],
        flow: []
      },
      semantics: {
        headline: `${node.name}의 Figma variant set입니다.`,
        notes: [`${variantCount}개의 variant가 포함되어 있습니다.`]
      },
      metrics
    }
  };
};

const summarizeNodeArtifacts = (
  node: ExtractionReference["nodes"][number],
  extracted: ExtractedNodeArtifacts
): { insight: ExtractionInsight; summary: ExtractionNodeSummary } => {
  const designTexts = collectToolTexts(extracted.designContext);
  const metadataTexts = collectToolTexts(extracted.metadata);
  const designCode = designTexts.find((text) => text.includes("export default function")) ?? "";
  const metadataXml = metadataTexts.find((text) => text.startsWith("<")) ?? "";
  if (node.componentRole === "component-set" || node.type === "COMPONENT_SET") {
    return buildComponentSetSummary(node, metadataXml);
  }
  const slotNames = unique(
    Array.from(designCode.matchAll(/data-name="([^"]+)"/g), (match) => match[1].trim().toLowerCase())
  );

  const widthMatch = metadataXml.match(/width="(\d+)"/);
  const heightMatch = metadataXml.match(/height="(\d+)"/);
  const fieldSize = widthMatch?.[1] && heightMatch?.[1] ? `${widthMatch[1]} × ${heightMatch[1]}` : "";

  const notes: string[] = [];
  const metrics: string[] = [];
  if (fieldSize) metrics.push(`field ${fieldSize}`);
  const variantProperties = node.variantProperties ?? {};
  const enabledProperties = Object.entries(variantProperties)
    .filter(([, value]) => value === true || value === "True" || value === "true")
    .map(([key]) => key);
  const propertySummary = summarizeVariantProperties(variantProperties);
  const propertyGroups = buildPropertyGroups(variantProperties);
  const propertyHierarchy = buildPropertyHierarchy(variantProperties);
  const nestedInstances = buildNestedInstances(designCode, variantProperties);

  const isInput = /(textinput|textfield|input)/i.test(node.name) || slotNames.includes("trailing button");
  if (isInput) {
    const structure: string[] = [];
    if (slotNames.includes("wrapper")) structure.push("wrapper");
    if (slotNames.includes("container")) structure.push("container");
    if (slotNames.includes("content")) structure.push("content");
    if (slotNames.includes("text")) structure.push("text");
    if (slotNames.includes("trailing button")) structure.push("trailing button");

    const trailingButtonBlock =
      designCode.match(/data-name="Trailing Button"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] ?? "";
    const trailingLabel =
      trailingButtonBlock.match(/<p[^>]*>\s*([^<\n]+)\s*<\/p>/)?.[1]?.trim() ?? "";
    const trailingMinWidth = trailingButtonBlock.match(/min-w-\[(\d+)px\]/)?.[1];
    const trailingPaddingX = trailingButtonBlock.match(/px-\[(\d+)px\]/)?.[1];
    const trailingPaddingY = trailingButtonBlock.match(/py-\[(\d+)px\]/)?.[1];
    const contentGap = designCode.match(/gap-\[(\d+)px\][^>]*data-name="Content"/)?.[1];
    const containerPadding = designCode.match(/p-\[(\d+)px\][^>]*data-name="Container"/)?.[1];

    if (contentGap) metrics.push(`content gap ${contentGap}`);
    if (containerPadding) metrics.push(`container padding ${containerPadding}`);
    if (slotNames.includes("trailing button")) {
      notes.push("입력 영역 우측에 독립된 action segment가 결합됩니다.");
      if (trailingLabel) notes.push(`trailing button label은 "${trailingLabel}"입니다.`);
      if (trailingMinWidth) metrics.push(`trailing min-width ${trailingMinWidth}`);
      if (trailingPaddingX && trailingPaddingY) {
        metrics.push(`trailing padding ${trailingPaddingX}/${trailingPaddingY}`);
      }
    } else {
      notes.push("기본 입력 shell 중심 구조입니다.");
    }

    const kind = slotNames.includes("trailing button") ? "input-with-trailing-button" : "input";
    const headline = slotNames.includes("trailing button")
      ? "입력 영역과 우측 trailing button이 결합된 input입니다."
      : "기본 text input 구조입니다.";
    const slots = structure.length > 0 ? structure : slotNames;

    return {
      insight: {
        kind,
        headline,
        structure,
        notes,
        metrics,
        detectedSlots: slots
      },
      summary: {
        component: {
          name: node.name,
          type: node.type,
          isFigmaComponent: node.isFigmaComponent,
          role: node.componentRole,
          mainComponentName: node.mainComponentName ?? null
        },
        properties: {
          variantProperties,
          enabled: enabledProperties,
          summary: propertySummary,
          groups: propertyGroups,
          hierarchy: propertyHierarchy
        },
        nestedInstances,
        resolvedStructure: {
          kind,
          slots,
          flow: structure
        },
        semantics: {
          headline,
          notes
        },
        metrics
      }
    };
  }

  const kind = "node";
  const headline = `${node.name} 구조를 추출했습니다.`;
  const flow = slotNames.slice(0, 8);
  return {
    insight: {
      kind,
      headline,
      structure: flow,
      notes,
      metrics,
      detectedSlots: slotNames
    },
    summary: {
      component: {
        name: node.name,
        type: node.type,
        isFigmaComponent: node.isFigmaComponent,
        role: node.componentRole,
        mainComponentName: node.mainComponentName ?? null
      },
      properties: {
        variantProperties,
        enabled: enabledProperties,
        summary: propertySummary,
        groups: propertyGroups,
        hierarchy: propertyHierarchy
      },
      nestedInstances,
      resolvedStructure: {
        kind,
        slots: slotNames,
        flow
      },
      semantics: {
        headline,
        notes
      },
      metrics
    }
  };
};

const createMcpClient = () => {
  const endpoint = process.env.FIGMA_MCP_ENDPOINT ?? "https://mcp.figma.com/mcp";
  const token = process.env.FIGMA_OAUTH_TOKEN;

  if (!token) {
    return undefined;
  }

  return createHttpMcpClient({
    endpoint,
    token,
    timeoutMs: 30000
  });
};

const extractNodeViaDirectClient = async (
  client: ReturnType<typeof createHttpMcpClient>,
  fileKey: string,
  node: ExtractionReference["nodes"][number]
): Promise<ExtractedNodeArtifacts> => {
  const normalizedNodeId = normalizeMcpNodeId(node.id);
  const baseArgs = {
    fileKey,
    nodeId: normalizedNodeId,
    clientFrameworks: "unknown",
    clientLanguages: "unknown"
  };

  const metadata = await client.callTool("get_metadata", baseArgs);
  const designContext = await client.callTool("get_design_context", {
    ...baseArgs,
    forceCode: true
  });
  const screenshot = await client.callTool("get_screenshot", baseArgs);

  return {
    node,
    metadata,
    designContext,
    screenshot
  };
};

const runCodexExtraction = async (
  fileKey: string,
  node: ExtractionReference["nodes"][number]
): Promise<ExtractedNodeArtifacts> => {
  const normalizedNodeId = normalizeMcpNodeId(node.id);
  const prompt = [
    `Use [$figma](${FIGMA_SKILL_PATH}).`,
    "Fetch the raw Figma MCP results for the exact node below.",
    "Do not summarize.",
    "Call get_design_context first, then get_metadata, then get_screenshot.",
    "End after the tool calls complete.",
    `fileKey: ${fileKey}`,
    `nodeId: ${normalizedNodeId}`,
    `nodeName: ${node.name}`,
    `nodeType: ${node.type}`,
    `nodeUrl: ${node.url}`
  ].join("\n");

  let stdout = "";
  try {
    const result = await execFileAsync(
      "codex",
      [
        "exec",
        "-C",
        REPO_ROOT,
        "--dangerously-bypass-approvals-and-sandbox",
        "--json",
        prompt
      ],
      {
        encoding: "utf-8",
        maxBuffer: 40 * 1024 * 1024,
        timeout: 70_000
      }
    );
    stdout = result.stdout;
  } catch (error) {
    const maybeStdout =
      error && typeof error === "object" && "stdout" in error && typeof error.stdout === "string"
        ? error.stdout
        : "";
    stdout = maybeStdout;
    if (!stdout.trim()) {
      throw error;
    }
  }

  const events = stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as Record<string, unknown>];
      } catch {
        return [];
      }
    });

  const toolItems = events
    .map((event) => {
      if (event.type !== "item.completed") return null;
      const item = event.item;
      if (!item || typeof item !== "object") return null;
      return item as Record<string, unknown>;
    })
    .filter((item): item is Record<string, unknown> => Boolean(item))
    .filter((item) => item.type === "mcp_tool_call" && item.status === "completed");

  const getToolResult = (toolName: string) =>
    toolItems.find((item) => item.tool === toolName)?.result ?? null;

  const designContext = getToolResult("get_design_context");
  const metadata = getToolResult("get_metadata");
  const screenshot = getToolResult("get_screenshot");

  if (!designContext && !metadata && !screenshot) {
    throw new Error("No MCP tool results were captured from codex exec.");
  }

  return {
    node,
    metadata,
    designContext,
    screenshot
  };
};

const extractNode = async (
  fileKey: string,
  node: ExtractionReference["nodes"][number]
): Promise<ExtractedNodeArtifacts> => {
  const client = createMcpClient();
  if (client) {
    await client.initialize();
    return await extractNodeViaDirectClient(client, fileKey, node);
  }

  return await runCodexExtraction(fileKey, node);
};

export const analyzeSelectionNodeViaMcp = async (
  fileKey: string,
  node: ExtractionReference["nodes"][number]
): Promise<MakerSelectionMcpAnalysis> => {
  const extracted = await extractNode(fileKey, node);
  const { summary } = summarizeNodeArtifacts(node, extracted);
  return summary;
};

const updateSummary = (
  summaryPath: string,
  updater: (current: Record<string, unknown>) => Record<string, unknown>
) => {
  const current = readJson<Record<string, unknown>>(summaryPath) ?? {};
  writeJson(summaryPath, updater(current));
};

export const refreshExtractedDocs = async () => {
  try {
    await execFileAsync("node", [GENERATED_EXTRACTED_SCRIPT], {
      cwd: REPO_ROOT,
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
      timeout: 15_000
    });
  } catch (error) {
    console.warn("[figma-bridge] failed to refresh extracted docs:", error);
  }
};

const enrichExtractionInBackground = async (
  summaryPath: string,
  fileKey: string,
  nodes: ExtractViaMcpInput["reference"]["nodes"],
  rootDir: string
) => {
  try {
    for (const node of nodes) {
      const nodeSlug = `${sanitize(node.name)}-${node.id.replace(/:/g, "-")}`;
      const nodeDir = path.resolve(rootDir, nodeSlug);
      fs.mkdirSync(nodeDir, { recursive: true });

      const extracted = await extractNode(fileKey, node);
      const { insight, summary } = summarizeNodeArtifacts(node, extracted);
      const metadataPath = path.resolve(nodeDir, "metadata.json");
      const designContextPath = path.resolve(nodeDir, "design-context.json");
      const screenshotPath = path.resolve(nodeDir, "screenshot.json");
      const files = [metadataPath, designContextPath, screenshotPath];

      writeJson(metadataPath, extracted.metadata);
      writeJson(designContextPath, extracted.designContext);
      writeJson(screenshotPath, extracted.screenshot);

      updateSummary(summaryPath, (current) => {
        const currentNodes = Array.isArray(current.nodes) ? current.nodes : [];
        const nextNodes = currentNodes.map((item) =>
          item && typeof item === "object" && "id" in item && item.id === node.id
            ? {
                ...item,
                dir: nodeDir,
                files,
                insight,
                component: summary.component,
                properties: summary.properties,
                resolvedStructure: summary.resolvedStructure,
                semantics: summary.semantics,
                metrics: summary.metrics
              }
            : item
        );

        return {
          ...current,
          nodes: nextNodes
        };
      });
    }

    updateSummary(summaryPath, (current) => ({
      ...current,
      status: "completed",
      completedAt: new Date().toISOString()
    }));
    await refreshExtractedDocs();
  } catch (error) {
    updateSummary(summaryPath, (current) => ({
      ...current,
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
      failedAt: new Date().toISOString()
    }));
  }
};

export const extractViaMcp = async (input: ExtractViaMcpInput) => {
  const slug = sanitize(input.extractionName);
  const rootDir = path.resolve(input.outputDir, slug);
  fs.mkdirSync(rootDir, { recursive: true });

  writeJson(path.resolve(rootDir, "request.json"), {
    extractedAt: new Date().toISOString(),
    extractionName: input.extractionName,
    reference: input.reference
  });

  if (input.selectionSvg) {
    fs.writeFileSync(path.resolve(rootDir, "selection.svg"), input.selectionSvg, "utf-8");
  }

  const nodes: Array<{
    id: string;
    name: string;
    dir: string;
    files: string[];
    isFigmaComponent: boolean;
    componentRole: ExtractionReference["nodes"][number]["componentRole"];
    mainComponentName?: string | null;
    variantProperties?: Record<string, string | boolean>;
    insight?: ExtractionInsight;
    component?: ExtractionNodeSummary["component"];
    properties?: ExtractionNodeSummary["properties"];
    resolvedStructure?: ExtractionNodeSummary["resolvedStructure"];
    semantics?: ExtractionNodeSummary["semantics"];
    metrics?: ExtractionNodeSummary["metrics"];
  }> = [];

  const transport = process.env.FIGMA_OAUTH_TOKEN ? "direct-token" : "codex-oauth";

  for (const node of input.reference.nodes) {
    const nodeSlug = `${sanitize(node.name)}-${node.id.replace(/:/g, "-")}`;
    const nodeDir = path.resolve(rootDir, nodeSlug);
    nodes.push({
      id: node.id,
      name: node.name,
      dir: nodeDir,
      files: [],
      isFigmaComponent: node.isFigmaComponent,
      componentRole: node.componentRole,
      mainComponentName: node.mainComponentName ?? null,
      variantProperties: node.variantProperties,
      component: {
        name: node.name,
        type: node.type,
        isFigmaComponent: node.isFigmaComponent,
        role: node.componentRole,
        mainComponentName: node.mainComponentName ?? null
      },
      properties: {
        variantProperties: node.variantProperties ?? {},
        enabled: Object.entries(node.variantProperties ?? {})
          .filter(([, value]) => value === true || value === "True" || value === "true")
          .map(([key]) => key),
        summary: summarizeVariantProperties(node.variantProperties ?? {}),
        groups: buildPropertyGroups(node.variantProperties ?? {})
      },
      resolvedStructure: {
        kind: "pending",
        slots: [],
        flow: []
      },
      semantics: {
        headline: "MCP 분석을 준비 중입니다.",
        notes: []
      },
      metrics: []
    });
  }

  const summary = {
    ok: true,
    extractedAt: new Date().toISOString(),
    extractionName: input.extractionName,
    outputDir: rootDir,
    selectionCount: input.reference.selectionCount,
    transport,
    status: "processing",
    promotionStatus: "draft",
    promotedAt: null,
    selectionSvg: input.selectionSvg ? path.resolve(rootDir, "selection.svg") : null,
    nodes
  };

  const summaryPath = path.resolve(rootDir, "summary.json");
  writeJson(summaryPath, summary);
  setTimeout(() => {
    void enrichExtractionInBackground(summaryPath, input.reference.fileKey, input.reference.nodes, rootDir);
  }, 0);
  return summary;
};
