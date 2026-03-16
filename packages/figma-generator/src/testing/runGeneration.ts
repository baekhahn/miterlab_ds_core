import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPromptFile } from "./runPromptFile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const promptByScreen: Record<string, string> = {
  login: path.resolve(__dirname, "../examples/prompts/login.prompt.json"),
  settings: path.resolve(__dirname, "../examples/prompts/settings.prompt.json"),
  dashboard: path.resolve(__dirname, "../examples/prompts/dashboard.prompt.json"),
  "filter-list": path.resolve(__dirname, "../examples/prompts/filter-list.prompt.json")
};

const screenArg = process.argv[2] ?? "login";
const promptFilePath = promptByScreen[screenArg] ?? path.resolve(screenArg);

runPromptFile({
  promptFilePath,
  print: true
});
