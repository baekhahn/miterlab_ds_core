import { renderPayload } from "./write/renderPayload";
import type { PluginUiMessage } from "./types";
import { contractPreviewOptions, renderContractPreview } from "./write/renderContractPreview";
import buttonInspectionPayload from "../../../artifacts/figma/button-inspection/mcp-payload.json";
import inputInspectionPayload from "../../../artifacts/figma/input-inspection/mcp-payload.json";
import type { FigmaWritePayload } from "../../../shared/contracts/figmaWritePayload";
import {
  hasRuntimeFileKey,
  summarizeSelection
} from "./extract/serializeSelection";

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

const BRIDGE_URL = "http://localhost:8787";
const BUILD_STAMP = new Date().toISOString();
const PREVIEW_OPTIONS_JSON = JSON.stringify(previewOptionsByLevel);
const BRIDGE_URL_JSON = JSON.stringify(BRIDGE_URL);
const BUILD_STAMP_JSON = JSON.stringify(BUILD_STAMP);

const parseFileKeyFromNodeUrl = (value?: string) => {
  if (!value) return null;
  const raw = value.trim();
  if (!raw) return null;

  try {
    const normalized = /^https?:\/\//.test(raw) ? raw : `https://${raw.replace(/^\/+/, "")}`;
    const url = new URL(normalized);
    const match =
      url.pathname.match(/^\/design\/([^/]+)/) ??
      url.pathname.match(/^\/proto\/([^/]+)/) ??
      url.pathname.match(/^\/board\/([^/]+)/);
    return match?.[1] ?? null;
  } catch {
    const match = raw.match(/figma\.com\/(?:design|proto|board)\/([^/?#]+)/i);
    return match?.[1] ?? null;
  }
};

const buildMinimalExtractionReference = (selection: readonly SceneNode[], fallbackNodeUrl?: string) => {
  const runtimeFileKey = figma.fileKey ?? "";
  const parsedFileKey = parseFileKeyFromNodeUrl(fallbackNodeUrl);
  const fileKey = runtimeFileKey || parsedFileKey;

  if (!fileKey) {
    throw new Error("이 파일에서는 fileKey를 직접 읽을 수 없습니다. Current File URL을 먼저 저장해 주세요.");
  }

  return {
    fileKey,
    pageName: figma.currentPage.name,
    selectionCount: selection.length,
    nodes: selection.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      url: `https://www.figma.com/design/${fileKey}/${encodeURIComponent(figma.root.name)}?node-id=${node.id.replace(":", "-")}`,
      isFigmaComponent: node.type === "INSTANCE" || node.type === "COMPONENT" || node.type === "COMPONENT_SET",
      componentRole:
        node.type === "INSTANCE"
          ? "instance"
          : node.type === "COMPONENT"
            ? "component"
            : node.type === "COMPONENT_SET"
              ? "component-set"
              : "node",
      mainComponentName: null,
      componentKey: undefined,
      variantProperties: undefined
    }))
  };
};

const sendSelectionInfo = () => {
  figma.ui.postMessage({
    type: "selectionInfo",
    summary: summarizeSelection(figma.currentPage.selection),
    hasRuntimeFileKey: Boolean(figma.fileKey)
  });
};

const sendSelectionSvg = async () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    figma.ui.postMessage({ type: "selectionSvg", svg: null });
    return;
  }

  const primary = selection[0];
  try {
    const bytes = await primary.exportAsync({
      format: "SVG",
      svgOutlineText: false,
      svgIdAttribute: false
    });
    const svg = new TextDecoder("utf-8").decode(bytes);
    figma.ui.postMessage({ type: "selectionSvg", svg });
  } catch {
    figma.ui.postMessage({ type: "selectionSvg", svg: null });
  }
};

const flushUi = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

