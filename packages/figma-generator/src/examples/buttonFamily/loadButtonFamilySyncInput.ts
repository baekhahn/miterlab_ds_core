import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type ButtonFamilySyncInput = {
  generatedAt: string;
  source: string;
  families: Array<{
    component: "Button" | "IconButton" | "TextButton";
    sourceUrl: string;
    sizes: string[];
    variants: string[];
    states: string[];
    props: string[];
    spacing: {
      gaps: number[];
      justify: string[];
      align: string[];
      wrap: string[];
    };
    metrics: Record<string, Record<string, number>>;
  }>;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../../../");
const syncInputPath = path.join(repoRoot, "artifacts", "component-baselines", "button-family", "sync-input.json");

export const loadButtonFamilySyncInput = (): ButtonFamilySyncInput => {
  const raw = fs.readFileSync(syncInputPath, "utf8");
  return JSON.parse(raw) as ButtonFamilySyncInput;
};

