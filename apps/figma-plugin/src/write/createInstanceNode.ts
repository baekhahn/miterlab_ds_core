import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";
import { loadDefaultFont, loadFont } from "./createTextNode";

interface InputBlueprint {
  targetComponent: "Input";
  sourceComponentName: string;
  updatedAt: string;
  metrics?: {
    width?: number;
    height?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    itemSpacing?: number;
    radius?: number;
    layoutMode?: string;
  };
}

const INPUT_BLUEPRINT_KEY = "miterlab.blueprint.input.v1";

const sanitizeInputBlueprint = (blueprint: InputBlueprint | null): InputBlueprint | null => {
  if (!blueprint?.metrics) return blueprint;
  const { width, height } = blueprint.metrics;
  if ((typeof width === "number" && width > 800) || (typeof height === "number" && height > 240)) {
    return {
      ...blueprint,
      metrics: {
        ...blueprint.metrics,
        width: undefined,
        height: undefined,
        paddingTop: undefined,
        paddingRight: undefined,
        paddingBottom: undefined,
        paddingLeft: undefined,
        itemSpacing: undefined,
        radius: undefined,
        layoutMode: undefined
      }
    };
  }
  return blueprint;
};

const loadInputBlueprint = async (): Promise<InputBlueprint | null> => {
  const value = await figma.clientStorage.getAsync(INPUT_BLUEPRINT_KEY);
  return value && typeof value === "object" ? sanitizeInputBlueprint(value as InputBlueprint) : null;
};

const rgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255
  };
};

const addLabel = async (
  frame: FrameNode,
  textValue: string,
  color: string,
  align: "MIN" | "CENTER" = "MIN",
  fontSize = 16,
  weight: "regular" | "medium" | "semibold" = "regular",
  lineHeight?: number
) => {
  const font = await loadFont(weight);
  const text = figma.createText();
  text.fontName = font;
  text.characters = textValue;
  text.fontSize = fontSize;
  if (typeof lineHeight === "number") {
    text.lineHeight = { unit: "PIXELS", value: lineHeight };
  }
  text.fills = [{ type: "SOLID", color: rgb(color) }];
  text.textAutoResize = "HEIGHT";
  text.layoutAlign = align === "CENTER" ? "INHERIT" : "STRETCH";
  text.textAlignHorizontal = align === "CENTER" ? "CENTER" : "LEFT";
  if (align === "CENTER") {
    text.x = 0;
    text.y = -1;
  }
  frame.appendChild(text);
};

const getSizeKey = (node: FigmaWriteNode): "sm" | "md" | "lg" => {
  const size = node.variant?.size;
  if (size === "sm" || size === "lg") return size;
  return "md";
};

const getButtonSizeKey = (node: FigmaWriteNode): "mini" | "small" | "middle" | "large" => {
  const size = node.variant?.size;
  if (size === "mini" || size === "small" || size === "middle" || size === "large") return size;
  if (size === "sm") return "small";
  if (size === "lg") return "large";
  return "middle";
};

const getVariantKey = (node: FigmaWriteNode): string => {
  const value = node.variant?.variant;
  return typeof value === "string" ? value : "default";
};

const getStateKey = (node: FigmaWriteNode): string => {
  const value = node.variant?.state;
  return typeof value === "string" ? value : "default";
};

const styleFill = (node: FigmaWriteNode, fallback: string) => node.style?.fill ?? fallback;
const styleStroke = (node: FigmaWriteNode, fallback: string) => node.style?.stroke ?? fallback;
const styleText = (node: FigmaWriteNode, fallback: string) => node.style?.text ?? fallback;
const styleRadius = (node: FigmaWriteNode, fallback: number) => typeof node.style?.radius === "number" ? node.style.radius : fallback;
const stylePaddingX = (node: FigmaWriteNode, fallback: number) => typeof node.style?.paddingX === "number" ? node.style.paddingX : fallback;
const stylePaddingY = (node: FigmaWriteNode, fallback: number) => typeof node.style?.paddingY === "number" ? node.style.paddingY : fallback;
const styleFontSize = (node: FigmaWriteNode, fallback: number) => typeof node.style?.fontSize === "number" ? node.style.fontSize : fallback;
const styleLineHeight = (node: FigmaWriteNode, fallback: number) => typeof node.style?.lineHeight === "number" ? node.style.lineHeight : fallback;
const styleFontWeight = (node: FigmaWriteNode, fallback: "regular" | "medium" | "semibold") => node.style?.fontWeight ?? fallback;
const styleMinWidth = (node: FigmaWriteNode, fallback: number) => typeof node.style?.minWidth === "number" ? node.style.minWidth : fallback;
const styleGap = (node: FigmaWriteNode, fallback: number) => typeof node.style?.gap === "number" ? node.style.gap : fallback;

const buttonVisual = (
  node: FigmaWriteNode,
  defaults: { fill: string; stroke: string; text: string; strokeWeight: number }
) => {
  const state = getStateKey(node);
  if (state === "disabled" && !node.style?.fill && !node.style?.stroke && !node.style?.text) {
    return { fill: "#E0E6EE", stroke: "#E0E6EE", text: "#7E8A9C", strokeWeight: defaults.strokeWeight };
  }

  const fill = styleFill(node, defaults.fill);
  const stroke = styleStroke(node, defaults.stroke);
  const text = styleText(node, defaults.text);
  const strokeWeight = fill === stroke && defaults.strokeWeight === 0 ? 0 : defaults.strokeWeight;

  return { fill, stroke, text, strokeWeight };
};

const buttonVariantFlags = (node: FigmaWriteNode) => ({
  loading: node.variant?.loading === true || node.variant?.loading === "auto" || getStateKey(node) === "loading",
  fullWidth: node.variant?.block === true,
  disabled: node.variant?.disabled === true || getStateKey(node) === "disabled",
  iconOnly: node.variant?.iconOnly === true,
  fill:
    node.variant?.fill === "solid" || node.variant?.fill === "outline" || node.variant?.fill === "none"
      ? node.variant.fill
      : "solid",
  iconPosition:
    node.variant?.iconPosition === "left" || node.variant?.iconPosition === "right"
      ? node.variant.iconPosition
      : undefined
});

type ButtonIconName = "IconPlus" | "IconPlusThick" | "IconTrash" | "IconBlank" | "loading";

