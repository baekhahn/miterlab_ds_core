import type { FigmaWriteNode, FigmaWritePayload } from "../../../../shared/contracts/figmaWritePayload";
import { createInspectionPreviewModel } from "../../../../packages/ui-core/contracts/inspectionPreviewLayout.mjs";
import { createContainerNode } from "./createContainerNode";
import { createFrameNode } from "./createFrameNode";
import { createInstanceNode } from "./createInstanceNode";
import { createTextNode } from "./createTextNode";
import { loadFont } from "./createTextNode";
import type { PluginWriteResult } from "../types";

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

const rgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255
  };
};

const createAxisPill = async (label: string, x: number, y: number) => {
  const pill = figma.createFrame();
  pill.layoutMode = "NONE";
  pill.resize(72, 24);
  pill.x = x;
  pill.y = y;
  pill.cornerRadius = 12;
  pill.fills = [{ type: "SOLID", color: rgb("#E8EEF8") }];
  pill.strokes = [];

  const text = figma.createText();
  text.fontName = await loadFont("semibold");
  text.characters = label;
  text.fontSize = 11;
  text.fills = [{ type: "SOLID", color: rgb("#4A5872") }];
  text.textAlignHorizontal = "CENTER";
  text.textAutoResize = "WIDTH_AND_HEIGHT";
  text.x = Math.round((72 - text.width) / 2);
  text.y = 6;

  pill.appendChild(text);
  return pill;
};

const createInspectionPreviewFrame = async (payload: FigmaWritePayload, frameName: string): Promise<{ frame: FrameNode; createdNodeCount: number }> => {
  const preview = createInspectionPreviewModel(payload.document.screen);
  const frame = figma.createFrame();
  frame.name = frameName;
  frame.layoutMode = "NONE";
  frame.resize(preview.width, preview.height);
  frame.cornerRadius = 24;
  frame.fills = [{ type: "SOLID", color: rgb("#F8FAFC") }];
  frame.strokes = [];
  frame.clipsContent = false;

  const theme = payload.document.theme || "core";
  let createdNodeCount = 1;

  for (const row of preview.rows) {
    const pill = await createAxisPill(row.axisTitle, row.pill.x, row.pill.y);
    frame.appendChild(pill);
    createdNodeCount += 2;

    for (const item of row.items) {
      const next = await createInstanceNode(
        {
          id: `${payload.document.screen}-${item.label}`,
          type: "INSTANCE",
          name: item.label,
          x: item.x,
          y: item.y,
          width: item.width,
          height: item.height,
          component: item.component.component === "button" ? "Button" : "Input",
          variant: { ...item.component },
          text: item.component.label
        },
        theme
      );
      next.x = item.x;
      next.y = item.y;
      frame.appendChild(next);
      createdNodeCount += 1;
    }
  }

  return { frame, createdNodeCount };
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

  if (payload.document.screen === "button-inspection" || payload.document.screen === "input-inspection") {
    const { frame, createdNodeCount } = await createInspectionPreviewFrame(payload, frameName);
    figma.currentPage.appendChild(frame);
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    return {
      createdNodeCount,
      createdFrameName: frame.name
    };
  }

  const frame = createFrameNode({ ...root, name: frameName }, theme);
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
