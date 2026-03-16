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
    comfortable: toPx("8", 32),
    compact: toPx("6", 24)
  } as Record<LayoutDensity, number>,
  componentSpacing: {
    comfortable: toPx("4", 16),
    compact: toPx("3", 12)
  } as Record<LayoutDensity, number>,
  headerSpacing: {
    comfortable: toPx("3", 12),
    compact: toPx("2", 8)
  } as Record<LayoutDensity, number>,
  formSpacing: {
    comfortable: toPx("4", 16),
    compact: toPx("3", 12)
  } as Record<LayoutDensity, number>,
  actionSpacing: {
    comfortable: toPx("6", 24),
    compact: toPx("4", 16)
  } as Record<LayoutDensity, number>,
  framePadding: {
    x: toPx("4", 16),
    top: toPx("10", 40),
    contentTop: toPx("12", 48),
    bottom: toPx("10", 40)
  },
  contentWidth: {
    mobile: 358,
    form: 358,
    narrow: 320
  },
  controlHeights: {
    sm: 40,
    md: 48,
    lg: 56
  },
  textHeights: {
    title: 40,
    subtitle: 24,
    body: 24,
    label: 20,
    caption: 18
  },
  widths: {
    mobile: 390
  },
  heights: {
    mobile: 844
  }
};