const createIconProxy = (
  color: string,
  size: number,
  kind: ButtonIconName
) => {
  const wrapper = figma.createFrame();
  wrapper.layoutMode = "NONE";
  wrapper.resize(size, size);
  wrapper.fills = [];
  wrapper.strokes = [];

  if (kind === "loading") {
    const ring = figma.createEllipse();
    ring.resize(size - 2, size - 2);
    ring.x = 1;
    ring.y = 1;
    ring.fills = [];
    ring.strokes = [{ type: "SOLID", color: rgb(color) }];
    ring.strokeWeight = Math.max(1.5, Math.round(size / 8));
    wrapper.appendChild(ring);

    const dot = figma.createEllipse();
    const dotSize = Math.max(3, Math.round(size / 4));
    dot.resize(dotSize, dotSize);
    dot.x = size - dotSize - 1;
    dot.y = 1;
    dot.fills = [{ type: "SOLID", color: rgb(color) }];
    dot.strokes = [];
    wrapper.appendChild(dot);
    return wrapper;
  }

  if (kind === "IconBlank") {
    const ring = figma.createEllipse();
    const ringSize = Math.max(10, size - 3);
    ring.resize(ringSize, ringSize);
    ring.x = Math.round((size - ringSize) / 2);
    ring.y = Math.round((size - ringSize) / 2);
    ring.fills = [];
    ring.strokes = [{ type: "SOLID", color: rgb(color) }];
    ring.strokeWeight = Math.max(1.25, Math.round(size / 10));
    wrapper.appendChild(ring);
    return wrapper;
  }

  if (kind === "IconTrash") {
    const body = figma.createRectangle();
    const bodyW = Math.max(8, Math.round(size * 0.5));
    const bodyH = Math.max(8, Math.round(size * 0.46));
    body.resize(bodyW, bodyH);
    body.x = Math.round((size - bodyW) / 2);
    body.y = Math.round(size * 0.32);
    body.cornerRadius = 2;
    body.fills = [];
    body.strokes = [{ type: "SOLID", color: rgb(color) }];
    body.strokeWeight = Math.max(1.25, Math.round(size / 11));
    wrapper.appendChild(body);

    const lid = figma.createRectangle();
    const lidW = Math.max(10, Math.round(size * 0.58));
    lid.resize(lidW, 2);
    lid.x = Math.round((size - lidW) / 2);
    lid.y = Math.round(size * 0.24);
    lid.fills = [{ type: "SOLID", color: rgb(color) }];
    lid.strokes = [];
    wrapper.appendChild(lid);

    const handle = figma.createRectangle();
    handle.resize(Math.max(4, Math.round(size * 0.18)), 2);
    handle.x = Math.round((size - handle.width) / 2);
    handle.y = Math.round(size * 0.16);
    handle.fills = [{ type: "SOLID", color: rgb(color) }];
    handle.strokes = [];
    wrapper.appendChild(handle);
    return wrapper;
  }

  const plusThickness = kind === "IconPlusThick" ? Math.max(3, Math.round(size / 4)) : Math.max(2, Math.round(size / 7));
  const armLength = Math.max(10, Math.round(size * 0.72));

  const horizontal = figma.createRectangle();
  horizontal.resize(armLength, plusThickness);
  horizontal.x = Math.round((size - armLength) / 2);
  horizontal.y = Math.round((size - plusThickness) / 2);
  horizontal.cornerRadius = Math.max(1, Math.round(plusThickness / 2));
  horizontal.fills = [{ type: "SOLID", color: rgb(color) }];
  horizontal.strokes = [];
  wrapper.appendChild(horizontal);

  const vertical = figma.createRectangle();
  vertical.resize(plusThickness, armLength);
  vertical.x = Math.round((size - plusThickness) / 2);
  vertical.y = Math.round((size - armLength) / 2);
  vertical.cornerRadius = Math.max(1, Math.round(plusThickness / 2));
  vertical.fills = [{ type: "SOLID", color: rgb(color) }];
  vertical.strokes = [];
  wrapper.appendChild(vertical);

  return wrapper;
};

const addButtonIcon = async (
  frame: FrameNode,
  color: string,
  size: number,
  kind: ButtonIconName
) => {
  const icon = createIconProxy(color, size, kind);
  frame.appendChild(icon);
};

const inputStyle = (state: string) => {
  if (state === "error") return { fill: "#FFFFFF", stroke: "#D34B4B", text: "#1F2430", subtle: "#7E8A9C" };
  if (state === "focus") return { fill: "#FFFFFF", stroke: "#A8B3C2", text: "#1F2430", subtle: "#7E8A9C" };
  if (state === "positive") return { fill: "#FFFFFF", stroke: "#18A06B", text: "#1F2430", subtle: "#7E8A9C" };
  if (state === "readOnly") return { fill: "#F7F8FA", stroke: "#CAD3DE", text: "#475467", subtle: "#98A2B3" };
  if (state === "disabled") return { fill: "#EEF1F5", stroke: "#E0E6EE", text: "#7E8A9C", subtle: "#98A2B3" };
  return { fill: "#FFFFFF", stroke: "#CAD3DE", text: "#1F2430", subtle: "#7E8A9C" };
};

const createInlineText = async (
  value: string,
  color: string,
  fontSize: number,
  lineHeight: number,
  weight: "regular" | "medium" | "semibold" = "regular"
) => {
  const font = await loadFont(weight);
  const text = figma.createText();
  text.fontName = font;
  text.characters = value;
  text.fontSize = fontSize;
  text.lineHeight = { unit: "PIXELS", value: lineHeight };
  text.fills = [{ type: "SOLID", color: rgb(color) }];
  text.textAutoResize = "WIDTH_AND_HEIGHT";
  return text;
};

const createInputAction = async (label: string) => {
  const action = figma.createFrame();
  action.layoutMode = "HORIZONTAL";
  action.primaryAxisAlignItems = "CENTER";
  action.counterAxisAlignItems = "CENTER";
  action.paddingLeft = 10;
  action.paddingRight = 10;
  action.paddingTop = 6;
  action.paddingBottom = 6;
  action.itemSpacing = 0;
  action.cornerRadius = 8;
  action.strokeWeight = 1;
  action.strokes = [{ type: "SOLID", color: rgb("#CAD3DE") }];
  action.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  await addLabel(action, label, "#344054", "CENTER", 12, "medium", 16);
  return action;
};

const createClearGlyph = (color: string, size: number) => {
  const wrapper = figma.createFrame();
  wrapper.layoutMode = "NONE";
  wrapper.resize(size, size);
  wrapper.fills = [{ type: "SOLID", color: rgb("#E0E6EE") }];
  wrapper.cornerRadius = size / 2;
  wrapper.strokes = [];

  const stroke = Math.max(1.5, Math.round(size / 7));
  const arm = Math.max(8, Math.round(size * 0.45));

  const slashA = figma.createRectangle();
  slashA.resize(arm, stroke);
  slashA.cornerRadius = stroke / 2;
  slashA.fills = [{ type: "SOLID", color: rgb(color) }];
  slashA.rotation = 45;
  slashA.x = Math.round((size - arm) / 2);
  slashA.y = Math.round((size - stroke) / 2);
  wrapper.appendChild(slashA);

  const slashB = figma.createRectangle();
  slashB.resize(arm, stroke);
  slashB.cornerRadius = stroke / 2;
  slashB.fills = [{ type: "SOLID", color: rgb(color) }];
  slashB.rotation = -45;
  slashB.x = Math.round((size - arm) / 2);
  slashB.y = Math.round((size - stroke) / 2);
  wrapper.appendChild(slashB);

  return wrapper;
};

const createInputMetaBadge = async (label: string, fill: string, textColor: string) => {
  const badge = figma.createFrame();
  badge.layoutMode = "HORIZONTAL";
  badge.primaryAxisAlignItems = "CENTER";
  badge.counterAxisAlignItems = "CENTER";
  badge.paddingLeft = 6;
  badge.paddingRight = 6;
  badge.paddingTop = 2;
  badge.paddingBottom = 2;
  badge.cornerRadius = 999;
  badge.itemSpacing = 0;
  badge.fills = [{ type: "SOLID", color: rgb(fill) }];
  badge.strokes = [];
  await addLabel(badge, label, textColor, "MIN", 11, "medium", 14);
  return badge;
};

const parseEmbeddedInputValue = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  if (!value.startsWith("input:")) return undefined;
  return value.slice("input:".length).trim();
};

const createEmbeddedInputField = async (value: string, options?: { readOnly?: boolean }) => {
  const field = figma.createFrame();
  field.layoutMode = "HORIZONTAL";
  field.primaryAxisAlignItems = "CENTER";
  field.counterAxisAlignItems = "CENTER";
  field.layoutGrow = 1;
  field.paddingLeft = 12;
  field.paddingRight = 12;
  field.paddingTop = 10;
  field.paddingBottom = 10;
  field.itemSpacing = 8;
  field.cornerRadius = 10;
  field.fills = [{ type: "SOLID", color: rgb(options?.readOnly ? "#F2F4F7" : "#FFFFFF") }];
  field.strokes = [{ type: "SOLID", color: rgb("#D0D5DD") }];
  await addLabel(field, value || "Input", options?.readOnly ? "#98A2B3" : "#667085", "MIN", 14, "regular", 20);
  return field;
};

const toneStyle = (variant: string) => {
  const palette: Record<string, { fill: string; stroke: string; text: string }> = {
    neutral: { fill: "#F7F8FA", stroke: "#E0E6EE", text: "#5F6A7B" },
    default: { fill: "#F7F8FA", stroke: "#E0E6EE", text: "#5F6A7B" },
    success: { fill: "#EAF7F1", stroke: "#1A9B6D", text: "#137B56" },
    warning: { fill: "#FFF5E8", stroke: "#E9A63E", text: "#B8781E" },
    danger: { fill: "#FDEEEE", stroke: "#D34B4B", text: "#9F3030" },
    info: { fill: "#EDF3FF", stroke: "#2E6CFF", text: "#1F57D6" },
    emphasized: { fill: "#12141A", stroke: "#12141A", text: "#FFFFFF" },
    selected: { fill: "#12141A", stroke: "#12141A", text: "#FFFFFF" }
  };

  return palette[variant] ?? palette.default;
};

const createInputNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const state =
    node.variant?.disabled === true
      ? "disabled"
      : node.variant?.readOnly === true
        ? "readOnly"
        : "default";
  const style = inputStyle(state);
  const blueprint = await loadInputBlueprint();
  const blueprintMetrics = blueprint?.metrics;
  const clearable = node.variant?.clearable === true;
  const onlyShowClearWhenFocus = node.variant?.onlyShowClearWhenFocus === true;
  const inputType = typeof node.variant?.type === "string" ? node.variant.type : undefined;
  const placeholderText = typeof node.variant?.placeholder === "string" ? node.variant.placeholder : undefined;
  const inputValue =
    typeof node.variant?.value === "string"
      ? node.variant.value
      : typeof node.variant?.defaultValue === "string"
        ? node.variant.defaultValue
        : node.text;

  const container = figma.createFrame();
  container.name = node.name;
  container.resize(
    Math.max(220, styleMinWidth(node, blueprintMetrics?.width ?? 220), node.width),
    Math.max(1, node.height, blueprintMetrics?.height ?? 0)
  );
  container.x = node.x;
  container.y = node.y;
  container.layoutMode = "VERTICAL";
  container.primaryAxisAlignItems = "MIN";
  container.counterAxisAlignItems = "MIN";
  container.itemSpacing = 6;
  container.fills = [];
  container.strokes = [];

  const frame = figma.createFrame();
  frame.name = `${node.name} / field`;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = stylePaddingX(node, blueprintMetrics?.paddingLeft ?? 0);
  frame.paddingRight = stylePaddingX(node, blueprintMetrics?.paddingRight ?? 0);
  frame.paddingTop = stylePaddingY(node, blueprintMetrics?.paddingTop ?? 0);
  frame.paddingBottom = stylePaddingY(node, blueprintMetrics?.paddingBottom ?? 0);
  frame.itemSpacing = blueprintMetrics?.itemSpacing ?? 8;
  frame.cornerRadius = styleRadius(node, blueprintMetrics?.radius ?? 0);
  frame.strokeWeight = 1;
  frame.strokes = [{ type: "SOLID", color: rgb(styleStroke(node, style.stroke)) }];
  frame.fills = [{ type: "SOLID", color: rgb(styleFill(node, style.fill)) }];
  frame.layoutAlign = "STRETCH";
  const fontSize = styleFontSize(node, 17);
  const lineHeight = styleLineHeight(node, 26);

  const valueNode = await createInlineText(
    inputType === "password" && inputValue ? "••••••••" : inputValue || placeholderText || "Input",
    inputValue ? styleText(node, style.text) : style.subtle,
    fontSize,
    lineHeight,
    styleFontWeight(node, inputValue ? "regular" : "medium")
  );
  valueNode.layoutGrow = 1;
  frame.appendChild(valueNode);

  if (clearable && inputValue && !onlyShowClearWhenFocus) {
    frame.appendChild(createClearGlyph("#667085", Math.max(16, fontSize + 2)));
  }

  container.appendChild(frame);

  return container;
};

const createTextareaNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = await createInputNode(node);
  frame.resize(Math.max(280, node.width), Math.max(96, node.height));
  frame.counterAxisAlignItems = "MIN";
  frame.paddingTop = 12;
  frame.paddingBottom = 12;
  return frame;
};

const createSelectNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = await createInputNode(node);
  await addLabel(frame, "▾", "#6B7280", "CENTER", 14);
  return frame;
};

const createButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getButtonSizeKey(node);
  const flags = buttonVariantFlags(node);
  const visual = buttonVisual(node, { fill: "#FFFFFF", stroke: "#D7DEE8", text: "#1F2430", strokeWeight: 1 });
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(
    Math.max(
      flags.iconOnly ? node.height : styleMinWidth(node, size === "mini" ? 64 : size === "small" ? 80 : size === "large" ? 112 : 92),
      node.width
    ),
    Math.max(1, node.height)
  );
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = flags.iconOnly ? 0 : stylePaddingX(node, size === "large" ? 20 : size === "small" ? 12 : size === "mini" ? 10 : 16);
  frame.paddingRight = flags.iconOnly ? 0 : stylePaddingX(node, size === "large" ? 20 : size === "small" ? 12 : size === "mini" ? 10 : 16);
  frame.paddingTop = stylePaddingY(node, size === "mini" ? 5 : size === "small" ? 7 : size === "large" ? 10 : 8);
  frame.paddingBottom = stylePaddingY(node, size === "mini" ? 5 : size === "small" ? 7 : size === "large" ? 10 : 8);
  frame.itemSpacing = styleGap(node, size === "mini" ? 4 : 6);
  frame.cornerRadius = styleRadius(node, size === "large" ? 14 : size === "small" ? 10 : 12);
  frame.strokeWeight = flags.fill === "none" ? 0 : visual.strokeWeight;
  frame.strokes = frame.strokeWeight === 0 ? [] : [{ type: "SOLID", color: rgb(visual.stroke) }];
  frame.fills = [{ type: "SOLID", color: rgb(visual.fill) }];
  const loadingText = typeof node.variant?.loadingText === "string" ? node.variant.loadingText : undefined;
  const label = flags.loading ? loadingText ?? "Loading" : node.text || "Action";
  const textColor = visual.text;
  const iconSize = Math.max(12, styleFontSize(node, size === "mini" ? 13 : size === "small" ? 13 : size === "large" ? 17 : 15));
  if (flags.loading) {
    await addButtonIcon(frame, textColor, iconSize, "loading");
  }

  await addLabel(
    frame,
    label,
    textColor,
    "CENTER",
    styleFontSize(node, size === "mini" ? 13 : size === "small" ? 13 : size === "large" ? 17 : 15),
    styleFontWeight(node, "medium"),
    styleLineHeight(node, size === "mini" ? 18 : size === "small" ? 18 : size === "large" ? 24 : 22)
  );

  return frame;
};

const createIconButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getSizeKey(node);
  const flags = buttonVariantFlags(node);
  const visual = buttonVisual(node, { fill: "#FFFFFF", stroke: "#D7DEE8", text: "#1F2430", strokeWeight: 1 });
  const frame = figma.createFrame();
  frame.name = node.name;
  const dimension = Math.max(node.height, styleMinWidth(node, size === "sm" ? 32 : size === "lg" ? 48 : 40));
  const inset = stylePaddingX(node, size === "sm" ? 8 : size === "lg" ? 12 : 10);
  frame.resize(dimension, dimension);
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = inset;
  frame.paddingRight = inset;
  frame.paddingTop = inset;
  frame.paddingBottom = inset;
  frame.itemSpacing = 0;
  frame.cornerRadius = styleRadius(node, size === "lg" ? 12 : 8);
  frame.strokeWeight = visual.strokeWeight;
  frame.strokes = visual.strokeWeight === 0 ? [] : [{ type: "SOLID", color: rgb(visual.stroke) }];
  frame.fills = [{ type: "SOLID", color: rgb(visual.fill) }];
  await addButtonIcon(
    frame,
    visual.text,
    styleFontSize(node, size === "sm" ? 12 : size === "lg" ? 16 : 14),
    flags.loading ? "loading" : "IconBlank"
  );
  return frame;
};

const createTextButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getSizeKey(node);
  const flags = buttonVariantFlags(node);
  const visual = buttonVisual(node, { fill: "#FFFFFF", stroke: "#FFFFFF", text: "#1F2430", strokeWeight: 0 });
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(styleMinWidth(node, 56), node.width), Math.max(1, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = stylePaddingX(node, size === "sm" ? 6 : 8);
  frame.paddingRight = stylePaddingX(node, size === "sm" ? 6 : 8);
  frame.paddingTop = stylePaddingY(node, 6);
  frame.paddingBottom = stylePaddingY(node, 6);
  frame.itemSpacing = styleGap(node, size === "sm" ? 4 : 6);
  frame.cornerRadius = styleRadius(node, 8);
  frame.strokes = [];
  frame.fills = [];
  const textColor = visual.text;
  const label = flags.loading ? "Loading" : node.text || "Text action";
  const iconKind: ButtonIconName = flags.loading
    ? "loading"
    : flags.iconPosition === "right"
      ? "IconTrash"
      : "IconPlus";

  if (flags.iconPosition === "left") {
    await addButtonIcon(frame, textColor, styleFontSize(node, size === "sm" ? 13 : 14), iconKind);
  }

  await addLabel(
    frame,
    label,
    textColor,
    "CENTER",
    styleFontSize(node, size === "sm" ? 13 : 14),
    styleFontWeight(node, "medium"),
    styleLineHeight(node, size === "sm" ? 18 : 20)
  );

  if (flags.iconPosition === "right") {
    await addButtonIcon(frame, textColor, styleFontSize(node, size === "sm" ? 13 : 14), iconKind);
  }

  return frame;
};

