module.exports = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Core",
      items: ["core/overview", "core/contract"]
    },
    {
      type: "category",
      label: "Families",
      items: [
        "families/index",
        "families/button",
        "families/input",
        "families/tabs",
        "families/list-cell",
        "families/dialog-popup-toast",
        "families/nav-bar-tab-bar",
        "families/form"
      ]
    },
    {
      type: "category",
      label: "Schema",
      items: ["schema/index", "schema/axes-and-props", "schema/metrics-and-tokens"]
    },
    {
      type: "category",
      label: "Generation",
      items: ["generation/index", "generation/inspection-flow"]
    },
    {
      type: "category",
      label: "Inspection",
      items: ["inspection/index", "inspection/screens"]
    },
    {
      type: "category",
      label: "Runtime",
      items: ["runtime/index", "runtime/plugin-contract", "runtime/figma-write-flow"]
    },
    {
      type: "category",
      label: "Freeze Review",
      items: ["freeze-review/status", "freeze-review/p1-scope"]
    }
  ]
};
