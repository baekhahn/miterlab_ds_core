import type { ComponentIntent, ScreenType, SectionKey } from "./designPromptGrammar";

export interface ScreenPattern {
  key: ScreenType;
  requiredSections: SectionKey[];
  optionalSections: SectionKey[];
  expectedComponents: ComponentIntent[];
  layoutFlow: SectionKey[];
}

export const screenPatterns: Record<ScreenType, ScreenPattern> = {
  "core-families": {
    key: "core-families",
    requiredSections: ["header", "content", "form"],
    optionalSections: ["action", "footer"],
    expectedComponents: ["title", "subtitle", "text-input", "primary-action"],
    layoutFlow: ["header", "content", "form", "action", "footer"]
  },
  "button-inspection": {
    key: "button-inspection",
    requiredSections: ["header", "content", "form", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle", "primary-action", "secondary-action"],
    layoutFlow: ["header", "content", "form", "action", "footer"]
  },
  "input-inspection": {
    key: "input-inspection",
    requiredSections: ["header", "content", "form", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle", "text-input", "helper-text", "secondary-action"],
    layoutFlow: ["header", "content", "form", "action", "footer"]
  },
  "tabs-inspection": {
    key: "tabs-inspection",
    requiredSections: ["header", "content"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle"],
    layoutFlow: ["header", "content", "footer"]
  },
  "list-cell-inspection": {
    key: "list-cell-inspection",
    requiredSections: ["header", "list"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle"],
    layoutFlow: ["header", "list", "footer"]
  },
  "overlay-inspection": {
    key: "overlay-inspection",
    requiredSections: ["header", "modal", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle"],
    layoutFlow: ["header", "modal", "action", "footer"]
  },
  "navigation-inspection": {
    key: "navigation-inspection",
    requiredSections: ["header", "content", "footer"],
    optionalSections: ["action"],
    expectedComponents: ["title", "subtitle"],
    layoutFlow: ["header", "content", "footer", "action"]
  },
  "form-inspection": {
    key: "form-inspection",
    requiredSections: ["header", "form"],
    optionalSections: ["action", "footer"],
    expectedComponents: ["title", "subtitle", "text-input"],
    layoutFlow: ["header", "form", "action", "footer"]
  },
  catalog: {
    key: "catalog",
    requiredSections: ["header", "content", "form", "filter", "list", "modal", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle", "text-input", "filter-action", "primary-action", "secondary-action", "status-text"],
    layoutFlow: ["header", "content", "form", "filter", "action", "modal", "list", "footer"]
  },
  playground: {
    key: "playground",
    requiredSections: ["header", "content", "form", "filter", "list", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle", "text-input", "filter-action", "primary-action", "secondary-action", "status-text"],
    layoutFlow: ["header", "content", "form", "filter", "list", "action", "footer"]
  },
  login: {
    key: "login",
    requiredSections: ["header", "form", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "subtitle", "email-input", "password-input", "primary-action", "helper-text"],
    layoutFlow: ["header", "form", "action", "footer"]
  },
  settings: {
    key: "settings",
    requiredSections: ["header", "form", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "text-input", "primary-action", "secondary-action"],
    layoutFlow: ["header", "form", "action", "footer"]
  },
  list: {
    key: "list",
    requiredSections: ["header", "filter", "list"],
    optionalSections: ["action", "footer"],
    expectedComponents: ["title", "filter-action", "primary-action"],
    layoutFlow: ["header", "filter", "action", "list", "footer"]
  },
  dashboard: {
    key: "dashboard",
    requiredSections: ["header", "filter", "content"],
    optionalSections: ["action", "footer"],
    expectedComponents: ["title", "subtitle", "filter-action", "primary-action"],
    layoutFlow: ["header", "filter", "action", "content", "footer"]
  },
  detail: {
    key: "detail",
    requiredSections: ["header", "detail", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "primary-action", "secondary-action"],
    layoutFlow: ["header", "detail", "action", "footer"]
  },
  "filter-panel": {
    key: "filter-panel",
    requiredSections: ["header", "filter", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "filter-action", "primary-action", "secondary-action"],
    layoutFlow: ["header", "filter", "action", "footer"]
  },
  "empty-state": {
    key: "empty-state",
    requiredSections: ["header", "empty", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "status-text", "primary-action"],
    layoutFlow: ["header", "empty", "action", "footer"]
  },
  "modal-form": {
    key: "modal-form",
    requiredSections: ["modal", "form", "action"],
    optionalSections: ["footer"],
    expectedComponents: ["title", "text-input", "primary-action", "secondary-action"],
    layoutFlow: ["modal", "form", "action", "footer"]
  }
};

export const resolvePattern = (screen: string): ScreenPattern => {
  return screenPatterns[(screen as ScreenType) ?? "login"] ?? screenPatterns.login;
};
