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
    colors: {
      button: {
        emphasis: {
          primary: { fill: "#1F6BFF", stroke: "#1F6BFF", text: "#FFFFFF", pressedFill: "#1859D6", pressedStroke: "#1859D6" },
          secondary: { fill: "#FFFFFF", stroke: "#C7D2E5", text: "#172033", pressedFill: "#F4F7FB", pressedStroke: "#B7C5DD" },
          tertiary: { fill: "transparent", stroke: "transparent", text: "#172033", pressedFill: "transparent", pressedStroke: "transparent" },
          destructive: { fill: "#DC3F45", stroke: "#DC3F45", text: "#FFFFFF", pressedFill: "#B73238", pressedStroke: "#B73238" },
          disabled: { fill: "#F1F5F9", stroke: "#E2E8F0", text: "#94A3B8" }
        }
      },
      input: {
        intent: {
          default: { fill: "#FFFFFF", stroke: "#CBD5E1", text: "#111827", subtle: "#94A3B8" },
          error: { fill: "#FFFFFF", stroke: "#DC2626", text: "#111827", subtle: "#94A3B8" },
          success: { fill: "#FFFFFF", stroke: "#0E9F6E", text: "#111827", subtle: "#94A3B8" },
          disabled: { fill: "#F1F5F9", stroke: "#E2E8F0", text: "#94A3B8", subtle: "#94A3B8" },
          readonly: { fill: "#F8FAFC", stroke: "#CBD5E1", text: "#475569", subtle: "#94A3B8" },
          loading: { fill: "#FFFFFF", stroke: "#CBD5E1", text: "#64748B", subtle: "#94A3B8" }
        },
        focusRing: {
          stroke: "#2D6CFF",
          strokeWeight: 2
        }
      }
    },
    button: {
      render: {
        sizes: {
          sm: { height: 44, paddingX: 14, paddingY: 10, radius: 14, fontSize: 15, lineHeight: 20, gap: 8, minWidth: 120 },
          md: { height: 50, paddingX: 18, paddingY: 13, radius: 14, fontSize: 16, lineHeight: 22, gap: 8, minWidth: 128 },
          lg: { height: 56, paddingX: 20, paddingY: 16, radius: 16, fontSize: 17, lineHeight: 24, gap: 8, minWidth: 176 }
        },
        widths: {
          hug: 128,
          full: 358
        }
      },
      inspection: {
        title: "Button Inspection",
        axes: {
          emphasis: ["primary", "secondary", "tertiary", "destructive"],
          size: ["sm", "md", "lg"],
          width: ["hug", "full"],
          state: ["enabled", "pressed", "disabled", "loading"]
        },
        rows: [
          { axis: "emphasis", items: ["Primary", "Secondary", "Tertiary", "Destructive"] },
          { axis: "size", items: ["Small", "Medium", "Large"] },
          { axis: "state", items: ["Pressed", "Disabled", "Loading"] },
          { axis: "width", items: ["Hug Width", "Full Width"] },
          { axis: "bundle", items: ["Leading Icon", "Icon Only", "Bottom CTA", "Danger CTA"] }
        ],
        sections: ["preview"],
        components: [
          { component: "button", section: "preview", label: "Primary", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Secondary", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Tertiary", emphasis: "tertiary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Destructive", emphasis: "destructive", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Small", emphasis: "primary", size: "sm", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Medium", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Large", emphasis: "primary", size: "lg", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Pressed", emphasis: "primary", size: "md", width: "hug", state: "pressed" },
          { component: "button", section: "preview", label: "Disabled", emphasis: "primary", size: "md", width: "hug", state: "disabled", disabled: true },
          { component: "button", section: "preview", label: "Loading", emphasis: "primary", size: "md", width: "hug", state: "loading", loading: true },
          { component: "button", section: "preview", label: "Hug Width", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Full Width", emphasis: "primary", size: "lg", width: "full", state: "enabled" },
          { component: "button", section: "preview", label: "Leading Icon", emphasis: "secondary", size: "md", width: "hug", state: "enabled", iconLeading: true },
          { component: "button", section: "preview", label: "Icon Only", emphasis: "tertiary", size: "md", width: "hug", state: "enabled", iconOnly: true },
          { component: "button", section: "preview", label: "Bottom CTA", emphasis: "primary", size: "lg", width: "full", state: "enabled" },
          { component: "button", section: "preview", label: "Danger CTA", emphasis: "destructive", size: "lg", width: "full", state: "enabled" }
        ]
      }
    },
    input: {
      render: {
        sizes: {
          sm: { height: 44, paddingX: 14, paddingY: 12, radius: 14, fontSize: 15, lineHeight: 20, minWidth: 220 },
          md: { height: 48, paddingX: 14, paddingY: 14, radius: 14, fontSize: 16, lineHeight: 22, minWidth: 220 },
          lg: { height: 56, paddingX: 16, paddingY: 16, radius: 16, fontSize: 17, lineHeight: 24, minWidth: 220 }
        },
        widths: {
          hug: 220,
          full: 358
        }
      },
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

  // ../../packages/ui-core/contracts/inspectionPreviewLayout.mjs
  var AXIS_PILL_WIDTH = 72;
  var AXIS_PILL_HEIGHT = 24;
  var PREVIEW_WIDTH = 920;
  var PREVIEW_MIN_HEIGHT = 380;
  var PREVIEW_PADDING_LEFT = 32;
  var PREVIEW_PADDING_RIGHT = 40;
  var CONTENT_START_X = 120;
  var ROW_GAP = 22;
  var ITEM_GAP = 20;
  var WRAP_GAP = 16;
  var axisTitle = (axis) => {
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
      const size2 = mobile_core_default.button.render.sizes[component.size];
      const width2 = component.iconOnly ? size2.height : component.width === "full" ? mobile_core_default.button.render.widths.full : mobile_core_default.button.render.widths.hug;
      return { width: width2, height: size2.height };
    }
    const size = mobile_core_default.input.render.sizes[component.size];
    const width = component.width === "full" ? mobile_core_default.input.render.widths.full : mobile_core_default.input.render.widths.hug;
    const fieldHeight = component.multiline ? Math.max(size.height * 2, size.lineHeight * ((_a = component.rowsCount) != null ? _a : 3) + size.paddingY * 2 + 16) : size.height;
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
    colors: {
      button: {
        emphasis: {
          primary: { fill: "#1F6BFF", stroke: "#1F6BFF", text: "#FFFFFF", pressedFill: "#1859D6", pressedStroke: "#1859D6" },
          secondary: { fill: "#FFFFFF", stroke: "#C7D2E5", text: "#172033", pressedFill: "#F4F7FB", pressedStroke: "#B7C5DD" },
          tertiary: { fill: "transparent", stroke: "transparent", text: "#172033", pressedFill: "transparent", pressedStroke: "transparent" },
          destructive: { fill: "#DC3F45", stroke: "#DC3F45", text: "#FFFFFF", pressedFill: "#B73238", pressedStroke: "#B73238" },
          disabled: { fill: "#F1F5F9", stroke: "#E2E8F0", text: "#94A3B8" }
        }
      },
      input: {
        intent: {
          default: { fill: "#FFFFFF", stroke: "#CBD5E1", text: "#111827", subtle: "#94A3B8" },
          error: { fill: "#FFFFFF", stroke: "#DC2626", text: "#111827", subtle: "#94A3B8" },
          success: { fill: "#FFFFFF", stroke: "#0E9F6E", text: "#111827", subtle: "#94A3B8" },
          disabled: { fill: "#F1F5F9", stroke: "#E2E8F0", text: "#94A3B8", subtle: "#94A3B8" },
          readonly: { fill: "#F8FAFC", stroke: "#CBD5E1", text: "#475569", subtle: "#94A3B8" },
          loading: { fill: "#FFFFFF", stroke: "#CBD5E1", text: "#64748B", subtle: "#94A3B8" }
        },
        focusRing: {
          stroke: "#2D6CFF",
          strokeWeight: 2
        }
      }
    },
    button: {
      render: {
        sizes: {
          sm: { height: 44, paddingX: 14, paddingY: 10, radius: 14, fontSize: 15, lineHeight: 20, gap: 8, minWidth: 120 },
          md: { height: 50, paddingX: 18, paddingY: 13, radius: 14, fontSize: 16, lineHeight: 22, gap: 8, minWidth: 128 },
          lg: { height: 56, paddingX: 20, paddingY: 16, radius: 16, fontSize: 17, lineHeight: 24, gap: 8, minWidth: 176 }
        },
        widths: {
          hug: 128,
          full: 358
        }
      },
      inspection: {
        title: "Button Inspection",
        axes: {
          emphasis: ["primary", "secondary", "tertiary", "destructive"],
          size: ["sm", "md", "lg"],
          width: ["hug", "full"],
          state: ["enabled", "pressed", "disabled", "loading"]
        },
        rows: [
          { axis: "emphasis", items: ["Primary", "Secondary", "Tertiary", "Destructive"] },
          { axis: "size", items: ["Small", "Medium", "Large"] },
          { axis: "state", items: ["Pressed", "Disabled", "Loading"] },
          { axis: "width", items: ["Hug Width", "Full Width"] },
          { axis: "bundle", items: ["Leading Icon", "Icon Only", "Bottom CTA", "Danger CTA"] }
        ],
        sections: ["preview"],
        components: [
          { component: "button", section: "preview", label: "Primary", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Secondary", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Tertiary", emphasis: "tertiary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Destructive", emphasis: "destructive", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Small", emphasis: "primary", size: "sm", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Medium", emphasis: "primary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Large", emphasis: "primary", size: "lg", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Pressed", emphasis: "primary", size: "md", width: "hug", state: "pressed" },
          { component: "button", section: "preview", label: "Disabled", emphasis: "primary", size: "md", width: "hug", state: "disabled", disabled: true },
          { component: "button", section: "preview", label: "Loading", emphasis: "primary", size: "md", width: "hug", state: "loading", loading: true },
          { component: "button", section: "preview", label: "Hug Width", emphasis: "secondary", size: "md", width: "hug", state: "enabled" },
          { component: "button", section: "preview", label: "Full Width", emphasis: "primary", size: "lg", width: "full", state: "enabled" },
          { component: "button", section: "preview", label: "Leading Icon", emphasis: "secondary", size: "md", width: "hug", state: "enabled", iconLeading: true },
          { component: "button", section: "preview", label: "Icon Only", emphasis: "tertiary", size: "md", width: "hug", state: "enabled", iconOnly: true },
          { component: "button", section: "preview", label: "Bottom CTA", emphasis: "primary", size: "lg", width: "full", state: "enabled" },
          { component: "button", section: "preview", label: "Danger CTA", emphasis: "destructive", size: "lg", width: "full", state: "enabled" }
        ]
      }
    },
    input: {
      render: {
        sizes: {
          sm: { height: 44, paddingX: 14, paddingY: 12, radius: 14, fontSize: 15, lineHeight: 20, minWidth: 220 },
          md: { height: 48, paddingX: 14, paddingY: 14, radius: 14, fontSize: 16, lineHeight: 22, minWidth: 220 },
          lg: { height: 56, paddingX: 16, paddingY: 16, radius: 16, fontSize: 17, lineHeight: 24, minWidth: 220 }
        },
        widths: {
          hug: 220,
          full: 358
        }
      },
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
    var _a, _b, _c, _d, _e, _f;
    const sizeKey = getButtonSize(node);
    const state = getButtonState(node);
    const emphasis = getButtonEmphasis(node);
    const metrics = mobile_core_default2.button.render.sizes[sizeKey];
    const palette = state === "disabled" ? mobile_core_default2.colors.button.emphasis.disabled : mobile_core_default2.colors.button.emphasis[emphasis];
    const fill = state === "pressed" ? (_a = palette.pressedFill) != null ? _a : palette.fill : palette.fill;
    const stroke = state === "pressed" ? (_b = palette.pressedStroke) != null ? _b : palette.stroke : palette.stroke;
    const iconOnly = ((_c = node.variant) == null ? void 0 : _c.iconOnly) === true;
    const iconLeading = ((_d = node.variant) == null ? void 0 : _d.iconLeading) === true;
    const width = iconOnly ? metrics.height : ((_e = node.variant) == null ? void 0 : _e.width) === "full" ? mobile_core_default2.button.render.widths.full : mobile_core_default2.button.render.widths.hug;
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
      const label = await createText((_f = node.text) != null ? _f : node.name, palette.text, styleFontSize(node, metrics.fontSize), styleLineHeight(node, metrics.lineHeight), "semibold");
      label.textAlignHorizontal = "CENTER";
      frame.appendChild(label);
    }
    return frame;
  };
  var inputPaletteForState = (state, intent) => {
    if (state === "disabled") return mobile_core_default2.colors.input.intent.disabled;
    if (state === "readonly") return mobile_core_default2.colors.input.intent.readonly;
    if (state === "loading") return mobile_core_default2.colors.input.intent.loading;
    return mobile_core_default2.colors.input.intent[intent];
  };
  var createInputNode = async (node) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    const sizeKey = getInputSize(node);
    const state = getInputState(node);
    const intent = getInputIntent(node);
    const metrics = mobile_core_default2.input.render.sizes[sizeKey];
    const palette = inputPaletteForState(state, intent);
    const width = ((_a = node.variant) == null ? void 0 : _a.width) === "hug" ? mobile_core_default2.input.render.widths.hug : mobile_core_default2.input.render.widths.full;
    const stroke = state === "focused" ? mobile_core_default2.colors.input.focusRing.stroke : palette.stroke;
    const strokeWeight = state === "focused" ? mobile_core_default2.colors.input.focusRing.strokeWeight : 1;
    const helperText = typeof ((_b = node.variant) == null ? void 0 : _b.helperText) === "string" ? node.variant.helperText : void 0;
    const multiline = ((_c = node.variant) == null ? void 0 : _c.multiline) === true;
    const rowsCount = typeof ((_d = node.variant) == null ? void 0 : _d.rowsCount) === "number" && Number.isFinite(node.variant.rowsCount) ? Math.max(2, node.variant.rowsCount) : 3;
    const fieldHeight = multiline ? Math.max(metrics.height * 2, metrics.lineHeight * rowsCount + metrics.paddingY * 2 + 16) : Math.max(metrics.height, node.height);
    const wrapper = figma.createFrame();
    wrapper.name = node.name;
    wrapper.x = node.x;
    wrapper.y = node.y;
    wrapper.layoutMode = "VERTICAL";
    wrapper.primaryAxisAlignItems = "MIN";
    wrapper.counterAxisAlignItems = "MIN";
    wrapper.itemSpacing = helperText ? 6 : 0;
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
      frame.appendChild(createLoadingGlyph("#64748B", Math.max(16, metrics.fontSize + 2)));
    } else if (((_j = node.variant) == null ? void 0 : _j.clearable) === true && typeof ((_k = node.variant) == null ? void 0 : _k.value) === "string") {
      frame.appendChild(createClearGlyph("#64748B", Math.max(16, metrics.fontSize + 3)));
    }
    wrapper.appendChild(frame);
    if (helperText) {
      const helper = await createText(
        helperText,
        intent === "error" ? mobile_core_default2.colors.input.intent.error.stroke : "#667085",
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
    frame.fills = [{ type: "SOLID", color: rgb2("#F8FAFC") }];
    frame.strokes = [{ type: "SOLID", color: rgb2("#E2E8F0") }];
    const text = await createText((_a = node.component) != null ? _a : node.name, "#475569", 13, 18, "medium");
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
    pill.fills = [{ type: "SOLID", color: rgb3("#E8EEF8") }];
    pill.strokes = [];
    const text = figma.createText();
    text.fontName = await loadFont("semibold");
    text.characters = label;
    text.fontSize = 11;
    text.fills = [{ type: "SOLID", color: rgb3("#4A5872") }];
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
    frame.fills = [{ type: "SOLID", color: rgb3("#F8FAFC") }];
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
                    name: "Primary",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
                    },
                    variant: {
                      emphasis: "primary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Primary"
                  },
                  {
                    id: "layout_5",
                    type: "INSTANCE",
                    name: "Secondary",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
                    },
                    variant: {
                      emphasis: "secondary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Secondary"
                  },
                  {
                    id: "layout_6",
                    type: "INSTANCE",
                    name: "Tertiary",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
                    },
                    variant: {
                      emphasis: "tertiary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Tertiary"
                  },
                  {
                    id: "layout_7",
                    type: "INSTANCE",
                    name: "Destructive",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
                    },
                    variant: {
                      emphasis: "destructive",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Destructive"
                  },
                  {
                    id: "layout_8",
                    type: "INSTANCE",
                    name: "Small",
                    x: 48,
                    y: 40,
                    width: 120,
                    height: 44,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 10,
                      gap: 8,
                      fontSize: 15,
                      lineHeight: 20,
                      fontWeight: "semibold",
                      minWidth: 120
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
                    id: "layout_9",
                    type: "INSTANCE",
                    name: "Medium",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
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
                    id: "layout_10",
                    type: "INSTANCE",
                    name: "Large",
                    x: 48,
                    y: 40,
                    width: 176,
                    height: 56,
                    component: "Button",
                    style: {
                      radius: 16,
                      paddingX: 20,
                      paddingY: 16,
                      gap: 8,
                      fontSize: 17,
                      lineHeight: 24,
                      fontWeight: "semibold",
                      minWidth: 176
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
                    id: "layout_11",
                    type: "INSTANCE",
                    name: "Pressed",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
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
                    id: "layout_12",
                    type: "INSTANCE",
                    name: "Disabled",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
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
                  }
                ]
              },
              {
                id: "layout_13",
                type: "FRAME",
                name: "preview-row-2",
                x: 48,
                y: 40,
                width: 1320,
                height: 100,
                children: [
                  {
                    id: "layout_14",
                    type: "INSTANCE",
                    name: "Loading",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
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
                  },
                  {
                    id: "layout_15",
                    type: "INSTANCE",
                    name: "Hug Width",
                    x: 48,
                    y: 40,
                    width: 128,
                    height: 50,
                    component: "Button",
                    style: {
                      radius: 14,
                      paddingX: 18,
                      paddingY: 13,
                      gap: 8,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "semibold",
                      minWidth: 128
                    },
                    variant: {
                      emphasis: "secondary",
                      width: "hug",
                      state: "enabled",
                      size: "md"
                    },
                    variables: {},
                    text: "Hug Width"
                  },
                  {
                    id: "layout_16",
                    type: "INSTANCE",
                    name: "Full Width",
                    x: 48,
                    y: 40,
                    width: 358,
                    height: 56,
                    component: "Button",
                    style: {
                      radius: 16,
                      paddingX: 20,
                      paddingY: 16,
                      gap: 8,
                      fontSize: 17,
                      lineHeight: 24,
                      fontWeight: "semibold",
                      minWidth: 176
                    },
                    variant: {
                      emphasis: "primary",
                      width: "full",
                      state: "enabled",
                      size: "lg"
                    },
                    variables: {},
                    text: "Full Width"
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
                name: "Primary",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
                },
                variant: {
                  emphasis: "primary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Primary"
              },
              {
                id: "layout_5",
                type: "INSTANCE",
                name: "Secondary",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
                },
                variant: {
                  emphasis: "secondary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Secondary"
              },
              {
                id: "layout_6",
                type: "INSTANCE",
                name: "Tertiary",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
                },
                variant: {
                  emphasis: "tertiary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Tertiary"
              },
              {
                id: "layout_7",
                type: "INSTANCE",
                name: "Destructive",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
                },
                variant: {
                  emphasis: "destructive",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Destructive"
              },
              {
                id: "layout_8",
                type: "INSTANCE",
                name: "Small",
                x: 48,
                y: 40,
                width: 120,
                height: 44,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 10,
                  gap: 8,
                  fontSize: 15,
                  lineHeight: 20,
                  fontWeight: "semibold",
                  minWidth: 120
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
                id: "layout_9",
                type: "INSTANCE",
                name: "Medium",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
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
                id: "layout_10",
                type: "INSTANCE",
                name: "Large",
                x: 48,
                y: 40,
                width: 176,
                height: 56,
                component: "Button",
                style: {
                  radius: 16,
                  paddingX: 20,
                  paddingY: 16,
                  gap: 8,
                  fontSize: 17,
                  lineHeight: 24,
                  fontWeight: "semibold",
                  minWidth: 176
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
                id: "layout_11",
                type: "INSTANCE",
                name: "Pressed",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
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
                id: "layout_12",
                type: "INSTANCE",
                name: "Disabled",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
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
              }
            ]
          },
          {
            id: "layout_13",
            type: "FRAME",
            name: "preview-row-2",
            x: 48,
            y: 40,
            width: 1320,
            height: 100,
            children: [
              {
                id: "layout_14",
                type: "INSTANCE",
                name: "Loading",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
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
              },
              {
                id: "layout_15",
                type: "INSTANCE",
                name: "Hug Width",
                x: 48,
                y: 40,
                width: 128,
                height: 50,
                component: "Button",
                style: {
                  radius: 14,
                  paddingX: 18,
                  paddingY: 13,
                  gap: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  fontWeight: "semibold",
                  minWidth: 128
                },
                variant: {
                  emphasis: "secondary",
                  width: "hug",
                  state: "enabled",
                  size: "md"
                },
                variables: {},
                text: "Hug Width"
              },
              {
                id: "layout_16",
                type: "INSTANCE",
                name: "Full Width",
                x: 48,
                y: 40,
                width: 358,
                height: 56,
                component: "Button",
                style: {
                  radius: 16,
                  paddingX: 20,
                  paddingY: 16,
                  gap: 8,
                  fontSize: 17,
                  lineHeight: 24,
                  fontWeight: "semibold",
                  minWidth: 176
                },
                variant: {
                  emphasis: "primary",
                  width: "full",
                  state: "enabled",
                  size: "lg"
                },
                variables: {},
                text: "Full Width"
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
            name: "Primary",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
            },
            variant: {
              emphasis: "primary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Primary"
          },
          {
            id: "layout_5",
            type: "INSTANCE",
            name: "Secondary",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
            },
            variant: {
              emphasis: "secondary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Secondary"
          },
          {
            id: "layout_6",
            type: "INSTANCE",
            name: "Tertiary",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
            },
            variant: {
              emphasis: "tertiary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Tertiary"
          },
          {
            id: "layout_7",
            type: "INSTANCE",
            name: "Destructive",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
            },
            variant: {
              emphasis: "destructive",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Destructive"
          },
          {
            id: "layout_8",
            type: "INSTANCE",
            name: "Small",
            x: 48,
            y: 40,
            width: 120,
            height: 44,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 10,
              gap: 8,
              fontSize: 15,
              lineHeight: 20,
              fontWeight: "semibold",
              minWidth: 120
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
            id: "layout_9",
            type: "INSTANCE",
            name: "Medium",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
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
            id: "layout_10",
            type: "INSTANCE",
            name: "Large",
            x: 48,
            y: 40,
            width: 176,
            height: 56,
            component: "Button",
            style: {
              radius: 16,
              paddingX: 20,
              paddingY: 16,
              gap: 8,
              fontSize: 17,
              lineHeight: 24,
              fontWeight: "semibold",
              minWidth: 176
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
            id: "layout_11",
            type: "INSTANCE",
            name: "Pressed",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
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
            id: "layout_12",
            type: "INSTANCE",
            name: "Disabled",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
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
          }
        ]
      },
      {
        id: "layout_4",
        type: "INSTANCE",
        name: "Primary",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
        },
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Primary"
      },
      {
        id: "layout_5",
        type: "INSTANCE",
        name: "Secondary",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
        },
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Secondary"
      },
      {
        id: "layout_6",
        type: "INSTANCE",
        name: "Tertiary",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
        },
        variant: {
          emphasis: "tertiary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Tertiary"
      },
      {
        id: "layout_7",
        type: "INSTANCE",
        name: "Destructive",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
        },
        variant: {
          emphasis: "destructive",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Destructive"
      },
      {
        id: "layout_8",
        type: "INSTANCE",
        name: "Small",
        x: 48,
        y: 40,
        width: 120,
        height: 44,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 10,
          gap: 8,
          fontSize: 15,
          lineHeight: 20,
          fontWeight: "semibold",
          minWidth: 120
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
        id: "layout_9",
        type: "INSTANCE",
        name: "Medium",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
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
        id: "layout_10",
        type: "INSTANCE",
        name: "Large",
        x: 48,
        y: 40,
        width: 176,
        height: 56,
        component: "Button",
        style: {
          radius: 16,
          paddingX: 20,
          paddingY: 16,
          gap: 8,
          fontSize: 17,
          lineHeight: 24,
          fontWeight: "semibold",
          minWidth: 176
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
        id: "layout_11",
        type: "INSTANCE",
        name: "Pressed",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
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
        id: "layout_12",
        type: "INSTANCE",
        name: "Disabled",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
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
        id: "layout_13",
        type: "FRAME",
        name: "preview-row-2",
        x: 48,
        y: 40,
        width: 1320,
        height: 100,
        children: [
          {
            id: "layout_14",
            type: "INSTANCE",
            name: "Loading",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
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
          },
          {
            id: "layout_15",
            type: "INSTANCE",
            name: "Hug Width",
            x: 48,
            y: 40,
            width: 128,
            height: 50,
            component: "Button",
            style: {
              radius: 14,
              paddingX: 18,
              paddingY: 13,
              gap: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "semibold",
              minWidth: 128
            },
            variant: {
              emphasis: "secondary",
              width: "hug",
              state: "enabled",
              size: "md"
            },
            variables: {},
            text: "Hug Width"
          },
          {
            id: "layout_16",
            type: "INSTANCE",
            name: "Full Width",
            x: 48,
            y: 40,
            width: 358,
            height: 56,
            component: "Button",
            style: {
              radius: 16,
              paddingX: 20,
              paddingY: 16,
              gap: 8,
              fontSize: 17,
              lineHeight: 24,
              fontWeight: "semibold",
              minWidth: 176
            },
            variant: {
              emphasis: "primary",
              width: "full",
              state: "enabled",
              size: "lg"
            },
            variables: {},
            text: "Full Width"
          }
        ]
      },
      {
        id: "layout_14",
        type: "INSTANCE",
        name: "Loading",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
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
      },
      {
        id: "layout_15",
        type: "INSTANCE",
        name: "Hug Width",
        x: 48,
        y: 40,
        width: 128,
        height: 50,
        component: "Button",
        style: {
          radius: 14,
          paddingX: 18,
          paddingY: 13,
          gap: 8,
          fontSize: 16,
          lineHeight: 22,
          fontWeight: "semibold",
          minWidth: 128
        },
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        },
        variables: {},
        text: "Hug Width"
      },
      {
        id: "layout_16",
        type: "INSTANCE",
        name: "Full Width",
        x: 48,
        y: 40,
        width: 358,
        height: 56,
        component: "Button",
        style: {
          radius: 16,
          paddingX: 20,
          paddingY: 16,
          gap: 8,
          fontSize: 17,
          lineHeight: 24,
          fontWeight: "semibold",
          minWidth: 176
        },
        variant: {
          emphasis: "primary",
          width: "full",
          state: "enabled",
          size: "lg"
        },
        variables: {},
        text: "Full Width"
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
        id: "layout_13",
        name: "preview-row-2"
      }
    ],
    components: [
      {
        id: "layout_4",
        name: "Primary",
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
        name: "Secondary",
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
        name: "Tertiary",
        component: "Button",
        variant: {
          emphasis: "tertiary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_7",
        name: "Destructive",
        component: "Button",
        variant: {
          emphasis: "destructive",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_8",
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
        id: "layout_9",
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
        id: "layout_10",
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
        id: "layout_11",
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
        id: "layout_12",
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
        id: "layout_14",
        name: "Loading",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "hug",
          state: "loading",
          size: "md",
          loading: true
        }
      },
      {
        id: "layout_15",
        name: "Hug Width",
        component: "Button",
        variant: {
          emphasis: "secondary",
          width: "hug",
          state: "enabled",
          size: "md"
        }
      },
      {
        id: "layout_16",
        name: "Full Width",
        component: "Button",
        variant: {
          emphasis: "primary",
          width: "full",
          state: "enabled",
          size: "lg"
        }
      }
    ],
    variables: {},
    styles: {
      "layout_4.radius": "14",
      "layout_4.paddingX": "18",
      "layout_4.paddingY": "13",
      "layout_4.gap": "8",
      "layout_4.fontSize": "16",
      "layout_4.lineHeight": "22",
      "layout_4.fontWeight": "semibold",
      "layout_4.minWidth": "128",
      "layout_5.radius": "14",
      "layout_5.paddingX": "18",
      "layout_5.paddingY": "13",
      "layout_5.gap": "8",
      "layout_5.fontSize": "16",
      "layout_5.lineHeight": "22",
      "layout_5.fontWeight": "semibold",
      "layout_5.minWidth": "128",
      "layout_6.radius": "14",
      "layout_6.paddingX": "18",
      "layout_6.paddingY": "13",
      "layout_6.gap": "8",
      "layout_6.fontSize": "16",
      "layout_6.lineHeight": "22",
      "layout_6.fontWeight": "semibold",
      "layout_6.minWidth": "128",
      "layout_7.radius": "14",
      "layout_7.paddingX": "18",
      "layout_7.paddingY": "13",
      "layout_7.gap": "8",
      "layout_7.fontSize": "16",
      "layout_7.lineHeight": "22",
      "layout_7.fontWeight": "semibold",
      "layout_7.minWidth": "128",
      "layout_8.radius": "14",
      "layout_8.paddingX": "14",
      "layout_8.paddingY": "10",
      "layout_8.gap": "8",
      "layout_8.fontSize": "15",
      "layout_8.lineHeight": "20",
      "layout_8.fontWeight": "semibold",
      "layout_8.minWidth": "120",
      "layout_9.radius": "14",
      "layout_9.paddingX": "18",
      "layout_9.paddingY": "13",
      "layout_9.gap": "8",
      "layout_9.fontSize": "16",
      "layout_9.lineHeight": "22",
      "layout_9.fontWeight": "semibold",
      "layout_9.minWidth": "128",
      "layout_10.radius": "16",
      "layout_10.paddingX": "20",
      "layout_10.paddingY": "16",
      "layout_10.gap": "8",
      "layout_10.fontSize": "17",
      "layout_10.lineHeight": "24",
      "layout_10.fontWeight": "semibold",
      "layout_10.minWidth": "176",
      "layout_11.radius": "14",
      "layout_11.paddingX": "18",
      "layout_11.paddingY": "13",
      "layout_11.gap": "8",
      "layout_11.fontSize": "16",
      "layout_11.lineHeight": "22",
      "layout_11.fontWeight": "semibold",
      "layout_11.minWidth": "128",
      "layout_12.radius": "14",
      "layout_12.paddingX": "18",
      "layout_12.paddingY": "13",
      "layout_12.gap": "8",
      "layout_12.fontSize": "16",
      "layout_12.lineHeight": "22",
      "layout_12.fontWeight": "semibold",
      "layout_12.minWidth": "128",
      "layout_14.radius": "14",
      "layout_14.paddingX": "18",
      "layout_14.paddingY": "13",
      "layout_14.gap": "8",
      "layout_14.fontSize": "16",
      "layout_14.lineHeight": "22",
      "layout_14.fontWeight": "semibold",
      "layout_14.minWidth": "128",
      "layout_15.radius": "14",
      "layout_15.paddingX": "18",
      "layout_15.paddingY": "13",
      "layout_15.gap": "8",
      "layout_15.fontSize": "16",
      "layout_15.lineHeight": "22",
      "layout_15.fontWeight": "semibold",
      "layout_15.minWidth": "128",
      "layout_16.radius": "16",
      "layout_16.paddingX": "20",
      "layout_16.paddingY": "16",
      "layout_16.gap": "8",
      "layout_16.fontSize": "17",
      "layout_16.lineHeight": "24",
      "layout_16.fontWeight": "semibold",
      "layout_16.minWidth": "176"
    },
    modes: {
      brand: "core",
      theme: "core"
    },
    metadata: {
      source: "miterlab-figma-generator",
      version: "0.1.0",
      generatedAt: "2026-03-18T08:48:07.234Z"
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
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
                    width: 358,
                    height: 44,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 12,
                      gap: 0,
                      fontSize: 15,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
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
                    width: 358,
                    height: 56,
                    component: "Input",
                    style: {
                      radius: 16,
                      paddingX: 16,
                      paddingY: 16,
                      gap: 0,
                      fontSize: 17,
                      lineHeight: 24,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
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
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
                      gap: 0,
                      fontSize: 16,
                      lineHeight: 22,
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
                    width: 358,
                    height: 48,
                    component: "Input",
                    style: {
                      radius: 14,
                      paddingX: 14,
                      paddingY: 14,
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
                      size: "md",
                      placeholder: "Full width field"
                    },
                    variables: {}
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
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
                width: 358,
                height: 44,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 12,
                  gap: 0,
                  fontSize: 15,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
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
                width: 358,
                height: 56,
                component: "Input",
                style: {
                  radius: 16,
                  paddingX: 16,
                  paddingY: 16,
                  gap: 0,
                  fontSize: 17,
                  lineHeight: 24,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
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
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
                  gap: 0,
                  fontSize: 16,
                  lineHeight: 22,
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
                width: 358,
                height: 48,
                component: "Input",
                style: {
                  radius: 14,
                  paddingX: 14,
                  paddingY: 14,
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
                  size: "md",
                  placeholder: "Full width field"
                },
                variables: {}
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
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
            width: 358,
            height: 44,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 12,
              gap: 0,
              fontSize: 15,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
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
            width: 358,
            height: 56,
            component: "Input",
            style: {
              radius: 16,
              paddingX: 16,
              paddingY: 16,
              gap: 0,
              fontSize: 17,
              lineHeight: 24,
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
        width: 358,
        height: 44,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 12,
          gap: 0,
          fontSize: 15,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
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
        width: 358,
        height: 56,
        component: "Input",
        style: {
          radius: 16,
          paddingX: 16,
          paddingY: 16,
          gap: 0,
          fontSize: 17,
          lineHeight: 24,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
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
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
              gap: 0,
              fontSize: 16,
              lineHeight: 22,
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
            width: 358,
            height: 48,
            component: "Input",
            style: {
              radius: 14,
              paddingX: 14,
              paddingY: 14,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
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
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
          gap: 0,
          fontSize: 16,
          lineHeight: 22,
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
        width: 358,
        height: 48,
        component: "Input",
        style: {
          radius: 14,
          paddingX: 14,
          paddingY: 14,
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
          size: "md",
          placeholder: "Full width field"
        },
        variables: {}
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
      }
    ],
    variables: {},
    styles: {
      "layout_4.radius": "14",
      "layout_4.paddingX": "14",
      "layout_4.paddingY": "14",
      "layout_4.gap": "0",
      "layout_4.fontSize": "16",
      "layout_4.lineHeight": "22",
      "layout_4.fontWeight": "regular",
      "layout_4.minWidth": "220",
      "layout_5.radius": "14",
      "layout_5.paddingX": "14",
      "layout_5.paddingY": "14",
      "layout_5.gap": "0",
      "layout_5.fontSize": "16",
      "layout_5.lineHeight": "22",
      "layout_5.fontWeight": "regular",
      "layout_5.minWidth": "220",
      "layout_6.radius": "14",
      "layout_6.paddingX": "14",
      "layout_6.paddingY": "14",
      "layout_6.gap": "0",
      "layout_6.fontSize": "16",
      "layout_6.lineHeight": "22",
      "layout_6.fontWeight": "regular",
      "layout_6.minWidth": "220",
      "layout_8.radius": "14",
      "layout_8.paddingX": "14",
      "layout_8.paddingY": "12",
      "layout_8.gap": "0",
      "layout_8.fontSize": "15",
      "layout_8.lineHeight": "20",
      "layout_8.fontWeight": "regular",
      "layout_8.minWidth": "220",
      "layout_9.radius": "14",
      "layout_9.paddingX": "14",
      "layout_9.paddingY": "14",
      "layout_9.gap": "0",
      "layout_9.fontSize": "16",
      "layout_9.lineHeight": "22",
      "layout_9.fontWeight": "regular",
      "layout_9.minWidth": "220",
      "layout_10.radius": "16",
      "layout_10.paddingX": "16",
      "layout_10.paddingY": "16",
      "layout_10.gap": "0",
      "layout_10.fontSize": "17",
      "layout_10.lineHeight": "24",
      "layout_10.fontWeight": "regular",
      "layout_10.minWidth": "220",
      "layout_12.radius": "14",
      "layout_12.paddingX": "14",
      "layout_12.paddingY": "14",
      "layout_12.gap": "0",
      "layout_12.fontSize": "16",
      "layout_12.lineHeight": "22",
      "layout_12.fontWeight": "regular",
      "layout_12.minWidth": "220",
      "layout_13.radius": "14",
      "layout_13.paddingX": "14",
      "layout_13.paddingY": "14",
      "layout_13.gap": "0",
      "layout_13.fontSize": "16",
      "layout_13.lineHeight": "22",
      "layout_13.fontWeight": "regular",
      "layout_13.minWidth": "220",
      "layout_14.radius": "14",
      "layout_14.paddingX": "14",
      "layout_14.paddingY": "14",
      "layout_14.gap": "0",
      "layout_14.fontSize": "16",
      "layout_14.lineHeight": "22",
      "layout_14.fontWeight": "regular",
      "layout_14.minWidth": "220",
      "layout_16.radius": "14",
      "layout_16.paddingX": "14",
      "layout_16.paddingY": "14",
      "layout_16.gap": "0",
      "layout_16.fontSize": "16",
      "layout_16.lineHeight": "22",
      "layout_16.fontWeight": "regular",
      "layout_16.minWidth": "220",
      "layout_17.radius": "14",
      "layout_17.paddingX": "14",
      "layout_17.paddingY": "14",
      "layout_17.gap": "0",
      "layout_17.fontSize": "16",
      "layout_17.lineHeight": "22",
      "layout_17.fontWeight": "regular",
      "layout_17.minWidth": "220",
      "layout_18.radius": "14",
      "layout_18.paddingX": "14",
      "layout_18.paddingY": "14",
      "layout_18.gap": "0",
      "layout_18.fontSize": "16",
      "layout_18.lineHeight": "22",
      "layout_18.fontWeight": "regular",
      "layout_18.minWidth": "220"
    },
    modes: {
      brand: "core",
      theme: "core"
    },
    metadata: {
      source: "miterlab-figma-generator",
      version: "0.1.0",
      generatedAt: "2026-03-18T08:48:07.541Z"
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
  var uiHtml = `
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #0f1115;
        --panel: #171a21;
        --line: #2a3140;
        --text: #eef2f7;
        --muted: #98a2b3;
        --accent: #2d6cff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 16px;
        background: var(--bg);
        color: var(--text);
        font: 12px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
        border-radius: 10px;
        border: 1px solid var(--line);
        background: #11151c;
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
        <h1>Families</h1>
        <p>Button/Input inspection\uB9CC \uB80C\uB354\uD569\uB2C8\uB2E4.</p>
        <label for="inspectionFamily">Family</label>
        <select id="inspectionFamily">
          <option value="button-inspection">button-inspection</option>
          <option value="input-inspection">input-inspection</option>
        </select>
        <button id="renderInspectionFamily">Render Selected Family</button>
        <div class="hint">\uAE30\uC874 \uD504\uB808\uC784\uC774 \uC788\uC73C\uBA74 \uC9C0\uC6B0\uACE0 \uB2E4\uC2DC \uB80C\uB354\uD574 \uC8FC\uC138\uC694.</div>
      </div>
    </div>
    <script>
      const family = document.getElementById("inspectionFamily");
      const button = document.getElementById("renderInspectionFamily");

      button.onclick = () => {
        button.disabled = true;
        parent.postMessage(
          {
            pluginMessage: {
              type: "renderInspectionFamily",
              family: family.value
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
      if (message.type === "renderInspectionFamily") {
        await renderInspectionFamily(message.family);
        figma.ui.postMessage({ type: "renderDone" });
      }
    } catch (error) {
      figma.ui.postMessage({ type: "pluginError" });
      figma.notify(`Render failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
})();
