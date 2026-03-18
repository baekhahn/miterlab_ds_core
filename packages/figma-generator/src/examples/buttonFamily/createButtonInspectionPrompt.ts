import type { DesignPrompt } from "../../types/designPrompt";
import coreContracts from "../../../../ui-core/contracts/mobile-core.json";

export const createButtonInspectionPrompt = (theme = "core"): DesignPrompt => {
  const contract = coreContracts.button;
  return {
    screen: "button-inspection",
    purpose: "button family inspection",
    theme,
    density: "comfortable",
    sections: contract.inspection.sections as DesignPrompt["sections"],
    dataComplexity: "low",
    state: "filled",
    components: contract.inspection.components as DesignPrompt["components"]
  };
};
