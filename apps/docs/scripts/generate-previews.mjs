import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mobileCore from "../../../packages/ui-core/contracts/mobile-core.json" with { type: "json" };
import { createInspectionPreviewModel } from "../../../packages/ui-core/contracts/inspectionPreviewLayout.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(scriptDir, "..", "static", "previews");

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const axisLabel = (x, y, value) => `
  <g transform="translate(${x} ${y})">
    <rect width="72" height="24" rx="12" fill="#E8EEF8" />
    <text x="36" y="16" text-anchor="middle"
      font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"
      font-size="11" font-weight="700" fill="#4A5872">${escapeXml(value)}</text>
  </g>
`;

const buttonRect = (x, y, width, height, radius, fill, stroke, label, labelColor, fontSize) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${
      stroke === "transparent" ? 0 : 1
    }" />
    <text x="${width / 2}" y="${height / 2 + fontSize / 2 - 2}" text-anchor="middle"
      font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"
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
      font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"
      font-size="${fontSize}" font-weight="400" fill="${valueColor}">${escapeXml(value)}</text>
  </g>
`;

const renderButtonComponent = (component, x, y) => {
  const size = mobileCore.button.render.sizes[component.size];
  const palette =
    component.state === "disabled"
      ? mobileCore.colors.button.emphasis.disabled
      : mobileCore.colors.button.emphasis[component.emphasis];
  const fill = component.state === "pressed" ? palette.pressedFill ?? palette.fill : palette.fill;
  const stroke = component.state === "pressed" ? palette.pressedStroke ?? palette.stroke : palette.stroke;
  const width = component.iconOnly
    ? size.height
    : component.width === "full"
      ? mobileCore.button.render.widths.full
      : mobileCore.button.render.widths.hug;

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
  const size = mobileCore.input.render.sizes[component.size];
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
  const width = component.width === "full" ? mobileCore.input.render.widths.full : mobileCore.input.render.widths.hug;
  const stroke = component.state === "focused" ? mobileCore.colors.input.focusRing.stroke : palette.stroke;
  const strokeWidth = component.state === "focused" ? mobileCore.colors.input.focusRing.strokeWeight : 1;
  const value = component.value ?? component.placeholder ?? component.label;
  const valueColor = component.value ? palette.text : palette.subtle;
  const multiline = component.multiline === true;
  const rowsCount = typeof component.rowsCount === "number" ? Math.max(2, component.rowsCount) : 3;
  const fieldHeight = multiline
    ? Math.max(size.height * 2, size.lineHeight * rowsCount + size.paddingY * 2 + 16)
    : size.height;
  const helperText = component.helperText;
  const helperColor = component.intent === "error" ? mobileCore.colors.input.intent.error.stroke : "#667085";

  return {
    width,
    height: fieldHeight + (helperText ? 24 : 0),
    svg:
      inputRect(x, y, width, fieldHeight, size.radius, palette.fill, stroke, value, valueColor, size.fontSize, strokeWidth) +
      (helperText
        ? `
      <text x="${x}" y="${y + fieldHeight + 18}"
        font-family="Pretendard, Pretendard Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
        font-size="12" font-weight="400" fill="${helperColor}">${escapeXml(helperText)}</text>
    `
        : "")
  };
};

const renderPreview = (family) => {
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${preview.width}" height="${preview.height}" viewBox="0 0 ${preview.width} ${preview.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${preview.width}" height="${preview.height}" rx="24" fill="#F8FAFC"/>
  ${parts.join("\n")}
</svg>`;
};

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(path.join(outputDir, "button-contract.svg"), renderPreview("button"), "utf8");
await fs.writeFile(path.join(outputDir, "input-contract.svg"), renderPreview("input"), "utf8");

console.log("Generated previews:");
console.log(path.join(outputDir, "button-contract.svg"));
console.log(path.join(outputDir, "input-contract.svg"));
