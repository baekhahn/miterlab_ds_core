import { renderPayload } from "./write/renderPayload";
import type { PluginUiMessage } from "./types";
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

const uiHtml = `
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
        <p>Button/Input inspection만 렌더합니다.</p>
        <label for="inspectionFamily">Family</label>
        <select id="inspectionFamily">
          <option value="button-inspection">button-inspection</option>
          <option value="input-inspection">input-inspection</option>
        </select>
        <button id="renderInspectionFamily">Render Selected Family</button>
        <div class="hint">기존 프레임이 있으면 지우고 다시 렌더해 주세요.</div>
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

    if (message.type === "renderInspectionFamily") {
      await renderInspectionFamily(message.family);
      figma.ui.postMessage({ type: "renderDone" });
    }
  } catch (error) {
    figma.ui.postMessage({ type: "pluginError" });
    figma.notify(`Render failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};
