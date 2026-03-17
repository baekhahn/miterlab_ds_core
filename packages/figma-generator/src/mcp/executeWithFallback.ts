import fs from "node:fs";
import path from "node:path";
import { createMcpSession, type McpSessionConfig } from "./client/mcpSession";
import { discoverCapabilities } from "./discoverCapabilities";
import type { McpPayload } from "./types";
import type { McpCapabilitySummary } from "./types/capabilities";

export interface ExecuteWithFallbackInput {
  config: McpSessionConfig;
  payload?: McpPayload;
  outputDir?: string;
}

export interface ExecuteWithFallbackResult {
  mode: "readOnly" | "partiallyWritable" | "writable";
  session: {
    endpoint: string;
    sessionId?: string;
    initialized: boolean;
  };
  capabilities: McpCapabilitySummary;
  readOnlyToolResult?: unknown;
  summary: string;
}

const writeJson = (filePath: string, data: unknown) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
};

export const executeWithFallback = async (input: ExecuteWithFallbackInput): Promise<ExecuteWithFallbackResult> => {
  const session = createMcpSession(input.config);
  const initializeResult = await session.initialize();
  const toolsResult = await session.listTools();
  const capabilities = discoverCapabilities(toolsResult.tools);

  let readOnlyToolResult: unknown;
  if (capabilities.mode === "readOnly") {
    try {
      readOnlyToolResult = await session.callTool("get_metadata", {});
    } catch {
      readOnlyToolResult = { skipped: true, reason: "get_metadata tool call unavailable without selection context" };
    }
  }

  const state = session.getState();
  const summary =
    capabilities.mode === "readOnly"
      ? "MCP server is read-only. Payload generation is complete; execution fallback collected metadata/context only."
      : "MCP server exposes writable-style tools. Bridge integration can map payload to tool calls.";

  const outputDir = input.outputDir ?? path.resolve(process.cwd(), "artifacts/mcp");
  writeJson(path.resolve(outputDir, "session.json"), {
    state,
    initializeResult
  });
  writeJson(path.resolve(outputDir, "tools-list.json"), toolsResult);
  writeJson(path.resolve(outputDir, "capabilities.json"), capabilities);
  writeJson(path.resolve(outputDir, "read-only-summary.json"), {
    mode: capabilities.mode,
    summary,
    readOnlyToolResult,
    payloadDocument: input.payload?.document ?? null
  });

  return {
    mode: capabilities.mode,
    session: state,
    capabilities,
    readOnlyToolResult,
    summary
  };
};
