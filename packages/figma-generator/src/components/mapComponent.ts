import { load } from "js-yaml";
import type { FigmaNode } from "../types/figmaNode";
import { layoutRules } from "../grammar/layoutRules";
import { resolveToken, type TokenResolveContext } from "../tokens/resolveToken";

interface ParsedSpec {
  component: string;
  variants?: string[];
  sizes?: string[];
  states?: string[];
  sizeDefaults?: Record<string, Record<string, number>>;
  internalLayout?: Record<string, unknown>;
  semanticMapping: Record<string, Record<string, Record<string, string>>>;
}

export interface MapComponentInput {
  rawSpec: string;
  name?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  variant?: string;
  size?: string;
  state?: string;
  selected?: boolean;
  label?: string;
  tokenContext: TokenResolveContext;
}

const parseSpec = (rawSpec: string): ParsedSpec => {
  return load(rawSpec) as ParsedSpec;
};

const ensureSemanticToken = (token: string): void => {
  if (!token.startsWith("semantic.")) {
    throw new Error(`Only semantic tokens are allowed in component mapping. Received: ${token}`);
  }
};

const pickVariantKey = (input: MapComponentInput, spec: ParsedSpec): string => {
  if (spec.semanticMapping.unselected && spec.semanticMapping.selected) {
    return input.selected ? "selected" : "unselected";
  }
  return input.variant ?? spec.variants?.[0] ?? Object.keys(spec.semanticMapping)[0] ?? "default";
};

const pickStateKey = (input: MapComponentInput, spec: ParsedSpec): string => {
  return input.state ?? spec.states?.[0] ?? "default";
};

export const mapComponent = (input: MapComponentInput): FigmaNode => {
  const spec = parseSpec(input.rawSpec);
  const variantKey = pickVariantKey(input, spec);
  const stateKey = pickStateKey(input, spec);

  const variantMap = spec.semanticMapping[variantKey] ?? {};
  const stateMap = variantMap[stateKey] ?? variantMap.default ?? {};

  const variables: Record<string, string> = {};
  for (const [slotProperty, token] of Object.entries(stateMap)) {
    ensureSemanticToken(token);
    const resolved = resolveToken(token, input.tokenContext);
    variables[slotProperty] = resolved.variable;
  }

  const resolvedSize = input.size ?? spec.sizes?.[0] ?? "md";
  const specHeight = spec.sizeDefaults?.[resolvedSize]?.height;
  const defaultHeight =
    typeof specHeight === "number"
      ? specHeight
      :
    resolvedSize === "sm"
      ? layoutRules.controlHeights.sm
      : resolvedSize === "lg"
        ? layoutRules.controlHeights.lg
        : layoutRules.controlHeights.md;
  const filterButtonWidth = (() => {
    const label = input.label ?? input.name ?? "Filter";
    const horizontalPadding = layoutRules.controlInsets.chipX * 2;
    const estimatedTextWidth = Math.max(32, label.length * 8);
    return Math.max(layoutRules.controlMinWidth.chip, estimatedTextWidth + horizontalPadding);
  })();
  const defaultWidth = spec.component === "FilterButton" ? filterButtonWidth : layoutRules.contentWidth.form;

  return {
    id: `node_${Math.random().toString(36).slice(2, 10)}`,
    type: "INSTANCE",
    name: input.name ?? spec.component,
    x: input.x ?? 0,
    y: input.y ?? 0,
    width: input.width ?? defaultWidth,
    height: input.height ?? defaultHeight,
    component: spec.component,
    variant: {
      variant: input.variant ?? variantKey,
      size: resolvedSize,
      state: stateKey,
      ...(typeof input.selected === "boolean" ? { selected: input.selected } : {})
    },
    variables,
    text: input.label
  };
};
