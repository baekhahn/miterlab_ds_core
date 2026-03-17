import { foundationBreakpoint } from "./breakpoint";
import { foundationColor } from "./color";
import { foundationMotion } from "./motion";
import { foundationRadius } from "./radius";
import { foundationShadow } from "./shadow";
import { foundationSpacing } from "./spacing";
import { foundationTypography } from "./typography";

export const foundationTokens = {
  color: foundationColor,
  typography: foundationTypography,
  spacing: foundationSpacing,
  radius: foundationRadius,
  shadow: foundationShadow,
  motion: foundationMotion,
  breakpoint: foundationBreakpoint
} as const;
