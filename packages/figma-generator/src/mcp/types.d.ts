import type { FigmaNode } from "../types/figmaNode";
export interface McpModeInfo {
    brand: string;
    theme: string;
}
export interface McpDocumentInfo {
    name: string;
    screen: string;
    theme: string;
}
export interface McpFrameInfo {
    id: string;
    name: string;
}
export interface McpComponentInfo {
    id: string;
    name: string;
    component: string;
    variant: Record<string, string | boolean>;
}
export interface McpPayload {
    document: McpDocumentInfo;
    nodes: FigmaNode[];
    frames: McpFrameInfo[];
    components: McpComponentInfo[];
    variables: Record<string, string>;
    styles: Record<string, string>;
    modes: McpModeInfo;
    metadata: {
        source: "miterlab-figma-generator";
        version: string;
        generatedAt: string;
    };
}
