import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load as loadYaml } from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsRoot = path.resolve(__dirname, "..", "docs");
const repoRoot = path.resolve(__dirname, "..", "..", "..");

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, "utf8"));
const readYaml = async (filePath) => loadYaml(await fs.readFile(filePath, "utf8"));

const familyConfigs = [
  {
    id: "button",
    title: "Button",
    purpose: "Core action control baseline for Ant Design Mobile Button behavior.",
    baseline: "Ant Design Mobile ButtonProps",
    specs: ["packages/ui-core/specs/button.spec.yaml"],
    parity: "artifacts/parity/button.json",
    inspection: "button-inspection",
    summary: "artifacts/figma/button-inspection/summary.json"
  },
  {
    id: "input",
    title: "Input",
    purpose: "Core text entry baseline for Ant Design Mobile Input behavior.",
    baseline: "Ant Design Mobile InputProps",
    specs: ["packages/ui-core/specs/input.spec.yaml"],
    parity: "artifacts/parity/input.json",
    inspection: "input-inspection",
    summary: "artifacts/figma/input-inspection/summary.json"
  },
  {
    id: "tabs",
    title: "Tabs",
    purpose: "Core segmented navigation baseline for Ant Design Mobile Tabs and Tab behavior.",
    baseline: "Ant Design Mobile TabsProps and TabProps",
    specs: ["packages/ui-core/specs/tabs.spec.yaml"],
    parity: "artifacts/parity/tabs.json",
    inspection: "tabs-inspection",
    summary: "artifacts/figma/tabs-inspection/summary.json"
  },
  {
    id: "list-cell",
    title: "List / Cell",
    purpose: "Core data list row baseline for Ant Design Mobile List and ListItem behavior.",
    baseline: "Ant Design Mobile ListProps and ListItemProps",
    specs: ["packages/ui-core/specs/list.spec.yaml", "packages/ui-core/specs/cell.spec.yaml"],
    parity: "artifacts/parity/list-cell.json",
    inspection: "list-cell-inspection",
    summary: "artifacts/figma/list-cell-inspection/summary.json"
  },
  {
    id: "dialog-popup-toast",
    title: "Dialog / Popup / Toast",
    purpose: "Core overlay baseline for Ant Design Mobile dialog, popup, and toast behavior.",
    baseline: "Ant Design Mobile DialogProps, PopupProps, ToastShowProps",
    specs: [
      "packages/ui-core/specs/dialog.spec.yaml",
      "packages/ui-core/specs/popup.spec.yaml",
      "packages/ui-core/specs/toast.spec.yaml"
    ],
    parity: "artifacts/parity/overlay.json",
    inspection: "overlay-inspection",
    summary: "artifacts/figma/overlay-inspection/summary.json"
  },
  {
    id: "nav-bar-tab-bar",
    title: "NavBar / TabBar",
    purpose: "Core navigation bar baseline for Ant Design Mobile NavBar and TabBar behavior.",
    baseline: "Ant Design Mobile NavBarProps and TabBarProps",
    specs: ["packages/ui-core/specs/nav-bar.spec.yaml", "packages/ui-core/specs/tab-bar.spec.yaml"],
    parity: "artifacts/parity/navigation.json",
    inspection: "navigation-inspection",
    summary: "artifacts/figma/navigation-inspection/summary.json"
  },
  {
    id: "form",
    title: "Form",
    purpose: "Core form container and item baseline for Ant Design Mobile Form behavior.",
    baseline: "Ant Design Mobile FormProps and FormItemProps",
    specs: ["packages/ui-core/specs/form.spec.yaml"],
    parity: "artifacts/parity/form.json",
    inspection: "form-inspection",
    summary: "artifacts/figma/form-inspection/summary.json"
  }
];

const pluginBuildStatus = "verified";
const canvasWriteStatus = "pending";

const ensureDir = (dir) => fs.mkdir(dir, { recursive: true });

const formatValue = (value) => {
  if (Array.isArray(value)) return value.join(" | ");
  if (value && typeof value === "object") return `\`${JSON.stringify(value)}\``;
  return String(value);
};

const toTable = (rows, headers) => {
  const header = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return [header, divider, body].join("\n");
};

const sectionFromSpec = (label, value) => {
  const rows = Object.entries(value ?? {}).map(([key, specValue]) => [key, formatValue(specValue)]);
  if (rows.length === 0) return `## ${label}\n\nNone.\n`;
  return `## ${label}\n\n${toTable(rows, ["Field", "Value"])}\n`;
};