const rawUiHtml = `
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #09090b;
        --panel: #111111;
        --panel-2: #18181b;
        --line: #27272a;
        --text: #fafafa;
        --muted: #a1a1aa;
        --accent: #0066ff;
        --danger: #ff6363;
        --warn: #f59e0b;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 14px;
        background: var(--bg);
        color: var(--text);
        font: 12px/1.45 Pretendard, "Pretendard Variable", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        width: 100%;
        overflow-x: hidden;
      }
      .app {
        display: grid;
        gap: 12px;
        width: 100%;
        min-width: 0;
      }
      .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: var(--panel);
      }
      .tab, button, select, input {
        font: inherit;
      }
      .tab {
        border: 1px solid transparent;
        background: transparent;
        color: var(--muted);
        border-radius: 8px;
        padding: 8px 10px;
        cursor: pointer;
        font-weight: 600;
      }
      .tab.active {
        background: var(--panel-2);
        border-color: var(--line);
        color: var(--text);
      }
      .panel {
        display: none;
        gap: 10px;
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: var(--panel);
        width: 100%;
        min-width: 0;
      }
      .panel.active { display: grid; }
      .label {
        color: var(--muted);
        font-size: 11px;
        font-weight: 600;
      }
      .control, .btn {
        width: 100%;
        min-width: 0;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--line);
        background: var(--panel-2);
        color: var(--text);
      }
      .btn {
        cursor: pointer;
        font-weight: 600;
      }
      .btn.primary {
        border-color: transparent;
        background: var(--accent);
        color: #fff;
      }
      .btn:disabled { opacity: 0.5; cursor: default; }
      .row2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .meta {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        padding: 12px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: var(--panel-2);
      }
      .meta-item { display: grid; gap: 2px; }
      .meta-key { color: var(--muted); font-size: 11px; font-weight: 600; }
      .meta-value { color: var(--text); min-width: 0; word-break: break-word; }
      .status {
        min-height: 18px;
        color: var(--muted);
        font-size: 11px;
        width: 100%;
        min-width: 0;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: anywhere;
      }
      .status.error { color: var(--danger); }
      .status.warning { color: var(--warn); }
      .code {
        max-height: 210px;
        overflow: auto;
        padding: 12px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: #0c0c0f;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: anywhere;
        font: 11px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        color: #e4e4e7;
        width: 100%;
        min-width: 0;
      }
      .hint { color: var(--muted); font-size: 11px; }
      .spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 6px;
        border-radius: 999px;
        border: 1.5px solid rgba(255,255,255,0.28);
        border-top-color: rgba(255,255,255,0.92);
        animation: spin 0.8s linear infinite;
        vertical-align: -2px;
      }
      .hidden { display: none !important; }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <div class="tabs">
        <button type="button" class="tab active" id="tabInspection">Inspection</button>
        <button type="button" class="tab" id="tabExtraction">Extraction</button>
      </div>

      <div class="panel active" id="panelInspection">
        <div class="label">Level</div>
        <select class="control" id="previewLevel">
          <option value="component">Component</option>
          <option value="module">Module</option>
          <option value="pattern">Pattern</option>
        </select>
        <div class="label">Contract</div>
        <select class="control" id="previewItem"></select>
        <button type="button" class="btn primary" id="renderContractPreview">Render Selected Contract</button>
        <div class="hint">Button/Input은 inspection payload 기준으로 렌더합니다.</div>
      </div>

      <div class="panel" id="panelExtraction">
        <div class="label">Current File URL</div>
        <input class="control" id="fileUrlInput" placeholder="https://www.figma.com/design/..." />

        <div class="row2">
          <button type="button" class="btn" id="refreshSelection">Refresh</button>
          <button type="button" class="btn" id="bridgeTest">Bridge Test</button>
        </div>
        <div class="row2">
          <button type="button" class="btn primary" id="extractSelection"><span id="extractSpinner" class="spinner hidden"></span><span id="extractLabel">Extract</span></button>
          <button type="button" class="btn" id="cancelExtraction" disabled>Cancel</button>
        </div>
        <button type="button" class="btn" id="retryExtraction" disabled>Retry</button>

        <div class="status" id="extractionStatus"></div>
        <div class="hint" id="buildStamp"></div>

        <div class="meta">
          <div class="meta-item"><div class="meta-key">Selection</div><div class="meta-value" id="selectionName">선택 없음</div></div>
          <div class="meta-item"><div class="meta-key">Type</div><div class="meta-value" id="selectionType">-</div></div>
          <div class="meta-item"><div class="meta-key">Dimensions</div><div class="meta-value" id="selectionDimensions">-</div></div>
          <div class="meta-item"><div class="meta-key">Page</div><div class="meta-value" id="selectionPage">-</div></div>
          <div class="meta-item"><div class="meta-key">File Key</div><div class="meta-value" id="selectionFileKey">-</div></div>
          <div class="meta-item"><div class="meta-key">Node URL</div><div class="meta-value" id="selectionUrl">-</div></div>
        </div>

        <div class="code" id="selectionJson">선택 노드를 새로고침하면 MCP extraction 기준 정보가 표시됩니다.</div>
      </div>
    </div>

    <script>
      (() => {
        const optionsByLevel = __PREVIEW_OPTIONS_JSON__;
        const BRIDGE_URL = __BRIDGE_URL_JSON__;
        const BUILD_STAMP = __BUILD_STAMP_JSON__;

        const $ = (id) => document.getElementById(id);
        const el = {
          tabInspection: $("tabInspection"),
          tabExtraction: $("tabExtraction"),
          panelInspection: $("panelInspection"),
          panelExtraction: $("panelExtraction"),
          previewLevel: $("previewLevel"),
          previewItem: $("previewItem"),
          render: $("renderContractPreview"),
          refresh: $("refreshSelection"),
          bridgeTest: $("bridgeTest"),
          extract: $("extractSelection"),
          cancel: $("cancelExtraction"),
          retry: $("retryExtraction"),
          spinner: $("extractSpinner"),
          extractLabel: $("extractLabel"),
          status: $("extractionStatus"),
          fileUrlInput: $("fileUrlInput"),
          selectionName: $("selectionName"),
          selectionType: $("selectionType"),
          selectionDimensions: $("selectionDimensions"),
          selectionPage: $("selectionPage"),
          selectionFileKey: $("selectionFileKey"),
          selectionUrl: $("selectionUrl"),
          selectionJson: $("selectionJson"),
          buildStamp: $("buildStamp")
        };

        el.buildStamp.textContent = "Build " + BUILD_STAMP;

        let memoryFileUrl = "";
        let latestSelectionSummary = null;
        let lastExtractionName = "";
        let lastNodeUrl = "";
        let latestSelectionSvg = null;
        let selectionSvgResolver = null;
        let abortController = null;
        let timer = null;
        let poller = null;
        let startedAt = 0;
        let statusText = "";
        let statusTone = "";

        const getStoredFileUrl = () => {
          try {
            return localStorage.getItem("mads-current-file-url") || memoryFileUrl || "";
          } catch {
            return memoryFileUrl || "";
          }
        };

        const setStoredFileUrl = (value) => {
          memoryFileUrl = value || "";
          try {
            if (value) localStorage.setItem("mads-current-file-url", value);
            else localStorage.removeItem("mads-current-file-url");
          } catch {}
        };

        const parseFileKeyFromUrl = (value) => {
          if (!value) return "";
          const raw = String(value).trim();
          if (!raw) return "";
          try {
            const normalized = /^https?:\\/\\//.test(raw) ? raw : "https://" + raw.replace(/^\\/+/, "");
            const url = new URL(normalized);
            const match = url.pathname.match(/^\\/(design|proto|board)\\/([^/]+)/);
            return match ? match[2] : "";
          } catch {
            const match = raw.match(/figma\\.com\\/(?:design|proto|board)\\/([^/?#]+)/i);
            return match ? match[1] : "";
          }
        };

        const setStatus = (text, tone) => {
          statusText = text || "";
          statusTone = tone || "";
          el.status.textContent = statusText;
          el.status.className = "status" + (statusTone ? " " + statusTone : "");
        };

        const stopTimer = () => {
          if (timer) clearInterval(timer);
          timer = null;
        };

        const startTimer = () => {
          stopTimer();
          startedAt = Date.now();
          timer = setInterval(() => {
            const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
            el.status.textContent = statusText ? statusText + " " + seconds + "s" : seconds + "s";
          }, 1000);
        };

        const stopPoll = () => {
          if (poller) clearInterval(poller);
          poller = null;
        };

        const setLoading = (loading) => {
          el.extract.disabled = loading;
          el.cancel.disabled = !loading;
          el.retry.disabled = loading || !lastNodeUrl;
          el.spinner.classList.toggle("hidden", !loading);
          el.extractLabel.textContent = loading ? "Extracting" : "Extract";
          if (!loading) stopTimer();
        };

        const switchTab = (next) => {
          const inspection = next === "inspection";
          el.tabInspection.classList.toggle("active", inspection);
          el.tabExtraction.classList.toggle("active", !inspection);
          el.panelInspection.classList.toggle("active", inspection);
          el.panelExtraction.classList.toggle("active", !inspection);
        };

        const syncPreviewItems = () => {
          const list = optionsByLevel[el.previewLevel.value] || [];
          el.previewItem.innerHTML = "";
          list.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option.id;
            opt.textContent = option.label;
            el.previewItem.appendChild(opt);
          });
        };

        const renderSelectionSummary = (summary, hasRuntimeFileKey) => {
          latestSelectionSummary = summary;
          latestSelectionSvg = null;
          el.selectionName.textContent = summary.selectionCount > 1 ? summary.primaryName + " 외 " + (summary.selectionCount - 1) + "개" : summary.primaryName;
          el.selectionType.textContent = summary.primaryType;
          el.selectionDimensions.textContent = summary.dimensions;
          el.selectionPage.textContent = summary.pageName;
          el.selectionFileKey.textContent = summary.fileKey || "-";
          el.selectionUrl.textContent = summary.nodeUrl || "-";
          el.selectionJson.textContent = JSON.stringify(summary, null, 2);

          const hasStored = Boolean(getStoredFileUrl().trim());
          if (!hasRuntimeFileKey && !hasStored) {
            setStatus("이 파일은 runtime fileKey가 비어 있습니다. Current File URL이 필요합니다.", "warning");
          } else if (!hasRuntimeFileKey && hasStored) {
            setStatus("저장된 Current File URL을 사용합니다.");
          } else {
            setStatus("");
          }
        };

        const checkBridge = async () => {
          setStatus("Bridge를 확인 중입니다.");
          try {
            const response = await fetch(BRIDGE_URL + "/health");
            if (!response.ok) throw new Error("health check failed");
            setStatus("Bridge connected.");
          } catch (error) {
            setStatus(error && error.message ? error.message : "Bridge not running.", "error");
          }
        };

        const pollStatus = (extractionName) => {
          stopPoll();
          if (!extractionName) return;
          const run = async () => {
            try {
              const response = await fetch(BRIDGE_URL + "/extraction-status", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ extractionName })
              });
              const result = await response.json();
              el.selectionJson.textContent = JSON.stringify(result, null, 2);
              if (!response.ok) throw new Error(result && result.error ? result.error : "Status request failed.");
              if (result.status === "completed") {
                stopPoll();
                setLoading(false);
                setStatus("Extraction complete. Saved to " + (result.outputDir || "artifacts/figma-extractions"));
                return;
              }
              if (result.status === "failed") {
                stopPoll();
                setLoading(false);
                setStatus(result.error || "Extraction failed.", "error");
                return;
              }
              setStatus("MCP artifact를 수집 중입니다.");
            } catch (error) {
              stopPoll();
              setLoading(false);
              setStatus(error && error.message ? error.message : "상태 확인 중 오류가 발생했습니다.", "error");
            }
          };
          run();
          poller = setInterval(run, 3000);
        };

        const requestSelectionSvg = () => new Promise((resolve) => {
          selectionSvgResolver = resolve;
          parent.postMessage({ pluginMessage: { type: "requestSelectionSvg" } }, "*");
          setTimeout(() => {
            if (selectionSvgResolver === resolve) {
              selectionSvgResolver = null;
              resolve(null);
            }
          }, 3000);
        });

        const runExtraction = async () => {
          setStoredFileUrl(el.fileUrlInput.value.trim());
          lastNodeUrl = el.fileUrlInput.value.trim() || getStoredFileUrl();

          if (!latestSelectionSummary || !latestSelectionSummary.selectionCount) {
            setStatus("선택된 노드가 없습니다.", "error");
            return;
          }

          const fileKey = latestSelectionSummary.fileKey || parseFileKeyFromUrl(lastNodeUrl);
          if (!fileKey) {
            setStatus("Current File URL에서 fileKey를 읽을 수 없습니다.", "error");
            return;
          }

          if (!latestSelectionSvg) {
            setStatus("선택 SVG를 준비 중입니다.");
            startTimer();
            latestSelectionSvg = await requestSelectionSvg();
          }

          const payload = {
            extractionName: latestSelectionSummary.primaryName || "figma-selection",
            reference: {
              fileKey,
              pageName: latestSelectionSummary.pageName || "",
              selectionCount: latestSelectionSummary.selectionCount || 0,
              nodes: (latestSelectionSummary.nodeIds || []).map((nodeId, index) => ({
                id: nodeId,
                name: index === 0 ? latestSelectionSummary.primaryName : "Selected node " + (index + 1),
                type: index === 0 ? latestSelectionSummary.primaryType : "NODE",
                url: index === 0 && latestSelectionSummary.nodeUrl
                  ? latestSelectionSummary.nodeUrl
                  : "https://www.figma.com/design/" + fileKey + "/selection?node-id=" + String(nodeId).replace(":", "-"),
                isFigmaComponent: false,
                componentRole: "node",
                mainComponentName: null,
                componentKey: undefined,
                variantProperties: undefined
              }))
            },
            selectionSvg: latestSelectionSvg || undefined
          };

          stopPoll();
          setLoading(true);
          setStatus("Bridge로 extraction 요청을 전송했습니다.");
          startTimer();

          try {
            abortController = new AbortController();
            const response = await fetch(BRIDGE_URL + "/extract-via-mcp", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload),
              signal: abortController.signal
            });
            const result = await response.json();
            el.selectionJson.textContent = JSON.stringify(result, null, 2);
            if (!response.ok) throw new Error(result && result.error ? result.error : "Bridge request failed.");
            lastExtractionName = result.extractionName || payload.extractionName;
            if (result.status === "processing") {
              setStatus("MCP artifact를 수집 중입니다.");
              pollStatus(lastExtractionName);
            } else {
              setLoading(false);
              setStatus("Extraction complete. Saved to " + (result.outputDir || "artifacts/figma-extractions"));
            }
          } catch (error) {
            if (error && error.name === "AbortError") {
              setStatus("Extraction cancelled.", "warning");
            } else {
              setStatus(error && error.message ? error.message : "오류가 발생했습니다.", "error");
            }
            setLoading(false);
          } finally {
            abortController = null;
          }
        };

        window.onmessage = (event) => {
          const msg = event.data && event.data.pluginMessage;
          if (!msg) return;
          if (msg.type === "renderDone" || msg.type === "pluginError") {
            el.render.disabled = false;
          }
          if (msg.type === "selectionInfo") {
            renderSelectionSummary(msg.summary, msg.hasRuntimeFileKey);
          }
          if (msg.type === "selectionSvg") {
            latestSelectionSvg = typeof msg.svg === "string" ? msg.svg : null;
            if (selectionSvgResolver) {
              const resolve = selectionSvgResolver;
              selectionSvgResolver = null;
              resolve(latestSelectionSvg);
            }
          }
          if (msg.type === "pluginError") {
            setStatus(msg.message || "오류가 발생했습니다.", "error");
            setLoading(false);
          }
        };

        el.tabInspection.addEventListener("click", () => switchTab("inspection"));
        el.tabExtraction.addEventListener("click", () => switchTab("extraction"));
        el.previewLevel.addEventListener("change", syncPreviewItems);
        el.render.addEventListener("click", () => {
          el.render.disabled = true;
          parent.postMessage({ pluginMessage: { type: "renderContractPreview", previewId: el.previewItem.value } }, "*");
        });
        el.refresh.addEventListener("click", () => {
          parent.postMessage({ pluginMessage: { type: "requestSelectionInfo" } }, "*");
          parent.postMessage({ pluginMessage: { type: "requestSelectionSvg" } }, "*");
          checkBridge();
        });
        el.bridgeTest.addEventListener("click", checkBridge);
        el.extract.addEventListener("click", runExtraction);
        el.retry.addEventListener("click", runExtraction);
        el.cancel.addEventListener("click", () => {
          if (abortController) abortController.abort();
          stopPoll();
          setLoading(false);
          setStatus("Extraction cancelled.", "warning");
        });
        el.fileUrlInput.addEventListener("change", () => setStoredFileUrl(el.fileUrlInput.value.trim()));
        el.fileUrlInput.addEventListener("blur", () => setStoredFileUrl(el.fileUrlInput.value.trim()));

        el.fileUrlInput.value = getStoredFileUrl();
        lastNodeUrl = getStoredFileUrl();
        syncPreviewItems();
        setLoading(false);
        parent.postMessage({ pluginMessage: { type: "pluginReady" } }, "*");
        parent.postMessage({ pluginMessage: { type: "requestSelectionSvg" } }, "*");
        checkBridge();
      })();
    </script>
  </body>
</html>
`;

