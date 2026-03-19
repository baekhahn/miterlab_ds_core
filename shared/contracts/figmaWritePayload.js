export const isFigmaWritePayload = (value) => {
    if (!value || typeof value !== "object")
        return false;
    const maybe = value;
    return Boolean(maybe.document &&
        maybe.document.name &&
        maybe.document.screen &&
        maybe.document.theme &&
        Array.isArray(maybe.nodes));
};
