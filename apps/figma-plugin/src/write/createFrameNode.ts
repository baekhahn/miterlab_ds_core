import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";

export const createFrameNode = (node: FigmaWriteNode): FrameNode => {
  const frame = figma.createFrame();
  frame.name = node.name;
  frame.resize(Math.max(1, node.width), Math.max(1, node.height));
  frame.x = node.x;
  frame.y = node.y;
  return frame;
};