const uiHtml = rawUiHtml
  .replace("__PREVIEW_OPTIONS_JSON__", PREVIEW_OPTIONS_JSON)
  .replace("__BRIDGE_URL_JSON__", BRIDGE_URL_JSON)
  .replace("__BUILD_STAMP_JSON__", BUILD_STAMP_JSON);

figma.showUI(uiHtml, {
  width: 360,
  height: 520
});

figma.ui.onmessage = async (message: PluginUiMessage) => {
  try {
    if (message.type === "pluginReady") {
      sendSelectionInfo();
      return;
    }

    if (message.type === "requestSelectionInfo") {
      sendSelectionInfo();
      return;
    }

    if (message.type === "requestSelectionSvg") {
      await sendSelectionSvg();
      return;
    }

    if (message.type === "saveFileUrl") {
      return;
    }

    if (message.type === "cancelExtraction") return;

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
      return;
    }

    if (message.type === "extractSelection") {
      figma.ui.postMessage({ type: "extractionProgress", message: "선택 노드를 확인하는 중입니다." });
      await flushUi();
      const selection = figma.currentPage.selection;
      if (selection.length === 0) {
        throw new Error("선택된 노드가 없습니다.");
      }
      figma.ui.postMessage({ type: "extractionProgress", message: "선택 노드를 확인했습니다." });
      await flushUi();

      const fallbackNodeUrl = message.nodeUrl?.trim();
      const reference = buildMinimalExtractionReference(selection, fallbackNodeUrl);
      figma.ui.postMessage({ type: "extractionProgress", message: "reference를 준비했습니다." });
      await flushUi();
      const selectionSvg = undefined;
      figma.ui.postMessage({ type: "extractionProgress", message: "selection SVG 없이 진행합니다." });
      await flushUi();
      figma.ui.postMessage({
        type: "extractionPayloadReady",
        payload: {
          extractionName: reference.nodes[0]?.name ?? "figma-selection",
          reference,
          selectionSvg
        }
      });
      return;
    }
  } catch (error) {
    const messageText = error instanceof Error ? error.message : String(error);
    figma.ui.postMessage({ type: "pluginError", message: messageText });
  }
};

figma.on("selectionchange", () => {
  sendSelectionInfo();
  void sendSelectionSvg();
});
