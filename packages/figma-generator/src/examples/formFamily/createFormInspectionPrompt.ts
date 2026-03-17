import type { DesignPrompt } from "../../types/designPrompt";

export const createFormInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "form-inspection",
    purpose: "form family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "form"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "Form Inspection" },
      {
        component: "form",
        section: "form",
        label: "Email",
        help: "We will never share your email.",
        description: "Primary account email",
        footer: "Submit",
        mode: "default",
        layout: "vertical",
        required: true,
        childElementPosition: "normal"
      },
      {
        component: "form",
        section: "form",
        label: "Phone",
        help: "Optional",
        extra: "Verified",
        mode: "card",
        layout: "horizontal",
        clickable: true,
        arrowIcon: true,
        childElementPosition: "right"
      }
    ]
  };
};
