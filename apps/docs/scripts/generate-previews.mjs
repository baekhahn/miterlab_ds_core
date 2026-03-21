import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  foundationColors,
  getButtonMetrics,
  getButtonPaletteByAxes,
  getButtonPalette,
  getButtonWidth,
  getInputFocusRing,
  getInputHelperColor,
  getInputMetrics,
  getInputMultilineHeight,
  getInputPalette,
  getInputWidth
} from "../../../packages/ui-core/contracts/foundationModel.mjs";
import { createInspectionPreviewModel } from "../../../packages/ui-core/contracts/inspectionPreviewLayout.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(scriptDir, "..", "static", "previews");

const FONT_STACK = "Pretendard, Pretendard Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
const FOUNDATION_COLORS = foundationColors;
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
  measure: FOUNDATION_COLORS.status.cautionary,
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

const svgFrame = (width, height, parts, options = {}) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="${options.radius ?? 24}" fill="${options.bg ?? COLORS.bg}" ${
    options.stroke ? `stroke="${options.stroke}" stroke-width="${options.strokeWidth ?? 1}"` : ""
  }/>
  ${parts.join("\n")}
</svg>`;

const rect = ({ x, y, width, height, rx = 0, fill = "transparent", stroke = "transparent", strokeWidth = 1 }) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${stroke === "transparent" ? 0 : strokeWidth}" />`;

const text = ({ x, y, value, size = 14, weight = 500, fill = COLORS.text, anchor = "start" }) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${FONT_STACK}" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(value)}</text>`;

const estimateTextWidth = (value, fontSize, weight = 600) => {
  const textValue = String(value ?? "");
  const base = textValue.length * fontSize * 0.56;
  const weightAdjust = weight >= 600 ? 1.02 : 1;
  return Math.ceil(base * weightAdjust);
};

const axisLabel = (x, y, value) => `
  <g transform="translate(${x} ${y})">
    <rect width="72" height="24" rx="12" fill="${COLORS.axisPillFill}" />
    <text x="36" y="16" text-anchor="middle"
      font-family="${FONT_STACK}"
      font-size="11" font-weight="700" fill="${COLORS.axisPillText}">${escapeXml(value)}</text>
  </g>
`;

const buttonRect = (x, y, width, height, radius, fill, stroke) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${
      stroke === "transparent" ? 0 : 1
    }" />
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
    component.appearance || component.hierarchy
      ? getButtonPaletteByAxes(component.appearance ?? "solid", component.hierarchy ?? "primary-level-4", component.state)
      : getButtonPalette(component.emphasis, component.state);
  const width = component.iconOnly
    ? size.height
    : component.width === "full"
      ? getButtonWidth("full")
      : getButtonWidth("hug");

  const iconSize = Math.max(16, size.fontSize + 2);
  const gap = size.gap;
  const hasLeadingIcon = component.iconLeading === true || component.iconOnly === true;
  const hasTrailingIcon = component.iconTrailing === true;
  const label = component.label ?? "";
  const labelWidth = component.iconOnly ? 0 : estimateTextWidth(label, size.fontSize, 600);
  const contentWidth =
    (hasLeadingIcon ? iconSize : 0) +
    (hasLeadingIcon && labelWidth > 0 ? gap : 0) +
    labelWidth +
    (hasTrailingIcon && labelWidth > 0 ? gap : 0) +
    (hasTrailingIcon ? iconSize : 0);
  const contentStartX = x + Math.round((width - contentWidth) / 2);
  const contentCenterY = y + Math.round(size.height / 2);

  const parts = [
    buttonRect(
      x,
      y,
      width,
      size.height,
      size.radius,
      palette.fill,
      palette.stroke
    )
  ];

  let cursorX = contentStartX;

  if (hasLeadingIcon) {
    parts.push(plusGlyph(cursorX, y + Math.round((size.height - iconSize) / 2), iconSize, palette.text));
    cursorX += iconSize + (labelWidth > 0 ? gap : 0);
  }

  if (!component.iconOnly) {
    parts.push(
      text({
        x: cursorX + Math.round(labelWidth / 2),
        y: contentCenterY + Math.round(size.fontSize / 2) - 2,
        value: label,
        size: size.fontSize,
        weight: 600,
        fill: palette.text,
        anchor: "middle"
      })
    );
    cursorX += labelWidth;
  }

  if (hasTrailingIcon) {
    cursorX += labelWidth > 0 ? gap : 0;
    parts.push(plusGlyph(cursorX, y + Math.round((size.height - iconSize) / 2), iconSize, palette.text));
  }

  return {
    width,
    height: size.height,
    svg: parts.join("")
  };
};

