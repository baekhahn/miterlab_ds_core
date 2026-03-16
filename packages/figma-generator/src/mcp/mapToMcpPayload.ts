import type { FigmaExport } from "../export/exportFigmaJson";
import type { McpPayload } from "./types";

export interface MapToMcpPayloadInput {
  figma: FigmaExport;
  documentName: string;
  screen: string;
  theme: string;
  mode?: {
    brand?: string;
    theme?: string;
  };
}

export const mapToMcpPayload = (input: MapToMcpPayloadInput): McpPayload => {
  const frames = input.figma.nodes
    .filter((node) => node.type === "FRAME")
    .map((node) => ({ id: node.id, name: node.name }));

  const components = input.figma.nodes
    .filter((node) => Boolean(node.component))
    .map((node) => ({
      id: node.id,
      name: node.name,
      component: node.component ?? "",
      variant: node.variant ?? {}
    }));

  return {
    document: {
      name: input.documentName,
      screen: input.screen,
      theme: input.theme
    },
    nodes: input.figma.nodes,
    frames,
    components,
    variables: input.figma.variables,
    styles: input.figma.styles,
    modes: {
      brand: input.mode?.brand ?? input.theme,
      theme: input.mode?.theme ?? input.theme
    },
    metadata: {
      source: "miterlab-figma-generator",
      version: "0.1.0",
      generatedAt: new Date().toISOString()
    }
  };
};
