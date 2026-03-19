import mobileCore from "./mobile-core.json" with { type: "json" };

const normalizeSize = (size) => (size === "sm" || size === "lg" ? size : "md");
const normalizeWidth = (width) => (width === "hug" ? "hug" : "full");

export const foundation = mobileCore.foundation;

export const getButtonMetrics = (size = "md") => {
  const sizeKey = normalizeSize(size);
  return {
    height: foundation.size.controlHeight[sizeKey],
    paddingX: foundation.spacing.buttonPaddingX[sizeKey],
    paddingY: foundation.spacing.buttonPaddingY[sizeKey],
    radius: foundation.radius.button[sizeKey],
    fontSize: foundation.typography.buttonLabel[sizeKey].fontSize,
    lineHeight: foundation.typography.buttonLabel[sizeKey].lineHeight,
    gap: foundation.spacing.controlGap.button,
    minWidth: foundation.size.controlWidth.button.minWidth[sizeKey]
  };
};

export const getButtonWidth = (width = "hug") => foundation.size.controlWidth.button[normalizeWidth(width)];

export const getInputMetrics = (size = "md") => {
  const sizeKey = normalizeSize(size);
  return {
    height: foundation.size.controlHeight[sizeKey],
    paddingX: foundation.spacing.inputPaddingX[sizeKey],
    paddingY: foundation.spacing.inputPaddingY[sizeKey],
    radius: foundation.radius.input[sizeKey],
    fontSize: foundation.typography.inputValue[sizeKey].fontSize,
    lineHeight: foundation.typography.inputValue[sizeKey].lineHeight,
    minWidth: foundation.size.controlWidth.input.minWidth[sizeKey]
  };
};

export const getInputWidth = (width = "full") => foundation.size.controlWidth.input[normalizeWidth(width)];

export const getInputMultilineHeight = (size = "md", rowsCount = 3) => {
  const metrics = getInputMetrics(size);
  const rows = Math.max(2, rowsCount);
  return Math.max(metrics.height * 2, metrics.lineHeight * rows + metrics.paddingY * 2 + 16);
};
