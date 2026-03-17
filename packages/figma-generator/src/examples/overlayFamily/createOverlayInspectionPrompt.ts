import type { DesignPrompt } from "../../types/designPrompt";

export const createOverlayInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "overlay-inspection",
    purpose: "overlay family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "modal", "action"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "Overlay Inspection" },
      { component: "text", section: "modal", intent: "subtitle", label: "Dialog / Popup / Toast" },
      {
        component: "dialog",
        section: "modal",
        title: "Delete file",
        content: "This action cannot be undone.",
        actions: "Cancel|Delete",
        visible: true,
        closeOnMaskClick: true
      },
      {
        component: "popup",
        section: "modal",
        label: "Bottom Popup",
        position: "bottom",
        visible: true,
        showCloseButton: true,
        children: "Popup content"
      },
      {
        component: "toast",
        section: "action",
        label: "Saved toast",
        content: "Saved successfully",
        icon: "success",
        position: "bottom",
        duration: 2000
      }
    ]
  };
};
