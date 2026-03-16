import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPromptFile } from "./runPromptFile";
import { createHttpMcpClient } from "../mcp/client/httpMcpClient";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const promptByScreen: Record<string, string> = {
  login: path.resolve(__dirname, "../examples/prompts/login.prompt.json"),
  settings: path.resolve(__dirname, "../examples/prompts/settings.prompt.json"),
  dashboard: path.resolve(__dirname, "../examples/prompts/dashboard.prompt.json"),
  "filter-list": path.resolve(__dirname, "../examples/prompts/filter-list.prompt.json")
};

export const executePromptFile = async (screenOrPath: string) => {
  const promptFilePath = promptByScreen[screenOrPath] ?? path.resolve(screenOrPath);
  const generated = runPromptFile({ promptFilePath, print: true });

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

const arg = process.argv[2] ?? "login";
executePromptFile(arg).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
