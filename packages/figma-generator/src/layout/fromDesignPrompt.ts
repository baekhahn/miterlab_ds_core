import {
  normalizePrompt,
  type GrammarComponent,
  type GrammarDesignPrompt,
  type SectionKey,
  validatePromptGrammar
} from "../grammar/designPromptGrammar";
import { componentPlacementRules, defaultPlacementByType } from "../grammar/componentPlacementRules";
import { layoutRules } from "../grammar/layoutRules";
import { resolvePattern } from "../grammar/screenPatterns";
import type { LayoutFrameNode, LayoutNode } from "../types/layout";

const toTitle = (screen: string): string => {
  const clean = screen.replace(/[-_]/g, " ");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const sectionOrder = (sections: SectionKey[], patternFlow: SectionKey[]): SectionKey[] => {
  const flow = [...patternFlow, ...layoutRules.sectionOrderFallback];
  return [...sections].sort((a, b) => flow.indexOf(a) - flow.indexOf(b));
};

const resolveSectionForComponent = (component: GrammarComponent): { section: SectionKey; order: number } => {
  if (component.section) {
    return { section: component.section, order: 50 };
  }

  if (component.intent && componentPlacementRules[component.intent]) {
    return componentPlacementRules[component.intent];
  }

  return defaultPlacementByType[component.type] ?? { section: "content", order: 99 };
};

const mapComponentToLayoutNode = (index: number, component: GrammarComponent): LayoutNode => {
  if (component.type === "text") {
    return {
      type: "text",
      name: component.name ?? `Text ${index + 1}`,
      content: component.label ?? (component.role === "title" ? "Title" : "Text"),
      textStyle: component.intent === "title" || component.role === "title" ? "text/heading/lg" : "text/body/md",
      colorToken:
        component.intent === "title" || component.role === "title"
          ? "semantic.text.primary"
          : "semantic.text.secondary"
    };
  }

  if (component.type === "input") {
    return {
      type: "component",
      name: component.name ?? `Input ${index + 1}`,
      component: "input",
      props: {
        variant: "default",
        size: component.size ?? "md",
        state: component.state ?? "default"
      },
      label: component.label
    };
  }

  if (component.type === "filter-button") {
    return {
      type: "component",
      name: component.name ?? `FilterButton ${index + 1}`,
      component: "filter-button",
      props: {
        size: component.size ?? "md",
        state: component.state ?? "default",
        selected: component.selected ?? false
      },
      label: component.label
    };
  }

  return {
    type: "component",
    name: component.name ?? `Button ${index + 1}`,
    component: "button",
    props: {
      variant: component.variant ?? (component.intent === "secondary-action" ? "neutral" : "primary"),
      size: component.size ?? "md",
      state: component.state ?? "default"
    },
    label: component.label ?? "Action"
  };
};

const estimateNodeHeight = (node: LayoutNode): number => {
  if (node.type === "text") return 28;
  if (node.type === "component") return 44;
  return 40;
};

export const fromDesignPrompt = (prompt: GrammarDesignPrompt): LayoutFrameNode => {
  const validation = validatePromptGrammar(prompt);
  if (!validation.valid) {
    throw new Error(`Invalid design prompt: ${validation.errors.join(", ")}`);
  }

  const normalized = normalizePrompt(prompt);
  const pattern = resolvePattern(normalized.screen);

  const sectionSet = new Set<SectionKey>([
    ...(normalized.sections ?? []),
    ...pattern.requiredSections,
    ...pattern.optionalSections.filter((section) =>
      normalized.components.some((component) => resolveSectionForComponent(component).section === section)
    )
  ]);

  const orderedSections = sectionOrder([...sectionSet], pattern.layoutFlow);
  const sectionBuckets: Record<string, Array<{ order: number; node: LayoutNode }>> = {};

  for (const [index, component] of normalized.components.entries()) {
    const placement = resolveSectionForComponent(component);
    const node = mapComponentToLayoutNode(index, component);
    const key = placement.section;
    sectionBuckets[key] = sectionBuckets[key] ?? [];
    sectionBuckets[key].push({ order: placement.order, node });
  }

  const sectionGap = layoutRules.sectionSpacing[normalized.density];
  const componentGap = layoutRules.componentSpacing[normalized.density];

  let currentY = layoutRules.framePadding.top;
  const children: LayoutNode[] = [];

  for (const section of orderedSections) {
    const entries = (sectionBuckets[section] ?? []).sort((a, b) => a.order - b.order);
    if (entries.length === 0 && !pattern.requiredSections.includes(section)) {
      continue;
    }

    const sectionNode: LayoutNode = {
      type: "stack",
      name: `${section}-section`,
      x: layoutRules.framePadding.x,
      y: currentY,
      direction: "vertical",
      gap: section === "header" ? layoutRules.headerSpacing[normalized.density] : componentGap,
      children: entries.map((entry) => entry.node)
    };

    children.push(sectionNode);
    const sectionContentHeight = Math.max(
      44,
      entries.reduce((sum, entry) => sum + estimateNodeHeight(entry.node), 0) +
        Math.max(0, entries.length - 1) * componentGap
    );
    currentY += sectionContentHeight + sectionGap;
  }

  return {
    type: "frame",
    name: `${toTitle(normalized.screen)} Screen`,
    width: layoutRules.widths.mobile,
    height: layoutRules.heights.mobile,
    children
  };
};
