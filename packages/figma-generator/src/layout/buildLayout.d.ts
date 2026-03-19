import type { LayoutNode } from "../types/layout";
import type { FigmaNode } from "../types/figmaNode";
import type { TokenResolveContext } from "../tokens/resolveToken";
export interface BuildLayoutInput {
    root: LayoutNode;
    componentSpecs: Record<string, string>;
    tokenContext: TokenResolveContext;
}
export declare const buildLayout: (input: BuildLayoutInput) => FigmaNode;
