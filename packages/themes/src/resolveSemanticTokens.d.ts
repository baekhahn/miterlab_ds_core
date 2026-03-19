import { type BrandTokens } from "@miterlab/tokens";
import type { ResolvedSemanticTokens } from "./types";
export declare const resolveSemanticTokens: (brand: BrandTokens) => ResolvedSemanticTokens;
export declare const semanticReference: {
    readonly background: {
        readonly default: "{foundation.color.slate50}";
        readonly subtle: "{foundation.color.slate100}";
        readonly inverse: "{foundation.color.slate900}";
    };
    readonly surface: {
        readonly default: "{foundation.color.white}";
        readonly raised: "{foundation.color.white}";
        readonly subtle: "{foundation.color.slate100}";
        readonly sunken: "{foundation.color.slate200}";
    };
    readonly border: {
        readonly default: "{foundation.color.slate200}";
        readonly subtle: "{foundation.color.slate100}";
        readonly strong: "{foundation.color.slate400}";
        readonly inverse: "{foundation.color.slate700}";
    };
    readonly text: {
        readonly primary: "{foundation.color.slate900}";
        readonly secondary: "{foundation.color.slate600}";
        readonly muted: "{foundation.color.slate500}";
        readonly inverse: "{foundation.color.white}";
        readonly danger: "{foundation.color.red700}";
        readonly success: "{foundation.color.green700}";
        readonly warning: "{foundation.color.amber700}";
        readonly info: "{foundation.color.blue700}";
    };
    readonly icon: {
        readonly default: "{semantic.text.secondary}";
        readonly subtle: "{semantic.text.muted}";
        readonly inverse: "{semantic.text.inverse}";
        readonly accent: "{brand.primary}";
    };
    readonly action: {
        readonly primary: "{brand.primary}";
        readonly primaryHover: "{brand.primaryHover}";
        readonly primaryPressed: "{brand.primaryPressed}";
        readonly secondary: "{foundation.color.white}";
        readonly secondaryHover: "{foundation.color.slate50}";
        readonly secondaryPressed: "{foundation.color.slate100}";
        readonly ghost: "{foundation.color.white}";
        readonly ghostHover: "{foundation.color.slate100}";
        readonly ghostPressed: "{foundation.color.slate200}";
        readonly danger: "{foundation.color.red500}";
        readonly dangerHover: "{foundation.color.red600}";
        readonly dangerPressed: "{foundation.color.red700}";
        readonly neutral: "{foundation.color.slate100}";
        readonly neutralHover: "{foundation.color.slate200}";
        readonly neutralPressed: "{foundation.color.slate300}";
        readonly onPrimary: "{foundation.color.white}";
        readonly onDanger: "{foundation.color.white}";
        readonly disabled: "{foundation.color.slate200}";
    };
    readonly focus: {
        readonly ring: "{brand.accent}";
    };
    readonly status: {
        readonly success: "{foundation.color.green500}";
        readonly warning: "{foundation.color.amber500}";
        readonly critical: "{foundation.color.red500}";
        readonly info: "{foundation.color.blue500}";
    };
};
