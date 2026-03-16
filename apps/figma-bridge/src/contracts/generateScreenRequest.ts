import type { DesignPrompt } from "../../../../packages/figma-generator/src/types/designPrompt";

export interface GenerateScreenRequest {
  screen: string;
  theme?: string;
  project?: string;
  outputMode?: "payload" | "full";
}

export interface GenerateFromPromptRequest {
  prompt: DesignPrompt;
  outputMode?: "payload" | "full";
}
