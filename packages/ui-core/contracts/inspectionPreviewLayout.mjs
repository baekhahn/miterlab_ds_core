import mobileCore from "./mobile-core.json" with { type: "json" };

const AXIS_PILL_WIDTH = 72;
const AXIS_PILL_HEIGHT = 24;
const PREVIEW_WIDTH = 920;
const PREVIEW_MIN_HEIGHT = 380;
const PREVIEW_PADDING_LEFT = 32;
const PREVIEW_PADDING_RIGHT = 40;
const CONTENT_START_X = 116;
const ROW_GAP = 18;
const ITEM_GAP = 14;
const WRAP_GAP = 12;

const axisTitle = (axis) => {
  if (axis === "emphasis") return "Emphasis";
  if (axis === "intent") return "Intent";
  if (axis === "size") return "Size";
  if (axis === "state") return "State";
  if (axis === "width") return "Width";
  if (axis === "bundle") return "Bundle";
  return axis;
};

const resolveFamily = (screenOrFamily) => {
  if (screenOrFamily === "button" || screenOrFamily === "button-inspection") return "button";
  if (screenOrFamily === "input" || screenOrFamily === "input-inspection") return "input";
  throw new Error(`Unsupported inspection family: ${screenOrFamily}`);
};

const resolveItemMetrics = (family, component) => {
  if (family === "button") {
    const size = mobileCore.button.render.sizes[component.size];
    const width = component.iconOnly
      ? size.height
      : component.width === "full"
        ? mobileCore.button.render.widths.full
        : mobileCore.button.render.widths.hug;
    return { width, height: size.height };
  }

  const size = mobileCore.input.render.sizes[component.size];
  const width = component.width === "full" ? mobileCore.input.render.widths.full : mobileCore.input.render.widths.hug;
  const fieldHeight = component.multiline
    ? Math.max(size.height * 2, size.lineHeight * (component.rowsCount ?? 3) + size.paddingY * 2 + 16)
    : size.height;
  const helperHeight = component.helperText ? 24 : 0;
  return { width, height: fieldHeight + helperHeight };
};

export const createInspectionPreviewModel = (screenOrFamily) => {
  const family = resolveFamily(screenOrFamily);
  const inspection = mobileCore[family].inspection;
  const componentByLabel = new Map(inspection.components.map((component) => [component.label, component]));
  const rows = [];
  let currentBandY = 20;
  let maxBottom = 0;

  for (const row of inspection.rows) {
    const items = [];
    let currentX = CONTENT_START_X;
    let currentY = currentBandY;
    let currentLineHeight = 0;
    let bandBottom = currentBandY + AXIS_PILL_HEIGHT;

    for (const itemName of row.items) {
      const component = componentByLabel.get(itemName);
      if (!component) continue;

      const metrics = resolveItemMetrics(family, component);
      const maxX = PREVIEW_WIDTH - PREVIEW_PADDING_RIGHT;

      if (currentX !== CONTENT_START_X && currentX + metrics.width > maxX) {
        currentX = CONTENT_START_X;
        currentY += currentLineHeight + WRAP_GAP;
        currentLineHeight = 0;
      }

      items.push({
        label: itemName,
        x: currentX,
        y: currentY,
        width: metrics.width,
        height: metrics.height,
        component
      });

      currentLineHeight = Math.max(currentLineHeight, metrics.height);
      bandBottom = Math.max(bandBottom, currentY + metrics.height);
      currentX += metrics.width + ITEM_GAP;
    }

    rows.push({
      axis: row.axis,
      axisTitle: axisTitle(row.axis),
      pill: {
        x: PREVIEW_PADDING_LEFT,
        y: currentBandY + 12,
        width: AXIS_PILL_WIDTH,
        height: AXIS_PILL_HEIGHT
      },
      items
    });

    maxBottom = Math.max(maxBottom, bandBottom);
    currentBandY = bandBottom + ROW_GAP;
  }

  return {
    family,
    width: PREVIEW_WIDTH,
    height: Math.max(PREVIEW_MIN_HEIGHT, maxBottom + 34),
    rows
  };
};
