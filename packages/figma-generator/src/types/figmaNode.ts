export type FigmaNodeType = "FRAME" | "GROUP" | "TEXT" | "COMPONENT" | "INSTANCE" | "RECTANGLE";

export interface FigmaStyleRef {
  fill?: string;
  stroke?: string;
  effect?: string;
  text?: string;
}

export interface FigmaNode {
  id: string;
  type: FigmaNodeType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children?: FigmaNode[];
  style?: FigmaStyleRef;
  variables?: Record<string, string>;
  component?: string;
  variant?: Record<string, string | boolean>;
  text?: string;
}
