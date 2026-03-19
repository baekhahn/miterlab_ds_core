import coreContracts from "../../../../ui-core/contracts/mobile-core.json";
export const createInputInspectionPrompt = (theme = "core") => {
    const contract = coreContracts.input;
    return {
        screen: "input-inspection",
        purpose: "input family inspection",
        theme,
        density: "comfortable",
        sections: contract.inspection.sections,
        dataComplexity: "low",
        state: "filled",
        components: contract.inspection.components
    };
};
