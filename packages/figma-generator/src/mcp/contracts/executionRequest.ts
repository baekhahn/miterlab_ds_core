import type { McpPayload } from "../types";

export interface McpExecutionRequest {
  documentName: string;
  pageName: string;
  theme: string;
  payload: McpPayload;
  metadata?: {
    requestId?: string;
    requestedBy?: string;
    purpose?: string;
  };
}
