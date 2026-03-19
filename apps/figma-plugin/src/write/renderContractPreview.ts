import { loadFont } from "./createTextNode";
import mobileCore from "../../../../packages/ui-core/contracts/mobile-core.json";

type PreviewLevel = "component" | "module" | "pattern";

export interface ContractPreviewOption {
  id: string;
  label: string;
  level: PreviewLevel;
}

const FOUNDATION_COLORS = mobileCore.foundation.colors;
const COLORS = {
  bg: FOUNDATION_COLORS.surface.canvas,
  panel: FOUNDATION_COLORS.surface.panel,
  line: FOUNDATION_COLORS.border.default,
  text: FOUNDATION_COLORS.text.primary,
  textSecondary: FOUNDATION_COLORS.text.secondary,
  textMuted: FOUNDATION_COLORS.text.muted,
  primary: FOUNDATION_COLORS.accent.primary,
  success: FOUNDATION_COLORS.status.success,
  danger: FOUNDATION_COLORS.status.danger
};

export const contractPreviewOptions: ContractPreviewOption[] = [
  { id: "button", label: "Button", level: "component" },
  { id: "input", label: "Input", level: "component" },
  { id: "checkbox", label: "Checkbox", level: "component" },
  { id: "text", label: "Text", level: "component" },
  { id: "icon", label: "Icon", level: "component" },
  { id: "form-field", label: "FormField", level: "module" },
  { id: "search-bar", label: "SearchBar", level: "module" },
  { id: "list-row", label: "ListRow", level: "module" },
  { id: "bottom-action-group", label: "BottomActionGroup", level: "module" },
  { id: "filter-chip-group", label: "FilterChipGroup", level: "module" },
  { id: "empty-state-block", label: "EmptyStateBlock", level: "module" },
  { id: "login-form", label: "Login Form", level: "pattern" },
  { id: "search-result-screen", label: "Search Result Screen", level: "pattern" },
  { id: "settings-screen", label: "Settings Screen", level: "pattern" },
  { id: "product-detail-sticky-cta", label: "Product Detail with Sticky CTA", level: "pattern" }
];

const rgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255
  };
};

const setSolidFill = (node: GeometryMixin, hex: string) => {
  node.fills = [{ type: "SOLID", color: rgb(hex) }];
};

const setStroke = (node: GeometryMixin, hex: string, weight = 1) => {
  node.strokes = [{ type: "SOLID", color: rgb(hex) }];
  node.strokeWeight = weight;
};

const createText = async (
  value: string,
  x: number,
  y: number,
  size: number,
  color: string,
  weight: "regular" | "medium" | "semibold" = "regular",
  align: "LEFT" | "CENTER" | "RIGHT" = "LEFT"
) => {
  const node = figma.createText();
  node.fontName = await loadFont(weight);
  node.characters = value;
  node.fontSize = size;
  node.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.45) };
  node.fills = [{ type: "SOLID", color: rgb(color) }];
  node.textAutoResize = "WIDTH_AND_HEIGHT";
  node.textAlignHorizontal = align;
  node.x = x;
  node.y = y;
  return node;
};

const createRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: string,
  stroke?: string,
  strokeWeight = 1
) => {
  const node = figma.createRectangle();
  node.x = x;
  node.y = y;
  node.resize(width, height);
  node.cornerRadius = radius;
  setSolidFill(node, fill);
  if (stroke) {
    setStroke(node, stroke, strokeWeight);
  } else {
    node.strokes = [];
  }
  return node;
};

const createCanvas = (name: string, width: number, height: number) => {
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(width, height);
  frame.layoutMode = "NONE";
  frame.cornerRadius = 24;
  frame.fills = [{ type: "SOLID", color: rgb(COLORS.bg) }];
  frame.strokes = [];
  frame.clipsContent = false;
  return frame;
};

const createPanel = (title: string, x: number, y: number, width: number, height: number) => {
  const panel = createRect(x, y, width, height, 20, COLORS.panel, COLORS.line);
  panel.name = `${title} panel`;
  return panel;
};

const createButton = async (
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  tone: "primary" | "secondary" | "destructive" = "primary"
) => {
  const fill = tone === "primary" ? COLORS.primary : tone === "destructive" ? COLORS.danger : "#FFFFFF";
  const stroke = tone === "secondary" ? COLORS.line : fill;
  const textColor = tone === "secondary" ? COLORS.text : "#FFFFFF";
  const button = createRect(x, y, width, height, 14, fill, stroke);
  const text = await createText(label, x + width / 2, y + 15, 15, textColor, "semibold", "CENTER");
  text.x = x + (width - text.width) / 2;
  return [button, text];
};

