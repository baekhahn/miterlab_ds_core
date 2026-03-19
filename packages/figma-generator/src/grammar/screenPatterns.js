export const screenPatterns = {
    "button-inspection": {
        key: "button-inspection",
        requiredSections: ["preview"],
        optionalSections: [],
        expectedComponents: ["primary-action", "secondary-action"],
        layoutFlow: ["preview"]
    },
    "input-inspection": {
        key: "input-inspection",
        requiredSections: ["preview"],
        optionalSections: [],
        expectedComponents: ["text-input", "helper-text"],
        layoutFlow: ["preview"]
    }
};
export const resolvePattern = (screen) => {
    return screenPatterns[screen ?? "button-inspection"] ?? screenPatterns["button-inspection"];
};
