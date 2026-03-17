module.exports = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Core",
      items: ["core/overview", "core/master-plan", "core/contract", "core/schema-contract", "core/ant-mobile-p1-source-of-truth", "core/p1-full-family-table", "core/p1-full-family-contract"]
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
      label: "Contracts",
      items: [
        "contracts/button.contract",
        "contracts/input.contract",
        "contracts/tabs.contract",
        "contracts/list.contract",
        "contracts/cell.contract",
        "contracts/form.contract",
        "contracts/dialog.contract",
        "contracts/popup.contract",
        "contracts/toast.contract",
        "contracts/navbar.contract",
        "contracts/tabbar.contract",
        "contracts/checkbox.contract",
        "contracts/radio.contract",
        "contracts/switch.contract"
      ]
    },
    {
      type: "category",
      label: "Schema",
      items: ["schema/index", "schema/schema-contract", "schema/axes-and-props", "schema/metrics-and-tokens"]
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
      items: [
        "freeze-review/status",
        "freeze-review/status-rule",
        "freeze-review/p1-scope",
        "freeze-review/p1-parity-table",
        "freeze-review/parity-table",
        "freeze-review/parity-rule",
        "freeze-review/parity-contract",
        "freeze-review/inspection-rule",
        "freeze-review/inspection-contract",
        "freeze-review/inspection-contract-pack",
        "freeze-review/freeze-rule",
        "freeze-review/token-contract"
      ]
    }
  ]
};
