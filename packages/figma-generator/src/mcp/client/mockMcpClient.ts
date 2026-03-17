import type { McpExecutionRequest } from "../contracts/executionRequest";
import type { McpExecutionResponse } from "../contracts/executionResponse";
import { validateMcpPayload } from "../validateMcpPayload";

export const mockMcpClient = {
  execute(request: McpExecutionRequest): McpExecutionResponse {
    const warnings: string[] = [];

    if (!request.documentName) {
      return {
        success: false,
        createdNodeCount: 0,
        createdComponentCount: 0,
        warnings: ["Missing documentName"],
        executionSummary: "Execution blocked: invalid request"
      };
    }

    if (!request.pageName) {
      return {
        success: false,
        createdNodeCount: 0,
        createdComponentCount: 0,
        warnings: ["Missing pageName"],
        executionSummary: "Execution blocked: invalid request"
      };
    }

    if (!request.theme) {
      return {
        success: false,
        createdNodeCount: 0,
        createdComponentCount: 0,
        warnings: ["Missing theme"],
        executionSummary: "Execution blocked: invalid request"
      };
    }

    const validation = validateMcpPayload(request.payload);
    warnings.push(...validation.warnings);

    if (!validation.valid) {
      return {
        success: false,
        createdNodeCount: 0,
        createdComponentCount: 0,
        warnings: [...warnings, ...validation.errors],
        executionSummary: "Execution blocked: payload validation failed"
      };
    }

    const createdNodeCount = request.payload.nodes.length;
    const createdComponentCount = request.payload.components.length;

    return {
      success: true,
      createdNodeCount,
      createdComponentCount,
      warnings,
      executionSummary:
        `Mock MCP execution ready: document='${request.documentName}', ` +
        `page='${request.pageName}', theme='${request.theme}', ` +
        `nodes=${createdNodeCount}, components=${createdComponentCount}`
    };
  }
};
