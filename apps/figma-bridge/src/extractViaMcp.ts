import fs from "node:fs";
import os from "node:os";
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

type ExtractedNodeArtifacts = {
  node: ExtractionReference["nodes"][number];
  metadata: unknown;
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

  return {
    node,
    metadata
  };
};

const runCodexExtraction = async (
  fileKey: string,
  node: ExtractionReference["nodes"][number]
): Promise<ExtractedNodeArtifacts> => {
  const normalizedNodeId = normalizeMcpNodeId(node.id);
  const tmpDir = fs.mkdtempSync(path.resolve(os.tmpdir(), "miterlab-figma-mcp-"));
  const outputPath = path.resolve(tmpDir, "result.json");

  const prompt = [
    `Use [$figma](${FIGMA_SKILL_PATH}).`,
    "Fetch the raw Figma MCP results for the exact node below.",
    "Do not summarize.",
    "Call get_metadata only.",
    "Return valid JSON only, with no markdown fences and no extra text.",
    'Return exactly this shape: {"node":{"id":"","name":"","type":"","url":""},"metadata":{}}.',
    `fileKey: ${fileKey}`,
    `nodeId: ${normalizedNodeId}`,
    `nodeName: ${node.name}`,
    `nodeType: ${node.type}`,
    `nodeUrl: ${node.url}`
  ].join("\n");

  try {
    await execFileAsync(
      "codex",
      [
        "exec",
        "-C",
        REPO_ROOT,
        "--dangerously-bypass-approvals-and-sandbox",
        "--output-last-message",
        outputPath,
        prompt
      ],
      {
        encoding: "utf-8",
        maxBuffer: 20 * 1024 * 1024,
        timeout: 25_000
      }
    );
  } catch (error) {
    if (!fs.existsSync(outputPath)) {
      throw error;
    }
  }

  const raw = JSON.parse(fs.readFileSync(outputPath, "utf-8")) as ExtractedNodeArtifacts;
  return raw;
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
      const files = [path.resolve(nodeDir, "metadata.json")];

      writeJson(files[0], extracted.metadata);

      updateSummary(summaryPath, (current) => {
        const currentNodes = Array.isArray(current.nodes) ? current.nodes : [];
        const nextNodes = currentNodes.map((item) =>
          item && typeof item === "object" && "id" in item && item.id === node.id
            ? {
                ...item,
                dir: nodeDir,
                files
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
      variantProperties: node.variantProperties
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