const renderInputComponent = (component, x, y) => {
  const size = getInputMetrics(component.size);
  const palette = getInputPalette(component.intent, component.state);
  const width = component.width === "full" ? getInputWidth("full") : getInputWidth("hug");
  const focusRing = getInputFocusRing();
  const stroke = component.state === "focused" ? focusRing.stroke : palette.stroke;
  const strokeWidth = component.state === "focused" ? focusRing.strokeWeight : 1;
  const value = component.value ?? component.placeholder ?? component.label;
  const valueColor = component.value ? palette.text : palette.subtle;
  const multiline = component.multiline === true;
  const rowsCount = typeof component.rowsCount === "number" ? Math.max(2, component.rowsCount) : 3;
  const fieldHeight = multiline
    ? getInputMultilineHeight(component.size, rowsCount)
    : size.height;
  const helperText = component.helperText;
  const helperColor = getInputHelperColor(component.intent);

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
      if (family === "button" && row.axis === "bundle" && (item.label === "Apply" || item.label === "Icon Only")) {
        const centerX = item.x + item.width / 2;
        parts.push(
          `<line x1="${centerX}" y1="${item.y - 8}" x2="${centerX}" y2="${item.y + item.height + 8}" stroke="${COLORS.lineStrong}" stroke-width="1" stroke-dasharray="3 3" opacity="0.3" />`
        );
      }
      const rendered =
        family === "button"
          ? renderButtonComponent(item.component, item.x, item.y)
          : renderInputComponent(item.component, item.x, item.y);
      parts.push(rendered.svg);
    }
  }

  return svgFrame(preview.width, preview.height, parts);
};

