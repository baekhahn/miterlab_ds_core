const inferCategory = (name) => {
    if (name.includes("design_context") || name.includes("context"))
        return "context";
    if (name.includes("screenshot"))
        return "screenshot";
    if (name.includes("metadata"))
        return "metadata";
    if (name.includes("selection"))
        return "selection";
    if (name.includes("variable"))
        return "variable";
    if (name.includes("style"))
        return "style";
    if (name.includes("component"))
        return "component";
    if (name.includes("create") || name.includes("generate") || name.includes("insert") || name.includes("add"))
        return "create";
    if (name.includes("update") || name.includes("set") || name.includes("delete") || name.includes("remove") || name.includes("apply"))
        return "update";
    return "unknown";
};
const isWritable = (name) => {
    return /create|generate|insert|add|update|set|delete|remove|apply/i.test(name);
};
export const discoverCapabilities = (tools) => {
    const capabilities = tools.map((tool) => {
        const category = inferCategory(tool.name);
        const readOnlyHint = Boolean(tool.annotations && tool.annotations.readOnlyHint === true);
        const writable = !readOnlyHint && isWritable(tool.name) && !/^get_/i.test(tool.name);
        return {
            name: tool.name,
            category,
            writable
        };
    });
    const writableToolCount = capabilities.filter((t) => t.writable).length;
    const readOnlyToolCount = capabilities.length - writableToolCount;
    const categories = {
        context: 0,
        screenshot: 0,
        metadata: 0,
        selection: 0,
        create: 0,
        update: 0,
        component: 0,
        variable: 0,
        style: 0,
        unknown: 0
    };
    for (const item of capabilities) {
        categories[item.category] += 1;
    }
    const mode = writableToolCount === 0 ? "readOnly" : writableToolCount < capabilities.length ? "partiallyWritable" : "writable";
    return {
        mode,
        writableToolCount,
        readOnlyToolCount,
        categories,
        tools: capabilities,
        rawTools: tools
    };
};
