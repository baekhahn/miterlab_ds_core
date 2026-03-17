import type { DesignPrompt } from "../../../packages/figma-generator/src/types/designPrompt";
import { runPrompt } from "../../../packages/figma-generator/src/testing/runPrompt";
import type { GenerateScreenResponse } from "./contracts/generateScreenResponse";

const toResponse = (
  project: string | undefined,
  generated: ReturnType<typeof runPrompt>
): GenerateScreenResponse => {
  return {
    payload: generated.mcpPayload,
    summary: {
      screen: generated.summary.screen,
      theme: generated.summary.theme,
      sectionsCreated: generated.summary.sectionsCreated,
      componentCount: generated.summary.componentCount,
      nodeCount: generated.summary.nodeCount,
      evaluationScore: generated.summary.evaluationScore,
      passed: generated.summary.passed
    },
    evaluation: {
      score: generated.evaluation.score,
      passed: generated.evaluation.passed,
      warnings: generated.evaluation.warnings.map((item) => item.message),
      errors: generated.evaluation.errors.map((item) => item.message)
    },
    warnings: generated.summary.warnings,
    metadata: {
      project,
      source: "miterlab-figma-bridge",
      generatedAt: new Date().toISOString()
    }
  };
};

export const generateFromPrompt = (prompt: DesignPrompt, project?: string): GenerateScreenResponse => {
  const generated = runPrompt({
    prompt,
    print: false
  });

  return toResponse(project, generated);
};
