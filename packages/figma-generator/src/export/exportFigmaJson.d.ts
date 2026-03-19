import type { FigmaNode } from "../types/figmaNode";
export interface FigmaExport {
    nodes: FigmaNode[];
    styles: Record<string, string>;
    variables: Record<string, string>;
    components: Record<string, {
        variants: Record<string, string | boolean>;
    }>;
}
export declare const exportFigmaJson: (root: FigmaNode) => FigmaExport;
