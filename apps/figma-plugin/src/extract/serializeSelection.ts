type SerializedPaint = {
  type: string;
  visible?: boolean;
  opacity?: number;
  color?: { r: number; g: number; b: number };
  boundVariableId?: string | null;
};

type SerializedStroke = SerializedPaint & {
  weight?: number;
};

type SerializedEffect = {
  type: string;
  visible?: boolean;
  radius?: number;
  offset?: { x: number; y: number };
  spread?: number;
  color?: { r: number; g: number; b: number; a?: number };
};

type SerializedText = {
  characters: string;
  fontSize: number | PluginAPI["mixed"];
  fontName: FontName | PluginAPI["mixed"];
  lineHeight: LineHeight | PluginAPI["mixed"];
  letterSpacing: LetterSpacing | PluginAPI["mixed"];
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED";
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM";
};

export type ExtractedNode = {
  id: string;
  name: string;
  type: SceneNode["type"];
  visible: boolean;
  locked: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  rotation?: number;
  opacity?: number;
  layoutMode?: FrameNode["layoutMode"] | ComponentNode["layoutMode"] | InstanceNode["layoutMode"];
  primaryAxisSizingMode?: FrameNode["primaryAxisSizingMode"] | ComponentNode["primaryAxisSizingMode"] | InstanceNode["primaryAxisSizingMode"];
  counterAxisSizingMode?: FrameNode["counterAxisSizingMode"] | ComponentNode["counterAxisSizingMode"] | InstanceNode["counterAxisSizingMode"];
  itemSpacing?: number;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  cornerRadius?: number | PluginAPI["mixed"];
  fills?: SerializedPaint[];
  strokes?: SerializedStroke[];
  effects?: SerializedEffect[];
  text?: SerializedText;
  component?: {
    key?: string;
    componentPropertyReferences?: Record<string, string>;
    properties?: Record<string, { type: string; value: string | boolean }>;
    mainComponentName?: string | null;
  };
  children?: ExtractedNode[];
};

export type ExtractedSelectionSnapshot = {
  extractedAt: string;
  fileName: string;
  pageName: string;
  selectionCount: number;
  nodes: ExtractedNode[];
};

export type SelectionSummary = {
  selectionCount: number;
  primaryName: string;
  primaryType: string;
  dimensions: string;
  pageName: string;
  fileKey: string;
  nodeIds: string[];
  nodeUrl: string | null;
};

export type SelectionReference = {
  fileKey: string;
  pageName: string;
  selectionCount: number;
  nodes: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    isFigmaComponent: boolean;
    componentRole: "instance" | "component" | "component-set" | "node";
    mainComponentName?: string | null;
    componentKey?: string;
    variantProperties?: Record<string, string | boolean>;
  }>;
};

const buildNodeUrl = (fileKey: string, nodeId: string) =>
  `https://www.figma.com/design/${fileKey}/${encodeURIComponent(figma.root.name)}?node-id=${nodeId.replace(":", "-")}`;

const isSolidPaint = (paint: Paint): paint is SolidPaint => paint.type === "SOLID";

const serializePaint = (paint: Paint): SerializedPaint => {
  const base: SerializedPaint = {
    type: paint.type,
    visible: "visible" in paint ? paint.visible : true,
    opacity: "opacity" in paint ? paint.opacity : undefined
  };

  if (isSolidPaint(paint)) {
    base.color = paint.color;
    const variable = paint.boundVariables?.color;
    base.boundVariableId = variable?.id ?? null;
  }

  return base;
};

const serializeStrokePaints = (node: GeometryMixin): SerializedStroke[] => {
  return node.strokes.map((paint) => ({
    ...serializePaint(paint),
    weight: typeof node.strokeWeight === "number" ? node.strokeWeight : undefined
  }));
};

const serializeEffects = (effects: readonly Effect[]): SerializedEffect[] =>
  effects.map((effect) => ({
    type: effect.type,
    visible: effect.visible,
    radius: "radius" in effect ? effect.radius : undefined,
    offset: "offset" in effect ? effect.offset : undefined,
    spread: "spread" in effect ? effect.spread : undefined,
    color: "color" in effect ? effect.color : undefined
  }));

const serializeText = (node: TextNode): SerializedText => ({
  characters: node.characters,
  fontSize: node.fontSize,
  fontName: node.fontName,
  lineHeight: node.lineHeight,
  letterSpacing: node.letterSpacing,
  textAlignHorizontal: node.textAlignHorizontal,
  textAlignVertical: node.textAlignVertical
});

