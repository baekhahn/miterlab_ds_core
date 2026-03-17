export type FigmaWriteNodeType = "FRAME" | "GROUP" | "TEXT" | "COMPONENT" | "INSTANCE" | "RECTANGLE";

export interface FigmaWriteStyleRef {
  fill?: string;
  stroke?: string;
  effect?: string;
  text?: string;
  radius?: number;
  paddingX?: number;
  paddingY?: number;
  gap?: number;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: "regular" | "medium" | "semibold";
  minWidth?: number;
}

export interface FigmaWriteNode {
  id: string;
  type: FigmaWriteNodeType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children?: FigmaWriteNode[];
  style?: FigmaWriteStyleRef;
  variables?: Record<string, string>;
  component?: string;
  variant?: Record<string, string | boolean | number>;
  text?: string;
}

export interface FigmaWritePayload {
  document: {
    name: string;
    screen: string;
    theme: string;
  };
  nodes: FigmaWriteNode[];
  frames: Array<{
    id: string;
    name: string;
  }>;
  components: Array<{
    id: string;
    name: string;
    component: string;
    variant: Record<string, string | boolean | number>;
  }>;
  variables: Record<string, string>;
  styles: Record<string, string>;
  modes: {
    brand: string;
    theme: string;
  };
  metadata: {
    source: "miterlab-figma-generator";
    version: string;
    generatedAt: string;
  };
}

export const isFigmaWritePayload = (value: unknown): value is FigmaWritePayload => {
  if (!value || typeof value !== "object") return false;
  const maybe = value as Partial<FigmaWritePayload>;
  return Boolean(
    maybe.document &&
      maybe.document.name &&
      maybe.document.screen &&
      maybe.document.theme &&
      Array.isArray(maybe.nodes)
  );
};
