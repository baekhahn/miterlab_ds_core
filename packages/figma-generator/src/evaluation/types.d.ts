import type { LayoutNode } from "../types/layout";
import type { McpPayload } from "../mcp/types";
export type EvaluationLevel = "warning" | "error";
export interface EvaluationIssue {
    level: EvaluationLevel;
    code: string;
    message: string;
    affectedNodes?: string[];
    affectedComponents?: string[];
}
export interface EvaluationSuggestion {
    code: string;
    message: string;
}
export interface ScreenEvaluationResult {
    score: number;
    passed: boolean;
    warnings: EvaluationIssue[];
    errors: EvaluationIssue[];
    improvementSuggestions: EvaluationSuggestion[];
    affectedNodes: string[];
    affectedComponents: string[];
    summary: string;
}
export interface EvaluationInput {
    screen: string;
    layout?: LayoutNode;
    payload?: McpPayload;
}
