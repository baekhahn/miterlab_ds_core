export interface McpExecutionResponse {
  success: boolean;
  createdNodeCount: number;
  createdComponentCount: number;
  warnings: string[];
  executionSummary: string;
}
