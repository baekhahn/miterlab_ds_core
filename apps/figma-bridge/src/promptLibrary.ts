import type { DesignPrompt } from "../../../packages/figma-generator/src/types/designPrompt";

const loginPrompt: DesignPrompt = {
  screen: "login",
  theme: "core",
  density: "comfortable",
  sections: ["header", "form", "action", "footer"],
  primaryAction: "Sign in",
  components: [
    { type: "text", intent: "title", label: "Welcome back" },
    { type: "input", intent: "email-input", label: "Email", size: "md" },
    { type: "input", intent: "password-input", label: "Password", size: "md" },
    { type: "button", intent: "primary-action", label: "Sign in", variant: "primary", size: "md" }
  ]
};

const settingsPrompt: DesignPrompt = {
  screen: "settings",
  theme: "core",
  density: "comfortable",
  sections: ["header", "form", "action"],
  primaryAction: "Save changes",
  components: [
    { type: "text", intent: "title", label: "Settings" },
    { type: "input", intent: "text-input", label: "Workspace name", size: "md" },
    { type: "button", intent: "primary-action", label: "Save changes", variant: "primary", size: "md" }
  ]
};

const dashboardPrompt: DesignPrompt = {
  screen: "dashboard",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "action"],
  primaryAction: "Create report",
  components: [
    { type: "text", intent: "title", label: "Dashboard" },
    { type: "button", intent: "primary-action", label: "Create report", variant: "primary", size: "md" },
    { type: "button", intent: "secondary-action", label: "View details", variant: "neutral", size: "md" }
  ]
};

const filterListPrompt: DesignPrompt = {
  screen: "list",
  theme: "core",
  density: "comfortable",
  sections: ["header", "filter", "list", "action"],
  primaryAction: "New item",
  components: [
    { type: "text", intent: "title", label: "Items" },
    { type: "filter-button", intent: "filter-action", label: "Active", selected: true, size: "md" },
    { type: "button", intent: "primary-action", label: "New item", variant: "primary", size: "md" }
  ]
};

const templates: Record<string, DesignPrompt> = {
  login: loginPrompt,
  settings: settingsPrompt,
  dashboard: dashboardPrompt,
  "filter-list": filterListPrompt,
  list: filterListPrompt
};

export const createPromptFromScreen = (screen: string, theme: string): DesignPrompt => {
  const found = templates[screen];
  const base = found ?? loginPrompt;
  return {
    ...base,
    screen: found ? base.screen : (screen as DesignPrompt["screen"]),
    theme
  };
};
