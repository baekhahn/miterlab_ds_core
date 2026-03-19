import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mobileCore from "../../../packages/ui-core/contracts/mobile-core.json" with { type: "json" };
import { getButtonMetrics, getButtonWidth, getInputMetrics, getInputMultilineHeight, getInputWidth } from "../../../packages/ui-core/contracts/foundationModel.mjs";
import { createInspectionPreviewModel } from "../../../packages/ui-core/contracts/inspectionPreviewLayout.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(scriptDir, "..", "static", "previews");

const FONT_STACK = "Pretendard, Pretendard Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
const FOUNDATION_COLORS = mobileCore.foundation.colors;
const COLORS = {
  bg: FOUNDATION_COLORS.surface.canvas,
  panel: FOUNDATION_COLORS.surface.panel,
  field: FOUNDATION_COLORS.surface.field,
  line: FOUNDATION_COLORS.border.default,
  lineStrong: FOUNDATION_COLORS.border.strong,
  text: FOUNDATION_COLORS.text.primary,
  textSecondary: FOUNDATION_COLORS.text.secondary,
  textMuted: FOUNDATION_COLORS.text.muted,
  textAssistive: FOUNDATION_COLORS.text.assistive,
  textInverse: FOUNDATION_COLORS.text.inverse,
  primary: FOUNDATION_COLORS.accent.primary,
  primaryWeak: FOUNDATION_COLORS.accent.primaryWeak,
  success: FOUNDATION_COLORS.status.success,
  danger: FOUNDATION_COLORS.status.danger,
  axisPillFill: FOUNDATION_COLORS.preview.axisPillFill,
  axisPillText: FOUNDATION_COLORS.preview.axisPillText
};

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const svgFrame = (width, height, parts) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="24" fill="${COLORS.bg}"/>
  ${parts.join("\n")}
</svg>`;

const rect = ({ x, y, width, height, rx = 0, fill = "transparent", stroke = "transparent", strokeWidth = 1 }) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${stroke === "transparent" ? 0 : strokeWidth}" />`;

const text = ({ x, y, value, size = 14, weight = 500, fill = COLORS.text, anchor = "start" }) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT_STACK}" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(value)}</text>`;

const axisLabel = (x, y, value) => `
  <g transform="translate(${x} ${y})">
    <rect width="72" height="24" rx="12" fill="${COLORS.axisPillFill}" />
    <text x="36" y="16" text-anchor="middle"
      font-family="${FONT_STACK}"
      font-size="11" font-weight="700" fill="${COLORS.axisPillText}">${escapeXml(value)}</text>
  </g>
`;

const buttonRect = (x, y, width, height, radius, fill, stroke, label, labelColor, fontSize) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${
      stroke === "transparent" ? 0 : 1
    }" />
    <text x="${width / 2}" y="${height / 2 + fontSize / 2 - 2}" text-anchor="middle"
      font-family="${FONT_STACK}"
      font-size="${fontSize}" font-weight="600" fill="${labelColor}">${escapeXml(label)}</text>
  </g>
`;

const plusGlyph = (x, y, size, color) => {
  const thickness = Math.max(2, Math.round(size / 7));
  const arm = Math.max(10, Math.round(size * 0.68));
  return `
    <g transform="translate(${x} ${y})">
      <rect x="${(size - arm) / 2}" y="${(size - thickness) / 2}" width="${arm}" height="${thickness}" rx="${thickness / 2}" fill="${color}" />
      <rect x="${(size - thickness) / 2}" y="${(size - arm) / 2}" width="${thickness}" height="${arm}" rx="${thickness / 2}" fill="${color}" />
    </g>
  `;
};

const inputRect = (x, y, width, height, radius, fill, stroke, value, valueColor, fontSize, strokeWidth = 1) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />
    <text x="16" y="${height / 2 + fontSize / 2 - 2}"
      font-family="${FONT_STACK}"
      font-size="${fontSize}" font-weight="400" fill="${valueColor}">${escapeXml(value)}</text>
  </g>
`;