const buttonAnatomyPreview = () => {
  const metrics = getButtonMetrics("md");
  const height = metrics.height;
  const iconSize = Math.max(16, metrics.fontSize + 2);
  const rowY = 136;

  const renderComposition = ({ x, y, width, label, mode, chipLabel }) => {
    const labelWidth = label ? estimateTextWidth(label, metrics.fontSize, 600) : 0;
    const hasIcon = mode === "icon-label" || mode === "icon-only";
    const hasLabel = mode === "label-only" || mode === "icon-label";
    const gap = hasIcon && hasLabel ? metrics.gap : 0;
    const contentWidth = (hasIcon ? iconSize : 0) + gap + labelWidth;
    const contentStartX = x + Math.round((width - contentWidth) / 2);
    let cursorX = contentStartX;
    const parts = [
      rect({ x, y, width, height, rx: metrics.radius, fill: mode === "icon-only" ? COLORS.field : COLORS.primary, stroke: mode === "icon-only" ? COLORS.line : "transparent" }),
      rect({ x, y, width, height, rx: metrics.radius, fill: "transparent", stroke: COLORS.lineStrong, strokeWidth: 1 }),
      text({ x, y: y - 12, value: chipLabel, size: 12, weight: 600, fill: COLORS.textSecondary })
    ];
    let gapStartX = null;
    let gapEndX = null;

    if (hasIcon) {
      parts.push(plusGlyph(cursorX, y + Math.round((height - iconSize) / 2), iconSize, mode === "icon-only" ? COLORS.textSecondary : COLORS.textInverse));
      if (hasLabel) {
        gapStartX = cursorX + iconSize;
        gapEndX = gapStartX + gap;
      }
      cursorX += iconSize + gap;
    }

    if (hasLabel) {
      parts.push(
        text({
          x: cursorX + Math.round(labelWidth / 2),
          y: y + Math.round(height / 2) + Math.round(metrics.fontSize / 2) - 2,
          value: label,
          size: metrics.fontSize,
          weight: 600,
          fill: COLORS.textInverse,
          anchor: "middle"
        })
      );
    }

    return {
      parts,
      gapStartX,
      gapEndX,
      y,
      width
    };
  };

  const labelOnly = renderComposition({ x: 128, y: rowY, width: 220, label: "Apply", mode: "label-only", chipLabel: "label only" });
  const iconLabel = renderComposition({ x: 382, y: rowY, width: 220, label: "Apply", mode: "icon-label", chipLabel: "icon + label" });
  const iconOnly = renderComposition({ x: 636, y: rowY, width: 52, label: "", mode: "icon-only", chipLabel: "icon only" });
  const anatomyLines = [
    `<line x1="${iconLabel.gapStartX}" y1="${rowY - 18}" x2="${iconLabel.gapEndX}" y2="${rowY - 18}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${iconLabel.gapStartX}" y1="${rowY - 22}" x2="${iconLabel.gapStartX}" y2="${rowY - 14}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${iconLabel.gapEndX}" y1="${rowY - 22}" x2="${iconLabel.gapEndX}" y2="${rowY - 14}" stroke="${COLORS.measure}" stroke-width="1" />`
  ];
  const anatomyTexts = [
    text({ x: (iconLabel.gapStartX + iconLabel.gapEndX) / 2, y: rowY - 24, value: `gap ${metrics.gap}`, size: 11, weight: 600, fill: COLORS.measure, anchor: "middle" }),
    text({ x: 460, y: 258, value: "slots: container, leading icon, label, trailing icon", size: 12, weight: 600, fill: COLORS.textSecondary, anchor: "middle" }),
    text({ x: 460, y: 282, value: "content group centered", size: 12, weight: 600, fill: COLORS.textMuted, anchor: "middle" })
  ];

  return svgFrame(920, 360, [
    ...panel(32, 32, 856, 296, "", [
      ...labelOnly.parts,
      ...iconLabel.parts,
      ...iconOnly.parts,
      ...anatomyLines,
      ...anatomyTexts
    ], { fill: COLORS.panel, stroke: "transparent" })
  ], { bg: COLORS.panel, radius: 24 });
};