const createField = async (
  value: string,
  x: number,
  y: number,
  width: number,
  height: number,
  tone: "default" | "error" | "success" = "default",
  helperText?: string
) => {
  const stroke = tone === "error" ? COLORS.danger : tone === "success" ? COLORS.success : COLORS.line;
  const field = createRect(x, y, width, height, 12, "#FFFFFF", stroke);
  const text = await createText(value, x + 16, y + 14, 15, value.startsWith("name@") || value.startsWith("검색") ? COLORS.textMuted : COLORS.text);
  const nodes: SceneNode[] = [field, text];
  if (helperText) {
    nodes.push(await createText(helperText, x, y + height + 10, 12, tone === "error" ? COLORS.danger : COLORS.textMuted));
  }
  return nodes;
};

const createChip = async (label: string, x: number, y: number, selected = false) => {
  const fill = selected ? "#EAF2FF" : "#FFFFFF";
  const stroke = selected ? COLORS.primary : COLORS.line;
  const chip = createRect(x, y, 88, 32, 16, fill, stroke);
  const labelNode = await createText(label, x + 44, y + 9, 12, selected ? COLORS.primary : COLORS.textSecondary, "semibold", "CENTER");
  labelNode.x = x + (88 - labelNode.width) / 2;
  return [chip, labelNode];
};

const createListRow = async (title: string, subtitle: string | null, x: number, y: number, width: number) => {
  const row = createRect(x, y, width, 64, 16, "#FFFFFF", COLORS.line);
  const titleNode = await createText(title, x + 24, y + 16, 15, COLORS.text, "semibold");
  const nodes: SceneNode[] = [row, titleNode];
  if (subtitle) {
    nodes.push(await createText(subtitle, x + 24, y + 38, 13, COLORS.textMuted));
  }
  const chevron = await createText(">", x + width - 28, y + 22, 16, COLORS.textMuted, "semibold");
  nodes.push(chevron);
  return nodes;
};

const renderCheckboxPreview = async () => {
  const frame = createCanvas("Checkbox Contract Preview", 920, 280);
  frame.appendChild(createPanel("Checkbox", 32, 32, 856, 216));
  frame.appendChild(await createText("Checkbox", 50, 50, 13, COLORS.textSecondary, "semibold"));
  const rows: Array<[number, string, boolean, boolean]> = [
    [86, "이메일 알림 받기", false, false],
    [132, "주간 리포트 구독", true, false],
    [178, "채용 소식 받기", false, true]
  ];
  for (const [y, label, checked, disabled] of rows) {
    const box = createRect(72, y, 22, 22, 6, checked ? COLORS.primary : "#FFFFFF", disabled ? COLORS.line : checked ? COLORS.primary : COLORS.line, 1.5);
    frame.appendChild(box);
    if (checked) {
      const mark = await createText("✓", 78, y + 2, 13, "#FFFFFF", "semibold");
      frame.appendChild(mark);
    }
    frame.appendChild(await createText(label, 108, y + 3, 14, disabled ? COLORS.textMuted : COLORS.text, "medium"));
  }
  return frame;
};

const renderTextPreview = async () => {
  const frame = createCanvas("Text Contract Preview", 920, 300);
  frame.appendChild(createPanel("Text", 32, 32, 856, 236));
  frame.appendChild(await createText("Text", 50, 50, 13, COLORS.textSecondary, "semibold"));
  frame.appendChild(await createText("프로젝트 제목", 72, 86, 24, COLORS.text, "semibold"));
  frame.appendChild(await createText("섹션 제목", 72, 122, 18, COLORS.textSecondary, "semibold"));
  frame.appendChild(await createText("본문 텍스트는 읽기 흐름과 정보 밀도를 유지해야 합니다.", 72, 160, 15, COLORS.textSecondary));
  frame.appendChild(await createText("Helper text", 72, 192, 12, COLORS.textMuted));
  frame.appendChild(await createText("Error message", 72, 220, 12, COLORS.danger, "medium"));
  return frame;
};

const renderIconPreview = async () => {
  const frame = createCanvas("Icon Contract Preview", 920, 280);
  frame.appendChild(createPanel("Icon", 32, 32, 856, 216));
  frame.appendChild(await createText("Icon", 50, 50, 13, COLORS.textSecondary, "semibold"));
  const glyphs: Array<[string, string]> = [
    ["+", COLORS.primary],
    ["→", COLORS.textSecondary],
    ["✓", COLORS.success],
    ["!", COLORS.danger]
  ];
  for (const [index, [glyph, color]] of glyphs.entries()) {
    const x = 72 + index * 120;
    frame.appendChild(createRect(x, 96, 72, 72, 18, "#FFFFFF", COLORS.line));
    const label = await createText(glyph, x + 36, 117, 28, color, "semibold", "CENTER");
    label.x = x + (72 - label.width) / 2;
    frame.appendChild(label);
  }
  return frame;
};

