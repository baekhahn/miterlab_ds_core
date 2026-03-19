import type { McpPayload } from "../mcp/types";
import type { EvaluationIssue } from "./types";
interface DsEvalResult {
    warnings: EvaluationIssue[];
    errors: EvaluationIssue[];
}
export declare const evaluateDsCompliance: (payload?: McpPayload) => DsEvalResult;
export {};
