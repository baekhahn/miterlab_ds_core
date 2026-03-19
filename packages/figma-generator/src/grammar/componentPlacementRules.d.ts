import type { ComponentIntent, SectionKey } from "./designPromptGrammar";
interface PlacementRule {
    section: SectionKey;
    order: number;
}
export declare const componentPlacementRules: Record<ComponentIntent, PlacementRule>;
export declare const defaultPlacementByType: Record<string, PlacementRule>;
export {};