const renderButtonComponent = (component, x, y) => {
  const size = getButtonMetrics(component.size);
  const palette =
    component.state === "disabled"
      ? mobileCore.colors.button.emphasis.disabled
      : mobileCore.colors.button.emphasis[component.emphasis];
  const fill = component.state === "pressed" ? palette.pressedFill ?? palette.fill : palette.fill;
  const stroke = component.state === "pressed" ? palette.pressedStroke ?? palette.stroke : palette.stroke;
  const width = component.iconOnly
    ? size.height
    : component.width === "full"
      ? getButtonWidth("full")
      : getButtonWidth("hug");

  const icon = component.iconLeading || component.iconOnly
    ? plusGlyph(x + (component.iconOnly ? (width - (size.fontSize + 2)) / 2 : 16), y + (size.height - (size.fontSize + 2)) / 2, size.fontSize + 2, palette.text)
    : "";

  return {
    width,
    height: size.height,
    svg:
      buttonRect(
        x,
        y,
        width,
        size.height,
        size.radius,
        fill,
        stroke,
        component.iconOnly ? "" : component.label,
        palette.text,
        size.fontSize
      ) + icon
  };
};

const renderInputComponent = (component, x, y) => {
  const size = getInputMetrics(component.size);
  const palette =
    component.state === "focused"
      ? mobileCore.colors.input.intent[component.intent]
      : component.state === "disabled"
        ? mobileCore.colors.input.intent.disabled
        : component.state === "readonly"
          ? mobileCore.colors.input.intent.readonly
          : component.state === "loading"
            ? mobileCore.colors.input.intent.loading
            : mobileCore.colors.input.intent[component.intent];
  const width = component.width === "full" ? getInputWidth("full") : getInputWidth("hug");
  const stroke = component.state === "focused" ? mobileCore.colors.input.focusRing.stroke : palette.stroke;
  const strokeWidth = component.state === "focused" ? mobileCore.colors.input.focusRing.strokeWeight : 1;
  const value = component.value ?? component.placeholder ?? component.label;
  const valueColor = component.value ? palette.text : palette.subtle;
  const multiline = component.multiline === true;
  const rowsCount = typeof component.rowsCount === "number" ? Math.max(2, component.rowsCount) : 3;
  const fieldHeight = multiline
    ? getInputMultilineHeight(component.size, rowsCount)
    : size.height;
  const helperText = component.helperText;
  const helperColor = component.intent === "error" ? mobileCore.colors.input.intent.error.stroke : COLORS.textAssistive;

  return {
    width,
    height: fieldHeight + (helperText ? 24 : 0),
    svg:
      inputRect(x, y, width, fieldHeight, size.radius, palette.fill, stroke, value, valueColor, size.fontSize, strokeWidth) +
      (helperText
        ? `
      <text x="${x}" y="${y + fieldHeight + 18}"
        font-family="${FONT_STACK}"
        font-size="12" font-weight="400" fill="${helperColor}">${escapeXml(helperText)}</text>
    `
        : "")
  };
};

const renderInspectionPreview = (family) => {
  const preview = createInspectionPreviewModel(family);
  const parts = [];
  for (const row of preview.rows) {
    parts.push(axisLabel(row.pill.x, row.pill.y, row.axisTitle));
    for (const item of row.items) {
      const rendered =
        family === "button"
          ? renderButtonComponent(item.component, item.x, item.y)
          : renderInputComponent(item.component, item.x, item.y);
      parts.push(rendered.svg);
    }
  }

  return svgFrame(preview.width, preview.height, parts);
};

const panel = (x, y, width, height, title, bodyParts = []) => [
  rect({ x, y, width, height, rx: 20, fill: COLORS.panel, stroke: COLORS.line }),
  text({ x: x + 18, y: y + 28, value: title, size: 13, weight: 700, fill: COLORS.textSecondary }),
  ...bodyParts
];

const chip = (x, y, label, selected = false) => [
  rect({
    x,
    y,
    width: 88,
    height: 32,
    rx: 16,
    fill: selected ? COLORS.primaryWeak : COLORS.field,
    stroke: selected ? COLORS.primary : COLORS.line
  }),
  text({ x: x + 44, y: y + 20, value: label, size: 12, weight: 600, fill: selected ? COLORS.primary : COLORS.textSecondary, anchor: "middle" })
];