const createChoiceNode = async (
  node: FigmaWriteNode,
  kind: "checkbox" | "radio" | "switch"
): Promise<FrameNode> => {
  const size = getSizeKey(node);
  const variant = getVariantKey(node);
  const state = getStateKey(node);
  const checked = kind === "switch" ? variant === "on" : variant === "checked";
  const disabled = state === "disabled";
  const containerHeight = kind === "switch" ? (size === "lg" ? 32 : size === "sm" ? 24 : 28) : (size === "lg" ? 32 : size === "sm" ? 20 : 24);
  const controlSize = kind === "switch" ? (size === "lg" ? 52 : size === "sm" ? 36 : 44) : (size === "lg" ? 20 : size === "sm" ? 16 : 18);
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(240, node.width), Math.max(containerHeight, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 10;
  frame.fills = [];
  frame.strokes = [];

  const control = figma.createFrame();
  control.layoutMode = "NONE";
  control.resize(controlSize, kind === "switch" ? Math.max(20, containerHeight - 4) : controlSize);
  control.cornerRadius = kind === "radio" || kind === "switch" ? 999 : 6;
  control.strokeWeight = 1;
  control.strokes = [{ type: "SOLID", color: rgb(disabled ? "#E0E6EE" : checked ? "#12141A" : "#CBD5E1") }];
  control.fills = [{ type: "SOLID", color: rgb(kind === "switch" ? (checked ? "#12141A" : "#EEF1F5") : checked ? "#12141A" : "#FFFFFF") }];

  if (kind === "switch") {
    const thumb = figma.createEllipse();
    const thumbSize = Math.max(16, control.height - 4);
    thumb.resize(thumbSize, thumbSize);
    thumb.x = checked ? control.width - thumbSize - 2 : 2;
    thumb.y = 2;
    thumb.fills = [{ type: "SOLID", color: rgb(disabled ? "#F7F8FA" : "#FFFFFF") }];
    control.appendChild(thumb);
  } else if (kind === "checkbox" && checked) {
    const font = await loadDefaultFont();
    const mark = figma.createText();
    mark.fontName = font;
    mark.characters = "✓";
    mark.fontSize = size === "lg" ? 14 : 12;
    mark.x = 3;
    mark.y = 1;
    mark.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
    control.appendChild(mark);
  } else if (kind === "radio" && checked) {
    const dot = figma.createEllipse();
    const dotSize = size === "lg" ? 10 : 8;
    dot.resize(dotSize, dotSize);
    dot.x = (control.width - dotSize) / 2;
    dot.y = (control.height - dotSize) / 2;
    dot.fills = [{ type: "SOLID", color: rgb("#12141A") }];
    control.appendChild(dot);
  }

  frame.appendChild(control);
  await addLabel(
    frame,
    node.text || kind,
    styleText(node, disabled ? "#7E8A9C" : "#111827"),
    "MIN",
    styleFontSize(node, size === "lg" ? 15 : 14),
    styleFontWeight(node, "regular"),
    styleLineHeight(node, 20)
  );
  return frame;
};

const createFilterButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getSizeKey(node);
  const selected = node.variant?.selected === true || getStateKey(node) === "selected";
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(styleMinWidth(node, size === "sm" ? 64 : size === "lg" ? 88 : 72), node.width), Math.max(1, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = stylePaddingX(node, size === "sm" ? 10 : size === "lg" ? 16 : 12);
  frame.paddingRight = stylePaddingX(node, size === "sm" ? 10 : size === "lg" ? 16 : 12);
  frame.itemSpacing = 6;
  frame.cornerRadius = styleRadius(node, 16);
  frame.strokeWeight = 1;
  frame.strokes = [{ type: "SOLID", color: rgb(selected ? "#12141A" : "#D7DEE8") }];
  frame.fills = [{ type: "SOLID", color: rgb(selected ? "#12141A" : "#F7F8FA") }];
  await addLabel(
    frame,
    node.text || "Filter",
    styleText(node, selected ? "#FFFFFF" : "#1F2430"),
    "CENTER",
    styleFontSize(node, size === "lg" ? 14 : 13),
    styleFontWeight(node, "medium"),
    styleLineHeight(node, size === "lg" ? 20 : 18)
  );
  return frame;
};

const createCompactPillNode = async (node: FigmaWriteNode, tone: "subtle" | "solid"): Promise<FrameNode> => {
  const variant = getVariantKey(node);
  const toneKey = typeof node.variant?.tone === "string" ? node.variant.tone : undefined;
  const style = toneStyle(toneKey ?? (tone === "solid" ? variant : variant === "default" ? "neutral" : variant));
  const size = getSizeKey(node);
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(styleMinWidth(node, 64), node.width), Math.max(1, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = stylePaddingX(node, size === "lg" ? 14 : size === "sm" ? 10 : 12);
  frame.paddingRight = stylePaddingX(node, size === "lg" ? 14 : size === "sm" ? 10 : 12);
  frame.cornerRadius = styleRadius(node, 999);
  frame.strokeWeight = 1;
  frame.strokes = [{ type: "SOLID", color: rgb(style.stroke) }];
  frame.fills = [{ type: "SOLID", color: rgb(style.fill) }];
  frame.strokes = [{ type: "SOLID", color: rgb(styleStroke(node, style.stroke)) }];
  frame.fills = [{ type: "SOLID", color: rgb(styleFill(node, style.fill)) }];
  await addLabel(
    frame,
    node.text || "Pill",
    styleText(node, style.text),
    "CENTER",
    styleFontSize(node, size === "lg" ? 13 : 12),
    styleFontWeight(node, tone === "solid" ? "medium" : "regular"),
    styleLineHeight(node, size === "lg" ? 18 : 16)
  );
  return frame;
};

const createSurfaceNode = async (
  node: FigmaWriteNode,
  fill: string,
  stroke: string,
  radius: number
): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(240, node.width), Math.max(40, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "MIN";
  frame.paddingTop = stylePaddingY(node, 16);
  frame.paddingBottom = stylePaddingY(node, 16);
  frame.paddingLeft = stylePaddingX(node, 16);
  frame.paddingRight = stylePaddingX(node, 16);
  frame.itemSpacing = typeof node.style?.gap === "number" ? node.style.gap : 8;
  frame.cornerRadius = styleRadius(node, radius);
  frame.strokeWeight = 1;
  frame.strokes = [{ type: "SOLID", color: rgb(stroke) }];
  frame.fills = [{ type: "SOLID", color: rgb(fill) }];
  frame.strokes = [{ type: "SOLID", color: rgb(styleStroke(node, stroke)) }];
  frame.fills = [{ type: "SOLID", color: rgb(styleFill(node, fill)) }];
  await addLabel(
    frame,
    node.text || node.component || "Surface",
    styleText(node, "#111827"),
    "MIN",
    styleFontSize(node, 14),
    styleFontWeight(node, "medium"),
    styleLineHeight(node, 20)
  );
  return frame;
};

const createDividerNode = (node: FigmaWriteNode): LineNode => {
  const line = figma.createLine();
  line.name = node.name;
  line.resize(Math.max(240, node.width), Math.max(1, node.height));
  line.x = node.x;
  line.y = node.y;
  line.strokes = [{ type: "SOLID", color: rgb(styleStroke(node, "#E5E7EB")) }];
  return line;
};

const createSpinnerNode = (node: FigmaWriteNode): EllipseNode => {
  const ellipse = figma.createEllipse();
  ellipse.name = node.name;
  ellipse.resize(Math.max(16, node.width), Math.max(16, node.height));
  ellipse.x = node.x;
  ellipse.y = node.y;
  ellipse.strokes = [{ type: "SOLID", color: rgb(styleStroke(node, "#2E6CFF")) }];
  ellipse.strokeWeight = 2;
  ellipse.fills = [];
  return ellipse;
};

const createProgressNode = (node: FigmaWriteNode): FrameNode => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(160, node.width), Math.max(8, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.cornerRadius = 999;
  frame.fills = [{ type: "SOLID", color: rgb(styleFill(node, "#E0E6EE")) }];
  frame.strokes = [];

  const bar = figma.createRectangle();
  bar.resize(Math.max(48, node.width * 0.56), Math.max(8, node.height));
  bar.cornerRadius = 999;
  bar.fills = [{ type: "SOLID", color: rgb(styleStroke(node, "#2E6CFF")) }];
  frame.appendChild(bar);
  return frame;
};

const createPaginationNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(180, node.width), Math.max(32, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 8;
  frame.fills = [];
  frame.strokes = [];
  await addLabel(frame, node.text || "Pagination", styleText(node, "#5F6A7B"), "MIN", 14, "regular");
  return frame;
};

const splitItems = (value: string | undefined, fallback: string[]) =>
  value ? value.split("|").map((item) => item.trim()).filter(Boolean) : fallback;

const createDialogNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = await createSurfaceNode(node, styleFill(node, "#FFFFFF"), styleStroke(node, "#D0D5DD"), styleRadius(node, 16));
  frame.resize(Math.max(280, node.width), Math.max(220, node.height));
  frame.itemSpacing = 12;
  frame.paddingTop = 20;
  frame.paddingBottom = 20;
  frame.paddingLeft = 20;
  frame.paddingRight = 20;
  frame.removeChildren();

  if (typeof node.variant?.title === "string" && node.variant.title) {
    await addLabel(frame, node.variant.title, "#101828", "MIN", 18, "semibold", 24);
  }
  if (typeof node.variant?.content === "string" && node.variant.content) {
    await addLabel(frame, node.variant.content, "#475467", "MIN", 14, "regular", 20);
  }

  const actions = splitItems(typeof node.variant?.actions === "string" ? node.variant.actions : undefined, ["Cancel", "Confirm"]);
  const actionRow = figma.createFrame();
  actionRow.layoutMode = "HORIZONTAL";
  actionRow.primaryAxisAlignItems = "CENTER";
  actionRow.counterAxisAlignItems = "CENTER";
  actionRow.itemSpacing = 8;
  actionRow.layoutAlign = "STRETCH";
  actionRow.fills = [];
  actionRow.strokes = [];
  for (const [index, action] of actions.entries()) {
    const button = figma.createFrame();
    button.layoutMode = "HORIZONTAL";
    button.primaryAxisAlignItems = "CENTER";
    button.counterAxisAlignItems = "CENTER";
    button.layoutGrow = 1;
    button.paddingLeft = 12;
    button.paddingRight = 12;
    button.paddingTop = 10;
    button.paddingBottom = 10;
    button.cornerRadius = 10;
    button.fills = [{ type: "SOLID", color: rgb(index === actions.length - 1 ? "#1677FF" : "#F2F4F7") }];
    button.strokes = [];
    await addLabel(button, action, index === actions.length - 1 ? "#FFFFFF" : "#344054", "CENTER", 14, "medium", 20);
    actionRow.appendChild(button);
  }
  frame.appendChild(actionRow);
  return frame;
};

const createPopupNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = await createSurfaceNode(node, "#FFFFFF", "#D0D5DD", 16);
  frame.resize(Math.max(280, node.width), Math.max(180, node.height));
  frame.removeChildren();
  frame.paddingTop = 16;
  frame.paddingBottom = 16;
  frame.paddingLeft = 16;
  frame.paddingRight = 16;
  const position = typeof node.variant?.position === "string" ? node.variant.position : "bottom";
  await addLabel(frame, `Popup / ${position}`, "#101828", "MIN", 15, "medium", 20);
  await addLabel(frame, typeof node.variant?.children === "string" ? node.variant.children : "Popup content", "#475467", "MIN", 14, "regular", 20);
  if (node.variant?.showCloseButton === true) {
    const close = await createInputMetaBadge("close", "#F2F4F7", "#344054");
    frame.appendChild(close);
  }
  return frame;
};

