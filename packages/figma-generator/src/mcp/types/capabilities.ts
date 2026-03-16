import type { McpToolDefinition } from "../contracts/jsonRpc";

export type McpAccessMode = "readOnly" | "partiallyWritable" | "writable";

export type McpToolCategory =
  | "context"
  | "screenshot"
  | "metadata"
  | "selection"
  | "create"
  | "update"
  | "component"
  | "variable"
  | "style"
  | "unknown";

export interface McpToolCapability {
  name: string;
  category: McpToolCategory;
  writable: boolean;
}

export interface McpCapabilitySummary {
  mode: McpAccessMode;
  writableToolCount: number;
  readOnlyToolCount: number;
  categories: Record<McpToolCategory, number>;
  tools: McpToolCapability[];
  rawTools: McpToolDefinition[];
}
