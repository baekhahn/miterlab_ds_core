import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";
import mobileCore from "../../../../packages/ui-core/contracts/mobile-core.json";
import {
  foundationColors,
  getButtonMetrics,
  getButtonPalette,
  getButtonWidth,
  getInputFocusRing,
  getInputHelperColor,
  getInputMetrics,
  getInputMultilineHeight,
  getInputPalette,
  getInputWidth
} from "../../../../packages/ui-core/contracts/foundationModel.mjs";
import { loadFont } from "./createTextNode";

const rgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255
  };
};

const styleRadius = (node: FigmaWriteNode, fallback: number) =>
  typeof node.style?.radius === "number" ? node.style.radius : fallback;
const stylePaddingX = (node: FigmaWriteNode, fallback: number) =>
  typeof node.style?.paddingX === "number" ? node.style.paddingX : fallback;
const stylePaddingY = (node: FigmaWriteNode, fallback: number) =>
  typeof node.style?.paddingY === "number" ? node.style.paddingY : fallback;
const styleFontSize = (node: FigmaWriteNode, fallback: number) =>
  typeof node.style?.fontSize === "number" ? node.style.fontSize : fallback;
const styleLineHeight = (node: FigmaWriteNode, fallback: number) =>
  typeof node.style?.lineHeight === "number" ? node.style.lineHeight : fallback;
const styleMinWidth = (node: FigmaWriteNode, fallback: number) =>
  typeof node.style?.minWidth === "number" ? node.style.minWidth : fallback;
const styleGap = (node: FigmaWriteNode, fallback: number) =>
  typeof node.style?.gap === "number" ? node.style.gap : fallback;

