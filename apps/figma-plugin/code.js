"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // ../../packages/ui-core/contracts/mobile-core.json with { type: 'json' }
  var mobile_core_default = {
    foundation: {
      colors: {
        semantic: {
          light: {
            primary: {
              normal: "#3385FF",
              strong: "#1A75FF",
              heavy: "#0066FF"
            },
            label: {
              normal: "#171719",
              neutral: "#2E2F33",
              alternative: "#37383C",
              assistive: "#70737C",
              disable: "#989BA2"
            },
            background: {
              normal: "#FFFFFF",
              alternative: "#F7F7F8",
              elevated: "#FFFFFF"
            },
            interaction: {
              inactive: "#989BA2",
              disable: "#F4F4F5"
            },
            line: {
              solidNormal: "#E1E2E4",
              solidNeutral: "#EAEBEC",
              solidAlternative: "#F4F4F5"
            },
            status: {
              positive: "#00BF40",
              cautionary: "#FF9200",
              negative: "#FF4242"
            },
            fill: {
              normal: "#F7F7F8",
              strong: "#F4F4F5",
              alternative: "#FFFFFF"
            },
            inverse: {
              background: "#1B1C1E",
              label: "#F7F7F8"
            }
          },
          dark: {
            primary: {
              normal: "#0066FF",
              strong: "#005EEB",
              heavy: "#0054D1"
            },
            label: {
              normal: "#F7F7F8",
              neutral: "#C2C4C8",
              alternative: "#AEB0B6",
              assistive: "#AEB0B6",
              disable: "#989BA2"
            },
            background: {
              normal: "#1B1C1E",
              alternative: "#0F0F10",
              elevated: "#212225"
            },
            interaction: {
              inactive: "#5A5C63",
              disable: "#2E2F33"
            },
            line: {
              solidNormal: "#37383C",
              solidNeutral: "#333438",
              solidAlternative: "#2E2F33"
            },
            status: {
              positive: "#1ED45A",
              cautionary: "#FFA938",
              negative: "#FF6363"
            },
            fill: {
              normal: "#212225",
              strong: "#2E2F33",
              alternative: "#141415"
            },
            inverse: {
              background: "#FFFFFF",
              label: "#171719"
            }
          }
        },
        surface: {
          canvas: "#FFFFFF",
          panel: "#F7F7F8",
          field: "#FFFFFF"
        },
        border: {
          default: "#E1E2E4",
          strong: "#D3D5D9"
        },
        text: {
          primary: "#171719",
          secondary: "#2E2F33",
          muted: "#989BA2",
          assistive: "#70737C",
          inverse: "#FFFFFF"
        },
        accent: {
          primary: "#0066FF",
          primaryStrong: "#1A75FF",
          primaryNormal: "#3385FF",
          primaryWeak: "#EAF2FF"
        },
        status: {
          success: "#00BF40",
          cautionary: "#FF9200",
          danger: "#FF4242",
          dangerPressed: "#E52222"
        },
        preview: {
          axisPillFill: "#F7F7F8",
          axisPillText: "#70737C"
        }
      },
      density: {
        base: "md",
        touchTargetMin: 44
      },
      size: {
        controlHeight: {
          sm: 32,
          md: 40,
          lg: 48
        },
        controlWidth: {
          button: {
            hug: 128,
            full: 360,
            minWidth: {
              sm: 104,
              md: 116,
              lg: 148
            }
          },
          input: {
            hug: 220,
            full: 360,
            minWidth: {
              sm: 220,
              md: 220,
              lg: 220
            }
          }
        },
        multilineExtra: 16
      },
      typography: {
        buttonLabel: {
          sm: { fontSize: 14, lineHeight: 20 },
          md: { fontSize: 14, lineHeight: 20 },
          lg: { fontSize: 16, lineHeight: 22 }
        },
        inputValue: {
          sm: { fontSize: 14, lineHeight: 20 },
          md: { fontSize: 14, lineHeight: 20 },
          lg: { fontSize: 16, lineHeight: 22 }
        }
      },
      spacing: {
        buttonPaddingX: {
          sm: 14,
          md: 16,
          lg: 18
        },
        buttonPaddingY: {
          sm: 8,
          md: 10,
          lg: 13
        },
        inputPaddingX: {
          sm: 12,
          md: 14,
          lg: 16
        },
        inputPaddingY: {
          sm: 8,
          md: 10,
          lg: 13
        },
        controlGap: {
          button: 8,
          input: 8
        },
        helperTextGap: 6
      },
      radius: {
        none: 0,
        sm: 10,
        md: 10,
        lg: 12,
        round: 999
      }
    },
    button: {
      inspection: {
        title: "Button Inspection",
        axes: {
          hierarchy: ["primary-level-4", "primary-level-3", "assistive-level-2", "assistive-level-1"],
          content: ["label-only", "icon-label", "icon-only"],
          size: ["sm", "md", "lg"],
          state: ["enabled", "pressed", "disabled", "loading"]
        },
        rows: [
          { axis: "hierarchy", items: ["Primary L4", "Primary L3", "Assistive L2", "Assistive L1"] },
          { axis: "content", items: ["Label Only", "Icon + Label", "Icon Only"] },
          { axis: "size", items: ["Small", "Medium", "Large"] },
          { axis: "state", items: ["Pressed", "Disabled", "Loading"] }
        ],
        sections: ["preview"],
        components: [
          { component: "button", section: "preview", label: "Primary L4", appearance: "solid", hierarchy: "primary-level-4", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Primary L3", appearance: "outlined", hierarchy: "primary-level-3", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Assistive L2", appearance: "outlined", hierarchy: "assistive-level-2", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Assistive L1", appearance: "text", hierarchy: "assistive-level-1", emphasis: "tertiary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Label Only", appearance: "solid", hierarchy: "primary-level-4", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Icon + Label", appearance: "outlined", hierarchy: "assistive-level-2", emphasis: "secondary", size: "md", width: "hug", state: "enabled", iconLeading: true },
          { component: "button", section: "preview", label: "Icon Only", appearance: "text", hierarchy: "assistive-level-1", emphasis: "tertiary", size: "md", width: "hug", state: "enabled", iconOnly: true },
          { component: "button", section: "preview", label: "Small", emphasis: "primary", size: "sm", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Medium", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Large", emphasis: "primary", size: "lg", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Pressed", emphasis: "primary", size: "md", width: "hug", state: "pressed" },
          { component: "button", section: "preview", label: "Disabled", emphasis: "primary", size: "md", width: "hug", state: "disabled", disabled: true },
          { component: "button", section: "preview", label: "Loading", emphasis: "primary", size: "md", width: "hug", state: "loading", loading: true }
        ]
      }
    },
    input: {
      inspection: {
        title: "Input Inspection",
        axes: {
          intent: ["default", "error", "success"],
          size: ["sm", "md", "lg"],
          width: ["hug", "full"],
          state: ["enabled", "focused", "disabled", "readonly", "loading"]
        },
        rows: [
          { axis: "intent", items: ["Default", "Error", "Success"] },
          { axis: "size", items: ["Small", "Medium", "Large"] },
          { axis: "state", items: ["Focused", "Read Only", "Disabled"] },
          { axis: "width", items: ["Hug Width", "Full Width"] },
          { axis: "bundle", items: ["With Helper", "With Error Text", "Multiline", "Readonly Field"] }
        ],
        sections: ["preview"],
        components: [
          { component: "input", section: "preview", label: "Default", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Type here" },
          { component: "input", section: "preview", label: "Error", intent: "error", size: "md", width: "full", state: "focused", value: "Wrong value" },
          { component: "input", section: "preview", label: "Success", intent: "success", size: "md", width: "full", state: "enabled", value: "Correct value" },
          { component: "input", section: "preview", label: "Small", intent: "default", size: "sm", width: "full", state: "enabled", placeholder: "Small input" },
          { component: "input", section: "preview", label: "Medium", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Medium input" },
          { component: "input", section: "preview", label: "Large", intent: "default", size: "lg", width: "full", state: "enabled", placeholder: "Large input" },
          { component: "input", section: "preview", label: "Focused", intent: "default", size: "md", width: "full", state: "focused", value: "Focused value" },
          { component: "input", section: "preview", label: "Disabled", intent: "default", size: "md", width: "full", state: "disabled", disabled: true, value: "Disabled value" },
          { component: "input", section: "preview", label: "Read Only", intent: "default", size: "md", width: "full", state: "readonly", readOnly: true, value: "Read only value" },
          { component: "input", section: "preview", label: "Loading", intent: "default", size: "md", width: "full", state: "loading", value: "Loading value" },
          { component: "input", section: "preview", label: "Hug Width", intent: "default", size: "md", width: "hug", state: "enabled", placeholder: "Short" },
          { component: "input", section: "preview", label: "Full Width", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Full width field" },
          { component: "input", section: "preview", label: "With Helper", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Email address", helperText: "We will never share your email." },
          { component: "input", section: "preview", label: "With Error Text", intent: "error", size: "md", width: "full", state: "focused", value: "wrong@email", helperText: "Enter a valid email address." },
          { component: "input", section: "preview", label: "Multiline", intent: "default", size: "lg", width: "full", state: "enabled", placeholder: "Type a longer message", multiline: true, rowsCount: 3 },
          { component: "input", section: "preview", label: "Readonly Field", intent: "default", size: "md", width: "full", state: "readonly", readOnly: true, value: "Generated project slug" }
        ]
      }
    }
  };

  // ../../packages/ui-core/contracts/foundationModel.mjs
  var normalizeSize = (size) => size === "sm" || size === "lg" ? size : "md";
  var normalizeWidth = (width) => width === "hug" ? "hug" : "full";
  var foundation = mobile_core_default.foundation;
  var semanticLight = foundation.colors.semantic.light;
  var foundationColors = foundation.colors;
  var getButtonMetrics = (size = "md") => {
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
  var getButtonWidth = (width = "hug") => foundation.size.controlWidth.button[normalizeWidth(width)];
  var getInputMetrics = (size = "md") => {
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
  var getInputWidth = (width = "full") => foundation.size.controlWidth.input[normalizeWidth(width)];
  var getInputMultilineHeight = (size = "md", rowsCount = 3) => {
    const metrics = getInputMetrics(size);
    const rows = Math.max(2, rowsCount);
    return Math.max(metrics.height * 2, metrics.lineHeight * rows + metrics.paddingY * 2 + foundation.size.multilineExtra);
  };
  var getButtonPalette = (emphasis = "primary", state = "enabled") => {
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
  var getButtonPaletteByAxes = (appearance = "solid", hierarchy = "primary-level-4", state = "enabled") => {
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
  var getInputPalette = (intent = "default", state = "enabled") => {
    var _a;
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
      stroke: (_a = strokeByIntent[intent]) != null ? _a : strokeByIntent.default,
      text: semanticLight.label.normal,
      subtle: semanticLight.interaction.inactive
    };
  };
  var getInputFocusRing = () => ({
    stroke: semanticLight.primary.heavy,
    strokeWeight: 2
  });
  var getInputHelperColor = (intent = "default") => intent === "error" ? semanticLight.status.negative : semanticLight.label.assistive;

  // ../../packages/ui-core/contracts/inspectionPreviewLayout.mjs
  var AXIS_PILL_WIDTH = 72;
  var AXIS_PILL_HEIGHT = 24;
  var PREVIEW_WIDTH = 920;
  var PREVIEW_MIN_HEIGHT = 380;
  var PREVIEW_PADDING_LEFT = 32;
  var PREVIEW_PADDING_RIGHT = 40;
  var CONTENT_START_X = 116;
  var ROW_GAP = 18;
  var ITEM_GAP = 14;
  var WRAP_GAP = 12;
  var axisTitle = (axis) => {
    if (axis === "hierarchy") return "Hierarchy";
    if (axis === "content") return "Content";
    if (axis === "emphasis") return "Emphasis";
    if (axis === "intent") return "Intent";
    if (axis === "size") return "Size";
    if (axis === "state") return "State";
    if (axis === "width") return "Width";
    if (axis === "bundle") return "Bundle";
    return axis;
  };
  var resolveFamily = (screenOrFamily) => {
    if (screenOrFamily === "button" || screenOrFamily === "button-inspection") return "button";
    if (screenOrFamily === "input" || screenOrFamily === "input-inspection") return "input";
    throw new Error(`Unsupported inspection family: ${screenOrFamily}`);
  };
  var resolveItemMetrics = (family, component) => {
    var _a;
    if (family === "button") {
      const size2 = getButtonMetrics(component.size);
      const width2 = component.iconOnly ? size2.height : component.width === "full" ? getButtonWidth("full") : getButtonWidth("hug");
      return { width: width2, height: size2.height };
    }
    const size = getInputMetrics(component.size);
    const width = component.width === "full" ? getInputWidth("full") : getInputWidth("hug");
    const fieldHeight = component.multiline ? getInputMultilineHeight(component.size, (_a = component.rowsCount) != null ? _a : 3) : size.height;
    const helperHeight = component.helperText ? 24 : 0;
    return { width, height: fieldHeight + helperHeight };
  };
  var createInspectionPreviewModel = (screenOrFamily) => {
    const family = resolveFamily(screenOrFamily);
    const inspection = mobile_core_default[family].inspection;
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

  // src/write/createContainerNode.ts
  var createContainerNode = (node) => {
    const rect = figma.createRectangle();
    rect.name = node.name;
    rect.resize(Math.max(1, node.width), Math.max(1, node.height));
    rect.x = node.x;
    rect.y = node.y;
    rect.fills = [{ type: "SOLID", color: { r: 0.96, g: 0.97, b: 0.99 } }];
    return rect;
  };

  // src/write/createFrameNode.ts
  var createFrameNode = (node, theme = "core") => {
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(1, node.width), Math.max(1, node.height));
    frame.x = node.x;
    frame.y = node.y;
    if (node.name.endsWith("-section")) {
      frame.fills = [];
      frame.strokes = [];
      frame.clipsContent = false;
      frame.layoutMode = "VERTICAL";
      frame.primaryAxisSizingMode = "AUTO";
      frame.counterAxisSizingMode = "FIXED";
      frame.itemSpacing = 12;
    } else if (node.name.includes("-row-")) {
      frame.fills = [];
      frame.strokes = [];
      frame.clipsContent = false;
      frame.layoutMode = "HORIZONTAL";
      frame.primaryAxisSizingMode = "AUTO";
      frame.counterAxisSizingMode = "AUTO";
      frame.itemSpacing = 16;
    } else {
      frame.fills = [
        {
          type: "SOLID",
          color: theme === "core" ? { r: 0.972, g: 0.976, b: 0.984 } : { r: 1, g: 1, b: 1 }
        }
      ];
      frame.strokes = [];
    }
    return frame;
  };

  // ../../packages/ui-core/contracts/mobile-core.json
  var mobile_core_default2 = {
    foundation: {
      colors: {
        semantic: {
          light: {
            primary: {
              normal: "#3385FF",
              strong: "#1A75FF",
              heavy: "#0066FF"
            },
            label: {
              normal: "#171719",
              neutral: "#2E2F33",
              alternative: "#37383C",
              assistive: "#70737C",
              disable: "#989BA2"
            },
            background: {
              normal: "#FFFFFF",
              alternative: "#F7F7F8",
              elevated: "#FFFFFF"
            },
            interaction: {
              inactive: "#989BA2",
              disable: "#F4F4F5"
            },
            line: {
              solidNormal: "#E1E2E4",
              solidNeutral: "#EAEBEC",
              solidAlternative: "#F4F4F5"
            },
            status: {
              positive: "#00BF40",
              cautionary: "#FF9200",
              negative: "#FF4242"
            },
            fill: {
              normal: "#F7F7F8",
              strong: "#F4F4F5",
              alternative: "#FFFFFF"
            },
            inverse: {
              background: "#1B1C1E",
              label: "#F7F7F8"
            }
          },
          dark: {
            primary: {
              normal: "#0066FF",
              strong: "#005EEB",
              heavy: "#0054D1"
            },
            label: {
              normal: "#F7F7F8",
              neutral: "#C2C4C8",
              alternative: "#AEB0B6",
              assistive: "#AEB0B6",
              disable: "#989BA2"
            },
            background: {
              normal: "#1B1C1E",
              alternative: "#0F0F10",
              elevated: "#212225"
            },
            interaction: {
              inactive: "#5A5C63",
              disable: "#2E2F33"
            },
            line: {
              solidNormal: "#37383C",
              solidNeutral: "#333438",
              solidAlternative: "#2E2F33"
            },
            status: {
              positive: "#1ED45A",
              cautionary: "#FFA938",
              negative: "#FF6363"
            },
            fill: {
              normal: "#212225",
              strong: "#2E2F33",
              alternative: "#141415"
            },
            inverse: {
              background: "#FFFFFF",
              label: "#171719"
            }
          }
        },
        surface: {
          canvas: "#FFFFFF",
          panel: "#F7F7F8",
          field: "#FFFFFF"
        },
        border: {
          default: "#E1E2E4",
          strong: "#D3D5D9"
        },
        text: {
          primary: "#171719",
          secondary: "#2E2F33",
          muted: "#989BA2",
          assistive: "#70737C",
          inverse: "#FFFFFF"
        },
        accent: {
          primary: "#0066FF",
          primaryStrong: "#1A75FF",
          primaryNormal: "#3385FF",
          primaryWeak: "#EAF2FF"
        },
        status: {
          success: "#00BF40",
          cautionary: "#FF9200",
          danger: "#FF4242",
          dangerPressed: "#E52222"
        },
        preview: {
          axisPillFill: "#F7F7F8",
          axisPillText: "#70737C"
        }
      },
      density: {
        base: "md",
        touchTargetMin: 44
      },
      size: {
        controlHeight: {
          sm: 32,
          md: 40,
          lg: 48
        },
        controlWidth: {
          button: {
            hug: 128,
            full: 360,
            minWidth: {
              sm: 104,
              md: 116,
              lg: 148
            }
          },
          input: {
            hug: 220,
            full: 360,
            minWidth: {
              sm: 220,
              md: 220,
              lg: 220
            }
          }
        },
        multilineExtra: 16
      },
      typography: {
        buttonLabel: {
          sm: { fontSize: 14, lineHeight: 20 },
          md: { fontSize: 14, lineHeight: 20 },
          lg: { fontSize: 16, lineHeight: 22 }
        },
        inputValue: {
          sm: { fontSize: 14, lineHeight: 20 },
          md: { fontSize: 14, lineHeight: 20 },
          lg: { fontSize: 16, lineHeight: 22 }
        }
      },
      spacing: {
        buttonPaddingX: {
          sm: 14,
          md: 16,
          lg: 18
        },
        buttonPaddingY: {
          sm: 8,
          md: 10,
          lg: 13
        },
        inputPaddingX: {
          sm: 12,
          md: 14,
          lg: 16
        },
        inputPaddingY: {
          sm: 8,
          md: 10,
          lg: 13
        },
        controlGap: {
          button: 8,
          input: 8
        },
        helperTextGap: 6
      },
      radius: {
        none: 0,
        sm: 10,
        md: 10,
        lg: 12,
        round: 999
      }
    },
    button: {
      inspection: {
        title: "Button Inspection",
        axes: {
          hierarchy: ["primary-level-4", "primary-level-3", "assistive-level-2", "assistive-level-1"],
          content: ["label-only", "icon-label", "icon-only"],
          size: ["sm", "md", "lg"],
          state: ["enabled", "pressed", "disabled", "loading"]
        },
        rows: [
          { axis: "hierarchy", items: ["Primary L4", "Primary L3", "Assistive L2", "Assistive L1"] },
          { axis: "content", items: ["Label Only", "Icon + Label", "Icon Only"] },
          { axis: "size", items: ["Small", "Medium", "Large"] },
          { axis: "state", items: ["Pressed", "Disabled", "Loading"] }
        ],
        sections: ["preview"],
        components: [
          { component: "button", section: "preview", label: "Primary L4", appearance: "solid", hierarchy: "primary-level-4", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Primary L3", appearance: "outlined", hierarchy: "primary-level-3", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Assistive L2", appearance: "outlined", hierarchy: "assistive-level-2", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Assistive L1", appearance: "text", hierarchy: "assistive-level-1", emphasis: "tertiary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Label Only", appearance: "solid", hierarchy: "primary-level-4", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Icon + Label", appearance: "outlined", hierarchy: "assistive-level-2", emphasis: "secondary", size: "md", width: "hug", state: "enabled", iconLeading: true },
          { component: "button", section: "preview", label: "Icon Only", appearance: "text", hierarchy: "assistive-level-1", emphasis: "tertiary", size: "md", width: "hug", state: "enabled", iconOnly: true },
          { component: "button", section: "preview", label: "Small", emphasis: "primary", size: "sm", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Medium", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Large", emphasis: "primary", size: "lg", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Pressed", emphasis: "primary", size: "md", width: "hug", state: "pressed" },
          { component: "button", section: "preview", label: "Disabled", emphasis: "primary", size: "md", width: "hug", state: "disabled", disabled: true },
          { component: "button", section: "preview", label: "Loading", emphasis: "primary", size: "md", width: "hug", state: "loading", loading: true }
        ]
      }
    },
    input: {
      inspection: {
        title: "Input Inspection",
        axes: {
          intent: ["default", "error", "success"],
          size: ["sm", "md", "lg"],
          width: ["hug", "full"],
          state: ["enabled", "focused", "disabled", "readonly", "loading"]
        },
        rows: [
          { axis: "intent", items: ["Default", "Error", "Success"] },
          { axis: "size", items: ["Small", "Medium", "Large"] },
          { axis: "state", items: ["Focused", "Read Only", "Disabled"] },
          { axis: "width", items: ["Hug Width", "Full Width"] },
          { axis: "bundle", items: ["With Helper", "With Error Text", "Multiline", "Readonly Field"] }
        ],
        sections: ["preview"],
        components: [
          { component: "input", section: "preview", label: "Default", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Type here" },
          { component: "input", section: "preview", label: "Error", intent: "error", size: "md", width: "full", state: "focused", value: "Wrong value" },
          { component: "input", section: "preview", label: "Success", intent: "success", size: "md", width: "full", state: "enabled", value: "Correct value" },
          { component: "input", section: "preview", label: "Small", intent: "default", size: "sm", width: "full", state: "enabled", placeholder: "Small input" },
          { component: "input", section: "preview", label: "Medium", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Medium input" },
          { component: "input", section: "preview", label: "Large", intent: "default", size: "lg", width: "full", state: "enabled", placeholder: "Large input" },
          { component: "input", section: "preview", label: "Focused", intent: "default", size: "md", width: "full", state: "focused", value: "Focused value" },
          { component: "input", section: "preview", label: "Disabled", intent: "default", size: "md", width: "full", state: "disabled", disabled: true, value: "Disabled value" },
          { component: "input", section: "preview", label: "Read Only", intent: "default", size: "md", width: "full", state: "readonly", readOnly: true, value: "Read only value" },
          { component: "input", section: "preview", label: "Loading", intent: "default", size: "md", width: "full", state: "loading", value: "Loading value" },
          { component: "input", section: "preview", label: "Hug Width", intent: "default", size: "md", width: "hug", state: "enabled", placeholder: "Short" },
          { component: "input", section: "preview", label: "Full Width", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Full width field" },
          { component: "input", section: "preview", label: "With Helper", intent: "default", size: "md", width: "full", state: "enabled", placeholder: "Email address", helperText: "We will never share your email." },
          { component: "input", section: "preview", label: "With Error Text", intent: "error", size: "md", width: "full", state: "focused", value: "wrong@email", helperText: "Enter a valid email address." },
          { component: "input", section: "preview", label: "Multiline", intent: "default", size: "lg", width: "full", state: "enabled", placeholder: "Type a longer message", multiline: true, rowsCount: 3 },
          { component: "input", section: "preview", label: "Readonly Field", intent: "default", size: "md", width: "full", state: "readonly", readOnly: true, value: "Generated project slug" }
        ]
      }
    }
  };

  // src/write/createTextNode.ts
  var fontCandidates = {
    regular: [
      { family: "Pretendard", style: "Regular" },
      { family: "Pretendard Variable", style: "Regular" },
      { family: "Inter", style: "Regular" }
    ],
    medium: [
      { family: "Pretendard", style: "Medium" },
      { family: "Pretendard Variable", style: "Medium" },
      { family: "Inter", style: "Medium" },
      { family: "Pretendard", style: "Regular" },
      { family: "Inter", style: "Regular" }
    ],
    semibold: [
      { family: "Pretendard", style: "SemiBold" },
      { family: "Pretendard Variable", style: "SemiBold" },
      { family: "Inter", style: "Semi Bold" },
      { family: "Pretendard", style: "Medium" },
      { family: "Inter", style: "Medium" }
    ]
  };
  var rgb = (hex) => {
    const normalized = hex.replace("#", "");
    const bigint = Number.parseInt(normalized, 16);
    return {
      r: (bigint >> 16 & 255) / 255,
      g: (bigint >> 8 & 255) / 255,
      b: (bigint & 255) / 255
    };
  };
  var loadFont = async (weight = "regular") => {
    for (const font of fontCandidates[weight]) {
      try {
        await figma.loadFontAsync(font);
        return font;
      } catch (e) {
        continue;
      }
    }
    throw new Error("No supported default font found. Install Pretendard or Inter in Figma.");
  };
  var typographyMap = {
    "text/heading/xl": { fontSize: 32, lineHeight: 40, weight: "semibold" },
    "text/heading/lg": { fontSize: 24, lineHeight: 32, weight: "semibold" },
    "text/body/lg": { fontSize: 18, lineHeight: 28, weight: "medium" },
    "text/body/md": { fontSize: 15, lineHeight: 24, weight: "regular" },
    "text/body/sm": { fontSize: 13, lineHeight: 20, weight: "regular" },
    "text/label/md": { fontSize: 14, lineHeight: 20, weight: "medium" },
    "text/caption": { fontSize: 12, lineHeight: 18, weight: "regular" }
  };
  var createTextNode = async (node) => {
    var _a, _b, _c;
    const token = typeof ((_a = node.style) == null ? void 0 : _a.text) === "string" ? node.style.text : "text/body/md";
    const typography = (_b = typographyMap[token]) != null ? _b : typographyMap["text/body/md"];
    const font = await loadFont(typography.weight);
    const text = figma.createText();
    text.name = node.name;
    text.fontName = font;
    text.characters = typeof node.text === "string" ? node.text : "";
    text.fontSize = typography.fontSize;
    text.lineHeight = { unit: "PIXELS", value: typography.lineHeight };
    if ((_c = node.style) == null ? void 0 : _c.fill) {
      text.fills = [{ type: "SOLID", color: rgb(node.style.fill) }];
    }
    text.x = node.x;
    text.y = node.y;
    text.resize(Math.max(1, node.width), Math.max(1, node.height));
    return text;
  };

  // src/write/createInstanceNode.ts
  var rgb2 = (hex) => {
    const normalized = hex.replace("#", "");
    const bigint = Number.parseInt(normalized, 16);
    return {
      r: (bigint >> 16 & 255) / 255,
      g: (bigint >> 8 & 255) / 255,
      b: (bigint & 255) / 255
    };
  };
  var styleRadius = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.radius) === "number" ? node.style.radius : fallback;
  };
  var stylePaddingX = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.paddingX) === "number" ? node.style.paddingX : fallback;
  };
  var stylePaddingY = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.paddingY) === "number" ? node.style.paddingY : fallback;
  };
  var styleFontSize = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.fontSize) === "number" ? node.style.fontSize : fallback;
  };
  var styleLineHeight = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.lineHeight) === "number" ? node.style.lineHeight : fallback;
  };
  var styleMinWidth = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.minWidth) === "number" ? node.style.minWidth : fallback;
  };
  var styleGap = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.gap) === "number" ? node.style.gap : fallback;
  };
  var createText = async (value, color, fontSize, lineHeight, weight = "regular") => {
    const font = await loadFont(weight);
    const text = figma.createText();
    text.fontName = font;
    text.characters = value;
    text.fontSize = fontSize;
    text.lineHeight = { unit: "PIXELS", value: lineHeight };
    text.fills = [{ type: "SOLID", color: rgb2(color) }];
    text.textAutoResize = "WIDTH_AND_HEIGHT";
    return text;
  };
  var getButtonSize = (node) => {
    var _a;
    const size = (_a = node.variant) == null ? void 0 : _a.size;
    if (size === "sm" || size === "lg") return size;
    return "md";
  };
  var getButtonState = (node) => {
    var _a;
    const state = (_a = node.variant) == null ? void 0 : _a.state;
    if (state === "pressed" || state === "disabled" || state === "loading") return state;
    return "enabled";
  };
  var getButtonEmphasis = (node) => {
    var _a;
    const emphasis = (_a = node.variant) == null ? void 0 : _a.emphasis;
    if (emphasis === "secondary" || emphasis === "tertiary" || emphasis === "destructive") return emphasis;
    return "primary";
  };
  var getButtonAppearance = (node) => {
    var _a;
    const appearance = (_a = node.variant) == null ? void 0 : _a.appearance;
    if (appearance === "outlined" || appearance === "text") return appearance;
    return "solid";
  };
  var getButtonHierarchy = (node) => {
    var _a;
    const hierarchy = (_a = node.variant) == null ? void 0 : _a.hierarchy;
    if (hierarchy === "primary-level-3" || hierarchy === "assistive-level-2" || hierarchy === "assistive-level-1" || hierarchy === "destructive") {
      return hierarchy;
    }
    return "primary-level-4";
  };
  var getInputSize = (node) => {
    var _a;
    const size = (_a = node.variant) == null ? void 0 : _a.size;
    if (size === "sm" || size === "lg") return size;
    return "md";
  };
  var getInputState = (node) => {
    var _a;
    const state = (_a = node.variant) == null ? void 0 : _a.state;
    if (state === "focused" || state === "disabled" || state === "readonly" || state === "loading") return state;
    return "enabled";
  };
  var getInputIntent = (node) => {
    var _a;
    const intent = (_a = node.variant) == null ? void 0 : _a.intent;
    if (intent === "error" || intent === "success") return intent;
    return "default";
  };
  var createLoadingGlyph = (color, size) => {
    const wrapper = figma.createFrame();
    wrapper.layoutMode = "NONE";
    wrapper.resize(size, size);
    wrapper.fills = [];
    wrapper.strokes = [];
    const ring = figma.createEllipse();
    ring.resize(size - 2, size - 2);
    ring.x = 1;
    ring.y = 1;
    ring.fills = [];
    ring.strokes = [{ type: "SOLID", color: rgb2(color) }];
    ring.strokeWeight = Math.max(1.5, Math.round(size / 8));
    wrapper.appendChild(ring);
    const dot = figma.createEllipse();
    const dotSize = Math.max(3, Math.round(size / 4));
    dot.resize(dotSize, dotSize);
    dot.x = size - dotSize - 1;
    dot.y = 1;
    dot.fills = [{ type: "SOLID", color: rgb2(color) }];
    dot.strokes = [];
    wrapper.appendChild(dot);
    return wrapper;
  };
  var createPlusGlyph = (color, size) => {
    const wrapper = figma.createFrame();
    wrapper.layoutMode = "NONE";
    wrapper.resize(size, size);
    wrapper.fills = [];
    wrapper.strokes = [];
    const thickness = Math.max(2, Math.round(size / 7));
    const arm = Math.max(10, Math.round(size * 0.68));
    const horizontal = figma.createRectangle();
    horizontal.resize(arm, thickness);
    horizontal.cornerRadius = thickness / 2;
    horizontal.x = Math.round((size - arm) / 2);
    horizontal.y = Math.round((size - thickness) / 2);
    horizontal.fills = [{ type: "SOLID", color: rgb2(color) }];
    wrapper.appendChild(horizontal);
    const vertical = figma.createRectangle();
    vertical.resize(thickness, arm);
    vertical.cornerRadius = thickness / 2;
    vertical.x = Math.round((size - thickness) / 2);
    vertical.y = Math.round((size - arm) / 2);
    vertical.fills = [{ type: "SOLID", color: rgb2(color) }];
    wrapper.appendChild(vertical);
    return wrapper;
  };
  var createClearGlyph = (color, size) => {
    const wrapper = figma.createFrame();
    wrapper.layoutMode = "NONE";
    wrapper.resize(size, size);
    wrapper.fills = [{ type: "SOLID", color: rgb2("#E0E6EE") }];
    wrapper.cornerRadius = size / 2;
    wrapper.strokes = [];
    const stroke = Math.max(1.5, Math.round(size / 7));
    const arm = Math.max(8, Math.round(size * 0.45));
    const slashA = figma.createRectangle();
    slashA.resize(arm, stroke);
    slashA.cornerRadius = stroke / 2;
    slashA.fills = [{ type: "SOLID", color: rgb2(color) }];
    slashA.rotation = 45;
    slashA.x = Math.round((size - arm) / 2);
    slashA.y = Math.round((size - stroke) / 2);
    wrapper.appendChild(slashA);
    const slashB = figma.createRectangle();
    slashB.resize(arm, stroke);
    slashB.cornerRadius = stroke / 2;
    slashB.fills = [{ type: "SOLID", color: rgb2(color) }];
    slashB.rotation = -45;
    slashB.x = Math.round((size - arm) / 2);
    slashB.y = Math.round((size - stroke) / 2);
    wrapper.appendChild(slashB);
    return wrapper;
  };
  var createButtonNode = async (node) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const sizeKey = getButtonSize(node);
    const state = getButtonState(node);
    const emphasis = getButtonEmphasis(node);
    const appearance = getButtonAppearance(node);
    const hierarchy = getButtonHierarchy(node);
    const metrics = getButtonMetrics(sizeKey);
    const palette = ((_a = node.variant) == null ? void 0 : _a.appearance) || ((_b = node.variant) == null ? void 0 : _b.hierarchy) ? getButtonPaletteByAxes(appearance, hierarchy, state) : getButtonPalette(emphasis, state);
    const fill = palette.fill;
    const stroke = palette.stroke;
    const iconOnly = ((_c = node.variant) == null ? void 0 : _c.iconOnly) === true;
    const iconLeading = ((_d = node.variant) == null ? void 0 : _d.iconLeading) === true;
    const iconTrailing = ((_e = node.variant) == null ? void 0 : _e.iconTrailing) === true;
    const width = iconOnly ? metrics.height : ((_f = node.variant) == null ? void 0 : _f.width) === "full" ? getButtonWidth("full") : getButtonWidth("hug");
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(width, styleMinWidth(node, metrics.minWidth), node.width), Math.max(metrics.height, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = iconOnly ? 0 : stylePaddingX(node, metrics.paddingX);
    frame.paddingRight = iconOnly ? 0 : stylePaddingX(node, metrics.paddingX);
    frame.paddingTop = stylePaddingY(node, metrics.paddingY);
    frame.paddingBottom = stylePaddingY(node, metrics.paddingY);
    frame.itemSpacing = styleGap(node, metrics.gap);
    frame.cornerRadius = styleRadius(node, metrics.radius);
    frame.strokeWeight = stroke === "transparent" ? 0 : 1;
    frame.strokes = frame.strokeWeight === 0 ? [] : [{ type: "SOLID", color: rgb2(stroke) }];
    frame.fills = fill === "transparent" ? [] : [{ type: "SOLID", color: rgb2(fill) }];
    if (state === "loading") {
      frame.appendChild(createLoadingGlyph(palette.text, Math.max(16, metrics.fontSize + 2)));
    } else if (iconLeading || iconOnly) {
      frame.appendChild(createPlusGlyph(palette.text, Math.max(16, metrics.fontSize + 2)));
    }
    if (!iconOnly) {
      const label = await createText((_g = node.text) != null ? _g : node.name, palette.text, styleFontSize(node, metrics.fontSize), styleLineHeight(node, metrics.lineHeight), "semibold");
      label.textAlignHorizontal = "CENTER";
      frame.appendChild(label);
    }
    if (!iconOnly && state !== "loading" && iconTrailing) {
      frame.appendChild(createPlusGlyph(palette.text, Math.max(16, metrics.fontSize + 2)));
    }
    return frame;
  };
  var createInputNode = async (node) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const sizeKey = getInputSize(node);
    const state = getInputState(node);
    const intent = getInputIntent(node);
    const metrics = getInputMetrics(sizeKey);
    const palette = getInputPalette(intent, state);
    const width = ((_a = node.variant) == null ? void 0 : _a.width) === "hug" ? getInputWidth("hug") : getInputWidth("full");
    const focusRing = getInputFocusRing();
    const stroke = state === "focused" ? focusRing.stroke : palette.stroke;
    const strokeWeight = state === "focused" ? focusRing.strokeWeight : 1;
    const helperText = typeof ((_b = node.variant) == null ? void 0 : _b.helperText) === "string" ? node.variant.helperText : void 0;
    const multiline = ((_c = node.variant) == null ? void 0 : _c.multiline) === true;
    const rowsCount = typeof ((_d = node.variant) == null ? void 0 : _d.rowsCount) === "number" && Number.isFinite(node.variant.rowsCount) ? Math.max(2, node.variant.rowsCount) : 3;
    const fieldHeight = multiline ? getInputMultilineHeight(sizeKey, rowsCount) : Math.max(metrics.height, node.height);
    const wrapper = figma.createFrame();
    wrapper.name = node.name;
    wrapper.x = node.x;
    wrapper.y = node.y;
    wrapper.layoutMode = "VERTICAL";
    wrapper.primaryAxisAlignItems = "MIN";
    wrapper.counterAxisAlignItems = "MIN";
    wrapper.itemSpacing = helperText ? mobile_core_default2.foundation.spacing.helperTextGap : 0;
    wrapper.fills = [];
    wrapper.strokes = [];
    const frame = figma.createFrame();
    frame.name = `${node.name} / field`;
    frame.resize(Math.max(width, styleMinWidth(node, metrics.minWidth), node.width), fieldHeight);
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = multiline ? "MIN" : "MIN";
    frame.counterAxisAlignItems = multiline ? "MIN" : "CENTER";
    frame.paddingLeft = stylePaddingX(node, metrics.paddingX);
    frame.paddingRight = stylePaddingX(node, metrics.paddingX);
    frame.paddingTop = stylePaddingY(node, metrics.paddingY);
    frame.paddingBottom = stylePaddingY(node, metrics.paddingY);
    frame.itemSpacing = 8;
    frame.cornerRadius = styleRadius(node, metrics.radius);
    frame.strokeWeight = strokeWeight;
    frame.strokes = [{ type: "SOLID", color: rgb2(stroke) }];
    frame.fills = [{ type: "SOLID", color: rgb2(palette.fill) }];
    const value = typeof ((_e = node.variant) == null ? void 0 : _e.value) === "string" ? node.variant.value : typeof ((_f = node.variant) == null ? void 0 : _f.defaultValue) === "string" ? node.variant.defaultValue : typeof ((_g = node.variant) == null ? void 0 : _g.placeholder) === "string" ? node.variant.placeholder : "Input";
    const textColor = typeof ((_h = node.variant) == null ? void 0 : _h.value) === "string" || typeof ((_i = node.variant) == null ? void 0 : _i.defaultValue) === "string" ? palette.text : palette.subtle;
    const label = await createText(value, textColor, styleFontSize(node, metrics.fontSize), styleLineHeight(node, metrics.lineHeight));
    label.layoutGrow = 1;
    if (multiline) {
      label.textAutoResize = "HEIGHT";
    }
    frame.appendChild(label);
    if (state === "loading") {
      frame.appendChild(createLoadingGlyph(foundationColors.text.assistive, Math.max(16, metrics.fontSize + 2)));
    } else if (((_j = node.variant) == null ? void 0 : _j.clearable) === true && typeof ((_k = node.variant) == null ? void 0 : _k.value) === "string") {
      frame.appendChild(createClearGlyph(foundationColors.text.assistive, Math.max(16, metrics.fontSize + 3)));
    }
    wrapper.appendChild(frame);
    if (helperText) {
      const helper = await createText(
        helperText,
        getInputHelperColor(intent),
        12,
        18,
        "regular"
      );
      wrapper.appendChild(helper);
    }
    wrapper.resize(frame.width, fieldHeight + (helperText ? 24 : 0));
    return wrapper;
  };
  var createFallbackNode = async (node) => {
    var _a;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(160, node.width), Math.max(40, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.cornerRadius = 10;
    frame.fills = [{ type: "SOLID", color: rgb2(foundationColors.surface.panel) }];
    frame.strokes = [{ type: "SOLID", color: rgb2(foundationColors.border.default) }];
    const text = await createText((_a = node.component) != null ? _a : node.name, foundationColors.text.secondary, 13, 18, "medium");
    frame.appendChild(text);
    return frame;
  };
  var createInstanceNode = async (node) => {
    if (node.component === "Button") {
      return await createButtonNode(node);
    }
    if (node.component === "Input") {
      return await createInputNode(node);
    }
    return await createFallbackNode(node);
  };

  // src/write/renderPayload.ts
  var toSceneNode = async (node, theme) => {
    if (node.type === "TEXT") {
      return await createTextNode(node);
    }
    if (node.type === "FRAME" || node.type === "GROUP") {
      return createFrameNode(node, theme);
    }
    if (node.type === "INSTANCE" || node.type === "COMPONENT") {
      return await createInstanceNode(node, theme);
    }
    return createContainerNode(node);
  };
  var positionChildInSection = (parent, child, index) => {
    if (!parent.name.endsWith("-section")) {
      return;
    }
    child.x = Math.max(0, child.x - parent.x);
    child.y = Math.max(0, child.y - parent.y);
  };
  var renderChildren = async (parent, children, theme) => {
    let count = 0;
    for (const [index, child] of children.entries()) {
      const next = await toSceneNode(child, theme);
      parent.appendChild(next);
      positionChildInSection(parent, next, index);
      count += 1;
      if (child.children && child.children.length > 0 && next.type === "FRAME") {
        count += await renderChildren(next, child.children, theme);
      }
    }
    return count;
  };
  var rgb3 = (hex) => {
    const normalized = hex.replace("#", "");
    const bigint = Number.parseInt(normalized, 16);
    return {
      r: (bigint >> 16 & 255) / 255,
      g: (bigint >> 8 & 255) / 255,
      b: (bigint & 255) / 255
    };
  };
  var createAxisPill = async (label, x, y) => {
    const pill = figma.createFrame();
    pill.layoutMode = "NONE";
    pill.resize(72, 24);
    pill.x = x;
    pill.y = y;
    pill.cornerRadius = 12;
    pill.fills = [{ type: "SOLID", color: rgb3(foundationColors.preview.axisPillFill) }];
    pill.strokes = [];
    const text = figma.createText();
    text.fontName = await loadFont("semibold");
    text.characters = label;
    text.fontSize = 11;
    text.fills = [{ type: "SOLID", color: rgb3(foundationColors.preview.axisPillText) }];
    text.textAlignHorizontal = "CENTER";
    text.textAutoResize = "WIDTH_AND_HEIGHT";
    text.x = Math.round((72 - text.width) / 2);
    text.y = 6;
    pill.appendChild(text);
    return pill;
  };
  var createInspectionPreviewFrame = async (payload, frameName) => {
    const preview = createInspectionPreviewModel(payload.document.screen);
    const frame = figma.createFrame();
    frame.name = frameName;
    frame.layoutMode = "NONE";
    frame.resize(preview.width, preview.height);
    frame.cornerRadius = 24;
    frame.fills = [{ type: "SOLID", color: rgb3("#FFFFFF") }];
    frame.strokes = [];
    frame.clipsContent = false;
    const theme = payload.document.theme || "core";
    let createdNodeCount = 1;
    for (const row of preview.rows) {
      const pill = await createAxisPill(row.axisTitle, row.pill.x, row.pill.y);
      frame.appendChild(pill);
      createdNodeCount += 2;
      for (const item of row.items) {
        const next = await createInstanceNode(
          {
            id: `${payload.document.screen}-${item.label}`,
            type: "INSTANCE",
            name: item.label,
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            component: item.component.component === "button" ? "Button" : "Input",
            variant: __spreadValues({}, item.component),
            text: item.component.label
          },
          theme
        );
        next.x = item.x;
        next.y = item.y;
        frame.appendChild(next);
        createdNodeCount += 1;
      }
    }
    return { frame, createdNodeCount };
  };
  var renderPayload = async (payload) => {
    const root = payload.nodes[0];
    if (!root) {
      throw new Error("Payload has no root node");
    }
    const theme = payload.document.theme || "core";
    const frameName = `${payload.document.name} (${payload.document.theme})`;
    const existing = figma.currentPage.children.find(
      (node) => node.type === "FRAME" && node.name === frameName
    );
    if (existing && existing.type === "FRAME") {
      existing.remove();
    }
    if (payload.document.screen === "button-inspection" || payload.document.screen === "input-inspection") {
      const { frame: frame2, createdNodeCount: createdNodeCount2 } = await createInspectionPreviewFrame(payload, frameName);
      figma.currentPage.appendChild(frame2);
      figma.currentPage.selection = [frame2];
      figma.viewport.scrollAndZoomIntoView([frame2]);
      return {
        createdNodeCount: createdNodeCount2,
        createdFrameName: frame2.name
      };
    }
    const frame = createFrameNode(__spreadProps(__spreadValues({}, root), { name: frameName }), theme);
    figma.currentPage.appendChild(frame);
    let createdNodeCount = 1;
    if (root.children && root.children.length > 0) {
      createdNodeCount += await renderChildren(frame, root.children, theme);
    }
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    return {
      createdNodeCount,
      createdFrameName: frame.name
    };
  };

  // src/write/renderContractPreview.ts
  var FOUNDATION_COLORS = mobile_core_default2.foundation.colors;
  var COLORS = {
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
  var contractPreviewOptions = [
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
  var rgb4 = (hex) => {
    const normalized = hex.replace("#", "");
    const bigint = Number.parseInt(normalized, 16);
    return {
      r: (bigint >> 16 & 255) / 255,
      g: (bigint >> 8 & 255) / 255,
      b: (bigint & 255) / 255
    };
  };
  var setSolidFill = (node, hex) => {
    node.fills = [{ type: "SOLID", color: rgb4(hex) }];
  };
  var setStroke = (node, hex, weight = 1) => {
    node.strokes = [{ type: "SOLID", color: rgb4(hex) }];
    node.strokeWeight = weight;
  };
  var createText2 = async (value, x, y, size, color, weight = "regular", align = "LEFT") => {
    const node = figma.createText();
    node.fontName = await loadFont(weight);
    node.characters = value;
    node.fontSize = size;
    node.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.45) };
    node.fills = [{ type: "SOLID", color: rgb4(color) }];
    node.textAutoResize = "WIDTH_AND_HEIGHT";
    node.textAlignHorizontal = align;
    node.x = x;
    node.y = y;
    return node;
  };
  var createRect = (x, y, width, height, radius, fill, stroke, strokeWeight = 1) => {
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
  var createCanvas = (name, width, height) => {
    const frame = figma.createFrame();
    frame.name = name;
    frame.resize(width, height);
    frame.layoutMode = "NONE";
    frame.cornerRadius = 24;
    frame.fills = [{ type: "SOLID", color: rgb4(COLORS.bg) }];
    frame.strokes = [];
    frame.clipsContent = false;
    return frame;
  };
  var createPanel = (title, x, y, width, height) => {
    const panel = createRect(x, y, width, height, 20, COLORS.panel, COLORS.line);
    panel.name = `${title} panel`;
    return panel;
  };
  var createButton = async (label, x, y, width, height, tone = "primary") => {
    const fill = tone === "primary" ? COLORS.primary : tone === "destructive" ? COLORS.danger : "#FFFFFF";
    const stroke = tone === "secondary" ? COLORS.line : fill;
    const textColor = tone === "secondary" ? COLORS.text : "#FFFFFF";
    const button = createRect(x, y, width, height, 14, fill, stroke);
    const text = await createText2(label, x + width / 2, y + 15, 15, textColor, "semibold", "CENTER");
    text.x = x + (width - text.width) / 2;
    return [button, text];
  };
  var createField = async (value, x, y, width, height, tone = "default", helperText) => {
    const stroke = tone === "error" ? COLORS.danger : tone === "success" ? COLORS.success : COLORS.line;
    const field = createRect(x, y, width, height, 12, "#FFFFFF", stroke);
    const text = await createText2(value, x + 16, y + 14, 15, value.startsWith("name@") || value.startsWith("\uAC80\uC0C9") ? COLORS.textMuted : COLORS.text);
    const nodes = [field, text];
    if (helperText) {
      nodes.push(await createText2(helperText, x, y + height + 10, 12, tone === "error" ? COLORS.danger : COLORS.textMuted));
    }
    return nodes;
  };
  var createChip = async (label, x, y, selected = false) => {
    const fill = selected ? "#EAF2FF" : "#FFFFFF";
    const stroke = selected ? COLORS.primary : COLORS.line;
    const chip = createRect(x, y, 88, 32, 16, fill, stroke);
    const labelNode = await createText2(label, x + 44, y + 9, 12, selected ? COLORS.primary : COLORS.textSecondary, "semibold", "CENTER");
    labelNode.x = x + (88 - labelNode.width) / 2;
    return [chip, labelNode];
  };
  var createListRow = async (title, subtitle, x, y, width) => {
    const row = createRect(x, y, width, 64, 16, "#FFFFFF", COLORS.line);
    const titleNode = await createText2(title, x + 24, y + 16, 15, COLORS.text, "semibold");
    const nodes = [row, titleNode];
    if (subtitle) {
      nodes.push(await createText2(subtitle, x + 24, y + 38, 13, COLORS.textMuted));
    }
    const chevron = await createText2(">", x + width - 28, y + 22, 16, COLORS.textMuted, "semibold");
    nodes.push(chevron);
    return nodes;
  };
  var renderCheckboxPreview = async () => {
    const frame = createCanvas("Checkbox Contract Preview", 920, 280);
    frame.appendChild(createPanel("Checkbox", 32, 32, 856, 216));
    frame.appendChild(await createText2("Checkbox", 50, 50, 13, COLORS.textSecondary, "semibold"));
    const rows = [
      [86, "\uC774\uBA54\uC77C \uC54C\uB9BC \uBC1B\uAE30", false, false],
      [132, "\uC8FC\uAC04 \uB9AC\uD3EC\uD2B8 \uAD6C\uB3C5", true, false],
      [178, "\uCC44\uC6A9 \uC18C\uC2DD \uBC1B\uAE30", false, true]
    ];
    for (const [y, label, checked, disabled] of rows) {
      const box = createRect(72, y, 22, 22, 6, checked ? COLORS.primary : "#FFFFFF", disabled ? COLORS.line : checked ? COLORS.primary : COLORS.line, 1.5);
      frame.appendChild(box);
      if (checked) {
        const mark = await createText2("\u2713", 78, y + 2, 13, "#FFFFFF", "semibold");
        frame.appendChild(mark);
      }
      frame.appendChild(await createText2(label, 108, y + 3, 14, disabled ? COLORS.textMuted : COLORS.text, "medium"));
    }
    return frame;
  };
  var renderTextPreview = async () => {
    const frame = createCanvas("Text Contract Preview", 920, 300);
    frame.appendChild(createPanel("Text", 32, 32, 856, 236));
    frame.appendChild(await createText2("Text", 50, 50, 13, COLORS.textSecondary, "semibold"));
    frame.appendChild(await createText2("\uD504\uB85C\uC81D\uD2B8 \uC81C\uBAA9", 72, 86, 24, COLORS.text, "semibold"));
    frame.appendChild(await createText2("\uC139\uC158 \uC81C\uBAA9", 72, 122, 18, COLORS.textSecondary, "semibold"));
    frame.appendChild(await createText2("\uBCF8\uBB38 \uD14D\uC2A4\uD2B8\uB294 \uC77D\uAE30 \uD750\uB984\uACFC \uC815\uBCF4 \uBC00\uB3C4\uB97C \uC720\uC9C0\uD574\uC57C \uD569\uB2C8\uB2E4.", 72, 160, 15, COLORS.textSecondary));
    frame.appendChild(await createText2("Helper text", 72, 192, 12, COLORS.textMuted));
    frame.appendChild(await createText2("Error message", 72, 220, 12, COLORS.danger, "medium"));
    return frame;
  };
  var renderIconPreview = async () => {
    const frame = createCanvas("Icon Contract Preview", 920, 280);
    frame.appendChild(createPanel("Icon", 32, 32, 856, 216));
    frame.appendChild(await createText2("Icon", 50, 50, 13, COLORS.textSecondary, "semibold"));
    const glyphs = [
      ["+", COLORS.primary],
      ["\u2192", COLORS.textSecondary],
      ["\u2713", COLORS.success],
      ["!", COLORS.danger]
    ];
    for (const [index, [glyph, color]] of glyphs.entries()) {
      const x = 72 + index * 120;
      frame.appendChild(createRect(x, 96, 72, 72, 18, "#FFFFFF", COLORS.line));
      const label = await createText2(glyph, x + 36, 117, 28, color, "semibold", "CENTER");
      label.x = x + (72 - label.width) / 2;
      frame.appendChild(label);
    }
    return frame;
  };
  var renderFormFieldPreview = async () => {
    const frame = createCanvas("FormField Contract Preview", 920, 320);
    frame.appendChild(createPanel("FormField", 32, 32, 856, 256));
    frame.appendChild(await createText2("FormField", 50, 50, 13, COLORS.textSecondary, "semibold"));
    frame.appendChild(await createText2("\uC774\uBA54\uC77C", 72, 88, 13, COLORS.textSecondary, "semibold"));
    for (const node of await createField("name@example.com", 72, 102, 320, 48)) frame.appendChild(node);
    frame.appendChild(await createText2("\uB85C\uADF8\uC778\uC5D0 \uC0AC\uC6A9\uD560 \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4.", 72, 172, 12, COLORS.textMuted));
    frame.appendChild(await createText2("\uBE44\uBC00\uBC88\uD638", 472, 88, 13, COLORS.textSecondary, "semibold"));
    for (const node of await createField("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 472, 102, 320, 48, "error", "\uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uD655\uC778\uD574 \uC8FC\uC138\uC694.")) frame.appendChild(node);
    return frame;
  };
  var renderSearchBarPreview = async () => {
    const frame = createCanvas("SearchBar Contract Preview", 920, 280);
    frame.appendChild(createPanel("SearchBar", 32, 32, 856, 216));
    frame.appendChild(await createText2("SearchBar", 50, 50, 13, COLORS.textSecondary, "semibold"));
    for (const node of await createField("\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694", 72, 86, 500, 48)) frame.appendChild(node);
    frame.appendChild(await createText2("\xD7", 546, 100, 16, COLORS.textMuted, "semibold"));
    for (const node of await createChip("\uC804\uCCB4", 72, 160, true)) frame.appendChild(node);
    for (const node of await createChip("\uCC44\uC6A9", 170, 160, false)) frame.appendChild(node);
    for (const node of await createChip("\uAE30\uC5C5", 268, 160, false)) frame.appendChild(node);
    return frame;
  };
  var renderListRowPreview = async () => {
    const frame = createCanvas("ListRow Contract Preview", 920, 300);
    frame.appendChild(createPanel("ListRow", 32, 32, 856, 236));
    frame.appendChild(await createText2("ListRow", 50, 50, 13, COLORS.textSecondary, "semibold"));
    for (const node of await createListRow("\uC54C\uB9BC \uC124\uC815", "\uD478\uC2DC \uC54C\uB9BC, \uC774\uBA54\uC77C \uC218\uC2E0 \uC5EC\uBD80", 72, 82, 760)) frame.appendChild(node);
    const second = createRect(72, 158, 760, 64, 16, "#FFFFFF", COLORS.line);
    frame.appendChild(second);
    frame.appendChild(await createText2("\uACC4\uC815 \uBCF4\uC548", 96, 180, 15, COLORS.text, "semibold"));
    const value = await createText2("2\uB2E8\uACC4 \uC778\uC99D", 744, 180, 13, COLORS.textSecondary, "medium", "RIGHT");
    value.x = 704;
    frame.appendChild(value);
    return frame;
  };
  var renderBottomActionGroupPreview = async () => {
    const frame = createCanvas("BottomActionGroup Contract Preview", 920, 260);
    const dock = createRect(0, 180, 920, 80, 0, "#FFFFFF", COLORS.line);
    frame.appendChild(dock);
    for (const node of await createButton("\uCDE8\uC18C", 32, 196, 168, 44, "secondary")) frame.appendChild(node);
    for (const node of await createButton("\uC800\uC7A5\uD558\uAE30", 216, 192, 672, 52, "primary")) frame.appendChild(node);
    return frame;
  };
  var renderFilterChipGroupPreview = async () => {
    const frame = createCanvas("FilterChipGroup Contract Preview", 920, 240);
    frame.appendChild(createPanel("FilterChipGroup", 32, 32, 856, 176));
    frame.appendChild(await createText2("FilterChipGroup", 50, 50, 13, COLORS.textSecondary, "semibold"));
    const chips = [
      ["\uC804\uCCB4", 72, true],
      ["\uC6D0\uACA9\uADFC\uBB34", 170, false],
      ["\uD504\uB860\uD2B8\uC5D4\uB4DC", 268, false],
      ["\uC2E0\uC785", 366, false],
      ["\uB9C8\uAC10\uC784\uBC15", 464, true]
    ];
    for (const [label, x, selected] of chips) {
      for (const node of await createChip(label, x, 92, selected)) frame.appendChild(node);
    }
    return frame;
  };
  var renderEmptyStateBlockPreview = async () => {
    const frame = createCanvas("EmptyStateBlock Contract Preview", 920, 360);
    frame.appendChild(createPanel("EmptyStateBlock", 32, 32, 856, 296));
    frame.appendChild(await createText2("EmptyStateBlock", 50, 50, 13, COLORS.textSecondary, "semibold"));
    frame.appendChild(createRect(408, 88, 104, 104, 28, COLORS.panel, COLORS.line));
    const glyph = await createText2("\u25A1", 454, 119, 34, COLORS.textMuted, "semibold", "CENTER");
    glyph.x = 408 + (104 - glyph.width) / 2;
    frame.appendChild(glyph);
    const title = await createText2("\uC870\uAC74\uC5D0 \uB9DE\uB294 \uACB0\uACFC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4", 0, 226, 18, COLORS.text, "semibold", "CENTER");
    title.x = 460 - title.width / 2;
    frame.appendChild(title);
    const desc = await createText2("\uD544\uD130\uB97C \uB2E4\uC2DC \uC870\uC815\uD558\uAC70\uB098 \uAC80\uC0C9\uC5B4\uB97C \uBCC0\uACBD\uD574 \uBCF4\uC138\uC694.", 0, 252, 13, COLORS.textMuted, "regular", "CENTER");
    desc.x = 460 - desc.width / 2;
    frame.appendChild(desc);
    for (const node of await createButton("\uD544\uD130 \uCD08\uAE30\uD654", 360, 272, 200, 44, "primary")) frame.appendChild(node);
    return frame;
  };
  var renderLoginFormPattern = async () => {
    const frame = createCanvas("Login Form Pattern Preview", 920, 640);
    frame.appendChild(createRect(270, 24, 380, 592, 28, "#FFFFFF", COLORS.line));
    frame.appendChild(await createText2("\uB85C\uADF8\uC778", 310, 82, 24, COLORS.text, "semibold"));
    frame.appendChild(await createText2("\uC774\uBA54\uC77C\uB85C \uACC4\uC18D \uC9C4\uD589\uD558\uC138\uC694", 310, 116, 14, COLORS.textMuted));
    frame.appendChild(await createText2("\uC774\uBA54\uC77C", 310, 166, 13, COLORS.textSecondary, "semibold"));
    for (const node of await createField("name@example.com", 310, 180, 300, 48)) frame.appendChild(node);
    frame.appendChild(await createText2("\uBE44\uBC00\uBC88\uD638", 310, 266, 13, COLORS.textSecondary, "semibold"));
    for (const node of await createField("\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 310, 280, 300, 48)) frame.appendChild(node);
    for (const node of await createButton("\uB85C\uADF8\uC778", 310, 500, 300, 52, "primary")) frame.appendChild(node);
    return frame;
  };
  var renderSearchResultPattern = async () => {
    const frame = createCanvas("Search Result Screen Pattern Preview", 920, 620);
    frame.appendChild(createRect(210, 24, 500, 572, 28, "#FFFFFF", COLORS.line));
    for (const node of await createField("\uD504\uB860\uD2B8\uC5D4\uB4DC", 242, 54, 436, 48)) frame.appendChild(node);
    for (const node of await createChip("\uC804\uCCB4", 242, 118, true)) frame.appendChild(node);
    for (const node of await createChip("\uACBD\uB825", 340, 118, false)) frame.appendChild(node);
    for (const node of await createChip("\uC6D0\uACA9", 438, 118, false)) frame.appendChild(node);
    for (const node of await createListRow("Miterlab", "\uD504\uB860\uD2B8\uC5D4\uB4DC \uC5D4\uC9C0\uB2C8\uC5B4", 242, 172, 436)) frame.appendChild(node);
    for (const node of await createListRow("Wanted", "\uBAA8\uBC14\uC77C \uC81C\uD488 \uB514\uC790\uC774\uB108", 242, 256, 436)) frame.appendChild(node);
    return frame;
  };
  var renderSettingsPattern = async () => {
    const frame = createCanvas("Settings Screen Pattern Preview", 920, 620);
    frame.appendChild(createRect(220, 24, 480, 572, 28, "#FFFFFF", COLORS.line));
    frame.appendChild(await createText2("\uC124\uC815", 256, 78, 22, COLORS.text, "semibold"));
    for (const node of await createListRow("\uC54C\uB9BC \uC124\uC815", null, 256, 116, 408)) frame.appendChild(node);
    for (const node of await createListRow("\uACC4\uC815 \uBCF4\uC548", null, 256, 192, 408)) frame.appendChild(node);
    for (const node of await createListRow("\uAC1C\uC778\uC815\uBCF4 \uAD00\uB9AC", null, 256, 268, 408)) frame.appendChild(node);
    return frame;
  };
  var renderProductDetailPattern = async () => {
    const frame = createCanvas("Product Detail with Sticky CTA Pattern Preview", 920, 660);
    frame.appendChild(createRect(210, 24, 500, 612, 28, "#FFFFFF", COLORS.line));
    frame.appendChild(createRect(242, 54, 436, 220, 20, COLORS.panel, COLORS.line));
    frame.appendChild(await createText2("\uC81C\uD488\uBA85", 242, 314, 22, COLORS.text, "semibold"));
    frame.appendChild(await createText2("\uD575\uC2EC \uC124\uBA85\uACFC \uAC00\uACA9 \uC815\uBCF4", 242, 344, 14, COLORS.textSecondary));
    frame.appendChild(createRect(230, 556, 460, 64, 20, "#FFFFFF", COLORS.line));
    for (const node of await createButton("\uBC14\uB85C \uC9C0\uC6D0\uD558\uAE30", 246, 562, 428, 52, "primary")) frame.appendChild(node);
    return frame;
  };
  var renderers = {
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
  var renderContractPreview = async (id) => {
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

  // ../../artifacts/figma/button-inspection/mcp-payload.json
  var mcp_payload_default = {
    document: {
      name: "button-inspection screen",
      screen: "button-inspection",
      theme: "core"
    },
    nodes: [
      {
        id: "layout_1",
        type: "FRAME",
        name: "Button inspection Screen",
        x: 0,
        y: 0,
        width: 1440,
        height: 1240,
        children: [
          {
            id: "layout_2",
            type: "FRAME",
            name: "preview-section",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_3",
                type: "FRAME",
                name: "preview-row-1",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_4",
                    type: "INSTANCE",
                    name: "Primary L4",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Primary L4"
                  },
                  {
                    id: "layout_5",
                    type: "INSTANCE",
                    name: "Primary L3",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "secondary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Primary L3"
                  },
                  {
                    id: "layout_6",
                    type: "INSTANCE",
                    name: "Assistive L2",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "secondary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Assistive L2"
                  },
                  {
                    id: "layout_7",
                    type: "INSTANCE",
                    name: "Assistive L1",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "tertiary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Assistive L1"
                  },
                  {
                    id: "layout_8",
                    type: "INSTANCE",
                    name: "Label Only",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Label Only"
                  },
                  {
                    id: "layout_9",
                    type: "INSTANCE",
                    name: "Icon + Label",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "secondary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Icon + Label"
                  },
                  {
                    id: "layout_10",
                    type: "INSTANCE",
                    name: "Icon Only",
                    x: 48,
                    y: 40,
                    width: 40,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "tertiary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Icon Only"
                  },
                  {
                    id: "layout_11",
                    type: "INSTANCE",
                    name: "Small",
                    x: 48,
                    y: 40,
                    width: 104,
                    height: 32,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 8,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 104
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "enabled",
                      size: "sm"
                    },
                    variables: {},
                    text: "Small"
                  },
                  {
                    id: "layout_12",
                    type: "INSTANCE",
                    name: "Medium",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Medium"
                  },
                  {
                    id: "layout_13",
                    type: "INSTANCE",
                    name: "Large",
                    x: 48,
                    y: 40,
                    width: 148,
                    height: 48,
                    component: "Button",
                    style: {
                      radius: 12,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 148
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "enabled",
                      size: "lg"
                    },
                    variables: {},
                    text: "Large"
                  }
                ]
              },
              {
                id: "layout_14",
                type: "FRAME",
                name: "preview-row-2",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_15",
                    type: "INSTANCE",
                    name: "Pressed",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "pressed",
                      size: "md"
                    },
                    variables: {},
                    text: "Pressed"
                  },
                  {
                    id: "layout_16",
                    type: "INSTANCE",
                    name: "Disabled",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "disabled",
                      size: "md",
                      disabled: true
                    },
                    variables: {},
                    text: "Disabled"
                  },
                  {
                    id: "layout_17",
                    type: "INSTANCE",
                    name: "Loading",
                    x: 48,
                    y: 40,
                    width: 116,
                    height: 40,
                    component: "Button",
                    style: {
                      radius: 10,
                      paddingX: 16,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 116
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "loading",
                      size: "md",
                      loading: true
                    },
                    variables: {},
                    text: "Loading"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "layout_2",
        type: "FRAME",
        name: "preview-section",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_3",
            type: "FRAME",
            name: "preview-row-1",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_4",
                type: "INSTANCE",
                name: "Primary L4",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Primary L4"
              },
              {
                id: "layout_5",
                type: "INSTANCE",
                name: "Primary L3",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "secondary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Primary L3"
              },
              {
                id: "layout_6",
                type: "INSTANCE",
                name: "Assistive L2",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "secondary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Assistive L2"
              },
              {
                id: "layout_7",
                type: "INSTANCE",
                name: "Assistive L1",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "tertiary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Assistive L1"
              },
              {
                id: "layout_8",
                type: "INSTANCE",
                name: "Label Only",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Label Only"
              },
              {
                id: "layout_9",
                type: "INSTANCE",
                name: "Icon + Label",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "secondary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Icon + Label"
              },
              {
                id: "layout_10",
                type: "INSTANCE",
                name: "Icon Only",
                x: 48,
                y: 40,
                width: 40,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "tertiary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Icon Only"
              },
              {
                id: "layout_11",
                type: "INSTANCE",
                name: "Small",
                x: 48,
                y: 40,
                width: 104,
                height: 32,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 8,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 104
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "enabled",
                  size: "sm"
                },
                variables: {},
                text: "Small"
              },
              {
                id: "layout_12",
                type: "INSTANCE",
                name: "Medium",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Medium"
              },
              {
                id: "layout_13",
                type: "INSTANCE",
                name: "Large",
                x: 48,
                y: 40,
                width: 148,
                height: 48,
                component: "Button",
                style: {
                  radius: 12,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 148
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "enabled",
                  size: "lg"
                },
                variables: {},
                text: "Large"
              }
            ]
          },
          {
            id: "layout_14",
            type: "FRAME",
            name: "preview-row-2",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_15",
                type: "INSTANCE",
                name: "Pressed",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "pressed",
                  size: "md"
                },
                variables: {},
                text: "Pressed"
              },
              {
                id: "layout_16",
                type: "INSTANCE",
                name: "Disabled",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "disabled",
                  size: "md",
                  disabled: true
                },
                variables: {},
                text: "Disabled"
              },
              {
                id: "layout_17",
                type: "INSTANCE",
                name: "Loading",
                x: 48,
                y: 40,
                width: 116,
                height: 40,
                component: "Button",
                style: {
                  radius: 10,
                  paddingX: 16,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 116
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "loading",
                  size: "md",
                  loading: true
                },
                variables: {},
                text: "Loading"
              }
            ]
          }
        ]
      },
      {
        id: "layout_3",
        type: "FRAME",
        name: "preview-row-1",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_4",
            type: "INSTANCE",
            name: "Primary L4",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Primary L4"
          },
          {
            id: "layout_5",
            type: "INSTANCE",
            name: "Primary L3",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "secondary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Primary L3"
          },
          {
            id: "layout_6",
            type: "INSTANCE",
            name: "Assistive L2",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "secondary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Assistive L2"
          },
          {
            id: "layout_7",
            type: "INSTANCE",
            name: "Assistive L1",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "tertiary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Assistive L1"
          },
          {
            id: "layout_8",
            type: "INSTANCE",
            name: "Label Only",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Label Only"
          },
          {
            id: "layout_9",
            type: "INSTANCE",
            name: "Icon + Label",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "secondary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Icon + Label"
          },
          {
            id: "layout_10",
            type: "INSTANCE",
            name: "Icon Only",
            x: 48,
            y: 40,
            width: 40,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "tertiary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Icon Only"
          },
          {
            id: "layout_11",
            type: "INSTANCE",
            name: "Small",
            x: 48,
            y: 40,
            width: 104,
            height: 32,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 8,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 104
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "enabled",
              size: "sm"
            },
            variables: {},
            text: "Small"
          },
          {
            id: "layout_12",
            type: "INSTANCE",
            name: "Medium",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Medium"
          },
          {
            id: "layout_13",
            type: "INSTANCE",
            name: "Large",
            x: 48,
            y: 40,
            width: 148,
            height: 48,
            component: "Button",
            style: {
              radius: 12,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 148
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "enabled",
              size: "lg"
            },
            variables: {},
            text: "Large"
          }
        ]
      },
      {
        id: "layout_4",
        type: "INSTANCE",
        name: "Primary L4",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Primary L4"
      },
      {
        id: "layout_5",
        type: "INSTANCE",
        name: "Primary L3",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Primary L3"
      },
      {
        id: "layout_6",
        type: "INSTANCE",
        name: "Assistive L2",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Assistive L2"
      },
      {
        id: "layout_7",
        type: "INSTANCE",
        name: "Assistive L1",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "tertiary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Assistive L1"
      },
      {
        id: "layout_8",
        type: "INSTANCE",
        name: "Label Only",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Label Only"
      },
      {
        id: "layout_9",
        type: "INSTANCE",
        name: "Icon + Label",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Icon + Label"
      },
      {
        id: "layout_10",
        type: "INSTANCE",
        name: "Icon Only",
        x: 48,
        y: 40,
        width: 40,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "tertiary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Icon Only"
      },
      {
        id: "layout_11",
        type: "INSTANCE",
        name: "Small",
        x: 48,
        y: 40,
        width: 104,
        height: 32,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 8,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 104
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "sm"
        },
        variables: {},
        text: "Small"
      },
      {
        id: "layout_12",
        type: "INSTANCE",
        name: "Medium",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Medium"
      },
      {
        id: "layout_13",
        type: "INSTANCE",
        name: "Large",
        x: 48,
        y: 40,
        width: 148,
        height: 48,
        component: "Button",
        style: {
          radius: 12,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 148
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "lg"
        },
        variables: {},
        text: "Large"
      },
      {
        id: "layout_14",
        type: "FRAME",
        name: "preview-row-2",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_15",
            type: "INSTANCE",
            name: "Pressed",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "pressed",
              size: "md"
            },
            variables: {},
            text: "Pressed"
          },
          {
            id: "layout_16",
            type: "INSTANCE",
            name: "Disabled",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "disabled",
              size: "md",
              disabled: true
            },
            variables: {},
            text: "Disabled"
          },
          {
            id: "layout_17",
            type: "INSTANCE",
            name: "Loading",
            x: 48,
            y: 40,
            width: 116,
            height: 40,
            component: "Button",
            style: {
              radius: 10,
              paddingX: 16,
              paddingY: 10,
              gap: 8,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 116
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "loading",
              size: "md",
              loading: true
            },
            variables: {},
            text: "Loading"
          }
        ]
      },
      {
        id: "layout_15",
        type: "INSTANCE",
        name: "Pressed",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "pressed",
          size: "md"
        },
        variables: {},
        text: "Pressed"
      },
      {
        id: "layout_16",
        type: "INSTANCE",
        name: "Disabled",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "disabled",
          size: "md",
          disabled: true
        },
        variables: {},
        text: "Disabled"
      },
      {
        id: "layout_17",
        type: "INSTANCE",
        name: "Loading",
        x: 48,
        y: 40,
        width: 116,
        height: 40,
        component: "Button",
        style: {
          radius: 10,
          paddingX: 16,
          paddingY: 10,
          gap: 8,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 116
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "loading",
          size: "md",
          loading: true
        },
        variables: {},
        text: "Loading"
      }
    ],
    frames: [
      {
        id: "layout_1",
        name: "Button inspection Screen"
      },
      {
        id: "layout_2",
        name: "preview-section"
      },
      {
        id: "layout_3",
        name: "preview-row-1"
      },
      {
        id: "layout_14",
        name: "preview-row-2"
      }
    ],
    components: [
      {
        id: "layout_4",
        name: "Primary L4",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_5",
        name: "Primary L3",
        component: "Button",
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_6",
        name: "Assistive L2",
        component: "Button",
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_7",
        name: "Assistive L1",
        component: "Button",
        variant: {
          emphasis: "tertiary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_8",
        name: "Label Only",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_9",
        name: "Icon + Label",
        component: "Button",
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_10",
        name: "Icon Only",
        component: "Button",
        variant: {
          emphasis: "tertiary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_11",
        name: "Small",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "sm"
        }
      },
      {
        id: "layout_12",
        name: "Medium",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_13",
        name: "Large",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "lg"
        }
      },
      {
        id: "layout_15",
        name: "Pressed",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "pressed",
          size: "md"
        }
      },
      {
        id: "layout_16",
        name: "Disabled",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "disabled",
          size: "md",
          disabled: true
        }
      },
      {
        id: "layout_17",
        name: "Loading",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "loading",
          size: "md",
          loading: true
        }
      }
    ],
    variables: {},
    styles: {
      "layout_4.radius": "10",
      "layout_4.paddingX": "16",
      "layout_4.paddingY": "10",
      "layout_4.gap": "8",
      "layout_4.fontSize": "14",
      "layout_4.lineHeight": "20",
      "layout_4.fontWeight": "semibold",
      "layout_4.minWidth": "116",
      "layout_5.radius": "10",
      "layout_5.paddingX": "16",
      "layout_5.paddingY": "10",
      "layout_5.gap": "8",
      "layout_5.fontSize": "14",
      "layout_5.lineHeight": "20",
      "layout_5.fontWeight": "semibold",
      "layout_5.minWidth": "116",
      "layout_6.radius": "10",
      "layout_6.paddingX": "16",
      "layout_6.paddingY": "10",
      "layout_6.gap": "8",
      "layout_6.fontSize": "14",
      "layout_6.lineHeight": "20",
      "layout_6.fontWeight": "semibold",
      "layout_6.minWidth": "116",
      "layout_7.radius": "10",
      "layout_7.paddingX": "16",
      "layout_7.paddingY": "10",
      "layout_7.gap": "8",
      "layout_7.fontSize": "14",
      "layout_7.lineHeight": "20",
      "layout_7.fontWeight": "semibold",
      "layout_7.minWidth": "116",
      "layout_8.radius": "10",
      "layout_8.paddingX": "16",
      "layout_8.paddingY": "10",
      "layout_8.gap": "8",
      "layout_8.fontSize": "14",
      "layout_8.lineHeight": "20",
      "layout_8.fontWeight": "semibold",
      "layout_8.minWidth": "116",
      "layout_9.radius": "10",
      "layout_9.paddingX": "16",
      "layout_9.paddingY": "10",
      "layout_9.gap": "8",
      "layout_9.fontSize": "14",
      "layout_9.lineHeight": "20",
      "layout_9.fontWeight": "semibold",
      "layout_9.minWidth": "116",
      "layout_10.radius": "10",
      "layout_10.paddingX": "16",
      "layout_10.paddingY": "10",
      "layout_10.gap": "8",
      "layout_10.fontSize": "14",
      "layout_10.lineHeight": "20",
      "layout_10.fontWeight": "semibold",
      "layout_10.minWidth": "116",
      "layout_11.radius": "10",
      "layout_11.paddingX": "14",
      "layout_11.paddingY": "8",
      "layout_11.gap": "8",
      "layout_11.fontSize": "14",
      "layout_11.lineHeight": "20",
      "layout_11.fontWeight": "semibold",
      "layout_11.minWidth": "104",
      "layout_12.radius": "10",
      "layout_12.paddingX": "16",
      "layout_12.paddingY": "10",
      "layout_12.gap": "8",
      "layout_12.fontSize": "14",
      "layout_12.lineHeight": "20",
      "layout_12.fontWeight": "semibold",
      "layout_12.minWidth": "116",
      "layout_13.radius": "12",
      "layout_13.paddingX": "18",
      "layout_13.paddingY": "13",
      "layout_13.gap": "8",
      "layout_13.fontSize": "16",
      "layout_13.lineHeight": "22",
      "layout_13.fontWeight": "semibold",
      "layout_13.minWidth": "148",
      "layout_15.radius": "10",
      "layout_15.paddingX": "16",
      "layout_15.paddingY": "10",
      "layout_15.gap": "8",
      "layout_15.fontSize": "14",
      "layout_15.lineHeight": "20",
      "layout_15.fontWeight": "semibold",
      "layout_15.minWidth": "116",
      "layout_16.radius": "10",
      "layout_16.paddingX": "16",
      "layout_16.paddingY": "10",
      "layout_16.gap": "8",
      "layout_16.fontSize": "14",
      "layout_16.lineHeight": "20",
      "layout_16.fontWeight": "semibold",
      "layout_16.minWidth": "116",
      "layout_17.radius": "10",
      "layout_17.paddingX": "16",
      "layout_17.paddingY": "10",
      "layout_17.gap": "8",
      "layout_17.fontSize": "14",
      "layout_17.lineHeight": "20",
      "layout_17.fontWeight": "semibold",
      "layout_17.minWidth": "116"
    },
    modes: {
      brand: "core",
      theme: "core"
    },
    metadata: {
      source: "miterlab-figma-generator",
      version: "0.1.0",
      generatedAt: "2026-03-19T09:01:18.992Z"
    }
  };

  // ../../artifacts/figma/input-inspection/mcp-payload.json
  var mcp_payload_default2 = {
    document: {
      name: "input-inspection screen",
      screen: "input-inspection",
      theme: "core"
    },
    nodes: [
      {
        id: "layout_1",
        type: "FRAME",
        name: "Input inspection Screen",
        x: 0,
        y: 0,
        width: 1440,
        height: 1240,
        children: [
          {
            id: "layout_2",
            type: "FRAME",
            name: "preview-section",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_3",
                type: "FRAME",
                name: "preview-row-1",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_4",
                    type: "INSTANCE",
                    name: "Default",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "enabled",
                      size: "md",
                      placeholder: "Type here"
                    },
                    variables: {}
                  },
                  {
                    id: "layout_5",
                    type: "INSTANCE",
                    name: "Error",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "error",
                      width: "full",
                      state: "focused",
                      size: "md",
                      value: "Wrong value"
                    },
                    variables: {},
                    text: "Wrong value"
                  },
                  {
                    id: "layout_6",
                    type: "INSTANCE",
                    name: "Success",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "success",
                      width: "full",
                      state: "enabled",
                      size: "md",
                      value: "Correct value"
                    },
                    variables: {},
                    text: "Correct value"
                  }
                ]
              },
              {
                id: "layout_7",
                type: "FRAME",
                name: "preview-row-2",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_8",
                    type: "INSTANCE",
                    name: "Small",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 32,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 12,
                      paddingY: 8,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "enabled",
                      size: "sm",
                      placeholder: "Small input"
                    },
                    variables: {}
                  },
                  {
                    id: "layout_9",
                    type: "INSTANCE",
                    name: "Medium",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "enabled",
                      size: "md",
                      placeholder: "Medium input"
                    },
                    variables: {}
                  },
                  {
                    id: "layout_10",
                    type: "INSTANCE",
                    name: "Large",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 12,
                      paddingX: 16,
                      paddingY: 13,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "enabled",
                      size: "lg",
                      placeholder: "Large input"
                    },
                    variables: {}
                  }
                ]
              },
              {
                id: "layout_11",
                type: "FRAME",
                name: "preview-row-3",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_12",
                    type: "INSTANCE",
                    name: "Focused",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "focused",
                      size: "md",
                      value: "Focused value"
                    },
                    variables: {},
                    text: "Focused value"
                  },
                  {
                    id: "layout_13",
                    type: "INSTANCE",
                    name: "Disabled",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "disabled",
                      size: "md",
                      disabled: true,
                      value: "Disabled value"
                    },
                    variables: {},
                    text: "Disabled value"
                  },
                  {
                    id: "layout_14",
                    type: "INSTANCE",
                    name: "Read Only",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "readonly",
                      size: "md",
                      readOnly: true,
                      value: "Read only value"
                    },
                    variables: {},
                    text: "Read only value"
                  }
                ]
              },
              {
                id: "layout_15",
                type: "FRAME",
                name: "preview-row-4",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_16",
                    type: "INSTANCE",
                    name: "Loading",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "loading",
                      size: "md",
                      value: "Loading value"
                    },
                    variables: {},
                    text: "Loading value"
                  },
                  {
                    id: "layout_17",
                    type: "INSTANCE",
                    name: "Hug Width",
                    x: 48,
                    y: 40,
                    width: 220,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "hug",
                      state: "enabled",
                      size: "md",
                      placeholder: "Short"
                    },
                    variables: {}
                  },
                  {
                    id: "layout_18",
                    type: "INSTANCE",
                    name: "Full Width",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "enabled",
                      size: "md",
                      placeholder: "Full width field"
                    },
                    variables: {}
                  }
                ]
              },
              {
                id: "layout_19",
                type: "FRAME",
                name: "preview-row-5",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_20",
                    type: "INSTANCE",
                    name: "With Helper",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "enabled",
                      size: "md",
                      placeholder: "Email address"
                    },
                    variables: {}
                  },
                  {
                    id: "layout_21",
                    type: "INSTANCE",
                    name: "With Error Text",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "error",
                      width: "full",
                      state: "focused",
                      size: "md",
                      value: "wrong@email"
                    },
                    variables: {},
                    text: "wrong@email"
                  },
                  {
                    id: "layout_22",
                    type: "INSTANCE",
                    name: "Multiline",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 108,
                    component: "Input",
                    style: {
                      radius: 12,
                      paddingX: 16,
                      paddingY: 13,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "enabled",
                      size: "lg",
                      placeholder: "Type a longer message"
                    },
                    variables: {}
                  }
                ]
              },
              {
                id: "layout_23",
                type: "FRAME",
                name: "preview-row-6",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_24",
                    type: "INSTANCE",
                    name: "Readonly Field",
                    x: 48,
                    y: 40,
                    width: 360,
                    height: 40,
                    component: "Input",
                    style: {
                      radius: 10,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 0,
                      fontSize: 14,
                      lineHeight: 20,
                      fontWeight: "regular",
                      minWidth: 220
                    },
                    variant: {
                      intent: "default",
                      width: "full",
                      state: "readonly",
                      size: "md",
                      readOnly: true,
                      value: "Generated project slug"
                    },
                    variables: {},
                    text: "Generated project slug"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "layout_2",
        type: "FRAME",
        name: "preview-section",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_3",
            type: "FRAME",
            name: "preview-row-1",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_4",
                type: "INSTANCE",
                name: "Default",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "enabled",
                  size: "md",
                  placeholder: "Type here"
                },
                variables: {}
              },
              {
                id: "layout_5",
                type: "INSTANCE",
                name: "Error",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "error",
                  width: "full",
                  state: "focused",
                  size: "md",
                  value: "Wrong value"
                },
                variables: {},
                text: "Wrong value"
              },
              {
                id: "layout_6",
                type: "INSTANCE",
                name: "Success",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "success",
                  width: "full",
                  state: "enabled",
                  size: "md",
                  value: "Correct value"
                },
                variables: {},
                text: "Correct value"
              }
            ]
          },
          {
            id: "layout_7",
            type: "FRAME",
            name: "preview-row-2",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_8",
                type: "INSTANCE",
                name: "Small",
                x: 48,
                y: 40,
                width: 360,
                height: 32,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 12,
                  paddingY: 8,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "enabled",
                  size: "sm",
                  placeholder: "Small input"
                },
                variables: {}
              },
              {
                id: "layout_9",
                type: "INSTANCE",
                name: "Medium",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "enabled",
                  size: "md",
                  placeholder: "Medium input"
                },
                variables: {}
              },
              {
                id: "layout_10",
                type: "INSTANCE",
                name: "Large",
                x: 48,
                y: 40,
                width: 360,
                height: 48,
                component: "Input",
                style: {
                  radius: 12,
                  paddingX: 16,
                  paddingY: 13,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "enabled",
                  size: "lg",
                  placeholder: "Large input"
                },
                variables: {}
              }
            ]
          },
          {
            id: "layout_11",
            type: "FRAME",
            name: "preview-row-3",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_12",
                type: "INSTANCE",
                name: "Focused",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "focused",
                  size: "md",
                  value: "Focused value"
                },
                variables: {},
                text: "Focused value"
              },
              {
                id: "layout_13",
                type: "INSTANCE",
                name: "Disabled",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "disabled",
                  size: "md",
                  disabled: true,
                  value: "Disabled value"
                },
                variables: {},
                text: "Disabled value"
              },
              {
                id: "layout_14",
                type: "INSTANCE",
                name: "Read Only",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "readonly",
                  size: "md",
                  readOnly: true,
                  value: "Read only value"
                },
                variables: {},
                text: "Read only value"
              }
            ]
          },
          {
            id: "layout_15",
            type: "FRAME",
            name: "preview-row-4",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_16",
                type: "INSTANCE",
                name: "Loading",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "loading",
                  size: "md",
                  value: "Loading value"
                },
                variables: {},
                text: "Loading value"
              },
              {
                id: "layout_17",
                type: "INSTANCE",
                name: "Hug Width",
                x: 48,
                y: 40,
                width: 220,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "hug",
                  state: "enabled",
                  size: "md",
                  placeholder: "Short"
                },
                variables: {}
              },
              {
                id: "layout_18",
                type: "INSTANCE",
                name: "Full Width",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "enabled",
                  size: "md",
                  placeholder: "Full width field"
                },
                variables: {}
              }
            ]
          },
          {
            id: "layout_19",
            type: "FRAME",
            name: "preview-row-5",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_20",
                type: "INSTANCE",
                name: "With Helper",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "enabled",
                  size: "md",
                  placeholder: "Email address"
                },
                variables: {}
              },
              {
                id: "layout_21",
                type: "INSTANCE",
                name: "With Error Text",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "error",
                  width: "full",
                  state: "focused",
                  size: "md",
                  value: "wrong@email"
                },
                variables: {},
                text: "wrong@email"
              },
              {
                id: "layout_22",
                type: "INSTANCE",
                name: "Multiline",
                x: 48,
                y: 40,
                width: 360,
                height: 108,
                component: "Input",
                style: {
                  radius: 12,
                  paddingX: 16,
                  paddingY: 13,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "enabled",
                  size: "lg",
                  placeholder: "Type a longer message"
                },
                variables: {}
              }
            ]
          },
          {
            id: "layout_23",
            type: "FRAME",
            name: "preview-row-6",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_24",
                type: "INSTANCE",
                name: "Readonly Field",
                x: 48,
                y: 40,
                width: 360,
                height: 40,
                component: "Input",
                style: {
                  radius: 10,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 0,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  intent: "default",
                  width: "full",
                  state: "readonly",
                  size: "md",
                  readOnly: true,
                  value: "Generated project slug"
                },
                variables: {},
                text: "Generated project slug"
              }
            ]
          }
        ]
      },
      {
        id: "layout_3",
        type: "FRAME",
        name: "preview-row-1",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_4",
            type: "INSTANCE",
            name: "Default",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "enabled",
              size: "md",
              placeholder: "Type here"
            },
            variables: {}
          },
          {
            id: "layout_5",
            type: "INSTANCE",
            name: "Error",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "error",
              width: "full",
              state: "focused",
              size: "md",
              value: "Wrong value"
            },
            variables: {},
            text: "Wrong value"
          },
          {
            id: "layout_6",
            type: "INSTANCE",
            name: "Success",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "success",
              width: "full",
              state: "enabled",
              size: "md",
              value: "Correct value"
            },
            variables: {},
            text: "Correct value"
          }
        ]
      },
      {
        id: "layout_4",
        type: "INSTANCE",
        name: "Default",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Type here"
        },
        variables: {}
      },
      {
        id: "layout_5",
        type: "INSTANCE",
        name: "Error",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "error",
          width: "full",
          state: "focused",
          size: "md",
          value: "Wrong value"
        },
        variables: {},
        text: "Wrong value"
      },
      {
        id: "layout_6",
        type: "INSTANCE",
        name: "Success",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "success",
          width: "full",
          state: "enabled",
          size: "md",
          value: "Correct value"
        },
        variables: {},
        text: "Correct value"
      },
      {
        id: "layout_7",
        type: "FRAME",
        name: "preview-row-2",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_8",
            type: "INSTANCE",
            name: "Small",
            x: 48,
            y: 40,
            width: 360,
            height: 32,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 12,
              paddingY: 8,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "enabled",
              size: "sm",
              placeholder: "Small input"
            },
            variables: {}
          },
          {
            id: "layout_9",
            type: "INSTANCE",
            name: "Medium",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "enabled",
              size: "md",
              placeholder: "Medium input"
            },
            variables: {}
          },
          {
            id: "layout_10",
            type: "INSTANCE",
            name: "Large",
            x: 48,
            y: 40,
            width: 360,
            height: 48,
            component: "Input",
            style: {
              radius: 12,
              paddingX: 16,
              paddingY: 13,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "enabled",
              size: "lg",
              placeholder: "Large input"
            },
            variables: {}
          }
        ]
      },
      {
        id: "layout_8",
        type: "INSTANCE",
        name: "Small",
        x: 48,
        y: 40,
        width: 360,
        height: 32,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 12,
          paddingY: 8,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "sm",
          placeholder: "Small input"
        },
        variables: {}
      },
      {
        id: "layout_9",
        type: "INSTANCE",
        name: "Medium",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Medium input"
        },
        variables: {}
      },
      {
        id: "layout_10",
        type: "INSTANCE",
        name: "Large",
        x: 48,
        y: 40,
        width: 360,
        height: 48,
        component: "Input",
        style: {
          radius: 12,
          paddingX: 16,
          paddingY: 13,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "lg",
          placeholder: "Large input"
        },
        variables: {}
      },
      {
        id: "layout_11",
        type: "FRAME",
        name: "preview-row-3",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_12",
            type: "INSTANCE",
            name: "Focused",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "focused",
              size: "md",
              value: "Focused value"
            },
            variables: {},
            text: "Focused value"
          },
          {
            id: "layout_13",
            type: "INSTANCE",
            name: "Disabled",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "disabled",
              size: "md",
              disabled: true,
              value: "Disabled value"
            },
            variables: {},
            text: "Disabled value"
          },
          {
            id: "layout_14",
            type: "INSTANCE",
            name: "Read Only",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "readonly",
              size: "md",
              readOnly: true,
              value: "Read only value"
            },
            variables: {},
            text: "Read only value"
          }
        ]
      },
      {
        id: "layout_12",
        type: "INSTANCE",
        name: "Focused",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "focused",
          size: "md",
          value: "Focused value"
        },
        variables: {},
        text: "Focused value"
      },
      {
        id: "layout_13",
        type: "INSTANCE",
        name: "Disabled",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "disabled",
          size: "md",
          disabled: true,
          value: "Disabled value"
        },
        variables: {},
        text: "Disabled value"
      },
      {
        id: "layout_14",
        type: "INSTANCE",
        name: "Read Only",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "readonly",
          size: "md",
          readOnly: true,
          value: "Read only value"
        },
        variables: {},
        text: "Read only value"
      },
      {
        id: "layout_15",
        type: "FRAME",
        name: "preview-row-4",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_16",
            type: "INSTANCE",
            name: "Loading",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "loading",
              size: "md",
              value: "Loading value"
            },
            variables: {},
            text: "Loading value"
          },
          {
            id: "layout_17",
            type: "INSTANCE",
            name: "Hug Width",
            x: 48,
            y: 40,
            width: 220,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "hug",
              state: "enabled",
              size: "md",
              placeholder: "Short"
            },
            variables: {}
          },
          {
            id: "layout_18",
            type: "INSTANCE",
            name: "Full Width",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "enabled",
              size: "md",
              placeholder: "Full width field"
            },
            variables: {}
          }
        ]
      },
      {
        id: "layout_16",
        type: "INSTANCE",
        name: "Loading",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "loading",
          size: "md",
          value: "Loading value"
        },
        variables: {},
        text: "Loading value"
      },
      {
        id: "layout_17",
        type: "INSTANCE",
        name: "Hug Width",
        x: 48,
        y: 40,
        width: 220,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "hug",
          state: "enabled",
          size: "md",
          placeholder: "Short"
        },
        variables: {}
      },
      {
        id: "layout_18",
        type: "INSTANCE",
        name: "Full Width",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Full width field"
        },
        variables: {}
      },
      {
        id: "layout_19",
        type: "FRAME",
        name: "preview-row-5",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_20",
            type: "INSTANCE",
            name: "With Helper",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "enabled",
              size: "md",
              placeholder: "Email address"
            },
            variables: {}
          },
          {
            id: "layout_21",
            type: "INSTANCE",
            name: "With Error Text",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "error",
              width: "full",
              state: "focused",
              size: "md",
              value: "wrong@email"
            },
            variables: {},
            text: "wrong@email"
          },
          {
            id: "layout_22",
            type: "INSTANCE",
            name: "Multiline",
            x: 48,
            y: 40,
            width: 360,
            height: 108,
            component: "Input",
            style: {
              radius: 12,
              paddingX: 16,
              paddingY: 13,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "enabled",
              size: "lg",
              placeholder: "Type a longer message"
            },
            variables: {}
          }
        ]
      },
      {
        id: "layout_20",
        type: "INSTANCE",
        name: "With Helper",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Email address"
        },
        variables: {}
      },
      {
        id: "layout_21",
        type: "INSTANCE",
        name: "With Error Text",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "error",
          width: "full",
          state: "focused",
          size: "md",
          value: "wrong@email"
        },
        variables: {},
        text: "wrong@email"
      },
      {
        id: "layout_22",
        type: "INSTANCE",
        name: "Multiline",
        x: 48,
        y: 40,
        width: 360,
        height: 108,
        component: "Input",
        style: {
          radius: 12,
          paddingX: 16,
          paddingY: 13,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "lg",
          placeholder: "Type a longer message"
        },
        variables: {}
      },
      {
        id: "layout_23",
        type: "FRAME",
        name: "preview-row-6",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_24",
            type: "INSTANCE",
            name: "Readonly Field",
            x: 48,
            y: 40,
            width: 360,
            height: 40,
            component: "Input",
            style: {
              radius: 10,
              paddingX: 14,
              paddingY: 10,
              gap: 0,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              intent: "default",
              width: "full",
              state: "readonly",
              size: "md",
              readOnly: true,
              value: "Generated project slug"
            },
            variables: {},
            text: "Generated project slug"
          }
        ]
      },
      {
        id: "layout_24",
        type: "INSTANCE",
        name: "Readonly Field",
        x: 48,
        y: 40,
        width: 360,
        height: 40,
        component: "Input",
        style: {
          radius: 10,
          paddingX: 14,
          paddingY: 10,
          gap: 0,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          intent: "default",
          width: "full",
          state: "readonly",
          size: "md",
          readOnly: true,
          value: "Generated project slug"
        },
        variables: {},
        text: "Generated project slug"
      }
    ],
    frames: [
      {
        id: "layout_1",
        name: "Input inspection Screen"
      },
      {
        id: "layout_2",
        name: "preview-section"
      },
      {
        id: "layout_3",
        name: "preview-row-1"
      },
      {
        id: "layout_7",
        name: "preview-row-2"
      },
      {
        id: "layout_11",
        name: "preview-row-3"
      },
      {
        id: "layout_15",
        name: "preview-row-4"
      },
      {
        id: "layout_19",
        name: "preview-row-5"
      },
      {
        id: "layout_23",
        name: "preview-row-6"
      }
    ],
    components: [
      {
        id: "layout_4",
        name: "Default",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Type here"
        }
      },
      {
        id: "layout_5",
        name: "Error",
        component: "Input",
        variant: {
          intent: "error",
          width: "full",
          state: "focused",
          size: "md",
          value: "Wrong value"
        }
      },
      {
        id: "layout_6",
        name: "Success",
        component: "Input",
        variant: {
          intent: "success",
          width: "full",
          state: "enabled",
          size: "md",
          value: "Correct value"
        }
      },
      {
        id: "layout_8",
        name: "Small",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "sm",
          placeholder: "Small input"
        }
      },
      {
        id: "layout_9",
        name: "Medium",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Medium input"
        }
      },
      {
        id: "layout_10",
        name: "Large",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "lg",
          placeholder: "Large input"
        }
      },
      {
        id: "layout_12",
        name: "Focused",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "focused",
          size: "md",
          value: "Focused value"
        }
      },
      {
        id: "layout_13",
        name: "Disabled",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "disabled",
          size: "md",
          disabled: true,
          value: "Disabled value"
        }
      },
      {
        id: "layout_14",
        name: "Read Only",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "readonly",
          size: "md",
          readOnly: true,
          value: "Read only value"
        }
      },
      {
        id: "layout_16",
        name: "Loading",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "loading",
          size: "md",
          value: "Loading value"
        }
      },
      {
        id: "layout_17",
        name: "Hug Width",
        component: "Input",
        variant: {
          intent: "default",
          width: "hug",
          state: "enabled",
          size: "md",
          placeholder: "Short"
        }
      },
      {
        id: "layout_18",
        name: "Full Width",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Full width field"
        }
      },
      {
        id: "layout_20",
        name: "With Helper",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "md",
          placeholder: "Email address"
        }
      },
      {
        id: "layout_21",
        name: "With Error Text",
        component: "Input",
        variant: {
          intent: "error",
          width: "full",
          state: "focused",
          size: "md",
          value: "wrong@email"
        }
      },
      {
        id: "layout_22",
        name: "Multiline",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "enabled",
          size: "lg",
          placeholder: "Type a longer message"
        }
      },
      {
        id: "layout_24",
        name: "Readonly Field",
        component: "Input",
        variant: {
          intent: "default",
          width: "full",
          state: "readonly",
          size: "md",
          readOnly: true,
          value: "Generated project slug"
        }
      }
    ],
    variables: {},
    styles: {
      "layout_4.radius": "10",
      "layout_4.paddingX": "14",
      "layout_4.paddingY": "10",
      "layout_4.gap": "0",
      "layout_4.fontSize": "14",
      "layout_4.lineHeight": "20",
      "layout_4.fontWeight": "regular",
      "layout_4.minWidth": "220",
      "layout_5.radius": "10",
      "layout_5.paddingX": "14",
      "layout_5.paddingY": "10",
      "layout_5.gap": "0",
      "layout_5.fontSize": "14",
      "layout_5.lineHeight": "20",
      "layout_5.fontWeight": "regular",
      "layout_5.minWidth": "220",
      "layout_6.radius": "10",
      "layout_6.paddingX": "14",
      "layout_6.paddingY": "10",
      "layout_6.gap": "0",
      "layout_6.fontSize": "14",
      "layout_6.lineHeight": "20",
      "layout_6.fontWeight": "regular",
      "layout_6.minWidth": "220",
      "layout_8.radius": "10",
      "layout_8.paddingX": "12",
      "layout_8.paddingY": "8",
      "layout_8.gap": "0",
      "layout_8.fontSize": "14",
      "layout_8.lineHeight": "20",
      "layout_8.fontWeight": "regular",
      "layout_8.minWidth": "220",
      "layout_9.radius": "10",
      "layout_9.paddingX": "14",
      "layout_9.paddingY": "10",
      "layout_9.gap": "0",
      "layout_9.fontSize": "14",
      "layout_9.lineHeight": "20",
      "layout_9.fontWeight": "regular",
      "layout_9.minWidth": "220",
      "layout_10.radius": "12",
      "layout_10.paddingX": "16",
      "layout_10.paddingY": "13",
      "layout_10.gap": "0",
      "layout_10.fontSize": "16",
      "layout_10.lineHeight": "22",
      "layout_10.fontWeight": "regular",
      "layout_10.minWidth": "220",
      "layout_12.radius": "10",
      "layout_12.paddingX": "14",
      "layout_12.paddingY": "10",
      "layout_12.gap": "0",
      "layout_12.fontSize": "14",
      "layout_12.lineHeight": "20",
      "layout_12.fontWeight": "regular",
      "layout_12.minWidth": "220",
      "layout_13.radius": "10",
      "layout_13.paddingX": "14",
      "layout_13.paddingY": "10",
      "layout_13.gap": "0",
      "layout_13.fontSize": "14",
      "layout_13.lineHeight": "20",
      "layout_13.fontWeight": "regular",
      "layout_13.minWidth": "220",
      "layout_14.radius": "10",
      "layout_14.paddingX": "14",
      "layout_14.paddingY": "10",
      "layout_14.gap": "0",
      "layout_14.fontSize": "14",
      "layout_14.lineHeight": "20",
      "layout_14.fontWeight": "regular",
      "layout_14.minWidth": "220",
      "layout_16.radius": "10",
      "layout_16.paddingX": "14",
      "layout_16.paddingY": "10",
      "layout_16.gap": "0",
      "layout_16.fontSize": "14",
      "layout_16.lineHeight": "20",
      "layout_16.fontWeight": "regular",
      "layout_16.minWidth": "220",
      "layout_17.radius": "10",
      "layout_17.paddingX": "14",
      "layout_17.paddingY": "10",
      "layout_17.gap": "0",
      "layout_17.fontSize": "14",
      "layout_17.lineHeight": "20",
      "layout_17.fontWeight": "regular",
      "layout_17.minWidth": "220",
      "layout_18.radius": "10",
      "layout_18.paddingX": "14",
      "layout_18.paddingY": "10",
      "layout_18.gap": "0",
      "layout_18.fontSize": "14",
      "layout_18.lineHeight": "20",
      "layout_18.fontWeight": "regular",
      "layout_18.minWidth": "220",
      "layout_20.radius": "10",
      "layout_20.paddingX": "14",
      "layout_20.paddingY": "10",
      "layout_20.gap": "0",
      "layout_20.fontSize": "14",
      "layout_20.lineHeight": "20",
      "layout_20.fontWeight": "regular",
      "layout_20.minWidth": "220",
      "layout_21.radius": "10",
      "layout_21.paddingX": "14",
      "layout_21.paddingY": "10",
      "layout_21.gap": "0",
      "layout_21.fontSize": "14",
      "layout_21.lineHeight": "20",
      "layout_21.fontWeight": "regular",
      "layout_21.minWidth": "220",
      "layout_22.radius": "12",
      "layout_22.paddingX": "16",
      "layout_22.paddingY": "13",
      "layout_22.gap": "0",
      "layout_22.fontSize": "16",
      "layout_22.lineHeight": "22",
      "layout_22.fontWeight": "regular",
      "layout_22.minWidth": "220",
      "layout_24.radius": "10",
      "layout_24.paddingX": "14",
      "layout_24.paddingY": "10",
      "layout_24.gap": "0",
      "layout_24.fontSize": "14",
      "layout_24.lineHeight": "20",
      "layout_24.fontWeight": "regular",
      "layout_24.minWidth": "220"
    },
    modes: {
      brand: "core",
      theme: "core"
    },
    metadata: {
      source: "miterlab-figma-generator",
      version: "0.1.0",
      generatedAt: "2026-03-19T09:01:19.304Z"
    }
  };

  // src/code.ts
  var inspectionFamilyPayloads = {
    "button-inspection": mcp_payload_default,
    "input-inspection": mcp_payload_default2
  };
  var renderInspectionFamily = async (family) => {
    const payload = inspectionFamilyPayloads[family];
    if (!payload) {
      throw new Error(`Unknown inspection family: ${family}`);
    }
    const result = await renderPayload(payload);
    figma.notify(`Rendered ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
  };
  var previewOptionsByLevel = {
    component: contractPreviewOptions.filter((item) => item.level === "component"),
    module: contractPreviewOptions.filter((item) => item.level === "module"),
    pattern: contractPreviewOptions.filter((item) => item.level === "pattern")
  };
  var uiHtml = `
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <style>
      :root {
        color-scheme: light;
        --bg: #ffffff;
        --panel: #f7f7f8;
        --line: #e1e2e4;
        --text: #171719;
        --muted: #989ba2;
        --accent: #0064ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 16px;
        background: var(--bg);
        color: var(--text);
        font: 12px/1.45 Pretendard, "Pretendard Variable", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .panel {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--panel);
      }
      h1 {
        margin: 0;
        font-size: 16px;
        line-height: 1.3;
      }
      p {
        margin: 0;
        color: var(--muted);
      }
      label {
        font-size: 11px;
        font-weight: 600;
        color: var(--muted);
      }
      select, button {
        width: 100%;
        border-radius: 12px;
        border: 1px solid var(--line);
        background: #fff;
        color: var(--text);
        padding: 10px 12px;
        font: inherit;
      }
      button {
        border-color: var(--accent);
        background: var(--accent);
        color: white;
        font-weight: 600;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .hint {
        font-size: 11px;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="panel">
        <h1>Inspection Explorer</h1>
        <p>Component, Module, Pattern\uC744 \uC120\uD0DD\uD574 Figma\uC5D0\uC11C \uBC14\uB85C \uD655\uC778\uD569\uB2C8\uB2E4.</p>
        <label for="previewLevel">Level</label>
        <select id="previewLevel">
          <option value="component">Component</option>
          <option value="module">Module</option>
          <option value="pattern">Pattern</option>
        </select>
        <label for="previewItem">Contract</label>
        <select id="previewItem"></select>
        <button id="renderContractPreview">Render Selected Contract</button>
        <div class="hint">Button/Input\uC740 inspection \uAE30\uC900\uC73C\uB85C, \uB098\uBA38\uC9C0\uB294 contract preview \uAE30\uC900\uC73C\uB85C \uB80C\uB354\uD569\uB2C8\uB2E4.</div>
      </div>
    </div>
    <script>
      const optionsByLevel = ${JSON.stringify(previewOptionsByLevel)};
      const level = document.getElementById("previewLevel");
      const item = document.getElementById("previewItem");
      const button = document.getElementById("renderContractPreview");

      const syncItems = () => {
        const next = optionsByLevel[level.value] || [];
        item.innerHTML = "";
        next.forEach((option) => {
          const el = document.createElement("option");
          el.value = option.id;
          el.textContent = option.label;
          item.appendChild(el);
        });
      };

      syncItems();
      level.onchange = syncItems;

      button.onclick = () => {
        button.disabled = true;
        parent.postMessage(
          {
            pluginMessage: {
              type: "renderContractPreview",
              previewId: item.value
            }
          },
          "*"
        );
      };

      window.onmessage = (event) => {
        const msg = event.data.pluginMessage;
        if (!msg) return;
        if (msg.type === "renderDone" || msg.type === "pluginError") {
          button.disabled = false;
        }
      };

      parent.postMessage({ pluginMessage: { type: "pluginReady" } }, "*");
    <\/script>
  </body>
</html>
`;
  figma.showUI(uiHtml, {
    width: 320,
    height: 240,
    title: "Miterlab Figma Writer"
  });
  figma.ui.onmessage = async (message) => {
    try {
      if (message.type === "pluginReady") {
        return;
      }
      if (message.type === "renderContractPreview") {
        if (message.previewId === "button") {
          await renderInspectionFamily("button-inspection");
        } else if (message.previewId === "input") {
          await renderInspectionFamily("input-inspection");
        } else {
          const result = await renderContractPreview(message.previewId);
          figma.notify(`Rendered ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
        }
        figma.ui.postMessage({ type: "renderDone" });
      }
    } catch (error) {
      figma.ui.postMessage({ type: "pluginError" });
      figma.notify(`Render failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
})();
