import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { alphaTheme, projectATheme, pulseTheme, type ProjectTheme } from "@miterlab/themes";
import { buildLayout } from "../layout/buildLayout";
import { fromDesignPrompt } from "../layout/fromDesignPrompt";
import { exportFigmaJson } from "../export/exportFigmaJson";
import { mapToMcpPayload } from "../mcp/mapToMcpPayload";
import type { DesignPrompt } from "../types/designPrompt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../../");

const readJson = <T>(filePath: string): T => {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
};

const readSpec = (name: "button" | "input" | "filter-button") => {
  const filePath = path.resolve(repoRoot, `packages/ui-core/specs/${name}.spec.yaml`);
  return fs.readFileSync(filePath, "utf-8");
};

const flattenSemantic = (semantic: unknown) => {
  const out: Record<string, string> = {};
  for (const [group, tokens] of Object.entries((semantic ?? {}) as Record<string, unknown>)) {
    if (!tokens || typeof tokens !== "object") continue;
    for (const [name, value] of Object.entries(tokens)) {
      if (typeof value !== "string") continue;
      out[`${group}.${name}`] = value;
    }
  }
  return out;
};

const pickTheme = (theme: string): ProjectTheme => {
  if (theme === "projectA") return projectATheme;
  if (theme === "pulse") return pulseTheme;
  return alphaTheme;
};

export const generateLoginMcpPayload = () => {
  const promptPath = path.resolve(__dirname, "designPrompt.login.json");
  const prompt = readJson<DesignPrompt>(promptPath);
  const theme = pickTheme(prompt.theme);

  const layout = fromDesignPrompt(prompt);
  const figma = exportFigmaJson(
    buildLayout({
      root: layout,
      componentSpecs: {
        button: readSpec("button"),
        input: readSpec("input"),
        "filter-button": readSpec("filter-button")
      },
      tokenContext: {
        projectId: theme.id,
        semanticValues: flattenSemantic(theme.resolved.semantic)
      }
    })
  );

  return mapToMcpPayload({
    figma,
    documentName: "Login Screen",
    screen: prompt.screen,
    theme: theme.id
  });
};
