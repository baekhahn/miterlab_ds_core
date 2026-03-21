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

const fontCache: Partial<Record<"regular" | "medium" | "semibold", FontName>> = {};
let availableFontsPromise: Promise<Font[]> | null = null;

const getAvailableFonts = async () => {
  if (!availableFontsPromise) {
    availableFontsPromise = figma.listAvailableFontsAsync();
  }
  return await availableFontsPromise;
};

const matchPreferredFont = (
  availableFonts: Font[],
  weight: "regular" | "medium" | "semibold"
): FontName | null => {
  const exactCandidates = fontCandidates[weight];

  for (const candidate of exactCandidates) {
    const found = availableFonts.find(
      (font) =>
        font.fontName.family === candidate.family &&
        font.fontName.style === candidate.style
    );
    if (found) {
      return found.fontName;
    }
  }

  for (const candidate of exactCandidates) {
    const found = availableFonts.find((font) => font.fontName.family === candidate.family);
    if (found) {
      return found.fontName;
    }
  }

  const styleHints =
    weight === "semibold"
      ? [/semi/i, /bold/i, /medium/i]
      : weight === "medium"
        ? [/medium/i, /regular/i]
        : [/regular/i, /book/i, /roman/i];

  for (const hint of styleHints) {
    const found = availableFonts.find((font) => hint.test(font.fontName.style));
    if (found) {
      return found.fontName;
    }
  }

  return availableFonts[0]?.fontName ?? null;
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
  if (fontCache[weight]) {
    return fontCache[weight]!;
  }

  const availableFonts = await getAvailableFonts();
  const preferred = matchPreferredFont(availableFonts, weight);
  if (!preferred) {
    throw new Error("사용 가능한 Figma 폰트를 찾지 못했습니다.");
  }

  await figma.loadFontAsync(preferred);
  fontCache[weight] = preferred;
  return preferred;
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
