export const resolveToken = (token, context) => {
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