const serializeComponentProperties = (
  node: InstanceNode | ComponentNode | ComponentSetNode
): Record<string, { type: string; value: string | boolean }> | undefined => {
  if (!("componentProperties" in node) || !node.componentProperties) {
    return undefined;
  }

  const entries = Object.entries(node.componentProperties).map(([key, value]) => [
    key,
    {
      type: value.type,
      value: "value" in value ? value.value : false
    }
  ]);

  return Object.fromEntries(entries);
};

const supportsChildren = (node: SceneNode): node is SceneNode & ChildrenMixin => "children" in node;
const supportsGeometry = (node: SceneNode): node is SceneNode & GeometryMixin => "fills" in node && "strokes" in node;
const supportsEffects = (node: SceneNode): node is SceneNode & BlendMixin => "effects" in node;
const supportsCorners = (node: SceneNode): node is SceneNode & CornerMixin => "cornerRadius" in node;
const supportsLayout = (
  node: SceneNode
): node is FrameNode | ComponentNode | InstanceNode => "layoutMode" in node;
const supportsDimension = (node: SceneNode): node is SceneNode & DimensionAndPositionMixin => "width" in node && "height" in node;

const serializeNode = (node: SceneNode): ExtractedNode => {
  const serialized: ExtractedNode = {
    id: node.id,
    name: node.name,
    type: node.type,
    visible: node.visible,
    locked: node.locked
  };

  if (supportsDimension(node)) {
    serialized.width = Math.round(node.width * 100) / 100;
    serialized.height = Math.round(node.height * 100) / 100;
    serialized.x = Math.round(node.x * 100) / 100;
    serialized.y = Math.round(node.y * 100) / 100;
    if ("rotation" in node) {
      serialized.rotation = node.rotation;
    }
  }

  if ("opacity" in node) {
    serialized.opacity = node.opacity;
  }

  if (supportsLayout(node)) {
    serialized.layoutMode = node.layoutMode;
    serialized.primaryAxisSizingMode = node.primaryAxisSizingMode;
    serialized.counterAxisSizingMode = node.counterAxisSizingMode;
    serialized.itemSpacing = node.itemSpacing;
    serialized.padding = {
      top: node.paddingTop,
      right: node.paddingRight,
      bottom: node.paddingBottom,
      left: node.paddingLeft
    };
  }

  if (supportsCorners(node)) {
    serialized.cornerRadius = node.cornerRadius;
  }

  if (supportsGeometry(node)) {
    const fills = Array.isArray(node.fills) ? node.fills : [];
    serialized.fills = fills.map(serializePaint);
    serialized.strokes = serializeStrokePaints(node);
  }

  if (supportsEffects(node)) {
    serialized.effects = serializeEffects(node.effects);
  }

  if (node.type === "TEXT") {
    serialized.text = serializeText(node);
  }

  if (node.type === "INSTANCE" || node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
    serialized.component = {
      key: "key" in node ? node.key : undefined,
      componentPropertyReferences:
        "componentPropertyReferences" in node ? node.componentPropertyReferences ?? undefined : undefined,
      properties: serializeComponentProperties(node),
      mainComponentName:
        node.type === "INSTANCE" ? node.mainComponent?.name ?? null : null
    };
  }

  if (supportsChildren(node) && node.children.length > 0) {
    serialized.children = node.children.map(serializeNode);
  }

  return serialized;
};

export const summarizeSelection = (selection: readonly SceneNode[]): SelectionSummary => {
  const fileKey = figma.fileKey ?? "";
  if (selection.length === 0) {
    return {
      selectionCount: 0,
      primaryName: "선택 없음",
      primaryType: "-",
      dimensions: "-",
      pageName: figma.currentPage.name,
      fileKey,
      nodeIds: [],
      nodeUrl: null
    };
  }

  const primary = selection[0];
  const dimensions =
    "width" in primary && "height" in primary
      ? `${Math.round(primary.width)} × ${Math.round(primary.height)}`
      : "-";

  return {
    selectionCount: selection.length,
    primaryName: primary.name,
    primaryType: primary.type,
    dimensions,
    pageName: figma.currentPage.name,
    fileKey,
    nodeIds: selection.map((node) => node.id),
    nodeUrl: fileKey ? buildNodeUrl(fileKey, primary.id) : null
  };
};

