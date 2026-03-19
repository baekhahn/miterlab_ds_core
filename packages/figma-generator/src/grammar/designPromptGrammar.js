export const resolveComponentType = (component) => {
    const resolved = component.component ?? component.type;
    if (!resolved) {
        throw new Error("component type is required");
    }
    return resolved;
};
export const normalizePrompt = (prompt) => {
    return {
        ...prompt,
        density: prompt.density ?? "comfortable",
        state: prompt.state ?? "filled",
        dataComplexity: prompt.dataComplexity ?? "low",
        components: prompt.components ?? []
    };
};
export const validatePromptGrammar = (prompt) => {
    const errors = [];
    if (!prompt.screen)
        errors.push("screen is required");
    if (!prompt.theme)
        errors.push("theme is required");
    if (!Array.isArray(prompt.components))
        errors.push("components must be an array");
    if ((prompt.components ?? []).length === 0)
        errors.push("components cannot be empty");
    for (const [idx, component] of (prompt.components ?? []).entries()) {
        if (!component.component && !component.type)
            errors.push(`components[${idx}].component or components[${idx}].type is required`);
    }
    return { valid: errors.length === 0, errors };
};
