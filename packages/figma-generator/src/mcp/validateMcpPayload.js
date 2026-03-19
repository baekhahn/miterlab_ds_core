const hasSemanticVariableRef = (value) => {
    return value.startsWith("Semantic/") || value.startsWith("semantic.");
};
export const validateMcpPayload = (payload) => {
    const errors = [];
    const warnings = [];
    if (!payload.document?.name) {
        errors.push("Missing document.name");
    }
    if (!payload.document?.theme) {
        errors.push("Missing document.theme");
    }
    if (!payload.modes?.theme || !payload.modes?.brand) {
        errors.push("Missing modes.theme or modes.brand");
    }
    if (!Array.isArray(payload.nodes) || payload.nodes.length === 0) {
        errors.push("Payload must include nodes");
    }
    const frameCount = payload.nodes.filter((n) => n.type === "FRAME").length;
    if (frameCount === 0) {
        errors.push("Invalid layout structure: at least one FRAME node is required");
    }
    for (const node of payload.nodes) {
        if (!node.name || node.name.trim().length === 0) {
            errors.push(`Node ${node.id} is missing name`);
        }
        if (node.type === "INSTANCE" && !node.component) {
            errors.push(`Node ${node.id} is INSTANCE but missing component mapping`);
        }
    }
    const variableRefs = Object.values(payload.variables ?? {});
    if (variableRefs.length === 0) {
        warnings.push("No variable bindings found in payload.variables");
    }
    const nonSemanticRefs = variableRefs.filter((v) => !hasSemanticVariableRef(v));
    if (nonSemanticRefs.length > 0) {
        warnings.push(`Found ${nonSemanticRefs.length} variable refs that are not semantic-prefixed`);
    }
    const componentNodes = payload.nodes.filter((n) => Boolean(n.component));
    if (componentNodes.length > 0 && payload.components.length === 0) {
        errors.push("Missing components array entries for component nodes");
    }
    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
};
