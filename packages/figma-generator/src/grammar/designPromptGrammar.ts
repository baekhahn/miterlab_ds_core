export type ScreenType =
  | "login"
  | "settings"
  | "list"
  | "dashboard"
  | "detail"
  | "filter-panel"
  | "empty-state"
  | "modal-form";

export type LayoutDensity = "comfortable" | "compact";
export type ScreenState = "empty" | "loading" | "filled" | "error";
export type DataComplexity = "low" | "medium" | "high";

export type SectionKey =
  | "header"
  | "filter"
  | "content"
  | "form"
  | "list"
  | "detail"
  | "action"
  | "footer"
  | "empty"
  | "modal";

export type ComponentIntent =
  | "title"
  | "subtitle"
  | "helper-text"
  | "email-input"
  | "password-input"
  | "text-input"
  | "primary-action"
  | "secondary-action"
  | "filter-action"
  | "status-text";

export type DesignPromptComponentType = "text" | "input" | "button" | "filter-button";

export interface GrammarComponent {
  type: DesignPromptComponentType;
  name?: string;
  label?: string;
  role?: string;
  intent?: ComponentIntent;
  section?: SectionKey;
  variant?: string;
  size?: "sm" | "md" | "lg";
  state?: "default" | "hover" | "pressed" | "disabled" | "focus" | "error";
  selected?: boolean;
}

export interface GrammarDesignPrompt {
  screen: ScreenType | string;
  purpose?: string;
  theme: string;
  density?: LayoutDensity;
  sections?: SectionKey[];
  primaryAction?: string;
  secondaryAction?: string;
  dataComplexity?: DataComplexity;
  state?: ScreenState;
  components: GrammarComponent[];
}

export const normalizePrompt = (prompt: GrammarDesignPrompt): Required<Omit<GrammarDesignPrompt, "sections" | "purpose" | "primaryAction" | "secondaryAction">> & Pick<GrammarDesignPrompt, "sections" | "purpose" | "primaryAction" | "secondaryAction"> => {
  return {
    ...prompt,
    density: prompt.density ?? "comfortable",
    state: prompt.state ?? "filled",
    dataComplexity: prompt.dataComplexity ?? "low",
    components: prompt.components ?? []
  };
};

export const validatePromptGrammar = (prompt: GrammarDesignPrompt): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!prompt.screen) errors.push("screen is required");
  if (!prompt.theme) errors.push("theme is required");
  if (!Array.isArray(prompt.components)) errors.push("components must be an array");
  if ((prompt.components ?? []).length === 0) errors.push("components cannot be empty");

  for (const [idx, component] of (prompt.components ?? []).entries()) {
    if (!component.type) errors.push(`components[${idx}].type is required`);
  }

  return { valid: errors.length === 0, errors };
};
