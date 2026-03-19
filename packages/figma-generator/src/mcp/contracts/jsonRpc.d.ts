export interface JsonRpcRequest<TParams = unknown> {
    jsonrpc: "2.0";
    id: string | number;
    method: string;
    params?: TParams;
}
export interface JsonRpcError {
    code: number;
    message: string;
    data?: unknown;
}
export interface JsonRpcSuccess<TResult = unknown> {
    jsonrpc: "2.0";
    id: string | number | null;
    result: TResult;
}
export interface JsonRpcFailure {
    jsonrpc: "2.0";
    id: string | number | null;
    error: JsonRpcError;
}
export type JsonRpcResponse<TResult = unknown> = JsonRpcSuccess<TResult> | JsonRpcFailure;
export interface McpToolDefinition {
    name: string;
    description?: string;
    inputSchema?: unknown;
    annotations?: Record<string, unknown>;
}
export interface McpInitializeResult {
    protocolVersion: string;
    capabilities: Record<string, unknown>;
    serverInfo: {
        name: string;
        version: string;
    };
}
export interface McpToolsListResult {
    tools: McpToolDefinition[];
}
export interface McpToolCallResult {
    content?: unknown;
    structuredContent?: unknown;
    isError?: boolean;
    [key: string]: unknown;
}
