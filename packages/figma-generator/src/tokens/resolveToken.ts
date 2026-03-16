export interface TokenResolveContext {
  projectId: string;
  semanticValues: Record<string, string>;
}

export interface ResolvedTokenBinding {
  token: string;
  variable: string;
  mode: {
    brand: string;
    theme: string;
  };
  value?: string;
}

export const resolveToken = (token: string, context: TokenResolveContext): ResolvedTokenBinding => {
  const normalized = token.startsWith("semantic.") ? token : `semantic.${token}`;
  const key = normalized.replace("semantic.", "");

  return {
    token: normalized,
    variable: `Semantic/${key.replace(/\./g, "/")}`,
    mode: {
      brand: context.projectId,
      theme: context.projectId
    },
    value: context.semanticValues[key]
  };
};
