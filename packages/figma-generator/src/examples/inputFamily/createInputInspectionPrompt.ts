import type { DesignPrompt } from "../../types/designPrompt";

export const createInputInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "input-inspection",
    purpose: "input family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "form"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "Input Inspection" },
      { component: "text", section: "form", intent: "subtitle", label: "Text Values" },
      { component: "input", section: "form", label: "Placeholder", placeholder: "Type here" },
      { component: "input", section: "form", label: "Value", value: "Current value" },
      { component: "input", section: "form", label: "Default Value", defaultValue: "Seed value" },
      { component: "text", section: "form", intent: "subtitle", label: "Interaction Props" },
      { component: "input", section: "form", label: "Disabled", placeholder: "Disabled placeholder", disabled: true },
      { component: "input", section: "form", label: "Read Only", value: "Read only", readOnly: true },
      { component: "input", section: "form", label: "Clearable", value: "Clear me", clearable: true },
      { component: "input", section: "form", label: "Clear On Focus", value: "Focus clear", clearable: true, onlyShowClearWhenFocus: true },
      { component: "input", section: "form", label: "Password", value: "secret123", type: "password" },
      { component: "input", section: "form", label: "Number", value: "12", type: "number", min: 0, max: 20, step: 1 }
    ]
  };
};
