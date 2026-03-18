import type { ComponentIntent, ScreenType, SectionKey } from "./designPromptGrammar";

export interface ScreenPattern {
  key: ScreenType;
  requiredSections: SectionKey[];
  optionalSections: SectionKey[];
  expectedComponents: ComponentIntent[];
  layoutFlow: SectionKey[];
}

export const screenPatterns: Partial<Record<ScreenType, ScreenPattern>> = {
  "button-inspection": {
    key: "button-inspection",
    requiredSections: ["preview" as SectionKey],
    optionalSections: [],
    expectedComponents: ["primary-action", "secondary-action"],
    layoutFlow: ["preview" as SectionKey]
  },
  "input-inspection": {
    key: "input-inspection",
    requiredSections: ["preview" as SectionKey],
    optionalSections: [],
    expectedComponents: ["text-input", "helper-text"],
    layoutFlow: ["preview" as SectionKey]
  }
};

export const resolvePattern = (screen: string): ScreenPattern => {
  return screenPatterns[(screen as ScreenType) ?? "button-inspection"] ?? screenPatterns["button-inspection"];
};
