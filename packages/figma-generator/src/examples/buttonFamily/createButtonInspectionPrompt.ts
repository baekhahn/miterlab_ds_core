import type { DesignPrompt } from "../../types/designPrompt";

export const createButtonInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "button-inspection",
    purpose: "button family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "content"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "Button Inspection" },
      { component: "text", section: "content", intent: "subtitle", label: "Sizes" },
      { component: "button", section: "content", label: "Mini", color: "primary", fill: "solid", size: "mini" },
      { component: "button", section: "content", label: "Small", color: "primary", fill: "solid", size: "small" },
      { component: "button", section: "content", label: "Middle", color: "primary", fill: "solid", size: "middle" },
      { component: "button", section: "content", label: "Large", color: "primary", fill: "solid", size: "large" },
      { component: "text", section: "content", intent: "subtitle", label: "Color and Fill" },
      { component: "button", section: "content", label: "Primary Solid", color: "primary", fill: "solid", size: "middle" },
      { component: "button", section: "content", label: "Default Outline", color: "default", fill: "outline", size: "middle" },
      { component: "button", section: "content", label: "Danger None", color: "danger", fill: "none", size: "middle" },
      { component: "text", section: "content", intent: "subtitle", label: "Shape and States" },
      { component: "button", section: "content", label: "Default", color: "primary", fill: "solid", size: "middle", shape: "default" },
      { component: "button", section: "content", label: "Rounded", color: "primary", fill: "solid", size: "middle", shape: "rounded" },
      { component: "button", section: "content", label: "Rectangular", color: "primary", fill: "solid", size: "middle", shape: "rectangular" },
      { component: "button", section: "content", label: "Loading", color: "primary", fill: "solid", size: "middle", loading: true, loadingText: "Loading" },
      { component: "button", section: "content", label: "Disabled", color: "primary", fill: "solid", size: "middle", disabled: true },
      { component: "button", section: "content", label: "Block", color: "primary", fill: "solid", size: "large", block: true }
    ]
  };
};
