import type { FigmaWriteNode, FigmaWritePayload } from "../../../../shared/contracts/figmaWritePayload";
import { createContainerNode } from "./createContainerNode";
import { createFrameNode } from "./createFrameNode";
import { createInstanceNode } from "./createInstanceNode";
import { createTextNode, loadFont } from "./createTextNode";
import type { PluginWriteResult } from "../types";

interface InputBlueprint {
  targetComponent: "Input";
  sourceComponentName: string;
  updatedAt: string;
  metrics?: {
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

const INPUT_BLUEPRINT_KEY = "miterlab.blueprint.input.v1";

const rgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255
  };
};

const createMetaText = async (
  value: string,
  x: number,
  y: number,
  color: string,
  size: number,
  weight: "regular" | "medium" | "semibold"
) => {
  const font = await loadFont(weight);
  const text = figma.createText();
  text.fontName = font;
  text.characters = value;
  text.fontSize = size;
  text.fills = [{ type: "SOLID", color: rgb(color) }];
  text.x = x;
  text.y = y;
  text.textAutoResize = "WIDTH_AND_HEIGHT";
  return text;
};

const createInputBlueprintPanel = async (blueprint: InputBlueprint, rootWidth: number, rootHeight: number) => {
  const panel = figma.createFrame();
  panel.name = "input-blueprint-panel";
  panel.resize(Math.min(320, rootWidth - 32), 132);
  panel.x = Math.max(16, rootWidth - panel.width - 16);
  panel.y = Math.max(16, rootHeight - panel.height - 16);
  panel.cornerRadius = 12;
  panel.fills = [{ type: "SOLID", color: rgb("#121417") }];
  panel.strokes = [{ type: "SOLID", color: rgb("#2C333B") }];
  panel.strokeWeight = 1;

  const title = await createMetaText("Input Blueprint", 12, 10, "#EEF2F6", 12, "semibold");
  panel.appendChild(title);

  const source = await createMetaText(`source: ${blueprint.sourceComponentName}`, 12, 34, "#C8D0DA", 11, "regular");
  panel.appendChild(source);

  const metrics = blueprint.metrics ?? {};
  const metricLine = `w ${metrics.width ?? "-"} / h ${metrics.height ?? "-"} / r ${metrics.radius ?? "-"}`;
  panel.appendChild(await createMetaText(metricLine, 12, 54, "#98A2B3", 11, "regular"));

  const spacingLine = `p ${metrics.paddingTop ?? "-"},${metrics.paddingRight ?? "-"},${metrics.paddingBottom ?? "-"},${metrics.paddingLeft ?? "-"} / gap ${metrics.itemSpacing ?? "-"}`;
  panel.appendChild(await createMetaText(spacingLine, 12, 72, "#98A2B3", 11, "regular"));

  const propertyKeys = blueprint.properties?.keys?.slice(0, 4).join(", ") ?? "-";
  panel.appendChild(await createMetaText(`props: ${propertyKeys}`, 12, 90, "#98A2B3", 11, "regular"));

  return panel;
};

const toSceneNode = async (node: FigmaWriteNode, theme: string): Promise<SceneNode> => {
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

const positionChildInSection = (parent: FrameNode, child: SceneNode, index: number) => {
  if (!parent.name.endsWith("-section")) {
    return;
  }

  child.x = Math.max(0, child.x - parent.x);
  child.y = Math.max(0, child.y - parent.y);
};

const renderChildren = async (parent: FrameNode, children: FigmaWriteNode[], theme: string): Promise<number> => {
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

export const renderPayload = async (payload: FigmaWritePayload): Promise<PluginWriteResult> => {
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

  const frame = createFrameNode({ ...root, name: frameName }, theme);
  figma.currentPage.appendChild(frame);

  let createdNodeCount = 1;
  if (root.children && root.children.length > 0) {
    createdNodeCount += await renderChildren(frame, root.children, theme);
  }

  if (payload.document.screen === "input-inspection") {
    const blueprint = await figma.clientStorage.getAsync(INPUT_BLUEPRINT_KEY);
    if (blueprint && typeof blueprint === "object") {
      const panel = await createInputBlueprintPanel(blueprint as InputBlueprint, frame.width, frame.height);
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
