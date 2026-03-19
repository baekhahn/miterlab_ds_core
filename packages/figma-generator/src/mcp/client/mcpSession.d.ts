import type { McpInitializeResult, McpToolCallResult, McpToolsListResult } from "../contracts/jsonRpc";
export interface McpSessionConfig {
    endpoint: string;
    token?: string;
    timeoutMs?: number;
}
export interface McpSessionState {
    endpoint: string;
    sessionId?: string;
    initialized: boolean;
}
export declare const createMcpSession: (config: McpSessionConfig) => {
    getState(): McpSessionState;
    initialize(): Promise<McpInitializeResult>;
    listTools(): Promise<McpToolsListResult>;
    callTool(name: string, args?: Record<string, unknown>): Promise<McpToolCallResult>;
};
