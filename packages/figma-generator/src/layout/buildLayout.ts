import type { LayoutNode } from "../types/layout";
import type { FigmaNode } from "../types/figmaNode";
import { mapComponent } from "../components/mapComponent";
import type { TokenResolveContext } from "../tokens/resolveToken";

export interface BuildLayoutInput {
  root: LayoutNode;
  componentSpecs: Record<string, string>;
  tokenContext: TokenResolveContext;
}

const nextId = (() => {
  let id = 0;
  return () => `layout_${++id}`;
})();

const baseNode = (name: string, type: FigmaNode["type"], x = 0, y = 0, width = 0, height = 0): FigmaNode => ({
  id: nextId(),
  type,
  name,
  x,
  y,
  width,
  height
});

const buildNode = (
  node: LayoutNode,
  specs: Record<string, string>,
  tokenContext: TokenResolveContext,
  offsetX = 0,
  offsetY = 0
): FigmaNode => {
  const x = (node.x ?? 0) + offsetX;
  const y = (node.y ?? 0) + offsetY;

  if (node.type === "text") {
    return {
      ...baseNode(node.name, "TEXT", x, y, node.width ?? 240, node.height ?? 24),
      text: node.content,
      variables: node.colorToken ? { "text.color": node.colorToken } : undefined,
      style: node.textStyle ? { text: node.textStyle } : undefined
    };
  }

  if (node.type === "component") {
    const rawSpec = specs[node.component.toLowerCase()];
    if (!rawSpec) {
      throw new Error(`Missing component spec for: ${node.component}`);
    }

    const mapped = mapComponent({
      rawSpec,
      name: node.name,
      x,
      y,
      width: node.width,
      height: node.height,
      variant: typeof node.props?.variant === "string" ? node.props.variant : undefined,
      size: typeof node.props?.size === "string" ? node.props.size : undefined,
      state: typeof node.props?.state === "string" ? node.props.state : undefined,
      selected: typeof node.props?.selected === "boolean" ? node.props.selected : undefined,
      label: node.label,
      tokenContext
    });

    return { ...mapped, id: nextId() };
  }

  const frameType = node.type === "stack" || node.type === "frame" ? "FRAME" : "GROUP";
  const container = baseNode(node.name, frameType, x, y, node.width ?? 360, node.height ?? 100);

  if ("children" in node) {
    container.children = node.children.map((child) => buildNode(child, specs, tokenContext, x, y));
  }

  return container;
};

export const buildLayout = (input: BuildLayoutInput): FigmaNode => {
  return buildNode(input.root, input.componentSpecs, input.tokenContext);
};
