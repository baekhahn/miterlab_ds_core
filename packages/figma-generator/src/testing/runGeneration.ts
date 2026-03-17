import path from "node:path";
import { fileURLToPath } from "node:url";
import { runPromptFile } from "./runPromptFile";
import { runPrompt } from "./runPrompt";
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
  playground: path.resolve(__dirname, "../examples/prompts/playground.prompt.json"),
  login: path.resolve(__dirname, "../examples/prompts/login.prompt.json"),
  settings: path.resolve(__dirname, "../examples/prompts/settings.prompt.json"),
  dashboard: path.resolve(__dirname, "../examples/prompts/dashboard.prompt.json"),
  "filter-list": path.resolve(__dirname, "../examples/prompts/filter-list.prompt.json")
};

const screenArg = process.argv[2] ?? "login";

if (screenArg === "catalog") {
  runPrompt({
    prompt: createCatalogPrompt("core"),
    print: true
  });
  process.exit(0);
}

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

if (screenArg === "tabs-inspection") {
  runPrompt({
    prompt: createTabsInspectionPrompt("core"),
    print: true
  });
  process.exit(0);
}

if (screenArg === "list-cell-inspection") {
  runPrompt({
    prompt: createListCellInspectionPrompt("core"),
    print: true
  });
  process.exit(0);
}

if (screenArg === "overlay-inspection") {
  runPrompt({
    prompt: createOverlayInspectionPrompt("core"),
    print: true
  });
  process.exit(0);
}

if (screenArg === "navigation-inspection") {
  runPrompt({
    prompt: createNavigationInspectionPrompt("core"),
    print: true
  });
  process.exit(0);
}

if (screenArg === "form-inspection") {
  runPrompt({
    prompt: createFormInspectionPrompt("core"),
    print: true
  });
  process.exit(0);
}

const promptFilePath = promptByScreen[screenArg] ?? path.resolve(screenArg);

runPromptFile({
  promptFilePath,
  print: true
});
