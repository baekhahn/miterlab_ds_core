import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fromDesignPrompt } from "../../layout/fromDesignPrompt";
import { buildMcpPayloadFromPrompt } from "../buildMcpPayloadFromPrompt";
import { evaluateScreen } from "../../evaluation/evaluateScreen";
import type { DesignPrompt } from "../../types/designPrompt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const evaluateLoginGood = () => {
  const promptPath = path.resolve(__dirname, "../prompts/login.prompt.json");
  const prompt = JSON.parse(fs.readFileSync(promptPath, "utf-8")) as DesignPrompt;

  const layout = fromDesignPrompt(prompt);
  const payload = buildMcpPayloadFromPrompt(prompt);

  return evaluateScreen({
    screen: prompt.screen,
    layout,
    payload
  });
};