const inputAnatomyPreview = () => {
  const metrics = getInputMetrics("md");
  const width = 320;
  const height = metrics.height;
  const fieldX = 300;
  const fieldY = 126;
  const labelGap = 12;
  const helperGap = 12;
  const labelY = fieldY - labelGap;
  const helperY = fieldY + height + helperGap + 12;
  const prefixSize = 18;
  const suffixSize = 18;
  const paddingX = metrics.paddingX;
  const labelValue = "아이디";
  const placeholderValue = "아이디를 입력해 주세요.";
  const helperValue = "영문과 숫자만 사용할 수 있습니다.";
  const prefixValue = "@";
  const prefixX = fieldX + paddingX;
  const valueStartX = prefixX + prefixSize + 10;
  const prefixGap = valueStartX - (prefixX + prefixSize);
  const suffixX = fieldX + width - paddingX - suffixSize;
  const valueWidth = estimateTextWidth(placeholderValue, metrics.fontSize, 400);
  const valueY = fieldY + Math.round(height / 2) + Math.round(metrics.fontSize / 2) - 2;
  const centerY = fieldY + height / 2;
  const contentOffsetX = -2;
  const contentOffsetY = 30;
  const paddingLineY = fieldY + height + 24;
  const paddingTextY = paddingLineY + 16;
  const gapLineY = fieldY + height + 50;
  const gapTextY = gapLineY + 16;
  const labelAnchorX = 172;
  const labelAnchorY = 80;
  const containerAnchorX = 168;
  const containerAnchorY = 144;
  const prefixAnchorX = 200;
  const prefixAnchorY = 244;
  const placeholderAnchorX = 752;
  const placeholderAnchorY = 88;
  const suffixAnchorX = 744;
  const suffixAnchorY = 168;
  const helperAnchorX = 746;
  const helperAnchorY = 260;
  const labelLineEndX = 176;
  const labelLineY = 80;
  const containerLineEndX = 164;
  const containerLineY = 148;
  const prefixLineEndX = 206;
  const prefixLineY = 240;
  const placeholderLineEndX = 744;
  const placeholderLineY = 88;
  const suffixLineEndX = 736;
  const suffixLineY = 168;
  const helperLineEndX = 738;
  const helperLineY = 268;

  const contentLines = [
    `<path d="M ${fieldX - 8} ${labelY - 2} L ${fieldX - 44} ${labelLineY} L ${labelLineEndX} ${labelLineY}" stroke="${COLORS.lineStrong}" stroke-width="1" fill="none" />`,
    `<path d="M ${fieldX - 8} 152 L ${fieldX - 44} ${containerLineY} L ${containerLineEndX} ${containerLineY}" stroke="${COLORS.lineStrong}" stroke-width="1" fill="none" />`,
    `<path d="M ${prefixX + prefixSize / 2} 140 L ${prefixX + prefixSize / 2 - 28} ${prefixLineY} L ${prefixLineEndX} ${prefixLineY}" stroke="${COLORS.lineStrong}" stroke-width="1" fill="none" />`,
    `<path d="M ${valueStartX + valueWidth / 2} 140 L ${valueStartX + valueWidth / 2 + 28} ${placeholderLineY} L ${placeholderLineEndX} ${placeholderLineY}" stroke="${COLORS.lineStrong}" stroke-width="1" fill="none" />`,
    `<path d="M ${suffixX + suffixSize / 2} 152 L ${suffixX + suffixSize / 2 + 28} ${suffixLineY} L ${suffixLineEndX} ${suffixLineY}" stroke="${COLORS.lineStrong}" stroke-width="1" fill="none" />`,
    `<path d="M ${fieldX + 118} 198 L ${fieldX + 154} ${helperLineY} L ${helperLineEndX} ${helperLineY}" stroke="${COLORS.lineStrong}" stroke-width="1" fill="none" />`,
    `<line x1="${fieldX - 28}" y1="${fieldY}" x2="${fieldX - 28}" y2="${fieldY + height}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${fieldX - 32}" y1="${fieldY}" x2="${fieldX - 24}" y2="${fieldY}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${fieldX - 32}" y1="${fieldY + height}" x2="${fieldX - 24}" y2="${fieldY + height}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${fieldX}" y1="${paddingLineY}" x2="${fieldX + paddingX}" y2="${paddingLineY}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${fieldX}" y1="${paddingLineY - 4}" x2="${fieldX}" y2="${paddingLineY + 4}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${fieldX + paddingX}" y1="${paddingLineY - 4}" x2="${fieldX + paddingX}" y2="${paddingLineY + 4}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${prefixX + prefixSize}" y1="${gapLineY}" x2="${valueStartX}" y2="${gapLineY}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${prefixX + prefixSize}" y1="${gapLineY - 4}" x2="${prefixX + prefixSize}" y2="${gapLineY + 4}" stroke="${COLORS.measure}" stroke-width="1" />`,
    `<line x1="${valueStartX}" y1="${gapLineY - 4}" x2="${valueStartX}" y2="${gapLineY + 4}" stroke="${COLORS.measure}" stroke-width="1" />`
  ];

  const contentTexts = [
    text({ x: fieldX, y: labelY, value: labelValue, size: 12, weight: 600, fill: COLORS.textSecondary }),
    text({
      x: prefixX + prefixSize / 2,
      y: centerY + 5,
      value: prefixValue,
      size: 15,
      weight: 600,
      fill: COLORS.textMuted,
      anchor: "middle"
    }),
    text({
      x: valueStartX,
      y: valueY,
      value: placeholderValue,
      size: metrics.fontSize,
      weight: 400,
      fill: COLORS.textMuted
    }),
    text({
      x: suffixX + suffixSize / 2,
      y: centerY + 5,
      value: "×",
      size: 16,
      weight: 700,
      fill: COLORS.textMuted,
      anchor: "middle"
    }),
    text({ x: fieldX, y: helperY, value: helperValue, size: 12, weight: 500, fill: COLORS.textMuted }),
    text({ x: labelAnchorX, y: labelAnchorY, value: `label 예시: ${labelValue}`, size: 12, weight: 600, fill: COLORS.textSecondary, anchor: "end" }),
    text({ x: containerAnchorX, y: containerAnchorY, value: "container", size: 12, weight: 600, fill: COLORS.textSecondary, anchor: "end" }),
    text({ x: prefixAnchorX, y: prefixAnchorY, value: `prefix 예시: ${prefixValue}`, size: 12, weight: 600, fill: COLORS.textSecondary, anchor: "end" }),
    text({ x: placeholderAnchorX, y: placeholderAnchorY, value: "placeholder 예시", size: 12, weight: 600, fill: COLORS.textSecondary, anchor: "start" }),
    text({ x: suffixAnchorX, y: suffixAnchorY, value: "suffix 예시: 지우기", size: 12, weight: 600, fill: COLORS.textSecondary, anchor: "start" }),
    text({ x: helperAnchorX, y: helperAnchorY, value: "helper 예시", size: 12, weight: 600, fill: COLORS.textSecondary, anchor: "start" }),
    text({
      x: fieldX - 40,
      y: centerY + 4,
      value: `height ${height}`,
      size: 11,
      weight: 600,
      fill: COLORS.measure,
      anchor: "end"
    }),
    text({
      x: fieldX + paddingX / 2,
      y: paddingTextY,
      value: `padding ${paddingX}`,
      size: 11,
      weight: 600,
      fill: COLORS.measure,
      anchor: "middle"
    }),
    text({
      x: (prefixX + prefixSize + valueStartX) / 2,
      y: gapTextY,
      value: `gap ${prefixGap}`,
      size: 11,
      weight: 600,
      fill: COLORS.measure,
      anchor: "middle"
    })
  ];

  const contentParts = [
    rect({ x: fieldX, y: fieldY, width, height, rx: metrics.radius, fill: COLORS.field, stroke: COLORS.line }),
    `<g>${contentLines.join("")}</g>`,
    `<g>${contentTexts.join("")}</g>`
  ];

  return svgFrame(
    920,
    400,
    [
      ...panel(32, 32, 856, 336, "", [
        `<g transform="translate(${contentOffsetX} ${contentOffsetY})">`,
        ...contentParts,
        "</g>"
      ], { fill: COLORS.panel, stroke: "transparent" })
    ],
    { bg: COLORS.panel, radius: 24 }
  );
};

const panel = (x, y, width, height, title, bodyParts = [], options = {}) => [
  rect({ x, y, width, height, rx: 20, fill: options.fill ?? COLORS.panel, stroke: options.stroke ?? COLORS.line }),
  ...(title ? [text({ x: x + 18, y: y + 28, value: title, size: 13, weight: 700, fill: COLORS.textSecondary })] : []),
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
await fs.writeFile(path.join(outputDir, "button-anatomy.svg"), buttonAnatomyPreview(), "utf8");
await fs.writeFile(path.join(outputDir, "input-contract.svg"), renderInspectionPreview("input"), "utf8");
await fs.writeFile(path.join(outputDir, "input-anatomy.svg"), inputAnatomyPreview(), "utf8");

for (const [fileName, render] of Object.entries(genericPreviews)) {
  await fs.writeFile(path.join(outputDir, fileName), render(), "utf8");
}

console.log("Generated previews:");
console.log(path.join(outputDir, "button-contract.svg"));
console.log(path.join(outputDir, "button-anatomy.svg"));
console.log(path.join(outputDir, "input-contract.svg"));
console.log(path.join(outputDir, "input-anatomy.svg"));
for (const fileName of Object.keys(genericPreviews)) {
  console.log(path.join(outputDir, fileName));
}
