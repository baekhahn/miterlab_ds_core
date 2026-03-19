import type { McpToolDefinition } from "./contracts/jsonRpc";
import type { McpCapabilitySummary } from "./types/capabilities";
export declare const discoverCapabilities: (tools: McpToolDefinition[]) => McpCapabilitySummary;