const createText = async (
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

const getButtonSize = (node: FigmaWriteNode): "sm" | "md" | "lg" => {
  const size = node.variant?.size;
  if (size === "sm" || size === "lg") return size;
  return "md";
};

const getButtonState = (node: FigmaWriteNode): "enabled" | "pressed" | "disabled" | "loading" => {
  const state = node.variant?.state;
  if (state === "pressed" || state === "disabled" || state === "loading") return state;
  return "enabled";
};

const getButtonEmphasis = (node: FigmaWriteNode): "primary" | "secondary" | "tertiary" | "destructive" => {
  const emphasis = node.variant?.emphasis;
  if (emphasis === "secondary" || emphasis === "tertiary" || emphasis === "destructive") return emphasis;
  return "primary";
};

const getInputSize = (node: FigmaWriteNode): "sm" | "md" | "lg" => {
  const size = node.variant?.size;
  if (size === "sm" || size === "lg") return size;
  return "md";
};

const getInputState = (node: FigmaWriteNode): "enabled" | "focused" | "disabled" | "readonly" | "loading" => {
  const state = node.variant?.state;
  if (state === "focused" || state === "disabled" || state === "readonly" || state === "loading") return state;
  return "enabled";
};

const getInputIntent = (node: FigmaWriteNode): "default" | "error" | "success" => {
  const intent = node.variant?.intent;
  if (intent === "error" || intent === "success") return intent;
  return "default";
};

const createLoadingGlyph = (color: string, size: number) => {
  const wrapper = figma.createFrame();
  wrapper.layoutMode = "NONE";
  wrapper.resize(size, size);
  wrapper.fills = [];
  wrapper.strokes = [];

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
};

const createPlusGlyph = (color: string, size: number) => {
  const wrapper = figma.createFrame();
  wrapper.layoutMode = "NONE";
  wrapper.resize(size, size);
  wrapper.fills = [];
  wrapper.strokes = [];

  const thickness = Math.max(2, Math.round(size / 7));
  const arm = Math.max(10, Math.round(size * 0.68));

  const horizontal = figma.createRectangle();
  horizontal.resize(arm, thickness);
  horizontal.cornerRadius = thickness / 2;
  horizontal.x = Math.round((size - arm) / 2);
  horizontal.y = Math.round((size - thickness) / 2);
  horizontal.fills = [{ type: "SOLID", color: rgb(color) }];
  wrapper.appendChild(horizontal);

  const vertical = figma.createRectangle();
  vertical.resize(thickness, arm);
  vertical.cornerRadius = thickness / 2;
  vertical.x = Math.round((size - thickness) / 2);
  vertical.y = Math.round((size - arm) / 2);
  vertical.fills = [{ type: "SOLID", color: rgb(color) }];
  wrapper.appendChild(vertical);

  return wrapper;
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

const createButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const sizeKey = getButtonSize(node);
  const state = getButtonState(node);
  const emphasis = getButtonEmphasis(node);
  const metrics = getButtonMetrics(sizeKey);
  const palette = getButtonPalette(emphasis, state);
  const fill = palette.fill;
  const stroke = palette.stroke;
  const iconOnly = node.variant?.iconOnly === true;
  const iconLeading = node.variant?.iconLeading === true;
  const width = iconOnly
    ? metrics.height
    : node.variant?.width === "full"
      ? getButtonWidth("full")
      : getButtonWidth("hug");

  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(width, styleMinWidth(node, metrics.minWidth), node.width), Math.max(metrics.height, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = iconOnly ? 0 : stylePaddingX(node, metrics.paddingX);
  frame.paddingRight = iconOnly ? 0 : stylePaddingX(node, metrics.paddingX);
  frame.paddingTop = stylePaddingY(node, metrics.paddingY);
  frame.paddingBottom = stylePaddingY(node, metrics.paddingY);
  frame.itemSpacing = styleGap(node, metrics.gap);
  frame.cornerRadius = styleRadius(node, metrics.radius);
  frame.strokeWeight = stroke === "transparent" ? 0 : 1;
  frame.strokes = frame.strokeWeight === 0 ? [] : [{ type: "SOLID", color: rgb(stroke) }];
  frame.fills = fill === "transparent" ? [] : [{ type: "SOLID", color: rgb(fill) }];

  if (state === "loading") {
    frame.appendChild(createLoadingGlyph(palette.text, Math.max(16, metrics.fontSize + 2)));
  } else if (iconLeading || iconOnly) {
    frame.appendChild(createPlusGlyph(palette.text, Math.max(16, metrics.fontSize + 2)));
  }

  if (!iconOnly) {
    const label = await createText(node.text ?? node.name, palette.text, styleFontSize(node, metrics.fontSize), styleLineHeight(node, metrics.lineHeight), "semibold");
    label.textAlignHorizontal = "CENTER";
    frame.appendChild(label);
  }
  return frame;
};

const createInputNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const sizeKey = getInputSize(node);
  const state = getInputState(node);
  const intent = getInputIntent(node);
  const metrics = getInputMetrics(sizeKey);
  const palette = getInputPalette(intent, state);
  const width = node.variant?.width === "hug" ? getInputWidth("hug") : getInputWidth("full");
  const focusRing = getInputFocusRing();
  const stroke = state === "focused" ? focusRing.stroke : palette.stroke;
  const strokeWeight = state === "focused" ? focusRing.strokeWeight : 1;

  const helperText = typeof node.variant?.helperText === "string" ? node.variant.helperText : undefined;
  const multiline = node.variant?.multiline === true;
  const rowsCount =
    typeof node.variant?.rowsCount === "number" && Number.isFinite(node.variant.rowsCount)
      ? Math.max(2, node.variant.rowsCount)
      : 3;
  const fieldHeight = multiline
    ? getInputMultilineHeight(sizeKey, rowsCount)
    : Math.max(metrics.height, node.height);

  const wrapper = figma.createFrame();
  wrapper.name = node.name;
  wrapper.x = node.x;
  wrapper.y = node.y;
  wrapper.layoutMode = "VERTICAL";
  wrapper.primaryAxisAlignItems = "MIN";
  wrapper.counterAxisAlignItems = "MIN";
  wrapper.itemSpacing = helperText ? mobileCore.foundation.spacing.helperTextGap : 0;
  wrapper.fills = [];
  wrapper.strokes = [];

  const frame = figma.createFrame();
  frame.name = `${node.name} / field`;
  frame.resize(Math.max(width, styleMinWidth(node, metrics.minWidth), node.width), fieldHeight);
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = multiline ? "MIN" : "MIN";
  frame.counterAxisAlignItems = multiline ? "MIN" : "CENTER";
  frame.paddingLeft = stylePaddingX(node, metrics.paddingX);
  frame.paddingRight = stylePaddingX(node, metrics.paddingX);
  frame.paddingTop = stylePaddingY(node, metrics.paddingY);
  frame.paddingBottom = stylePaddingY(node, metrics.paddingY);
  frame.itemSpacing = 8;
  frame.cornerRadius = styleRadius(node, metrics.radius);
  frame.strokeWeight = strokeWeight;
  frame.strokes = [{ type: "SOLID", color: rgb(stroke) }];
  frame.fills = [{ type: "SOLID", color: rgb(palette.fill) }];

  const value =
    typeof node.variant?.value === "string"
      ? node.variant.value
      : typeof node.variant?.defaultValue === "string"
        ? node.variant.defaultValue
        : typeof node.variant?.placeholder === "string"
          ? node.variant.placeholder
          : "Input";

  const textColor =
    typeof node.variant?.value === "string" || typeof node.variant?.defaultValue === "string"
      ? palette.text
      : palette.subtle;

  const label = await createText(value, textColor, styleFontSize(node, metrics.fontSize), styleLineHeight(node, metrics.lineHeight));
  label.layoutGrow = 1;
  if (multiline) {
    label.textAutoResize = "HEIGHT";
  }
  frame.appendChild(label);

  if (state === "loading") {
    frame.appendChild(createLoadingGlyph(foundationColors.text.assistive, Math.max(16, metrics.fontSize + 2)));
  } else if (node.variant?.clearable === true && typeof node.variant?.value === "string") {
    frame.appendChild(createClearGlyph(foundationColors.text.assistive, Math.max(16, metrics.fontSize + 3)));
  }

  wrapper.appendChild(frame);

  if (helperText) {
    const helper = await createText(
      helperText,
      getInputHelperColor(intent),
      12,
      18,
      "regular"
    );
    wrapper.appendChild(helper);
  }

  wrapper.resize(frame.width, fieldHeight + (helperText ? 24 : 0));
  return wrapper;
};

const createFallbackNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(160, node.width), Math.max(40, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = 12;
  frame.paddingRight = 12;
  frame.cornerRadius = 10;
  frame.fills = [{ type: "SOLID", color: rgb(foundationColors.surface.panel) }];
  frame.strokes = [{ type: "SOLID", color: rgb(foundationColors.border.default) }];
  const text = await createText(node.component ?? node.name, foundationColors.text.secondary, 13, 18, "medium");
  frame.appendChild(text);
  return frame;
};

export const createInstanceNode = async (node: FigmaWriteNode): Promise<SceneNode> => {
  if (node.component === "Button") {
    return await createButtonNode(node);
  }

  if (node.component === "Input") {
    return await createInputNode(node);
  }

  return await createFallbackNode(node);
};
