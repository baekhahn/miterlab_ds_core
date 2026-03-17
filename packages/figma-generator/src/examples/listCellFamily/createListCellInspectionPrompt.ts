import type { DesignPrompt } from "../../types/designPrompt";

export const createListCellInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "list-cell-inspection",
    purpose: "list and cell family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "list"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "List / Cell Inspection" },
      { component: "text", section: "list", intent: "subtitle", label: "List Props" },
      { component: "list", section: "list", label: "Default List", header: "Settings", mode: "default", children: "General|Notifications|Privacy" },
      { component: "list", section: "list", label: "Card List", header: "Account", mode: "card", children: "Profile|Billing|Security" },
      { component: "text", section: "list", intent: "subtitle", label: "Cell Props" },
      { component: "cell", section: "list", title: "Basic Cell", description: "Default description", extra: "Extra" },
      { component: "cell", section: "list", title: "Clickable Cell", prefix: "P", extra: "More", clickable: true, arrowIcon: true },
      { component: "cell", section: "list", title: "Disabled Cell", description: "Unavailable", disabled: true, arrow: true }
    ]
  };
};
