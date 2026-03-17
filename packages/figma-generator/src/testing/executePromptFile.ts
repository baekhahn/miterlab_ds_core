import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPromptFile } from "./runPromptFile";
import { runPrompt } from "./runPrompt";
import { createHttpMcpClient } from "../mcp/client/httpMcpClient";
import { createCatalogPrompt } from "../catalog/createCatalogPrompt";
import { createButtonInspectionPrompt } from "../examples/buttonFamily/createButtonInspectionPrompt";
import { createFormInspectionPrompt } from "../examples/formFamily/createFormInspectionPrompt";
import { createInputInspectionPrompt } from "../examples/inputFamily/createInputInspectionPrompt";
import { createListCellInspectionPrompt } from "../examples/listCellFamily/createListCellInspectionPrompt";
import { createNavigationInspectionPrompt } from "../examples/navigationFamily/createNavigationInspectionPrompt";
import { createOverlayInspectionPrompt } from "../examples/overlayFamily/createOverlayInspectionPrompt";
import { createTabsInspectionPrompt } from "../examples/tabsFamily/createTabsInspectionPrompt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const promptByScreen: Record<string, string> = {
  "core-families": path.resolve(__dirname, "../examples/prompts/core-families.prompt.json"),
  catalog: path.resolve(__dirname, "../examples/prompts/catalog.prompt.json"),
  login: path.resolve(__dirname, "../examples/prompts/login.prompt.json"),
  settings: path.resolve(__dirname, "../examples/prompts/settings.prompt.json"),
  dashboard: path.resolve(__dirname, "../examples/prompts/dashboard.prompt.json"),
  "filter-list": path.resolve(__dirname, "../examples/prompts/filter-list.prompt.json")
};

export const executePromptFile = async (screenOrPath: string) => {
  const generated =
    screenOrPath === "catalog"
      ? runPrompt({ prompt: createCatalogPrompt("core"), print: true })
      : screenOrPath === "button-inspection"
        ? runPrompt({ prompt: createButtonInspectionPrompt("core"), print: true })
      : screenOrPath === "input-inspection"
        ? runPrompt({ prompt: createInputInspectionPrompt("core"), print: true })
      : screenOrPath === "tabs-inspection"
        ? runPrompt({ prompt: createTabsInspectionPrompt("core"), print: true })
      : screenOrPath === "list-cell-inspection"
        ? runPrompt({ prompt: createListCellInspectionPrompt("core"), print: true })
      : screenOrPath === "overlay-inspection"
        ? runPrompt({ prompt: createOverlayInspectionPrompt("core"), print: true })
      : screenOrPath === "navigation-inspection"
        ? runPrompt({ prompt: createNavigationInspectionPrompt("core"), print: true })
      : screenOrPath === "form-inspection"
        ? runPrompt({ prompt: createFormInspectionPrompt("core"), print: true })
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

const arg = process.argv[2] ?? "login";
executePromptFile(arg).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
