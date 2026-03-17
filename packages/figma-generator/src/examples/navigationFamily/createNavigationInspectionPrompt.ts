import type { DesignPrompt } from "../../types/designPrompt";

export const createNavigationInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "navigation-inspection",
    purpose: "navigation family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "content", "footer"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "Navigation Inspection" },
      {
        component: "nav-bar",
        section: "header",
        label: "NavBar",
        children: "Page title",
        backIcon: true,
        right: "Edit"
      },
      { component: "text", section: "content", intent: "subtitle", label: "TabBar Props" },
      {
        component: "tab-bar",
        section: "footer",
        label: "TabBar",
        activeKey: "home",
        safeArea: true,
        children: "home:Home|search:Search|profile:Profile",
        badge: "3"
      }
    ]
  };
};
