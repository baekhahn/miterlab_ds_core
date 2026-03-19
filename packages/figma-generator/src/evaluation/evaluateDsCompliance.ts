import type { McpPayload } from "../mcp/types";
import type { EvaluationIssue } from "./types";

interface DsEvalResult {
  warnings: EvaluationIssue[];
  errors: EvaluationIssue[];
}

const allowedStates = new Set(["enabled", "pressed", "disabled", "loading", "focused", "readonly"]);
const allowedSizes = new Set(["sm", "md", "lg"]);
const allowedVariantProps = new Set([
  "appearance",
  "hierarchy",
  "emphasis",
  "intent",
  "size",
  "width",
  "state",
  "iconOnly",
  "iconLeading",
  "iconTrailing",
  "loading",
  "disabled",
  "readOnly",
  "clearable",
  "value",
  "defaultValue",
  "placeholder",
  "maxLength",
  "minLength",
  "inputMode",
  "title",
  "label",
  "helperText",
  "multiline",
  "rowsCount"
]);

export const evaluateDsCompliance = (payload?: McpPayload): DsEvalResult => {
  const warnings: EvaluationIssue[] = [];
  const errors: EvaluationIssue[] = [];

  if (!payload) {
    errors.push({ level: "error", code: "payload_missing", message: "MCP payload is missing" });
    return { warnings, errors };
  }

  for (const [key, value] of Object.entries(payload.variables ?? {})) {
    if (value.startsWith("Foundation/") || value.startsWith("Brand/")) {
      errors.push({
        level: "error",
        code: "direct_non_semantic_token",
        message: `Direct foundation/brand token binding found: ${value}`,
        affectedNodes: [key]
      });
    }

    if (!value.startsWith("Semantic/") && !value.startsWith("semantic.")) {
      warnings.push({
        level: "warning",
        code: "non_semantic_reference",
        message: `Variable binding is not semantic-prefixed: ${value}`,
        affectedNodes: [key]
      });
    }
  }

  for (const component of payload.components ?? []) {
    const variant = component.variant ?? {};

    for (const key of Object.keys(variant)) {
      if (!allowedVariantProps.has(key)) {
        errors.push({
          level: "error",
          code: "unsupported_variant_property",
          message: `Unsupported variant property '${key}' on component '${component.name}'`,
          affectedComponents: [component.name]
        });
      }
    }

    const state = variant.state ? String(variant.state) : "enabled";
    const size = variant.size ? String(variant.size) : "md";

    if (!allowedStates.has(state)) {
      errors.push({
        level: "error",
        code: "invalid_state",
        message: `Invalid state '${state}' on component '${component.name}'`,
        affectedComponents: [component.name]
      });
    }

    if (!allowedSizes.has(size)) {
      warnings.push({
        level: "warning",
        code: "invalid_size",
        message: `Non-standard size '${size}' on component '${component.name}'`,
        affectedComponents: [component.name]
      });
    }

    if (!/^[A-Z]/.test(component.name)) {
      warnings.push({
        level: "warning",
        code: "component_naming",
        message: `Component node name should start with uppercase: '${component.name}'`,
        affectedComponents: [component.name]
      });
    }
  }

  return { warnings, errors };
};
