import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface InputFamilySyncInput {
  component: "Input";
  sourceComponent: "TextField";
  inspectionCases: Array<{
    label: string;
    size: "sm" | "md" | "lg";
    state: "default" | "focus" | "disabled" | "error" | "positive" | "readOnly";
    role?: "password" | "leading-icon" | "trailing-text" | "trailing-action";
    leadingContent?: boolean;
    trailingContent?: string;
    trailingButton?: string;
  }>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../../../");
const syncInputPath = path.join(repoRoot, "artifacts", "component-baselines", "input-family", "sync-input.json");

export const loadInputFamilySyncInput = (): InputFamilySyncInput => {
  if (!fs.existsSync(syncInputPath)) {
    throw new Error(`Input family sync input not found: ${syncInputPath}`);
  }

  return JSON.parse(fs.readFileSync(syncInputPath, "utf-8")) as InputFamilySyncInput;
};
