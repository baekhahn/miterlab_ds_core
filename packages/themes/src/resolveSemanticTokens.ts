import { foundationTokens, semanticTokens, type BrandTokens } from "@miterlab/tokens";
import type { ResolvedSemanticTokens } from "./types";

export const resolveSemanticTokens = (brand: BrandTokens): ResolvedSemanticTokens => {
  const color = foundationTokens.color;

  return {
    background: {
      default: String(color.slate50),
      subtle: String(color.slate100),
      inverse: String(color.slate900)
    },
    surface: {
      default: String(color.white),
      raised: String(color.white),
      subtle: String(color.slate100)
    },
    border: {
      default: String(color.slate200),
      subtle: String(color.slate100),
      strong: String(color.slate400),
      inverse: String(color.slate700)
    },
    text: {
      primary: String(color.slate900),
      secondary: String(color.slate600),
      muted: String(color.slate500),
      inverse: String(color.white)
    },
    icon: {
      default: String(color.slate600),
      subtle: String(color.slate500),
      inverse: String(color.white),
      accent: brand.brand.primary
    },
    action: {
      primary: brand.brand.primary,
      primaryHover: brand.brand.primaryHover,
      primaryPressed: brand.brand.primaryPressed,
      neutral: String(color.slate100),
      neutralHover: String(color.slate200),
      neutralPressed: String(color.slate300),
      onPrimary: String(color.white),
      disabled: String(color.slate200)
    },
    focus: {
      ring: brand.brand.accent
    },
    status: {
      success: String(color.green500),
      warning: String(color.amber500),
      critical: String(color.red500),
      info: String(color.blue500)
    }
  };
};

export const semanticReference = semanticTokens;
