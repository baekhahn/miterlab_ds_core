import { type McpSessionConfig } from "./client/mcpSession";
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
export declare const executeWithFallback: (input: ExecuteWithFallbackInput) => Promise<ExecuteWithFallbackResult>;
