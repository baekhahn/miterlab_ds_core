import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";
import { loadDefaultFont } from "./createTextNode";

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
  fontSize = 16
) => {
  await loadDefaultFont();
  const text = figma.createText();
  text.characters = textValue;
  text.fontSize = fontSize;
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

const createInputNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getSizeKey(node);
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(220, node.width), Math.max(size === "sm" ? 40 : size === "lg" ? 48 : 40, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = size === "sm" ? 12 : 14;
  frame.paddingRight = size === "sm" ? 12 : 14;
  frame.itemSpacing = 8;
  frame.cornerRadius = 10;
  frame.strokes = [{ type: "SOLID", color: rgb("#D1D5DB") }];
  frame.strokeWeight = 1;
  frame.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  await addLabel(frame, node.text || "Input", "#111827", "MIN", 15);
  return frame;
};

const createButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getSizeKey(node);
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(
    Math.max(size === "sm" ? 88 : size === "lg" ? 96 : 88, node.width),
    Math.max(size === "sm" ? 40 : size === "lg" ? 48 : 40, node.height)
  );
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = size === "lg" ? 20 : size === "sm" ? 14 : 16;
  frame.paddingRight = size === "lg" ? 20 : size === "sm" ? 14 : 16;
  frame.itemSpacing = 8;
  frame.cornerRadius = size === "lg" ? 12 : 10;
  frame.strokes = [];
  frame.fills = [{ type: "SOLID", color: rgb("#2563EB") }];
  await addLabel(frame, node.text || "Action", "#FFFFFF", "CENTER", 15);
  return frame;
};

const createFilterButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const size = getSizeKey(node) === "lg" ? "md" : getSizeKey(node);
  const selected = node.variant?.selected === true;
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(size === "sm" ? 64 : 72, node.width), Math.max(size === "sm" ? 28 : 32, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = size === "sm" ? 10 : 12;
  frame.paddingRight = size === "sm" ? 10 : 12;
  frame.itemSpacing = 6;
  frame.cornerRadius = size === "sm" ? 14 : 16;
  frame.strokeWeight = 1;
  frame.strokes = [{ type: "SOLID", color: rgb(selected ? "#12141A" : "#D7DEE8") }];
  frame.fills = [{ type: "SOLID", color: rgb(selected ? "#12141A" : "#F7F8FA") }];
  await addLabel(frame, node.text || "Filter", selected ? "#FFFFFF" : "#1F2430", "CENTER", 14);
  return frame;
};

const createGenericInstanceNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(220, node.width), Math.max(40, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "MIN";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = 14;
  frame.paddingRight = 14;
  frame.cornerRadius = 10;
  frame.strokes = [{ type: "SOLID", color: rgb("#CBD5E1") }];
  frame.strokeWeight = 1;
  frame.fills = [{ type: "SOLID", color: rgb("#F8FAFC") }];
  await addLabel(frame, node.text || node.component || "Component", "#0F172A");
  return frame;
};

export const createInstanceNode = async (node: FigmaWriteNode, theme = "core"): Promise<FrameNode> => {
  if (node.component === "Input") {
    const input = await createInputNode(node);
    if (theme === "core") {
      input.resize(Math.max(296, node.width), Math.max(40, node.height));
      input.cornerRadius = 10;
      input.strokes = [{ type: "SOLID", color: rgb("#D7DEE8") }];
      input.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
    }
    return input;
  }

  if (node.component === "Button") {
    const button = await createButtonNode(node);
    if (theme === "core") {
      button.resize(Math.max(88, node.width), Math.max(node.variant?.size === "lg" ? 48 : 40, node.height));
      button.cornerRadius = node.variant?.size === "lg" ? 12 : 10;
      button.fills = [{ type: "SOLID", color: rgb("#12141A") }];
    }
    return button;
  }

  if (node.component === "FilterButton") {
    return await createFilterButtonNode(node);
  }

  return await createGenericInstanceNode(node);
};
