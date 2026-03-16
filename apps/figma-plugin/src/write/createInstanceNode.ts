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
  align: "MIN" | "CENTER" = "MIN"
) => {
  await loadDefaultFont();
  const text = figma.createText();
  text.characters = textValue;
  text.fontSize = 16;
  text.fills = [{ type: "SOLID", color: rgb(color) }];
  text.layoutAlign = "STRETCH";
  text.textAlignHorizontal = align === "CENTER" ? "CENTER" : "LEFT";
  frame.appendChild(text);
};

const createInputNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
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
  frame.itemSpacing = 8;
  frame.cornerRadius = 10;
  frame.strokes = [{ type: "SOLID", color: rgb("#D1D5DB") }];
  frame.strokeWeight = 1;
  frame.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  await addLabel(frame, node.text || "Input", "#111827");
  return frame;
};

const createButtonNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(220, node.width), Math.max(44, node.height));
  frame.x = node.x;
  frame.y = node.y;
  frame.layoutMode = "HORIZONTAL";
  frame.primaryAxisAlignItems = "CENTER";
  frame.counterAxisAlignItems = "CENTER";
  frame.paddingLeft = 16;
  frame.paddingRight = 16;
  frame.itemSpacing = 8;
  frame.cornerRadius = 10;
  frame.strokes = [];
  frame.fills = [{ type: "SOLID", color: rgb("#2563EB") }];
  await addLabel(frame, node.text || "Action", "#FFFFFF", "CENTER");
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

export const createInstanceNode = async (node: FigmaWriteNode): Promise<FrameNode> => {
  if (node.component === "Input") {
    return await createInputNode(node);
  }

  if (node.component === "Button") {
    return await createButtonNode(node);
  }

  return await createGenericInstanceNode(node);
};
