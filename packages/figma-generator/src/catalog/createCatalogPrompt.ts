import { componentRegistry, wantedBaselineCategories, wantedBaselineToRegistry } from "../../../ui-core/src/index";
import type { DesignPrompt } from "../types/designPrompt";
import { buildCatalogEntriesForComponent } from "./buildCatalogEntries";

const baselineSectionMap = {
  Actions: "action",
  Contents: "content",
  Feedback: "action",
  Loading: "action",
  Navigations: "filter",
  Presentation: "modal",
  "Selection and input": "form"
} as const;

export const createCatalogPrompt = (theme = "core"): DesignPrompt => {
  const components: DesignPrompt["components"] = [
    { type: "text", intent: "title", label: "Core Component Catalog" },
    { type: "text", intent: "subtitle", label: "Backbone validation surface for full baseline parity." }
  ];

  for (const [category, baselineItems] of Object.entries(wantedBaselineCategories)) {
    const section = baselineSectionMap[category as keyof typeof baselineSectionMap];
    components.push({
      type: "text",
      section,
      intent: "subtitle",
      label: category
    });

    for (const baselineItem of baselineItems) {
      const registryKey = wantedBaselineToRegistry[baselineItem];
      const entry = componentRegistry[registryKey];
      if (!entry) {
        throw new Error(`Missing registry entry for baseline item: ${baselineItem} -> ${registryKey}`);
      }

      for (const sample of buildCatalogEntriesForComponent(entry, section)) {
        components.push({
          type: sample.type as DesignPrompt["components"][number]["type"],
          section,
          label: sample.label,
          size: sample.size,
          variant: sample.variant,
          tone: sample.tone,
          state: sample.state as DesignPrompt["components"][number]["state"],
          selected: sample.selected,
          intent: sample.intent as DesignPrompt["components"][number]["intent"]
        });
      }
    }
  }

  return {
    screen: "catalog",
    purpose: "core component roster validation",
    theme,
    density: "comfortable",
    sections: ["header", "content", "form", "filter", "action", "modal", "list"],
    primaryAction: "Button / Primary",
    secondaryAction: "Button / Secondary",
    dataComplexity: "medium",
    state: "filled",
    components
  };
};
