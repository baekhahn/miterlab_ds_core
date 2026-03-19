import type { LayoutNode } from "../types/layout";
import type { EvaluationIssue } from "./types";
interface LayoutEvalResult {
    warnings: EvaluationIssue[];
    errors: EvaluationIssue[];
}
export declare const evaluateLayout: (screen: string, layout?: LayoutNode) => LayoutEvalResult;
export {};
