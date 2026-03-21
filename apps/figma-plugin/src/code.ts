import { renderPayload } from "./write/renderPayload";
import type { PluginUiMessage } from "./types";
import { contractPreviewOptions, renderContractPreview } from "./write/renderContractPreview";
import { buildLocalDirectEditIntent, parseLocalEditIntentKind } from "./maker/directEdit";
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
const withTimeout = async <T>(promise: Promise<T>, ms: number, message: string): Promise<T> => {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    })
  ]);
};
        const nextPaint = () => Promise.resolve();

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

const postMakerProgress = (message: string) => {
  figma.ui.postMessage({
    type: "makerProgress",
    message
  });
};

const renderMakerPayloadToCanvas = async (
  payload: unknown,
  placement: "new-frame" | "selection" | "selection-preview" | undefined
) => {
  if (!isFigmaWritePayload(payload)) {
    throw new Error("Maker payload 형식이 올바르지 않습니다.");
  }

  postMakerProgress("Figma에서 새 instance를 렌더링하는 중입니다.");

  const targetNodes = [...figma.currentPage.selection];
  const targetBounds = getSelectionBounds(targetNodes);
  const firstParent = targetNodes.length > 0 ? safeGetParent(targetNodes[0]) : null;
  const sharedParent =
    firstParent && targetNodes.every((node) => safeGetParent(node) === firstParent)
      ? firstParent
      : null;
  const sharedParentName = sharedParent ? safeGetName(sharedParent) : null;
  postMakerProgress("renderPayload를 시작합니다.");
  const result = await withTimeout(
    renderPayload(payload),
    12000,
    "Figma 렌더링이 12초 이상 지연되었습니다."
  );
  postMakerProgress("렌더 결과를 배치하는 중입니다.");
  const createdFrame = [...figma.currentPage.children].reverse().find(
    (node) => node.type === "FRAME" && node.name === result.createdFrameName
  );

  if (placement === "selection-preview" && createdFrame && targetBounds) {
    postMakerProgress("selection-preview 위치로 이동합니다.");
    createdFrame.x = targetBounds.x + targetBounds.width + 40;
    createdFrame.y = targetBounds.y;
    figma.currentPage.selection = [createdFrame];
  } else if (placement === "selection" && createdFrame && targetBounds) {
    postMakerProgress("selection 교체 경로를 시도합니다.");
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
      postMakerProgress("sharedParent frame 내용을 교체합니다.");
      replaceFrameContents(sharedParent, replacementSection);
      createdFrame.remove();
    } else if (replacementSection) {
      postMakerProgress("replacement section을 selection 위치에 배치합니다.");
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
      postMakerProgress("replacement section이 없어 생성 프레임을 원위치에 둡니다.");
      createdFrame.x = targetBounds.x;
      createdFrame.y = targetBounds.y;
    }
  }

  figma.ui.postMessage({
    type: "makerRendered",
    message:
      placement === "selection"
        ? `Selection을 기준으로 ${result.createdFrameName}로 교체했습니다.`
        : placement === "selection-preview"
          ? `Selection 기준 제안안 ${result.createdFrameName}를 옆에 생성했습니다.`
          : `${result.createdFrameName}를 생성했습니다.`
  });
};

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
        padding: 64px 14px 28px;
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
        position: relative;
        z-index: 1;
        margin-top: 4px;
      }
      .app-footer {
        color: #9399a4;
        font-size: 10px;
        line-height: 1.4;
        text-align: right;
        padding: 0 2px;
        position: fixed;
        left: 14px;
        right: 14px;
        bottom: 8px;
        z-index: 10;
        background: linear-gradient(180deg, rgba(9,9,11,0) 0%, rgba(9,9,11,0.92) 45%, rgba(9,9,11,1) 100%);
      }
      .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: var(--panel);
        position: relative;
        z-index: 2;
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
        position: relative;
        z-index: 2;
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
      .chat {
        display: grid;
        gap: 8px;
        min-height: 180px;
        max-height: 280px;
        overflow: auto;
        padding: 12px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: #0c0c0f;
        box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02);
      }
      .chat-item {
        display: grid;
        gap: 4px;
      }
      .chat-item.user {
        justify-items: end;
      }
      .chat-item.assistant,
      .chat-item.system,
      .chat-item.log {
        justify-items: start;
      }
      .chat-role {
        color: var(--muted);
        font-size: 10px;
        font-weight: 600;
      }
      .chat-bubble {
        max-width: 100%;
        min-width: 0;
        padding: 10px 12px;
        border-radius: 12px;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: anywhere;
      }
      .chat-item.user .chat-bubble {
        background: #26292f;
        color: var(--text);
        border: 1px solid var(--line);
      }
      .chat-item.assistant .chat-bubble {
        background: var(--panel-2);
        color: var(--text);
        border: 1px solid var(--line);
      }
      .chat-item.system .chat-bubble {
        background: rgba(255,255,255,0.04);
        color: var(--muted);
        border: 1px solid var(--line);
      }
      .chat-item.log .chat-bubble {
        background: transparent;
        color: #c9ced6;
        border: 1px dashed var(--line);
        font: 11px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      }
      .hint { color: var(--muted); font-size: 11px; }
      .build-note-inline {
        color: #9399a4;
        font-size: 10px;
        line-height: 1.4;
        text-align: right;
        padding: 0 2px;
      }
      .maker-actions {
        display: grid;
        gap: 8px;
      }
      textarea.control {
        min-height: 96px;
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
        <button type="button" class="tab active" id="tabMaker" data-action="switch-maker">Maker</button>
        <button type="button" class="tab" id="tabInspection" data-action="switch-inspection">Inspection</button>
        <button type="button" class="tab" id="tabExtraction" data-action="switch-extraction">Extraction</button>
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
        <button type="button" class="btn primary" id="makerSubmit" data-action="maker-submit"><span id="makerSpinner" class="spinner hidden"></span><span id="makerSubmitLabel">Create</span></button>
        <div class="chat" id="makerThread">
          <div class="chat-item system">
            <div class="chat-role">Status</div>
            <div class="chat-bubble">Maker intent와 적용 결과가 여기에 표시됩니다.</div>
          </div>
        </div>
        <div class="hint">Contract와 extracted component를 바탕으로 새 instance를 만들거나, 선택한 영역을 프롬프트로 다시 생성합니다.</div>
        <div class="build-note-inline" id="makerBuildInline"></div>
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
        <button type="button" class="btn primary" id="renderContractPreview" data-action="render-contract-preview">Render Selected Contract</button>
        <div class="hint">Button/Input은 inspection payload 기준으로 렌더합니다.</div>
      </div>

      <div class="panel" id="panelExtraction">
        <div class="label">Current File URL</div>
        <input class="control" id="fileUrlInput" placeholder="https://www.figma.com/design/..." />

        <div class="row2">
          <button type="button" class="btn" id="refreshSelection" data-action="refresh-selection">Refresh</button>
          <button type="button" class="btn" id="bridgeTest" data-action="bridge-test">Bridge Test</button>
        </div>
        <div class="row2">
          <button type="button" class="btn primary" id="extractSelection" data-action="extract-selection"><span id="extractSpinner" class="spinner hidden"></span><span id="extractLabel">Extract</span></button>
          <button type="button" class="btn" id="cancelExtraction" data-action="cancel-extraction" disabled>Cancel</button>
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
      <div class="app-footer" id="appBuildStamp"></div>
    </div>

    <script>
      (() => {
        const showBootError = (message) => {
          const existing = document.getElementById("bootError");
          if (existing) {
            existing.textContent = message;
            return;
          }

          const banner = document.createElement("div");
          banner.id = "bootError";
          banner.style.cssText = [
            "position:fixed",
            "left:14px",
            "right:14px",
            "top:14px",
            "z-index:9999",
            "padding:10px 12px",
            "border-radius:10px",
            "border:1px solid #7f1d1d",
            "background:#2b1111",
            "color:#fecaca",
            "font:12px/1.45 Pretendard, Inter, sans-serif",
            "white-space:pre-wrap"
          ].join(";");
          banner.textContent = message;
          document.body.appendChild(banner);
        };

        window.addEventListener("error", (event) => {
          const message = event?.error?.message || event?.message || "Maker UI runtime error";
          showBootError("Maker UI 오류: " + message);
        });

        window.addEventListener("unhandledrejection", (event) => {
          const reason = event?.reason;
          const message =
            (reason && reason.message) ||
            (typeof reason === "string" ? reason : "Maker UI promise rejection");
          showBootError("Maker UI promise 오류: " + message);
        });

        try {
        const optionsByLevel = __PREVIEW_OPTIONS_JSON__;
        const BRIDGE_URL = __BRIDGE_URL_JSON__;
        const BUILD_STAMP = __BUILD_STAMP_JSON__;

        const $ = (id) => {
          const node = document.getElementById(id);
          if (!node) {
            throw new Error("UI element missing: " + id);
          }
          return node;
        };
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
          appBuildStamp: $("appBuildStamp"),
          makerBuildInline: $("makerBuildInline"),
          makerThread: $("makerThread"),
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
        el.appBuildStamp.textContent = "Build " + BUILD_STAMP;
        el.makerBuildInline.textContent = "Build " + BUILD_STAMP;

        let memoryFileUrl = "";
        let latestSelectionSummary = null;
        let lastExtractionName = "";
        let lastNodeUrl = "";
        let latestSelectionSvg = null;
        let selectionSvgResolver = null;
        let extractionPayloadResolver = null;
        let abortController = null;
        let timer = null;
        let poller = null;
        let makerAckTimer = null;
        let startedAt = 0;
        let statusText = "";
        let statusTone = "";
        const THREAD_STORAGE_KEY = "mads-maker-thread-history";
        const THREAD_HISTORY_LIMIT = 120;
        let makerThreadHistory = [];
        let makerThreadSequence = 0;
        let activeMakerRun = null;

        const saveMakerThreadHistory = () => {
          try {
            localStorage.setItem(THREAD_STORAGE_KEY, JSON.stringify(makerThreadHistory));
          } catch {}
        };

        const renderMakerThread = () => {
          el.makerThread.innerHTML = "";

          for (const entry of makerThreadHistory) {
            const item = document.createElement("div");
            item.className = "chat-item " + entry.role;
            item.dataset.id = String(entry.id);
            if (entry.tone) item.dataset.tone = entry.tone;

            const roleEl = document.createElement("div");
            roleEl.className = "chat-role";
            roleEl.textContent =
              entry.role === "user"
                ? "You"
                : entry.role === "assistant"
                  ? "Maker"
                  : entry.role === "log"
                    ? "Log"
                    : "Status";

            const bubble = document.createElement("div");
            bubble.className = "chat-bubble";
            bubble.textContent = entry.text;

            item.appendChild(roleEl);
            item.appendChild(bubble);
            el.makerThread.appendChild(item);
          }

          scrollMakerThread();
        };

        const loadMakerThreadHistory = () => {
          try {
            const raw = localStorage.getItem(THREAD_STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            makerThreadHistory = Array.isArray(parsed) ? parsed.filter((entry) =>
              entry &&
              typeof entry === "object" &&
              typeof entry.id === "number" &&
              typeof entry.role === "string" &&
              typeof entry.text === "string"
            ) : [];
          } catch {
            makerThreadHistory = [];
          }

          makerThreadSequence = makerThreadHistory.reduce(
            (max, entry) => Math.max(max, Number(entry.id) || 0),
            0
          );

          if (makerThreadHistory.length === 0) {
            makerThreadHistory.push({
              id: ++makerThreadSequence,
              role: "system",
              text: "Maker intent와 적용 결과가 여기에 표시됩니다."
            });
            saveMakerThreadHistory();
          }

          renderMakerThread();
        };

        const trimMakerThreadHistory = () => {
          if (makerThreadHistory.length <= THREAD_HISTORY_LIMIT) return;
          makerThreadHistory = makerThreadHistory.slice(-THREAD_HISTORY_LIMIT);
        };

        const appendThreadEntry = (role, text, options = {}) => {
          if (!text) return null;
          const entry = {
            id: ++makerThreadSequence,
            role,
            text,
            tone: options.tone || ""
          };
          makerThreadHistory.push(entry);
          trimMakerThreadHistory();
          saveMakerThreadHistory();
          renderMakerThread();
          return entry.id;
        };

        const updateThreadEntry = (id, text, options = {}) => {
          if (!id || !text) return null;
          const entry = makerThreadHistory.find((item) => item.id === id);
          if (!entry) return null;
          entry.text = text;
          entry.tone = options.tone || "";
          saveMakerThreadHistory();
          renderMakerThread();
          return id;
        };

        const appendToThreadEntry = (id, text) => {
          if (!id || !text) return null;
          const entry = makerThreadHistory.find((item) => item.id === id);
          if (!entry) return null;
          entry.text = entry.text ? entry.text + "\n" + text : text;
          saveMakerThreadHistory();
          renderMakerThread();
          return id;
        };

        const beginMakerRun = () => {
          activeMakerRun = {
            statusId: null,
            detailsId: null,
            logId: null
          };
        };

        const scrollMakerThread = () => {
          el.makerThread.scrollTop = el.makerThread.scrollHeight;
        };

        const clearMakerThread = () => {
          makerThreadHistory = [];
          makerThreadSequence = 0;
          activeMakerRun = null;
          saveMakerThreadHistory();
          loadMakerThreadHistory();
        };

        const setMakerStatus = (text, tone) => {
          if (!text) return;
          if (!activeMakerRun) beginMakerRun();
          if (activeMakerRun.statusId) {
            updateThreadEntry(activeMakerRun.statusId, text, { tone });
            return;
          }
          activeMakerRun.statusId = appendThreadEntry("system", text, { tone });
        };

        const setMakerDetails = (value) => {
          if (!value) return;
          if (!activeMakerRun) beginMakerRun();
          const text =
            typeof value === "string"
              ? value
              : JSON.stringify(value, null, 2);
          if (activeMakerRun.detailsId) {
            updateThreadEntry(activeMakerRun.detailsId, text);
            return;
          }
          activeMakerRun.detailsId = appendThreadEntry("assistant", text);
        };

        const clearMakerLog = () => {
          if (!activeMakerRun || !activeMakerRun.logId) return;
          makerThreadHistory = makerThreadHistory.filter((entry) => entry.id !== activeMakerRun.logId);
          activeMakerRun.logId = null;
          saveMakerThreadHistory();
          renderMakerThread();
        };

        const appendMakerLog = (value) => {
          if (!value) return;
          if (!activeMakerRun) beginMakerRun();
          const timestamp = new Date().toLocaleTimeString("ko-KR", { hour12: false });
          const line = "[" + timestamp + "] " + value;
          if (activeMakerRun.logId) {
            appendToThreadEntry(activeMakerRun.logId, line);
            return;
          }
          activeMakerRun.logId = appendThreadEntry("log", line);
        };

        const pushMakerPrompt = (value) => {
          appendThreadEntry("user", value);
        };

        const syncMakerAction = () => {
          const hasSelection = Boolean(latestSelectionSummary && latestSelectionSummary.selectionCount);
          const idleLabel = hasSelection ? "Apply to Selection" : "Create";
          el.makerSubmitLabel.dataset.idleLabel = idleLabel;
          if (!el.makerSubmit.disabled) {
            el.makerSubmitLabel.textContent = idleLabel;
          }
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
            const normalized = /^https?:\/\//.test(raw) ? raw : "https://" + raw.replace(/^\/+/, "");
            const url = new URL(normalized);
            const match = url.pathname.match(/^\/(design|proto|board)\/([^/]+)/);
            return match ? match[2] : "";
          } catch {
            const match = raw.match(/figma\.com\/(?:design|proto|board)\/([^/?#]+)/i);
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

        const fetchBridgeJson = async (pathname, payload, timeoutMs = 10000) => {
          const response = await Promise.race([
            fetch(BRIDGE_URL + pathname, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload)
            }),
            new Promise((_, reject) => {
              setTimeout(() => reject(new Error(pathname.replace("/", "") + " 응답이 " + Math.round(timeoutMs / 1000) + "초 안에 오지 않았습니다.")), timeoutMs);
            })
          ]);

          const result = await response.json();
          if (!response.ok) {
            throw new Error(result && result.error ? result.error : pathname + " 요청에 실패했습니다.");
          }
          return result;
        };

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
          const prompt = el.makerPrompt.value.trim();
          if (!prompt) {
            setMakerStatus("Prompt를 입력해 주세요.", "error");
            return;
          }
          beginMakerRun();
          pushMakerPrompt(prompt);
          appendMakerLog("Maker 요청 시작: placement=" + placement);
          setMakerDetails("");
          setMakerLoading(true);

          try {
            setMakerStatus(
              placement === "selection"
                ? "선택 영역을 기준으로 분석과 생성을 준비 중입니다."
                : "Maker payload를 생성 중입니다."
            );
            appendMakerLog(
              "plugin main으로 requestMakerRun 메시지를 전달합니다. placement=" + placement
            );
            parent.postMessage(
              {
                pluginMessage: {
                  type: "requestMakerRun",
                  prompt,
                  selectionSummary: latestSelectionSummary,
                  placement
                }
              },
              "*"
            );
            appendMakerLog("requestMakerRun 메시지를 전달했습니다.");
            startMakerAckTimer();
          } catch (error) {
            const message = error && error.message ? error.message : String(error);
            appendMakerLog("Maker 실행 오류: " + message);
            setMakerStatus(message || "Maker 생성 중 오류가 발생했습니다.", "error");
            setMakerLoading(false);
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
            appendMakerLog("pluginError: " + (msg.message || "오류"));
          }
          if (msg.type === "makerProgress") {
            setMakerStatus(msg.message || "Maker 작업을 진행 중입니다.");
            appendMakerLog("makerProgress: " + (msg.message || "진행 중"));
          }
          if (msg.type === "makerSummary") {
            setMakerDetails(msg.summary || "");
            appendMakerLog("makerSummary 수신");
          }
          if (msg.type === "makerRendered") {
            stopMakerAckTimer();
            setMakerStatus(msg.message || "Maker rendering complete.");
            setMakerLoading(false);
            appendMakerLog("makerRendered: " + (msg.message || "완료"));
          }
        };

        const handleAction = (action) => {
          if (!action) return;

          if (action === "switch-maker") {
            switchTab("maker");
            return;
          }
          if (action === "switch-inspection") {
            switchTab("inspection");
            return;
          }
          if (action === "switch-extraction") {
            switchTab("extraction");
            return;
          }
          if (action === "maker-submit") {
            const hasSelection = Boolean(latestSelectionSummary && latestSelectionSummary.selectionCount);
            runMaker(hasSelection ? "selection" : "new-frame");
            return;
          }
          if (action === "render-contract-preview") {
            el.render.disabled = true;
            parent.postMessage({ pluginMessage: { type: "renderContractPreview", previewId: el.previewItem.value } }, "*");
            return;
          }
          if (action === "refresh-selection") {
            parent.postMessage({ pluginMessage: { type: "requestSelectionInfo" } }, "*");
            parent.postMessage({ pluginMessage: { type: "requestSelectionSvg" } }, "*");
            checkBridge();
            return;
          }
          if (action === "bridge-test") {
            checkBridge();
            return;
          }
          if (action === "extract-selection") {
            runExtraction();
            return;
          }
          if (action === "cancel-extraction") {
            if (abortController) abortController.abort();
            stopPoll();
            setLoading(false);
            setStatus("Extraction cancelled.", "warning");
          }
        };

        const bindAction = (node, action) => {
          if (!node) return;
          node.dataset.action = action;
          node.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            handleAction(action);
          });
        };

        [
          [el.tabMaker, "switch-maker"],
          [el.tabInspection, "switch-inspection"],
          [el.tabExtraction, "switch-extraction"],
          [el.makerSubmit, "maker-submit"],
          [el.render, "render-contract-preview"],
          [el.refresh, "refresh-selection"],
          [el.bridgeTest, "bridge-test"],
          [el.extract, "extract-selection"],
          [el.cancel, "cancel-extraction"]
        ].forEach(([node, action]) => bindAction(node, action));

        el.previewLevel.addEventListener("change", syncPreviewItems);
        el.fileUrlInput.addEventListener("change", () => setStoredFileUrl(el.fileUrlInput.value.trim()));
        el.fileUrlInput.addEventListener("blur", () => setStoredFileUrl(el.fileUrlInput.value.trim()));

        el.fileUrlInput.value = getStoredFileUrl();
        lastNodeUrl = getStoredFileUrl();
        syncPreviewItems();
        syncMakerAction();
        loadMakerThreadHistory();
        setLoading(false);
        stopMakerAckTimer();
        setMakerLoading(false);
        parent.postMessage({ pluginMessage: { type: "pluginReady" } }, "*");
        parent.postMessage({ pluginMessage: { type: "requestSelectionSvg" } }, "*");
        checkBridge();
        } catch (error) {
          const message = error && error.message ? error.message : String(error);
          showBootError("Maker UI 초기화 실패: " + message);
        }
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
  height: 620
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

    if (message.type === "requestMakerGenerate") {
      postMakerProgress("브리지에서 Maker payload를 생성하는 중입니다.");
      const response = await Promise.race([
        fetch(BRIDGE_URL + "/maker-generate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            prompt: message.prompt,
            selectionSummary: message.selectionSummary
          })
        }),
        new Promise<Response>((_, reject) => {
          setTimeout(() => reject(new Error("maker-generate 응답이 10초 안에 오지 않았습니다.")), 10000);
        })
      ]);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result && result.error ? result.error : "Maker 생성에 실패했습니다.");
      }
      if (!result || !isFigmaWritePayload(result.payload)) {
        throw new Error("Maker payload 형식이 올바르지 않습니다.");
      }

      figma.ui.postMessage({
        type: "makerSummary",
        summary: {
          inferredScreen: result?.maker?.inferredScreen ?? null,
          summary: result?.summary ?? null,
          evaluation: result?.evaluation ?? null
        }
      });
      await renderMakerPayloadToCanvas(result.payload, message.placement);
      return;
    }

    if (message.type === "requestMakerRun") {
      const selectionSummary = (message.selectionSummary as
        | {
            selectionIntent?: {
              kind?: "single-component" | "component-group" | "section" | "screen-fragment" | "unknown";
            };
          }
        | undefined) ?? summarizeSelection(figma.currentPage.selection);

      if (message.placement === "selection") {
        const looksLikeImmediateDirectEdit = parseLocalEditIntentKind(message.prompt) !== null;
        const immediateIntent = buildLocalDirectEditIntent(message.prompt, selectionSummary);
        if (immediateIntent) {
          postMakerProgress(immediateIntent.message || "direct edit intent를 적용합니다.");
          const responseMessage = applyDirectEditIntent([...figma.currentPage.selection], immediateIntent);
          sendSelectionInfo();
          void sendSelectionSvg();
          figma.notify(responseMessage);
          figma.ui.postMessage({
            type: "makerSummary",
            summary: immediateIntent
          });
          figma.ui.postMessage({
            type: "makerRendered",
            message: responseMessage
          });
          return;
        }

        if (looksLikeImmediateDirectEdit) {
          throw new Error("현재 selection에서는 직접 수정 기준을 찾지 못했습니다.");
        }

        postMakerProgress("선택 영역을 MCP로 분석하는 중입니다.");
        const analyzeResponse = await Promise.race([
          fetch(BRIDGE_URL + "/maker-analyze", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              prompt: message.prompt,
              selectionSummary: message.selectionSummary
            })
          }),
          new Promise<Response>((_, reject) => {
            setTimeout(() => reject(new Error("maker-analyze 응답이 10초 안에 오지 않았습니다.")), 10000);
          })
        ]);
        const analyzed = await analyzeResponse.json();
        if (!analyzeResponse.ok) {
          throw new Error(analyzed && analyzed.error ? analyzed.error : "선택 분석에 실패했습니다.");
        }
        if (analyzed && analyzed.directEdit) {
          postMakerProgress("MCP direct edit intent를 적용합니다.");
          const responseMessage = applyDirectEditIntent([...figma.currentPage.selection], analyzed.directEdit);
          sendSelectionInfo();
          void sendSelectionSvg();
          figma.notify(responseMessage);
          figma.ui.postMessage({
            type: "makerSummary",
            summary: analyzed.directEdit
          });
          figma.ui.postMessage({
            type: "makerRendered",
            message: responseMessage
          });
          return;
        }

        postMakerProgress("selection-preview 제안안을 생성합니다.");
        const response = await Promise.race([
          fetch(BRIDGE_URL + "/maker-generate", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              prompt: message.prompt,
              selectionSummary: message.selectionSummary
            })
          }),
          new Promise<Response>((_, reject) => {
            setTimeout(() => reject(new Error("maker-generate 응답이 10초 안에 오지 않았습니다.")), 10000);
          })
        ]);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result && result.error ? result.error : "Maker 생성에 실패했습니다.");
        }
        if (!result || !isFigmaWritePayload(result.payload)) {
          throw new Error("Maker payload 형식이 올바르지 않습니다.");
        }
        figma.ui.postMessage({
          type: "makerSummary",
          summary: {
            inferredScreen: result?.maker?.inferredScreen ?? null,
            summary: result?.summary ?? null,
            evaluation: result?.evaluation ?? null
          }
        });
        await renderMakerPayloadToCanvas(result.payload, "selection-preview");
        return;
      }

      postMakerProgress("브리지에서 Maker payload를 생성하는 중입니다.");
      const response = await Promise.race([
        fetch(BRIDGE_URL + "/maker-generate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            prompt: message.prompt,
            selectionSummary: message.selectionSummary
          })
        }),
        new Promise<Response>((_, reject) => {
          setTimeout(() => reject(new Error("maker-generate 응답이 10초 안에 오지 않았습니다.")), 10000);
        })
      ]);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result && result.error ? result.error : "Maker 생성에 실패했습니다.");
      }
      if (!result || !isFigmaWritePayload(result.payload)) {
        throw new Error("Maker payload 형식이 올바르지 않습니다.");
      }
      figma.ui.postMessage({
        type: "makerSummary",
        summary: {
          inferredScreen: result?.maker?.inferredScreen ?? null,
          summary: result?.summary ?? null,
          evaluation: result?.evaluation ?? null
        }
      });
      await renderMakerPayloadToCanvas(result.payload, "new-frame");
      return;
    }

    if (message.type === "makerGenerate") {
      await renderMakerPayloadToCanvas(message.payload, message.placement);
      return;
    }

    if (message.type === "makerDirectEdit") {
      postMakerProgress("direct edit intent를 적용합니다.");
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