export const hasRuntimeFileKey = () => Boolean(figma.fileKey);

const getNodeComponentMeta = (node: SceneNode) => {
  if (node.type === "INSTANCE") {
    const properties = serializeComponentProperties(node);
    return {
      isFigmaComponent: true,
      componentRole: "instance" as const,
      mainComponentName: null,
      componentKey: undefined,
      variantProperties: properties
        ? Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, value.value]))
        : undefined
    };
  }

  if (node.type === "COMPONENT") {
    const properties = serializeComponentProperties(node);
    return {
      isFigmaComponent: true,
      componentRole: "component" as const,
      mainComponentName: node.name,
      componentKey: node.key,
      variantProperties: properties
        ? Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, value.value]))
        : undefined
    };
  }

  if (node.type === "COMPONENT_SET") {
    const properties = serializeComponentProperties(node);
    return {
      isFigmaComponent: true,
      componentRole: "component-set" as const,
      mainComponentName: node.name,
      componentKey: node.key,
      variantProperties: properties
        ? Object.fromEntries(Object.entries(properties).map(([key, value]) => [key, value.value]))
        : undefined
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

const parseNodeUrl = (value: string): { fileKey: string; nodeId?: string } | null => {
  const raw = value.trim();
  if (!raw) return null;

  try {
    const normalized = /^https?:\/\//.test(raw) ? raw : `https://${raw.replace(/^\/+/, "")}`;
    const url = new URL(normalized);
    const match =
      url.pathname.match(/^\/design\/([^/]+)/) ??
      url.pathname.match(/^\/proto\/([^/]+)/) ??
      url.pathname.match(/^\/board\/([^/]+)/);
    const fileKey = match?.[1];
    if (!fileKey) return null;
    const rawNodeId = url.searchParams.get("node-id") ?? undefined;
    const nodeId = rawNodeId ? rawNodeId.replace(/-/g, ":") : undefined;
    return { fileKey, nodeId };
  } catch {
    const fileKeyMatch = raw.match(/figma\.com\/(?:design|proto|board)\/([^/?#]+)/i);
    if (!fileKeyMatch?.[1]) {
      return null;
    }

    const nodeIdMatch = raw.match(/[?&]node-id=([0-9]+(?:[-:][0-9]+)?)/i);
    const nodeId = nodeIdMatch?.[1] ? nodeIdMatch[1].replace(/-/g, ":") : undefined;
    return {
      fileKey: fileKeyMatch[1],
      nodeId
    };
  }
};

export const buildSelectionSnapshot = (selection: readonly SceneNode[]): ExtractedSelectionSnapshot => ({
  extractedAt: new Date().toISOString(),
  fileName: figma.root.name,
  pageName: figma.currentPage.name,
  selectionCount: selection.length,
  nodes: selection.map(serializeNode)
});

export const buildSelectionReference = (selection: readonly SceneNode[]): SelectionReference => {
  const fileKey = figma.fileKey;
  if (!fileKey) {
    throw new Error("현재 파일의 fileKey를 확인할 수 없습니다.");
  }

  return {
    fileKey,
    pageName: figma.currentPage.name,
    selectionCount: selection.length,
    nodes: selection.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      url: buildNodeUrl(fileKey, node.id),
      ...getNodeComponentMeta(node)
    }))
  };
};

export const buildSelectionReferenceFromUrl = (
  selection: readonly SceneNode[],
  nodeUrl: string
): SelectionReference => {
  const parsed = parseNodeUrl(nodeUrl);
  if (!parsed?.fileKey) {
    throw new Error("유효한 Figma node URL이 필요합니다.");
  }

  return {
    fileKey: parsed.fileKey,
    pageName: figma.currentPage.name,
    selectionCount: selection.length,
    nodes: selection.map((node) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      url: buildNodeUrl(parsed.fileKey, node.id),
      ...getNodeComponentMeta(node)
    }))
  };
};

export const exportSelectionSvg = async (selection: readonly SceneNode[]) => {
  if (selection.length !== 1) {
    return undefined;
  }

  const [node] = selection;
  if (!("exportAsync" in node)) {
    return undefined;
  }

  const bytes = await node.exportAsync({
    format: "SVG",
    svgOutlineText: false,
    svgIdAttribute: true
  });

  return new TextDecoder().decode(bytes);
};
