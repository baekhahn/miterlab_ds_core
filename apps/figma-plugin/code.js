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
  var createFrameNode = (node) => {
    const frame = figma.createFrame();
    frame.name = node.name;
    frame.resize(Math.max(1, node.width), Math.max(1, node.height));
    frame.x = node.x;
    frame.y = node.y;
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

  // src/write/renderPayload.ts
  var toSceneNode = async (node) => {
    if (node.type === "TEXT") {
      return await createTextNode(node);
    }
    if (node.type === "FRAME" || node.type === "GROUP") {
      return createFrameNode(node);
    }
    return createContainerNode(node);
  };
  var renderChildren = async (parent, children) => {
    let count = 0;
    for (const child of children) {
      const next = await toSceneNode(child);
      parent.appendChild(next);
      count += 1;
      if (child.children && child.children.length > 0 && next.type === "FRAME") {
        count += await renderChildren(next, child.children);
      }
    }
    return count;
  };
  var renderPayload = async (payload) => {
    const root = payload.nodes[0];
    if (!root) {
      throw new Error("Payload has no root node");
    }
    const frame = createFrameNode(__spreadProps(__spreadValues({}, root), { name: `${payload.document.name} (${payload.document.theme})` }));
    figma.currentPage.appendChild(frame);
    let createdNodeCount = 1;
    if (root.children && root.children.length > 0) {
      createdNodeCount += await renderChildren(frame, root.children);
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
      <input id="theme" value="alpha" />
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
