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
  var loadDefaultFont = async () => {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  };
  var createTextNode = async (node) => {
    await loadDefaultFont();
    const text = figma.createText();
    text.name = node.name;
    text.characters = typeof node.text === "string" ? node.text : "";
    text.x = node.x;
    text.y = node.y;
    text.resize(Math.max(1, node.width), Math.max(1, node.height));
    return text;
  };

  // src/write/createInstanceNode.ts
  var rgb = (hex) => {
    const normalized = hex.replace("#", "");
    const bigint = Number.parseInt(normalized, 16);
    return {
      r: (bigint >> 16 & 255) / 255,
      g: (bigint >> 8 & 255) / 255,
      b: (bigint & 255) / 255
    };
  };
  var addLabel = async (frame, textValue, color, align = "MIN", fontSize = 16) => {
    await loadDefaultFont();
    const text = figma.createText();
    text.characters = textValue;
    text.fontSize = fontSize;
    text.fills = [{ type: "SOLID", color: rgb(color) }];
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
  var createInputNode = async (node) => {
    const size = getSizeKey(node);
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(220, node.width), Math.max(size === "sm" ? 40 : size === "lg" ? 48 : 40, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = size === "sm" ? 12 : 14;
    frame.paddingRight = size === "sm" ? 12 : 14;
    frame.itemSpacing = 8;
    frame.cornerRadius = 10;
    frame.strokes = [{ type: "SOLID", color: rgb("#D1D5DB") }];
    frame.strokeWeight = 1;
    frame.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
    await addLabel(frame, node.text || "Input", "#111827", "MIN", 15);
    return frame;
  };
  var createButtonNode = async (node) => {
    const size = getSizeKey(node);
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(
      Math.max(size === "sm" ? 88 : size === "lg" ? 96 : 88, node.width),
      Math.max(size === "sm" ? 40 : size === "lg" ? 48 : 40, node.height)
    );
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = size === "lg" ? 20 : size === "sm" ? 14 : 16;
    frame.paddingRight = size === "lg" ? 20 : size === "sm" ? 14 : 16;
    frame.itemSpacing = 8;
    frame.cornerRadius = size === "lg" ? 12 : 10;
    frame.strokes = [];
    frame.fills = [{ type: "SOLID", color: rgb("#2563EB") }];
    await addLabel(frame, node.text || "Action", "#FFFFFF", "CENTER", 15);
    return frame;
  };
  var createFilterButtonNode = async (node) => {
    var _a;
    const size = getSizeKey(node) === "lg" ? "md" : getSizeKey(node);
    const selected = ((_a = node.variant) == null ? void 0 : _a.selected) === true;
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(size === "sm" ? 64 : 72, node.width), Math.max(size === "sm" ? 28 : 32, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = size === "sm" ? 10 : 12;
    frame.paddingRight = size === "sm" ? 10 : 12;
    frame.itemSpacing = 6;
    frame.cornerRadius = size === "sm" ? 14 : 16;
    frame.strokeWeight = 1;
    frame.strokes = [{ type: "SOLID", color: rgb(selected ? "#12141A" : "#D7DEE8") }];
    frame.fills = [{ type: "SOLID", color: rgb(selected ? "#12141A" : "#F7F8FA") }];
    await addLabel(frame, node.text || "Filter", selected ? "#FFFFFF" : "#1F2430", "CENTER", 14);
    return frame;
  };
  var createGenericInstanceNode = async (node) => {
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(220, node.width), Math.max(40, node.height));
    frame.x = node.x;
    frame.y = node.y;
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "MIN";
    frame.counterAxisAlignItems = "CENTER";
    frame.paddingLeft = 14;
    frame.paddingRight = 14;
    frame.cornerRadius = 10;
    frame.strokes = [{ type: "SOLID", color: rgb("#CBD5E1") }];
    frame.strokeWeight = 1;
    frame.fills = [{ type: "SOLID", color: rgb("#F8FAFC") }];
    await addLabel(frame, node.text || node.component || "Component", "#0F172A");
    return frame;
  };
  var createInstanceNode = async (node, theme = "core") => {
    var _a, _b;
    if (node.component === "Input") {
      const input = await createInputNode(node);
      if (theme === "core") {
        input.resize(Math.max(296, node.width), Math.max(40, node.height));
        input.cornerRadius = 10;
        input.strokes = [{ type: "SOLID", color: rgb("#D7DEE8") }];
        input.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
      }
      return input;
    }
    if (node.component === "Button") {
      const button = await createButtonNode(node);
      if (theme === "core") {
        button.resize(Math.max(88, node.width), Math.max(((_a = node.variant) == null ? void 0 : _a.size) === "lg" ? 48 : 40, node.height));
        button.cornerRadius = ((_b = node.variant) == null ? void 0 : _b.size) === "lg" ? 12 : 10;
        button.fills = [{ type: "SOLID", color: rgb("#12141A") }];
      }
      return button;
    }
    if (node.component === "FilterButton") {
      return await createFilterButtonNode(node);
    }
    return await createGenericInstanceNode(node);
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
    child.x = 0;
    child.y = index * 56;
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
    const frame = createFrameNode(__spreadProps(__spreadValues({}, root), { name: `${payload.document.name} (${payload.document.theme})` }), theme);
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

  // src/code.ts
  var uiHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 16px; }
      .row { margin-bottom: 8px; }
      input, select, button { width: 100%; padding: 8px; box-sizing: border-box; }
      button { cursor: pointer; }
    </style>
  </head>
  <body>
    <div class="row">
      <label>Bridge URL</label>
      <input id="bridgeUrl" value="http://localhost:8787" />
    </div>
    <div class="row">
      <label>Screen</label>
      <select id="screen">
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
      <button id="generate">Generate in Figma</button>
    </div>
    <script>
      const btn = document.getElementById("generate");
      btn.onclick = () => {
        parent.postMessage(
          {
            pluginMessage: {
              type: "generate",
              bridgeUrl: document.getElementById("bridgeUrl").value,
              screen: document.getElementById("screen").value,
              theme: document.getElementById("theme").value
            }
          },
          "*"
        );
      };
    <\/script>
  </body>
</html>
`;
  figma.showUI(uiHtml, {
    width: 320,
    height: 260,
    title: "Miterlab Figma Writer"
  });
  figma.ui.onmessage = async (message) => {
    if (message.type !== "generate") return;
    try {
      const payload = await fetchPayload(message.bridgeUrl, message.screen, message.theme);
      const result = await renderPayload(payload);
      figma.notify(`Generated ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
    } catch (error) {
      figma.notify(`Generation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
})();
