import type { BrandTokens } from "@miterlab/tokens";
import { foundationTokens, semanticTokens } from "@miterlab/tokens";
export interface ResolvedSemanticTokens {
    background: Record<string, string>;
    surface: Record<string, string>;
    border: Record<string, string>;
    text: Record<string, string>;
    icon: Record<string, string>;
    action: Record<string, string>;
    focus: Record<string, string>;
    status: Record<string, string>;
}
export interface ProjectTheme {
    id: string;
    foundation: typeof foundationTokens;
    semantic: typeof semanticTokens;
    brand: BrandTokens;
    resolved: {
        semantic: ResolvedSemanticTokens;
    };
}
