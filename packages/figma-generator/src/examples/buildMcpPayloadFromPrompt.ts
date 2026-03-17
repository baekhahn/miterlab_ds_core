import path from "node:path";
import { fileURLToPath } from "node:url";
import { alphaTheme, coreTheme, projectATheme, pulseTheme, type ProjectTheme } from "@miterlab/themes";
import { buildLayout } from "../layout/buildLayout";
import { fromDesignPrompt } from "../layout/fromDesignPrompt";
import { exportFigmaJson } from "../export/exportFigmaJson";
import { mapToMcpPayload } from "../mcp/mapToMcpPayload";
import type { DesignPrompt } from "../types/designPrompt";
import { loadComponentSpecs } from "../components/loadComponentSpecs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../../");

const specDir = path.resolve(repoRoot, "packages/ui-core/specs");

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
  if (theme === "core") return coreTheme;
  if (theme === "projectA") return projectATheme;
  if (theme === "pulse") return pulseTheme;
  return alphaTheme;
};

export const buildMcpPayloadFromPrompt = (prompt: DesignPrompt) => {
  const theme = pickTheme(prompt.theme);
  const layout = fromDesignPrompt(prompt);
  const componentSpecs = loadComponentSpecs(specDir);

  const figma = exportFigmaJson(
    buildLayout({
      root: layout,
      componentSpecs,
      tokenContext: {
        projectId: theme.id,
        semanticValues: flattenSemantic(theme.resolved.semantic)
      }
    })
  );

  return mapToMcpPayload({
    figma,
    documentName: `${prompt.screen} screen`,
    screen: prompt.screen,
    theme: theme.id
  });
};
