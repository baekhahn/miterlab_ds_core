import type { DesignPrompt } from "../../types/designPrompt";

export const createTabsInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "tabs-inspection",
    purpose: "tabs family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "content"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "Tabs Inspection" },
      { component: "text", section: "content", intent: "subtitle", label: "Tabs Props" },
      {
        component: "tabs",
        section: "content",
        label: "Auto Line",
        children: "overview:Overview|activity:Activity|settings:Settings",
        activeKey: "activity",
        activeLineMode: "auto"
      },
      {
        component: "tabs",
        section: "content",
        label: "Full Line Stretch",
        children: "home:Home|search:Search|library:Library",
        activeKey: "home",
        activeLineMode: "full",
        stretch: true
      },
      {
        component: "tabs",
        section: "content",
        label: "Fixed Line RTL",
        children: "one:One|two:Two|three:Three",
        defaultActiveKey: "three",
        activeLineMode: "fixed",
        direction: "rtl",
        autoScroll: true
      },
      { component: "text", section: "content", intent: "subtitle", label: "Tab Props" },
      { component: "tab", section: "content", title: "Enabled Tab", children: "Enabled tab body" },
      { component: "tab", section: "content", title: "Disabled Tab", disabled: true, children: "Disabled tab body" },
      { component: "tab", section: "content", title: "Force Render", forceRender: true, children: "Rendered immediately" },
      { component: "tab", section: "content", title: "Destroy On Close", destroyOnClose: true, children: "Destroyed when hidden" }
    ]
  };
};
