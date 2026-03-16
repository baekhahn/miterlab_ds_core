import type { McpToolCallResult } from "./contracts/jsonRpc";
import { createMcpSession, type McpSessionConfig } from "./client/mcpSession";

export interface CallToolInput {
  session?: ReturnType<typeof createMcpSession>;
  config?: McpSessionConfig;
  name: string;
  args?: Record<string, unknown>;
}

export const callTool = async (input: CallToolInput): Promise<McpToolCallResult> => {
  const session =
    input.session ??
    (() => {
      if (!input.config?.endpoint) {
        throw new Error("Either an MCP session or config.endpoint is required");
      }
      return createMcpSession(input.config);
    })();
  return await session.callTool(input.name, input.args ?? {});
};
