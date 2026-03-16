import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";

const loadDefaultFont = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
};

export const createTextNode = async (node: FigmaWriteNode): Promise<TextNode> => {
  await loadDefaultFont();
  const text = figma.createText();
  text.name = node.name;
  text.characters = node.text ?? "";
  text.x = node.x;
  text.y = node.y;
  text.resize(Math.max(1, node.width), Math.max(1, node.height));
  return text;
};
