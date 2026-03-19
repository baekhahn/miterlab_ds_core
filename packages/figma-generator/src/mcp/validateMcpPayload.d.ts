import type { McpPayload } from "./types";
export interface McpPayloadValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
export declare const validateMcpPayload: (payload: McpPayload) => McpPayloadValidationResult;
