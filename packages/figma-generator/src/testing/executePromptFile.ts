import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPromptFile } from "./runPromptFile";
import { runPrompt } from "./runPrompt";
import { createHttpMcpClient } from "../mcp/client/httpMcpClient";
import { createButtonInspectionPrompt } from "../examples/buttonFamily/createButtonInspectionPrompt";
import { createInputInspectionPrompt } from "../examples/inputFamily/createInputInspectionPrompt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const promptByScreen: Record<string, string> = {
  "button-inspection": path.resolve(__dirname, "../examples/prompts/button-inspection.prompt.json"),
  "input-inspection": path.resolve(__dirname, "../examples/prompts/input-inspection.prompt.json")
};

export const executePromptFile = async (screenOrPath: string) => {
  const generated =
    screenOrPath === "button-inspection"
        ? runPrompt({ prompt: createButtonInspectionPrompt("core"), print: true })
      : screenOrPath === "input-inspection"
        ? runPrompt({ prompt: createInputInspectionPrompt("core"), print: true })
      : runPromptFile({ promptFilePath: promptByScreen[screenOrPath] ?? path.resolve(screenOrPath), print: true });

  const endpoint = process.env.MCP_ENDPOINT;
  const token = process.env.MCP_TOKEN;

  if (!endpoint) {
    throw new Error("MCP_ENDPOINT is not set");
  }

  const client = createHttpMcpClient({ endpoint, token });
  const result = await client.executeWithFallback(
    generated.mcpPayload,
    path.resolve(process.cwd(), "artifacts/mcp")
  );

  // eslint-disable-next-line no-console
  console.log("\n[MCP Protocol Result]");
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(result, null, 2));

  return { generated, result };
};

const arg = process.argv[2] ?? "button-inspection";
executePromptFile(arg).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
