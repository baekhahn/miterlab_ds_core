import fs from "node:fs";
import path from "node:path";
import type { DesignPrompt } from "../types/designPrompt";
import { validatePromptGrammar } from "../grammar/designPromptGrammar";
import { runPrompt } from "./runPrompt";

export interface RunPromptFileOptions {
  promptFilePath: string;
  outputRoot?: string;
  print?: boolean;
}

export const runPromptFile = (options: RunPromptFileOptions) => {
  const raw = fs.readFileSync(path.resolve(options.promptFilePath), "utf-8");
  const prompt = JSON.parse(raw) as DesignPrompt;

  const promptValidation = validatePromptGrammar(prompt);
  if (!promptValidation.valid) {
    throw new Error(`Invalid prompt file: ${promptValidation.errors.join(", ")}`);
  }

  return runPrompt({
    prompt,
    outputRoot: options.outputRoot,
    print: options.print
  });
};
