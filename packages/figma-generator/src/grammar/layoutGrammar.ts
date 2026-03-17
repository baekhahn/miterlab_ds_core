import type { SectionKey } from "./designPromptGrammar";

export type LayoutGrammarNodeType =
  | "frame"
  | "stack"
  | "row"
  | "column"
  | "section"
  | "card"
  | "form-group"
  | "action-area"
  | "list-block"
  | "filter-area"
  | "detail-block";

export interface LayoutGrammarNode {
  type: LayoutGrammarNodeType;
  name: string;
  section?: SectionKey;
  children?: LayoutGrammarNode[];
}

export interface LayoutGrammarBlueprint {
  root: LayoutGrammarNode;
}

export const createBaseBlueprint = (sections: SectionKey[]): LayoutGrammarBlueprint => {
  return {
    root: {
      type: "frame",
      name: "Screen",
      children: sections.map((section) => ({
        type: "section",
        name: `${section}-section`,
        section,
        children: []
      }))
    }
  };
};
