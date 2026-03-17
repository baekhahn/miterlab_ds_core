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
    narrow: 320,
    compact: 240,
    catalog: 1320
  },
  controlHeights: {
    xs: 28,
    sm: 32,
    md: 40,
    lg: 48
  },
  rowHeights: {
    sm: 40,
    md: 48,
    lg: 56
  },
  controlInsets: {
    fieldGap: 12,
    buttonX: 16,
    buttonXLg: 20,
    inputX: 14,
    chipX: 12,
    containerSm: 12,
    containerMd: 16,
    containerLg: 20,
    containerXl: 24
  },
  controlRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    button: 8,
    input: 8,
    chip: 16,
    card: 12,
    modal: 16
  },
  controlMinWidth: {
    button: 88,
    chip: 64,
    switch: 44,
    tabs: 72
  },
  textHeights: {
    title: 32,
    subtitle: 24,
    body: 24,
    label: 20,
    caption: 18
  },
  componentDefaults: {
    textarea: { width: 358, height: 96 },
    select: { width: 358, height: 40 },
    "check-mark": { width: 24, height: 24 },
    checkbox: { width: 358, height: 24 },
    radio: { width: 358, height: 24 },
    switch: { width: 358, height: 28 },
    tabs: { width: 358, height: 40 },
    "nav-bar": { width: 358, height: 45 },
    "tab-bar": { width: 358, height: 64 },
    form: { width: 358, height: 220 },
    modal: { width: 358, height: 220 },
    dialog: { width: 320, height: 180 },
    popup: { width: 358, height: 240 },
    tag: { width: 84, height: 28 },
    badge: { width: 72, height: 24 },
    chip: { width: 84, height: 32 },
    pagination: { width: 220, height: 32 },
    "segmented-control": { width: 358, height: 40 },
    list: { width: 358, height: 160 },
    cell: { width: 358, height: 64 },
    table: { width: 358, height: 160 },
    "table-row": { width: 358, height: 48 },
    "list-row": { width: 358, height: 48 },
    "metadata-row": { width: 358, height: 28 },
    "empty-state": { width: 358, height: 120 },
    skeleton: { width: 358, height: 16 },
    spinner: { width: 24, height: 24 },
    progress: { width: 358, height: 8 },
    toast: { width: 358, height: 56 },
    alert: { width: 358, height: 72 },
    "form-field": { width: 358, height: 72 },
    label: { width: 358, height: 20 },
    divider: { width: 358, height: 1 },
    card: { width: 358, height: 140 },
    container: { width: 358, height: 120 },
    toolbar: { width: 358, height: 40 },
    sheet: { width: 358, height: 320 },
    popover: { width: 280, height: 160 },
    tooltip: { width: 180, height: 40 },
    panel: { width: 358, height: 240 },
    "icon-button": { width: 48, height: 40 },
    "text-button": { width: 120, height: 40 },
    "action-area": { width: 358, height: 64 },
    "list-cell": { width: 358, height: 48 },
    "list-card": { width: 358, height: 112 },
    avatar: { width: 40, height: 40 },
    "avatar-group": { width: 96, height: 40 },
    "content-badge": { width: 92, height: 24 },
    "play-badge": { width: 100, height: 28 },
    thumbnail: { width: 160, height: 96 },
    "section-header": { width: 358, height: 40 },
    accordion: { width: 358, height: 56 },
    snackbar: { width: 358, height: 56 },
    "section-message": { width: 358, height: 56 },
    "push-badge": { width: 72, height: 24 },
    "fallback-view": { width: 358, height: 120 },
    loading: { width: 120, height: 24 },
    tab: { width: 96, height: 40 },
    "pagination-dots": { width: 72, height: 24 },
    "page-counter": { width: 96, height: 24 },
    "progress-indicator": { width: 120, height: 24 },
    "progress-tracker": { width: 220, height: 32 },
    "bottom-navigation": { width: 358, height: 56 },
    "top-navigation": { width: 358, height: 56 },
    category: { width: 120, height: 32 },
    menu: { width: 240, height: 160 },
    popup: { width: 320, height: 220 },
    "bottom-sheet": { width: 358, height: 320 },
    autocomplete: { width: 358, height: 40 },
    "text-field": { width: 358, height: 40 },
    "text-area": { width: 358, height: 96 },
    "search-field": { width: 358, height: 40 },
    slider: { width: 358, height: 24 },
    "date-picker": { width: 220, height: 40 },
    "time-picker": { width: 220, height: 40 },
    "framed-style": { width: 358, height: 56 }
  },
  widths: {
    mobile: 390,
    catalog: 1440
  },
  heights: {
    mobile: 844,
    catalog: 1200
  }
};
