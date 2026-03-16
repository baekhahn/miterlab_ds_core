import { foundationTokens } from "@miterlab/tokens";
import type { LayoutDensity, SectionKey } from "./designPromptGrammar";

const toPx = (tokenKey: string, fallback: number): number => {
  const spacing = foundationTokens.spacing as Record<string, string | number>;
  const raw = spacing[tokenKey];
  if (typeof raw !== "string") return fallback;
  const parsed = Number(raw.replace("px", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const layoutRules = {
  sectionOrderFallback: ["header", "filter", "content", "form", "list", "detail", "action", "footer", "empty", "modal"] as SectionKey[],
  sectionSpacing: {
    comfortable: toPx("6", 24),
    compact: toPx("4", 16)
  } as Record<LayoutDensity, number>,
  componentSpacing: {
    comfortable: toPx("3", 12),
    compact: toPx("2", 8)
  } as Record<LayoutDensity, number>,
  headerSpacing: {
    comfortable: toPx("2", 8),
    compact: toPx("1", 4)
  } as Record<LayoutDensity, number>,
  framePadding: {
    x: toPx("6", 24),
    top: toPx("8", 32),
    contentTop: toPx("10", 40)
  },
  widths: {
    mobile: 390
  },
  heights: {
    mobile: 844
  }
};
