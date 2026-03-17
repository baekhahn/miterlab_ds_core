import type { ComponentRegistryEntry } from "../../../ui-core/src/registry";
import type { DesignPromptComponent, SectionKey } from "../types/designPrompt";

const orderedSizes = ["sm", "md", "lg"] as const;
const orderedStates = ["default", "hover", "pressed", "disabled", "selected", "focus", "error"] as const;
const orderedTones = ["default", "success", "warning", "danger", "info"] as const;

const pickBaseVariant = (entry: ComponentRegistryEntry) => {
  const variants = entry.supports.variant ?? [];
  if (variants.includes("default")) return "default";
  if (variants.includes("primary")) return "primary";
  return variants[0];
};

const pickBaseTone = (entry: ComponentRegistryEntry) => {
  const tones = entry.supports.tone ?? [];
  if (tones.includes("default")) return "default";
  return tones[0];
};

const pickBaseState = (entry: ComponentRegistryEntry) => {
  const states = entry.supports.state ?? [];
  if (states.includes("default")) return "default";
  return states[0];
};

const supportsType = (entry: ComponentRegistryEntry): DesignPromptComponent["type"] => {
  if (entry.specKey) {
    return entry.specKey as DesignPromptComponent["type"];
  }
  return "text";
};

const selectedFromState = (type: string, state?: string) => {
  if (type !== "filter-button") return undefined;
  return state === "selected";
};

const toneAsVariantFamilies = new Set(["alert", "toast", "badge", "tag", "content-badge", "push-badge", "play-badge"]);

const componentHeading = (name: string, section: SectionKey): DesignPromptComponent => ({
  type: "text",
  section,
  label: name
});

const createSample = (
  entry: ComponentRegistryEntry,
  section: SectionKey,
  extras: Partial<DesignPromptComponent>,
  suffix: string
): DesignPromptComponent => {
  const type = supportsType(entry);
  return {
    type,
    section,
    label: `${entry.name} / ${suffix}`,
    size: extras.size,
    variant: extras.variant,
    tone: extras.tone,
    state: extras.state,
    selected: typeof extras.selected === "boolean" ? extras.selected : selectedFromState(type, extras.state)
  };
};

export const buildCatalogEntriesForComponent = (
  entry: ComponentRegistryEntry,
  section: SectionKey
): DesignPromptComponent[] => {
  if (entry.kind === "primitive") {
    return [componentHeading(entry.name, section)];
  }

  const components: DesignPromptComponent[] = [componentHeading(entry.name, section)];
  const sizes = orderedSizes.filter((size) => entry.supports.size?.includes(size));
  const variants = entry.supports.variant ?? [];
  const tones = orderedTones.filter((tone) => entry.supports.tone?.includes(tone));
  const states = orderedStates.filter((state) => entry.supports.state?.includes(state));

  const baseSize = sizes.includes("md") ? "md" : sizes[0];
  const baseVariant = pickBaseVariant(entry);
  const baseTone = pickBaseTone(entry);
  const baseState = pickBaseState(entry);

  for (const size of sizes) {
    components.push(
      createSample(entry, section, { size, variant: baseVariant, tone: baseTone, state: baseState }, `size ${size}`)
    );
  }

  for (const variant of variants) {
    components.push(
      createSample(entry, section, { size: baseSize, variant, tone: baseTone, state: baseState }, `variant ${variant}`)
    );
  }

  for (const tone of tones) {
    components.push(
      createSample(
        entry,
        section,
        {
          size: baseSize,
          variant: toneAsVariantFamilies.has((entry.specKey ?? "").toLowerCase()) ? "default" : baseVariant,
          tone,
          state: baseState
        },
        `tone ${tone}`
      )
    );
  }

  for (const state of states) {
    const stateVariant =
      entry.name === "Checkbox" || entry.name === "Radio"
        ? state === "selected"
          ? "checked"
          : "unchecked"
        : entry.name === "Switch"
          ? state === "selected"
            ? "on"
            : "off"
          : baseVariant;

    components.push(
      createSample(
        entry,
        section,
        {
          size: baseSize,
          variant: stateVariant,
          tone: baseTone,
          state
        },
        `state ${state}`
      )
    );
  }

  return components;
};
