import { type McpSessionConfig } from "./mcpSession";
export interface HttpMcpClientConfig extends McpSessionConfig {
}
export declare const createHttpMcpClient: (config: HttpMcpClientConfig) => {
    session: {
        getState(): import("./mcpSession").McpSessionState;
        initialize(): Promise<import("../contracts/jsonRpc").McpInitializeResult>;
        listTools(): Promise<import("../contracts/jsonRpc").McpToolsListResult>;
        callTool(name: string, args?: Record<string, unknown>): Promise<import("../contracts/jsonRpc").McpToolCallResult>;
    };
    initialize(): Promise<import("../contracts/jsonRpc").McpInitializeResult>;
    listTools(): Promise<import("../contracts/jsonRpc").McpToolsListResult>;
    callTool(name: string, args?: Record<string, unknown>): Promise<import("../contracts/jsonRpc").McpToolCallResult>;
    discoverCapabilities(): Promise<import("../types/capabilities").McpCapabilitySummary>;
    executeWithFallback(payload?: import("../types").McpPayload, outputDir?: string): Promise<import("../executeWithFallback").ExecuteWithFallbackResult>;
};
