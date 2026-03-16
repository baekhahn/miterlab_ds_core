import { createMcpSession, type McpSessionConfig } from "./mcpSession";
import { discoverCapabilities } from "../discoverCapabilities";
import { executeWithFallback } from "../executeWithFallback";

export interface HttpMcpClientConfig extends McpSessionConfig {}

export const createHttpMcpClient = (config: HttpMcpClientConfig) => {
  const session = createMcpSession(config);

  return {
    session,

    async initialize() {
      return await session.initialize();
    },

    async listTools() {
      return await session.listTools();
    },

    async callTool(name: string, args: Record<string, unknown> = {}) {
      return await session.callTool(name, args);
    },

    async discoverCapabilities() {
      const tools = await session.listTools();
      return discoverCapabilities(tools.tools);
    },

    async executeWithFallback(payload?: import("../types").McpPayload, outputDir?: string) {
      return await executeWithFallback({
        config,
        payload,
        outputDir
      });
    }
  };
};
