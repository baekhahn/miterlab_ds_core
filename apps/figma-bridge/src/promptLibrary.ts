import fs from "node:fs";
import path from "node:path";
import type { DesignPrompt } from "../../../packages/figma-generator/src/types/designPrompt";
import { createButtonInspectionPrompt } from "../../../packages/figma-generator/src/examples/buttonFamily/createButtonInspectionPrompt";
import { createInputInspectionPrompt } from "../../../packages/figma-generator/src/examples/inputFamily/createInputInspectionPrompt";

const promptExamplesDir = path.resolve(
  process.cwd(),
  "packages/figma-generator/src/examples/prompts"
);

const catalogPrompt: DesignPrompt = {
  screen: "catalog",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "form", "filter", "list", "modal", "action"],
  primaryAction: "Primary button",
  secondaryAction: "Secondary button",
  components: [
    { type: "text", intent: "title", label: "Core Component Catalog" },
    { type: "text", intent: "subtitle", label: "Backbone validation surface for core sizing, spacing, and alignment." },
    { type: "text", section: "content", intent: "subtitle", label: "Navigation, tags, badges, and neutral surfaces" },
    { type: "tabs", section: "content", label: "Tabs / Line / md", variant: "line", size: "md" },
    { type: "tabs", section: "content", label: "Tabs / Pills / sm", variant: "pills", size: "sm" },
    { type: "tag", section: "content", label: "Tag / Default", variant: "default", size: "md" },
    { type: "badge", section: "content", label: "Badge / Success", variant: "success", size: "sm" },
    { type: "divider", section: "content", label: "Divider", variant: "default", size: "sm" },
    { type: "card", section: "content", label: "Card / Raised", variant: "raised", size: "md" },
    { type: "container", section: "content", label: "Container / Neutral", variant: "default", size: "md" },
    { type: "text", section: "form", intent: "subtitle", label: "Fields, labels, and selection controls" },
    { type: "label", section: "form", label: "Field label", size: "md" },
    { type: "form-field", section: "form", label: "Form field", size: "md" },
    { type: "input", section: "form", intent: "text-input", label: "Input / Text", size: "md" },
    { type: "textarea", section: "form", label: "Textarea / Default", size: "md" },
    { type: "select", section: "form", label: "Select / Default", size: "md" },
    { type: "checkbox", section: "form", label: "Checkbox / Checked", variant: "checked", size: "md" },
    { type: "radio", section: "form", label: "Radio / Checked", variant: "checked", size: "md" },
    { type: "switch", section: "form", label: "Switch / On", variant: "on", size: "md" },
    { type: "text", section: "filter", intent: "subtitle", label: "Filters and compact toolbars" },
    { type: "filter-button", section: "filter", label: "Filter / Selected", selected: true, size: "sm" },
    { type: "filter-button", section: "filter", label: "Filter / Default", selected: false, size: "sm" },
    { type: "toolbar", section: "filter", label: "Toolbar / Actions", size: "md" },
    { type: "text", section: "list", intent: "subtitle", label: "Data display and empty feedback" },
    { type: "table", section: "list", label: "Table / Default", size: "md" },
    { type: "list-row", section: "list", label: "ListRow / Default", size: "md" },
    { type: "empty-state", section: "list", label: "EmptyState / Default", size: "md" },
    { type: "text", section: "modal", intent: "subtitle", label: "Overlays and focused task surfaces" },
    { type: "modal", section: "modal", label: "Modal / Medium", size: "md" },
    { type: "dialog", section: "modal", label: "Dialog / Default", size: "md" },
    { type: "text", section: "action", intent: "subtitle", label: "Primary actions and feedback messages" },
    { type: "button", section: "action", intent: "primary-action", variant: "primary", label: "Button / Primary", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "neutral", label: "Button / Secondary", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "ghost", label: "Button / Ghost", size: "sm" },
    { type: "alert", section: "action", label: "Alert / Warning", variant: "warning", size: "md" },
    { type: "toast", section: "action", label: "Toast / Info", variant: "info", size: "md" }
  ]
};

const playgroundPrompt: DesignPrompt = {
  screen: "playground",
  theme: "core",
  density: "comfortable",
  sections: ["header", "content", "form", "filter", "list", "action"],
  primaryAction: "Primary button",
  secondaryAction: "Secondary button",
  components: [
    { type: "text", intent: "title", label: "Core Playground" },
    { type: "text", intent: "subtitle", label: "Inspect component rhythm, alignment, and spacing in one surface." },
    { type: "text", section: "content", name: "Title sample", label: "Title - Product page heading" },
    { type: "text", section: "content", intent: "subtitle", name: "Subtitle sample", label: "Subtitle - Section lead copy" },
    { type: "text", section: "content", name: "Body sample", label: "Body - Default text rhythm used in forms and lists." },
    { type: "text", section: "content", name: "Caption sample", label: "Caption - Compact supporting copy for metadata." },
    { type: "input", section: "form", intent: "text-input", name: "Input text", label: "Text field", size: "md" },
    { type: "input", section: "form", intent: "password-input", name: "Input password", label: "Password field", size: "md" },
    { type: "text", section: "form", intent: "helper-text", label: "Field spacing and text inset should feel balanced." },
    { type: "filter-button", section: "filter", intent: "filter-action", name: "Chip open", label: "Open", selected: true, size: "sm" },
    { type: "filter-button", section: "filter", intent: "filter-action", name: "Chip closed", label: "Closed", selected: false, size: "sm" },
    { type: "filter-button", section: "filter", intent: "filter-action", name: "Chip review", label: "In Review", selected: false, size: "md" },
    { type: "text", section: "list", name: "List title", label: "List row - Item title" },
    { type: "text", section: "list", name: "List meta", label: "List row meta - Supporting information and spacing check" },
    { type: "button", section: "list", intent: "secondary-action", variant: "neutral", name: "Row action", label: "View item", size: "sm" },
    { type: "button", section: "action", intent: "primary-action", variant: "primary", name: "Primary button", label: "Primary button", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "neutral", name: "Secondary button", label: "Secondary button", size: "md" },
    { type: "button", section: "action", intent: "secondary-action", variant: "ghost", name: "Ghost button", label: "Ghost button", size: "sm" },
    { type: "button", section: "action", intent: "primary-action", variant: "primary", name: "Large button", label: "Large button", size: "lg" }
  ]
};

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
  catalog: catalogPrompt,
  playground: playgroundPrompt,
  login: loginPrompt,
  settings: settingsPrompt,
  dashboard: dashboardPrompt,
  "filter-list": filterListPrompt,
  list: filterListPrompt
};

export const createPromptFromScreen = (screen: string, theme: string): DesignPrompt => {
  if (screen === "catalog") {
    return {
      ...catalogPrompt,
      theme
    };
  }

  if (screen === "button-inspection") {
    return createButtonInspectionPrompt(theme);
  }

  if (screen === "input-inspection") {
    return createInputInspectionPrompt(theme);
  }

  const promptFile = path.resolve(promptExamplesDir, `${screen}.prompt.json`);
  if (fs.existsSync(promptFile)) {
    const loaded = JSON.parse(fs.readFileSync(promptFile, "utf-8")) as DesignPrompt;
    return {
      ...loaded,
      theme
    };
  }

  const found = templates[screen];
  const base = found ?? loginPrompt;
  return {
    ...base,
    screen: found ? base.screen : (screen as DesignPrompt["screen"]),
    theme
  };
};