const renderFormFieldPreview = async () => {
  const frame = createCanvas("FormField Contract Preview", 920, 320);
  frame.appendChild(createPanel("FormField", 32, 32, 856, 256));
  frame.appendChild(await createText("FormField", 50, 50, 13, COLORS.textSecondary, "semibold"));
  frame.appendChild(await createText("이메일", 72, 88, 13, COLORS.textSecondary, "semibold"));
  for (const node of await createField("name@example.com", 72, 102, 320, 48)) frame.appendChild(node);
  frame.appendChild(await createText("로그인에 사용할 이메일입니다.", 72, 172, 12, COLORS.textMuted));
  frame.appendChild(await createText("비밀번호", 472, 88, 13, COLORS.textSecondary, "semibold"));
  for (const node of await createField("••••••••", 472, 102, 320, 48, "error", "비밀번호를 다시 확인해 주세요.")) frame.appendChild(node);
  return frame;
};

const renderSearchBarPreview = async () => {
  const frame = createCanvas("SearchBar Contract Preview", 920, 280);
  frame.appendChild(createPanel("SearchBar", 32, 32, 856, 216));
  frame.appendChild(await createText("SearchBar", 50, 50, 13, COLORS.textSecondary, "semibold"));
  for (const node of await createField("검색어를 입력하세요", 72, 86, 500, 48)) frame.appendChild(node);
  frame.appendChild(await createText("×", 546, 100, 16, COLORS.textMuted, "semibold"));
  for (const node of await createChip("전체", 72, 160, true)) frame.appendChild(node);
  for (const node of await createChip("채용", 170, 160, false)) frame.appendChild(node);
  for (const node of await createChip("기업", 268, 160, false)) frame.appendChild(node);
  return frame;
};

const renderListRowPreview = async () => {
  const frame = createCanvas("ListRow Contract Preview", 920, 300);
  frame.appendChild(createPanel("ListRow", 32, 32, 856, 236));
  frame.appendChild(await createText("ListRow", 50, 50, 13, COLORS.textSecondary, "semibold"));
  for (const node of await createListRow("알림 설정", "푸시 알림, 이메일 수신 여부", 72, 82, 760)) frame.appendChild(node);
  const second = createRect(72, 158, 760, 64, 16, "#FFFFFF", COLORS.line);
  frame.appendChild(second);
  frame.appendChild(await createText("계정 보안", 96, 180, 15, COLORS.text, "semibold"));
  const value = await createText("2단계 인증", 744, 180, 13, COLORS.textSecondary, "medium", "RIGHT");
  value.x = 704;
  frame.appendChild(value);
  return frame;
};

const renderBottomActionGroupPreview = async () => {
  const frame = createCanvas("BottomActionGroup Contract Preview", 920, 260);
  const dock = createRect(0, 180, 920, 80, 0, "#FFFFFF", COLORS.line);
  frame.appendChild(dock);
  for (const node of await createButton("취소", 32, 196, 168, 44, "secondary")) frame.appendChild(node);
  for (const node of await createButton("저장하기", 216, 192, 672, 52, "primary")) frame.appendChild(node);
  return frame;
};

const renderFilterChipGroupPreview = async () => {
  const frame = createCanvas("FilterChipGroup Contract Preview", 920, 240);
  frame.appendChild(createPanel("FilterChipGroup", 32, 32, 856, 176));
  frame.appendChild(await createText("FilterChipGroup", 50, 50, 13, COLORS.textSecondary, "semibold"));
  const chips: Array<[string, number, boolean]> = [
    ["전체", 72, true],
    ["원격근무", 170, false],
    ["프론트엔드", 268, false],
    ["신입", 366, false],
    ["마감임박", 464, true]
  ];
  for (const [label, x, selected] of chips) {
    for (const node of await createChip(label, x, 92, selected)) frame.appendChild(node);
  }
  return frame;
};

const renderEmptyStateBlockPreview = async () => {
  const frame = createCanvas("EmptyStateBlock Contract Preview", 920, 360);
  frame.appendChild(createPanel("EmptyStateBlock", 32, 32, 856, 296));
  frame.appendChild(await createText("EmptyStateBlock", 50, 50, 13, COLORS.textSecondary, "semibold"));
  frame.appendChild(createRect(408, 88, 104, 104, 28, COLORS.panel, COLORS.line));
  const glyph = await createText("□", 454, 119, 34, COLORS.textMuted, "semibold", "CENTER");
  glyph.x = 408 + (104 - glyph.width) / 2;
  frame.appendChild(glyph);
  const title = await createText("조건에 맞는 결과가 없습니다", 0, 226, 18, COLORS.text, "semibold", "CENTER");
  title.x = 460 - title.width / 2;
  frame.appendChild(title);
  const desc = await createText("필터를 다시 조정하거나 검색어를 변경해 보세요.", 0, 252, 13, COLORS.textMuted, "regular", "CENTER");
  desc.x = 460 - desc.width / 2;
  frame.appendChild(desc);
  for (const node of await createButton("필터 초기화", 360, 272, 200, 44, "primary")) frame.appendChild(node);
  return frame;
};

