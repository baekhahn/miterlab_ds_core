import { renderPayload } from "./write/renderPayload";
import type { PluginUiMessage } from "./types";
import { contractPreviewOptions, renderContractPreview } from "./write/renderContractPreview";
import buttonInspectionPayload from "../../../artifacts/figma/button-inspection/mcp-payload.json";
import inputInspectionPayload from "../../../artifacts/figma/input-inspection/mcp-payload.json";
import type { FigmaWritePayload } from "../../../shared/contracts/figmaWritePayload";

const inspectionFamilyPayloads: Record<string, FigmaWritePayload> = {
  "button-inspection": buttonInspectionPayload as unknown as FigmaWritePayload,
  "input-inspection": inputInspectionPayload as unknown as FigmaWritePayload
};

const renderInspectionFamily = async (family: string) => {
  const payload = inspectionFamilyPayloads[family];
  if (!payload) {
    throw new Error(`Unknown inspection family: ${family}`);
  }

  const result = await renderPayload(payload);
  figma.notify(`Rendered ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
};

const previewOptionsByLevel = {
  component: contractPreviewOptions.filter((item) => item.level === "component"),
  module: contractPreviewOptions.filter((item) => item.level === "module"),
  pattern: contractPreviewOptions.filter((item) => item.level === "pattern")
};

const uiHtml = `
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
        <p>Component, Module, Pattern을 선택해 Figma에서 바로 확인합니다.</p>
        <label for="previewLevel">Level</label>
        <select id="previewLevel">
          <option value="component">Component</option>
          <option value="module">Module</option>
          <option value="pattern">Pattern</option>
        </select>
        <label for="previewItem">Contract</label>
        <select id="previewItem"></select>
        <button id="renderContractPreview">Render Selected Contract</button>
        <div class="hint">Button/Input은 inspection 기준으로, 나머지는 contract preview 기준으로 렌더합니다.</div>
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
    </script>
  </body>
</html>
`;

figma.showUI(uiHtml, {
  width: 320,
  height: 240,
  title: "Miterlab Figma Writer"
});

figma.ui.onmessage = async (message: PluginUiMessage) => {
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
