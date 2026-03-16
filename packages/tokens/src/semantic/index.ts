import { semanticAction } from "./action";
import { semanticBackground } from "./background";
import { semanticBorder } from "./border";
import { semanticFocus } from "./focus";
import { semanticIcon } from "./icon";
import { semanticStatus } from "./status";
import { semanticSurface } from "./surface";
import { semanticText } from "./text";

export const semanticTokens = {
  background: semanticBackground,
  surface: semanticSurface,
  border: semanticBorder,
  text: semanticText,
  icon: semanticIcon,
  action: semanticAction,
  focus: semanticFocus,
  status: semanticStatus
} as const;