const createToastIcon = (kind: string) => {
  if (kind === "loading") {
    return createIconProxy("#FFFFFF", 20, "loading");
  }
  return createIconProxy("#FFFFFF", 20, kind === "fail" ? "IconTrash" : "IconPlus");
};

const createToastNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(180, node.width), Math.max(56, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 8;
  frame.paddingLeft = 16;
  frame.paddingRight = 16;
  frame.paddingTop = 12;
  frame.paddingBottom = 12;
  frame.cornerRadius = 12;
  frame.fills = [{ type: "SOLID", color: rgb("#101828") }];
  frame.strokes = [];
  const icon = typeof node.variant?.icon === "string" ? node.variant.icon : "success";
  frame.appendChild(createToastIcon(icon));
  await addLabel(frame, typeof node.variant?.content === "string" ? node.variant.content : node.text || "Toast", "#FFFFFF", "CENTER", 13, "medium", 18);
  if (typeof node.variant?.duration === "number") {
    await addLabel(frame, `${node.variant.duration}ms`, "#D0D5DD", "CENTER", 11, "regular", 14);
  }
  return frame;
};

const createNavBarNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(320, node.width), Math.max(45, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = 12;
  frame.paddingRight = 12;
  frame.itemSpacing = 12;
  frame.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  frame.strokes = [{ type: "SOLID", color: rgb("#EAECF0") }];
  frame.strokeTopWeight = 0;
  frame.strokeLeftWeight = 0;
  frame.strokeRightWeight = 0;
  frame.strokeBottomWeight = 1;

  const left = figma.createFrame();
  left.layoutMode = "HORIZONTAL";
  left.primaryAxisAlignItems = "CENTER";
  left.counterAxisAlignItems = "CENTER";
  left.itemSpacing = 6;
  left.fills = [];
  left.strokes = [];
  if (node.variant?.backIcon === true || node.variant?.backArrow === true) {
    left.appendChild(await createCellArrow("#344054"));
  }
  if (typeof node.variant?.left === "string") {
    await addLabel(left, node.variant.left, "#344054", "MIN", 14, "regular", 20);
  }
  frame.appendChild(left);

  const title = await createInlineText(
    typeof node.variant?.children === "string" ? node.variant.children : node.text || "Title",
    "#101828",
    17,
    24,
    "medium"
  );
  title.layoutGrow = 1;
  title.textAlignHorizontal = "CENTER";
  frame.appendChild(title);

  const right = figma.createFrame();
  right.layoutMode = "HORIZONTAL";
  right.primaryAxisAlignItems = "CENTER";
  right.counterAxisAlignItems = "CENTER";
  right.itemSpacing = 6;
  right.fills = [];
  right.strokes = [];
  if (typeof node.variant?.right === "string") {
    await addLabel(right, node.variant.right, "#1677FF", "MIN", 14, "medium", 20);
  }
  frame.appendChild(right);
  return frame;
};

const createTabBarNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(320, node.width), Math.max(64, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.itemSpacing = 4;
  frame.paddingLeft = 8;
  frame.paddingRight = 8;
  frame.paddingTop = 4;
  frame.paddingBottom = node.variant?.safeArea === true ? 12 : 4;
  frame.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  frame.strokes = [{ type: "SOLID", color: rgb("#EAECF0") }];
  frame.strokeTopWeight = 1;
  frame.strokeLeftWeight = 0;
  frame.strokeRightWeight = 0;
  frame.strokeBottomWeight = 0;
  const items = parseTabChildren(typeof node.variant?.children === "string" ? node.variant.children : "home:Home|search:Search|profile:Profile");
  const active = typeof node.variant?.activeKey === "string" ? node.variant.activeKey : items[0]?.key;
  for (const item of items) {
    const tab = figma.createFrame();
    tab.layoutMode = "VERTICAL";
    tab.primaryAxisAlignItems = "CENTER";
    tab.counterAxisAlignItems = "CENTER";
    tab.itemSpacing = 4;
    tab.layoutGrow = 1;
    tab.paddingLeft = 8;
    tab.paddingRight = 8;
    tab.paddingTop = 4;
    tab.paddingBottom = 4;
    tab.fills = [];
    tab.strokes = [];
    const icon = createIconProxy(item.key === active ? "#1677FF" : "#667085", 18, "IconBlank");
    tab.appendChild(icon);
    await addLabel(tab, item.label, item.key === active ? "#1677FF" : "#667085", "CENTER", 11, item.key === active ? "medium" : "regular", 14);
    if (typeof node.variant?.badge === "string" && item.key === active) {
      tab.appendChild(await createInputMetaBadge(node.variant.badge, "#F04438", "#FFFFFF"));
    }
    frame.appendChild(tab);
  }
  return frame;
};

const createFormNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const mode = typeof node.variant?.mode === "string" ? node.variant.mode : "default";
  const layout = typeof node.variant?.layout === "string" ? node.variant.layout : "vertical";
  const frame = await createSurfaceNode(node, "#FFFFFF", mode === "card" ? "#E4E7EC" : "#FFFFFF", mode === "card" ? 12 : 0);
  frame.resize(Math.max(280, node.width), Math.max(180, node.height));
  frame.removeChildren();
  frame.itemSpacing = 10;
  frame.paddingLeft = 0;
  frame.paddingRight = 0;
  frame.paddingTop = 0;
  frame.paddingBottom = 0;

  const item = figma.createFrame();
  item.layoutMode = layout === "horizontal" ? "HORIZONTAL" : "VERTICAL";
  item.primaryAxisAlignItems = "MIN";
  item.counterAxisAlignItems = layout === "horizontal" ? "CENTER" : "MIN";
  item.itemSpacing = 8;
  item.paddingLeft = 16;
  item.paddingRight = 16;
  item.paddingTop = 12;
  item.paddingBottom = 12;
  item.layoutAlign = "STRETCH";
  item.fills = [{ type: "SOLID", color: rgb(node.variant?.hidden === true ? "#F9FAFB" : "#FFFFFF") }];
  item.strokes = mode === "card" ? [] : [{ type: "SOLID", color: rgb("#EAECF0") }];
  item.strokeTopWeight = 0;
  item.strokeLeftWeight = 0;
  item.strokeRightWeight = 0;
  item.strokeBottomWeight = 1;

  const labelCol = figma.createFrame();
  labelCol.layoutMode = "VERTICAL";
  labelCol.primaryAxisAlignItems = "MIN";
  labelCol.counterAxisAlignItems = "MIN";
  labelCol.itemSpacing = 4;
  labelCol.fills = [];
  labelCol.strokes = [];
  await addLabel(labelCol, `${typeof node.variant?.label === "string" ? node.variant.label : node.text || "Field"}${node.variant?.required === true ? " *" : ""}`, "#101828", "MIN", 14, "medium", 20);
  if (typeof node.variant?.description === "string") {
    await addLabel(labelCol, node.variant.description, "#667085", "MIN", 12, "regular", 18);
  }
  if (typeof node.variant?.help === "string") {
    await addLabel(labelCol, node.variant.help, "#667085", "MIN", 12, "regular", 18);
  }
  item.appendChild(labelCol);

  const field = figma.createFrame();
  field.layoutMode = "HORIZONTAL";
  field.primaryAxisAlignItems = "CENTER";
  field.counterAxisAlignItems = "CENTER";
  field.layoutGrow = 1;
  field.paddingLeft = 12;
  field.paddingRight = 12;
  field.paddingTop = 10;
  field.paddingBottom = 10;
  field.itemSpacing = 8;
  field.cornerRadius = 10;
  field.fills = [{ type: "SOLID", color: rgb(node.variant?.disabled === true ? "#F2F4F7" : "#FFFFFF") }];
  field.strokes = [{ type: "SOLID", color: rgb("#D0D5DD") }];
  await addLabel(field, typeof node.variant?.extra === "string" ? node.variant.extra : "Input", node.variant?.disabled === true ? "#98A2B3" : "#667085", "MIN", 14, "regular", 20);
  if (node.variant?.clickable === true || node.variant?.arrowIcon === true || node.variant?.arrow === true) {
    field.appendChild(await createCellArrow("#98A2B3"));
  }
  item.appendChild(field);
  frame.appendChild(item);

  if (typeof node.variant?.footer === "string") {
    const footer = figma.createFrame();
    footer.layoutMode = "HORIZONTAL";
    footer.primaryAxisAlignItems = "CENTER";
    footer.counterAxisAlignItems = "CENTER";
    footer.paddingLeft = 16;
    footer.paddingRight = 16;
    footer.paddingTop = 12;
    footer.paddingBottom = 0;
    footer.fills = [];
    footer.strokes = [];
    await addLabel(footer, node.variant.footer, "#1677FF", "MIN", 14, "medium", 20);
    frame.appendChild(footer);
  }
  return frame;
};

const createCellArrow = (color: string) => {
  const arrow = figma.createText();
  return loadDefaultFont().then((font) => {
    arrow.fontName = font;
    arrow.characters = "›";
    arrow.fontSize = 18;
    arrow.fills = [{ type: "SOLID", color: rgb(color) }];
    arrow.textAutoResize = "WIDTH_AND_HEIGHT";
    return arrow;
  });
};

const createCellNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const disabled = node.variant?.disabled === true;
  const clickable = node.variant?.clickable === true;
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(280, node.width), Math.max(node.height, 56));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = 16;
  frame.paddingRight = 16;
  frame.paddingTop = node.height >= 72 ? 14 : 12;
  frame.paddingBottom = node.height >= 72 ? 14 : 12;
  frame.itemSpacing = 12;
  frame.fills = [{ type: "SOLID", color: rgb(disabled ? "#F7F8FA" : clickable ? "#FCFCFD" : "#FFFFFF") }];
  frame.strokes = [{ type: "SOLID", color: rgb("#E4E7EC") }];
  frame.strokeWeight = 1;

  if (typeof node.variant?.prefix === "string" && node.variant.prefix) {
    const prefix = figma.createFrame();
    prefix.layoutMode = "HORIZONTAL";
    prefix.primaryAxisAlignItems = "CENTER";
    prefix.counterAxisAlignItems = "CENTER";
    prefix.resize(28, 28);
    prefix.cornerRadius = 999;
    prefix.fills = [{ type: "SOLID", color: rgb("#EEF2F6") }];
    prefix.strokes = [];
    await addLabel(prefix, node.variant.prefix, "#344054", "CENTER", 12, "medium", 16);
    frame.appendChild(prefix);
  }

  const content = figma.createFrame();
  content.layoutMode = "VERTICAL";
  content.primaryAxisAlignItems = "MIN";
  content.counterAxisAlignItems = "MIN";
  content.itemSpacing = 4;
  content.fills = [];
  content.strokes = [];
  content.layoutGrow = 1;
  await addLabel(
    content,
    typeof node.variant?.title === "string" ? node.variant.title : node.text || "Cell",
    disabled ? "#98A2B3" : "#101828",
    "MIN",
    15,
    "regular",
    22
  );
  if (typeof node.variant?.description === "string" && node.variant.description) {
    await addLabel(content, node.variant.description, disabled ? "#B0B8C4" : "#667085", "MIN", 13, "regular", 18);
  }
  frame.appendChild(content);

  const embeddedInputValue = parseEmbeddedInputValue(node.variant?.children);
  if (embeddedInputValue) {
    frame.appendChild(await createEmbeddedInputField(embeddedInputValue, { readOnly: disabled }));
  } else if (typeof node.variant?.extra === "string" && node.variant.extra) {
    const extra = await createInlineText(node.variant.extra, disabled ? "#B0B8C4" : "#667085", 13, 18, "regular");
    frame.appendChild(extra);
  }

  if (node.variant?.arrowIcon === true || node.variant?.arrow === true || typeof node.variant?.arrowIcon === "string" || typeof node.variant?.arrow === "string") {
    frame.appendChild(await createCellArrow(disabled ? "#B0B8C4" : "#98A2B3"));
  }

  return frame;
};

const createListNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const mode = typeof node.variant?.mode === "string" ? node.variant.mode : "default";
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(280, node.width), Math.max(node.height, mode === "card" ? 184 : 160));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "MIN";
  frame.itemSpacing = 10;
  frame.paddingLeft = 0;
  frame.paddingRight = 0;
  frame.paddingTop = 0;
  frame.paddingBottom = 0;
  frame.cornerRadius = mode === "card" ? 12 : 0;
  frame.strokeWeight = mode === "card" ? 1 : 0;
  frame.strokes = mode === "card" ? [{ type: "SOLID", color: rgb("#E4E7EC") }] : [];
  frame.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];

  if (typeof node.variant?.header === "string" && node.variant.header) {
    const header = figma.createFrame();
    header.layoutMode = "HORIZONTAL";
    header.primaryAxisAlignItems = "MIN";
    header.counterAxisAlignItems = "CENTER";
    header.paddingLeft = 4;
    header.paddingRight = 4;
    header.paddingTop = 0;
    header.paddingBottom = 0;
    header.fills = [];
    header.strokes = [];
    await addLabel(header, node.variant.header, "#667085", "MIN", 13, "medium", 18);
    frame.appendChild(header);
  }

  const body = figma.createFrame();
  body.layoutMode = "VERTICAL";
  body.primaryAxisAlignItems = "MIN";
  body.counterAxisAlignItems = "MIN";
  body.itemSpacing = 0;
  body.layoutAlign = "STRETCH";
  body.cornerRadius = mode === "card" ? 12 : 0;
  body.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  body.strokes = mode === "card" ? [{ type: "SOLID", color: rgb("#E4E7EC") }] : [];
  body.strokeWeight = mode === "card" ? 1 : 0;

  const items =
    typeof node.variant?.children === "string" && node.variant.children
      ? node.variant.children.split("|").map((item) => item.trim()).filter(Boolean)
      : ["Item 1", "Item 2", "Item 3"];

  for (const [index, item] of items.entries()) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisAlignItems = "MIN";
    row.counterAxisAlignItems = "CENTER";
    row.paddingLeft = 16;
    row.paddingRight = 16;
    row.paddingTop = 12;
    row.paddingBottom = 12;
    row.itemSpacing = 12;
    row.layoutAlign = "STRETCH";
    row.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
    row.strokes = index < items.length - 1 ? [{ type: "SOLID", color: rgb("#EAECF0") }] : [];
    row.strokeTopWeight = 0;
    row.strokeLeftWeight = 0;
    row.strokeRightWeight = 0;
    row.strokeBottomWeight = index < items.length - 1 ? 1 : 0;
    const embeddedInputMarker = "::input:";
    if (item.includes(embeddedInputMarker)) {
      const [label, value] = item.split(embeddedInputMarker);
      const content = figma.createFrame();
      content.layoutMode = "VERTICAL";
      content.primaryAxisAlignItems = "MIN";
      content.counterAxisAlignItems = "MIN";
      content.itemSpacing = 8;
      content.layoutGrow = 1;
      content.fills = [];
      content.strokes = [];
      await addLabel(content, label.trim(), "#101828", "MIN", 15, "regular", 22);
      content.appendChild(await createEmbeddedInputField(value.trim()));
      row.appendChild(content);
    } else {
      await addLabel(row, item, "#101828", "MIN", 15, "regular", 22);
    }
    body.appendChild(row);
  }

  frame.appendChild(body);
  return frame;
};

const parseTabChildren = (value: string | undefined): Array<{ key: string; label: string }> => {
  if (!value) {
    return [
      { key: "tab-1", label: "Tab 1" },
      { key: "tab-2", label: "Tab 2" },
      { key: "tab-3", label: "Tab 3" }
    ];
  }

  return value
    .split("|")
    .map((item, index) => {
      const trimmed = item.trim();
      if (!trimmed) return null;
      const [candidateKey, candidateLabel] = trimmed.includes(":") ? trimmed.split(":", 2) : [undefined, trimmed];
      const label = (candidateLabel ?? candidateKey ?? `Tab ${index + 1}`).trim();
      const key = ((candidateKey ?? label) || `tab-${index + 1}`).trim();
      return { key, label };
    })
    .filter((item): item is { key: string; label: string } => item !== null);
};

const createSingleTabChip = async (
  label: string,
  options: { active?: boolean; disabled?: boolean; width?: number; activeLineMode?: string; activeLineColor?: string }
) => {
  const item = figma.createFrame();
  item.layoutMode = "VERTICAL";
  item.primaryAxisAlignItems = "CENTER";
  item.counterAxisAlignItems = "CENTER";
  item.itemSpacing = 8;
  item.paddingLeft = 12;
  item.paddingRight = 12;
  item.paddingTop = 8;
  item.paddingBottom = 0;
  item.fills = [];
  item.strokes = [];
  if (typeof options.width === "number" && options.width > 0) {
    item.resize(options.width, 36);
  }

  const titleColor = options.disabled ? "#98A2B3" : options.active ? "#12141A" : "#667085";
  await addLabel(item, label, titleColor, "CENTER", 14, options.active ? "medium" : "regular", 20);

  const line = figma.createRectangle();
  const lineColor = options.activeLineColor ?? "#1677FF";
  const lineHeight = options.active ? 2 : 1;
  const lineWidth =
    options.activeLineMode === "fixed"
      ? 20
      : options.activeLineMode === "full"
        ? Math.max(32, (typeof options.width === "number" ? options.width : 56) - 8)
        : Math.max(18, Math.round(label.length * 6.5));
  line.resize(lineWidth, lineHeight);
  line.cornerRadius = 999;
  line.fills = [{ type: "SOLID", color: rgb(options.active ? lineColor : "#FFFFFF") }];
  line.strokes = [];
  item.appendChild(line);

  return item;
};

const createGenericInstanceNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getSizeKey(node);
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(styleMinWidth(node, 48), node.width), Math.max(1, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = stylePaddingX(node, size === "lg" ? 16 : size === "sm" ? 8 : 12);
  frame.paddingRight = stylePaddingX(node, size === "lg" ? 16 : size === "sm" ? 8 : 12);
  frame.paddingTop = stylePaddingY(node, 8);
  frame.paddingBottom = stylePaddingY(node, 8);
  frame.itemSpacing = 8;
  frame.cornerRadius = styleRadius(node, size === "lg" ? 12 : 8);
  frame.strokes = [{ type: "SOLID", color: rgb(styleStroke(node, "#CBD5E1")) }];
  frame.strokeWeight = 1;
  frame.fills = [{ type: "SOLID", color: rgb(styleFill(node, "#F8FAFC")) }];
  await addLabel(
    frame,
    node.text || node.component || "Component",
    styleText(node, "#0F172A"),
    "MIN",
    styleFontSize(node, size === "lg" ? 15 : size === "sm" ? 13 : 14),
    styleFontWeight(node, "regular"),
    styleLineHeight(node, size === "lg" ? 22 : size === "sm" ? 18 : 20)
  );
  return frame;
};

const createTabsNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  if (node.component === "Tab") {
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(styleMinWidth(node, 96), node.width), Math.max(1, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.itemSpacing = 8;
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.paddingTop = 8;
    frame.paddingBottom = 0;
    frame.fills = [];
    frame.strokes = [];

    const disabled = node.variant?.disabled === true;
    const title =
      typeof node.variant?.title === "string"
        ? node.variant.title
        : typeof node.variant?.children === "string"
          ? node.variant.children
          : node.text || "Tab";
    await addLabel(frame, title, disabled ? "#98A2B3" : "#12141A", "CENTER", 14, disabled ? "regular" : "medium", 20);

    const line = figma.createRectangle();
    line.resize(Math.max(20, Math.round(title.length * 6)), 2);
    line.cornerRadius = 999;
    line.fills = [{ type: "SOLID", color: rgb(disabled ? "#E4E7EC" : "#1677FF") }];
    line.strokes = [];
    frame.appendChild(line);
    return frame;
  }

  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(240, node.width), Math.max(72, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "VERTICAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "MIN";
  frame.itemSpacing = 12;
  frame.paddingLeft = stylePaddingX(node, 0);
  frame.paddingRight = stylePaddingX(node, 0);
  frame.paddingTop = stylePaddingY(node, 0);
  frame.paddingBottom = stylePaddingY(node, 0);
  frame.fills = [{ type: "SOLID", color: rgb(styleFill(node, "#FFFFFF")) }];
  frame.strokes = [];

  const row = figma.createFrame();
  row.name = `${node.name} / nav`;
  row.layoutMode = "HORIZONTAL";
  row.primaryAxisAlignItems = "MIN";
  row.counterAxisAlignItems = "MIN";
  row.itemSpacing = 8;
  row.fills = [];
  row.strokes = [];
  row.layoutAlign = "STRETCH";
  if (node.variant?.direction === "rtl") {
    row.primaryAxisAlignItems = "MAX";
  }

  const tabs = parseTabChildren(typeof node.variant?.children === "string" ? node.variant.children : node.text);
  const activeKey =
    typeof node.variant?.activeKey === "string"
      ? node.variant.activeKey
      : typeof node.variant?.defaultActiveKey === "string"
        ? node.variant.defaultActiveKey
        : tabs[0]?.key;
  const stretch = node.variant?.stretch === true;
  const activeLineMode = typeof node.variant?.activeLineMode === "string" ? node.variant.activeLineMode : "auto";
  const activeLineColor = typeof node.variant?.["--active-line-color"] === "string" ? node.variant["--active-line-color"] : "#1677FF";
  const itemWidth = stretch && tabs.length > 0 ? Math.max(72, Math.floor(node.width / tabs.length) - 8) : undefined;

  const rowChildren = node.variant?.direction === "rtl" ? [...tabs].reverse() : tabs;
  for (const tab of rowChildren) {
    row.appendChild(
      await createSingleTabChip(tab.label, {
        active: tab.key === activeKey || tab.label === activeKey,
        width: itemWidth,
        activeLineMode,
        activeLineColor
      })
    );
  }

  frame.appendChild(row);

  const panel = figma.createFrame();
  panel.name = `${node.name} / panel`;
  panel.layoutMode = "VERTICAL";
  panel.primaryAxisAlignItems = "MIN";
  panel.counterAxisAlignItems = "MIN";
  panel.paddingLeft = 12;
  panel.paddingRight = 12;
  panel.paddingTop = 12;
  panel.paddingBottom = 12;
  panel.cornerRadius = 12;
  panel.strokeWeight = 1;
  panel.strokes = [{ type: "SOLID", color: rgb("#E4E7EC") }];
  panel.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  panel.layoutAlign = "STRETCH";

  const panelLabel =
    activeLineMode === "fixed"
      ? "Fixed active line"
      : activeLineMode === "full"
        ? "Full active line"
        : "Auto active line";
  await addLabel(panel, panelLabel, "#475467", "MIN", 13, "regular", 18);

  if (node.variant?.autoScroll === true) {
    const badge = await createInputMetaBadge("autoScroll", "#EEF4FF", "#175CD3");
    panel.appendChild(badge);
  }

  frame.appendChild(panel);
  return frame;
};

const createStatusMessageNode = async (node: FigmaWriteNode, kind: "alert" | "toast"): Promise<FrameNode> => {
  const tone = typeof node.variant?.tone === "string" ? node.variant.tone : getVariantKey(node);
  const style = toneStyle(tone);
  const frame = await createSurfaceNode(node, style.fill, style.stroke, 12);
  frame.resize(
    Math.max(240, node.width),
    Math.max(
      kind === "alert"
        ? getSizeKey(node) === "lg"
          ? 88
          : getSizeKey(node) === "sm"
            ? 64
            : 72
        : getSizeKey(node) === "lg"
          ? 64
          : getSizeKey(node) === "sm"
            ? 48
            : 56,
      node.height
    )
  );
  return frame;
};

const createStructuredRowNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", 0);
  frame.resize(Math.max(240, node.width), Math.max(40, node.height));
  return frame;
};

const createSkeletonNode = (node: FigmaWriteNode): RectangleNode => {
  const rect = figma.createRectangle();
  rect.name = node.name;
  rect.resize(Math.max(40, node.width), Math.max(12, node.height));
  rect.x = node.x;
  rect.y = node.y;
  rect.cornerRadius = Math.min(12, node.height / 2);
  rect.fills = [{ type: "SOLID", color: rgb("#E0E6EE") }];
  rect.strokes = [];
  return rect;
};

export const createInstanceNode = async (node: FigmaWriteNode, theme = "core"): Promise<SceneNode> => {
  if (node.component === "Textarea" || node.component === "TextArea") {
    return await createTextareaNode(node);
  }

  if (node.component === "Select" || node.component === "DatePicker" || node.component === "TimePicker") {
    return await createSelectNode(node);
  }

  if (node.component === "Input" || node.component === "TextField" || node.component === "SearchField" || node.component === "Autocomplete") {
    return await createInputNode(node);
  }

  if (node.component === "Button") {
    return await createButtonNode(node);
  }

  if (node.component === "IconButton") {
    return await createIconButtonNode(node);
  }

  if (node.component === "TextButton") {
    return await createTextButtonNode(node);
  }

  if (node.component === "FilterButton") {
    return await createFilterButtonNode(node);
  }

  if (node.component === "Checkbox") {
    return await createChoiceNode(node, "checkbox");
  }

  if (node.component === "Radio") {
    return await createChoiceNode(node, "radio");
  }

  if (node.component === "Switch") {
    return await createChoiceNode(node, "switch");
  }

  if (node.component === "Tag" || node.component === "ContentBadge" || node.component === "PushBadge") {
    return await createCompactPillNode(node, "subtle");
  }

  if (node.component === "Chip") {
    return await createCompactPillNode(node, "subtle");
  }

  if (node.component === "Badge" || node.component === "PlayBadge") {
    return await createCompactPillNode(node, "solid");
  }

  if (node.component === "Tabs" || node.component === "Tab") {
    return await createTabsNode(node);
  }

  if (node.component === "NavBar") {
    return await createNavBarNode(node);
  }

  if (node.component === "TabBar") {
    return await createTabBarNode(node);
  }

  if (node.component === "SegmentedControl") {
    return await createTabsNode(node);
  }

  if (node.component === "Card" || node.component === "Container") {
    return await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", node.component === "Card" ? 12 : 12);
  }

  if (node.component === "Dialog") {
    return await createDialogNode(node);
  }

  if (node.component === "Popup") {
    return await createPopupNode(node);
  }

  if (node.component === "Modal" || node.component === "Sheet" || node.component === "Popover" || node.component === "Panel" || node.component === "BottomSheet" || node.component === "Menu") {
    return await createSurfaceNode(node, "#FFFFFF", "#D7DEE8", 16);
  }

  if (node.component === "Tooltip") {
    return await createSurfaceNode(node, "#12141A", "#12141A", 8);
  }

  if (node.component === "List") {
    return await createListNode(node);
  }

  if (node.component === "Cell") {
    return await createCellNode(node);
  }

  if (node.component === "Table" || node.component === "ListRow" || node.component === "EmptyState" || node.component === "TableRow") {
    return await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", 12);
  }

  if (node.component === "MetadataRow") {
    return await createStructuredRowNode(node);
  }

  if (node.component === "Alert") {
    return await createStatusMessageNode(node, "alert");
  }

  if (node.component === "Toast") {
    return await createToastNode(node);
  }

  if (node.component === "Toolbar") {
    return await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", 12);
  }

  if (node.component === "Pagination") {
    return await createPaginationNode(node);
  }

  if (node.component === "Form") {
    return await createFormNode(node);
  }

  if (node.component === "FormField" || node.component === "Label") {
    return await createSurfaceNode(node, "#FFFFFF", "#FFFFFF", 0);
  }

  if (node.component === "Snackbar" || node.component === "SectionMessage") {
    return await createStatusMessageNode(node, "toast");
  }

  if (node.component === "Divider") {
    return createDividerNode(node);
  }

  if (node.component === "Skeleton") {
    return createSkeletonNode(node);
  }

  if (node.component === "Spinner" || node.component === "Loading") {
    return createSpinnerNode(node);
  }

  if (node.component === "Progress" || node.component === "ProgressIndicator" || node.component === "ProgressTracker" || node.component === "Slider") {
    return createProgressNode(node);
  }

  return await createGenericInstanceNode(node);
};