const checkboxPreview = () =>
  svgFrame(920, 280, [
    ...panel(32, 32, 856, 216, "Checkbox", [
      ...[
        [72, 86, false, false, "이메일 알림 받기"],
        [72, 132, true, false, "주간 리포트 구독"],
        [72, 178, false, true, "채용 소식 받기"]
      ].flatMap(([x, y, checked, disabled, label]) => {
        const fill = checked ? COLORS.primary : COLORS.field;
        const stroke = disabled ? COLORS.line : checked ? COLORS.primary : COLORS.line;
        const labelColor = disabled ? COLORS.textMuted : COLORS.text;
        return [
          rect({ x, y, width: 22, height: 22, rx: 6, fill, stroke, strokeWidth: 1.5 }),
          checked ? text({ x: x + 11, y: y + 16, value: "✓", size: 13, weight: 700, fill: COLORS.textInverse, anchor: "middle" }) : "",
          text({ x: x + 36, y: y + 16, value: label, size: 14, weight: 500, fill: labelColor })
        ];
      })
    ])
  ]);

const textPreview = () =>
  svgFrame(920, 300, [
    ...panel(32, 32, 856, 236, "Text", [
      text({ x: 72, y: 92, value: "프로젝트 제목", size: 24, weight: 700 }),
      text({ x: 72, y: 126, value: "섹션 제목", size: 18, weight: 600, fill: COLORS.textSecondary }),
      text({ x: 72, y: 162, value: "본문 텍스트는 읽기 흐름과 정보 밀도를 유지해야 합니다.", size: 15, weight: 400, fill: COLORS.textSecondary }),
      text({ x: 72, y: 192, value: "Helper text", size: 13, weight: 400, fill: COLORS.textMuted }),
      text({ x: 72, y: 220, value: "Error message", size: 13, weight: 500, fill: COLORS.danger })
    ])
  ]);

const iconPreview = () => {
  const tiles = [
    ["+", COLORS.primary],
    ["→", COLORS.textSecondary],
    ["✓", COLORS.success],
    ["!", COLORS.danger]
  ];
  const parts = [...panel(32, 32, 856, 216, "Icon")];
  tiles.forEach(([glyph, fill], index) => {
    const x = 72 + index * 120;
    parts.push(rect({ x, y: 96, width: 72, height: 72, rx: 18, fill: COLORS.field, stroke: COLORS.line }));
    parts.push(text({ x: x + 36, y: 141, value: glyph, size: 28, weight: 700, fill, anchor: "middle" }));
  });
  return svgFrame(920, 280, parts);
};

const formFieldPreview = () =>
  svgFrame(920, 320, [
    ...panel(32, 32, 856, 256, "FormField", [
      text({ x: 72, y: 88, value: "이메일", size: 13, weight: 600, fill: COLORS.textSecondary }),
      rect({ x: 72, y: 102, width: 320, height: 48, rx: 12, fill: COLORS.field, stroke: COLORS.line }),
      text({ x: 88, y: 132, value: "name@example.com", size: 15, weight: 400, fill: COLORS.textMuted }),
      text({ x: 72, y: 172, value: "로그인에 사용할 이메일입니다.", size: 12, weight: 400, fill: COLORS.textMuted }),
      text({ x: 472, y: 88, value: "비밀번호", size: 13, weight: 600, fill: COLORS.textSecondary }),
      rect({ x: 472, y: 102, width: 320, height: 48, rx: 12, fill: COLORS.field, stroke: COLORS.danger }),
      text({ x: 488, y: 132, value: "••••••••", size: 15, weight: 400, fill: COLORS.text }),
      text({ x: 472, y: 172, value: "비밀번호를 다시 확인해 주세요.", size: 12, weight: 500, fill: COLORS.danger })
    ])
  ]);

