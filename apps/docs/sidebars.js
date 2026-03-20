module.exports = {
  docs: [
    {
      type: "category",
      label: "Core",
      items: [
        {
          type: "doc",
          id: "core/overview",
          label: "Overview"
        },
        "core/foundation"
      ]
    },
    {
      type: "category",
      label: "Contracts",
      items: [
        {
          type: "category",
          label: "Component Contracts",
          collapsed: false,
          items: [
            { type: "doc", id: "contracts/component-contracts/button", label: "Button" },
            { type: "doc", id: "contracts/component-contracts/input", label: "Input" },
            { type: "doc", id: "contracts/component-contracts/checkbox", label: "Checkbox" },
            { type: "doc", id: "contracts/component-contracts/text", label: "Text" },
            { type: "doc", id: "contracts/component-contracts/icon", label: "Icon" }
          ]
        },
        {
          type: "category",
          label: "Module Contracts",
          collapsed: false,
          items: [
            { type: "doc", id: "contracts/module-contracts/form-field", label: "FormField" },
            { type: "doc", id: "contracts/module-contracts/search-bar", label: "SearchBar" },
            { type: "doc", id: "contracts/module-contracts/list-row", label: "ListRow" },
            { type: "doc", id: "contracts/module-contracts/bottom-action-group", label: "BottomActionGroup" },
            { type: "doc", id: "contracts/module-contracts/filter-chip-group", label: "FilterChipGroup" },
            { type: "doc", id: "contracts/module-contracts/empty-state-block", label: "EmptyStateBlock" }
          ]
        },
        {
          type: "category",
          label: "Pattern Contracts",
          collapsed: false,
          items: [
            { type: "doc", id: "contracts/pattern-contracts/login-form", label: "Login Form" },
            { type: "doc", id: "contracts/pattern-contracts/search-result-screen", label: "Search Result Screen" },
            { type: "doc", id: "contracts/pattern-contracts/settings-screen", label: "Settings Screen" },
            { type: "doc", id: "contracts/pattern-contracts/product-detail-with-sticky-cta", label: "Product Detail with Sticky CTA" }
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Schema",
      items: ["schema/overview"]
    },
    {
      type: "category",
      label: "Freeze",
      items: ["freeze/overview"]
    }
  ]
};
