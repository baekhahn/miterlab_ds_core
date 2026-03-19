import { foundationTokens, semanticTokens } from "@miterlab/tokens";
import { resolveSemanticTokens } from "./resolveSemanticTokens";
export const createProjectTheme = (brand) => {
    return {
        id: brand.projectId,
        foundation: foundationTokens,
        semantic: semanticTokens,
        brand,
        resolved: {
            semantic: resolveSemanticTokens(brand)
        }
    };
};
