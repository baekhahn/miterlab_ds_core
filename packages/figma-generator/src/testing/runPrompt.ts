import path from "node:path";
import { fileURLToPath } from "node:url";
import { alphaTheme, coreTheme, projectATheme, pulseTheme, type ProjectTheme } from "../../../themes/src/index";
import type { DesignPrompt } from "../types/designPrompt";
import { resolveComponentType, validatePromptGrammar } from "../grammar/designPromptGrammar";
import { fromDesignPrompt } from "../layout/fromDesignPrompt";
import { buildLayout } from "../layout/buildLayout";
import { exportFigmaJson } from "../export/exportFigmaJson";
import { mapToMcpPayload } from "../mcp/mapToMcpPayload";
import { validateMcpPayload } from "../mcp/validateMcpPayload";
import { evaluateScreen } from "../evaluation/evaluateScreen";
import { loadComponentSpecs } from "../components/loadComponentSpecs";
import { loadComponentRegistry } from "../components/loadComponentRegistry";
import { writePayload } from "./writePayload";
import { printSummary, type GenerationSummary } from "./printSummary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../../");

const specDir = path.resolve(repoRoot, "packages/ui-core/specs");

const flattenSemantic = (semantic: unknown) => {
  const out: Record<string, string> = {};
  for (const [group, tokens] of Object.entries((semantic ?? {}) as Record<string, unknown>)) {
    if (!tokens || typeof tokens !== "object") continue;
    for (const [name, value] of Object.entries(tokens)) {
      if (typeof value !== "string") continue;
      out[`${group}.${name}`] = value;
    }
  }
  return out;
};

const pickTheme = (theme: string): ProjectTheme => {
  if (theme === "core") return coreTheme;
  if (theme === "projectA") return projectATheme;
  if (theme === "pulse") return pulseTheme;
  return alphaTheme;
};

const collectSectionNames = (layout: ReturnType<typeof fromDesignPrompt>): string[] => {
  return (layout.children ?? [])
    .filter((node) => node.type === "stack")
    .map((node) => node.name.replace(/-section$/, ""));
};

export interface RunPromptOptions {
  prompt: DesignPrompt;
  outputRoot?: string;
  print?: boolean;
}

export const runPrompt = (options: RunPromptOptions) => {
  const promptValidation = validatePromptGrammar(options.prompt);
  if (!promptValidation.valid) {
    throw new Error(`Invalid prompt: ${promptValidation.errors.join(", ")}`);
  }

  const theme = pickTheme(options.prompt.theme);
  const registry = loadComponentRegistry();

  for (const component of options.prompt.components) {
    const componentType = resolveComponentType(component);
    if (componentType === "text" || componentType === "input" || componentType === "button" || componentType === "filter-button") {
      continue;
    }

    const registryKey = Object.values(registry.components).find(
      (entry) => entry.specKey === componentType || entry.name.toLowerCase() === componentType
    );

    if (!registryKey) {
      throw new Error(`Component '${componentType}' is not registered in core component registry`);
    }
  }

  const layout = fromDesignPrompt(options.prompt);
  const componentSpecs = loadComponentSpecs(specDir);
  const figma = exportFigmaJson(
    buildLayout({
      root: layout,
      componentSpecs,
      tokenContext: {
        projectId: theme.id,
        semanticValues: flattenSemantic(theme.resolved.semantic)
      }
    })
  );

  const mcpPayload = mapToMcpPayload({
    figma,
    documentName: `${options.prompt.screen} screen`,
    screen: options.prompt.screen,
    theme: theme.id
  });

  const payloadValidation = validateMcpPayload(mcpPayload);
  const evaluation = evaluateScreen({
    screen: options.prompt.screen,
    layout,
    payload: mcpPayload
  });

  const outputRoot = options.outputRoot
    ? path.resolve(options.outputRoot)
    : path.resolve(repoRoot, "artifacts/figma", options.prompt.screen);

  const summaryBase = {
    screen: options.prompt.screen,
    theme: theme.id,
    sectionsCreated: collectSectionNames(layout),
    componentCount: mcpPayload.components.length,
    nodeCount: mcpPayload.nodes.length,
    warnings: [
      ...payloadValidation.warnings,
      ...evaluation.warnings.map((w) => w.message)
    ],
    evaluationScore: evaluation.score,
    passed: payloadValidation.valid && evaluation.passed
  };

  const writeResult = writePayload({
    outputDir: outputRoot,
    layout,
    figma,
    mcpPayload,
    summary: {
      ...summaryBase,
      payloadValidation,
      evaluation
    }
  });

  const summary: GenerationSummary = {
    ...summaryBase,
    writtenFiles: writeResult
  };

  if (options.print !== false) {
    printSummary(summary);
  }

  return {
    summary,
    paths: writeResult,
    prompt: options.prompt,
    layout,
    figma,
    mcpPayload,
    payloadValidation,
    evaluation
  };
};
