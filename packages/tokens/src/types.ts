export type TokenValue = string | number;
export type TokenMap = Record<string, TokenValue>;

export interface FoundationTokens {
  color: TokenMap;
  typography: {
    fontFamily: TokenMap;
    fontSize: TokenMap;
    fontWeight: TokenMap;
    lineHeight: TokenMap;
  };
  spacing: TokenMap;
  radius: TokenMap;
  shadow: TokenMap;
  motion: {
    duration: TokenMap;
    easing: TokenMap;
  };
  breakpoint: TokenMap;
}

export interface SemanticTokens {
  background: TokenMap;
  surface: TokenMap;
  border: TokenMap;
  text: TokenMap;
  icon: TokenMap;
  action: TokenMap;
  focus: TokenMap;
  status: TokenMap;
}

export interface BrandTokens {
  projectId: string;
  brand: {
    primary: string;
    primaryHover: string;
    primaryPressed: string;
    secondary: string;
    accent: string;
    primarySubtle?: string;
    primaryBorder?: string;
  };
  campaign?: Record<string, string>;
}
