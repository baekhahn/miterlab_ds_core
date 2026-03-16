import { resolvePattern } from "../grammar/screenPatterns";
import type { LayoutNode } from "../types/layout";
import type { EvaluationIssue } from "./types";

interface LayoutEvalResult {
  warnings: EvaluationIssue[];
  errors: EvaluationIssue[];
}

const getSectionName = (name: string): string => {
  return name.endsWith("-section") ? name.replace(/-section$/, "") : name;
};

const collectComponentNodes = (node: LayoutNode): LayoutNode[] => {
  if (!("children" in node) || !node.children) {
    return node.type === "component" ? [node] : [];
  }
  return node.children.flatMap(collectComponentNodes);
};

export const evaluateLayout = (screen: string, layout?: LayoutNode): LayoutEvalResult => {
  const warnings: EvaluationIssue[] = [];
  const errors: EvaluationIssue[] = [];

  if (!layout) {
    errors.push({ level: "error", code: "layout_missing", message: "Layout is missing" });
    return { warnings, errors };
  }

  if (layout.type !== "frame") {
    errors.push({ level: "error", code: "root_not_frame", message: "Root layout node must be frame" });
    return { warnings, errors };
  }

  const pattern = resolvePattern(screen);
  const sections = (layout.children ?? []).filter((n) => n.type === "stack");
  const sectionNames = sections.map((s) => getSectionName(s.name));

  for (const required of pattern.requiredSections) {
    if (!sectionNames.includes(required)) {
      errors.push({
        level: "error",
        code: "missing_required_section",
        message: `Missing required section: ${required}`,
        affectedNodes: [required]
      });
    }
  }

  const dupes = sectionNames.filter((name, idx) => sectionNames.indexOf(name) !== idx);
  for (const duplicated of [...new Set(dupes)]) {
    errors.push({
      level: "error",
      code: "duplicated_section",
      message: `Duplicated section found: ${duplicated}`,
      affectedNodes: [duplicated]
    });
  }

  const actionSection = sections.find((s) => getSectionName(s.name) === "action");
  const hasPrimaryAction = collectComponentNodes(layout).some((n) => {
    if (n.type !== "component") return false;
    const variant = String(n.props?.variant ?? "");
    return n.component === "button" && variant === "primary";
  });

  if (hasPrimaryAction && !actionSection) {
    warnings.push({
      level: "warning",
      code: "missing_action_section",
      message: "Primary action exists but action section is missing"
    });
  }

  if (!hasPrimaryAction) {
    warnings.push({
      level: "warning",
      code: "missing_primary_action",
      message: "No primary action button found"
    });
  }

  for (const section of sections) {
    if (!("children" in section) || !section.children) continue;
    for (const child of section.children) {
      if (child.type === "frame") {
        errors.push({
          level: "error",
          code: "invalid_nesting",
          message: `Invalid nesting: frame inside section ${section.name}`,
          affectedNodes: [section.name, child.name]
        });
      }
    }
  }

  if (!(screen in { login: 1, settings: 1, list: 1, dashboard: 1, detail: 1, "filter-panel": 1, "empty-state": 1, "modal-form": 1 })) {
    warnings.push({
      level: "warning",
      code: "unsupported_pattern",
      message: `Screen pattern '${screen}' is not explicitly supported, fallback pattern may be used`
    });
  }

  return { warnings, errors };
};
