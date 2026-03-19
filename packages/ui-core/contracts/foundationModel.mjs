import mobileCore from "./mobile-core.json" with { type: "json" };

const normalizeSize = (size) => (size === "sm" || size === "lg" ? size : "md");
const normalizeWidth = (width) => (width === "hug" ? "hug" : "full");

export const foundation = mobileCore.foundation;
const semanticLight = foundation.colors.semantic.light;

export const foundationColors = foundation.colors;

export const getButtonMetrics = (size = "md") => {
  const sizeKey = normalizeSize(size);
  return {
    height: foundation.size.controlHeight[sizeKey],
    paddingX: foundation.spacing.buttonPaddingX[sizeKey],
    paddingY: foundation.spacing.buttonPaddingY[sizeKey],
    radius: foundation.radius[sizeKey],
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
    radius: foundation.radius[sizeKey],
    fontSize: foundation.typography.inputValue[sizeKey].fontSize,
    lineHeight: foundation.typography.inputValue[sizeKey].lineHeight,
    minWidth: foundation.size.controlWidth.input.minWidth[sizeKey]
  };
};

export const getInputWidth = (width = "full") => foundation.size.controlWidth.input[normalizeWidth(width)];

export const getInputMultilineHeight = (size = "md", rowsCount = 3) => {
  const metrics = getInputMetrics(size);
  const rows = Math.max(2, rowsCount);
  return Math.max(metrics.height * 2, metrics.lineHeight * rows + metrics.paddingY * 2 + foundation.size.multilineExtra);
};

export const getButtonPalette = (emphasis = "primary", state = "enabled") => {
  if (state === "disabled") {
    return {
      fill: semanticLight.interaction.disable,
      stroke: semanticLight.line.solidNormal,
      text: semanticLight.interaction.inactive
    };
  }

  if (emphasis === "secondary") {
    return {
      fill: state === "pressed" ? semanticLight.background.alternative : semanticLight.background.elevated,
      stroke: state === "pressed" ? semanticLight.line.solidNeutral : semanticLight.line.solidNormal,
      text: semanticLight.label.normal
    };
  }

  if (emphasis === "tertiary") {
    return {
      fill: "transparent",
      stroke: "transparent",
      text: semanticLight.label.neutral
    };
  }

  if (emphasis === "destructive") {
    return {
      fill: state === "pressed" ? foundation.colors.status.dangerPressed : semanticLight.status.negative,
      stroke: "transparent",
      text: foundation.colors.text.inverse
    };
  }

  return {
    fill: state === "pressed" ? semanticLight.primary.heavy : semanticLight.primary.strong,
    stroke: "transparent",
    text: foundation.colors.text.inverse
  };
};

export const getButtonPaletteByAxes = (
  appearance = "solid",
  hierarchy = "primary-level-4",
  state = "enabled"
) => {
  if (state === "disabled") {
    return {
      fill: semanticLight.interaction.disable,
      stroke: semanticLight.line.solidNormal,
      text: semanticLight.interaction.inactive
    };
  }

  const isPressed = state === "pressed";
  const elevated = semanticLight.background.elevated;
  const alt = semanticLight.background.alternative;

  if (hierarchy === "destructive") {
    if (appearance === "outlined") {
      return {
        fill: elevated,
        stroke: semanticLight.status.negative,
        text: semanticLight.status.negative
      };
    }

    if (appearance === "text") {
      return {
        fill: "transparent",
        stroke: "transparent",
        text: semanticLight.status.negative
      };
    }

    return {
      fill: isPressed ? foundation.colors.status.dangerPressed : semanticLight.status.negative,
      stroke: "transparent",
      text: foundation.colors.text.inverse
    };
  }

  if (hierarchy === "assistive-level-1") {
    return {
      fill: "transparent",
      stroke: "transparent",
      text: semanticLight.label.neutral
    };
  }

  if (hierarchy === "assistive-level-2") {
    return {
      fill: isPressed ? alt : elevated,
      stroke: isPressed ? semanticLight.line.solidNeutral : semanticLight.line.solidNormal,
      text: semanticLight.label.normal
    };
  }

  if (hierarchy === "primary-level-3") {
    if (appearance === "solid") {
      return {
        fill: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong,
        stroke: "transparent",
        text: foundation.colors.text.inverse
      };
    }

    if (appearance === "text") {
      return {
        fill: "transparent",
        stroke: "transparent",
        text: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong
      };
    }

    return {
      fill: elevated,
      stroke: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong,
      text: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong
    };
  }

  if (appearance === "outlined") {
    return {
      fill: elevated,
      stroke: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong,
      text: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong
    };
  }

  if (appearance === "text") {
    return {
      fill: "transparent",
      stroke: "transparent",
      text: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong
    };
  }

  return {
    fill: isPressed ? semanticLight.primary.heavy : semanticLight.primary.strong,
    stroke: "transparent",
    text: foundation.colors.text.inverse
  };
};

export const getInputPalette = (intent = "default", state = "enabled") => {
  if (state === "disabled") {
    return {
      fill: semanticLight.interaction.disable,
      stroke: semanticLight.line.solidNormal,
      text: semanticLight.interaction.inactive,
      subtle: semanticLight.interaction.inactive
    };
  }

  if (state === "readonly") {
    return {
      fill: semanticLight.background.alternative,
      stroke: semanticLight.line.solidNormal,
      text: semanticLight.label.neutral,
      subtle: semanticLight.interaction.inactive
    };
  }

  if (state === "loading") {
    return {
      fill: semanticLight.background.elevated,
      stroke: semanticLight.line.solidNormal,
      text: semanticLight.interaction.inactive,
      subtle: semanticLight.interaction.inactive
    };
  }

  const strokeByIntent = {
    error: semanticLight.status.negative,
    success: semanticLight.status.positive,
    default: semanticLight.line.solidNormal
  };

  return {
    fill: semanticLight.background.elevated,
    stroke: strokeByIntent[intent] ?? strokeByIntent.default,
    text: semanticLight.label.normal,
    subtle: semanticLight.interaction.inactive
  };
};

export const getInputFocusRing = () => ({
  stroke: semanticLight.primary.heavy,
  strokeWeight: 2
});

export const getInputHelperColor = (intent = "default") =>
  intent === "error" ? semanticLight.status.negative : semanticLight.label.assistive;
