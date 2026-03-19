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
export declare const resolveToken: (token: string, context: TokenResolveContext) => ResolvedTokenBinding;