const searchBarPreview = () =>
  svgFrame(920, 280, [
    ...panel(32, 32, 856, 216, "SearchBar", [
      rect({ x: 72, y: 86, width: 500, height: 48, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
      text({ x: 92, y: 117, value: "검색어를 입력하세요", size: 15, weight: 400, fill: COLORS.textMuted }),
      text({ x: 540, y: 117, value: "×", size: 16, weight: 700, fill: COLORS.textMuted }),
      ...chip(72, 160, "전체", true),
      ...chip(170, 160, "채용"),
      ...chip(268, 160, "기업")
    ])
  ]);

const listRowPreview = () =>
  svgFrame(920, 300, [
    ...panel(32, 32, 856, 236, "ListRow", [
      rect({ x: 72, y: 82, width: 760, height: 64, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
      text({ x: 96, y: 110, value: "알림 설정", size: 15, weight: 600 }),
      text({ x: 96, y: 132, value: "푸시 알림, 이메일 수신 여부", size: 13, weight: 400, fill: COLORS.textMuted }),
      text({ x: 804, y: 118, value: ">", size: 16, weight: 700, fill: COLORS.textMuted }),
      rect({ x: 72, y: 158, width: 760, height: 64, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
      text({ x: 96, y: 196, value: "계정 보안", size: 15, weight: 600 }),
      text({ x: 804, y: 194, value: "2단계 인증", size: 13, weight: 500, fill: COLORS.textSecondary, anchor: "end" })
    ])
  ]);

const bottomActionGroupPreview = () =>
  svgFrame(920, 260, [
    rect({ x: 0, y: 180, width: 920, height: 80, rx: 0, fill: COLORS.field, stroke: COLORS.line }),
    rect({ x: 32, y: 196, width: 168, height: 44, rx: 12, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 116, y: 223, value: "취소", size: 14, weight: 600, fill: COLORS.textSecondary, anchor: "middle" }),
    rect({ x: 216, y: 192, width: 672, height: 52, rx: 14, fill: COLORS.primary, stroke: COLORS.primary }),
    text({ x: 552, y: 223, value: "저장하기", size: 15, weight: 700, fill: COLORS.textInverse, anchor: "middle" })
  ]);

const filterChipGroupPreview = () =>
  svgFrame(920, 240, [
    ...panel(32, 32, 856, 176, "FilterChipGroup", [
      ...chip(72, 92, "전체", true),
      ...chip(170, 92, "원격근무"),
      ...chip(268, 92, "프론트엔드"),
      ...chip(366, 92, "신입"),
      ...chip(464, 92, "마감임박", true)
    ])
  ]);

const emptyStateBlockPreview = () =>
  svgFrame(920, 360, [
    ...panel(32, 32, 856, 296, "EmptyStateBlock", [
      rect({ x: 408, y: 88, width: 104, height: 104, rx: 28, fill: COLORS.panel, stroke: COLORS.line }),
      text({ x: 460, y: 150, value: "□", size: 34, weight: 700, fill: COLORS.textMuted, anchor: "middle" }),
      text({ x: 460, y: 226, value: "조건에 맞는 결과가 없습니다", size: 18, weight: 700, fill: COLORS.text, anchor: "middle" }),
      text({ x: 460, y: 252, value: "필터를 다시 조정하거나 검색어를 변경해 보세요.", size: 13, weight: 400, fill: COLORS.textMuted, anchor: "middle" }),
      rect({ x: 360, y: 272, width: 200, height: 44, rx: 12, fill: COLORS.primary, stroke: COLORS.primary }),
      text({ x: 460, y: 299, value: "필터 초기화", size: 14, weight: 700, fill: COLORS.textInverse, anchor: "middle" })
    ])
  ]);

const loginFormPatternPreview = () =>
  svgFrame(920, 640, [
    rect({ x: 270, y: 24, width: 380, height: 592, rx: 28, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 310, y: 82, value: "로그인", size: 24, weight: 700 }),
    text({ x: 310, y: 116, value: "이메일로 계속 진행하세요", size: 14, weight: 400, fill: COLORS.textMuted }),
    text({ x: 310, y: 166, value: "이메일", size: 13, weight: 600, fill: COLORS.textSecondary }),
    rect({ x: 310, y: 180, width: 300, height: 48, rx: 12, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 326, y: 210, value: "name@example.com", size: 15, weight: 400, fill: COLORS.textMuted }),
    text({ x: 310, y: 266, value: "비밀번호", size: 13, weight: 600, fill: COLORS.textSecondary }),
    rect({ x: 310, y: 280, width: 300, height: 48, rx: 12, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 326, y: 310, value: "••••••••", size: 15, weight: 400, fill: COLORS.text }),
    rect({ x: 310, y: 500, width: 300, height: 52, rx: 14, fill: COLORS.primary, stroke: COLORS.primary }),
    text({ x: 460, y: 531, value: "로그인", size: 15, weight: 700, fill: COLORS.textInverse, anchor: "middle" })
  ]);

const searchResultPatternPreview = () =>
  svgFrame(920, 620, [
    rect({ x: 210, y: 24, width: 500, height: 572, rx: 28, fill: COLORS.field, stroke: COLORS.line }),
    rect({ x: 242, y: 54, width: 436, height: 48, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 262, y: 85, value: "프론트엔드", size: 15, weight: 500, fill: COLORS.text }),
    ...chip(242, 118, "전체", true),
    ...chip(340, 118, "경력"),
    ...chip(438, 118, "원격"),
    rect({ x: 242, y: 172, width: 436, height: 72, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 266, y: 202, value: "Miterlab", size: 15, weight: 700 }),
    text({ x: 266, y: 226, value: "프론트엔드 엔지니어", size: 13, weight: 400, fill: COLORS.textSecondary }),
    rect({ x: 242, y: 256, width: 436, height: 72, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 266, y: 286, value: "Wanted", size: 15, weight: 700 }),
    text({ x: 266, y: 310, value: "모바일 제품 디자이너", size: 13, weight: 400, fill: COLORS.textSecondary })
  ]);

const settingsPatternPreview = () =>
  svgFrame(920, 620, [
    rect({ x: 220, y: 24, width: 480, height: 572, rx: 28, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 256, y: 78, value: "설정", size: 22, weight: 700 }),
    rect({ x: 256, y: 116, width: 408, height: 64, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 280, y: 154, value: "알림 설정", size: 15, weight: 600 }),
    rect({ x: 256, y: 192, width: 408, height: 64, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 280, y: 230, value: "계정 보안", size: 15, weight: 600 }),
    rect({ x: 256, y: 268, width: 408, height: 64, rx: 16, fill: COLORS.field, stroke: COLORS.line }),
    text({ x: 280, y: 306, value: "개인정보 관리", size: 15, weight: 600 })
  ]);

const productDetailPatternPreview = () =>
  svgFrame(920, 660, [
    rect({ x: 210, y: 24, width: 500, height: 612, rx: 28, fill: COLORS.field, stroke: COLORS.line }),
    rect({ x: 242, y: 54, width: 436, height: 220, rx: 20, fill: COLORS.panel, stroke: COLORS.line }),
    text({ x: 242, y: 314, value: "제품명", size: 22, weight: 700 }),
    text({ x: 242, y: 344, value: "핵심 설명과 가격 정보", size: 14, weight: 400, fill: COLORS.textSecondary }),
    rect({ x: 230, y: 556, width: 460, height: 64, rx: 20, fill: COLORS.field, stroke: COLORS.line }),
    rect({ x: 246, y: 562, width: 428, height: 52, rx: 14, fill: COLORS.primary, stroke: COLORS.primary }),
    text({ x: 460, y: 593, value: "바로 지원하기", size: 15, weight: 700, fill: COLORS.textInverse, anchor: "middle" })
  ]);

const genericPreviews = {
  "checkbox-contract.svg": checkboxPreview,
  "text-contract.svg": textPreview,
  "icon-contract.svg": iconPreview,
  "form-field-contract.svg": formFieldPreview,
  "search-bar-contract.svg": searchBarPreview,
  "list-row-contract.svg": listRowPreview,
  "bottom-action-group-contract.svg": bottomActionGroupPreview,
  "filter-chip-group-contract.svg": filterChipGroupPreview,
  "empty-state-block-contract.svg": emptyStateBlockPreview,
  "login-form-pattern.svg": loginFormPatternPreview,
  "search-result-screen-pattern.svg": searchResultPatternPreview,
  "settings-screen-pattern.svg": settingsPatternPreview,
  "product-detail-sticky-cta-pattern.svg": productDetailPatternPreview
};

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(path.join(outputDir, "button-contract.svg"), renderInspectionPreview("button"), "utf8");
await fs.writeFile(path.join(outputDir, "input-contract.svg"), renderInspectionPreview("input"), "utf8");

for (const [fileName, render] of Object.entries(genericPreviews)) {
  await fs.writeFile(path.join(outputDir, fileName), render(), "utf8");
}

console.log("Generated previews:");
console.log(path.join(outputDir, "button-contract.svg"));
console.log(path.join(outputDir, "input-contract.svg"));
for (const fileName of Object.keys(genericPreviews)) {
  console.log(path.join(outputDir, fileName));
}
