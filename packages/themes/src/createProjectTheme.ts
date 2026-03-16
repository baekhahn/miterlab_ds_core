import { foundationTokens, semanticTokens, type BrandTokens } from "@miterlab/tokens";
import { resolveSemanticTokens } from "./resolveSemanticTokens";
import type { ProjectTheme } from "./types";

export const createProjectTheme = (brand: BrandTokens): ProjectTheme => {
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
