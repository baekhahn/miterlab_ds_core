import type { McpExecutionRequest } from "../contracts/executionRequest";
import type { McpPayload } from "../types";

export const createMockExecutionRequest = (payload: McpPayload): McpExecutionRequest => {
  return {
    documentName: "Miterlab DS - Example",
    pageName: "Example",
    theme: payload.document.theme,
    payload,
    metadata: {
      requestedBy: "design-system",
      purpose: "contract-check"
    }
  };
};
