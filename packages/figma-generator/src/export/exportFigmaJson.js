const flattenNodes = (root) => {
    const result = [root];
    for (const child of root.children ?? []) {
        result.push(...flattenNodes(child));
    }
    return result;
};
export const exportFigmaJson = (root) => {
    const nodes = flattenNodes(root);
    const styles = {};
    const variables = {};
    const components = {};
    for (const node of nodes) {
        for (const [k, v] of Object.entries(node.style ?? {})) {
            styles[`${node.id}.${k}`] = String(v);
        }
        for (const [k, v] of Object.entries(node.variables ?? {})) {
            variables[`${node.id}.${k}`] = v;
        }
        if (node.component) {
            components[node.id] = {
                variants: node.variant ?? {}
            };
        }
    }
    return {
        nodes,
        styles,
        variables,
        components
    };
};
