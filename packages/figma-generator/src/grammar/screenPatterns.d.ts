import type { ComponentIntent, ScreenType, SectionKey } from "./designPromptGrammar";
export interface ScreenPattern {
    key: ScreenType;
    requiredSections: SectionKey[];
    optionalSections: SectionKey[];
    expectedComponents: ComponentIntent[];
    layoutFlow: SectionKey[];
}
export declare const screenPatterns: Partial<Record<ScreenType, ScreenPattern>>;
export declare const resolvePattern: (screen: string) => ScreenPattern;
