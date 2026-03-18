import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPromptFile } from "./runPromptFile";
import { runPrompt } from "./runPrompt";
import { createButtonInspectionPrompt } from "../examples/buttonFamily/createButtonInspectionPrompt";
import { createInputInspectionPrompt } from "../examples/inputFamily/createInputInspectionPrompt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const promptByScreen: Record<string, string> = {
  "button-inspection": path.resolve(__dirname, "../examples/prompts/button-inspection.prompt.json"),
  "input-inspection": path.resolve(__dirname, "../examples/prompts/input-inspection.prompt.json")
};

const screenArg = process.argv[2] ?? "button-inspection";

if (screenArg === "button-inspection") {
  runPrompt({
    prompt: createButtonInspectionPrompt("core"),
    print: true
  });
  process.exit(0);
}

if (screenArg === "input-inspection") {
  runPrompt({
    prompt: createInputInspectionPrompt("core"),
    print: true
  });
  process.exit(0);
}

if (!(screenArg in promptByScreen)) {
  throw new Error(`Unsupported screen '${screenArg}'. Only button-inspection and input-inspection are active.`);
}

const promptFilePath = promptByScreen[screenArg] ?? path.resolve(screenArg);

runPromptFile({
  promptFilePath,
  print: true
});
