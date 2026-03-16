import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";

export const createContainerNode = (node: FigmaWriteNode): RectangleNode => {
  const rect = figma.createRectangle();
  rect.name = node.name;
  rect.resize(Math.max(1, node.width), Math.max(1, node.height));
  rect.x = node.x;
  rect.y = node.y;
  rect.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.97, b: 0.99 } }];
  return rect;
};