const buildFamilyDoc = async (family) => {
  const parity = await readJson(path.resolve(repoRoot, family.parity));
  const summary = await readJson(path.resolve(repoRoot, family.summary));
  const specs = await Promise.all(family.specs.map(async (specPath) => ({ path: specPath, data: await readYaml(path.resolve(repoRoot, specPath)) })));

  const specSections = specs
    .map(({ path: specPath, data }) => {
      const props = data.props ?? {};
      const itemProps = data.itemProps ?? data.tabProps ?? {};
      const variants = data.variants ?? {};
      const states = data.states ?? {};
      const metrics = data.metrics ?? {};
      const tokenRefs = data.tokens?.cssVars ?? [];

      return [
        `## ${data.component}`,
        "",
        `- Spec file: \`${specPath}\``,
        `- Purpose: ${data.purpose ?? family.purpose}`,
        "",
        sectionFromSpec("Props / Axes", props).trim(),
        itemProps && Object.keys(itemProps).length > 0 ? `\n${sectionFromSpec("Nested Item Props", itemProps).trim()}` : "",
        `\n${sectionFromSpec("States", states).trim()}`,
        `\n${sectionFromSpec("Metrics", metrics).trim()}`,
        tokenRefs.length > 0 ? `\n## Token References\n\n${tokenRefs.map((token) => `- \`${token}\``).join("\n")}\n` : "\n## Token References\n\nNone.\n"
      ].join("\n");
    })
    .join("\n");

  const statusTable = toTable(
    [
      ["Spec parity", parity.afterFixMismatchCount === 0 ? "verified" : "blocked"],
      ["Generator parity", summary.passed ? "verified" : "blocked"],
      ["Plugin parity", pluginBuildStatus],
      ["Canvas write verification", canvasWriteStatus]
    ],
    ["Check", "Status"]
  );

  return `---
title: ${family.title}
---

# ${family.title}

## Purpose

${family.purpose}

## Source Baseline

- ${family.baseline}
- Inspection screen: \`${family.inspection}\`
- Parity mismatch count: \`${parity.afterFixMismatchCount}\`

## Current Status

${statusTable}

## Inspection Result

- Generation score: \`${summary.evaluationScore}\`
- Passed: \`${summary.passed}\`
- Node count: \`${summary.nodeCount}\`

${specSections}
`;
};

const buildFreezeReviewDoc = async () => {
  const rows = [];
  for (const family of familyConfigs) {
    const parity = await readJson(path.resolve(repoRoot, family.parity));
    const summary = await readJson(path.resolve(repoRoot, family.summary));
    rows.push([
      family.title,
      String(parity.afterFixMismatchCount),
      summary.passed ? `verified (${summary.evaluationScore})` : "blocked",
      pluginBuildStatus,
      canvasWriteStatus
    ]);
  }

  return `---
title: Freeze Review Status
---

# Freeze Review Status

${toTable(rows, ["Family", "Mismatch Count", "Inspection Generation", "Plugin Build", "Figma Canvas Verification"])}

## Status Terms

- \`verified\`: local parity and generation checks passed.
- \`pending\`: work path exists but live canvas verification has not been completed.
- \`blocked\`: current implementation or generation check failed.
`;
};

const buildSchemaIndex = async () => {
  const rows = [];
  for (const family of familyConfigs) {
    for (const specPath of family.specs) {
      const spec = await readYaml(path.resolve(repoRoot, specPath));
      rows.push([
        spec.component,
        Object.keys(spec.variants ?? {}).join(", ") || "-",
        Object.keys(spec.states ?? {}).join(", ") || "-",
        Object.keys(spec.metrics ?? {}).length > 0 ? "defined" : "-"
      ]);
    }
  }

  return `---
title: Schema Index
---

# Schema Index

${toTable(rows, ["Component", "Variant Axes", "State Groups", "Metrics"])}
`;
};

const buildAxesDoc = async () => {
  const rows = [];
  for (const family of familyConfigs) {
    for (const specPath of family.specs) {
      const spec = await readYaml(path.resolve(repoRoot, specPath));
      rows.push([spec.component, Object.entries(spec.variants ?? {}).map(([key, value]) => `${key}: ${formatValue(value)}`).join("<br/>") || "-"]);
    }
  }

  return `---
title: Axes And Props
---

# Axes And Props

${toTable(rows, ["Component", "Axes"])}
`;
};

const buildMetricsDoc = async () => {
  const rows = [];
  for (const family of familyConfigs) {
    for (const specPath of family.specs) {
      const spec = await readYaml(path.resolve(repoRoot, specPath));
      rows.push([
        spec.component,
        Object.entries(spec.metrics ?? {}).map(([key, value]) => `${key}: ${formatValue(value)}`).join("<br/>") || "-",
        (spec.tokens?.cssVars ?? []).map((token) => `\`${token}\``).join("<br/>") || "-"
      ]);
    }
  }

  return `---
title: Metrics And Tokens
---

# Metrics And Tokens

${toTable(rows, ["Component", "Metrics", "Token References"])}
`;
};

const writeFile = async (target, content) => {
  await ensureDir(path.dirname(target));
  await fs.writeFile(target, content, "utf8");
};

await ensureDir(docsRoot);

await writeFile(
  path.join(docsRoot, "intro.md"),
  `---
title: Core Design System Docs
slug: /
---

# Core Design System Docs

This site is the internal source of truth for the current frozen core design system state.

- Source baseline: Ant Design Mobile component APIs
- Source files: \`packages/ui-core/specs\`
- Parity files: \`artifacts/parity\`
- Inspection outputs: \`artifacts/figma/*/summary.json\`
- Plugin write path: \`apps/figma-plugin/src/write/createInstanceNode.ts\`
`
);

await writeFile(
  path.join(docsRoot, "core", "overview.md"),
  `---
title: Core Overview
---

# Core Overview

## Scope

- Frozen component schema and parity status only
- No marketing showcase
- No theme expansion
- No architecture redesign

## Source Of Truth

- Ant Design Mobile docs and component APIs
- Frozen spec files in \`packages/ui-core/specs\`
- Parity artifacts in \`artifacts/parity\`

## Current Runtime Chain

\`spec -> generator -> inspection payload -> plugin renderer -> Figma canvas\`
`
);

await writeFile(
  path.join(docsRoot, "families", "index.md"),
  `---
title: Families
---

# Families

Freeze-review-ready families are documented in this section. Each page records:

- purpose
- source baseline
- props and axes
- states
- metrics
- token references
- inspection screen
- parity status
`
);

await writeFile(path.join(docsRoot, "schema", "index.md"), await buildSchemaIndex());
await writeFile(path.join(docsRoot, "schema", "axes-and-props.md"), await buildAxesDoc());
await writeFile(path.join(docsRoot, "schema", "metrics-and-tokens.md"), await buildMetricsDoc());

await writeFile(
  path.join(docsRoot, "generation", "index.md"),
  `---
title: Generation
---

# Generation

## Current Generator Contract

- Source prompt grammar: \`packages/figma-generator/src/grammar/designPromptGrammar.ts\`
- Layout translation: \`packages/figma-generator/src/layout/fromDesignPrompt.ts\`
- Component mapping: \`packages/figma-generator/src/components/mapComponent.ts\`
- Write payload contract: \`shared/contracts/figmaWritePayload.ts\`

## Rule

- Generator reads frozen specs
- Generator writes inspection payloads
- Generator does not redesign family schema
`
);

await writeFile(
  path.join(docsRoot, "generation", "inspection-flow.md"),
  `---
title: Inspection Flow
---

# Inspection Flow

## Flow

1. Frozen spec files define the contract.
2. Inspection prompt selects the family sample set.
3. Generator produces layout, payload, and summary artifacts.
4. Plugin reads payload and renders nodes.

## Current Commands

- \`npm run generate:button-inspection\`
- \`npm run generate:input-inspection\`
- \`npm run generate:tabs-inspection\`
- \`npm run generate:list-cell-inspection\`
- \`npm run generate:overlay-inspection\`
- \`npm run generate:navigation-inspection\`
- \`npm run generate:form-inspection\`
`
);

await writeFile(
  path.join(docsRoot, "inspection", "index.md"),
  `---
title: Inspection
---

# Inspection

Inspection screens are family-specific verification screens, not product screens.

- Source prompts live under \`packages/figma-generator/src/examples/*Family\`
- Summaries live under \`artifacts/figma/*/summary.json\`
`
);

const inspectionRows = await Promise.all(
  familyConfigs.map(async (family) => {
    const summary = await readJson(path.resolve(repoRoot, family.summary));
    return [family.inspection, family.title, String(summary.evaluationScore), summary.passed ? "verified" : "blocked"];
  })
);

await writeFile(
  path.join(docsRoot, "inspection", "screens.md"),
  `---
title: Inspection Screens
---

# Inspection Screens

${toTable(inspectionRows, ["Screen", "Family", "Score", "Status"])}
`
);

await writeFile(
  path.join(docsRoot, "runtime", "index.md"),
  `---
title: Runtime
---

# Runtime

Runtime documentation in this site covers the current local generator and plugin write path only.
`
);

await writeFile(
  path.join(docsRoot, "runtime", "plugin-contract.md"),
  `---
title: Plugin Contract
---

# Plugin Contract

## Files

- \`shared/contracts/figmaWritePayload.ts\`
- \`apps/figma-plugin/src/write/createInstanceNode.ts\`

## Current Rule

- Plugin renders the payload directly.
- Family-specific rendering exists for frozen families.
- Payload is the handoff contract between generator and plugin.
`
);

await writeFile(
  path.join(docsRoot, "runtime", "figma-write-flow.md"),
  `---
title: Figma Write Flow
---

# Figma Write Flow

## Current Flow

1. Generate inspection payload locally.
2. Build the plugin locally.
3. Run the plugin in Figma.
4. Render payload into the current page.

## Current Limitations

- MCP write is not used for canvas write.
- Canvas verification remains pending until live plugin execution is confirmed in Figma.
`
);

await writeFile(path.join(docsRoot, "freeze-review", "status.md"), await buildFreezeReviewDoc());

for (const family of familyConfigs) {
  await writeFile(path.join(docsRoot, "families", `${family.id}.md`), await buildFamilyDoc(family));
}
