import { foundationTokens, semanticTokens } from "@miterlab/tokens";
export const resolveSemanticTokens = (brand) => {
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
            subtle: String(color.slate100),
            sunken: String(color.slate200)
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
            inverse: String(color.white),
            danger: String(color.red700),
            success: String(color.green700),
            warning: String(color.amber700),
            info: String(color.blue700)
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
            secondary: String(color.white),
            secondaryHover: String(color.slate50),
            secondaryPressed: String(color.slate100),
            ghost: String(color.white),
            ghostHover: String(color.slate100),
            ghostPressed: String(color.slate200),
            danger: String(color.red500),
            dangerHover: String(color.red600),
            dangerPressed: String(color.red700),
            neutral: String(color.slate100),
            neutralHover: String(color.slate200),
            neutralPressed: String(color.slate300),
            onPrimary: String(color.white),
            onDanger: String(color.white),
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
