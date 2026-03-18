import { fetchPayload, fetchPayloadFromPrompt, loadExtractionArtifact, saveExtractionArtifact } from "./api/fetchPayload";
import { renderPayload } from "./write/renderPayload";
import type { DesignPrompt, PluginUiMessage } from "./types";
import { loadDefaultFont } from "./write/createTextNode";
import buttonInspectionPayload from "../../../artifacts/figma/button-inspection/mcp-payload.json";
import inputInspectionPayload from "../../../artifacts/figma/input-inspection/mcp-payload.json";
import tabsInspectionPayload from "../../../artifacts/figma/tabs-inspection/mcp-payload.json";
import listCellInspectionPayload from "../../../artifacts/figma/list-cell-inspection/mcp-payload.json";
import overlayInspectionPayload from "../../../artifacts/figma/overlay-inspection/mcp-payload.json";
import navigationInspectionPayload from "../../../artifacts/figma/navigation-inspection/mcp-payload.json";
import formInspectionPayload from "../../../artifacts/figma/form-inspection/mcp-payload.json";
import coreFamiliesPayload from "../../../artifacts/figma/core-families/mcp-payload.json";
import type { FigmaWritePayload } from "../../../shared/contracts/figmaWritePayload";

type PromptScreen = "login" | "settings" | "dashboard" | "list";
type ExtractionAction = "created" | "merged" | "updated" | "unchanged";

interface ExtractionLogEntry {
  id: string;
  key: string;
  name: string;
  timestamp: string;
  action: ExtractionAction;
  nodeCount: number;
  summary: string;
}

interface ExtractionSnapshotDocument {
  key: string;
  name: string;
  updatedAt: string;
  parts: Record<
    string,
    {
      name: string;
      extractedAt: string;
      selectionCount: number;
      hash: string;
    }
  >;
}

interface InputBlueprint {
  targetComponent: "Input";
  sourceComponentName: string;
  updatedAt: string;
  metrics: {
    width?: number;
    height?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    itemSpacing?: number;
    radius?: number;
    layoutMode?: string;
  };
  properties?: {
    keys: string[];
    values?: Record<string, unknown>;
  };
}

interface RawComponentPayload {
  key: string;
  name: string;
  extractedAt: string;
  rootType: SceneNode["type"];
  document: Record<string, unknown>;
}

const EXTRACTION_LOGS_KEY = "miterlab.extraction.logs.v1";
const EXTRACTION_SNAPSHOT_PREFIX = "miterlab.extraction.snapshot.";
const EXTRACTION_INDEX_KEY = "miterlab.extraction.index.v1";
const INPUT_BLUEPRINT_KEY = "miterlab.blueprint.input.v1";
const EXTRACTION_RESET_MARKER_KEY = "miterlab.extraction.reset-once.v1";

const inspectionFamilyPayloads: Record<string, FigmaWritePayload> = {
  "core-families": coreFamiliesPayload as unknown as FigmaWritePayload,
  "button-inspection": buttonInspectionPayload as unknown as FigmaWritePayload,
  "input-inspection": inputInspectionPayload as unknown as FigmaWritePayload,
  "tabs-inspection": tabsInspectionPayload as unknown as FigmaWritePayload,
  "list-cell-inspection": listCellInspectionPayload as unknown as FigmaWritePayload,
  "overlay-inspection": overlayInspectionPayload as unknown as FigmaWritePayload,
  "navigation-inspection": navigationInspectionPayload as unknown as FigmaWritePayload,
  "form-inspection": formInspectionPayload as unknown as FigmaWritePayload
};

const renderCoreFamilies = async () => {
  const result = await renderPayload(coreFamiliesPayload as unknown as FigmaWritePayload);
  figma.notify(`Rendered ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
  return result;
};

const renderInspectionFamily = async (family: string) => {
  const payload = inspectionFamilyPayloads[family];
  if (!payload) {
    throw new Error(`Unknown inspection family: ${family}`);
  }
  const result = await renderPayload(payload);
  figma.notify(`Rendered ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
  return result;
};

const normalizeScreen = (screen: string, promptText: string): PromptScreen => {
  if (screen === "login" || screen === "settings" || screen === "dashboard" || screen === "list") return screen;

  if (/로그인|sign in|signin/i.test(promptText)) return "login";
  if (/설정|setting|save/i.test(promptText)) return "settings";
  if (/목록|리스트|list|items/i.test(promptText)) return "list";
  return "dashboard";
};

const extractValue = (promptText: string, keys: string[]) => {
  for (const key of keys) {
    const pattern = new RegExp(`${key}\\s*[:：]\\s*([^\\n.]+)`, "i");
    const match = promptText.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return undefined;
};

const hasWord = (promptText: string, words: string[]) => words.some((word) => promptText.toLowerCase().includes(word.toLowerCase()));

const selectionContextText = () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) return "";

  if (selection.length === 1) {
    const node = selection[0];
    const sizeText = "width" in node && "height" in node ? `, ${Math.round(node.width)}x${Math.round(node.height)}` : "";
    return `선택됨: ${node.name} (${node.type}${sizeText})`;
  }

  return `선택됨: ${selection.length}개 레이어`;
};

