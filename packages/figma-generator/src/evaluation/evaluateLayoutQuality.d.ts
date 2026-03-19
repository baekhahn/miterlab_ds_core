import type { LayoutNode } from "../types/layout";
import type { EvaluationIssue } from "./types";
interface QualityEvalResult {
    warnings: EvaluationIssue[];
    errors: EvaluationIssue[];
}
export declare const evaluateLayoutQuality: (layout?: LayoutNode) => QualityEvalResult;
export {};
