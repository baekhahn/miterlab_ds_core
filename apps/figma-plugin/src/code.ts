import { renderPayload } from "./write/renderPayload";
import type { PluginUiMessage } from "./types";
import { contractPreviewOptions, renderContractPreview } from "./write/renderContractPreview";
import buttonInspectionPayload from "../../../artifacts/figma/button-inspection/mcp-payload.json";
import inputInspectionPayload from "../../../artifacts/figma/input-inspection/mcp-payload.json";
import type { FigmaWritePayload } from "../../../shared/contracts/figmaWritePayload";
import { isFigmaWritePayload } from "../../../shared/contracts/figmaWritePayload";
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

const getVariantProperties = (node: SceneNode): Record<string, string | boolean> | undefined => {
  if (!("componentProperties" in node) || !node.componentProperties) {
    return undefined;
  }

  const entries = Object.entries(node.componentProperties).map(([key, value]) => [
    key,
    "value" in value ? value.value : false
  ]);

  return Object.fromEntries(entries);
};

const getComponentMeta = (node: SceneNode) => {
  if (node.type === "INSTANCE") {
    const mainComponent = node.mainComponent ?? null;
    const parent = mainComponent?.parent;
    const baseComponentName =
      parent && "type" in parent && parent.type === "COMPONENT_SET"
        ? parent.name
        : mainComponent?.name ?? null;
    return {
      isFigmaComponent: true,
      componentRole: "instance" as const,
      mainComponentName: baseComponentName,
      componentKey: mainComponent?.key,
      variantProperties: getVariantProperties(node)
    };
  }

  if (node.type === "COMPONENT") {
    return {
      isFigmaComponent: true,
      componentRole: "component" as const,
      mainComponentName: node.name,
      componentKey: node.key,
      variantProperties: getVariantProperties(node)
    };
  }

  if (node.type === "COMPONENT_SET") {
    return {
      isFigmaComponent: true,
      componentRole: "component-set" as const,
      mainComponentName: node.name,
      componentKey: node.key,
      variantProperties: getVariantProperties(node)
    };
  }

  return {
    isFigmaComponent: false,
    componentRole: "node" as const,
    mainComponentName: null,
    componentKey: undefined,
    variantProperties: undefined
  };
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
      ...getComponentMeta(node)
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
        const nextPaint = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

const getSelectionBounds = (nodes: readonly SceneNode[]) => {
  if (nodes.length === 0) return null;

  const bounds = nodes
    .filter((node): node is SceneNode & { x: number; y: number; width: number; height: number } =>
      "x" in node && "y" in node && "width" in node && "height" in node
    )
    .map((node) => ({
      x: node.x,
      y: node.y,
      right: node.x + node.width,
      bottom: node.y + node.height
    }));

  if (bounds.length === 0) return null;

  const minX = Math.min(...bounds.map((item) => item.x));
  const minY = Math.min(...bounds.map((item) => item.y));
  const maxX = Math.max(...bounds.map((item) => item.right));
  const maxY = Math.max(...bounds.map((item) => item.bottom));

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

const safeGetParent = (node: SceneNode) => {
  try {
    return node.parent;
  } catch {
    return null;
  }
};

const safeGetName = (node: BaseNode) => {
  try {
    return "name" in node ? node.name : null;
  } catch {
    return null;
  }
};

const getAncestorFrames = (node: SceneNode) => {
  const frames: Array<FrameNode | ComponentNode | InstanceNode> = [];
  let current: BaseNode | null = safeGetParent(node);

  while (current && current.type !== "PAGE") {
    if (
      current.type === "FRAME" ||
      current.type === "COMPONENT" ||
      current.type === "INSTANCE"
    ) {
      frames.push(current);
    }
    current = "parent" in current ? current.parent : null;
  }

  return frames;
};

const findNearestAutoLayoutAncestor = (node: SceneNode) =>
  getAncestorFrames(node).find((ancestor) => ancestor.layoutMode !== "NONE") ?? null;

const findNearestSizedFrameAncestor = (node: SceneNode) =>
  getAncestorFrames(node).find((ancestor) => ancestor.width > ("width" in node ? node.width : 0)) ?? null;

const getParentAbsolutePosition = (node: BaseNode & ChildrenMixin) => {
  if (node.type === "PAGE") {
    return { x: 0, y: 0 };
  }

  if ("absoluteTransform" in node) {
    return {
      x: node.absoluteTransform[0][2],
      y: node.absoluteTransform[1][2]
    };
  }

  return { x: 0, y: 0 };
};

const replaceFrameContents = (target: FrameNode, source: FrameNode) => {
  target.resize(source.width, source.height);
  target.layoutMode = source.layoutMode;
  target.primaryAxisSizingMode = source.primaryAxisSizingMode;
  target.counterAxisSizingMode = source.counterAxisSizingMode;
  target.primaryAxisAlignItems = source.primaryAxisAlignItems;
  target.counterAxisAlignItems = source.counterAxisAlignItems;
  target.itemSpacing = source.itemSpacing;
  target.paddingTop = source.paddingTop;
  target.paddingRight = source.paddingRight;
  target.paddingBottom = source.paddingBottom;
  target.paddingLeft = source.paddingLeft;
  target.cornerRadius = source.cornerRadius;
  target.fills = source.fills;
  target.strokes = source.strokes;
  target.strokeWeight = source.strokeWeight;
  target.effects = source.effects;
  target.clipsContent = source.clipsContent;

  for (const child of [...target.children]) {
    child.remove();
  }

  for (const child of [...source.children]) {
    target.appendChild(child);
  }
};

const looksLikeFullWidthPrompt = (value: string) =>
  /(full|full width|가득|꽉|채워|좌우 full|전체 너비|좌우 폭|폭 늘려)/i.test(value);

const looksLikeCenterAlignPrompt = (value: string) =>
  /(가운데 정렬|중앙 정렬|센터 정렬|center align|centered|가운데로|중앙으로)/i.test(value);

const resolveDirectEditTargets = (selection: readonly SceneNode[]) => {
  if (selection.length !== 1) {
    return [...selection];
  }

  const primary = selection[0];
  if ("children" in primary && primary.children.length > 0) {
    const candidates = primary.children.filter(
      (node) =>
        "width" in node &&
        "height" in node &&
        (node.type === "INSTANCE" || node.type === "FRAME" || node.type === "COMPONENT")
    );
    if (candidates.length > 0) {
      return candidates;
    }
  }

  return [...selection];
};

const canShrinkToHugWidth = (
  node: SceneNode
): node is FrameNode | InstanceNode | ComponentNode =>
  "layoutMode" in node &&
  node.layoutMode === "HORIZONTAL" &&
  "children" in node &&
  "paddingLeft" in node &&
  "paddingRight" in node &&
  "itemSpacing" in node &&
  "resize" in node;

const shrinkToHugWidth = (node: FrameNode | InstanceNode | ComponentNode) => {
  const visibleChildren = node.children.filter(
    (child): child is SceneNode & DimensionAndPositionMixin => "width" in child && child.visible !== false
  );
  if (visibleChildren.length === 0) return false;

  const contentWidth =
    visibleChildren.reduce((sum, child) => sum + child.width, 0) +
    Math.max(0, visibleChildren.length - 1) * node.itemSpacing;
  const nextWidth = Math.ceil(node.paddingLeft + contentWidth + node.paddingRight);
  if (!Number.isFinite(nextWidth) || nextWidth <= 0) return false;
  if (Math.abs(node.width - nextWidth) < 1) return false;
  node.resize(nextWidth, node.height);
  return true;
};

const applyDirectEditIntent = (
  selection: readonly SceneNode[],
  intent: NonNullable<PluginUiMessage extends never ? never : Extract<PluginUiMessage, { type: "makerDirectEdit" }>["intent"]>
) => {
  if (!intent) {
    throw new Error("직접 수정 intent가 없습니다.");
  }

  if (selection.length === 0) {
    throw new Error("먼저 수정할 selection을 선택해 주세요.");
  }

  const targetScope = intent.targetScope ?? "selection";
  const targets = targetScope === "container-children" ? resolveDirectEditTargets(selection) : [...selection];
  const commands = intent.commands ?? [];
  let applied = 0;

  if (
    targetScope === "container" &&
    selection.length === 1 &&
    "children" in selection[0] &&
    "layoutMode" in selection[0] &&
    selection[0].layoutMode !== "NONE"
  ) {
    const container = selection[0];
    for (const command of commands) {
      if (command.type === "set-container-cross-align") {
        container.counterAxisAlignItems = command.value;
        applied += 1;
      }
    }

    for (const child of container.children) {
      for (const command of commands) {
        if (command.type === "set-node-layout-align" && "layoutAlign" in child) {
          child.layoutAlign = command.value;
          applied += 1;
        }
        if (command.type === "set-node-layout-grow" && "layoutGrow" in child) {
          child.layoutGrow = command.value;
          applied += 1;
        }
        if (command.type === "set-node-layout-sizing-horizontal" && "layoutSizingHorizontal" in child) {
          child.layoutSizingHorizontal = command.value;
          applied += 1;
        }
        if (command.type === "shrink-node-to-hug-content" && canShrinkToHugWidth(child)) {
          if (shrinkToHugWidth(child)) applied += 1;
        }
      }
    }
  } else {
    for (const node of targets) {
      const autoAncestor = findNearestAutoLayoutAncestor(node);
      const frameAncestor = findNearestSizedFrameAncestor(node);

      for (const command of commands) {
        if (command.type === "set-container-cross-align" && autoAncestor) {
          autoAncestor.counterAxisAlignItems = command.value;
          applied += 1;
        }

        if (command.type === "set-node-layout-align" && "layoutAlign" in node) {
          node.layoutAlign = command.value;
          applied += 1;
        }

        if (command.type === "set-node-layout-grow" && "layoutGrow" in node) {
          node.layoutGrow = command.value;
          applied += 1;
        }

        if (command.type === "set-node-layout-sizing-horizontal" && "layoutSizingHorizontal" in node) {
          node.layoutSizingHorizontal = command.value;
          applied += 1;
        }

        if (
          command.type === "resize-node-width-to-parent-inner" &&
          frameAncestor &&
          "resize" in node &&
          "height" in node &&
          "x" in node
        ) {
          const availableWidth = Math.max(0, frameAncestor.width - frameAncestor.paddingLeft - frameAncestor.paddingRight);
          node.resize(availableWidth, node.height);
          node.x = frameAncestor.paddingLeft;
          applied += 1;
        }

        if (command.type === "center-node-in-parent" && frameAncestor && "x" in node && "width" in node) {
          node.x = Math.round((frameAncestor.width - node.width) / 2);
          applied += 1;
        }

        if (command.type === "shrink-node-to-hug-content" && canShrinkToHugWidth(node)) {
          if (shrinkToHugWidth(node)) applied += 1;
        }
      }
    }
  }

  if (applied === 0) {
    throw new Error("현재 selection에서는 직접 수정 기준을 찾지 못했습니다.");
  }

  return intent.message ?? "선택 영역에 직접 수정을 적용했습니다.";
};

const applyFullWidthToSelection = (
  selection: readonly SceneNode[],
  targetScope: "selection" | "container" | "container-children" = "selection"
) => {
  if (selection.length === 0) {
    throw new Error("먼저 수정할 selection을 선택해 주세요.");
  }

  const targets = targetScope === "container-children" ? resolveDirectEditTargets(selection) : [...selection];
  let applied = 0;

  for (const node of targets) {
    const autoAncestor = findNearestAutoLayoutAncestor(node);
    if (autoAncestor) {
      if ("layoutAlign" in node) {
        node.layoutAlign = "STRETCH";
      }
      if ("layoutSizingHorizontal" in node) {
        node.layoutSizingHorizontal = "FILL";
      }
      if ("layoutGrow" in node) {
        node.layoutGrow = autoAncestor.layoutMode === "HORIZONTAL" ? 1 : 0;
      }
      applied += 1;
      continue;
    }

    const frameAncestor = findNearestSizedFrameAncestor(node);
    if (
      frameAncestor &&
      "resize" in node &&
      "height" in node &&
      "x" in node
    ) {
      const availableWidth = Math.max(0, frameAncestor.width - frameAncestor.paddingLeft - frameAncestor.paddingRight);
      node.resize(availableWidth, node.height);
      node.x = frameAncestor.paddingLeft;
      applied += 1;
    }
  }

  if (applied > 0) {
    return `${applied}개 selection을 full width로 맞췄습니다.`;
  }

  throw new Error("현재 selection에서는 full width 수정 기준을 찾지 못했습니다.");
};

const applyCenterAlignToSelection = (
  selection: readonly SceneNode[],
  targetScope: "selection" | "container" | "container-children" = "selection"
) => {
  if (selection.length === 0) {
    throw new Error("먼저 수정할 selection을 선택해 주세요.");
  }

  if (
    selection.length === 1 &&
    "children" in selection[0] &&
    "layoutMode" in selection[0] &&
    selection[0].layoutMode !== "NONE" &&
    targetScope !== "selection"
  ) {
    const container = selection[0];
    container.counterAxisAlignItems = "CENTER";

    for (const child of container.children) {
      if ("layoutAlign" in child) {
        child.layoutAlign = "INHERIT";
      }
      if ("layoutGrow" in child) {
        child.layoutGrow = 0;
      }
      if (canShrinkToHugWidth(child)) {
        shrinkToHugWidth(child);
      }
    }

    return `${container.name} 안의 요소를 가운데 정렬했습니다.`;
  }

  const targets = targetScope === "container-children" ? resolveDirectEditTargets(selection) : [...selection];
  let applied = 0;

  for (const node of targets) {
    const autoAncestor = findNearestAutoLayoutAncestor(node);
    if (autoAncestor) {
      autoAncestor.counterAxisAlignItems = "CENTER";
      if ("layoutAlign" in node) {
        node.layoutAlign = "INHERIT";
      }
      if ("layoutGrow" in node) {
        node.layoutGrow = 0;
      }
      if (canShrinkToHugWidth(node)) {
        shrinkToHugWidth(node);
      }
      applied += 1;
      continue;
    }

    const frameAncestor = findNearestSizedFrameAncestor(node);
    if (frameAncestor && "x" in node && "width" in node) {
      node.x = Math.round((frameAncestor.width - node.width) / 2);
      applied += 1;
    }
  }

  if (applied > 0) {
    return `${applied}개 selection을 가운데 정렬했습니다.`;
  }

  throw new Error("현재 selection에서는 가운데 정렬 기준을 찾지 못했습니다.");
};

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
        grid-template-columns: 1fr 1fr 1fr;
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
      .maker-actions {
        display: grid;
        gap: 8px;
      }
      textarea.control {
        min-height: 120px;
        resize: vertical;
      }
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
        <button type="button" class="tab active" id="tabMaker">Maker</button>
        <button type="button" class="tab" id="tabInspection">Inspection</button>
        <button type="button" class="tab" id="tabExtraction">Extraction</button>
      </div>

      <div class="panel active" id="panelMaker">
        <div class="label">Prompt</div>
        <textarea class="control" id="makerPrompt" placeholder="예: 인풋과 버튼을 이용한 로그인 화면을 만들어 주세요."></textarea>
        <div class="meta">
          <div class="meta-item"><div class="meta-key">Selected</div><div class="meta-value" id="makerSelectionName">선택 없음</div></div>
          <div class="meta-item"><div class="meta-key">Intent</div><div class="meta-value" id="makerSelectionIntent">-</div></div>
          <div class="meta-item"><div class="meta-key">Kinds</div><div class="meta-value" id="makerSelectionKinds">-</div></div>
          <div class="meta-item"><div class="meta-key">Parent</div><div class="meta-value" id="makerSelectionParent">-</div></div>
        </div>
        <button type="button" class="btn primary" id="makerSubmit"><span id="makerSpinner" class="spinner hidden"></span><span id="makerSubmitLabel">Create</span></button>
        <div class="status" id="makerStatus"></div>
        <div class="code" id="makerDetails">Maker intent와 적용 결과가 여기에 표시됩니다.</div>
        <div class="hint">Contract와 extracted component를 바탕으로 새 instance를 만들거나, 선택한 영역을 프롬프트로 다시 생성합니다.</div>
      </div>

      <div class="panel" id="panelInspection">
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
          tabMaker: $("tabMaker"),
          tabInspection: $("tabInspection"),
          tabExtraction: $("tabExtraction"),
          panelMaker: $("panelMaker"),
          panelInspection: $("panelInspection"),
          panelExtraction: $("panelExtraction"),
          makerPrompt: $("makerPrompt"),
          makerSubmit: $("makerSubmit"),
          makerSpinner: $("makerSpinner"),
          makerSubmitLabel: $("makerSubmitLabel"),
          makerStatus: $("makerStatus"),
          makerDetails: $("makerDetails"),
          makerSelectionName: $("makerSelectionName"),
          makerSelectionIntent: $("makerSelectionIntent"),
          makerSelectionKinds: $("makerSelectionKinds"),
          makerSelectionParent: $("makerSelectionParent"),
          previewLevel: $("previewLevel"),
          previewItem: $("previewItem"),
          render: $("renderContractPreview"),
          refresh: $("refreshSelection"),
          bridgeTest: $("bridgeTest"),
          extract: $("extractSelection"),
          cancel: $("cancelExtraction"),
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
        let makerAnalyzeCache = new Map();
        let selectionSvgResolver = null;
        let extractionPayloadResolver = null;
        let abortController = null;
        let timer = null;
        let poller = null;
        let makerAckTimer = null;
        let startedAt = 0;
        let statusText = "";
        let statusTone = "";

        const setMakerStatus = (text, tone) => {
          el.makerStatus.textContent = text || "";
          el.makerStatus.className = "status" + (tone ? " " + tone : "");
        };

        const setMakerDetails = (value) => {
          if (!value) {
            el.makerDetails.textContent = "Maker intent와 적용 결과가 여기에 표시됩니다.";
            return;
          }
          el.makerDetails.textContent =
            typeof value === "string" ? value : JSON.stringify(value, null, 2);
        };

        const syncMakerAction = () => {
          const hasSelection = Boolean(latestSelectionSummary && latestSelectionSummary.selectionCount);
          const idleLabel = hasSelection ? "Apply to Selection" : "Create";
          el.makerSubmitLabel.dataset.idleLabel = idleLabel;
          if (!el.makerSubmit.disabled) {
            el.makerSubmitLabel.textContent = idleLabel;
          }
        };

        const getMakerAnalyzeCacheKey = (prompt) => {
          if (!latestSelectionSummary) return "";
          return JSON.stringify({
            prompt: prompt.trim(),
            fileKey: latestSelectionSummary.fileKey || "",
            nodeIds: latestSelectionSummary.nodeIds || [],
            primaryName: latestSelectionSummary.primaryName || "",
            intent: latestSelectionSummary.selectionIntent || null
          });
        };

        const setMakerLoading = (loading) => {
          el.makerSubmit.disabled = loading;
          el.makerSpinner.classList.toggle("hidden", !loading);
          if (loading) {
            const hasSelection = Boolean(latestSelectionSummary && latestSelectionSummary.selectionCount);
            el.makerSubmitLabel.textContent = hasSelection ? "Applying..." : "Creating...";
          } else {
            el.makerSubmitLabel.textContent =
              el.makerSubmitLabel.dataset.idleLabel ||
              (latestSelectionSummary && latestSelectionSummary.selectionCount ? "Apply to Selection" : "Create");
          }
        };

        const stopMakerAckTimer = () => {
          if (makerAckTimer) clearTimeout(makerAckTimer);
          makerAckTimer = null;
        };

        const startMakerAckTimer = () => {
          stopMakerAckTimer();
          makerAckTimer = setTimeout(() => {
            setMakerLoading(false);
            setMakerStatus("응답이 지연되고 있습니다. selection과 결과를 다시 확인해 주세요.", "warning");
          }, 6000);
        };

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

        const isWritePayload = (value) => {
          if (!value || typeof value !== "object") return false;
          return Boolean(
            value.document &&
            value.document.name &&
            value.document.screen &&
            value.document.theme &&
            Array.isArray(value.nodes)
          );
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
          el.spinner.classList.toggle("hidden", !loading);
          el.extractLabel.textContent = loading ? "Extracting" : "Extract";
          if (!loading) stopTimer();
        };

        const switchTab = (next) => {
          const maker = next === "maker";
          const inspection = next === "inspection";
          const extraction = next === "extraction";
          el.tabMaker.classList.toggle("active", maker);
          el.tabInspection.classList.toggle("active", inspection);
          el.tabExtraction.classList.toggle("active", extraction);
          el.panelMaker.classList.toggle("active", maker);
          el.panelInspection.classList.toggle("active", inspection);
          el.panelExtraction.classList.toggle("active", extraction);
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
          el.makerSelectionName.textContent = el.selectionName.textContent;
          el.makerSelectionIntent.textContent = summary.selectionIntent ? summary.selectionIntent.kind : "-";
          el.makerSelectionKinds.textContent =
            summary.selectionIntent && summary.selectionIntent.componentKinds.length > 0
              ? summary.selectionIntent.componentKinds.join(", ")
              : "-";
          el.makerSelectionParent.textContent =
            summary.selectionIntent && summary.selectionIntent.parentName
              ? summary.selectionIntent.parentName
              : "-";
          syncMakerAction();
          if (!summary.selectionCount) {
            setMakerStatus("");
            setMakerDetails("");
          }

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

        const requestExtractionPayload = (nodeUrl) => new Promise((resolve, reject) => {
          extractionPayloadResolver = resolve;
          parent.postMessage({ pluginMessage: { type: "extractSelection", nodeUrl } }, "*");
          setTimeout(() => {
            if (extractionPayloadResolver === resolve) {
              extractionPayloadResolver = null;
              reject(new Error("선택 payload 준비가 지연되고 있습니다."));
            }
          }, 10000);
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

          setStatus("선택 payload를 준비 중입니다.");
          startTimer();
          const payload = await requestExtractionPayload(lastNodeUrl);
          let ensuredSelectionSvg = payload && payload.selectionSvg ? payload.selectionSvg : null;
          if (!ensuredSelectionSvg) {
            setStatus("selection SVG를 확인 중입니다.");
            ensuredSelectionSvg = await requestSelectionSvg();
          }
          if (!ensuredSelectionSvg && latestSelectionSvg) {
            ensuredSelectionSvg = latestSelectionSvg;
          }
          if (ensuredSelectionSvg) {
            payload.selectionSvg = ensuredSelectionSvg;
          }
          latestSelectionSvg = ensuredSelectionSvg;

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

        const runMaker = async (placement) => {
          let effectivePlacement = placement;
          const prompt = el.makerPrompt.value.trim();
          if (!prompt) {
            setMakerStatus("Prompt를 입력해 주세요.", "error");
            return;
          }

          const fallbackDirectEditIntent = () => {
            if (!latestSelectionSummary) return null;
            const selectionKind = latestSelectionSummary.selectionIntent
              ? latestSelectionSummary.selectionIntent.kind
              : "unknown";

            if (looksLikeFullWidthPrompt(prompt)) {
              return {
                kind: "direct-edit",
                targetScope:
                  selectionKind === "section" || selectionKind === "screen-fragment"
                    ? "container-children"
                    : "selection",
                message: "선택 영역에 full width 직접 수정을 적용합니다.",
                commands:
                  selectionKind === "section" || selectionKind === "screen-fragment"
                    ? [
                        { type: "set-node-layout-align", value: "STRETCH" },
                        { type: "set-node-layout-sizing-horizontal", value: "FILL" },
                        { type: "set-node-layout-grow", value: 0 }
                      ]
                    : [
                        { type: "set-node-layout-align", value: "STRETCH" },
                        { type: "set-node-layout-sizing-horizontal", value: "FILL" },
                        { type: "resize-node-width-to-parent-inner" }
                      ]
              };
            }

            if (looksLikeCenterAlignPrompt(prompt)) {
              return {
                kind: "direct-edit",
                targetScope:
                  selectionKind === "section" || selectionKind === "screen-fragment"
                    ? "container"
                    : "selection",
                message: "선택 영역에 가운데 정렬 직접 수정을 적용합니다.",
                commands:
                  selectionKind === "section" || selectionKind === "screen-fragment"
                    ? [
                        { type: "set-container-cross-align", value: "CENTER" },
                        { type: "set-node-layout-align", value: "INHERIT" },
                        { type: "set-node-layout-grow", value: 0 },
                        { type: "shrink-node-to-hug-content" }
                      ]
                    : [
                        { type: "set-container-cross-align", value: "CENTER" },
                        { type: "set-node-layout-align", value: "INHERIT" },
                        { type: "set-node-layout-grow", value: 0 },
                        { type: "shrink-node-to-hug-content" },
                        { type: "center-node-in-parent" }
                      ]
              };
            }

            return null;
          };

          if (effectivePlacement === "selection" && latestSelectionSummary) {
            const immediateIntent = fallbackDirectEditIntent();
            if (immediateIntent) {
              setMakerDetails(immediateIntent);
              setMakerStatus(immediateIntent.message || "선택 영역에 직접 수정 요청을 전달했습니다.");
              setMakerLoading(true);
              await nextPaint();
              parent.postMessage(
                {
                  pluginMessage: {
                    type: "makerDirectEdit",
                    prompt,
                    intent: immediateIntent
                  }
                },
                "*"
              );
              startMakerAckTimer();
              return;
            }

            setMakerStatus("선택 영역을 MCP로 분석 중입니다.");
            const analyzeCacheKey = getMakerAnalyzeCacheKey(prompt);
            const cachedAnalyze = analyzeCacheKey ? makerAnalyzeCache.get(analyzeCacheKey) : null;
            if (cachedAnalyze && cachedAnalyze.directEdit) {
              setMakerDetails(cachedAnalyze.directEdit);
              setMakerStatus("캐시된 selection 분석을 사용합니다.");
              setMakerLoading(true);
              await nextPaint();
              parent.postMessage(
                {
                  pluginMessage: {
                    type: "makerDirectEdit",
                    prompt,
                    intent: cachedAnalyze.directEdit
                  }
                },
                "*"
              );
              startMakerAckTimer();
              return;
            }

            setMakerDetails("selection MCP 분석을 진행 중입니다.");
            setMakerLoading(true);
            await nextPaint();
            try {
              const controller = new AbortController();
              const timeout = setTimeout(() => controller.abort(), 15000);
              const analyzeResponse = await fetch(BRIDGE_URL + "/maker-analyze", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                  prompt,
                  selectionSummary: latestSelectionSummary
                }),
                signal: controller.signal
              });
              clearTimeout(timeout);
              const analyzed = await analyzeResponse.json();
              if (!analyzeResponse.ok) {
                throw new Error(analyzed && analyzed.error ? analyzed.error : "선택 분석에 실패했습니다.");
              }
              if (analyzed && analyzed.directEdit) {
                if (analyzeCacheKey) {
                  makerAnalyzeCache.set(analyzeCacheKey, analyzed);
                }
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "makerDirectEdit",
                      prompt,
                      intent: analyzed.directEdit
                    }
                  },
                  "*"
                );
                startMakerAckTimer();
                const analysis = analyzed.directEdit.analysis;
                const componentName = analysis && analysis.componentName ? " (" + analysis.componentName + ")" : "";
                setMakerDetails(analyzed.directEdit);
                setMakerStatus((analyzed.directEdit.message || "선택 영역에 직접 수정 요청을 전달했습니다.") + componentName);
                return;
              }
              const fallbackIntent = fallbackDirectEditIntent();
              if (fallbackIntent) {
                setMakerDetails(fallbackIntent);
                setMakerStatus(fallbackIntent.message);
                setMakerLoading(true);
                await nextPaint();
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "makerDirectEdit",
                      prompt,
                      intent: fallbackIntent
                    }
                  },
                  "*"
                );
                startMakerAckTimer();
                return;
              }
              setMakerStatus("직접 수정으로 해석되지 않아, selection 기준 새 제안안을 생성합니다.", "warning");
              setMakerDetails("selection 기준 새 프레임 제안안을 생성합니다.");
              effectivePlacement = "selection-preview";
            } catch (error) {
              const fallbackIntent = fallbackDirectEditIntent();
              if (fallbackIntent) {
                setMakerDetails(fallbackIntent);
                setMakerLoading(true);
                await nextPaint();
                parent.postMessage(
                  {
                    pluginMessage: {
                      type: "makerDirectEdit",
                      prompt,
                      intent: fallbackIntent
                    }
                  },
                  "*"
                );
                startMakerAckTimer();
                const timeoutMessage =
                  error && error.name === "AbortError"
                    ? "분석이 오래 걸려 fallback direct edit를 적용합니다."
                    : fallbackIntent.message;
                setMakerStatus(timeoutMessage, "warning");
                return;
              }
              setMakerStatus("선택 분석이 불안정해, selection 기준 새 제안안을 생성합니다.", "warning");
              setMakerDetails(error && error.message ? error.message : "selection 분석 오류");
              effectivePlacement = "selection-preview";
            }
          }

          setMakerStatus("Maker payload를 생성 중입니다.");
          setMakerDetails("");
          setMakerLoading(true);
          await nextPaint();

          try {
            const response = await fetch(BRIDGE_URL + "/maker-generate", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                prompt,
                selectionSummary: latestSelectionSummary
              })
            });
            const result = await response.json();
            if (!response.ok) {
              throw new Error(result && result.error ? result.error : "Maker 생성에 실패했습니다.");
            }
            if (!result || !isWritePayload(result.payload)) {
              throw new Error("Maker payload 형식이 올바르지 않습니다.");
            }

            parent.postMessage(
              {
                pluginMessage: {
                    type: "makerGenerate",
                    payload: result.payload,
                  placement: effectivePlacement
                }
              },
              "*"
            );

            startMakerAckTimer();

            const inferred = result?.maker?.inferredScreen ? " (" + result.maker.inferredScreen + ")" : "";
            setMakerDetails({
              inferredScreen: result?.maker?.inferredScreen ?? null,
              summary: result?.summary ?? null,
              evaluation: result?.evaluation ?? null
            });
            setMakerStatus("Maker 생성 요청을 전달했습니다" + inferred + ".");
          } catch (error) {
            setMakerStatus(error && error.message ? error.message : "Maker 생성 중 오류가 발생했습니다.", "error");
            setMakerLoading(false);
          } finally {
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
          if (msg.type === "extractionPayloadReady") {
            if (extractionPayloadResolver) {
              const resolve = extractionPayloadResolver;
              extractionPayloadResolver = null;
              resolve(msg.payload);
            }
          }
          if (msg.type === "extractionProgress") {
            setStatus(msg.message || "추출 준비 중입니다.");
          }
          if (msg.type === "pluginError") {
            if (extractionPayloadResolver) {
              extractionPayloadResolver = null;
            }
            setMakerStatus(msg.message || "오류가 발생했습니다.", "error");
            setStatus(msg.message || "오류가 발생했습니다.", "error");
            setLoading(false);
            stopMakerAckTimer();
            setMakerLoading(false);
          }
          if (msg.type === "makerProgress") {
            setMakerStatus(msg.message || "Maker 작업을 진행 중입니다.");
          }
          if (msg.type === "makerRendered") {
            stopMakerAckTimer();
            setMakerStatus(msg.message || "Maker rendering complete.");
            setMakerLoading(false);
          }
        };

        el.tabMaker.addEventListener("click", () => switchTab("maker"));
        el.tabInspection.addEventListener("click", () => switchTab("inspection"));
        el.tabExtraction.addEventListener("click", () => switchTab("extraction"));
        el.makerSubmit.addEventListener("click", () => {
          const hasSelection = Boolean(latestSelectionSummary && latestSelectionSummary.selectionCount);
          runMaker(hasSelection ? "selection" : "new-frame");
        });
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
        syncMakerAction();
        setLoading(false);
        stopMakerAckTimer();
        setMakerLoading(false);
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

    if (message.type === "makerGenerate") {
      figma.ui.postMessage({
        type: "makerProgress",
        message: "Figma에서 새 instance를 렌더링하는 중입니다."
      });
      if (!isFigmaWritePayload(message.payload)) {
        throw new Error("Maker payload 형식이 올바르지 않습니다.");
      }

      const targetNodes = [...figma.currentPage.selection];
      const targetBounds = getSelectionBounds(targetNodes);
      const firstParent = targetNodes.length > 0 ? safeGetParent(targetNodes[0]) : null;
      const sharedParent =
        firstParent && targetNodes.every((node) => safeGetParent(node) === firstParent)
          ? firstParent
          : null;
      const sharedParentName = sharedParent ? safeGetName(sharedParent) : null;
      const result = await renderPayload(message.payload);
      figma.ui.postMessage({
        type: "makerProgress",
        message: "렌더 결과를 배치하는 중입니다."
      });
      const createdFrame = [...figma.currentPage.children].reverse().find(
        (node) => node.type === "FRAME" && node.name === result.createdFrameName
      );

      if (message.placement === "selection-preview" && createdFrame && targetBounds) {
        createdFrame.x = targetBounds.x + targetBounds.width + 40;
        createdFrame.y = targetBounds.y;
        figma.currentPage.selection = [createdFrame];
      } else if (message.placement === "selection" && createdFrame && targetBounds) {
        const sectionFrames = createdFrame.children.filter(
          (node): node is FrameNode => node.type === "FRAME" && node.name.endsWith("-section")
        );
        const preferredSectionName =
          sharedParentName
            ? sharedParentName
            : targetNodes.length === 1
              ? safeGetName(targetNodes[0]) ?? targetNodes[0].id
              : null;

        const replacementSection =
          sectionFrames.find((node) => preferredSectionName && node.name === preferredSectionName) ??
          sectionFrames.find((node) => node.name !== "preview-section") ??
          null;

        const replacementParent =
          sharedParent &&
          safeGetParent(sharedParent as SceneNode) &&
          "appendChild" in (safeGetParent(sharedParent as SceneNode) as BaseNode & ChildrenMixin)
            ? (safeGetParent(sharedParent as SceneNode) as BaseNode & ChildrenMixin)
            : figma.currentPage;

        if (replacementSection && sharedParent && sharedParent.type === "FRAME" && sharedParentName && replacementSection.name === sharedParentName) {
          replaceFrameContents(sharedParent, replacementSection);
          createdFrame.remove();
        } else if (replacementSection) {
          const parentAbsolute = getParentAbsolutePosition(replacementParent);
          replacementParent.appendChild(replacementSection);
          replacementSection.x = targetBounds.x - parentAbsolute.x;
          replacementSection.y = targetBounds.y - parentAbsolute.y;

          const removeTargets =
            sharedParent &&
            sharedParentName &&
            replacementSection.name === sharedParentName
              ? [sharedParent]
              : targetNodes;

          for (const node of removeTargets) {
            if ("removed" in node && !node.removed) {
              node.remove();
            }
          }
          createdFrame.remove();
        } else {
          createdFrame.x = targetBounds.x;
          createdFrame.y = targetBounds.y;
        }
      }

      figma.ui.postMessage({
        type: "makerRendered",
        message:
          message.placement === "selection"
            ? `Selection을 기준으로 ${result.createdFrameName}로 교체했습니다.`
            : message.placement === "selection-preview"
              ? `Selection 기준 제안안 ${result.createdFrameName}를 옆에 생성했습니다.`
            : `${result.createdFrameName}를 생성했습니다.`
      });
      return;
    }

    if (message.type === "makerDirectEdit") {
      const responseMessage = applyDirectEditIntent([...figma.currentPage.selection], message.intent);
      sendSelectionInfo();
      void sendSelectionSvg();
      figma.notify(responseMessage);
      figma.ui.postMessage({
        type: "makerRendered",
        message: responseMessage
      });
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
      let selectionSvg: string | undefined;
      try {
        const primary = selection[0];
        const bytes = await primary.exportAsync({
          format: "SVG",
          svgOutlineText: false,
          svgIdAttribute: false
        });
        selectionSvg = new TextDecoder("utf-8").decode(bytes);
        figma.ui.postMessage({ type: "extractionProgress", message: "selection SVG를 준비했습니다." });
      } catch {
        selectionSvg = undefined;
        figma.ui.postMessage({ type: "extractionProgress", message: "selection SVG 없이 진행합니다." });
      }
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
