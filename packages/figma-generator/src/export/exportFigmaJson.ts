import type { FigmaNode } from "../types/figmaNode";

export interface FigmaExport {
  nodes: FigmaNode[];
  styles: Record<string, string>;
  variables: Record<string, string>;
  components: Record<string, { variants: Record<string, string | boolean> }>;
}

const flattenNodes = (root: FigmaNode): FigmaNode[] => {
  const result: FigmaNode[] = [root];
  for (const child of root.children ?? []) {
    result.push(...flattenNodes(child));
  }
  return result;
};

export const exportFigmaJson = (root: FigmaNode): FigmaExport => {
  const nodes = flattenNodes(root);
  const styles: Record<string, string> = {};
  const variables: Record<string, string> = {};
  const components: Record<string, { variants: Record<string, string | boolean> }> = {};

  for (const node of nodes) {
    for (const [k, v] of Object.entries(node.style ?? {})) {
      styles[`${node.id}.${k}`] = String(v);
    }

    for (const [k, v] of Object.entries(node.variables ?? {})) {
      variables[`${node.id}.${k}`] = v;
    }

    if (node.component) {
      components[node.id] = {
        variants: node.variant ?? {}
      };
    }
  }

  return {
    nodes,
    styles,
    variables,
    components
  };
};
