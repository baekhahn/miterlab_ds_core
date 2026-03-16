import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";

export const createFrameNode = (node: FigmaWriteNode): FrameNode => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(1, node.width), Math.max(1, node.height));
  frame.x = node.x;
  frame.y = node.y;

  if (node.name.endsWith("-section")) {
    frame.fills = [];
    frame.strokes = [];
    frame.clipsContent = false;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "FIXED";
    frame.itemSpacing = 12;
  } else {
    frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    frame.strokes = [];
  }

  return frame;
};
