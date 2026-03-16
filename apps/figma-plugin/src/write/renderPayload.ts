import type { FigmaWriteNode, FigmaWritePayload } from "../../../../shared/contracts/figmaWritePayload";
import { createContainerNode } from "./createContainerNode";
import { createFrameNode } from "./createFrameNode";
import { createTextNode } from "./createTextNode";
import type { PluginWriteResult } from "../types";

const toSceneNode = async (node: FigmaWriteNode): Promise<SceneNode> => {
  if (node.type === "TEXT") {
    return await createTextNode(node);
  }

  if (node.type === "FRAME" || node.type === "GROUP") {
    return createFrameNode(node);
  }

  return createContainerNode(node);
};

const renderChildren = async (parent: FrameNode, children: FigmaWriteNode[]): Promise<number> => {
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

export const renderPayload = async (payload: FigmaWritePayload): Promise<PluginWriteResult> => {
  const root = payload.nodes[0];
  if (!root) {
    throw new Error("Payload has no root node");
  }

  const frame = createFrameNode({ ...root, name: `${payload.document.name} (${payload.document.theme})` });
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
