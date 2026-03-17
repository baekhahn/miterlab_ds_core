import path from "node:path";
import { fileURLToPath } from "node:url";
import { alphaTheme } from "@miterlab/themes";
import { buildLayout } from "../layout/buildLayout";
import { exportFigmaJson } from "../export/exportFigmaJson";
import type { LayoutFrameNode } from "../types/layout";
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

export const generateLoginScreen = () => {
  const specs = loadComponentSpecs(specDir);

  const layout: LayoutFrameNode = {
    type: "frame",
    name: "Login Screen",
    width: 390,
    height: 844,
    children: [
      {
        type: "stack",
        name: "Header",
        x: 24,
        y: 32,
        direction: "vertical",
        gap: 8,
        children: [
          {
            type: "text",
            name: "Title",
            content: "Welcome Back",
            colorToken: "semantic.text.primary",
            textStyle: "text/heading/lg"
          },
          {
            type: "text",
            name: "Subtitle",
            content: "Sign in to continue",
            colorToken: "semantic.text.secondary",
            textStyle: "text/body/md"
          }
        ]
      },
      {
        type: "stack",
        name: "Form",
        x: 24,
        y: 140,
        direction: "vertical",
        gap: 12,
        children: [
          {
            type: "component",
            name: "Email Field",
            component: "input",
            props: { variant: "default", size: "md", state: "default" }
          },
          {
            type: "component",
            name: "Password Field",
            component: "input",
            props: { variant: "default", size: "md", state: "default" }
          },
          {
            type: "component",
            name: "Sign In Button",
            component: "button",
            label: "Sign in",
            props: { variant: "primary", size: "md", state: "default" }
          }
        ]
      }
    ]
  };

  const root = buildLayout({
    root: layout,
    componentSpecs: specs,
    tokenContext: {
      projectId: alphaTheme.id,
      semanticValues: flattenSemantic(alphaTheme.resolved.semantic)
    }
  });

  return exportFigmaJson(root);
};