const renderLoginFormPattern = async () => {
  const frame = createCanvas("Login Form Pattern Preview", 920, 640);
  frame.appendChild(createRect(270, 24, 380, 592, 28, "#FFFFFF", COLORS.line));
  frame.appendChild(await createText("로그인", 310, 82, 24, COLORS.text, "semibold"));
  frame.appendChild(await createText("이메일로 계속 진행하세요", 310, 116, 14, COLORS.textMuted));
  frame.appendChild(await createText("이메일", 310, 166, 13, COLORS.textSecondary, "semibold"));
  for (const node of await createField("name@example.com", 310, 180, 300, 48)) frame.appendChild(node);
  frame.appendChild(await createText("비밀번호", 310, 266, 13, COLORS.textSecondary, "semibold"));
  for (const node of await createField("••••••••", 310, 280, 300, 48)) frame.appendChild(node);
  for (const node of await createButton("로그인", 310, 500, 300, 52, "primary")) frame.appendChild(node);
  return frame;
};

const renderSearchResultPattern = async () => {
  const frame = createCanvas("Search Result Screen Pattern Preview", 920, 620);
  frame.appendChild(createRect(210, 24, 500, 572, 28, "#FFFFFF", COLORS.line));
  for (const node of await createField("프론트엔드", 242, 54, 436, 48)) frame.appendChild(node);
  for (const node of await createChip("전체", 242, 118, true)) frame.appendChild(node);
  for (const node of await createChip("경력", 340, 118, false)) frame.appendChild(node);
  for (const node of await createChip("원격", 438, 118, false)) frame.appendChild(node);
  for (const node of await createListRow("Miterlab", "프론트엔드 엔지니어", 242, 172, 436)) frame.appendChild(node);
  for (const node of await createListRow("Wanted", "모바일 제품 디자이너", 242, 256, 436)) frame.appendChild(node);
  return frame;
};

const renderSettingsPattern = async () => {
  const frame = createCanvas("Settings Screen Pattern Preview", 920, 620);
  frame.appendChild(createRect(220, 24, 480, 572, 28, "#FFFFFF", COLORS.line));
  frame.appendChild(await createText("설정", 256, 78, 22, COLORS.text, "semibold"));
  for (const node of await createListRow("알림 설정", null, 256, 116, 408)) frame.appendChild(node);
  for (const node of await createListRow("계정 보안", null, 256, 192, 408)) frame.appendChild(node);
  for (const node of await createListRow("개인정보 관리", null, 256, 268, 408)) frame.appendChild(node);
  return frame;
};

const renderProductDetailPattern = async () => {
  const frame = createCanvas("Product Detail with Sticky CTA Pattern Preview", 920, 660);
  frame.appendChild(createRect(210, 24, 500, 612, 28, "#FFFFFF", COLORS.line));
  frame.appendChild(createRect(242, 54, 436, 220, 20, COLORS.panel, COLORS.line));
  frame.appendChild(await createText("제품명", 242, 314, 22, COLORS.text, "semibold"));
  frame.appendChild(await createText("핵심 설명과 가격 정보", 242, 344, 14, COLORS.textSecondary));
  frame.appendChild(createRect(230, 556, 460, 64, 20, "#FFFFFF", COLORS.line));
  for (const node of await createButton("바로 지원하기", 246, 562, 428, 52, "primary")) frame.appendChild(node);
  return frame;
};

const renderers: Record<string, () => Promise<FrameNode>> = {
  checkbox: renderCheckboxPreview,
  text: renderTextPreview,
  icon: renderIconPreview,
  "form-field": renderFormFieldPreview,
  "search-bar": renderSearchBarPreview,
  "list-row": renderListRowPreview,
  "bottom-action-group": renderBottomActionGroupPreview,
  "filter-chip-group": renderFilterChipGroupPreview,
  "empty-state-block": renderEmptyStateBlockPreview,
  "login-form": renderLoginFormPattern,
  "search-result-screen": renderSearchResultPattern,
  "settings-screen": renderSettingsPattern,
  "product-detail-sticky-cta": renderProductDetailPattern
};

export const renderContractPreview = async (id: string) => {
  const render = renderers[id];
  if (!render) {
    throw new Error(`Unknown contract preview: ${id}`);
  }

  const frame = await render();
  const existing = figma.currentPage.children.find((node) => node.type === "FRAME" && node.name === frame.name);
  if (existing && existing.type === "FRAME") {
    existing.remove();
  }

  figma.currentPage.appendChild(frame);
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);

  return {
    createdNodeCount: frame.findAll().length + 1,
    createdFrameName: frame.name
  };
};
