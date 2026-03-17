import type { FigmaWriteNode } from "../../../../shared/contracts/figmaWritePayload";

const fontCandidates: Record<string, FontName[]> = {
  regular: [
    { family: "Pretendard", style: "Regular" },
    { family: "Pretendard Variable", style: "Regular" },
    { family: "Inter", style: "Regular" }
  ],
  medium: [
    { family: "Pretendard", style: "Medium" },
    { family: "Pretendard Variable", style: "Medium" },
    { family: "Inter", style: "Medium" },
    { family: "Pretendard", style: "Regular" },
    { family: "Inter", style: "Regular" }
  ],
  semibold: [
    { family: "Pretendard", style: "SemiBold" },
    { family: "Pretendard Variable", style: "SemiBold" },
    { family: "Inter", style: "Semi Bold" },
    { family: "Pretendard", style: "Medium" },
    { family: "Inter", style: "Medium" }
  ]
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

export const loadFont = async (weight: "regular" | "medium" | "semibold" = "regular"): Promise<FontName> => {
  for (const font of fontCandidates[weight]) {
    try {
      await figma.loadFontAsync(font);
      return font;
    } catch {
      continue;
    }
  }

  throw new Error("No supported default font found. Install Pretendard or Inter in Figma.");
};

export const loadDefaultFont = async (): Promise<FontName> => {
  return loadFont("regular");
};

const typographyMap: Record<string, { fontSize: number; lineHeight: number; weight: "regular" | "medium" | "semibold" }> = {
  "text/heading/xl": { fontSize: 32, lineHeight: 40, weight: "semibold" },
  "text/heading/lg": { fontSize: 24, lineHeight: 32, weight: "semibold" },
  "text/body/lg": { fontSize: 18, lineHeight: 28, weight: "medium" },
  "text/body/md": { fontSize: 15, lineHeight: 24, weight: "regular" },
  "text/body/sm": { fontSize: 13, lineHeight: 20, weight: "regular" },
  "text/label/md": { fontSize: 14, lineHeight: 20, weight: "medium" },
  "text/caption": { fontSize: 12, lineHeight: 18, weight: "regular" }
};

export const createTextNode = async (node: FigmaWriteNode): Promise<TextNode> => {
  const token = typeof node.style?.text === "string" ? node.style.text : "text/body/md";
  const typography = typographyMap[token] ?? typographyMap["text/body/md"];
  const font = await loadFont(typography.weight);
  const text = figma.createText();
  text.name = node.name;
  text.fontName = font;
  text.characters = typeof node.text === "string" ? node.text : "";
  text.fontSize = typography.fontSize;
  text.lineHeight = { unit: "PIXELS", value: typography.lineHeight };
  if (node.style?.fill) {
    text.fills = [{ type: "SOLID", color: rgb(node.style.fill) }];
  }
  text.x = node.x;
  text.y = node.y;
  text.resize(Math.max(1, node.width), Math.max(1, node.height));
  return text;
};
