import type { ComponentIntent, SectionKey } from "./designPromptGrammar";

interface PlacementRule {
  section: SectionKey;
  order: number;
}

export const componentPlacementRules: Record<ComponentIntent, PlacementRule> = {
  title: { section: "header", order: 10 },
  subtitle: { section: "header", order: 20 },
  "helper-text": { section: "footer", order: 10 },
  "email-input": { section: "form", order: 10 },
  "password-input": { section: "form", order: 20 },
  "text-input": { section: "form", order: 30 },
  "primary-action": { section: "action", order: 10 },
  "secondary-action": { section: "action", order: 20 },
  "filter-action": { section: "filter", order: 10 },
  "status-text": { section: "empty", order: 10 }
};

export const defaultPlacementByType: Record<string, PlacementRule> = {
  text: { section: "content", order: 50 },
  input: { section: "form", order: 50 },
  button: { section: "action", order: 50 },
  "filter-button": { section: "filter", order: 50 }
};
