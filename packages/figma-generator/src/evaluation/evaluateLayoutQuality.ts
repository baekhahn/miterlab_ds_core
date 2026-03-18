import { layoutRules } from "../grammar/layoutRules";
import type { LayoutNode } from "../types/layout";
import type { EvaluationIssue } from "./types";

interface QualityEvalResult {
  warnings: EvaluationIssue[];
  errors: EvaluationIssue[];
}

export const evaluateLayoutQuality = (layout?: LayoutNode): QualityEvalResult => {
  const warnings: EvaluationIssue[] = [];
  const errors: EvaluationIssue[] = [];

  if (!layout || layout.type !== "frame") {
    return {
      warnings,
      errors: [{ level: "error", code: "invalid_layout_quality_input", message: "Frame layout is required" }]
    };
  }

  const sections = (layout.children ?? []).filter((n) => n.type === "stack");
  const previewOnly = sections.length > 0 && sections.every((section) => section.name.includes("preview"));
  const expectedGap = layoutRules.sectionSpacing.comfortable;

  for (let i = 1; i < sections.length; i += 1) {
    const prev = sections[i - 1];
    const curr = sections[i];
    const gap = (curr.y ?? 0) - (prev.y ?? 0);

    if (gap < expectedGap / 2) {
      warnings.push({
        level: "warning",
        code: "section_spacing_tight",
        message: `Section spacing is too tight between '${prev.name}' and '${curr.name}'`,
        affectedNodes: [prev.name, curr.name]
      });
    }
  }

  const headerIndex = sections.findIndex((s) => s.name.includes("header"));
  const actionIndex = sections.findIndex((s) => s.name.includes("action"));

  if (!previewOnly && headerIndex === -1) {
    warnings.push({ level: "warning", code: "missing_header", message: "Header section is missing" });
  }

  if (actionIndex !== -1 && headerIndex !== -1 && actionIndex < headerIndex) {
    errors.push({
      level: "error",
      code: "hierarchy_invalid",
      message: "Action section appears above header section",
      affectedNodes: [sections[actionIndex].name, sections[headerIndex].name]
    });
  }

  const actionSection = sections.find((s) => s.name.includes("action"));
  if (actionSection && "children" in actionSection && (actionSection.children?.length ?? 0) > 3) {
    warnings.push({
      level: "warning",
      code: "action_grouping_dense",
      message: "Action section has too many items; consider grouping actions"
    });
  }

  return { warnings, errors };
};
