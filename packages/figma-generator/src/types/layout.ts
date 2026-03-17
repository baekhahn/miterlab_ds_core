export type LayoutNodeType = "frame" | "stack" | "text" | "component" | "container";

interface LayoutBase {
  id?: string;
  type: LayoutNodeType;
  name: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export interface LayoutFrameNode extends LayoutBase {
  type: "frame";
  direction?: "vertical" | "horizontal";
  gap?: number;
  children: LayoutNode[];
}

export interface LayoutStackNode extends LayoutBase {
  type: "stack";
  direction: "vertical" | "horizontal";
  gap: number;
  children: LayoutNode[];
}

export interface LayoutContainerNode extends LayoutBase {
  type: "container";
  padding?: number;
  children: LayoutNode[];
}

export interface LayoutTextNode extends LayoutBase {
  type: "text";
  content: string;
  textStyle?: string;
  colorToken?: string;
}

export interface LayoutComponentNode extends LayoutBase {
  type: "component";
  component: string;
  props?: Record<string, string | boolean>;
  label?: string;
}

export type LayoutNode =
  | LayoutFrameNode
  | LayoutStackNode
  | LayoutContainerNode
  | LayoutTextNode
  | LayoutComponentNode;
