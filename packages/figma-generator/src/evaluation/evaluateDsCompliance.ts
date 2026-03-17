import type { McpPayload } from "../mcp/types";
import type { EvaluationIssue } from "./types";

interface DsEvalResult {
  warnings: EvaluationIssue[];
  errors: EvaluationIssue[];
}

const allowedStates = new Set(["default", "hover", "pressed", "disabled", "focus", "error", "positive", "readOnly", "active", "selected", "open", "closing", "loading"]);
const allowedSizes = new Set(["sm", "md", "lg", "mini", "small", "middle", "large"]);
const allowedVariantProps = new Set([
  "variant",
  "tone",
  "color",
  "fill",
  "shape",
  "size",
  "state",
  "selected",
  "iconOnly",
  "block",
  "loading",
  "loadingText",
  "loadingIcon",
  "disabled",
  "readOnly",
  "clearable",
  "value",
  "defaultValue",
  "placeholder",
  "maxLength",
  "minLength",
  "autoComplete",
  "autoFocus",
  "pattern",
  "inputMode",
  "onFocus",
  "onBlur",
  "onPaste",
  "autoCapitalize",
  "autoCorrect",
  "onKeyDown",
  "onKeyUp",
  "onCompositionStart",
  "onCompositionEnd",
  "onClick",
  "step",
  "id",
  "enterKeyHint",
  "onChange",
  "clearIcon",
  "onlyShowClearWhenFocus",
  "onClear",
  "onEnterPress",
  "min",
  "max",
  "form",
  "children",
  "title",
  "header",
  "mode",
  "description",
  "prefix",
  "extra",
  "clickable",
  "arrowIcon",
  "arrow",
  "layout",
  "label",
  "help",
  "footer",
  "left",
  "right",
  "back",
  "visible",
  "image",
  "content",
  "actions",
  "onAction",
  "onClose",
  "closeOnAction",
  "closeOnMaskClick",
  "position",
  "closeOnSwipe",
  "showCloseButton",
  "mask",
  "icon",
  "duration",
  "maskClickable",
  "backIcon",
  "backArrow",
  "onBack",
  "safeArea",
  "badge",
  "required",
  "hidden",
  "childElementPosition",
  "hasFeedback",
  "noStyle",
  "activeKey",
  "defaultActiveKey",
  "activeLineMode",
  "stretch",
  "direction",
  "autoScroll",
  "forceRender",
  "destroyOnClose",
  "onMouseDown",
  "onMouseUp",
  "onTouchStart",
  "onTouchEnd",
  "--text-color",
  "--background-color",
  "--border-radius",
  "--border-width",
  "--border-style",
  "--border-color",
  "--fixed-active-line-width",
  "--active-line-height",
  "--active-line-border-radius",
  "--title-font-size",
  "--content-padding",
  "--active-title-color",
  "--active-line-color",
  "--active-background-color",
  "--align-items",
  "--border-bottom",
  "--border-inner",
  "--border-top",
  "--extra-max-width",
  "--font-size",
  "--header-font-size",
  "--padding-left",
  "--padding-right",
  "--prefix-padding-right",
  "--prefix-width",
  "--height",
  "--z-index",
  "--max-width",
  "--min-width",
  "iconPosition",
  "role",
  "type"
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

    const state = variant.state ? String(variant.state) : "default";
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
