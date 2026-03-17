export interface NavItem {
  id: string;
  label: string;
  group: "docs" | "components";
}

export const navItems: NavItem[] = [
  { id: "introduction", label: "Introduction", group: "docs" },
  { id: "principles", label: "Principles", group: "docs" },
  { id: "tokens", label: "Tokens", group: "docs" },
  { id: "themes", label: "Themes", group: "docs" },
  { id: "components", label: "Components", group: "docs" },
  { id: "patterns", label: "Patterns", group: "docs" },
  { id: "contribution", label: "Contribution", group: "docs" },
  { id: "button", label: "Button", group: "components" },
  { id: "input", label: "Input", group: "components" },
  { id: "filter-button", label: "FilterButton", group: "components" }
];

export const defaultPageId = "introduction";