const rgb255 = (color?: { r?: number; g?: number; b?: number }) => ({
  r: ((color?.r ?? 0) as number) / 255,
  g: ((color?.g ?? 0) as number) / 255,
  b: ((color?.b ?? 0) as number) / 255
});

type RawSerializedNode = {
  name?: string;
  type?: string;
  size?: { width?: number; height?: number };
  position?: { x?: number; y?: number };
  cornerRadius?: number | PluginAPI["mixed"];
  strokeWeight?: number;
  fills?: Array<{ type?: string; visible?: boolean; opacity?: number; color?: { r?: number; g?: number; b?: number } }>;
  strokes?: Array<{ type?: string; visible?: boolean; opacity?: number; color?: { r?: number; g?: number; b?: number } }>;
  text?: { characters?: string; fontSize?: number; lineHeight?: { value?: number } };
  children?: RawSerializedNode[];
};

const applyRawPaints = (
  node: GeometryMixin,
  fills?: RawSerializedNode["fills"],
  strokes?: RawSerializedNode["strokes"],
  strokeWeight?: number
) => {
  if (fills && fills.length > 0) {
    node.fills = fills
      .filter((paint) => paint.type === "SOLID" && paint.visible !== false)
      .map((paint) => ({
        type: "SOLID" as const,
        opacity: typeof paint.opacity === "number" ? paint.opacity : 1,
        color: rgb255(paint.color)
      }));
  } else {
    node.fills = [];
  }

  if (strokes && strokes.length > 0) {
    node.strokes = strokes
      .filter((paint) => paint.type === "SOLID" && paint.visible !== false)
      .map((paint) => ({
        type: "SOLID" as const,
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

const createRawSceneNode = async (rawNode: RawSerializedNode): Promise<SceneNode> => {
  const width = Math.max(1, Math.round(rawNode.size?.width ?? 1));
  const height = Math.max(1, Math.round(rawNode.size?.height ?? 1));
  const x = Math.round(rawNode.position?.x ?? 0);
  const y = Math.round(rawNode.position?.y ?? 0);

  if (rawNode.type === "TEXT") {
    const text = figma.createText();
    text.name = rawNode.name ?? "Raw Text";
    try {
      await loadDefaultFont();
      text.fontName = await loadDefaultFont();
    } catch {}
    text.characters = rawNode.text?.characters ?? "";
    if (typeof rawNode.text?.fontSize === "number") {
      text.fontSize = rawNode.text.fontSize;
    }
    if (typeof rawNode.text?.lineHeight?.value === "number") {
      text.lineHeight = { unit: "PIXELS", value: rawNode.text.lineHeight.value };
    }
    text.x = x;
    text.y = y;
    text.textAutoResize = "WIDTH_AND_HEIGHT";
    if (rawNode.fills?.length) {
      text.fills = rawNode.fills
        .filter((paint) => paint.type === "SOLID" && paint.visible !== false)
        .map((paint) => ({
          type: "SOLID" as const,
          opacity: typeof paint.opacity === "number" ? paint.opacity : 1,
          color: rgb255(paint.color)
        }));
    }
    return text;
  }

  const frame = figma.createFrame();
  frame.name = rawNode.name ?? rawNode.type ?? "Raw Node";
  frame.resize(width, height);
  frame.x = x;
  frame.y = y;
  frame.layoutMode = "NONE";
  frame.clipsContent = false;
  if (typeof rawNode.cornerRadius === "number") {
    frame.cornerRadius = rawNode.cornerRadius;
  }
  applyRawPaints(frame, rawNode.fills, rawNode.strokes, rawNode.strokeWeight);

  for (const child of rawNode.children ?? []) {
    const next = await createRawSceneNode(child);
    frame.appendChild(next);
  }

  return frame;
};

const createPreviewLabel = async (value: string, x: number, y: number) => {
  const text = figma.createText();
  try {
    text.fontName = await loadDefaultFont();
  } catch {}
  text.characters = value;
  text.fontSize = 12;
  text.lineHeight = { unit: "PIXELS", value: 18 };
  text.fills = [{ type: "SOLID", color: { r: 0.37, g: 0.42, b: 0.48 } }];
  text.x = x;
  text.y = y;
  text.textAutoResize = "WIDTH_AND_HEIGHT";
  return text;
};

const canonicalVariantSignature = (node: RawSerializedNode) => {
  const variant = (node as RawSerializedNode & { variantProperties?: Record<string, unknown> }).variantProperties;
  if (!variant || typeof variant !== "object") {
    return node.name ?? "variant";
  }
  return Object.entries(variant)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(", ");
};

const createAuditLine = async (value: string, width = 960, size = 12, color = { r: 0.25, g: 0.29, b: 0.34 }) => {
  const text = figma.createText();
  try {
    text.fontName = await loadDefaultFont();
  } catch {}
  text.characters = value;
  text.fontSize = size;
  text.lineHeight = { unit: "PIXELS", value: size === 12 ? 18 : 22 };
  text.fills = [{ type: "SOLID", color }];
  text.textAutoResize = "HEIGHT";
  text.resize(width, text.height);
  return text;
};

const summarizeRawNode = (node: RawSerializedNode) => {
  const parts = [
    node.name ?? node.type ?? "Node",
    node.type ?? "UNKNOWN",
    node.size?.width && node.size?.height ? `${Math.round(node.size.width)}x${Math.round(node.size.height)}` : undefined
  ].filter(Boolean);
  return parts.join(" / ");
};

const createRawViewport = async (variant: RawSerializedNode) => {
  const width = Math.max(1, Math.round(variant.size?.width ?? 240));
  const height = Math.max(1, Math.round(variant.size?.height ?? 64));
  const viewport = figma.createFrame();
  viewport.name = `${variant.name ?? "Variant"} / Raw Viewport`;
  viewport.resize(width, height);
  viewport.layoutMode = "NONE";
  viewport.clipsContent = true;
  viewport.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  viewport.strokes = [{ type: "SOLID", color: { r: 0.94, g: 0.95, b: 0.97 } }];

  for (const child of variant.children ?? []) {
    const childNode = await createRawSceneNode(child);
    viewport.appendChild(childNode);
  }

  return viewport;
};

const renderRawExtraction = async (raw: { name?: string; document?: RawSerializedNode }) => {
  const root = raw.document;
  if (!root) {
    throw new Error("raw document is missing");
  }

  const frameName = `추출 - raw 재현/해석 / ${raw.name ?? root.name ?? "Component"}`;
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

  const title = await createAuditLine(`추출 - raw 재현/해석 / ${raw.name ?? root.name ?? "Component"}`, 960, 16, {
    r: 0.12,
    g: 0.15,
    b: 0.19
  });
  canvas.appendChild(title);

  const rootInfo = await createAuditLine(
    `root: ${root.type ?? "UNKNOWN"} / ${Math.round(root.size?.width ?? 0)}x${Math.round(root.size?.height ?? 0)}`
  );
  canvas.appendChild(rootInfo);

  const propertyDefinitions = ((root as RawSerializedNode & { component?: { componentPropertyDefinitions?: Record<string, unknown> } }).component
    ?.componentPropertyDefinitions ?? {}) as Record<string, unknown>;
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

  const variantsTitle = await createAuditLine("variant 목록", 920, 14, { r: 0.15, g: 0.18, b: 0.22 });
  variantsSection.appendChild(variantsTitle);

  const guide = await createAuditLine(
    "왼쪽: raw 재현 / 오른쪽: raw 해석",
    920,
    12,
    { r: 0.37, g: 0.42, b: 0.48 }
  );
  variantsSection.appendChild(guide);

  const directVariants =
    root.type === "COMPONENT_SET" && Array.isArray(root.children)
      ? root.children.filter((child) => child.type === "COMPONENT")
      : [root];
  const seen = new Set<string>();
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
    viewportWrap.name = "재현";
    viewportWrap.resize(Math.max(360, Math.round(variant.size?.width ?? 240) + 24), 64);
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

    const viewportLabel = await createAuditLine("재현", 320, 12, {
      r: 0.18,
      g: 0.21,
      b: 0.26
    });
    viewportWrap.appendChild(viewportLabel);

    const viewport = await createRawViewport(variant);
    viewportWrap.appendChild(viewport);

    const explainWrap = figma.createFrame();
    explainWrap.name = "해석";
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

    const explainLabel = await createAuditLine("해석", 440, 12, {
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
      `frame: ${Math.round(variant.size?.width ?? 0)}x${Math.round(variant.size?.height ?? 0)} / children: ${(variant.children ?? []).length}`,
      440
    );
    explainWrap.appendChild(meta);

    const childSummary = (variant.children ?? []).slice(0, 6).map((child) => summarizeRawNode(child)).join(" | ");
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

const hashKey = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0).toString(36);
};

const normalizeExtractionKey = (value: string) => {
  const normalized =
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "selection";

  const compact = normalized.slice(0, 32).replace(/-+$/g, "") || "selection";
  return `${compact}-${hashKey(value)}`;
};

const toPlainValue = (value: unknown): unknown => {
  if (value === figma.mixed || typeof value === "symbol") return undefined;
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (Array.isArray(value)) {
    return value
      .map((item) => toPlainValue(item))
      .filter((item) => item !== undefined);
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, nested]) => [key, toPlainValue(nested)] as const)
      .filter(([, nested]) => nested !== undefined);
    return Object.fromEntries(entries);
  }
  return String(value);
};

const serializePaints = (paints: readonly Paint[] | PluginAPI["mixed"]) => {
  if (!Array.isArray(paints)) return undefined;
  return paints
    .filter((paint) => paint.type === "SOLID")
    .map((paint) => ({
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

const serializeStrokes = (node: GeometryMixin) => ({
  strokes: serializePaints(node.strokes),
  strokeWeight: node.strokeWeight
});

const serializeTextStyle = (node: TextNode) => ({
  characters: node.characters,
  fontSize: node.fontSize === figma.mixed ? undefined : node.fontSize,
  lineHeight: toPlainValue(node.lineHeight),
  fontName: node.fontName === figma.mixed ? undefined : toPlainValue(node.fontName),
  textAlignHorizontal: node.textAlignHorizontal,
  textAlignVertical: node.textAlignVertical
});

const serializeEffects = (effects: readonly Effect[] | PluginAPI["mixed"]) => {
  if (!Array.isArray(effects)) return undefined;
  return effects.map((effect) => toPlainValue(effect));
};

const serializeVariables = (node: SceneNode) => {
  if (!("boundVariables" in node)) return undefined;
  return toPlainValue((node as SceneNode & { boundVariables?: unknown }).boundVariables);
};

const serializeSceneNode = (node: SceneNode): Record<string, unknown> => {
  const base: Record<string, unknown> = {
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
      layoutSizingHorizontal: "layoutSizingHorizontal" in node ? node.layoutSizingHorizontal : undefined,
      layoutSizingVertical: "layoutSizingVertical" in node ? node.layoutSizingVertical : undefined
    };
  }

  if ("layoutAlign" in node || "layoutGrow" in node) {
    base.layoutBehavior = {
      layoutAlign: "layoutAlign" in node ? node.layoutAlign : undefined,
      layoutGrow: "layoutGrow" in node ? node.layoutGrow : undefined
    };
  }

  if ("minWidth" in node || "maxWidth" in node || "minHeight" in node || "maxHeight" in node) {
    base.sizeLimits = {
      minWidth: "minWidth" in node ? node.minWidth : undefined,
      maxWidth: "maxWidth" in node ? node.maxWidth : undefined,
      minHeight: "minHeight" in node ? node.minHeight : undefined,
      maxHeight: "maxHeight" in node ? node.maxHeight : undefined
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
      mainComponentId: node.mainComponent?.id,
      mainComponentName: node.mainComponent?.name,
      componentProperties: toPlainValue(node.componentProperties)
    };
  }

  if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
    const isVariantComponent = node.type === "COMPONENT" && node.parent?.type === "COMPONENT_SET";
    base.component = {
      key: "key" in node ? node.key : undefined,
      description: "description" in node ? node.description : undefined,
      componentPropertyDefinitions:
        node.type === "COMPONENT_SET" || !isVariantComponent
          ? ("componentPropertyDefinitions" in node ? toPlainValue(node.componentPropertyDefinitions) : undefined)
          : undefined
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

const extractSelectionPayload = () => {
  const selection = figma.currentPage.selection;
  return {
    extractedAt: new Date().toISOString(),
    page: figma.currentPage.name,
    selectionCount: selection.length,
    nodes: selection.map((node) => serializeSceneNode(node))
  };
};

const getComponentRegistrationName = (node: SceneNode): string | undefined => {
  if (node.type === "INSTANCE") {
    return node.mainComponent?.name ?? node.name;
  }
  if (node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
    return node.name;
  }
  return undefined;
};

const getComponentAwarePath = (node: SceneNode): string => {
  const parts: string[] = [];
  const selfRegistrationName = getComponentRegistrationName(node);
  if (selfRegistrationName) {
    parts.push(`component:${selfRegistrationName}`);
  } else {
    parts.push(`node:${node.type}`);
  }

  let current: BaseNode | null = node.parent;
  while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
    if ("type" in current) {
      const currentNode = current as SceneNode;
      const registrationName = getComponentRegistrationName(currentNode);
      if (registrationName) {
        parts.unshift(`component:${registrationName}`);
      }
    }
    current = current.parent;
  }
  return parts.join(" / ");
};

const findReferenceNode = (node: SceneNode): SceneNode => {
  let current: BaseNode | null = node;
  let lastSceneNode: SceneNode = node;
  while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
    if ("type" in current && (current.type === "INSTANCE" || current.type === "COMPONENT" || current.type === "COMPONENT_SET")) {
      return current as SceneNode;
    }
    if ("type" in current) {
      lastSceneNode = current as SceneNode;
    }
    current = current.parent;
  }
  return lastSceneNode;
};

const resolveExtractionRoot = (node: SceneNode): SceneNode => {
  if (node.type === "INSTANCE" && node.mainComponent) {
    const parent = node.mainComponent.parent;
    if (parent && "type" in parent && parent.type === "COMPONENT_SET") {
      return parent as SceneNode;
    }
    return node.mainComponent;
  }

  let current: BaseNode | null = node;
  let componentNode: SceneNode | null = null;
  while (current && current.type !== "PAGE" && current.type !== "DOCUMENT") {
    if ("type" in current && (current.type === "COMPONENT" || current.type === "COMPONENT_SET")) {
      componentNode = current as SceneNode;
    }
    current = current.parent;
  }

  return componentNode ?? findReferenceNode(node);
};

const getExtractionIdentity = () => {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    return { key: "selection", name: "selection", partKey: "root", partName: "selection" };
  }

  const reference = findReferenceNode(selection[0]);
  const rootName =
    reference.type === "INSTANCE" && reference.mainComponent?.name
      ? reference.mainComponent.name
      : reference.name;
  const combinedPath = selection.map((node) => getComponentAwarePath(node)).join(" | ");
  const partName =
    selection.length === 1
      ? getComponentRegistrationName(selection[0]) ?? `${selection[0].name} (${selection[0].type})`
      : `${selection.length} selections`;
  return {
    key: normalizeExtractionKey(rootName),
    name: rootName,
    partKey: normalizeExtractionKey(combinedPath),
    partName
  };
};

const extractRawComponentPayload = (): RawComponentPayload | null => {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) return null;

  const root = resolveExtractionRoot(selection[0]);
  const rootName =
    root.type === "INSTANCE" && root.mainComponent?.name
      ? root.mainComponent.name
      : root.name;

  return {
    key: normalizeExtractionKey(rootName),
    name: rootName,
    extractedAt: new Date().toISOString(),
    rootType: root.type,
    document: serializeSceneNode(root)
  };
};

const isInputComponentName = (value?: string) => Boolean(value && /(textinput|textfield|input)/i.test(value));

const resolveInputBlueprintTarget = (node: SceneNode): SceneNode => {
  const root = resolveExtractionRoot(node);
  if (root.type === "COMPONENT_SET") {
    const representative = root.children.find((child) => child.type === "COMPONENT");
    return representative ?? root;
  }
  if (root.type === "INSTANCE" && root.mainComponent) {
    return root.mainComponent;
  }
  return root;
};

const extractInputBlueprint = (): InputBlueprint | null => {
  const selection = figma.currentPage.selection;
  if (selection.length !== 1) return null;

  const node = selection[0];
  const reference = resolveInputBlueprintTarget(node);
  const sourceComponentName =
    reference.type === "INSTANCE" && reference.mainComponent?.name
      ? reference.mainComponent.name
      : reference.name;

  if (!isInputComponentName(sourceComponentName)) {
    return null;
  }

  const propertyValues =
    reference.type === "INSTANCE"
      ? (toPlainValue(reference.componentProperties) as Record<string, unknown> | undefined)
      : reference.type === "COMPONENT_SET" || reference.type === "COMPONENT"
        ? (toPlainValue(
            "componentPropertyDefinitions" in reference ? reference.componentPropertyDefinitions : undefined
          ) as Record<string, unknown> | undefined)
        : undefined;

  return {
    targetComponent: "Input",
    sourceComponentName,
    updatedAt: new Date().toISOString(),
    metrics: {
      width: "width" in reference ? Math.round(reference.width) : undefined,
      height: "height" in reference ? Math.round(reference.height) : undefined,
      paddingTop: "layoutMode" in reference ? reference.paddingTop : undefined,
      paddingRight: "layoutMode" in reference ? reference.paddingRight : undefined,
      paddingBottom: "layoutMode" in reference ? reference.paddingBottom : undefined,
      paddingLeft: "layoutMode" in reference ? reference.paddingLeft : undefined,
      itemSpacing: "layoutMode" in reference ? reference.itemSpacing : undefined,
      radius: "cornerRadius" in reference && typeof reference.cornerRadius === "number" ? reference.cornerRadius : undefined,
      layoutMode: "layoutMode" in reference ? reference.layoutMode : undefined
    },
    properties: {
      keys: propertyValues ? Object.keys(propertyValues) : [],
      values: propertyValues
    }
  };
};

const persistDerivedBlueprints = async () => {
  const inputBlueprint = extractInputBlueprint();
  if (inputBlueprint) {
    await safeSetClientStorage(INPUT_BLUEPRINT_KEY, inputBlueprint);
    return { inputBlueprintUpdated: true, sourceComponentName: inputBlueprint.sourceComponentName, inputBlueprint };
  }

  return { inputBlueprintUpdated: false, inputBlueprint: undefined };
};

const getSnapshotStorageKey = (key: string) => `${EXTRACTION_SNAPSHOT_PREFIX}${key}`;

interface ExtractionIndexDocument {
  components: Record<
    string,
    {
      name: string;
      updatedAt: string;
      parts: Record<
        string,
        {
          name: string;
          extractedAt: string;
          selectionCount: number;
          hash: string;
        }
      >;
    }
  >;
}

interface ExtractionComponentSummary {
  key: string;
  name: string;
  updatedAt: string;
  partCount: number;
}

const summarizeExtractionComponents = (index: ExtractionIndexDocument): ExtractionComponentSummary[] =>
  Object.entries(index.components)
    .map(([key, value]) => ({
      key,
      name: value.name,
      updatedAt: value.updatedAt,
      partCount: Object.keys(value.parts).length
    }))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

const readExtractionIndex = async (): Promise<ExtractionIndexDocument> => {
  const value = await figma.clientStorage.getAsync(EXTRACTION_INDEX_KEY);
  if (value && typeof value === "object" && "components" in (value as Record<string, unknown>)) {
    return value as ExtractionIndexDocument;
  }
  return { components: {} };
};

const safeSetClientStorage = async (key: string, value: unknown, fallback?: () => Promise<void>) => {
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

const writeExtractionIndex = async (index: ExtractionIndexDocument) => {
  await safeSetClientStorage(EXTRACTION_INDEX_KEY, index);
};

const purgeLegacyExtractionSnapshots = async () => {
  const keys = await figma.clientStorage.keysAsync();
  const legacyKeys = keys.filter((key) => key.startsWith(EXTRACTION_SNAPSHOT_PREFIX));
  if (legacyKeys.length === 0) return;
  await Promise.all(legacyKeys.map((key) => figma.clientStorage.deleteAsync(key)));
};

const purgeAllExtractionState = async () => {
  await purgeLegacyExtractionSnapshots();
  await Promise.all([
    figma.clientStorage.deleteAsync(EXTRACTION_LOGS_KEY),
    figma.clientStorage.deleteAsync(EXTRACTION_INDEX_KEY),
    figma.clientStorage.deleteAsync(INPUT_BLUEPRINT_KEY)
  ]);
};

const readExtractionLogs = async (): Promise<ExtractionLogEntry[]> => {
  const logs = await figma.clientStorage.getAsync(EXTRACTION_LOGS_KEY);
  return Array.isArray(logs) ? (logs as ExtractionLogEntry[]) : [];
};

const writeExtractionLogs = async (logs: ExtractionLogEntry[]) => {
  const trimmed = logs.slice(0, 40);
  await safeSetClientStorage(EXTRACTION_LOGS_KEY, trimmed, async () => {
    await figma.clientStorage.setAsync(EXTRACTION_LOGS_KEY, trimmed.slice(0, 10));
  });
};

const buildComparableExtraction = (payload: ReturnType<typeof extractSelectionPayload>) => ({
  selectionCount: payload.selectionCount,
  nodes: toPlainValue(payload.nodes)
});

const persistExtractionPayload = async (payload: ReturnType<typeof extractSelectionPayload>) => {
  const identity = getExtractionIdentity();
  await purgeLegacyExtractionSnapshots();
  const index = await readExtractionIndex();
  const componentEntry = index.components[identity.key] ?? {
    name: identity.name,
    updatedAt: new Date().toISOString(),
    parts: {}
  };
  const comparable = buildComparableExtraction(payload);
  const existingPart = componentEntry.parts[identity.partKey];
  const nextSerialized = JSON.stringify(comparable);
  const nextHash = hashKey(nextSerialized);
  const previousHash = existingPart?.hash;

  const action: ExtractionAction =
    Object.keys(componentEntry.parts).length === 0
      ? "created"
      : !existingPart
        ? "merged"
        : previousHash === nextHash
          ? "unchanged"
          : "updated";

  componentEntry.updatedAt = new Date().toISOString();
  componentEntry.parts[identity.partKey] = {
    name: identity.partName,
    extractedAt: payload.extractedAt,
    selectionCount: comparable.selectionCount,
    hash: nextHash
  };
  index.components[identity.key] = componentEntry;
  await writeExtractionIndex(index);

  const logs = await readExtractionLogs();
  const timestamp = new Date().toISOString();
  const summary =
    action === "created"
      ? "새 컴포넌트 추출을 저장했습니다."
      : action === "merged"
        ? "부분 추출을 기존 컴포넌트에 병합했습니다."
        : action === "updated"
          ? "같은 부분 추출을 최신 값으로 덮어썼습니다."
          : "변경점이 없어 그대로 유지했습니다.";

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

  return {
    ...identity,
    action,
    summary,
    logs,
    partsCount: Object.keys(componentEntry.parts).length,
    snapshot: {
      key: identity.key,
      name: identity.name,
      updatedAt: new Date().toISOString(),
      parts: {
        [identity.partKey]: {
          name: identity.partName,
          extractedAt: payload.extractedAt,
          selectionCount: comparable.selectionCount,
          nodes: comparable.nodes
        }
      }
    }
  };
};

const sendExtractionState = async () => {
  const logs = await readExtractionLogs();
  const index = await readExtractionIndex();
  const components = summarizeExtractionComponents(index);
  figma.ui.postMessage({
    type: "extractionState",
    logs,
    components
  });
};

const findTextNodes = (node: SceneNode): TextNode[] => {
  if (node.type === "TEXT") return [node];
  if (!("children" in node)) return [];
  return node.children.flatMap((child) => findTextNodes(child));
};

const extractReplacementText = (promptText: string): string | undefined => {
  const quoted = promptText.match(/["“](.+?)["”]/);
  if (quoted?.[1]) return quoted[1].trim();

  const labeled = extractValue(promptText, ["text", "label", "텍스트", "문구"]);
  if (labeled) return labeled;

  const changed = promptText.match(/텍스트는\\s*([^\\n]+?)\\s*으로\\s*변경/i);
  if (changed?.[1]) return changed[1].trim().replace(/^["']|["']$/g, "");

  return undefined;
};

const applySelectionPrompt = async (promptText: string): Promise<boolean> => {
  const selection = figma.currentPage.selection;
  if (!promptText.trim() || selection.length === 0) return false;

  const wantsWide = hasWord(promptText, ["fullwidth", "full width", "fill", "fill container", "채우기", "가득 채우기", "좌우 폭", "폭 늘", "같은 폭", "폭 맞"]);
  const wantsCentered = hasWord(promptText, ["가운데정렬", "가운데 정렬", "center"]);
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
          } catch {}
        }
        changed = true;
      } else if (parent && "width" in parent && "resize" in node) {
        try {
          node.resize(Math.max(node.width, parent.width), node.height);
          if ("x" in node) {
            node.x = Math.max(0, Math.round((parent.width - node.width) / 2));
          }
          changed = true;
        } catch {}
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
          await figma.loadFontAsync(textNode.fontName as FontName);
        } catch {
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

const buildPromptFromText = (screenInput: string, theme: string, promptText: string): DesignPrompt => {
  const screen = normalizeScreen(screenInput, promptText);
  const title =
    extractValue(promptText, ["title", "제목", "타이틀"]) ??
    (screen === "login"
      ? "로그인"
      : screen === "settings"
        ? "설정"
        : screen === "list"
          ? "목록"
          : "대시보드");

  const primaryLabel =
    extractValue(promptText, ["primary button", "primary", "주요 버튼", "메인 버튼", "로그인 버튼", "버튼"]) ??
    (screen === "login"
      ? "로그인"
      : screen === "settings"
        ? "저장"
        : screen === "list"
          ? "새 항목"
          : "생성");

  const secondaryLabel = extractValue(promptText, ["secondary button", "secondary", "보조 버튼", "취소 버튼"]);
  const textButtonLabel = extractValue(promptText, ["text button", "텍스트 버튼", "텍스트버튼"]);
  const iconButtonLabel = extractValue(promptText, ["icon button", "아이콘 버튼", "아이콘버튼"]);
  const wantsFullWidth = hasWord(promptText, ["fullwidth", "full width", "전체폭", "가득", "좌우 맞춰", "같은 폭", "폭 맞춰", "폭 좌우"]);
  const wantsLoading = hasWord(promptText, ["loading", "로딩"]);
  const wantsDisabled = hasWord(promptText, ["disabled", "비활성"]);
  const wantsCentered = hasWord(promptText, ["가운데정렬", "가운데 정렬", "center"]);
  const wantsIdInput = hasWord(promptText, ["아이디입력", "아이디 입력", "아이디인풋", "이메일", "아이디"]);
  const wantsPasswordInput = hasWord(promptText, ["비밀번호인풋", "비밀번호 입력", "비밀번호", "password"]);
  const passwordMask = hasWord(promptText, ["*", "마스킹", "별표"]);

  const sections: DesignPrompt["sections"] =
    screen === "login"
      ? ["header", "form", "action"]
      : screen === "settings"
        ? ["header", "form", "action"]
        : ["header", "content", "action"];

  const components: DesignPrompt["components"] = [
    { type: "text", intent: "title", label: title }
  ];

  if (screen === "login") {
    if (wantsIdInput || wantsPasswordInput || promptText.trim()) {
      components.push({
        type: "input",
        intent: "email-input",
        label: wantsIdInput && !hasWord(promptText, ["이메일"]) ? "아이디" : "이메일",
        size: "md",
        fullWidth: true
      });
      components.push({
        type: "input",
        intent: "password-input",
        label: passwordMask ? "비밀번호 ••••" : "비밀번호",
        size: "md",
        fullWidth: true
      });
    }
  } else if (screen === "settings") {
    components.push(
      { type: "input", intent: "text-input", label: "워크스페이스 이름", size: "md", fullWidth: true }
    );
  } else if (screen === "dashboard") {
    components.push(
      { type: "text", section: "content", intent: "subtitle", label: "버튼 중심 페이지 초안" }
    );
  } else {
    components.push(
      { type: "text", section: "content", intent: "subtitle", label: "버튼 배치 테스트" }
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
    purpose: wantsCentered ? "centered button-first page" : undefined,
    components
  };
};

const sendSelectionInfo = () => {
  const selection = figma.currentPage.selection;
  const payload =
    selection.length === 0
      ? { type: "selectionInfo", selected: false, summary: "선택된 레이어 없음" }
      : selection.length === 1
        ? {
            type: "selectionInfo",
            selected: true,
            summary: selectionContextText(),
            name: selection[0].name,
            nodeType: selection[0].type
          }
        : {
            type: "selectionInfo",
            selected: true,
            summary: selectionContextText()
          };

  figma.ui.postMessage(payload);
};

const uiHtml = `
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
        <button id="tabGenerate" class="tab active">생성</button>
        <button id="tabRaw" class="tab">Families</button>
        <button id="tabExtract" class="tab">추출</button>
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
          <textarea id="promptText" placeholder="예: 로그인 페이지\ntitle: 로그인\nprimary button: 로그인\ntext button: 회원가입\nfullWidth"></textarea>
          <div class="hint">title, primary button, secondary button, text button, icon button, fullWidth, loading, disabled 형식을 우선 읽습니다.</div>
        </div>
        <div class="panel">
          <div class="selection-title">Selection</div>
          <div id="selectionSummary" class="selection-summary">선택된 레이어 없음</div>
          <div id="selectionPromptWrap" class="hidden row">
            <label>Selection Prompt</label>
            <textarea id="selectionPromptText" placeholder="예: 이 영역의 버튼을 full width로 바꾸고 가운데 정렬"></textarea>
            <div class="hint">선택한 레이어를 기준으로 원하는 변경 방향을 적습니다.</div>
          </div>
        </div>
        <div class="actions">
          <button id="generate" class="primary">Generate in Figma</button>
        </div>
      </div>

      <div id="viewRaw" class="view">
        <div class="panel">
          <div class="selection-title">Inspection Family</div>
          <div class="row">
            <label>Family</label>
            <select id="inspectionFamily">
              <option value="core-families">core-families</option>
              <option value="button-inspection">button-inspection</option>
              <option value="input-inspection">input-inspection</option>
              <option value="tabs-inspection">tabs-inspection</option>
              <option value="list-cell-inspection">list-cell-inspection</option>
              <option value="overlay-inspection">overlay-inspection</option>
              <option value="navigation-inspection">navigation-inspection</option>
              <option value="form-inspection">form-inspection</option>
            </select>
          </div>
          <div class="hint">확인할 family inspection payload를 고른 뒤 현재 Figma 페이지에 바로 렌더합니다.</div>
          <div class="actions">
            <button id="renderInspectionFamily">Render Selected Family</button>
          </div>
        </div>
      </div>

      <div id="viewExtract" class="view">
        <div class="panel">
          <div class="selection-title">Current Selection</div>
          <div id="extractSelectionSummary" class="selection-summary">선택된 레이어 없음</div>
          <div class="hint">버튼, 인풋, 폼 묶음처럼 의미 있는 컴포넌트/영역을 선택한 뒤 추출합니다.</div>
        </div>
        <div class="actions">
          <button id="extract" class="primary">Extract Selection</button>
          <button id="refreshExtract">로그 새로고침</button>
        </div>
        <div id="extractBusy" class="busy hidden-inline">
          <span class="spinner"></span>
          <span>추출 중...</span>
        </div>
        <div class="panel">
          <div class="selection-title">Extraction Log</div>
          <div id="extractLogs" class="logs">
            <div class="hint">아직 추출 로그가 없습니다.</div>
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
      const inspectionFamily = document.getElementById("inspectionFamily");
      const renderInspectionFamilyBtn = document.getElementById("renderInspectionFamily");
      const extractLogs = document.getElementById("extractLogs");
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
          extractLogs.innerHTML = '<div class="hint">아직 추출 로그가 없습니다.</div>';
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
              <div class="hint">\${time} · nodes \${log.nodeCount}</div>
            </div>
          \`;
        }).join('');
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
      renderInspectionFamilyBtn.onclick = () => {
        parent.postMessage(
          {
            pluginMessage: {
              type: "renderInspectionFamily",
              family: inspectionFamily.value
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
      window.onmessage = (event) => {
        const msg = event.data.pluginMessage;
        if (!msg) return;
        if (msg.type === "selectionInfo") {
          selectionSummary.textContent = msg.summary || "선택된 레이어 없음";
          extractSelectionSummary.textContent = msg.summary || "선택된 레이어 없음";
          selectionPromptWrap.className = msg.selected ? "" : "hidden";
          return;
        }
        if (msg.type === "selectionExtracted") {
          setExtractBusy(false);
          if (msg.logs) renderLogs(msg.logs);
          return;
        }
        if (msg.type === "extractionLoaded") {
          setExtractBusy(false);
          return;
        }
        if (msg.type === "extractionState") {
          setExtractBusy(false);
          renderLogs(msg.logs);
          return;
        }
        if (msg.type === "pluginError") {
          setExtractBusy(false);
        }
      };
      parent.postMessage({ pluginMessage: { type: "pluginReady" } }, "*");
    </script>
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

  figma.ui.onmessage = async (message: PluginUiMessage) => {
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
          await renderRawExtraction(raw.raw as { name?: string; document?: RawSerializedNode });
        }
        figma.ui.postMessage({
          type: "extractionLoaded",
          payload: JSON.stringify(raw.raw, null, 2)
        });
        return;
      }

      if (message.type === "extractSelection") {
        if (figma.currentPage.selection.length === 0) {
          figma.notify("먼저 추출할 레이어를 선택해 주세요.");
          figma.ui.postMessage({ type: "pluginError" });
          return;
        }
        const extracted = extractSelectionPayload();
        const persisted = await persistExtractionPayload(extracted);
        const extractionIndex = await readExtractionIndex();
        const blueprintState = await persistDerivedBlueprints();
        const rawComponent = extractRawComponentPayload();
        let saveResult: { saved: string[] } = { saved: [] };
        let saveWarning: string | undefined;
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
          saveWarning
            ? `${persisted.name}: 추출은 완료됐지만 파일 저장은 실패했습니다`
            : `${persisted.name}: ${persisted.summary} ${saveResult.saved.length}개 파일 저장`
        );
        if (saveWarning) {
          // eslint-disable-next-line no-console
          console.error("[miterlab][extract]", saveWarning);
        }
        return;
      }

      if (message.type === "renderInspectionFamily") {
        await renderInspectionFamily(message.family);
        return;
      }

      if (message.type === "generateFromText" && message.selectionPromptText?.trim()) {
        const selectionChanged = await applySelectionPrompt(message.selectionPromptText);
        if (selectionChanged) {
          figma.notify("선택한 레이어를 수정했습니다.");
          return;
        }
      }

      const payload =
        message.type === "generateFromText"
          ? await fetchPayloadFromPrompt(
              message.bridgeUrl,
              buildPromptFromText(
                message.screen,
                message.theme,
                [message.promptText, message.selectionPromptText, selectionContextText()].filter(Boolean).join("\n")
              )
            )
          : await fetchPayload(message.bridgeUrl, message.screen, message.theme);
      const result = await renderPayload(payload);

      figma.notify(`Generated ${result.createdFrameName} (${result.createdNodeCount} nodes)`);
    } catch (error) {
      figma.ui.postMessage({ type: "pluginError" });
      figma.notify(`Generation failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
}
