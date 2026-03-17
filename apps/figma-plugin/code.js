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

  // src/api/fetchPayload.ts
  var fetchPayload = async (bridgeUrl, screen, theme) => {
    const response = await fetch(`${bridgeUrl}/generate-screen`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ screen, theme })
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Bridge request failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (!data.payload) {
      throw new Error("Invalid bridge response: payload is missing");
    }
    return data.payload;
  };
  var fetchPayloadFromPrompt = async (bridgeUrl, prompt) => {
    const response = await fetch(`${bridgeUrl}/generate-from-prompt`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Bridge request failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (!data.payload) {
      throw new Error("Invalid bridge response: payload is missing");
    }
    return data.payload;
  };
  var saveExtractionArtifact = async (bridgeUrl, body) => {
    const response = await fetch(`${bridgeUrl}/save-extraction`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Bridge request failed (${response.status}): ${text}`);
    }
    return await response.json();
  };
  var loadExtractionArtifact = async (bridgeUrl, extractionKey) => {
    const response = await fetch(`${bridgeUrl}/load-extraction`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ extractionKey })
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Bridge request failed (${response.status}): ${text}`);
    }
    return await response.json();
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
  var loadDefaultFont = async () => {
    return loadFont("regular");
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
  var INPUT_BLUEPRINT_KEY = "miterlab.blueprint.input.v1";
  var sanitizeInputBlueprint = (blueprint) => {
    if (!(blueprint == null ? void 0 : blueprint.metrics)) return blueprint;
    const { width, height } = blueprint.metrics;
    if (typeof width === "number" && width > 800 || typeof height === "number" && height > 240) {
      return __spreadProps(__spreadValues({}, blueprint), {
        metrics: __spreadProps(__spreadValues({}, blueprint.metrics), {
          width: void 0,
          height: void 0,
          paddingTop: void 0,
          paddingRight: void 0,
          paddingBottom: void 0,
          paddingLeft: void 0,
          itemSpacing: void 0,
          radius: void 0,
          layoutMode: void 0
        })
      });
    }
    return blueprint;
  };
  var loadInputBlueprint = async () => {
    const value = await figma.clientStorage.getAsync(INPUT_BLUEPRINT_KEY);
    return value && typeof value === "object" ? sanitizeInputBlueprint(value) : null;
  };
  var rgb2 = (hex) => {
    const normalized = hex.replace("#", "");
    const bigint = Number.parseInt(normalized, 16);
    return {
      r: (bigint >> 16 & 255) / 255,
      g: (bigint >> 8 & 255) / 255,
      b: (bigint & 255) / 255
    };
  };
  var addLabel = async (frame, textValue, color, align = "MIN", fontSize = 16, weight = "regular", lineHeight) => {
    const font = await loadFont(weight);
    const text = figma.createText();
    text.fontName = font;
    text.characters = textValue;
    text.fontSize = fontSize;
    if (typeof lineHeight === "number") {
      text.lineHeight = { unit: "PIXELS", value: lineHeight };
    }
    text.fills = [{ type: "SOLID", color: rgb2(color) }];
    text.textAutoResize = "HEIGHT";
    text.layoutAlign = align === "CENTER" ? "INHERIT" : "STRETCH";
    text.textAlignHorizontal = align === "CENTER" ? "CENTER" : "LEFT";
    if (align === "CENTER") {
      text.x = 0;
      text.y = -1;
    }
    frame.appendChild(text);
  };
  var getSizeKey = (node) => {
    var _a;
    const size = (_a = node.variant) == null ? void 0 : _a.size;
    if (size === "sm" || size === "lg") return size;
    return "md";
  };
  var getButtonSizeKey = (node) => {
    var _a;
    const size = (_a = node.variant) == null ? void 0 : _a.size;
    if (size === "mini" || size === "small" || size === "middle" || size === "large") return size;
    if (size === "sm") return "small";
    if (size === "lg") return "large";
    return "middle";
  };
  var getInputSizeKey = (node) => {
    var _a;
    const size = (_a = node.variant) == null ? void 0 : _a.size;
    if (size === "small" || size === "middle" || size === "large") return size;
    if (size === "sm") return "small";
    if (size === "lg") return "large";
    return "middle";
  };
  var getVariantKey = (node) => {
    var _a;
    const value = (_a = node.variant) == null ? void 0 : _a.variant;
    return typeof value === "string" ? value : "default";
  };
  var getStateKey = (node) => {
    var _a;
    const value = (_a = node.variant) == null ? void 0 : _a.state;
    return typeof value === "string" ? value : "default";
  };
  var styleFill = (node, fallback) => {
    var _a, _b;
    return (_b = (_a = node.style) == null ? void 0 : _a.fill) != null ? _b : fallback;
  };
  var styleStroke = (node, fallback) => {
    var _a, _b;
    return (_b = (_a = node.style) == null ? void 0 : _a.stroke) != null ? _b : fallback;
  };
  var styleText = (node, fallback) => {
    var _a, _b;
    return (_b = (_a = node.style) == null ? void 0 : _a.text) != null ? _b : fallback;
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
  var styleFontWeight = (node, fallback) => {
    var _a, _b;
    return (_b = (_a = node.style) == null ? void 0 : _a.fontWeight) != null ? _b : fallback;
  };
  var styleMinWidth = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.minWidth) === "number" ? node.style.minWidth : fallback;
  };
  var styleGap = (node, fallback) => {
    var _a;
    return typeof ((_a = node.style) == null ? void 0 : _a.gap) === "number" ? node.style.gap : fallback;
  };
  var buttonVisual = (node, defaults) => {
    var _a, _b, _c;
    const state = getStateKey(node);
    if (state === "disabled" && !((_a = node.style) == null ? void 0 : _a.fill) && !((_b = node.style) == null ? void 0 : _b.stroke) && !((_c = node.style) == null ? void 0 : _c.text)) {
      return { fill: "#E0E6EE", stroke: "#E0E6EE", text: "#7E8A9C", strokeWeight: defaults.strokeWeight };
    }
    const fill = styleFill(node, defaults.fill);
    const stroke = styleStroke(node, defaults.stroke);
    const text = styleText(node, defaults.text);
    const strokeWeight = fill === stroke && defaults.strokeWeight === 0 ? 0 : defaults.strokeWeight;
    return { fill, stroke, text, strokeWeight };
  };
  var buttonVariantFlags = (node) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    return {
      loading: ((_a = node.variant) == null ? void 0 : _a.loading) === true || ((_b = node.variant) == null ? void 0 : _b.loading) === "auto" || getStateKey(node) === "loading",
      fullWidth: ((_c = node.variant) == null ? void 0 : _c.block) === true,
      disabled: ((_d = node.variant) == null ? void 0 : _d.disabled) === true || getStateKey(node) === "disabled",
      iconOnly: ((_e = node.variant) == null ? void 0 : _e.iconOnly) === true,
      fill: ((_f = node.variant) == null ? void 0 : _f.fill) === "solid" || ((_g = node.variant) == null ? void 0 : _g.fill) === "outline" || ((_h = node.variant) == null ? void 0 : _h.fill) === "none" ? node.variant.fill : "solid",
      iconPosition: ((_i = node.variant) == null ? void 0 : _i.iconPosition) === "left" || ((_j = node.variant) == null ? void 0 : _j.iconPosition) === "right" ? node.variant.iconPosition : void 0
    };
  };
  var createIconProxy = (color, size, kind) => {
    const wrapper = figma.createFrame();
    wrapper.layoutMode = "NONE";
    wrapper.resize(size, size);
    wrapper.fills = [];
    wrapper.strokes = [];
    if (kind === "loading") {
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
    }
    if (kind === "IconBlank") {
      const ring = figma.createEllipse();
      const ringSize = Math.max(10, size - 3);
      ring.resize(ringSize, ringSize);
      ring.x = Math.round((size - ringSize) / 2);
      ring.y = Math.round((size - ringSize) / 2);
      ring.fills = [];
      ring.strokes = [{ type: "SOLID", color: rgb2(color) }];
      ring.strokeWeight = Math.max(1.25, Math.round(size / 10));
      wrapper.appendChild(ring);
      return wrapper;
    }
    if (kind === "IconTrash") {
      const body = figma.createRectangle();
      const bodyW = Math.max(8, Math.round(size * 0.5));
      const bodyH = Math.max(8, Math.round(size * 0.46));
      body.resize(bodyW, bodyH);
      body.x = Math.round((size - bodyW) / 2);
      body.y = Math.round(size * 0.32);
      body.cornerRadius = 2;
      body.fills = [];
      body.strokes = [{ type: "SOLID", color: rgb2(color) }];
      body.strokeWeight = Math.max(1.25, Math.round(size / 11));
      wrapper.appendChild(body);
      const lid = figma.createRectangle();
      const lidW = Math.max(10, Math.round(size * 0.58));
      lid.resize(lidW, 2);
      lid.x = Math.round((size - lidW) / 2);
      lid.y = Math.round(size * 0.24);
      lid.fills = [{ type: "SOLID", color: rgb2(color) }];
      lid.strokes = [];
      wrapper.appendChild(lid);
      const handle = figma.createRectangle();
      handle.resize(Math.max(4, Math.round(size * 0.18)), 2);
      handle.x = Math.round((size - handle.width) / 2);
      handle.y = Math.round(size * 0.16);
      handle.fills = [{ type: "SOLID", color: rgb2(color) }];
      handle.strokes = [];
      wrapper.appendChild(handle);
      return wrapper;
    }
    const plusThickness = kind === "IconPlusThick" ? Math.max(3, Math.round(size / 4)) : Math.max(2, Math.round(size / 7));
    const armLength = Math.max(10, Math.round(size * 0.72));
    const horizontal = figma.createRectangle();
    horizontal.resize(armLength, plusThickness);
    horizontal.x = Math.round((size - armLength) / 2);
    horizontal.y = Math.round((size - plusThickness) / 2);
    horizontal.cornerRadius = Math.max(1, Math.round(plusThickness / 2));
    horizontal.fills = [{ type: "SOLID", color: rgb2(color) }];
    horizontal.strokes = [];
    wrapper.appendChild(horizontal);
    const vertical = figma.createRectangle();
    vertical.resize(plusThickness, armLength);
    vertical.x = Math.round((size - plusThickness) / 2);
    vertical.y = Math.round((size - armLength) / 2);
    vertical.cornerRadius = Math.max(1, Math.round(plusThickness / 2));
    vertical.fills = [{ type: "SOLID", color: rgb2(color) }];
    vertical.strokes = [];
    wrapper.appendChild(vertical);
    return wrapper;
  };
  var addButtonIcon = async (frame, color, size, kind) => {
    const icon = createIconProxy(color, size, kind);
    frame.appendChild(icon);
  };
  var inputStyle = (state) => {
    if (state === "error") return { fill: "#FFFFFF", stroke: "#D34B4B", text: "#1F2430", subtle: "#7E8A9C" };
    if (state === "focus") return { fill: "#FFFFFF", stroke: "#A8B3C2", text: "#1F2430", subtle: "#7E8A9C" };
    if (state === "positive") return { fill: "#FFFFFF", stroke: "#18A06B", text: "#1F2430", subtle: "#7E8A9C" };
    if (state === "readOnly") return { fill: "#F7F8FA", stroke: "#CAD3DE", text: "#475467", subtle: "#98A2B3" };
    if (state === "disabled") return { fill: "#EEF1F5", stroke: "#E0E6EE", text: "#7E8A9C", subtle: "#98A2B3" };
    return { fill: "#FFFFFF", stroke: "#CAD3DE", text: "#1F2430", subtle: "#7E8A9C" };
  };
  var createInlineText = async (value, color, fontSize, lineHeight, weight = "regular") => {
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
  var createInputMetaBadge = async (label, fill, textColor) => {
    const badge = figma.createFrame();
    badge.layoutMode = "HORIZONTAL";
    badge.primaryAxisAlignItems = "CENTER";
    badge.counterAxisAlignItems = "CENTER";
    badge.paddingLeft = 6;
    badge.paddingRight = 6;
    badge.paddingTop = 2;
    badge.paddingBottom = 2;
    badge.cornerRadius = 999;
    badge.itemSpacing = 0;
    badge.fills = [{ type: "SOLID", color: rgb2(fill) }];
    badge.strokes = [];
    await addLabel(badge, label, textColor, "MIN", 11, "medium", 14);
    return badge;
  };
  var toneStyle = (variant) => {
    var _a;
    const palette = {
      neutral: { fill: "#F7F8FA", stroke: "#E0E6EE", text: "#5F6A7B" },
      default: { fill: "#F7F8FA", stroke: "#E0E6EE", text: "#5F6A7B" },
      success: { fill: "#EAF7F1", stroke: "#1A9B6D", text: "#137B56" },
      warning: { fill: "#FFF5E8", stroke: "#E9A63E", text: "#B8781E" },
      danger: { fill: "#FDEEEE", stroke: "#D34B4B", text: "#9F3030" },
      info: { fill: "#EDF3FF", stroke: "#2E6CFF", text: "#1F57D6" },
      emphasized: { fill: "#12141A", stroke: "#12141A", text: "#FFFFFF" },
      selected: { fill: "#12141A", stroke: "#12141A", text: "#FFFFFF" }
    };
    return (_a = palette[variant]) != null ? _a : palette.default;
  };
  var createInputNode = async (node) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const size = getInputSizeKey(node);
    const state = ((_a = node.variant) == null ? void 0 : _a.disabled) === true ? "disabled" : ((_b = node.variant) == null ? void 0 : _b.readOnly) === true ? "readOnly" : "default";
    const style = inputStyle(state);
    const blueprint = await loadInputBlueprint();
    const blueprintMetrics = blueprint == null ? void 0 : blueprint.metrics;
    const clearable = ((_c = node.variant) == null ? void 0 : _c.clearable) === true;
    const onlyShowClearWhenFocus = ((_d = node.variant) == null ? void 0 : _d.onlyShowClearWhenFocus) === true;
    const inputType = typeof ((_e = node.variant) == null ? void 0 : _e.type) === "string" ? node.variant.type : void 0;
    const placeholderText = typeof ((_f = node.variant) == null ? void 0 : _f.placeholder) === "string" ? node.variant.placeholder : void 0;
    const inputValue = typeof ((_g = node.variant) == null ? void 0 : _g.value) === "string" ? node.variant.value : typeof ((_h = node.variant) == null ? void 0 : _h.defaultValue) === "string" ? node.variant.defaultValue : node.text;
    const container = figma.createFrame();
    container.name = node.name;
    container.resize(
      Math.max(220, styleMinWidth(node, (_i = blueprintMetrics == null ? void 0 : blueprintMetrics.width) != null ? _i : 220), node.width),
      Math.max(1, node.height, (_j = blueprintMetrics == null ? void 0 : blueprintMetrics.height) != null ? _j : 0)
    );
    container.x = node.x;
    container.y = node.y;
    container.layoutMode = "VERTICAL";
    container.primaryAxisAlignItems = "MIN";
    container.counterAxisAlignItems = "MIN";
    container.itemSpacing = 6;
    container.fills = [];
    container.strokes = [];
    const frame = figma.createFrame();
    frame.name = `${node.name} / field`;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = stylePaddingX(node, (_k = blueprintMetrics == null ? void 0 : blueprintMetrics.paddingLeft) != null ? _k : size === "small" ? 12 : size === "large" ? 16 : 14);
    frame.paddingRight = stylePaddingX(node, (_l = blueprintMetrics == null ? void 0 : blueprintMetrics.paddingRight) != null ? _l : size === "small" ? 12 : size === "large" ? 16 : 14);
    frame.paddingTop = stylePaddingY(node, (_m = blueprintMetrics == null ? void 0 : blueprintMetrics.paddingTop) != null ? _m : size === "small" ? 8 : size === "large" ? 12 : 10);
    frame.paddingBottom = stylePaddingY(node, (_n = blueprintMetrics == null ? void 0 : blueprintMetrics.paddingBottom) != null ? _n : size === "small" ? 8 : size === "large" ? 12 : 10);
    frame.itemSpacing = (_o = blueprintMetrics == null ? void 0 : blueprintMetrics.itemSpacing) != null ? _o : 8;
    frame.cornerRadius = styleRadius(node, (_p = blueprintMetrics == null ? void 0 : blueprintMetrics.radius) != null ? _p : size === "large" ? 14 : size === "small" ? 10 : 12);
    frame.strokeWeight = 1;
    frame.strokes = [{ type: "SOLID", color: rgb2(styleStroke(node, style.stroke)) }];
    frame.fills = [{ type: "SOLID", color: rgb2(styleFill(node, style.fill)) }];
    frame.layoutAlign = "STRETCH";
    const fontSize = styleFontSize(node, size === "small" ? 14 : size === "large" ? 16 : 15);
    const lineHeight = styleLineHeight(node, size === "small" ? 20 : size === "large" ? 24 : 22);
    const valueNode = await createInlineText(
      inputType === "password" && inputValue ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : inputValue || placeholderText || "Input",
      inputValue ? styleText(node, style.text) : style.subtle,
      fontSize,
      lineHeight,
      styleFontWeight(node, inputValue ? "regular" : "medium")
    );
    valueNode.layoutGrow = 1;
    frame.appendChild(valueNode);
    if (clearable && inputValue && !onlyShowClearWhenFocus) {
      frame.appendChild(createClearGlyph("#667085", Math.max(16, fontSize + 2)));
    }
    container.appendChild(frame);
    return container;
  };
  var createTextareaNode = async (node) => {
    const frame = await createInputNode(node);
    frame.resize(Math.max(280, node.width), Math.max(96, node.height));
    frame.counterAxisAlignItems = "MIN";
    frame.paddingTop = 12;
    frame.paddingBottom = 12;
    return frame;
  };
  var createSelectNode = async (node) => {
    const frame = await createInputNode(node);
    await addLabel(frame, "\u25BE", "#6B7280", "CENTER", 14);
    return frame;
  };
  var createButtonNode = async (node) => {
    var _a;
    const size = getButtonSizeKey(node);
    const flags = buttonVariantFlags(node);
    const visual = buttonVisual(node, { fill: "#FFFFFF", stroke: "#D7DEE8", text: "#1F2430", strokeWeight: 1 });
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(
      Math.max(
        flags.iconOnly ? node.height : styleMinWidth(node, size === "mini" ? 64 : size === "small" ? 80 : size === "large" ? 112 : 92),
        node.width
      ),
      Math.max(1, node.height)
    );
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = flags.iconOnly ? 0 : stylePaddingX(node, size === "large" ? 20 : size === "small" ? 12 : size === "mini" ? 10 : 16);
    frame.paddingRight = flags.iconOnly ? 0 : stylePaddingX(node, size === "large" ? 20 : size === "small" ? 12 : size === "mini" ? 10 : 16);
    frame.paddingTop = stylePaddingY(node, size === "mini" ? 5 : size === "small" ? 7 : size === "large" ? 10 : 8);
    frame.paddingBottom = stylePaddingY(node, size === "mini" ? 5 : size === "small" ? 7 : size === "large" ? 10 : 8);
    frame.itemSpacing = styleGap(node, size === "mini" ? 4 : 6);
    frame.cornerRadius = styleRadius(node, size === "large" ? 14 : size === "small" ? 10 : 12);
    frame.strokeWeight = flags.fill === "none" ? 0 : visual.strokeWeight;
    frame.strokes = frame.strokeWeight === 0 ? [] : [{ type: "SOLID", color: rgb2(visual.stroke) }];
    frame.fills = [{ type: "SOLID", color: rgb2(visual.fill) }];
    const loadingText = typeof ((_a = node.variant) == null ? void 0 : _a.loadingText) === "string" ? node.variant.loadingText : void 0;
    const label = flags.loading ? loadingText != null ? loadingText : "Loading" : node.text || "Action";
    const textColor = visual.text;
    const iconSize = Math.max(12, styleFontSize(node, size === "mini" ? 13 : size === "small" ? 13 : size === "large" ? 17 : 15));
    if (flags.loading) {
      await addButtonIcon(frame, textColor, iconSize, "loading");
    }
    await addLabel(
      frame,
      label,
      textColor,
      "CENTER",
      styleFontSize(node, size === "mini" ? 13 : size === "small" ? 13 : size === "large" ? 17 : 15),
      styleFontWeight(node, "medium"),
      styleLineHeight(node, size === "mini" ? 18 : size === "small" ? 18 : size === "large" ? 24 : 22)
    );
    return frame;
  };
  var createIconButtonNode = async (node) => {
    const size = getSizeKey(node);
    const flags = buttonVariantFlags(node);
    const visual = buttonVisual(node, { fill: "#FFFFFF", stroke: "#D7DEE8", text: "#1F2430", strokeWeight: 1 });
    const frame = figma.createFrame();
    frame.name = node.name;
    const dimension = Math.max(node.height, styleMinWidth(node, size === "sm" ? 32 : size === "lg" ? 48 : 40));
    const inset = stylePaddingX(node, size === "sm" ? 8 : size === "lg" ? 12 : 10);
    frame.resize(dimension, dimension);
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = inset;
    frame.paddingRight = inset;
    frame.paddingTop = inset;
    frame.paddingBottom = inset;
    frame.itemSpacing = 0;
    frame.cornerRadius = styleRadius(node, size === "lg" ? 12 : 8);
    frame.strokeWeight = visual.strokeWeight;
    frame.strokes = visual.strokeWeight === 0 ? [] : [{ type: "SOLID", color: rgb2(visual.stroke) }];
    frame.fills = [{ type: "SOLID", color: rgb2(visual.fill) }];
    await addButtonIcon(
      frame,
      visual.text,
      styleFontSize(node, size === "sm" ? 12 : size === "lg" ? 16 : 14),
      flags.loading ? "loading" : "IconBlank"
    );
    return frame;
  };
  var createTextButtonNode = async (node) => {
    const size = getSizeKey(node);
    const flags = buttonVariantFlags(node);
    const visual = buttonVisual(node, { fill: "#FFFFFF", stroke: "#FFFFFF", text: "#1F2430", strokeWeight: 0 });
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(styleMinWidth(node, 56), node.width), Math.max(1, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = stylePaddingX(node, size === "sm" ? 6 : 8);
    frame.paddingRight = stylePaddingX(node, size === "sm" ? 6 : 8);
    frame.paddingTop = stylePaddingY(node, 6);
    frame.paddingBottom = stylePaddingY(node, 6);
    frame.itemSpacing = styleGap(node, size === "sm" ? 4 : 6);
    frame.cornerRadius = styleRadius(node, 8);
    frame.strokes = [];
    frame.fills = [];
    const textColor = visual.text;
    const label = flags.loading ? "Loading" : node.text || "Text action";
    const iconKind = flags.loading ? "loading" : flags.iconPosition === "right" ? "IconTrash" : "IconPlus";
    if (flags.iconPosition === "left") {
      await addButtonIcon(frame, textColor, styleFontSize(node, size === "sm" ? 13 : 14), iconKind);
    }
    await addLabel(
      frame,
      label,
      textColor,
      "CENTER",
      styleFontSize(node, size === "sm" ? 13 : 14),
      styleFontWeight(node, "medium"),
      styleLineHeight(node, size === "sm" ? 18 : 20)
    );
    if (flags.iconPosition === "right") {
      await addButtonIcon(frame, textColor, styleFontSize(node, size === "sm" ? 13 : 14), iconKind);
    }
    return frame;
  };
  var createChoiceNode = async (node, kind) => {
    const size = getSizeKey(node);
    const variant = getVariantKey(node);
    const state = getStateKey(node);
    const checked = kind === "switch" ? variant === "on" : variant === "checked";
    const disabled = state === "disabled";
    const containerHeight = kind === "switch" ? size === "lg" ? 32 : size === "sm" ? 24 : 28 : size === "lg" ? 32 : size === "sm" ? 20 : 24;
    const controlSize = kind === "switch" ? size === "lg" ? 52 : size === "sm" ? 36 : 44 : size === "lg" ? 20 : size === "sm" ? 16 : 18;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(240, node.width), Math.max(containerHeight, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "CENTER";
    frame.itemSpacing = 10;
    frame.fills = [];
    frame.strokes = [];
    const control = figma.createFrame();
    control.layoutMode = "NONE";
    control.resize(controlSize, kind === "switch" ? Math.max(20, containerHeight - 4) : controlSize);
    control.cornerRadius = kind === "radio" || kind === "switch" ? 999 : 6;
    control.strokeWeight = 1;
    control.strokes = [{ type: "SOLID", color: rgb2(disabled ? "#E0E6EE" : checked ? "#12141A" : "#CBD5E1") }];
    control.fills = [{ type: "SOLID", color: rgb2(kind === "switch" ? checked ? "#12141A" : "#EEF1F5" : checked ? "#12141A" : "#FFFFFF") }];
    if (kind === "switch") {
      const thumb = figma.createEllipse();
      const thumbSize = Math.max(16, control.height - 4);
      thumb.resize(thumbSize, thumbSize);
      thumb.x = checked ? control.width - thumbSize - 2 : 2;
      thumb.y = 2;
      thumb.fills = [{ type: "SOLID", color: rgb2(disabled ? "#F7F8FA" : "#FFFFFF") }];
      control.appendChild(thumb);
    } else if (kind === "checkbox" && checked) {
      const font = await loadDefaultFont();
      const mark = figma.createText();
      mark.fontName = font;
      mark.characters = "\u2713";
      mark.fontSize = size === "lg" ? 14 : 12;
      mark.x = 3;
      mark.y = 1;
      mark.fills = [{ type: "SOLID", color: rgb2("#FFFFFF") }];
      control.appendChild(mark);
    } else if (kind === "radio" && checked) {
      const dot = figma.createEllipse();
      const dotSize = size === "lg" ? 10 : 8;
      dot.resize(dotSize, dotSize);
      dot.x = (control.width - dotSize) / 2;
      dot.y = (control.height - dotSize) / 2;
      dot.fills = [{ type: "SOLID", color: rgb2("#12141A") }];
      control.appendChild(dot);
    }
    frame.appendChild(control);
    await addLabel(
      frame,
      node.text || kind,
      styleText(node, disabled ? "#7E8A9C" : "#111827"),
      "MIN",
      styleFontSize(node, size === "lg" ? 15 : 14),
      styleFontWeight(node, "regular"),
      styleLineHeight(node, 20)
    );
    return frame;
  };
  var createFilterButtonNode = async (node) => {
    var _a;
    const size = getSizeKey(node);
    const selected = ((_a = node.variant) == null ? void 0 : _a.selected) === true || getStateKey(node) === "selected";
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(styleMinWidth(node, size === "sm" ? 64 : size === "lg" ? 88 : 72), node.width), Math.max(1, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = stylePaddingX(node, size === "sm" ? 10 : size === "lg" ? 16 : 12);
    frame.paddingRight = stylePaddingX(node, size === "sm" ? 10 : size === "lg" ? 16 : 12);
    frame.itemSpacing = 6;
    frame.cornerRadius = styleRadius(node, 16);
    frame.strokeWeight = 1;
    frame.strokes = [{ type: "SOLID", color: rgb2(selected ? "#12141A" : "#D7DEE8") }];
    frame.fills = [{ type: "SOLID", color: rgb2(selected ? "#12141A" : "#F7F8FA") }];
    await addLabel(
      frame,
      node.text || "Filter",
      styleText(node, selected ? "#FFFFFF" : "#1F2430"),
      "CENTER",
      styleFontSize(node, size === "lg" ? 14 : 13),
      styleFontWeight(node, "medium"),
      styleLineHeight(node, size === "lg" ? 20 : 18)
    );
    return frame;
  };
  var createCompactPillNode = async (node, tone) => {
    var _a;
    const variant = getVariantKey(node);
    const toneKey = typeof ((_a = node.variant) == null ? void 0 : _a.tone) === "string" ? node.variant.tone : void 0;
    const style = toneStyle(toneKey != null ? toneKey : tone === "solid" ? variant : variant === "default" ? "neutral" : variant);
    const size = getSizeKey(node);
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(styleMinWidth(node, 64), node.width), Math.max(1, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = stylePaddingX(node, size === "lg" ? 14 : size === "sm" ? 10 : 12);
    frame.paddingRight = stylePaddingX(node, size === "lg" ? 14 : size === "sm" ? 10 : 12);
    frame.cornerRadius = styleRadius(node, 999);
    frame.strokeWeight = 1;
    frame.strokes = [{ type: "SOLID", color: rgb2(style.stroke) }];
    frame.fills = [{ type: "SOLID", color: rgb2(style.fill) }];
    frame.strokes = [{ type: "SOLID", color: rgb2(styleStroke(node, style.stroke)) }];
    frame.fills = [{ type: "SOLID", color: rgb2(styleFill(node, style.fill)) }];
    await addLabel(
      frame,
      node.text || "Pill",
      styleText(node, style.text),
      "CENTER",
      styleFontSize(node, size === "lg" ? 13 : 12),
      styleFontWeight(node, tone === "solid" ? "medium" : "regular"),
      styleLineHeight(node, size === "lg" ? 18 : 16)
    );
    return frame;
  };
  var createSurfaceNode = async (node, fill, stroke, radius) => {
    var _a;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(240, node.width), Math.max(40, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "MIN";
    frame.paddingTop = stylePaddingY(node, 16);
    frame.paddingBottom = stylePaddingY(node, 16);
    frame.paddingLeft = stylePaddingX(node, 16);
    frame.paddingRight = stylePaddingX(node, 16);
    frame.itemSpacing = typeof ((_a = node.style) == null ? void 0 : _a.gap) === "number" ? node.style.gap : 8;
    frame.cornerRadius = styleRadius(node, radius);
    frame.strokeWeight = 1;
    frame.strokes = [{ type: "SOLID", color: rgb2(stroke) }];
    frame.fills = [{ type: "SOLID", color: rgb2(fill) }];
    frame.strokes = [{ type: "SOLID", color: rgb2(styleStroke(node, stroke)) }];
    frame.fills = [{ type: "SOLID", color: rgb2(styleFill(node, fill)) }];
    await addLabel(
      frame,
      node.text || node.component || "Surface",
      styleText(node, "#111827"),
      "MIN",
      styleFontSize(node, 14),
      styleFontWeight(node, "medium"),
      styleLineHeight(node, 20)
    );
    return frame;
  };
  var createDividerNode = (node) => {
    const line = figma.createLine();
    line.name = node.name;
    line.resize(Math.max(240, node.width), Math.max(1, node.height));
    line.x = node.x;
    line.y = node.y;
    line.strokes = [{ type: "SOLID", color: rgb2(styleStroke(node, "#E5E7EB")) }];
    return line;
  };
  var createSpinnerNode = (node) => {
    const ellipse = figma.createEllipse();
    ellipse.name = node.name;
    ellipse.resize(Math.max(16, node.width), Math.max(16, node.height));
    ellipse.x = node.x;
    ellipse.y = node.y;
    ellipse.strokes = [{ type: "SOLID", color: rgb2(styleStroke(node, "#2E6CFF")) }];
    ellipse.strokeWeight = 2;
    ellipse.fills = [];
    return ellipse;
  };
  var createProgressNode = (node) => {
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(160, node.width), Math.max(8, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.cornerRadius = 999;
    frame.fills = [{ type: "SOLID", color: rgb2(styleFill(node, "#E0E6EE")) }];
    frame.strokes = [];
    const bar = figma.createRectangle();
    bar.resize(Math.max(48, node.width * 0.56), Math.max(8, node.height));
    bar.cornerRadius = 999;
    bar.fills = [{ type: "SOLID", color: rgb2(styleStroke(node, "#2E6CFF")) }];
    frame.appendChild(bar);
    return frame;
  };
  var createPaginationNode = async (node) => {
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(180, node.width), Math.max(32, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.itemSpacing = 8;
    frame.fills = [];
    frame.strokes = [];
    await addLabel(frame, node.text || "Pagination", styleText(node, "#5F6A7B"), "MIN", 14, "regular");
    return frame;
  };
  var splitItems = (value, fallback) => value ? value.split("|").map((item) => item.trim()).filter(Boolean) : fallback;
  var createDialogNode = async (node) => {
    var _a, _b, _c;
    const frame = await createSurfaceNode(node, styleFill(node, "#FFFFFF"), styleStroke(node, "#D0D5DD"), styleRadius(node, 16));
    frame.resize(Math.max(280, node.width), Math.max(220, node.height));
    frame.itemSpacing = 12;
    frame.paddingTop = 20;
    frame.paddingBottom = 20;
    frame.paddingLeft = 20;
    frame.paddingRight = 20;
    frame.removeChildren();
    if (typeof ((_a = node.variant) == null ? void 0 : _a.title) === "string" && node.variant.title) {
      await addLabel(frame, node.variant.title, "#101828", "MIN", 18, "semibold", 24);
    }
    if (typeof ((_b = node.variant) == null ? void 0 : _b.content) === "string" && node.variant.content) {
      await addLabel(frame, node.variant.content, "#475467", "MIN", 14, "regular", 20);
    }
    const actions = splitItems(typeof ((_c = node.variant) == null ? void 0 : _c.actions) === "string" ? node.variant.actions : void 0, ["Cancel", "Confirm"]);
    const actionRow = figma.createFrame();
    actionRow.layoutMode = "HORIZONTAL";
    actionRow.primaryAxisAlignItems = "CENTER";
    actionRow.counterAxisAlignItems = "CENTER";
    actionRow.itemSpacing = 8;
    actionRow.layoutAlign = "STRETCH";
    actionRow.fills = [];
    actionRow.strokes = [];
    for (const [index, action] of actions.entries()) {
      const button = figma.createFrame();
      button.layoutMode = "HORIZONTAL";
      button.primaryAxisAlignItems = "CENTER";
      button.counterAxisAlignItems = "CENTER";
      button.layoutGrow = 1;
      button.paddingLeft = 12;
      button.paddingRight = 12;
      button.paddingTop = 10;
      button.paddingBottom = 10;
      button.cornerRadius = 10;
      button.fills = [{ type: "SOLID", color: rgb2(index === actions.length - 1 ? "#1677FF" : "#F2F4F7") }];
      button.strokes = [];
      await addLabel(button, action, index === actions.length - 1 ? "#FFFFFF" : "#344054", "CENTER", 14, "medium", 20);
      actionRow.appendChild(button);
    }
    frame.appendChild(actionRow);
    return frame;
  };
  var createPopupNode = async (node) => {
    var _a, _b, _c;
    const frame = await createSurfaceNode(node, "#FFFFFF", "#D0D5DD", 16);
    frame.resize(Math.max(280, node.width), Math.max(180, node.height));
    frame.removeChildren();
    frame.paddingTop = 16;
    frame.paddingBottom = 16;
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    const position = typeof ((_a = node.variant) == null ? void 0 : _a.position) === "string" ? node.variant.position : "bottom";
    await addLabel(frame, `Popup / ${position}`, "#101828", "MIN", 15, "medium", 20);
    await addLabel(frame, typeof ((_b = node.variant) == null ? void 0 : _b.children) === "string" ? node.variant.children : "Popup content", "#475467", "MIN", 14, "regular", 20);
    if (((_c = node.variant) == null ? void 0 : _c.showCloseButton) === true) {
      const close = await createInputMetaBadge("close", "#F2F4F7", "#344054");
      frame.appendChild(close);
    }
    return frame;
  };
  var createToastIcon = (kind) => {
    if (kind === "loading") {
      return createIconProxy("#FFFFFF", 20, "loading");
    }
    return createIconProxy("#FFFFFF", 20, kind === "fail" ? "IconTrash" : "IconPlus");
  };
  var createToastNode = async (node) => {
    var _a, _b, _c;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(180, node.width), Math.max(56, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.itemSpacing = 8;
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = 12;
    frame.paddingBottom = 12;
    frame.cornerRadius = 12;
    frame.fills = [{ type: "SOLID", color: rgb2("#101828") }];
    frame.strokes = [];
    const icon = typeof ((_a = node.variant) == null ? void 0 : _a.icon) === "string" ? node.variant.icon : "success";
    frame.appendChild(createToastIcon(icon));
    await addLabel(frame, typeof ((_b = node.variant) == null ? void 0 : _b.content) === "string" ? node.variant.content : node.text || "Toast", "#FFFFFF", "CENTER", 13, "medium", 18);
    if (typeof ((_c = node.variant) == null ? void 0 : _c.duration) === "number") {
      await addLabel(frame, `${node.variant.duration}ms`, "#D0D5DD", "CENTER", 11, "regular", 14);
    }
    return frame;
  };
  var createNavBarNode = async (node) => {
    var _a, _b, _c, _d, _e;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(320, node.width), Math.max(45, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = 12;
    frame.paddingRight = 12;
    frame.itemSpacing = 12;
    frame.fills = [{ type: "SOLID", color: rgb2("#FFFFFF") }];
    frame.strokes = [{ type: "SOLID", color: rgb2("#EAECF0") }];
    frame.strokeTopWeight = 0;
    frame.strokeLeftWeight = 0;
    frame.strokeRightWeight = 0;
    frame.strokeBottomWeight = 1;
    const left = figma.createFrame();
    left.layoutMode = "HORIZONTAL";
    left.primaryAxisAlignItems = "CENTER";
    left.counterAxisAlignItems = "CENTER";
    left.itemSpacing = 6;
    left.fills = [];
    left.strokes = [];
    if (((_a = node.variant) == null ? void 0 : _a.backIcon) === true || ((_b = node.variant) == null ? void 0 : _b.backArrow) === true) {
      left.appendChild(await createCellArrow("#344054"));
    }
    if (typeof ((_c = node.variant) == null ? void 0 : _c.left) === "string") {
      await addLabel(left, node.variant.left, "#344054", "MIN", 14, "regular", 20);
    }
    frame.appendChild(left);
    const title = await createInlineText(
      typeof ((_d = node.variant) == null ? void 0 : _d.children) === "string" ? node.variant.children : node.text || "Title",
      "#101828",
      17,
      24,
      "medium"
    );
    title.layoutGrow = 1;
    title.textAlignHorizontal = "CENTER";
    frame.appendChild(title);
    const right = figma.createFrame();
    right.layoutMode = "HORIZONTAL";
    right.primaryAxisAlignItems = "CENTER";
    right.counterAxisAlignItems = "CENTER";
    right.itemSpacing = 6;
    right.fills = [];
    right.strokes = [];
    if (typeof ((_e = node.variant) == null ? void 0 : _e.right) === "string") {
      await addLabel(right, node.variant.right, "#1677FF", "MIN", 14, "medium", 20);
    }
    frame.appendChild(right);
    return frame;
  };
  var createTabBarNode = async (node) => {
    var _a, _b, _c, _d, _e;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(320, node.width), Math.max(64, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.itemSpacing = 4;
    frame.paddingLeft = 8;
    frame.paddingRight = 8;
    frame.paddingTop = 4;
    frame.paddingBottom = ((_a = node.variant) == null ? void 0 : _a.safeArea) === true ? 12 : 4;
    frame.fills = [{ type: "SOLID", color: rgb2("#FFFFFF") }];
    frame.strokes = [{ type: "SOLID", color: rgb2("#EAECF0") }];
    frame.strokeTopWeight = 1;
    frame.strokeLeftWeight = 0;
    frame.strokeRightWeight = 0;
    frame.strokeBottomWeight = 0;
    const items = parseTabChildren(typeof ((_b = node.variant) == null ? void 0 : _b.children) === "string" ? node.variant.children : "home:Home|search:Search|profile:Profile");
    const active = typeof ((_c = node.variant) == null ? void 0 : _c.activeKey) === "string" ? node.variant.activeKey : (_d = items[0]) == null ? void 0 : _d.key;
    for (const item of items) {
      const tab = figma.createFrame();
      tab.layoutMode = "VERTICAL";
      tab.primaryAxisAlignItems = "CENTER";
      tab.counterAxisAlignItems = "CENTER";
      tab.itemSpacing = 4;
      tab.layoutGrow = 1;
      tab.paddingLeft = 8;
      tab.paddingRight = 8;
      tab.paddingTop = 4;
      tab.paddingBottom = 4;
      tab.fills = [];
      tab.strokes = [];
      const icon = createIconProxy(item.key === active ? "#1677FF" : "#667085", 18, "IconBlank");
      tab.appendChild(icon);
      await addLabel(tab, item.label, item.key === active ? "#1677FF" : "#667085", "CENTER", 11, item.key === active ? "medium" : "regular", 14);
      if (typeof ((_e = node.variant) == null ? void 0 : _e.badge) === "string" && item.key === active) {
        tab.appendChild(await createInputMetaBadge(node.variant.badge, "#F04438", "#FFFFFF"));
      }
      frame.appendChild(tab);
    }
    return frame;
  };
  var createFormNode = async (node) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const mode = typeof ((_a = node.variant) == null ? void 0 : _a.mode) === "string" ? node.variant.mode : "default";
    const layout = typeof ((_b = node.variant) == null ? void 0 : _b.layout) === "string" ? node.variant.layout : "vertical";
    const frame = await createSurfaceNode(node, "#FFFFFF", mode === "card" ? "#E4E7EC" : "#FFFFFF", mode === "card" ? 12 : 0);
    frame.resize(Math.max(280, node.width), Math.max(180, node.height));
    frame.removeChildren();
    frame.itemSpacing = 10;
    frame.paddingLeft = 0;
    frame.paddingRight = 0;
    frame.paddingTop = 0;
    frame.paddingBottom = 0;
    const item = figma.createFrame();
    item.layoutMode = layout === "horizontal" ? "HORIZONTAL" : "VERTICAL";
    item.primaryAxisAlignItems = "MIN";
    item.counterAxisAlignItems = layout === "horizontal" ? "CENTER" : "MIN";
    item.itemSpacing = 8;
    item.paddingLeft = 16;
    item.paddingRight = 16;
    item.paddingTop = 12;
    item.paddingBottom = 12;
    item.layoutAlign = "STRETCH";
    item.fills = [{ type: "SOLID", color: rgb2(((_c = node.variant) == null ? void 0 : _c.hidden) === true ? "#F9FAFB" : "#FFFFFF") }];
    item.strokes = mode === "card" ? [] : [{ type: "SOLID", color: rgb2("#EAECF0") }];
    item.strokeTopWeight = 0;
    item.strokeLeftWeight = 0;
    item.strokeRightWeight = 0;
    item.strokeBottomWeight = 1;
    const labelCol = figma.createFrame();
    labelCol.layoutMode = "VERTICAL";
    labelCol.primaryAxisAlignItems = "MIN";
    labelCol.counterAxisAlignItems = "MIN";
    labelCol.itemSpacing = 4;
    labelCol.fills = [];
    labelCol.strokes = [];
    await addLabel(labelCol, `${typeof ((_d = node.variant) == null ? void 0 : _d.label) === "string" ? node.variant.label : node.text || "Field"}${((_e = node.variant) == null ? void 0 : _e.required) === true ? " *" : ""}`, "#101828", "MIN", 14, "medium", 20);
    if (typeof ((_f = node.variant) == null ? void 0 : _f.description) === "string") {
      await addLabel(labelCol, node.variant.description, "#667085", "MIN", 12, "regular", 18);
    }
    if (typeof ((_g = node.variant) == null ? void 0 : _g.help) === "string") {
      await addLabel(labelCol, node.variant.help, "#667085", "MIN", 12, "regular", 18);
    }
    item.appendChild(labelCol);
    const field = figma.createFrame();
    field.layoutMode = "HORIZONTAL";
    field.primaryAxisAlignItems = "CENTER";
    field.counterAxisAlignItems = "CENTER";
    field.layoutGrow = 1;
    field.paddingLeft = 12;
    field.paddingRight = 12;
    field.paddingTop = 10;
    field.paddingBottom = 10;
    field.itemSpacing = 8;
    field.cornerRadius = 10;
    field.fills = [{ type: "SOLID", color: rgb2(((_h = node.variant) == null ? void 0 : _h.disabled) === true ? "#F2F4F7" : "#FFFFFF") }];
    field.strokes = [{ type: "SOLID", color: rgb2("#D0D5DD") }];
    await addLabel(field, typeof ((_i = node.variant) == null ? void 0 : _i.extra) === "string" ? node.variant.extra : "Input", ((_j = node.variant) == null ? void 0 : _j.disabled) === true ? "#98A2B3" : "#667085", "MIN", 14, "regular", 20);
    if (((_k = node.variant) == null ? void 0 : _k.clickable) === true || ((_l = node.variant) == null ? void 0 : _l.arrowIcon) === true || ((_m = node.variant) == null ? void 0 : _m.arrow) === true) {
      field.appendChild(await createCellArrow("#98A2B3"));
    }
    item.appendChild(field);
    frame.appendChild(item);
    if (typeof ((_n = node.variant) == null ? void 0 : _n.footer) === "string") {
      const footer = figma.createFrame();
      footer.layoutMode = "HORIZONTAL";
      footer.primaryAxisAlignItems = "CENTER";
      footer.counterAxisAlignItems = "CENTER";
      footer.paddingLeft = 16;
      footer.paddingRight = 16;
      footer.paddingTop = 12;
      footer.paddingBottom = 0;
      footer.fills = [];
      footer.strokes = [];
      await addLabel(footer, node.variant.footer, "#1677FF", "MIN", 14, "medium", 20);
      frame.appendChild(footer);
    }
    return frame;
  };
  var createCellArrow = (color) => {
    const arrow = figma.createText();
    return loadDefaultFont().then((font) => {
      arrow.fontName = font;
      arrow.characters = "\u203A";
      arrow.fontSize = 18;
      arrow.fills = [{ type: "SOLID", color: rgb2(color) }];
      arrow.textAutoResize = "WIDTH_AND_HEIGHT";
      return arrow;
    });
  };
  var createCellNode = async (node) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const disabled = ((_a = node.variant) == null ? void 0 : _a.disabled) === true;
    const clickable = ((_b = node.variant) == null ? void 0 : _b.clickable) === true;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(280, node.width), Math.max(node.height, 56));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = 16;
    frame.paddingRight = 16;
    frame.paddingTop = node.height >= 72 ? 14 : 12;
    frame.paddingBottom = node.height >= 72 ? 14 : 12;
    frame.itemSpacing = 12;
    frame.fills = [{ type: "SOLID", color: rgb2(disabled ? "#F7F8FA" : clickable ? "#FCFCFD" : "#FFFFFF") }];
    frame.strokes = [{ type: "SOLID", color: rgb2("#E4E7EC") }];
    frame.strokeWeight = 1;
    if (typeof ((_c = node.variant) == null ? void 0 : _c.prefix) === "string" && node.variant.prefix) {
      const prefix = figma.createFrame();
      prefix.layoutMode = "HORIZONTAL";
      prefix.primaryAxisAlignItems = "CENTER";
      prefix.counterAxisAlignItems = "CENTER";
      prefix.resize(28, 28);
      prefix.cornerRadius = 999;
      prefix.fills = [{ type: "SOLID", color: rgb2("#EEF2F6") }];
      prefix.strokes = [];
      await addLabel(prefix, node.variant.prefix, "#344054", "CENTER", 12, "medium", 16);
      frame.appendChild(prefix);
    }
    const content = figma.createFrame();
    content.layoutMode = "VERTICAL";
    content.primaryAxisAlignItems = "MIN";
    content.counterAxisAlignItems = "MIN";
    content.itemSpacing = 4;
    content.fills = [];
    content.strokes = [];
    content.layoutGrow = 1;
    await addLabel(
      content,
      typeof ((_d = node.variant) == null ? void 0 : _d.title) === "string" ? node.variant.title : node.text || "Cell",
      disabled ? "#98A2B3" : "#101828",
      "MIN",
      15,
      "regular",
      22
    );
    if (typeof ((_e = node.variant) == null ? void 0 : _e.description) === "string" && node.variant.description) {
      await addLabel(content, node.variant.description, disabled ? "#B0B8C4" : "#667085", "MIN", 13, "regular", 18);
    }
    frame.appendChild(content);
    if (typeof ((_f = node.variant) == null ? void 0 : _f.extra) === "string" && node.variant.extra) {
      const extra = await createInlineText(node.variant.extra, disabled ? "#B0B8C4" : "#667085", 13, 18, "regular");
      frame.appendChild(extra);
    }
    if (((_g = node.variant) == null ? void 0 : _g.arrowIcon) === true || ((_h = node.variant) == null ? void 0 : _h.arrow) === true || typeof ((_i = node.variant) == null ? void 0 : _i.arrowIcon) === "string" || typeof ((_j = node.variant) == null ? void 0 : _j.arrow) === "string") {
      frame.appendChild(await createCellArrow(disabled ? "#B0B8C4" : "#98A2B3"));
    }
    return frame;
  };
  var createListNode = async (node) => {
    var _a, _b, _c;
    const mode = typeof ((_a = node.variant) == null ? void 0 : _a.mode) === "string" ? node.variant.mode : "default";
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(280, node.width), Math.max(node.height, mode === "card" ? 184 : 160));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "MIN";
    frame.itemSpacing = 10;
    frame.paddingLeft = 0;
    frame.paddingRight = 0;
    frame.paddingTop = 0;
    frame.paddingBottom = 0;
    frame.cornerRadius = mode === "card" ? 12 : 0;
    frame.strokeWeight = mode === "card" ? 1 : 0;
    frame.strokes = mode === "card" ? [{ type: "SOLID", color: rgb2("#E4E7EC") }] : [];
    frame.fills = [{ type: "SOLID", color: rgb2("#FFFFFF") }];
    if (typeof ((_b = node.variant) == null ? void 0 : _b.header) === "string" && node.variant.header) {
      const header = figma.createFrame();
      header.layoutMode = "HORIZONTAL";
      header.primaryAxisAlignItems = "MIN";
      header.counterAxisAlignItems = "CENTER";
      header.paddingLeft = 4;
      header.paddingRight = 4;
      header.paddingTop = 0;
      header.paddingBottom = 0;
      header.fills = [];
      header.strokes = [];
      await addLabel(header, node.variant.header, "#667085", "MIN", 13, "medium", 18);
      frame.appendChild(header);
    }
    const body = figma.createFrame();
    body.layoutMode = "VERTICAL";
    body.primaryAxisAlignItems = "MIN";
    body.counterAxisAlignItems = "MIN";
    body.itemSpacing = 0;
    body.layoutAlign = "STRETCH";
    body.cornerRadius = mode === "card" ? 12 : 0;
    body.fills = [{ type: "SOLID", color: rgb2("#FFFFFF") }];
    body.strokes = mode === "card" ? [{ type: "SOLID", color: rgb2("#E4E7EC") }] : [];
    body.strokeWeight = mode === "card" ? 1 : 0;
    const items = typeof ((_c = node.variant) == null ? void 0 : _c.children) === "string" && node.variant.children ? node.variant.children.split("|").map((item) => item.trim()).filter(Boolean) : ["Item 1", "Item 2", "Item 3"];
    for (const [index, item] of items.entries()) {
      const row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.primaryAxisAlignItems = "MIN";
      row.counterAxisAlignItems = "CENTER";
      row.paddingLeft = 16;
      row.paddingRight = 16;
      row.paddingTop = 12;
      row.paddingBottom = 12;
      row.itemSpacing = 12;
      row.layoutAlign = "STRETCH";
      row.fills = [{ type: "SOLID", color: rgb2("#FFFFFF") }];
      row.strokes = index < items.length - 1 ? [{ type: "SOLID", color: rgb2("#EAECF0") }] : [];
      row.strokeTopWeight = 0;
      row.strokeLeftWeight = 0;
      row.strokeRightWeight = 0;
      row.strokeBottomWeight = index < items.length - 1 ? 1 : 0;
      await addLabel(row, item, "#101828", "MIN", 15, "regular", 22);
      body.appendChild(row);
    }
    frame.appendChild(body);
    return frame;
  };
  var parseTabChildren = (value) => {
    if (!value) {
      return [
        { key: "tab-1", label: "Tab 1" },
        { key: "tab-2", label: "Tab 2" },
        { key: "tab-3", label: "Tab 3" }
      ];
    }
    return value.split("|").map((item, index) => {
      var _a;
      const trimmed = item.trim();
      if (!trimmed) return null;
      const [candidateKey, candidateLabel] = trimmed.includes(":") ? trimmed.split(":", 2) : [void 0, trimmed];
      const label = ((_a = candidateLabel != null ? candidateLabel : candidateKey) != null ? _a : `Tab ${index + 1}`).trim();
      const key = ((candidateKey != null ? candidateKey : label) || `tab-${index + 1}`).trim();
      return { key, label };
    }).filter((item) => item !== null);
  };
  var createSingleTabChip = async (label, options) => {
    var _a;
    const item = figma.createFrame();
    item.layoutMode = "VERTICAL";
    item.primaryAxisAlignItems = "CENTER";
    item.counterAxisAlignItems = "CENTER";
    item.itemSpacing = 8;
    item.paddingLeft = 12;
    item.paddingRight = 12;
    item.paddingTop = 8;
    item.paddingBottom = 0;
    item.fills = [];
    item.strokes = [];
    if (typeof options.width === "number" && options.width > 0) {
      item.resize(options.width, 36);
    }
    const titleColor = options.disabled ? "#98A2B3" : options.active ? "#12141A" : "#667085";
    await addLabel(item, label, titleColor, "CENTER", 14, options.active ? "medium" : "regular", 20);
    const line = figma.createRectangle();
    const lineColor = (_a = options.activeLineColor) != null ? _a : "#1677FF";
    const lineHeight = options.active ? 2 : 1;
    const lineWidth = options.activeLineMode === "fixed" ? 20 : options.activeLineMode === "full" ? Math.max(32, (typeof options.width === "number" ? options.width : 56) - 8) : Math.max(18, Math.round(label.length * 6.5));
    line.resize(lineWidth, lineHeight);
    line.cornerRadius = 999;
    line.fills = [{ type: "SOLID", color: rgb2(options.active ? lineColor : "#FFFFFF") }];
    line.strokes = [];
    item.appendChild(line);
    return item;
  };
  var createGenericInstanceNode = async (node) => {
    const size = getSizeKey(node);
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(styleMinWidth(node, 48), node.width), Math.max(1, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = stylePaddingX(node, size === "lg" ? 16 : size === "sm" ? 8 : 12);
    frame.paddingRight = stylePaddingX(node, size === "lg" ? 16 : size === "sm" ? 8 : 12);
    frame.paddingTop = stylePaddingY(node, 8);
    frame.paddingBottom = stylePaddingY(node, 8);
    frame.itemSpacing = 8;
    frame.cornerRadius = styleRadius(node, size === "lg" ? 12 : 8);
    frame.strokes = [{ type: "SOLID", color: rgb2(styleStroke(node, "#CBD5E1")) }];
    frame.strokeWeight = 1;
    frame.fills = [{ type: "SOLID", color: rgb2(styleFill(node, "#F8FAFC")) }];
    await addLabel(
      frame,
      node.text || node.component || "Component",
      styleText(node, "#0F172A"),
      "MIN",
      styleFontSize(node, size === "lg" ? 15 : size === "sm" ? 13 : 14),
      styleFontWeight(node, "regular"),
      styleLineHeight(node, size === "lg" ? 22 : size === "sm" ? 18 : 20)
    );
    return frame;
  };
  var createTabsNode = async (node) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
    if (node.component === "Tab") {
      const frame2 = figma.createFrame();
      frame2.name = node.name;
      frame2.resize(Math.max(styleMinWidth(node, 96), node.width), Math.max(1, node.height));
      frame2.x = node.x;
      frame2.y = node.y;
      frame2.layoutMode = "VERTICAL";
      frame2.primaryAxisAlignItems = "CENTER";
      frame2.counterAxisAlignItems = "CENTER";
      frame2.itemSpacing = 8;
      frame2.paddingLeft = 12;
      frame2.paddingRight = 12;
      frame2.paddingTop = 8;
      frame2.paddingBottom = 0;
      frame2.fills = [];
      frame2.strokes = [];
      const disabled = ((_a = node.variant) == null ? void 0 : _a.disabled) === true;
      const title = typeof ((_b = node.variant) == null ? void 0 : _b.title) === "string" ? node.variant.title : typeof ((_c = node.variant) == null ? void 0 : _c.children) === "string" ? node.variant.children : node.text || "Tab";
      await addLabel(frame2, title, disabled ? "#98A2B3" : "#12141A", "CENTER", 14, disabled ? "regular" : "medium", 20);
      const line = figma.createRectangle();
      line.resize(Math.max(20, Math.round(title.length * 6)), 2);
      line.cornerRadius = 999;
      line.fills = [{ type: "SOLID", color: rgb2(disabled ? "#E4E7EC" : "#1677FF") }];
      line.strokes = [];
      frame2.appendChild(line);
      return frame2;
    }
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(240, node.width), Math.max(72, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "VERTICAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "MIN";
    frame.itemSpacing = 12;
    frame.paddingLeft = stylePaddingX(node, 0);
    frame.paddingRight = stylePaddingX(node, 0);
    frame.paddingTop = stylePaddingY(node, 0);
    frame.paddingBottom = stylePaddingY(node, 0);
    frame.fills = [{ type: "SOLID", color: rgb2(styleFill(node, "#FFFFFF")) }];
    frame.strokes = [];
    const row = figma.createFrame();
    row.name = `${node.name} / nav`;
    row.layoutMode = "HORIZONTAL";
    row.primaryAxisAlignItems = "MIN";
    row.counterAxisAlignItems = "MIN";
    row.itemSpacing = 8;
    row.fills = [];
    row.strokes = [];
    row.layoutAlign = "STRETCH";
    if (((_d = node.variant) == null ? void 0 : _d.direction) === "rtl") {
      row.primaryAxisAlignItems = "MAX";
    }
    const tabs = parseTabChildren(typeof ((_e = node.variant) == null ? void 0 : _e.children) === "string" ? node.variant.children : node.text);
    const activeKey = typeof ((_f = node.variant) == null ? void 0 : _f.activeKey) === "string" ? node.variant.activeKey : typeof ((_g = node.variant) == null ? void 0 : _g.defaultActiveKey) === "string" ? node.variant.defaultActiveKey : (_h = tabs[0]) == null ? void 0 : _h.key;
    const stretch = ((_i = node.variant) == null ? void 0 : _i.stretch) === true;
    const activeLineMode = typeof ((_j = node.variant) == null ? void 0 : _j.activeLineMode) === "string" ? node.variant.activeLineMode : "auto";
    const activeLineColor = typeof ((_k = node.variant) == null ? void 0 : _k["--active-line-color"]) === "string" ? node.variant["--active-line-color"] : "#1677FF";
    const itemWidth = stretch && tabs.length > 0 ? Math.max(72, Math.floor(node.width / tabs.length) - 8) : void 0;
    const rowChildren = ((_l = node.variant) == null ? void 0 : _l.direction) === "rtl" ? [...tabs].reverse() : tabs;
    for (const tab of rowChildren) {
      row.appendChild(
        await createSingleTabChip(tab.label, {
          active: tab.key === activeKey || tab.label === activeKey,
          width: itemWidth,
          activeLineMode,
          activeLineColor
        })
      );
    }
    frame.appendChild(row);
    const panel = figma.createFrame();
    panel.name = `${node.name} / panel`;
    panel.layoutMode = "VERTICAL";
    panel.primaryAxisAlignItems = "MIN";
    panel.counterAxisAlignItems = "MIN";
    panel.paddingLeft = 12;
    panel.paddingRight = 12;
    panel.paddingTop = 12;
    panel.paddingBottom = 12;
    panel.cornerRadius = 12;
    panel.strokeWeight = 1;
    panel.strokes = [{ type: "SOLID", color: rgb2("#E4E7EC") }];
    panel.fills = [{ type: "SOLID", color: rgb2("#FFFFFF") }];
    panel.layoutAlign = "STRETCH";
    const panelLabel = activeLineMode === "fixed" ? "Fixed active line" : activeLineMode === "full" ? "Full active line" : "Auto active line";
    await addLabel(panel, panelLabel, "#475467", "MIN", 13, "regular", 18);
    if (((_m = node.variant) == null ? void 0 : _m.autoScroll) === true) {
      const badge = await createInputMetaBadge("autoScroll", "#EEF4FF", "#175CD3");
      panel.appendChild(badge);
    }
    frame.appendChild(panel);
    return frame;
  };
  var createStatusMessageNode = async (node, kind) => {
    var _a;
    const tone = typeof ((_a = node.variant) == null ? void 0 : _a.tone) === "string" ? node.variant.tone : getVariantKey(node);
    const style = toneStyle(tone);
    const frame = await createSurfaceNode(node, style.fill, style.stroke, 12);
    frame.resize(
      Math.max(240, node.width),
      Math.max(
        kind === "alert" ? getSizeKey(node) === "lg" ? 88 : getSizeKey(node) === "sm" ? 64 : 72 : getSizeKey(node) === "lg" ? 64 : getSizeKey(node) === "sm" ? 48 : 56,
        node.height
      )
    );
    return frame;
  };
  var createStructuredRowNode = async (node) => {
    const frame = await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", 0);
    frame.resize(Math.max(240, node.width), Math.max(40, node.height));
    return frame;
  };
  var createSkeletonNode = (node) => {
    const rect = figma.createRectangle();
    rect.name = node.name;
    rect.resize(Math.max(40, node.width), Math.max(12, node.height));
    rect.x = node.x;
    rect.y = node.y;
    rect.cornerRadius = Math.min(12, node.height / 2);
    rect.fills = [{ type: "SOLID", color: rgb2("#E0E6EE") }];
    rect.strokes = [];
    return rect;
  };
  var createInstanceNode = async (node, theme = "core") => {
    if (node.component === "Textarea" || node.component === "TextArea") {
      return await createTextareaNode(node);
    }
    if (node.component === "Select" || node.component === "DatePicker" || node.component === "TimePicker") {
      return await createSelectNode(node);
    }
    if (node.component === "Input" || node.component === "TextField" || node.component === "SearchField" || node.component === "Autocomplete") {
      return await createInputNode(node);
    }
    if (node.component === "Button") {
      return await createButtonNode(node);
    }
    if (node.component === "IconButton") {
      return await createIconButtonNode(node);
    }
    if (node.component === "TextButton") {
      return await createTextButtonNode(node);
    }
    if (node.component === "FilterButton") {
      return await createFilterButtonNode(node);
    }
    if (node.component === "Checkbox") {
      return await createChoiceNode(node, "checkbox");
    }
    if (node.component === "Radio") {
      return await createChoiceNode(node, "radio");
    }
    if (node.component === "Switch") {
      return await createChoiceNode(node, "switch");
    }
    if (node.component === "Tag" || node.component === "ContentBadge" || node.component === "PushBadge") {
      return await createCompactPillNode(node, "subtle");
    }
    if (node.component === "Chip") {
      return await createCompactPillNode(node, "subtle");
    }
    if (node.component === "Badge" || node.component === "PlayBadge") {
      return await createCompactPillNode(node, "solid");
    }
    if (node.component === "Tabs" || node.component === "Tab") {
      return await createTabsNode(node);
    }
    if (node.component === "NavBar") {
      return await createNavBarNode(node);
    }
    if (node.component === "TabBar") {
      return await createTabBarNode(node);
    }
    if (node.component === "SegmentedControl") {
      return await createTabsNode(node);
    }
    if (node.component === "Card" || node.component === "Container") {
      return await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", node.component === "Card" ? 12 : 12);
    }
    if (node.component === "Dialog") {
      return await createDialogNode(node);
    }
    if (node.component === "Popup") {
      return await createPopupNode(node);
    }
    if (node.component === "Modal" || node.component === "Sheet" || node.component === "Popover" || node.component === "Panel" || node.component === "BottomSheet" || node.component === "Menu") {
      return await createSurfaceNode(node, "#FFFFFF", "#D7DEE8", 16);
    }
    if (node.component === "Tooltip") {
      return await createSurfaceNode(node, "#12141A", "#12141A", 8);
    }
    if (node.component === "List") {
      return await createListNode(node);
    }
    if (node.component === "Cell") {
      return await createCellNode(node);
    }
    if (node.component === "Table" || node.component === "ListRow" || node.component === "EmptyState" || node.component === "TableRow") {
      return await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", 12);
    }
    if (node.component === "MetadataRow") {
      return await createStructuredRowNode(node);
    }
    if (node.component === "Alert") {
      return await createStatusMessageNode(node, "alert");
    }
    if (node.component === "Toast") {
      return await createToastNode(node);
    }
    if (node.component === "Toolbar") {
      return await createSurfaceNode(node, "#FFFFFF", "#E5E7EB", 12);
    }
    if (node.component === "Pagination") {
      return await createPaginationNode(node);
    }
    if (node.component === "Form") {
      return await createFormNode(node);
    }
    if (node.component === "FormField" || node.component === "Label") {
      return await createSurfaceNode(node, "#FFFFFF", "#FFFFFF", 0);
    }
    if (node.component === "Snackbar" || node.component === "SectionMessage") {
      return await createStatusMessageNode(node, "toast");
    }
    if (node.component === "Divider") {
      return createDividerNode(node);
    }
    if (node.component === "Skeleton") {
      return createSkeletonNode(node);
    }
    if (node.component === "Spinner" || node.component === "Loading") {
      return createSpinnerNode(node);
    }
    if (node.component === "Progress" || node.component === "ProgressIndicator" || node.component === "ProgressTracker" || node.component === "Slider") {
      return createProgressNode(node);
    }
    return await createGenericInstanceNode(node);
  };

  // src/write/renderPayload.ts
  var INPUT_BLUEPRINT_KEY2 = "miterlab.blueprint.input.v1";
  var rgb3 = (hex) => {
    const normalized = hex.replace("#", "");
    const bigint = Number.parseInt(normalized, 16);
    return {
      r: (bigint >> 16 & 255) / 255,
      g: (bigint >> 8 & 255) / 255,
      b: (bigint & 255) / 255
    };
  };
  var createMetaText = async (value, x, y, color, size, weight) => {
    const font = await loadFont(weight);
    const text = figma.createText();
    text.fontName = font;
    text.characters = value;
    text.fontSize = size;
    text.fills = [{ type: "SOLID", color: rgb3(color) }];
    text.x = x;
    text.y = y;
    text.textAutoResize = "WIDTH_AND_HEIGHT";
    return text;
  };
  var createInputBlueprintPanel = async (blueprint, rootWidth, rootHeight) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
    const panel = figma.createFrame();
    panel.name = "input-blueprint-panel";
    panel.resize(Math.min(320, rootWidth - 32), 132);
    panel.x = Math.max(16, rootWidth - panel.width - 16);
    panel.y = Math.max(16, rootHeight - panel.height - 16);
    panel.cornerRadius = 12;
    panel.fills = [{ type: "SOLID", color: rgb3("#121417") }];
    panel.strokes = [{ type: "SOLID", color: rgb3("#2C333B") }];
    panel.strokeWeight = 1;
    const title = await createMetaText("Input Blueprint", 12, 10, "#EEF2F6", 12, "semibold");
    panel.appendChild(title);
    const source = await createMetaText(`source: ${blueprint.sourceComponentName}`, 12, 34, "#C8D0DA", 11, "regular");
    panel.appendChild(source);
    const metrics = (_a = blueprint.metrics) != null ? _a : {};
    const metricLine = `w ${(_b = metrics.width) != null ? _b : "-"} / h ${(_c = metrics.height) != null ? _c : "-"} / r ${(_d = metrics.radius) != null ? _d : "-"}`;
    panel.appendChild(await createMetaText(metricLine, 12, 54, "#98A2B3", 11, "regular"));
    const spacingLine = `p ${(_e = metrics.paddingTop) != null ? _e : "-"},${(_f = metrics.paddingRight) != null ? _f : "-"},${(_g = metrics.paddingBottom) != null ? _g : "-"},${(_h = metrics.paddingLeft) != null ? _h : "-"} / gap ${(_i = metrics.itemSpacing) != null ? _i : "-"}`;
    panel.appendChild(await createMetaText(spacingLine, 12, 72, "#98A2B3", 11, "regular"));
    const propertyKeys = (_l = (_k = (_j = blueprint.properties) == null ? void 0 : _j.keys) == null ? void 0 : _k.slice(0, 4).join(", ")) != null ? _l : "-";
    panel.appendChild(await createMetaText(`props: ${propertyKeys}`, 12, 90, "#98A2B3", 11, "regular"));
    return panel;
  };
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
    const frame = createFrameNode(__spreadProps(__spreadValues({}, root), { name: frameName }), theme);
    figma.currentPage.appendChild(frame);
    let createdNodeCount = 1;
    if (root.children && root.children.length > 0) {
      createdNodeCount += await renderChildren(frame, root.children, theme);
    }
    if (payload.document.screen === "input-inspection") {
      const blueprint = await figma.clientStorage.getAsync(INPUT_BLUEPRINT_KEY2);
      if (blueprint && typeof blueprint === "object") {
        const panel = await createInputBlueprintPanel(blueprint, frame.width, frame.height);
        frame.appendChild(panel);
        createdNodeCount += 1;
      }
    }
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    return {
      createdNodeCount,
      createdFrameName: frame.name
    };
  };

  // ../../artifacts/figma/core-families/mcp-payload.json
  var mcp_payload_default = {
    document: {
      name: "core-families screen",
      screen: "core-families",
      theme: "core"
    },
    nodes: [
      {
        id: "layout_1",
        type: "FRAME",
        name: "Core families Screen",
        x: 0,
        y: 0,
        width: 390,
        height: 1610,
        children: [
          {
            id: "layout_2",
            type: "FRAME",
            name: "header-section",
            x: 16,
            y: 40,
            width: 358,
            height: 100,
            children: [
              {
                id: "layout_3",
                type: "TEXT",
                name: "Text 1",
                x: 16,
                y: 40,
                width: 358,
                height: 32,
                text: "Core Families Inspection",
                variables: {
                  "text.color": "semantic.text.primary"
                },
                style: {
                  text: "text/heading/xl",
                  fill: "#1F2430"
                }
              }
            ]
          },
          {
            id: "layout_4",
            type: "FRAME",
            name: "content-section",
            x: 16,
            y: 116,
            width: 358,
            height: 100,
            children: [
              {
                id: "layout_5",
                type: "TEXT",
                name: "Text 2",
                x: 16,
                y: 116,
                width: 358,
                height: 24,
                text: "Button / size",
                variables: {
                  "text.color": "semantic.text.secondary"
                },
                style: {
                  text: "text/body/lg",
                  fill: "#5F6A7B"
                }
              },
              {
                id: "layout_6",
                type: "INSTANCE",
                name: "Mini",
                x: 16,
                y: 116,
                width: 88,
                height: 28,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 8,
                  paddingX: 10,
                  paddingY: 5,
                  gap: 4,
                  fontSize: 13,
                  lineHeight: 18,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "mini"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Mini"
              },
              {
                id: "layout_7",
                type: "INSTANCE",
                name: "Small",
                x: 16,
                y: 116,
                width: 88,
                height: 32,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 10,
                  paddingX: 12,
                  paddingY: 7,
                  gap: 4,
                  fontSize: 13,
                  lineHeight: 18,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "small"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Small"
              },
              {
                id: "layout_8",
                type: "INSTANCE",
                name: "Middle",
                x: 16,
                y: 116,
                width: 88,
                height: 36,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Middle"
              },
              {
                id: "layout_9",
                type: "INSTANCE",
                name: "Large",
                x: 16,
                y: 116,
                width: 88,
                height: 44,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 14,
                  paddingX: 20,
                  paddingY: 10,
                  gap: 6,
                  fontSize: 17,
                  lineHeight: 24,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "large"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Large"
              },
              {
                id: "layout_10",
                type: "TEXT",
                name: "Text 7",
                x: 16,
                y: 116,
                width: 358,
                height: 24,
                text: "Button / fill and color",
                variables: {
                  "text.color": "semantic.text.secondary"
                },
                style: {
                  text: "text/body/lg",
                  fill: "#5F6A7B"
                }
              },
              {
                id: "layout_11",
                type: "INSTANCE",
                name: "Primary Solid",
                x: 16,
                y: 116,
                width: 136,
                height: 36,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Primary Solid"
              },
              {
                id: "layout_12",
                type: "INSTANCE",
                name: "Default Outline",
                x: 16,
                y: 116,
                width: 152,
                height: 36,
                component: "Button",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "default",
                  fill: "outline",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/surface/default",
                  "container.border": "Semantic/border/default",
                  "label.color": "Semantic/text/primary"
                },
                text: "Default Outline"
              },
              {
                id: "layout_13",
                type: "INSTANCE",
                name: "Danger None",
                x: 16,
                y: 116,
                width: 120,
                height: 36,
                component: "Button",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#FFFFFF",
                  text: "#D34B4B",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "danger",
                  fill: "none",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/surface/default",
                  "container.border": "Semantic/surface/default",
                  "label.color": "Semantic/status/critical"
                },
                text: "Danger None"
              },
              {
                id: "layout_14",
                type: "INSTANCE",
                name: "Success Solid",
                x: 16,
                y: 116,
                width: 136,
                height: 36,
                component: "Button",
                style: {
                  fill: "#1A9B6D",
                  stroke: "#1A9B6D",
                  text: "#FFFFFF",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "success",
                  fill: "solid",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/status/success",
                  "container.border": "Semantic/status/success",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Success Solid"
              },
              {
                id: "layout_15",
                type: "TEXT",
                name: "Text 12",
                x: 16,
                y: 116,
                width: 358,
                height: 24,
                text: "Button / shape and state",
                variables: {
                  "text.color": "semantic.text.secondary"
                },
                style: {
                  text: "text/body/lg",
                  fill: "#5F6A7B"
                }
              },
              {
                id: "layout_16",
                type: "INSTANCE",
                name: "Default Shape",
                x: 16,
                y: 116,
                width: 136,
                height: 36,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  shape: "default",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Default Shape"
              },
              {
                id: "layout_17",
                type: "INSTANCE",
                name: "Rounded",
                x: 16,
                y: 116,
                width: 88,
                height: 36,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 999,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  shape: "rounded",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Rounded"
              },
              {
                id: "layout_18",
                type: "INSTANCE",
                name: "Rectangular",
                x: 16,
                y: 116,
                width: 120,
                height: 36,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 8,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  shape: "rectangular",
                  size: "middle"
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Rectangular"
              },
              {
                id: "layout_19",
                type: "INSTANCE",
                name: "Loading",
                x: 16,
                y: 116,
                width: 88,
                height: 36,
                component: "Button",
                style: {
                  fill: "#2458D9",
                  stroke: "#2458D9",
                  text: "#FFFFFF",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "middle",
                  loading: true,
                  loadingText: "Loading"
                },
                variables: {
                  "container.background": "Semantic/action/primaryHover",
                  "container.border": "Semantic/action/primaryHover",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Loading"
              },
              {
                id: "layout_20",
                type: "INSTANCE",
                name: "Disabled",
                x: 16,
                y: 116,
                width: 96,
                height: 36,
                component: "Button",
                style: {
                  fill: "#E0E6EE",
                  stroke: "#E0E6EE",
                  text: "#7E8A9C",
                  radius: 12,
                  paddingX: 16,
                  paddingY: 8,
                  gap: 6,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "middle",
                  disabled: true
                },
                variables: {
                  "container.background": "Semantic/action/disabled",
                  "container.border": "Semantic/action/disabled",
                  "label.color": "Semantic/text/muted"
                },
                text: "Disabled"
              },
              {
                id: "layout_21",
                type: "INSTANCE",
                name: "Block Button",
                x: 16,
                y: 116,
                width: 358,
                height: 44,
                component: "Button",
                style: {
                  fill: "#2E6CFF",
                  stroke: "#2E6CFF",
                  text: "#FFFFFF",
                  radius: 14,
                  paddingX: 20,
                  paddingY: 10,
                  gap: 6,
                  fontSize: 17,
                  lineHeight: 24,
                  fontWeight: "medium",
                  minWidth: 64
                },
                variant: {
                  color: "primary",
                  fill: "solid",
                  size: "large",
                  block: true
                },
                variables: {
                  "container.background": "Semantic/action/primary",
                  "container.border": "Semantic/action/primary",
                  "label.color": "Semantic/action/onPrimary"
                },
                text: "Block Button"
              }
            ]
          },
          {
            id: "layout_22",
            type: "FRAME",
            name: "form-section",
            x: 16,
            y: 984,
            width: 358,
            height: 100,
            children: [
              {
                id: "layout_23",
                type: "TEXT",
                name: "Text 19",
                x: 16,
                y: 984,
                width: 358,
                height: 24,
                text: "Input / text values",
                variables: {
                  "text.color": "semantic.text.secondary"
                },
                style: {
                  text: "text/body/lg",
                  fill: "#5F6A7B"
                }
              },
              {
                id: "layout_24",
                type: "INSTANCE",
                name: "Placeholder only",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  placeholder: "Type here"
                },
                variables: {
                  "field.background": "Semantic/surface/default",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/primary",
                  "placeholder.color": "Semantic/text/muted"
                }
              },
              {
                id: "layout_25",
                type: "INSTANCE",
                name: "Value",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  value: "Current value"
                },
                variables: {
                  "field.background": "Semantic/surface/default",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/primary",
                  "placeholder.color": "Semantic/text/muted"
                },
                text: "Current value"
              },
              {
                id: "layout_26",
                type: "INSTANCE",
                name: "Default value",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  defaultValue: "Seed value"
                },
                variables: {
                  "field.background": "Semantic/surface/default",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/primary",
                  "placeholder.color": "Semantic/text/muted"
                },
                text: "Seed value"
              },
              {
                id: "layout_27",
                type: "TEXT",
                name: "Text 23",
                x: 16,
                y: 984,
                width: 358,
                height: 24,
                text: "Input / interaction props",
                variables: {
                  "text.color": "semantic.text.secondary"
                },
                style: {
                  text: "text/body/lg",
                  fill: "#5F6A7B"
                }
              },
              {
                id: "layout_28",
                type: "INSTANCE",
                name: "Disabled field",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#EEF1F5",
                  stroke: "#EEF1F5",
                  text: "#7E8A9C",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  disabled: true,
                  placeholder: "Disabled placeholder"
                },
                variables: {
                  "field.background": "Semantic/surface/subtle",
                  "field.border": "Semantic/border/subtle",
                  "value.color": "Semantic/text/muted",
                  "placeholder.color": "Semantic/text/muted"
                }
              },
              {
                id: "layout_29",
                type: "INSTANCE",
                name: "Read only field",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#EEF1F5",
                  stroke: "#E0E6EE",
                  text: "#5F6A7B",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  readOnly: true,
                  value: "Read only"
                },
                variables: {
                  "field.background": "Semantic/surface/subtle",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/secondary",
                  "placeholder.color": "Semantic/text/muted"
                },
                text: "Read only"
              },
              {
                id: "layout_30",
                type: "INSTANCE",
                name: "Clearable",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  clearable: true,
                  value: "Clear me"
                },
                variables: {
                  "field.background": "Semantic/surface/default",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/primary",
                  "placeholder.color": "Semantic/text/muted"
                },
                text: "Clear me"
              },
              {
                id: "layout_31",
                type: "INSTANCE",
                name: "Clear on focus only",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  clearable: true,
                  value: "Focus clear",
                  onlyShowClearWhenFocus: true
                },
                variables: {
                  "field.background": "Semantic/surface/default",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/primary",
                  "placeholder.color": "Semantic/text/muted"
                },
                text: "Focus clear"
              },
              {
                id: "layout_32",
                type: "INSTANCE",
                name: "Password",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  value: "secret123",
                  type: "password"
                },
                variables: {
                  "field.background": "Semantic/surface/default",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/primary",
                  "placeholder.color": "Semantic/text/muted"
                },
                text: "secret123"
              },
              {
                id: "layout_33",
                type: "INSTANCE",
                name: "Number",
                x: 16,
                y: 984,
                width: 358,
                height: 42,
                component: "Input",
                style: {
                  fill: "#FFFFFF",
                  stroke: "#E0E6EE",
                  text: "#1F2430",
                  paddingY: 9,
                  fontSize: 15,
                  lineHeight: 22,
                  fontWeight: "regular",
                  minWidth: 220
                },
                variant: {
                  value: "12",
                  step: 1,
                  min: 0,
                  max: 20,
                  type: "number"
                },
                variables: {
                  "field.background": "Semantic/surface/default",
                  "field.border": "Semantic/border/default",
                  "value.color": "Semantic/text/primary",
                  "placeholder.color": "Semantic/text/muted"
                },
                text: "12"
              }
            ]
          }
        ]
      },
      {
        id: "layout_2",
        type: "FRAME",
        name: "header-section",
        x: 16,
        y: 40,
        width: 358,
        height: 100,
        children: [
          {
            id: "layout_3",
            type: "TEXT",
            name: "Text 1",
            x: 16,
            y: 40,
            width: 358,
            height: 32,
            text: "Core Families Inspection",
            variables: {
              "text.color": "semantic.text.primary"
            },
            style: {
              text: "text/heading/xl",
              fill: "#1F2430"
            }
          }
        ]
      },
      {
        id: "layout_3",
        type: "TEXT",
        name: "Text 1",
        x: 16,
        y: 40,
        width: 358,
        height: 32,
        text: "Core Families Inspection",
        variables: {
          "text.color": "semantic.text.primary"
        },
        style: {
          text: "text/heading/xl",
          fill: "#1F2430"
        }
      },
      {
        id: "layout_4",
        type: "FRAME",
        name: "content-section",
        x: 16,
        y: 116,
        width: 358,
        height: 100,
        children: [
          {
            id: "layout_5",
            type: "TEXT",
            name: "Text 2",
            x: 16,
            y: 116,
            width: 358,
            height: 24,
            text: "Button / size",
            variables: {
              "text.color": "semantic.text.secondary"
            },
            style: {
              text: "text/body/lg",
              fill: "#5F6A7B"
            }
          },
          {
            id: "layout_6",
            type: "INSTANCE",
            name: "Mini",
            x: 16,
            y: 116,
            width: 88,
            height: 28,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 8,
              paddingX: 10,
              paddingY: 5,
              gap: 4,
              fontSize: 13,
              lineHeight: 18,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "mini"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Mini"
          },
          {
            id: "layout_7",
            type: "INSTANCE",
            name: "Small",
            x: 16,
            y: 116,
            width: 88,
            height: 32,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 10,
              paddingX: 12,
              paddingY: 7,
              gap: 4,
              fontSize: 13,
              lineHeight: 18,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "small"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Small"
          },
          {
            id: "layout_8",
            type: "INSTANCE",
            name: "Middle",
            x: 16,
            y: 116,
            width: 88,
            height: 36,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Middle"
          },
          {
            id: "layout_9",
            type: "INSTANCE",
            name: "Large",
            x: 16,
            y: 116,
            width: 88,
            height: 44,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 14,
              paddingX: 20,
              paddingY: 10,
              gap: 6,
              fontSize: 17,
              lineHeight: 24,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "large"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Large"
          },
          {
            id: "layout_10",
            type: "TEXT",
            name: "Text 7",
            x: 16,
            y: 116,
            width: 358,
            height: 24,
            text: "Button / fill and color",
            variables: {
              "text.color": "semantic.text.secondary"
            },
            style: {
              text: "text/body/lg",
              fill: "#5F6A7B"
            }
          },
          {
            id: "layout_11",
            type: "INSTANCE",
            name: "Primary Solid",
            x: 16,
            y: 116,
            width: 136,
            height: 36,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Primary Solid"
          },
          {
            id: "layout_12",
            type: "INSTANCE",
            name: "Default Outline",
            x: 16,
            y: 116,
            width: 152,
            height: 36,
            component: "Button",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "default",
              fill: "outline",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/surface/default",
              "container.border": "Semantic/border/default",
              "label.color": "Semantic/text/primary"
            },
            text: "Default Outline"
          },
          {
            id: "layout_13",
            type: "INSTANCE",
            name: "Danger None",
            x: 16,
            y: 116,
            width: 120,
            height: 36,
            component: "Button",
            style: {
              fill: "#FFFFFF",
              stroke: "#FFFFFF",
              text: "#D34B4B",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "danger",
              fill: "none",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/surface/default",
              "container.border": "Semantic/surface/default",
              "label.color": "Semantic/status/critical"
            },
            text: "Danger None"
          },
          {
            id: "layout_14",
            type: "INSTANCE",
            name: "Success Solid",
            x: 16,
            y: 116,
            width: 136,
            height: 36,
            component: "Button",
            style: {
              fill: "#1A9B6D",
              stroke: "#1A9B6D",
              text: "#FFFFFF",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "success",
              fill: "solid",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/status/success",
              "container.border": "Semantic/status/success",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Success Solid"
          },
          {
            id: "layout_15",
            type: "TEXT",
            name: "Text 12",
            x: 16,
            y: 116,
            width: 358,
            height: 24,
            text: "Button / shape and state",
            variables: {
              "text.color": "semantic.text.secondary"
            },
            style: {
              text: "text/body/lg",
              fill: "#5F6A7B"
            }
          },
          {
            id: "layout_16",
            type: "INSTANCE",
            name: "Default Shape",
            x: 16,
            y: 116,
            width: 136,
            height: 36,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              shape: "default",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Default Shape"
          },
          {
            id: "layout_17",
            type: "INSTANCE",
            name: "Rounded",
            x: 16,
            y: 116,
            width: 88,
            height: 36,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 999,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              shape: "rounded",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Rounded"
          },
          {
            id: "layout_18",
            type: "INSTANCE",
            name: "Rectangular",
            x: 16,
            y: 116,
            width: 120,
            height: 36,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 8,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              shape: "rectangular",
              size: "middle"
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Rectangular"
          },
          {
            id: "layout_19",
            type: "INSTANCE",
            name: "Loading",
            x: 16,
            y: 116,
            width: 88,
            height: 36,
            component: "Button",
            style: {
              fill: "#2458D9",
              stroke: "#2458D9",
              text: "#FFFFFF",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "middle",
              loading: true,
              loadingText: "Loading"
            },
            variables: {
              "container.background": "Semantic/action/primaryHover",
              "container.border": "Semantic/action/primaryHover",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Loading"
          },
          {
            id: "layout_20",
            type: "INSTANCE",
            name: "Disabled",
            x: 16,
            y: 116,
            width: 96,
            height: 36,
            component: "Button",
            style: {
              fill: "#E0E6EE",
              stroke: "#E0E6EE",
              text: "#7E8A9C",
              radius: 12,
              paddingX: 16,
              paddingY: 8,
              gap: 6,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "middle",
              disabled: true
            },
            variables: {
              "container.background": "Semantic/action/disabled",
              "container.border": "Semantic/action/disabled",
              "label.color": "Semantic/text/muted"
            },
            text: "Disabled"
          },
          {
            id: "layout_21",
            type: "INSTANCE",
            name: "Block Button",
            x: 16,
            y: 116,
            width: 358,
            height: 44,
            component: "Button",
            style: {
              fill: "#2E6CFF",
              stroke: "#2E6CFF",
              text: "#FFFFFF",
              radius: 14,
              paddingX: 20,
              paddingY: 10,
              gap: 6,
              fontSize: 17,
              lineHeight: 24,
              fontWeight: "medium",
              minWidth: 64
            },
            variant: {
              color: "primary",
              fill: "solid",
              size: "large",
              block: true
            },
            variables: {
              "container.background": "Semantic/action/primary",
              "container.border": "Semantic/action/primary",
              "label.color": "Semantic/action/onPrimary"
            },
            text: "Block Button"
          }
        ]
      },
      {
        id: "layout_5",
        type: "TEXT",
        name: "Text 2",
        x: 16,
        y: 116,
        width: 358,
        height: 24,
        text: "Button / size",
        variables: {
          "text.color": "semantic.text.secondary"
        },
        style: {
          text: "text/body/lg",
          fill: "#5F6A7B"
        }
      },
      {
        id: "layout_6",
        type: "INSTANCE",
        name: "Mini",
        x: 16,
        y: 116,
        width: 88,
        height: 28,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 8,
          paddingX: 10,
          paddingY: 5,
          gap: 4,
          fontSize: 13,
          lineHeight: 18,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "mini"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Mini"
      },
      {
        id: "layout_7",
        type: "INSTANCE",
        name: "Small",
        x: 16,
        y: 116,
        width: 88,
        height: 32,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 10,
          paddingX: 12,
          paddingY: 7,
          gap: 4,
          fontSize: 13,
          lineHeight: 18,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "small"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Small"
      },
      {
        id: "layout_8",
        type: "INSTANCE",
        name: "Middle",
        x: 16,
        y: 116,
        width: 88,
        height: 36,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Middle"
      },
      {
        id: "layout_9",
        type: "INSTANCE",
        name: "Large",
        x: 16,
        y: 116,
        width: 88,
        height: 44,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 14,
          paddingX: 20,
          paddingY: 10,
          gap: 6,
          fontSize: 17,
          lineHeight: 24,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "large"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Large"
      },
      {
        id: "layout_10",
        type: "TEXT",
        name: "Text 7",
        x: 16,
        y: 116,
        width: 358,
        height: 24,
        text: "Button / fill and color",
        variables: {
          "text.color": "semantic.text.secondary"
        },
        style: {
          text: "text/body/lg",
          fill: "#5F6A7B"
        }
      },
      {
        id: "layout_11",
        type: "INSTANCE",
        name: "Primary Solid",
        x: 16,
        y: 116,
        width: 136,
        height: 36,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Primary Solid"
      },
      {
        id: "layout_12",
        type: "INSTANCE",
        name: "Default Outline",
        x: 16,
        y: 116,
        width: 152,
        height: 36,
        component: "Button",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "default",
          fill: "outline",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/surface/default",
          "container.border": "Semantic/border/default",
          "label.color": "Semantic/text/primary"
        },
        text: "Default Outline"
      },
      {
        id: "layout_13",
        type: "INSTANCE",
        name: "Danger None",
        x: 16,
        y: 116,
        width: 120,
        height: 36,
        component: "Button",
        style: {
          fill: "#FFFFFF",
          stroke: "#FFFFFF",
          text: "#D34B4B",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "danger",
          fill: "none",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/surface/default",
          "container.border": "Semantic/surface/default",
          "label.color": "Semantic/status/critical"
        },
        text: "Danger None"
      },
      {
        id: "layout_14",
        type: "INSTANCE",
        name: "Success Solid",
        x: 16,
        y: 116,
        width: 136,
        height: 36,
        component: "Button",
        style: {
          fill: "#1A9B6D",
          stroke: "#1A9B6D",
          text: "#FFFFFF",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "success",
          fill: "solid",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/status/success",
          "container.border": "Semantic/status/success",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Success Solid"
      },
      {
        id: "layout_15",
        type: "TEXT",
        name: "Text 12",
        x: 16,
        y: 116,
        width: 358,
        height: 24,
        text: "Button / shape and state",
        variables: {
          "text.color": "semantic.text.secondary"
        },
        style: {
          text: "text/body/lg",
          fill: "#5F6A7B"
        }
      },
      {
        id: "layout_16",
        type: "INSTANCE",
        name: "Default Shape",
        x: 16,
        y: 116,
        width: 136,
        height: 36,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          shape: "default",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Default Shape"
      },
      {
        id: "layout_17",
        type: "INSTANCE",
        name: "Rounded",
        x: 16,
        y: 116,
        width: 88,
        height: 36,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 999,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          shape: "rounded",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Rounded"
      },
      {
        id: "layout_18",
        type: "INSTANCE",
        name: "Rectangular",
        x: 16,
        y: 116,
        width: 120,
        height: 36,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 8,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          shape: "rectangular",
          size: "middle"
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Rectangular"
      },
      {
        id: "layout_19",
        type: "INSTANCE",
        name: "Loading",
        x: 16,
        y: 116,
        width: 88,
        height: 36,
        component: "Button",
        style: {
          fill: "#2458D9",
          stroke: "#2458D9",
          text: "#FFFFFF",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle",
          loading: true,
          loadingText: "Loading"
        },
        variables: {
          "container.background": "Semantic/action/primaryHover",
          "container.border": "Semantic/action/primaryHover",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Loading"
      },
      {
        id: "layout_20",
        type: "INSTANCE",
        name: "Disabled",
        x: 16,
        y: 116,
        width: 96,
        height: 36,
        component: "Button",
        style: {
          fill: "#E0E6EE",
          stroke: "#E0E6EE",
          text: "#7E8A9C",
          radius: 12,
          paddingX: 16,
          paddingY: 8,
          gap: 6,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle",
          disabled: true
        },
        variables: {
          "container.background": "Semantic/action/disabled",
          "container.border": "Semantic/action/disabled",
          "label.color": "Semantic/text/muted"
        },
        text: "Disabled"
      },
      {
        id: "layout_21",
        type: "INSTANCE",
        name: "Block Button",
        x: 16,
        y: 116,
        width: 358,
        height: 44,
        component: "Button",
        style: {
          fill: "#2E6CFF",
          stroke: "#2E6CFF",
          text: "#FFFFFF",
          radius: 14,
          paddingX: 20,
          paddingY: 10,
          gap: 6,
          fontSize: 17,
          lineHeight: 24,
          fontWeight: "medium",
          minWidth: 64
        },
        variant: {
          color: "primary",
          fill: "solid",
          size: "large",
          block: true
        },
        variables: {
          "container.background": "Semantic/action/primary",
          "container.border": "Semantic/action/primary",
          "label.color": "Semantic/action/onPrimary"
        },
        text: "Block Button"
      },
      {
        id: "layout_22",
        type: "FRAME",
        name: "form-section",
        x: 16,
        y: 984,
        width: 358,
        height: 100,
        children: [
          {
            id: "layout_23",
            type: "TEXT",
            name: "Text 19",
            x: 16,
            y: 984,
            width: 358,
            height: 24,
            text: "Input / text values",
            variables: {
              "text.color": "semantic.text.secondary"
            },
            style: {
              text: "text/body/lg",
              fill: "#5F6A7B"
            }
          },
          {
            id: "layout_24",
            type: "INSTANCE",
            name: "Placeholder only",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              placeholder: "Type here"
            },
            variables: {
              "field.background": "Semantic/surface/default",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/primary",
              "placeholder.color": "Semantic/text/muted"
            }
          },
          {
            id: "layout_25",
            type: "INSTANCE",
            name: "Value",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              value: "Current value"
            },
            variables: {
              "field.background": "Semantic/surface/default",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/primary",
              "placeholder.color": "Semantic/text/muted"
            },
            text: "Current value"
          },
          {
            id: "layout_26",
            type: "INSTANCE",
            name: "Default value",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              defaultValue: "Seed value"
            },
            variables: {
              "field.background": "Semantic/surface/default",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/primary",
              "placeholder.color": "Semantic/text/muted"
            },
            text: "Seed value"
          },
          {
            id: "layout_27",
            type: "TEXT",
            name: "Text 23",
            x: 16,
            y: 984,
            width: 358,
            height: 24,
            text: "Input / interaction props",
            variables: {
              "text.color": "semantic.text.secondary"
            },
            style: {
              text: "text/body/lg",
              fill: "#5F6A7B"
            }
          },
          {
            id: "layout_28",
            type: "INSTANCE",
            name: "Disabled field",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#EEF1F5",
              stroke: "#EEF1F5",
              text: "#7E8A9C",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              disabled: true,
              placeholder: "Disabled placeholder"
            },
            variables: {
              "field.background": "Semantic/surface/subtle",
              "field.border": "Semantic/border/subtle",
              "value.color": "Semantic/text/muted",
              "placeholder.color": "Semantic/text/muted"
            }
          },
          {
            id: "layout_29",
            type: "INSTANCE",
            name: "Read only field",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#EEF1F5",
              stroke: "#E0E6EE",
              text: "#5F6A7B",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              readOnly: true,
              value: "Read only"
            },
            variables: {
              "field.background": "Semantic/surface/subtle",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/secondary",
              "placeholder.color": "Semantic/text/muted"
            },
            text: "Read only"
          },
          {
            id: "layout_30",
            type: "INSTANCE",
            name: "Clearable",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              clearable: true,
              value: "Clear me"
            },
            variables: {
              "field.background": "Semantic/surface/default",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/primary",
              "placeholder.color": "Semantic/text/muted"
            },
            text: "Clear me"
          },
          {
            id: "layout_31",
            type: "INSTANCE",
            name: "Clear on focus only",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              clearable: true,
              value: "Focus clear",
              onlyShowClearWhenFocus: true
            },
            variables: {
              "field.background": "Semantic/surface/default",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/primary",
              "placeholder.color": "Semantic/text/muted"
            },
            text: "Focus clear"
          },
          {
            id: "layout_32",
            type: "INSTANCE",
            name: "Password",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              value: "secret123",
              type: "password"
            },
            variables: {
              "field.background": "Semantic/surface/default",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/primary",
              "placeholder.color": "Semantic/text/muted"
            },
            text: "secret123"
          },
          {
            id: "layout_33",
            type: "INSTANCE",
            name: "Number",
            x: 16,
            y: 984,
            width: 358,
            height: 42,
            component: "Input",
            style: {
              fill: "#FFFFFF",
              stroke: "#E0E6EE",
              text: "#1F2430",
              paddingY: 9,
              fontSize: 15,
              lineHeight: 22,
              fontWeight: "regular",
              minWidth: 220
            },
            variant: {
              value: "12",
              step: 1,
              min: 0,
              max: 20,
              type: "number"
            },
            variables: {
              "field.background": "Semantic/surface/default",
              "field.border": "Semantic/border/default",
              "value.color": "Semantic/text/primary",
              "placeholder.color": "Semantic/text/muted"
            },
            text: "12"
          }
        ]
      },
      {
        id: "layout_23",
        type: "TEXT",
        name: "Text 19",
        x: 16,
        y: 984,
        width: 358,
        height: 24,
        text: "Input / text values",
        variables: {
          "text.color": "semantic.text.secondary"
        },
        style: {
          text: "text/body/lg",
          fill: "#5F6A7B"
        }
      },
      {
        id: "layout_24",
        type: "INSTANCE",
        name: "Placeholder only",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          placeholder: "Type here"
        },
        variables: {
          "field.background": "Semantic/surface/default",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/primary",
          "placeholder.color": "Semantic/text/muted"
        }
      },
      {
        id: "layout_25",
        type: "INSTANCE",
        name: "Value",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          value: "Current value"
        },
        variables: {
          "field.background": "Semantic/surface/default",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/primary",
          "placeholder.color": "Semantic/text/muted"
        },
        text: "Current value"
      },
      {
        id: "layout_26",
        type: "INSTANCE",
        name: "Default value",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          defaultValue: "Seed value"
        },
        variables: {
          "field.background": "Semantic/surface/default",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/primary",
          "placeholder.color": "Semantic/text/muted"
        },
        text: "Seed value"
      },
      {
        id: "layout_27",
        type: "TEXT",
        name: "Text 23",
        x: 16,
        y: 984,
        width: 358,
        height: 24,
        text: "Input / interaction props",
        variables: {
          "text.color": "semantic.text.secondary"
        },
        style: {
          text: "text/body/lg",
          fill: "#5F6A7B"
        }
      },
      {
        id: "layout_28",
        type: "INSTANCE",
        name: "Disabled field",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#EEF1F5",
          stroke: "#EEF1F5",
          text: "#7E8A9C",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          disabled: true,
          placeholder: "Disabled placeholder"
        },
        variables: {
          "field.background": "Semantic/surface/subtle",
          "field.border": "Semantic/border/subtle",
          "value.color": "Semantic/text/muted",
          "placeholder.color": "Semantic/text/muted"
        }
      },
      {
        id: "layout_29",
        type: "INSTANCE",
        name: "Read only field",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#EEF1F5",
          stroke: "#E0E6EE",
          text: "#5F6A7B",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          readOnly: true,
          value: "Read only"
        },
        variables: {
          "field.background": "Semantic/surface/subtle",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/secondary",
          "placeholder.color": "Semantic/text/muted"
        },
        text: "Read only"
      },
      {
        id: "layout_30",
        type: "INSTANCE",
        name: "Clearable",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          clearable: true,
          value: "Clear me"
        },
        variables: {
          "field.background": "Semantic/surface/default",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/primary",
          "placeholder.color": "Semantic/text/muted"
        },
        text: "Clear me"
      },
      {
        id: "layout_31",
        type: "INSTANCE",
        name: "Clear on focus only",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          clearable: true,
          value: "Focus clear",
          onlyShowClearWhenFocus: true
        },
        variables: {
          "field.background": "Semantic/surface/default",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/primary",
          "placeholder.color": "Semantic/text/muted"
        },
        text: "Focus clear"
      },
      {
        id: "layout_32",
        type: "INSTANCE",
        name: "Password",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          value: "secret123",
          type: "password"
        },
        variables: {
          "field.background": "Semantic/surface/default",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/primary",
          "placeholder.color": "Semantic/text/muted"
        },
        text: "secret123"
      },
      {
        id: "layout_33",
        type: "INSTANCE",
        name: "Number",
        x: 16,
        y: 984,
        width: 358,
        height: 42,
        component: "Input",
        style: {
          fill: "#FFFFFF",
          stroke: "#E0E6EE",
          text: "#1F2430",
          paddingY: 9,
          fontSize: 15,
          lineHeight: 22,
          fontWeight: "regular",
          minWidth: 220
        },
        variant: {
          value: "12",
          step: 1,
          min: 0,
          max: 20,
          type: "number"
        },
        variables: {
          "field.background": "Semantic/surface/default",
          "field.border": "Semantic/border/default",
          "value.color": "Semantic/text/primary",
          "placeholder.color": "Semantic/text/muted"
        },
        text: "12"
      }
    ],
    frames: [
      {
        id: "layout_1",
        name: "Core families Screen"
      },
      {
        id: "layout_2",
        name: "header-section"
      },
      {
        id: "layout_4",
        name: "content-section"
      },
      {
        id: "layout_22",
        name: "form-section"
      }
    ],
    components: [
      {
        id: "layout_6",
        name: "Mini",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "mini"
        }
      },
      {
        id: "layout_7",
        name: "Small",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "small"
        }
      },
      {
        id: "layout_8",
        name: "Middle",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle"
        }
      },
      {
        id: "layout_9",
        name: "Large",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "large"
        }
      },
      {
        id: "layout_11",
        name: "Primary Solid",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle"
        }
      },
      {
        id: "layout_12",
        name: "Default Outline",
        component: "Button",
        variant: {
          color: "default",
          fill: "outline",
          size: "middle"
        }
      },
      {
        id: "layout_13",
        name: "Danger None",
        component: "Button",
        variant: {
          color: "danger",
          fill: "none",
          size: "middle"
        }
      },
      {
        id: "layout_14",
        name: "Success Solid",
        component: "Button",
        variant: {
          color: "success",
          fill: "solid",
          size: "middle"
        }
      },
      {
        id: "layout_16",
        name: "Default Shape",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          shape: "default",
          size: "middle"
        }
      },
      {
        id: "layout_17",
        name: "Rounded",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          shape: "rounded",
          size: "middle"
        }
      },
      {
        id: "layout_18",
        name: "Rectangular",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          shape: "rectangular",
          size: "middle"
        }
      },
      {
        id: "layout_19",
        name: "Loading",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle",
          loading: true,
          loadingText: "Loading"
        }
      },
      {
        id: "layout_20",
        name: "Disabled",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "middle",
          disabled: true
        }
      },
      {
        id: "layout_21",
        name: "Block Button",
        component: "Button",
        variant: {
          color: "primary",
          fill: "solid",
          size: "large",
          block: true
        }
      },
      {
        id: "layout_24",
        name: "Placeholder only",
        component: "Input",
        variant: {
          placeholder: "Type here"
        }
      },
      {
        id: "layout_25",
        name: "Value",
        component: "Input",
        variant: {
          value: "Current value"
        }
      },
      {
        id: "layout_26",
        name: "Default value",
        component: "Input",
        variant: {
          defaultValue: "Seed value"
        }
      },
      {
        id: "layout_28",
        name: "Disabled field",
        component: "Input",
        variant: {
          disabled: true,
          placeholder: "Disabled placeholder"
        }
      },
      {
        id: "layout_29",
        name: "Read only field",
        component: "Input",
        variant: {
          readOnly: true,
          value: "Read only"
        }
      },
      {
        id: "layout_30",
        name: "Clearable",
        component: "Input",
        variant: {
          clearable: true,
          value: "Clear me"
        }
      },
      {
        id: "layout_31",
        name: "Clear on focus only",
        component: "Input",
        variant: {
          clearable: true,
          value: "Focus clear",
          onlyShowClearWhenFocus: true
        }
      },
      {
        id: "layout_32",
        name: "Password",
        component: "Input",
        variant: {
          value: "secret123",
          type: "password"
        }
      },
      {
        id: "layout_33",
        name: "Number",
        component: "Input",
        variant: {
          value: "12",
          step: 1,
          min: 0,
          max: 20,
          type: "number"
        }
      }
    ],
    variables: {
      "layout_3.text.color": "semantic.text.primary",
      "layout_5.text.color": "semantic.text.secondary",
      "layout_6.container.background": "Semantic/action/primary",
      "layout_6.container.border": "Semantic/action/primary",
      "layout_6.label.color": "Semantic/action/onPrimary",
      "layout_7.container.background": "Semantic/action/primary",
      "layout_7.container.border": "Semantic/action/primary",
      "layout_7.label.color": "Semantic/action/onPrimary",
      "layout_8.container.background": "Semantic/action/primary",
      "layout_8.container.border": "Semantic/action/primary",
      "layout_8.label.color": "Semantic/action/onPrimary",
      "layout_9.container.background": "Semantic/action/primary",
      "layout_9.container.border": "Semantic/action/primary",
      "layout_9.label.color": "Semantic/action/onPrimary",
      "layout_10.text.color": "semantic.text.secondary",
      "layout_11.container.background": "Semantic/action/primary",
      "layout_11.container.border": "Semantic/action/primary",
      "layout_11.label.color": "Semantic/action/onPrimary",
      "layout_12.container.background": "Semantic/surface/default",
      "layout_12.container.border": "Semantic/border/default",
      "layout_12.label.color": "Semantic/text/primary",
      "layout_13.container.background": "Semantic/surface/default",
      "layout_13.container.border": "Semantic/surface/default",
      "layout_13.label.color": "Semantic/status/critical",
      "layout_14.container.background": "Semantic/status/success",
      "layout_14.container.border": "Semantic/status/success",
      "layout_14.label.color": "Semantic/action/onPrimary",
      "layout_15.text.color": "semantic.text.secondary",
      "layout_16.container.background": "Semantic/action/primary",
      "layout_16.container.border": "Semantic/action/primary",
      "layout_16.label.color": "Semantic/action/onPrimary",
      "layout_17.container.background": "Semantic/action/primary",
      "layout_17.container.border": "Semantic/action/primary",
      "layout_17.label.color": "Semantic/action/onPrimary",
      "layout_18.container.background": "Semantic/action/primary",
      "layout_18.container.border": "Semantic/action/primary",
      "layout_18.label.color": "Semantic/action/onPrimary",
      "layout_19.container.background": "Semantic/action/primaryHover",
      "layout_19.container.border": "Semantic/action/primaryHover",
      "layout_19.label.color": "Semantic/action/onPrimary",
      "layout_20.container.background": "Semantic/action/disabled",
      "layout_20.container.border": "Semantic/action/disabled",
      "layout_20.label.color": "Semantic/text/muted",
      "layout_21.container.background": "Semantic/action/primary",
      "layout_21.container.border": "Semantic/action/primary",
      "layout_21.label.color": "Semantic/action/onPrimary",
      "layout_23.text.color": "semantic.text.secondary",
      "layout_24.field.background": "Semantic/surface/default",
      "layout_24.field.border": "Semantic/border/default",
      "layout_24.value.color": "Semantic/text/primary",
      "layout_24.placeholder.color": "Semantic/text/muted",
      "layout_25.field.background": "Semantic/surface/default",
      "layout_25.field.border": "Semantic/border/default",
      "layout_25.value.color": "Semantic/text/primary",
      "layout_25.placeholder.color": "Semantic/text/muted",
      "layout_26.field.background": "Semantic/surface/default",
      "layout_26.field.border": "Semantic/border/default",
      "layout_26.value.color": "Semantic/text/primary",
      "layout_26.placeholder.color": "Semantic/text/muted",
      "layout_27.text.color": "semantic.text.secondary",
      "layout_28.field.background": "Semantic/surface/subtle",
      "layout_28.field.border": "Semantic/border/subtle",
      "layout_28.value.color": "Semantic/text/muted",
      "layout_28.placeholder.color": "Semantic/text/muted",
      "layout_29.field.background": "Semantic/surface/subtle",
      "layout_29.field.border": "Semantic/border/default",
      "layout_29.value.color": "Semantic/text/secondary",
      "layout_29.placeholder.color": "Semantic/text/muted",
      "layout_30.field.background": "Semantic/surface/default",
      "layout_30.field.border": "Semantic/border/default",
      "layout_30.value.color": "Semantic/text/primary",
      "layout_30.placeholder.color": "Semantic/text/muted",
      "layout_31.field.background": "Semantic/surface/default",
      "layout_31.field.border": "Semantic/border/default",
      "layout_31.value.color": "Semantic/text/primary",
      "layout_31.placeholder.color": "Semantic/text/muted",
      "layout_32.field.background": "Semantic/surface/default",
      "layout_32.field.border": "Semantic/border/default",
      "layout_32.value.color": "Semantic/text/primary",
      "layout_32.placeholder.color": "Semantic/text/muted",
      "layout_33.field.background": "Semantic/surface/default",
      "layout_33.field.border": "Semantic/border/default",
      "layout_33.value.color": "Semantic/text/primary",
      "layout_33.placeholder.color": "Semantic/text/muted"
    },
    styles: {
      "layout_3.text": "text/heading/xl",
      "layout_3.fill": "#1F2430",
      "layout_5.text": "text/body/lg",
      "layout_5.fill": "#5F6A7B",
      "layout_6.fill": "#2E6CFF",
      "layout_6.stroke": "#2E6CFF",
      "layout_6.text": "#FFFFFF",
      "layout_6.effect": "undefined",
      "layout_6.radius": "8",
      "layout_6.paddingX": "10",
      "layout_6.paddingY": "5",
      "layout_6.gap": "4",
      "layout_6.fontSize": "13",
      "layout_6.lineHeight": "18",
      "layout_6.fontWeight": "medium",
      "layout_6.minWidth": "64",
      "layout_7.fill": "#2E6CFF",
      "layout_7.stroke": "#2E6CFF",
      "layout_7.text": "#FFFFFF",
      "layout_7.effect": "undefined",
      "layout_7.radius": "10",
      "layout_7.paddingX": "12",
      "layout_7.paddingY": "7",
      "layout_7.gap": "4",
      "layout_7.fontSize": "13",
      "layout_7.lineHeight": "18",
      "layout_7.fontWeight": "medium",
      "layout_7.minWidth": "64",
      "layout_8.fill": "#2E6CFF",
      "layout_8.stroke": "#2E6CFF",
      "layout_8.text": "#FFFFFF",
      "layout_8.effect": "undefined",
      "layout_8.radius": "12",
      "layout_8.paddingX": "16",
      "layout_8.paddingY": "8",
      "layout_8.gap": "6",
      "layout_8.fontSize": "15",
      "layout_8.lineHeight": "22",
      "layout_8.fontWeight": "medium",
      "layout_8.minWidth": "64",
      "layout_9.fill": "#2E6CFF",
      "layout_9.stroke": "#2E6CFF",
      "layout_9.text": "#FFFFFF",
      "layout_9.effect": "undefined",
      "layout_9.radius": "14",
      "layout_9.paddingX": "20",
      "layout_9.paddingY": "10",
      "layout_9.gap": "6",
      "layout_9.fontSize": "17",
      "layout_9.lineHeight": "24",
      "layout_9.fontWeight": "medium",
      "layout_9.minWidth": "64",
      "layout_10.text": "text/body/lg",
      "layout_10.fill": "#5F6A7B",
      "layout_11.fill": "#2E6CFF",
      "layout_11.stroke": "#2E6CFF",
      "layout_11.text": "#FFFFFF",
      "layout_11.effect": "undefined",
      "layout_11.radius": "12",
      "layout_11.paddingX": "16",
      "layout_11.paddingY": "8",
      "layout_11.gap": "6",
      "layout_11.fontSize": "15",
      "layout_11.lineHeight": "22",
      "layout_11.fontWeight": "medium",
      "layout_11.minWidth": "64",
      "layout_12.fill": "#FFFFFF",
      "layout_12.stroke": "#E0E6EE",
      "layout_12.text": "#1F2430",
      "layout_12.effect": "undefined",
      "layout_12.radius": "12",
      "layout_12.paddingX": "16",
      "layout_12.paddingY": "8",
      "layout_12.gap": "6",
      "layout_12.fontSize": "15",
      "layout_12.lineHeight": "22",
      "layout_12.fontWeight": "medium",
      "layout_12.minWidth": "64",
      "layout_13.fill": "#FFFFFF",
      "layout_13.stroke": "#FFFFFF",
      "layout_13.text": "#D34B4B",
      "layout_13.effect": "undefined",
      "layout_13.radius": "12",
      "layout_13.paddingX": "16",
      "layout_13.paddingY": "8",
      "layout_13.gap": "6",
      "layout_13.fontSize": "15",
      "layout_13.lineHeight": "22",
      "layout_13.fontWeight": "medium",
      "layout_13.minWidth": "64",
      "layout_14.fill": "#1A9B6D",
      "layout_14.stroke": "#1A9B6D",
      "layout_14.text": "#FFFFFF",
      "layout_14.effect": "undefined",
      "layout_14.radius": "12",
      "layout_14.paddingX": "16",
      "layout_14.paddingY": "8",
      "layout_14.gap": "6",
      "layout_14.fontSize": "15",
      "layout_14.lineHeight": "22",
      "layout_14.fontWeight": "medium",
      "layout_14.minWidth": "64",
      "layout_15.text": "text/body/lg",
      "layout_15.fill": "#5F6A7B",
      "layout_16.fill": "#2E6CFF",
      "layout_16.stroke": "#2E6CFF",
      "layout_16.text": "#FFFFFF",
      "layout_16.effect": "undefined",
      "layout_16.radius": "12",
      "layout_16.paddingX": "16",
      "layout_16.paddingY": "8",
      "layout_16.gap": "6",
      "layout_16.fontSize": "15",
      "layout_16.lineHeight": "22",
      "layout_16.fontWeight": "medium",
      "layout_16.minWidth": "64",
      "layout_17.fill": "#2E6CFF",
      "layout_17.stroke": "#2E6CFF",
      "layout_17.text": "#FFFFFF",
      "layout_17.effect": "undefined",
      "layout_17.radius": "999",
      "layout_17.paddingX": "16",
      "layout_17.paddingY": "8",
      "layout_17.gap": "6",
      "layout_17.fontSize": "15",
      "layout_17.lineHeight": "22",
      "layout_17.fontWeight": "medium",
      "layout_17.minWidth": "64",
      "layout_18.fill": "#2E6CFF",
      "layout_18.stroke": "#2E6CFF",
      "layout_18.text": "#FFFFFF",
      "layout_18.effect": "undefined",
      "layout_18.radius": "8",
      "layout_18.paddingX": "16",
      "layout_18.paddingY": "8",
      "layout_18.gap": "6",
      "layout_18.fontSize": "15",
      "layout_18.lineHeight": "22",
      "layout_18.fontWeight": "medium",
      "layout_18.minWidth": "64",
      "layout_19.fill": "#2458D9",
      "layout_19.stroke": "#2458D9",
      "layout_19.text": "#FFFFFF",
      "layout_19.effect": "undefined",
      "layout_19.radius": "12",
      "layout_19.paddingX": "16",
      "layout_19.paddingY": "8",
      "layout_19.gap": "6",
      "layout_19.fontSize": "15",
      "layout_19.lineHeight": "22",
      "layout_19.fontWeight": "medium",
      "layout_19.minWidth": "64",
      "layout_20.fill": "#E0E6EE",
      "layout_20.stroke": "#E0E6EE",
      "layout_20.text": "#7E8A9C",
      "layout_20.effect": "undefined",
      "layout_20.radius": "12",
      "layout_20.paddingX": "16",
      "layout_20.paddingY": "8",
      "layout_20.gap": "6",
      "layout_20.fontSize": "15",
      "layout_20.lineHeight": "22",
      "layout_20.fontWeight": "medium",
      "layout_20.minWidth": "64",
      "layout_21.fill": "#2E6CFF",
      "layout_21.stroke": "#2E6CFF",
      "layout_21.text": "#FFFFFF",
      "layout_21.effect": "undefined",
      "layout_21.radius": "14",
      "layout_21.paddingX": "20",
      "layout_21.paddingY": "10",
      "layout_21.gap": "6",
      "layout_21.fontSize": "17",
      "layout_21.lineHeight": "24",
      "layout_21.fontWeight": "medium",
      "layout_21.minWidth": "64",
      "layout_23.text": "text/body/lg",
      "layout_23.fill": "#5F6A7B",
      "layout_24.fill": "#FFFFFF",
      "layout_24.stroke": "#E0E6EE",
      "layout_24.text": "#1F2430",
      "layout_24.effect": "undefined",
      "layout_24.radius": "undefined",
      "layout_24.paddingX": "undefined",
      "layout_24.paddingY": "9",
      "layout_24.gap": "undefined",
      "layout_24.fontSize": "15",
      "layout_24.lineHeight": "22",
      "layout_24.fontWeight": "regular",
      "layout_24.minWidth": "220",
      "layout_25.fill": "#FFFFFF",
      "layout_25.stroke": "#E0E6EE",
      "layout_25.text": "#1F2430",
      "layout_25.effect": "undefined",
      "layout_25.radius": "undefined",
      "layout_25.paddingX": "undefined",
      "layout_25.paddingY": "9",
      "layout_25.gap": "undefined",
      "layout_25.fontSize": "15",
      "layout_25.lineHeight": "22",
      "layout_25.fontWeight": "regular",
      "layout_25.minWidth": "220",
      "layout_26.fill": "#FFFFFF",
      "layout_26.stroke": "#E0E6EE",
      "layout_26.text": "#1F2430",
      "layout_26.effect": "undefined",
      "layout_26.radius": "undefined",
      "layout_26.paddingX": "undefined",
      "layout_26.paddingY": "9",
      "layout_26.gap": "undefined",
      "layout_26.fontSize": "15",
      "layout_26.lineHeight": "22",
      "layout_26.fontWeight": "regular",
      "layout_26.minWidth": "220",
      "layout_27.text": "text/body/lg",
      "layout_27.fill": "#5F6A7B",
      "layout_28.fill": "#EEF1F5",
      "layout_28.stroke": "#EEF1F5",
      "layout_28.text": "#7E8A9C",
      "layout_28.effect": "undefined",
      "layout_28.radius": "undefined",
      "layout_28.paddingX": "undefined",
      "layout_28.paddingY": "9",
      "layout_28.gap": "undefined",
      "layout_28.fontSize": "15",
      "layout_28.lineHeight": "22",
      "layout_28.fontWeight": "regular",
      "layout_28.minWidth": "220",
      "layout_29.fill": "#EEF1F5",
      "layout_29.stroke": "#E0E6EE",
      "layout_29.text": "#5F6A7B",
      "layout_29.effect": "undefined",
      "layout_29.radius": "undefined",
      "layout_29.paddingX": "undefined",
      "layout_29.paddingY": "9",
      "layout_29.gap": "undefined",
      "layout_29.fontSize": "15",
      "layout_29.lineHeight": "22",
      "layout_29.fontWeight": "regular",
      "layout_29.minWidth": "220",
      "layout_30.fill": "#FFFFFF",
      "layout_30.stroke": "#E0E6EE",
      "layout_30.text": "#1F2430",
      "layout_30.effect": "undefined",
      "layout_30.radius": "undefined",
      "layout_30.paddingX": "undefined",
      "layout_30.paddingY": "9",
      "layout_30.gap": "undefined",
      "layout_30.fontSize": "15",
      "layout_30.lineHeight": "22",
      "layout_30.fontWeight": "regular",
      "layout_30.minWidth": "220",
      "layout_31.fill": "#FFFFFF",
      "layout_31.stroke": "#E0E6EE",
      "layout_31.text": "#1F2430",
      "layout_31.effect": "undefined",
      "layout_31.radius": "undefined",
      "layout_31.paddingX": "undefined",
      "layout_31.paddingY": "9",
      "layout_31.gap": "undefined",
      "layout_31.fontSize": "15",
      "layout_31.lineHeight": "22",
      "layout_31.fontWeight": "regular",
      "layout_31.minWidth": "220",
      "layout_32.fill": "#FFFFFF",
      "layout_32.stroke": "#E0E6EE",
      "layout_32.text": "#1F2430",
      "layout_32.effect": "undefined",
      "layout_32.radius": "undefined",
      "layout_32.paddingX": "undefined",
      "layout_32.paddingY": "9",
      "layout_32.gap": "undefined",
      "layout_32.fontSize": "15",
      "layout_32.lineHeight": "22",
      "layout_32.fontWeight": "regular",
      "layout_32.minWidth": "220",
      "layout_33.fill": "#FFFFFF",
      "layout_33.stroke": "#E0E6EE",
      "layout_33.text": "#1F2430",
      "layout_33.effect": "undefined",
      "layout_33.radius": "undefined",
      "layout_33.paddingX": "undefined",
      "layout_33.paddingY": "9",
      "layout_33.gap": "undefined",
      "layout_33.fontSize": "15",
      "layout_33.lineHeight": "22",
      "layout_33.fontWeight": "regular",
      "layout_33.minWidth": "220"
    },
    modes: {
      brand: "core",
      theme: "core"
    },
    metadata: {
      source: "miterlab-figma-generator",
      version: "0.1.0",
      generatedAt: "2026-03-17T10:36:57.665Z"
    }
  };

  // src/code.ts
  var EXTRACTION_LOGS_KEY = "miterlab.extraction.logs.v1";
  var EXTRACTION_SNAPSHOT_PREFIX = "miterlab.extraction.snapshot.";
  var EXTRACTION_INDEX_KEY = "miterlab.extraction.index.v1";
  var INPUT_BLUEPRINT_KEY3 = "miterlab.blueprint.input.v1";
  var EXTRACTION_RESET_MARKER_KEY = "miterlab.extraction.reset-once.v1";
  var renderCoreFamilies = async () => {
    const result = await renderPayload(mcp_payload_default);
    figma.notify(`Rendered ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
    return result;
  };
  var normalizeScreen = (screen, promptText) => {
    if (screen === "login" || screen === "settings" || screen === "dashboard" || screen === "list") return screen;
    if (/로그인|sign in|signin/i.test(promptText)) return "login";
    if (/설정|setting|save/i.test(promptText)) return "settings";
    if (/목록|리스트|list|items/i.test(promptText)) return "list";
    return "dashboard";
  };
  var extractValue = (promptText, keys) => {
    for (const key of keys) {
      const pattern = new RegExp(`${key}\\s*[:\uFF1A]\\s*([^\\n.]+)`, "i");
      const match = promptText.match(pattern);
      if (match == null ? void 0 : match[1]) {
        return match[1].trim();
      }
    }
    return void 0;
  };
  var hasWord = (promptText, words) => words.some((word) => promptText.toLowerCase().includes(word.toLowerCase()));
  var selectionContextText = () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) return "";
    if (selection.length === 1) {
      const node = selection[0];
      const sizeText = "width" in node && "height" in node ? `, ${Math.round(node.width)}x${Math.round(node.height)}` : "";
      return `\uC120\uD0DD\uB428: ${node.name} (${node.type}${sizeText})`;
    }
    return `\uC120\uD0DD\uB428: ${selection.length}\uAC1C \uB808\uC774\uC5B4`;
  };
  var rgb255 = (color) => {
    var _a, _b, _c;
    return {
      r: ((_a = color == null ? void 0 : color.r) != null ? _a : 0) / 255,
      g: ((_b = color == null ? void 0 : color.g) != null ? _b : 0) / 255,
      b: ((_c = color == null ? void 0 : color.b) != null ? _c : 0) / 255
    };
  };
  var applyRawPaints = (node, fills, strokes, strokeWeight) => {
    if (fills && fills.length > 0) {
      node.fills = fills.filter((paint) => paint.type === "SOLID" && paint.visible !== false).map((paint) => ({
        type: "SOLID",
        opacity: typeof paint.opacity === "number" ? paint.opacity : 1,
        color: rgb255(paint.color)
      }));
    } else {
      node.fills = [];
    }
    if (strokes && strokes.length > 0) {
      node.strokes = strokes.filter((paint) => paint.type === "SOLID" && paint.visible !== false).map((paint) => ({
        type: "SOLID",
        opacity: typeof paint.opacity === "number" ? paint.opacity : 1,
        color: rgb255(paint.color)
      }));
      if (typeof strokeWeight === "number") {
        node.strokeWeight = strokeWeight;
      }
    } else {
      node.strokes = [];
    }
  };
  var createRawSceneNode = async (rawNode) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
    const width = Math.max(1, Math.round((_b = (_a = rawNode.size) == null ? void 0 : _a.width) != null ? _b : 1));
    const height = Math.max(1, Math.round((_d = (_c = rawNode.size) == null ? void 0 : _c.height) != null ? _d : 1));
    const x = Math.round((_f = (_e = rawNode.position) == null ? void 0 : _e.x) != null ? _f : 0);
    const y = Math.round((_h = (_g = rawNode.position) == null ? void 0 : _g.y) != null ? _h : 0);
    if (rawNode.type === "TEXT") {
      const text = figma.createText();
      text.name = (_i = rawNode.name) != null ? _i : "Raw Text";
      try {
        await loadDefaultFont();
        text.fontName = await loadDefaultFont();
      } catch (e) {
      }
      text.characters = (_k = (_j = rawNode.text) == null ? void 0 : _j.characters) != null ? _k : "";
      if (typeof ((_l = rawNode.text) == null ? void 0 : _l.fontSize) === "number") {
        text.fontSize = rawNode.text.fontSize;
      }
      if (typeof ((_n = (_m = rawNode.text) == null ? void 0 : _m.lineHeight) == null ? void 0 : _n.value) === "number") {
        text.lineHeight = { unit: "PIXELS", value: rawNode.text.lineHeight.value };
      }
      text.x = x;
      text.y = y;
      text.textAutoResize = "WIDTH_AND_HEIGHT";
      if ((_o = rawNode.fills) == null ? void 0 : _o.length) {
        text.fills = rawNode.fills.filter((paint) => paint.type === "SOLID" && paint.visible !== false).map((paint) => ({
          type: "SOLID",
          opacity: typeof paint.opacity === "number" ? paint.opacity : 1,
          color: rgb255(paint.color)
        }));
      }
      return text;
    }
    const frame = figma.createFrame();
    frame.name = (_q = (_p = rawNode.name) != null ? _p : rawNode.type) != null ? _q : "Raw Node";
    frame.resize(width, height);
    frame.x = x;
    frame.y = y;
    frame.layoutMode = "NONE";
    frame.clipsContent = false;
    if (typeof rawNode.cornerRadius === "number") {
      frame.cornerRadius = rawNode.cornerRadius;
    }
    applyRawPaints(frame, rawNode.fills, rawNode.strokes, rawNode.strokeWeight);
    for (const child of (_r = rawNode.children) != null ? _r : []) {
      const next = await createRawSceneNode(child);
      frame.appendChild(next);
    }
    return frame;
  };
  var canonicalVariantSignature = (node) => {
    var _a;
    const variant = node.variantProperties;
    if (!variant || typeof variant !== "object") {
      return (_a = node.name) != null ? _a : "variant";
    }
    return Object.entries(variant).sort(([left], [right]) => left.localeCompare(right)).map(([key, value]) => `${key}=${String(value)}`).join(", ");
  };
  var createAuditLine = async (value, width = 960, size = 12, color = { r: 0.25, g: 0.29, b: 0.34 }) => {
    const text = figma.createText();
    try {
      text.fontName = await loadDefaultFont();
    } catch (e) {
    }
    text.characters = value;
    text.fontSize = size;
    text.lineHeight = { unit: "PIXELS", value: size === 12 ? 18 : 22 };
    text.fills = [{ type: "SOLID", color }];
    text.textAutoResize = "HEIGHT";
    text.resize(width, text.height);
    return text;
  };
  var summarizeRawNode = (node) => {
    var _a, _b, _c, _d, _e;
    const parts = [
      (_b = (_a = node.name) != null ? _a : node.type) != null ? _b : "Node",
      (_c = node.type) != null ? _c : "UNKNOWN",
      ((_d = node.size) == null ? void 0 : _d.width) && ((_e = node.size) == null ? void 0 : _e.height) ? `${Math.round(node.size.width)}x${Math.round(node.size.height)}` : void 0
    ].filter(Boolean);
    return parts.join(" / ");
  };
  var createRawViewport = async (variant) => {
    var _a, _b, _c, _d, _e, _f;
    const width = Math.max(1, Math.round((_b = (_a = variant.size) == null ? void 0 : _a.width) != null ? _b : 240));
    const height = Math.max(1, Math.round((_d = (_c = variant.size) == null ? void 0 : _c.height) != null ? _d : 64));
    const viewport = figma.createFrame();
    viewport.name = `${(_e = variant.name) != null ? _e : "Variant"} / Raw Viewport`;
    viewport.resize(width, height);
    viewport.layoutMode = "NONE";
    viewport.clipsContent = true;
    viewport.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    viewport.strokes = [{ type: "SOLID", color: { r: 0.94, g: 0.95, b: 0.97 } }];
    for (const child of (_f = variant.children) != null ? _f : []) {
      const childNode = await createRawSceneNode(child);
      viewport.appendChild(childNode);
    }
    return viewport;
  };
  var renderRawExtraction = async (raw) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
    const root = raw.document;
    if (!root) {
      throw new Error("raw document is missing");
    }
    const frameName = `\uCD94\uCD9C - raw \uC7AC\uD604/\uD574\uC11D / ${(_b = (_a = raw.name) != null ? _a : root.name) != null ? _b : "Component"}`;
    const existing = figma.currentPage.children.find((node) => node.type === "FRAME" && node.name === frameName);
    if (existing && existing.type === "FRAME") {
      existing.remove();
    }
    const canvas = figma.createFrame();
    canvas.name = frameName;
    canvas.resize(1040, 720);
    canvas.layoutMode = "VERTICAL";
    canvas.primaryAxisSizingMode = "AUTO";
    canvas.counterAxisSizingMode = "FIXED";
    canvas.itemSpacing = 16;
    canvas.paddingTop = 20;
    canvas.paddingRight = 20;
    canvas.paddingBottom = 20;
    canvas.paddingLeft = 20;
    canvas.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.985, b: 0.99 } }];
    canvas.strokes = [{ type: "SOLID", color: { r: 0.86, g: 0.89, b: 0.93 } }];
    figma.currentPage.appendChild(canvas);
    const title = await createAuditLine(`\uCD94\uCD9C - raw \uC7AC\uD604/\uD574\uC11D / ${(_d = (_c = raw.name) != null ? _c : root.name) != null ? _d : "Component"}`, 960, 16, {
      r: 0.12,
      g: 0.15,
      b: 0.19
    });
    canvas.appendChild(title);
    const rootInfo = await createAuditLine(
      `root: ${(_e = root.type) != null ? _e : "UNKNOWN"} / ${Math.round((_g = (_f = root.size) == null ? void 0 : _f.width) != null ? _g : 0)}x${Math.round((_i = (_h = root.size) == null ? void 0 : _h.height) != null ? _i : 0)}`
    );
    canvas.appendChild(rootInfo);
    const propertyDefinitions = (_k = (_j = root.component) == null ? void 0 : _j.componentPropertyDefinitions) != null ? _k : {};
    const propertyKeys = Object.keys(propertyDefinitions);
    const propertiesLine = await createAuditLine(
      `propertyDefinitions: ${propertyKeys.length}${propertyKeys.length ? ` / ${propertyKeys.join(", ")}` : ""}`
    );
    canvas.appendChild(propertiesLine);
    const variantsSection = figma.createFrame();
    variantsSection.name = "Raw Variant List";
    variantsSection.resize(980, 400);
    variantsSection.layoutMode = "VERTICAL";
    variantsSection.primaryAxisSizingMode = "AUTO";
    variantsSection.counterAxisSizingMode = "FIXED";
    variantsSection.itemSpacing = 10;
    variantsSection.paddingTop = 16;
    variantsSection.paddingRight = 16;
    variantsSection.paddingBottom = 16;
    variantsSection.paddingLeft = 16;
    variantsSection.cornerRadius = 12;
    variantsSection.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    variantsSection.strokes = [{ type: "SOLID", color: { r: 0.88, g: 0.9, b: 0.94 } }];
    canvas.appendChild(variantsSection);
    const variantsTitle = await createAuditLine("variant \uBAA9\uB85D", 920, 14, { r: 0.15, g: 0.18, b: 0.22 });
    variantsSection.appendChild(variantsTitle);
    const guide = await createAuditLine(
      "\uC67C\uCABD: raw \uC7AC\uD604 / \uC624\uB978\uCABD: raw \uD574\uC11D",
      920,
      12,
      { r: 0.37, g: 0.42, b: 0.48 }
    );
    variantsSection.appendChild(guide);
    const directVariants = root.type === "COMPONENT_SET" && Array.isArray(root.children) ? root.children.filter((child) => child.type === "COMPONENT") : [root];
    const seen = /* @__PURE__ */ new Set();
    const dedupedVariants = directVariants.filter((variant) => {
      const key = canonicalVariantSignature(variant);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    for (const variant of dedupedVariants) {
      const row = figma.createFrame();
      row.name = canonicalVariantSignature(variant);
      row.resize(920, 64);
      row.layoutMode = "HORIZONTAL";
      row.primaryAxisSizingMode = "AUTO";
      row.counterAxisSizingMode = "FIXED";
      row.itemSpacing = 12;
      row.paddingTop = 10;
      row.paddingRight = 12;
      row.paddingBottom = 10;
      row.paddingLeft = 12;
      row.cornerRadius = 8;
      row.fills = [{ type: "SOLID", color: { r: 0.985, g: 0.988, b: 0.992 } }];
      row.strokes = [{ type: "SOLID", color: { r: 0.93, g: 0.94, b: 0.96 } }];
      variantsSection.appendChild(row);
      const viewportWrap = figma.createFrame();
      viewportWrap.name = "\uC7AC\uD604";
      viewportWrap.resize(Math.max(360, Math.round((_m = (_l = variant.size) == null ? void 0 : _l.width) != null ? _m : 240) + 24), 64);
      viewportWrap.layoutMode = "VERTICAL";
      viewportWrap.primaryAxisSizingMode = "AUTO";
      viewportWrap.counterAxisSizingMode = "AUTO";
      viewportWrap.itemSpacing = 8;
      viewportWrap.paddingTop = 8;
      viewportWrap.paddingRight = 8;
      viewportWrap.paddingBottom = 8;
      viewportWrap.paddingLeft = 8;
      viewportWrap.cornerRadius = 8;
      viewportWrap.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      viewportWrap.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.97 } }];
      row.appendChild(viewportWrap);
      const viewportLabel = await createAuditLine("\uC7AC\uD604", 320, 12, {
        r: 0.18,
        g: 0.21,
        b: 0.26
      });
      viewportWrap.appendChild(viewportLabel);
      const viewport = await createRawViewport(variant);
      viewportWrap.appendChild(viewport);
      const explainWrap = figma.createFrame();
      explainWrap.name = "\uD574\uC11D";
      explainWrap.resize(480, 64);
      explainWrap.layoutMode = "VERTICAL";
      explainWrap.primaryAxisSizingMode = "AUTO";
      explainWrap.counterAxisSizingMode = "FIXED";
      explainWrap.itemSpacing = 4;
      explainWrap.paddingTop = 8;
      explainWrap.paddingRight = 8;
      explainWrap.paddingBottom = 8;
      explainWrap.paddingLeft = 8;
      explainWrap.cornerRadius = 8;
      explainWrap.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      explainWrap.strokes = [{ type: "SOLID", color: { r: 0.92, g: 0.94, b: 0.97 } }];
      row.appendChild(explainWrap);
      const explainLabel = await createAuditLine("\uD574\uC11D", 440, 12, {
        r: 0.18,
        g: 0.21,
        b: 0.26
      });
      explainWrap.appendChild(explainLabel);
      const signature = await createAuditLine(canonicalVariantSignature(variant), 440, 12, {
        r: 0.18,
        g: 0.21,
        b: 0.26
      });
      explainWrap.appendChild(signature);
      const meta = await createAuditLine(
        `frame: ${Math.round((_o = (_n = variant.size) == null ? void 0 : _n.width) != null ? _o : 0)}x${Math.round((_q = (_p = variant.size) == null ? void 0 : _p.height) != null ? _q : 0)} / children: ${((_r = variant.children) != null ? _r : []).length}`,
        440
      );
      explainWrap.appendChild(meta);
      const childSummary = ((_s = variant.children) != null ? _s : []).slice(0, 6).map((child) => summarizeRawNode(child)).join(" | ");
      if (childSummary) {
        const childrenLine = await createAuditLine(`children: ${childSummary}`, 440, 12, {
          r: 0.37,
          g: 0.42,
          b: 0.48
        });
        explainWrap.appendChild(childrenLine);
      }
    }
    figma.currentPage.selection = [canvas];
    figma.viewport.scrollAndZoomIntoView([canvas]);
  };
  var hashKey = (value) => {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash >>> 0).toString(36);
  };
  var normalizeExtractionKey = (value) => {
    const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "selection";
    const compact = normalized.slice(0, 32).replace(/-+$/g, "") || "selection";
    return `${compact}-${hashKey(value)}`;
  };
  var toPlainValue = (value) => {
    if (value === figma.mixed || typeof value === "symbol") return void 0;
    if (value === null || value === void 0) return void 0;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
    if (Array.isArray(value)) {
      return value.map((item) => toPlainValue(item)).filter((item) => item !== void 0);
    }
    if (typeof value === "object") {
      const entries = Object.entries(value).map(([key, nested]) => [key, toPlainValue(nested)]).filter(([, nested]) => nested !== void 0);
      return Object.fromEntries(entries);
    }
    return String(value);
  };
  var serializePaints = (paints) => {
    if (!Array.isArray(paints)) return void 0;
    return paints.filter((paint) => paint.type === "SOLID").map((paint) => ({
      type: paint.type,
      visible: paint.visible !== false,
      opacity: typeof paint.opacity === "number" ? paint.opacity : 1,
      color: {
        r: Math.round(paint.color.r * 255),
        g: Math.round(paint.color.g * 255),
        b: Math.round(paint.color.b * 255)
      }
    }));
  };
  var serializeStrokes = (node) => ({
    strokes: serializePaints(node.strokes),
    strokeWeight: node.strokeWeight
  });
  var serializeTextStyle = (node) => ({
    characters: node.characters,
    fontSize: node.fontSize === figma.mixed ? void 0 : node.fontSize,
    lineHeight: toPlainValue(node.lineHeight),
    fontName: node.fontName === figma.mixed ? void 0 : toPlainValue(node.fontName),
    textAlignHorizontal: node.textAlignHorizontal,
    textAlignVertical: node.textAlignVertical
  });
  var serializeEffects = (effects) => {
    if (!Array.isArray(effects)) return void 0;
    return effects.map((effect) => toPlainValue(effect));
  };
  var serializeVariables = (node) => {
    if (!("boundVariables" in node)) return void 0;
    return toPlainValue(node.boundVariables);
  };
  var serializeSceneNode = (node) => {
    var _a, _b, _c;
    const base = {
      id: node.id,
      name: node.name,
      type: node.type,
      visible: node.visible
    };
    if ("width" in node && "height" in node) {
      base.size = {
        width: Math.round(node.width),
        height: Math.round(node.height)
      };
    }
    if ("x" in node && "y" in node) {
      base.position = {
        x: Math.round(node.x),
        y: Math.round(node.y)
      };
    }
    if ("layoutMode" in node) {
      base.autoLayout = {
        layoutMode: node.layoutMode,
        primaryAxisSizingMode: node.primaryAxisSizingMode,
        counterAxisSizingMode: node.counterAxisSizingMode,
        primaryAxisAlignItems: node.primaryAxisAlignItems,
        counterAxisAlignItems: node.counterAxisAlignItems,
        layoutWrap: node.layoutWrap,
        itemSpacing: node.itemSpacing,
        paddingTop: node.paddingTop,
        paddingRight: node.paddingRight,
        paddingBottom: node.paddingBottom,
        paddingLeft: node.paddingLeft
      };
    }
    if ("layoutSizingHorizontal" in node || "layoutSizingVertical" in node) {
      base.layoutSizing = {
        layoutSizingHorizontal: "layoutSizingHorizontal" in node ? node.layoutSizingHorizontal : void 0,
        layoutSizingVertical: "layoutSizingVertical" in node ? node.layoutSizingVertical : void 0
      };
    }
    if ("layoutAlign" in node || "layoutGrow" in node) {
      base.layoutBehavior = {
        layoutAlign: "layoutAlign" in node ? node.layoutAlign : void 0,
        layoutGrow: "layoutGrow" in node ? node.layoutGrow : void 0
      };
    }
    if ("minWidth" in node || "maxWidth" in node || "minHeight" in node || "maxHeight" in node) {
      base.sizeLimits = {
        minWidth: "minWidth" in node ? node.minWidth : void 0,
        maxWidth: "maxWidth" in node ? node.maxWidth : void 0,
        minHeight: "minHeight" in node ? node.minHeight : void 0,
        maxHeight: "maxHeight" in node ? node.maxHeight : void 0
      };
    }
    if ("constraints" in node) {
      base.constraints = toPlainValue(node.constraints);
    }
    if ("absoluteRenderBounds" in node) {
      base.absoluteRenderBounds = toPlainValue(node.absoluteRenderBounds);
    }
    if ("cornerRadius" in node) {
      base.cornerRadius = node.cornerRadius;
    }
    if ("fills" in node) {
      base.fills = serializePaints(node.fills);
    }
    if ("strokes" in node) {
      Object.assign(base, serializeStrokes(node));
    }
    if ("effects" in node) {
      base.effects = serializeEffects(node.effects);
    }
    if ("opacity" in node) {
      base.opacity = node.opacity;
    }
    const variables = serializeVariables(node);
    if (variables) {
      base.boundVariables = variables;
    }
    if (node.type === "TEXT") {
      base.text = serializeTextStyle(node);
    }
    if (node.type === "INSTANCE") {
      base.instance = {
        mainComponentId: (_a = node.mainComponent) == null ? void 0 : _a.id,
        mainComponentName: (_b = node.mainComponent) == null ? void 0 : _b.name,
        componentProperties: toPlainValue(node.componentProperties)
      };
    }
    if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
      const isVariantComponent = node.type === "COMPONENT" && ((_c = node.parent) == null ? void 0 : _c.type) === "COMPONENT_SET";
      base.component = {
        key: "key" in node ? node.key : void 0,
        description: "description" in node ? node.description : void 0,
        componentPropertyDefinitions: node.type === "COMPONENT_SET" || !isVariantComponent ? "componentPropertyDefinitions" in node ? toPlainValue(node.componentPropertyDefinitions) : void 0 : void 0
      };
    }
    if ("variantProperties" in node) {
      base.variantProperties = toPlainValue(node.variantProperties);
    }
    if ("children" in node) {
      base.children = node.children.map((child) => serializeSceneNode(child));
    }
    return base;
  };
  var extractSelectionPayload = () => {
    const selection = figma.currentPage.selection;
    return {
      extractedAt: (/* @__PURE__ */ new Date()).toISOString(),
      page: figma.currentPage.name,
      selectionCount: selection.length,
      nodes: selection.map((node) => serializeSceneNode(node))
    };
  };
  var getComponentRegistrationName = (node) => {
    var _a, _b;
    if (node.type === "INSTANCE") {
      return (_b = (_a = node.mainComponent) == null ? void 0 : _a.name) != null ? _b : node.name;
    }
    if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
      return node.name;
    }
    return void 0;
  };
  var getComponentAwarePath = (node) => {
    const parts = [];
    const selfRegistrationName = getComponentRegistrationName(node);
    if (selfRegistrationName) {
      parts.push(`component:${selfRegistrationName}`);
    } else {
      parts.push(`node:${node.type}`);
    }
    let current = node.parent;
    while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
      if ("type" in current) {
        const currentNode = current;
        const registrationName = getComponentRegistrationName(currentNode);
        if (registrationName) {
          parts.unshift(`component:${registrationName}`);
        }
      }
      current = current.parent;
    }
    return parts.join(" / ");
  };
  var findReferenceNode = (node) => {
    let current = node;
    let lastSceneNode = node;
    while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
      if ("type" in current && (current.type === "INSTANCE" || current.type === "COMPONENT" || current.type === "COMPONENT_SET")) {
        return current;
      }
      if ("type" in current) {
        lastSceneNode = current;
      }
      current = current.parent;
    }
    return lastSceneNode;
  };
  var resolveExtractionRoot = (node) => {
    if (node.type === "INSTANCE" && node.mainComponent) {
      const parent = node.mainComponent.parent;
      if (parent && "type" in parent && parent.type === "COMPONENT_SET") {
        return parent;
      }
      return node.mainComponent;
    }
    let current = node;
    let componentNode = null;
    while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
      if ("type" in current && (current.type === "COMPONENT" || current.type === "COMPONENT_SET")) {
        componentNode = current;
      }
      current = current.parent;
    }
    return componentNode != null ? componentNode : findReferenceNode(node);
  };
  var getExtractionIdentity = () => {
    var _a, _b;
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      return { key: "selection", name: "selection", partKey: "root", partName: "selection" };
    }
    const reference = findReferenceNode(selection[0]);
    const rootName = reference.type === "INSTANCE" && ((_a = reference.mainComponent) == null ? void 0 : _a.name) ? reference.mainComponent.name : reference.name;
    const combinedPath = selection.map((node) => getComponentAwarePath(node)).join(" | ");
    const partName = selection.length === 1 ? (_b = getComponentRegistrationName(selection[0])) != null ? _b : `${selection[0].name} (${selection[0].type})` : `${selection.length} selections`;
    return {
      key: normalizeExtractionKey(rootName),
      name: rootName,
      partKey: normalizeExtractionKey(combinedPath),
      partName
    };
  };
  var extractRawComponentPayload = () => {
    var _a;
    const selection = figma.currentPage.selection;
    if (selection.length === 0) return null;
    const root = resolveExtractionRoot(selection[0]);
    const rootName = root.type === "INSTANCE" && ((_a = root.mainComponent) == null ? void 0 : _a.name) ? root.mainComponent.name : root.name;
    return {
      key: normalizeExtractionKey(rootName),
      name: rootName,
      extractedAt: (/* @__PURE__ */ new Date()).toISOString(),
      rootType: root.type,
      document: serializeSceneNode(root)
    };
  };
  var isInputComponentName = (value) => Boolean(value && /(textinput|textfield|input)/i.test(value));
  var resolveInputBlueprintTarget = (node) => {
    const root = resolveExtractionRoot(node);
    if (root.type === "COMPONENT_SET") {
      const representative = root.children.find((child) => child.type === "COMPONENT");
      return representative != null ? representative : root;
    }
    if (root.type === "INSTANCE" && root.mainComponent) {
      return root.mainComponent;
    }
    return root;
  };
  var extractInputBlueprint = () => {
    var _a;
    const selection = figma.currentPage.selection;
    if (selection.length !== 1) return null;
    const node = selection[0];
    const reference = resolveInputBlueprintTarget(node);
    const sourceComponentName = reference.type === "INSTANCE" && ((_a = reference.mainComponent) == null ? void 0 : _a.name) ? reference.mainComponent.name : reference.name;
    if (!isInputComponentName(sourceComponentName)) {
      return null;
    }
    const propertyValues = reference.type === "INSTANCE" ? toPlainValue(reference.componentProperties) : reference.type === "COMPONENT_SET" || reference.type === "COMPONENT" ? toPlainValue(
      "componentPropertyDefinitions" in reference ? reference.componentPropertyDefinitions : void 0
    ) : void 0;
    return {
      targetComponent: "Input",
      sourceComponentName,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      metrics: {
        width: "width" in reference ? Math.round(reference.width) : void 0,
        height: "height" in reference ? Math.round(reference.height) : void 0,
        paddingTop: "layoutMode" in reference ? reference.paddingTop : void 0,
        paddingRight: "layoutMode" in reference ? reference.paddingRight : void 0,
        paddingBottom: "layoutMode" in reference ? reference.paddingBottom : void 0,
        paddingLeft: "layoutMode" in reference ? reference.paddingLeft : void 0,
        itemSpacing: "layoutMode" in reference ? reference.itemSpacing : void 0,
        radius: "cornerRadius" in reference && typeof reference.cornerRadius === "number" ? reference.cornerRadius : void 0,
        layoutMode: "layoutMode" in reference ? reference.layoutMode : void 0
      },
      properties: {
        keys: propertyValues ? Object.keys(propertyValues) : [],
        values: propertyValues
      }
    };
  };
  var persistDerivedBlueprints = async () => {
    const inputBlueprint = extractInputBlueprint();
    if (inputBlueprint) {
      await safeSetClientStorage(INPUT_BLUEPRINT_KEY3, inputBlueprint);
      return { inputBlueprintUpdated: true, sourceComponentName: inputBlueprint.sourceComponentName, inputBlueprint };
    }
    return { inputBlueprintUpdated: false, inputBlueprint: void 0 };
  };
  var summarizeExtractionComponents = (index) => Object.entries(index.components).map(([key, value]) => ({
    key,
    name: value.name,
    updatedAt: value.updatedAt,
    partCount: Object.keys(value.parts).length
  })).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  var readExtractionIndex = async () => {
    const value = await figma.clientStorage.getAsync(EXTRACTION_INDEX_KEY);
    if (value && typeof value === "object" && "components" in value) {
      return value;
    }
    return { components: {} };
  };
  var safeSetClientStorage = async (key, value, fallback) => {
    try {
      await figma.clientStorage.setAsync(key, value);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!/quota|storage/i.test(message)) throw error;
      await purgeLegacyExtractionSnapshots();
      if (fallback) {
        await fallback();
      }
      await figma.clientStorage.setAsync(key, value);
    }
  };
  var writeExtractionIndex = async (index) => {
    await safeSetClientStorage(EXTRACTION_INDEX_KEY, index);
  };
  var purgeLegacyExtractionSnapshots = async () => {
    const keys = await figma.clientStorage.keysAsync();
    const legacyKeys = keys.filter((key) => key.startsWith(EXTRACTION_SNAPSHOT_PREFIX));
    if (legacyKeys.length === 0) return;
    await Promise.all(legacyKeys.map((key) => figma.clientStorage.deleteAsync(key)));
  };
  var purgeAllExtractionState = async () => {
    await purgeLegacyExtractionSnapshots();
    await Promise.all([
      figma.clientStorage.deleteAsync(EXTRACTION_LOGS_KEY),
      figma.clientStorage.deleteAsync(EXTRACTION_INDEX_KEY),
      figma.clientStorage.deleteAsync(INPUT_BLUEPRINT_KEY3)
    ]);
  };
  var readExtractionLogs = async () => {
    const logs = await figma.clientStorage.getAsync(EXTRACTION_LOGS_KEY);
    return Array.isArray(logs) ? logs : [];
  };
  var writeExtractionLogs = async (logs) => {
    const trimmed = logs.slice(0, 40);
    await safeSetClientStorage(EXTRACTION_LOGS_KEY, trimmed, async () => {
      await figma.clientStorage.setAsync(EXTRACTION_LOGS_KEY, trimmed.slice(0, 10));
    });
  };
  var buildComparableExtraction = (payload) => ({
    selectionCount: payload.selectionCount,
    nodes: toPlainValue(payload.nodes)
  });
  var persistExtractionPayload = async (payload) => {
    var _a;
    const identity = getExtractionIdentity();
    await purgeLegacyExtractionSnapshots();
    const index = await readExtractionIndex();
    const componentEntry = (_a = index.components[identity.key]) != null ? _a : {
      name: identity.name,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      parts: {}
    };
    const comparable = buildComparableExtraction(payload);
    const existingPart = componentEntry.parts[identity.partKey];
    const nextSerialized = JSON.stringify(comparable);
    const nextHash = hashKey(nextSerialized);
    const previousHash = existingPart == null ? void 0 : existingPart.hash;
    const action = Object.keys(componentEntry.parts).length === 0 ? "created" : !existingPart ? "merged" : previousHash === nextHash ? "unchanged" : "updated";
    componentEntry.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    componentEntry.parts[identity.partKey] = {
      name: identity.partName,
      extractedAt: payload.extractedAt,
      selectionCount: comparable.selectionCount,
      hash: nextHash
    };
    index.components[identity.key] = componentEntry;
    await writeExtractionIndex(index);
    const logs = await readExtractionLogs();
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    const summary = action === "created" ? "\uC0C8 \uCEF4\uD3EC\uB10C\uD2B8 \uCD94\uCD9C\uC744 \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4." : action === "merged" ? "\uBD80\uBD84 \uCD94\uCD9C\uC744 \uAE30\uC874 \uCEF4\uD3EC\uB10C\uD2B8\uC5D0 \uBCD1\uD569\uD588\uC2B5\uB2C8\uB2E4." : action === "updated" ? "\uAC19\uC740 \uBD80\uBD84 \uCD94\uCD9C\uC744 \uCD5C\uC2E0 \uAC12\uC73C\uB85C \uB36E\uC5B4\uC37C\uC2B5\uB2C8\uB2E4." : "\uBCC0\uACBD\uC810\uC774 \uC5C6\uC5B4 \uADF8\uB300\uB85C \uC720\uC9C0\uD588\uC2B5\uB2C8\uB2E4.";
    logs.unshift({
      id: `${identity.key}-${timestamp}`,
      key: identity.key,
      name: identity.name,
      timestamp,
      action,
      nodeCount: payload.nodes.length,
      summary: `${summary} part: ${identity.partName}`
    });
    await writeExtractionLogs(logs);
    return __spreadProps(__spreadValues({}, identity), {
      action,
      summary,
      logs,
      partsCount: Object.keys(componentEntry.parts).length,
      snapshot: {
        key: identity.key,
        name: identity.name,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        parts: {
          [identity.partKey]: {
            name: identity.partName,
            extractedAt: payload.extractedAt,
            selectionCount: comparable.selectionCount,
            nodes: comparable.nodes
          }
        }
      }
    });
  };
  var sendExtractionState = async () => {
    const logs = await readExtractionLogs();
    const index = await readExtractionIndex();
    const components = summarizeExtractionComponents(index);
    figma.ui.postMessage({
      type: "extractionState",
      logs,
      components
    });
  };
  var findTextNodes = (node) => {
    if (node.type === "TEXT") return [node];
    if (!("children" in node)) return [];
    return node.children.flatMap((child) => findTextNodes(child));
  };
  var extractReplacementText = (promptText) => {
    const quoted = promptText.match(/["“](.+?)["”]/);
    if (quoted == null ? void 0 : quoted[1]) return quoted[1].trim();
    const labeled = extractValue(promptText, ["text", "label", "\uD14D\uC2A4\uD2B8", "\uBB38\uAD6C"]);
    if (labeled) return labeled;
    const changed = promptText.match(/텍스트는\\s*([^\\n]+?)\\s*으로\\s*변경/i);
    if (changed == null ? void 0 : changed[1]) return changed[1].trim().replace(/^["']|["']$/g, "");
    return void 0;
  };
  var applySelectionPrompt = async (promptText) => {
    const selection = figma.currentPage.selection;
    if (!promptText.trim() || selection.length === 0) return false;
    const wantsWide = hasWord(promptText, ["fullwidth", "full width", "fill", "fill container", "\uCC44\uC6B0\uAE30", "\uAC00\uB4DD \uCC44\uC6B0\uAE30", "\uC88C\uC6B0 \uD3ED", "\uD3ED \uB298", "\uAC19\uC740 \uD3ED", "\uD3ED \uB9DE"]);
    const wantsCentered = hasWord(promptText, ["\uAC00\uC6B4\uB370\uC815\uB82C", "\uAC00\uC6B4\uB370 \uC815\uB82C", "center"]);
    const replacementText = extractReplacementText(promptText);
    let changed = false;
    for (const node of selection) {
      if ("layoutMode" in node && wantsWide) {
        const parent = node.parent;
        if (parent && parent.type === "FRAME" && parent.layoutMode !== "NONE") {
          node.layoutAlign = "STRETCH";
          if ("layoutGrow" in node) {
            node.layoutGrow = 1;
          }
          if ("resize" in node) {
            try {
              node.resize(parent.width, node.height);
            } catch (e) {
            }
          }
          changed = true;
        } else if (parent && "width" in parent && "resize" in node) {
          try {
            node.resize(Math.max(node.width, parent.width), node.height);
            if ("x" in node) {
              node.x = Math.max(0, Math.round((parent.width - node.width) / 2));
            }
            changed = true;
          } catch (e) {
          }
        }
      }
      if ("layoutMode" in node && wantsCentered) {
        if (node.layoutMode === "HORIZONTAL" || node.layoutMode === "VERTICAL") {
          node.primaryAxisAlignItems = "CENTER";
          node.counterAxisAlignItems = "CENTER";
          changed = true;
        }
      }
      if (replacementText) {
        const textNodes = findTextNodes(node);
        for (const textNode of textNodes) {
          try {
            await figma.loadFontAsync(textNode.fontName);
          } catch (e) {
            await loadDefaultFont();
          }
          textNode.characters = replacementText;
          textNode.textAlignHorizontal = "CENTER";
          changed = true;
        }
      }
    }
    return changed;
  };
  var buildPromptFromText = (screenInput, theme, promptText) => {
    var _a, _b;
    const screen = normalizeScreen(screenInput, promptText);
    const title = (_a = extractValue(promptText, ["title", "\uC81C\uBAA9", "\uD0C0\uC774\uD2C0"])) != null ? _a : screen === "login" ? "\uB85C\uADF8\uC778" : screen === "settings" ? "\uC124\uC815" : screen === "list" ? "\uBAA9\uB85D" : "\uB300\uC2DC\uBCF4\uB4DC";
    const primaryLabel = (_b = extractValue(promptText, ["primary button", "primary", "\uC8FC\uC694 \uBC84\uD2BC", "\uBA54\uC778 \uBC84\uD2BC", "\uB85C\uADF8\uC778 \uBC84\uD2BC", "\uBC84\uD2BC"])) != null ? _b : screen === "login" ? "\uB85C\uADF8\uC778" : screen === "settings" ? "\uC800\uC7A5" : screen === "list" ? "\uC0C8 \uD56D\uBAA9" : "\uC0DD\uC131";
    const secondaryLabel = extractValue(promptText, ["secondary button", "secondary", "\uBCF4\uC870 \uBC84\uD2BC", "\uCDE8\uC18C \uBC84\uD2BC"]);
    const textButtonLabel = extractValue(promptText, ["text button", "\uD14D\uC2A4\uD2B8 \uBC84\uD2BC", "\uD14D\uC2A4\uD2B8\uBC84\uD2BC"]);
    const iconButtonLabel = extractValue(promptText, ["icon button", "\uC544\uC774\uCF58 \uBC84\uD2BC", "\uC544\uC774\uCF58\uBC84\uD2BC"]);
    const wantsFullWidth = hasWord(promptText, ["fullwidth", "full width", "\uC804\uCCB4\uD3ED", "\uAC00\uB4DD", "\uC88C\uC6B0 \uB9DE\uCDB0", "\uAC19\uC740 \uD3ED", "\uD3ED \uB9DE\uCDB0", "\uD3ED \uC88C\uC6B0"]);
    const wantsLoading = hasWord(promptText, ["loading", "\uB85C\uB529"]);
    const wantsDisabled = hasWord(promptText, ["disabled", "\uBE44\uD65C\uC131"]);
    const wantsCentered = hasWord(promptText, ["\uAC00\uC6B4\uB370\uC815\uB82C", "\uAC00\uC6B4\uB370 \uC815\uB82C", "center"]);
    const wantsIdInput = hasWord(promptText, ["\uC544\uC774\uB514\uC785\uB825", "\uC544\uC774\uB514 \uC785\uB825", "\uC544\uC774\uB514\uC778\uD48B", "\uC774\uBA54\uC77C", "\uC544\uC774\uB514"]);
    const wantsPasswordInput = hasWord(promptText, ["\uBE44\uBC00\uBC88\uD638\uC778\uD48B", "\uBE44\uBC00\uBC88\uD638 \uC785\uB825", "\uBE44\uBC00\uBC88\uD638", "password"]);
    const passwordMask = hasWord(promptText, ["*", "\uB9C8\uC2A4\uD0B9", "\uBCC4\uD45C"]);
    const sections = screen === "login" ? ["header", "form", "action"] : screen === "settings" ? ["header", "form", "action"] : ["header", "content", "action"];
    const components = [
      { type: "text", intent: "title", label: title }
    ];
    if (screen === "login") {
      if (wantsIdInput || wantsPasswordInput || promptText.trim()) {
        components.push({
          type: "input",
          intent: "email-input",
          label: wantsIdInput && !hasWord(promptText, ["\uC774\uBA54\uC77C"]) ? "\uC544\uC774\uB514" : "\uC774\uBA54\uC77C",
          size: "md",
          fullWidth: true
        });
        components.push({
          type: "input",
          intent: "password-input",
          label: passwordMask ? "\uBE44\uBC00\uBC88\uD638 \u2022\u2022\u2022\u2022" : "\uBE44\uBC00\uBC88\uD638",
          size: "md",
          fullWidth: true
        });
      }
    } else if (screen === "settings") {
      components.push(
        { type: "input", intent: "text-input", label: "\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uC774\uB984", size: "md", fullWidth: true }
      );
    } else if (screen === "dashboard") {
      components.push(
        { type: "text", section: "content", intent: "subtitle", label: "\uBC84\uD2BC \uC911\uC2EC \uD398\uC774\uC9C0 \uCD08\uC548" }
      );
    } else {
      components.push(
        { type: "text", section: "content", intent: "subtitle", label: "\uBC84\uD2BC \uBC30\uCE58 \uD14C\uC2A4\uD2B8" }
      );
    }
    components.push({
      type: "button",
      section: "action",
      intent: "primary-action",
      label: primaryLabel,
      variant: "solid-primary",
      size: "md",
      state: wantsDisabled ? "disabled" : wantsLoading ? "loading" : "default",
      fullWidth: wantsFullWidth,
      loading: wantsLoading
    });
    if (secondaryLabel) {
      components.push({
        type: "button",
        section: "action",
        intent: "secondary-action",
        label: secondaryLabel,
        variant: "outlined-assistive",
        size: "md"
      });
    }
    if (textButtonLabel) {
      components.push({
        type: "text-button",
        section: "action",
        label: textButtonLabel,
        variant: /primary|주요/i.test(promptText) ? "primary" : "assistive",
        size: "md"
      });
    }
    if (iconButtonLabel) {
      components.push({
        type: "icon-button",
        section: "action",
        label: iconButtonLabel,
        variant: "solid-primary",
        size: "md"
      });
    }
    return {
      screen,
      theme,
      density: "comfortable",
      sections,
      primaryAction: primaryLabel,
      secondaryAction: secondaryLabel,
      purpose: wantsCentered ? "centered button-first page" : void 0,
      components
    };
  };
  var sendSelectionInfo = () => {
    const selection = figma.currentPage.selection;
    const payload = selection.length === 0 ? { type: "selectionInfo", selected: false, summary: "\uC120\uD0DD\uB41C \uB808\uC774\uC5B4 \uC5C6\uC74C" } : selection.length === 1 ? {
      type: "selectionInfo",
      selected: true,
      summary: selectionContextText(),
      name: selection[0].name,
      nodeType: selection[0].type
    } : {
      type: "selectionInfo",
      selected: true,
      summary: selectionContextText()
    };
    figma.ui.postMessage(payload);
  };
  var uiHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      :root {
        --bg: #121417;
        --panel: #181c20;
        --panel-2: #1f252b;
        --border: #2c333b;
        --text: #eef2f6;
        --muted: #98a2b3;
        --accent: #3f7cff;
        --accent-2: #2f67dc;
      }
      * { box-sizing: border-box; }
      body {
        font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        margin: 0;
        padding: 12px;
        background: var(--bg);
        color: var(--text);
        line-height: 1.35;
      }
      .app { display: flex; flex-direction: column; gap: 10px; }
      .tabs { display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 6px; }
      .tab {
        border: 1px solid var(--border);
        background: var(--panel);
        color: var(--muted);
        border-radius: 10px;
        padding: 8px 10px;
        font-size: 12px;
        font-weight: 600;
      }
      .tab.active {
        background: var(--panel-2);
        color: var(--text);
        border-color: var(--accent);
      }
      .view { display: none; gap: 8px; }
      .view.active { display: flex; flex-direction: column; }
      .row { display: flex; flex-direction: column; gap: 4px; }
      label, .selection-title { font-size: 11px; font-weight: 600; color: var(--muted); }
      input, select, textarea, button {
        width: 100%;
        padding: 8px 10px;
        box-sizing: border-box;
        border-radius: 10px;
        border: 1px solid var(--border);
        background: var(--panel);
        color: var(--text);
        font-size: 12px;
      }
      button { cursor: pointer; background: var(--panel-2); }
      button.primary { background: var(--accent); border-color: var(--accent); color: white; }
      button.primary:hover { background: var(--accent-2); }
      textarea { min-height: 96px; resize: vertical; }
      .hint { font-size: 10px; color: var(--muted); line-height: 1.4; }
      .panel {
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 10px;
        background: var(--panel);
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .selection-summary { font-size: 12px; color: var(--text); }
      .hidden { display: none; }
      .actions { display: flex; gap: 8px; }
      .actions button { flex: 1; }
      .extract-output {
        min-height: 190px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 10px;
      }
      .logs {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-height: 180px;
        overflow: auto;
      }
      .component-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-height: 180px;
        overflow: auto;
      }
      .component-item {
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 8px;
        background: #14191d;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .log-item {
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 8px;
        background: #14191d;
      }
      .log-head {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 11px;
        margin-bottom: 4px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 2px 6px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
      }
      .badge.created { background: rgba(24, 160, 107, 0.16); color: #66d19f; }
      .badge.merged { background: rgba(168, 85, 247, 0.16); color: #c5a3ff; }
      .badge.updated { background: rgba(63, 124, 255, 0.16); color: #8cb5ff; }
      .badge.unchanged { background: rgba(152, 162, 179, 0.16); color: #c8d0da; }
      .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      .busy {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        color: var(--muted);
      }
      .spinner {
        width: 12px;
        height: 12px;
        border-radius: 999px;
        border: 2px solid rgba(255,255,255,0.18);
        border-top-color: var(--accent);
        animation: spin 0.8s linear infinite;
      }
      .hidden-inline { display: none; }
      button:disabled {
        opacity: 0.6;
        cursor: default;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <div class="tabs">
        <button id="tabGenerate" class="tab active">\uC0DD\uC131</button>
        <button id="tabRaw" class="tab">raw JSON</button>
        <button id="tabExtract" class="tab">\uCD94\uCD9C</button>
      </div>

      <div id="viewGenerate" class="view active">
        <div class="row">
          <label>Bridge URL</label>
          <input id="bridgeUrl" value="http://localhost:8787" />
        </div>
        <div class="row">
          <label>Screen</label>
          <select id="screen">
            <option value="auto">auto</option>
            <option value="button-inspection">button-inspection</option>
            <option value="input-inspection">input-inspection</option>
            <option value="catalog">catalog</option>
            <option value="playground">playground</option>
            <option value="login">login</option>
            <option value="settings">settings</option>
            <option value="dashboard">dashboard</option>
            <option value="filter-list">filter-list</option>
          </select>
        </div>
        <div class="row">
          <label>Theme</label>
          <input id="theme" value="core" />
        </div>
        <div class="row">
          <label>Prompt</label>
          <textarea id="promptText" placeholder="\uC608: \uB85C\uADF8\uC778 \uD398\uC774\uC9C0
title: \uB85C\uADF8\uC778
primary button: \uB85C\uADF8\uC778
text button: \uD68C\uC6D0\uAC00\uC785
fullWidth"></textarea>
          <div class="hint">title, primary button, secondary button, text button, icon button, fullWidth, loading, disabled \uD615\uC2DD\uC744 \uC6B0\uC120 \uC77D\uC2B5\uB2C8\uB2E4.</div>
        </div>
        <div class="panel">
          <div class="selection-title">Selection</div>
          <div id="selectionSummary" class="selection-summary">\uC120\uD0DD\uB41C \uB808\uC774\uC5B4 \uC5C6\uC74C</div>
          <div id="selectionPromptWrap" class="hidden row">
            <label>Selection Prompt</label>
            <textarea id="selectionPromptText" placeholder="\uC608: \uC774 \uC601\uC5ED\uC758 \uBC84\uD2BC\uC744 full width\uB85C \uBC14\uAFB8\uACE0 \uAC00\uC6B4\uB370 \uC815\uB82C"></textarea>
            <div class="hint">\uC120\uD0DD\uD55C \uB808\uC774\uC5B4\uB97C \uAE30\uC900\uC73C\uB85C \uC6D0\uD558\uB294 \uBCC0\uACBD \uBC29\uD5A5\uC744 \uC801\uC2B5\uB2C8\uB2E4.</div>
          </div>
        </div>
        <div class="actions">
          <button id="generate" class="primary">Generate in Figma</button>
        </div>
      </div>

      <div id="viewRaw" class="view">
        <div class="panel">
          <div class="selection-title">\uCD94\uCD9C\uB41C Component Sets</div>
          <div class="row">
            <select id="extractComponentSelect">
              <option value="">\uCD94\uCD9C\uB41C component set \uC5C6\uC74C</option>
            </select>
          </div>
          <div class="actions">
            <button id="inspectExtracted">raw JSON \uBCF4\uAE30</button>
            <button id="renderExtracted">\uC7AC\uD604 \uD655\uC778</button>
          </div>
          <div class="hint">\uD604\uC7AC\uB294 \uC7AC\uD574\uC11D \uC5C6\uC774 raw JSON\uB9CC \uD655\uC778\uD569\uB2C8\uB2E4.</div>
        </div>
        <div class="panel">
          <div class="selection-title">\uCD94\uCD9C\uB41C raw JSON</div>
          <textarea id="extractOutput" class="extract-output" placeholder="\uC120\uD0DD\uD55C component set\uC758 raw JSON\uC774 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4." readonly></textarea>
        </div>
      </div>

      <div id="viewExtract" class="view">
        <div class="panel">
          <div class="selection-title">Current Selection</div>
          <div id="extractSelectionSummary" class="selection-summary">\uC120\uD0DD\uB41C \uB808\uC774\uC5B4 \uC5C6\uC74C</div>
          <div class="hint">\uBC84\uD2BC, \uC778\uD48B, \uD3FC \uBB36\uC74C\uCC98\uB7FC \uC758\uBBF8 \uC788\uB294 \uCEF4\uD3EC\uB10C\uD2B8/\uC601\uC5ED\uC744 \uC120\uD0DD\uD55C \uB4A4 \uCD94\uCD9C\uD569\uB2C8\uB2E4.</div>
        </div>
        <div class="actions">
          <button id="extract" class="primary">Extract Selection</button>
          <button id="refreshExtract">\uB85C\uADF8 \uC0C8\uB85C\uACE0\uCE68</button>
        </div>
        <div id="extractBusy" class="busy hidden-inline">
          <span class="spinner"></span>
          <span>\uCD94\uCD9C \uC911...</span>
        </div>
        <div class="panel">
          <div class="selection-title">Extraction Log</div>
          <div id="extractLogs" class="logs">
            <div class="hint">\uC544\uC9C1 \uCD94\uCD9C \uB85C\uADF8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>
          </div>
        </div>
      </div>
    </div>
    <script>
      const btn = document.getElementById("generate");
      const extractBtn = document.getElementById("extract");
      const refreshBtn = document.getElementById("refreshExtract");
      const selectionSummary = document.getElementById("selectionSummary");
      const extractSelectionSummary = document.getElementById("extractSelectionSummary");
      const selectionPromptWrap = document.getElementById("selectionPromptWrap");
      const extractOutput = document.getElementById("extractOutput");
      const extractLogs = document.getElementById("extractLogs");
      const extractComponentSelect = document.getElementById("extractComponentSelect");
      const inspectExtracted = document.getElementById("inspectExtracted");
      const renderExtracted = document.getElementById("renderExtracted");
      const extractBusy = document.getElementById("extractBusy");
      const tabGenerate = document.getElementById("tabGenerate");
      const tabRaw = document.getElementById("tabRaw");
      const tabExtract = document.getElementById("tabExtract");
      const viewGenerate = document.getElementById("viewGenerate");
      const viewRaw = document.getElementById("viewRaw");
      const viewExtract = document.getElementById("viewExtract");
      let extractionInFlight = false;

      const setTab = (tab) => {
        const isGenerate = tab === "generate";
        const isRaw = tab === "raw";
        const isExtract = tab === "extract";
        tabGenerate.className = isGenerate ? "tab active" : "tab";
        tabRaw.className = isRaw ? "tab active" : "tab";
        tabExtract.className = isExtract ? "tab active" : "tab";
        viewGenerate.className = isGenerate ? "view active" : "view";
        viewRaw.className = isRaw ? "view active" : "view";
        viewExtract.className = isExtract ? "view active" : "view";
      };

      const renderLogs = (logs) => {
        if (!logs || logs.length === 0) {
          extractLogs.innerHTML = '<div class="hint">\uC544\uC9C1 \uCD94\uCD9C \uB85C\uADF8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</div>';
          return;
        }
        extractLogs.innerHTML = logs.map((log) => {
          const time = new Date(log.timestamp).toLocaleString();
          return \`
            <div class="log-item">
              <div class="log-head">
                <strong>\${log.name}</strong>
                <span class="badge \${log.action}">\${log.action}</span>
              </div>
              <div class="hint mono">\${log.key}</div>
              <div class="hint">\${log.summary}</div>
              <div class="hint">\${time} \xB7 nodes \${log.nodeCount}</div>
            </div>
          \`;
        }).join('');
      };

      const renderComponents = (components) => {
        if (!components || components.length === 0) {
          extractComponentSelect.innerHTML = '<option value="">\uCD94\uCD9C\uB41C component set \uC5C6\uC74C</option>';
          inspectExtracted.disabled = true;
          renderExtracted.disabled = true;
          return;
        }
        extractComponentSelect.innerHTML = components.map((item, index) => {
          const time = new Date(item.updatedAt).toLocaleString();
          return \`<option value="\${item.key}" \${index===0?'selected':''}>\${item.name} \xB7 parts \${item.partCount} \xB7 \${time}</option>\`;
        }).join('');
        inspectExtracted.disabled = false;
        renderExtracted.disabled = false;
      };

      tabGenerate.onclick = () => setTab("generate");
      tabRaw.onclick = () => setTab("raw");
      tabExtract.onclick = () => setTab("extract");
      const setExtractBusy = (busy) => {
        extractionInFlight = busy;
        extractBtn.disabled = busy;
        refreshBtn.disabled = busy;
        extractBusy.className = busy ? "busy" : "busy hidden-inline";
      };
      btn.onclick = () => {
        const promptText = document.getElementById("promptText").value.trim();
        const selectionPromptText = document.getElementById("selectionPromptText")?.value?.trim?.() ?? "";
        parent.postMessage(
          {
            pluginMessage: {
              type: promptText || selectionPromptText ? "generateFromText" : "generate",
              bridgeUrl: document.getElementById("bridgeUrl").value,
              screen: document.getElementById("screen").value,
              theme: document.getElementById("theme").value,
              promptText,
              selectionPromptText
            }
          },
          "*"
        );
      };
      extractBtn.onclick = () => {
        setExtractBusy(true);
        parent.postMessage(
          { pluginMessage: { type: "extractSelection", bridgeUrl: document.getElementById("bridgeUrl").value } },
          "*"
        );
      };
      refreshBtn.onclick = () => {
        if (extractionInFlight) return;
        parent.postMessage({ pluginMessage: { type: "refreshExtractionState" } }, "*");
      };
      inspectExtracted.onclick = () => {
        const extractionKey = extractComponentSelect.value;
        if (!extractionKey) return;
        setExtractBusy(true);
        parent.postMessage(
          { pluginMessage: { type: "loadExtraction", bridgeUrl: document.getElementById("bridgeUrl").value, extractionKey, render: false } },
          "*"
        );
      };
      renderExtracted.onclick = () => {
        const extractionKey = extractComponentSelect.value;
        if (!extractionKey) return;
        setExtractBusy(true);
        parent.postMessage(
          { pluginMessage: { type: "loadExtraction", bridgeUrl: document.getElementById("bridgeUrl").value, extractionKey, render: true } },
          "*"
        );
      };
      window.onmessage = (event) => {
        const msg = event.data.pluginMessage;
        if (!msg) return;
        if (msg.type === "selectionInfo") {
          selectionSummary.textContent = msg.summary || "\uC120\uD0DD\uB41C \uB808\uC774\uC5B4 \uC5C6\uC74C";
          extractSelectionSummary.textContent = msg.summary || "\uC120\uD0DD\uB41C \uB808\uC774\uC5B4 \uC5C6\uC74C";
          selectionPromptWrap.className = msg.selected ? "" : "hidden";
          return;
        }
        if (msg.type === "selectionExtracted") {
          setExtractBusy(false);
          extractOutput.value = msg.rawPayload || msg.payload;
          if (msg.logs) renderLogs(msg.logs);
          if (msg.components) renderComponents(msg.components);
          return;
        }
        if (msg.type === "extractionLoaded") {
          setExtractBusy(false);
          extractOutput.value = msg.payload;
          return;
        }
        if (msg.type === "extractionState") {
          setExtractBusy(false);
          renderLogs(msg.logs);
          renderComponents(msg.components);
          return;
        }
        if (msg.type === "pluginError") {
          setExtractBusy(false);
        }
      };
      parent.postMessage({ pluginMessage: { type: "pluginReady" } }, "*");
    <\/script>
  </body>
</html>
`;
  if (figma.command === "render-core-families") {
    void (async () => {
      try {
        await renderCoreFamilies();
        figma.closePlugin("Rendered core-families");
      } catch (error) {
        figma.closePlugin(`Render failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    })();
  } else {
    figma.showUI(uiHtml, {
      width: 320,
      height: 620,
      title: "Miterlab Figma Writer"
    });
    sendSelectionInfo();
    figma.on("selectionchange", sendSelectionInfo);
    figma.ui.onmessage = async (message) => {
      var _a;
      try {
        if (message.type === "pluginReady" || message.type === "refreshExtractionState") {
          if (message.type === "pluginReady") {
            const resetDone = await figma.clientStorage.getAsync(EXTRACTION_RESET_MARKER_KEY);
            if (!resetDone) {
              await purgeAllExtractionState();
              await figma.clientStorage.setAsync(EXTRACTION_RESET_MARKER_KEY, true);
            }
          }
          sendSelectionInfo();
          await sendExtractionState();
          return;
        }
        if (message.type === "loadExtraction") {
          const raw = await loadExtractionArtifact(message.bridgeUrl, message.extractionKey);
          if (message.render) {
            await renderRawExtraction(raw.raw);
          }
          figma.ui.postMessage({
            type: "extractionLoaded",
            payload: JSON.stringify(raw.raw, null, 2)
          });
          return;
        }
        if (message.type === "extractSelection") {
          if (figma.currentPage.selection.length === 0) {
            figma.notify("\uBA3C\uC800 \uCD94\uCD9C\uD560 \uB808\uC774\uC5B4\uB97C \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.");
            figma.ui.postMessage({ type: "pluginError" });
            return;
          }
          const extracted = extractSelectionPayload();
          const persisted = await persistExtractionPayload(extracted);
          const extractionIndex = await readExtractionIndex();
          const blueprintState = await persistDerivedBlueprints();
          const rawComponent = extractRawComponentPayload();
          let saveResult = { saved: [] };
          let saveWarning;
          try {
            saveResult = await saveExtractionArtifact(message.bridgeUrl, {
              extractionKey: persisted.key,
              extractionName: persisted.name,
              snapshot: persisted.snapshot,
              inputBlueprint: blueprintState.inputBlueprint,
              rawComponent
            });
          } catch (error) {
            saveWarning = error instanceof Error ? error.message : String(error);
          }
          figma.ui.postMessage({
            type: "selectionExtracted",
            payload: JSON.stringify(extracted, null, 2),
            rawPayload: rawComponent ? JSON.stringify(rawComponent, null, 2) : JSON.stringify(extracted, null, 2),
            logs: persisted.logs,
            components: summarizeExtractionComponents(extractionIndex)
          });
          figma.notify(
            saveWarning ? `${persisted.name}: \uCD94\uCD9C\uC740 \uC644\uB8CC\uB410\uC9C0\uB9CC \uD30C\uC77C \uC800\uC7A5\uC740 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4` : `${persisted.name}: ${persisted.summary} ${saveResult.saved.length}\uAC1C \uD30C\uC77C \uC800\uC7A5`
          );
          if (saveWarning) {
            console.error("[miterlab][extract]", saveWarning);
          }
          return;
        }
        if (message.type === "generateFromText" && ((_a = message.selectionPromptText) == null ? void 0 : _a.trim())) {
          const selectionChanged = await applySelectionPrompt(message.selectionPromptText);
          if (selectionChanged) {
            figma.notify("\uC120\uD0DD\uD55C \uB808\uC774\uC5B4\uB97C \uC218\uC815\uD588\uC2B5\uB2C8\uB2E4.");
            return;
          }
        }
        const payload = message.type === "generateFromText" ? await fetchPayloadFromPrompt(
          message.bridgeUrl,
          buildPromptFromText(
            message.screen,
            message.theme,
            [message.promptText, message.selectionPromptText, selectionContextText()].filter(Boolean).join("\n")
          )
        ) : await fetchPayload(message.bridgeUrl, message.screen, message.theme);
        const result = await renderPayload(payload);
        figma.notify(`Generated ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
      } catch (error) {
        figma.ui.postMessage({ type: "pluginError" });
        figma.notify(`Generation failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    };
  }
})();
