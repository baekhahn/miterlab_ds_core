import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface InputBlueprintArtifact {
  targetComponent: "Input";
  sourceComponentName: string;
  updatedAt: string;
  metrics?: {
    width?: number;
    height?: number;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    itemSpacing?: number;
    radius?: number;
    layoutMode?: string;
  };
  properties?: {
    keys: string[];
    values?: Record<string, unknown>;
  };
}

interface FigmaRawComponentChild {
  name?: string;
  type?: string;
  variantProperties?: Record<string, string>;
  size?: { width?: number; height?: number };
  autoLayout?: {
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    itemSpacing?: number;
    layoutMode?: string;
  };
  cornerRadius?: number;
}

interface FigmaRawArtifact {
  name?: string;
  extractedAt?: string;
  rootType?: string;
  document?: {
    type?: string;
    name?: string;
    component?: {
      componentPropertyDefinitions?: Record<string, { type?: string; defaultValue?: unknown; variantOptions?: string[] }>;
    };
    size?: { width?: number; height?: number };
    autoLayout?: {
      paddingTop?: number;
      paddingRight?: number;
      paddingBottom?: number;
      paddingLeft?: number;
      itemSpacing?: number;
      layoutMode?: string;
    };
    cornerRadius?: number;
    children?: FigmaRawComponentChild[];
  };
}

export interface InputExtractionCase {
  label: string;
  inputText?: string;
  size: "sm" | "md" | "lg";
  state: "default" | "focus" | "disabled" | "error" | "positive" | "readOnly";
  role?: "leading-icon" | "trailing-text" | "trailing-action";
  placeholderText?: string;
  headingText?: string;
  descriptionText?: string;
  extraText?: string;
  required?: boolean;
  menu?: boolean;
  trailingButtonLabel?: string;
  trailingContentText?: string;
}

export interface InputPropertyDefinition {
  key: string;
  type: string;
  defaultValue?: unknown;
  variantOptions?: string[];
}

export interface InputExtractionSource {
  key: string;
  name: string;
  extractedAt?: string;
  propertyDefinitionKeys: string[];
  propertyDefinitions: InputPropertyDefinition[];
  blueprint?: InputBlueprintArtifact;
  extractedCases: InputExtractionCase[];
  syntheticCases: InputExtractionCase[];
}

export interface InputExtractionArtifacts {
  sources: InputExtractionSource[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../../../");
const figmaRawDir = path.join(repoRoot, "artifacts", "figma-raw");

const readJson = <T>(targetPath: string): T | undefined => {
  if (!fs.existsSync(targetPath)) return undefined;
  return JSON.parse(fs.readFileSync(targetPath, "utf-8")) as T;
};

const matchesInputName = (value?: string) => Boolean(value && /textinput|textfield|input/i.test(value));

interface ExtractedInputDefaults {
  headingText?: string;
  descriptionText?: string;
  labelText?: string;
  placeholderText?: string;
  errorText?: string;
  successText?: string;
  headingEnabled: boolean;
  descriptionEnabled: boolean;
  leadingEnabled: boolean;
  trailingContentEnabled: boolean;
  trailingButtonEnabled: boolean;
  requiredEnabled: boolean;
  extraEnabled: boolean;
  menuEnabled: boolean;
}

const buildDefaultsFromProperties = (definitions: InputPropertyDefinition[]): ExtractedInputDefaults => {
  const byKey = (pattern: RegExp) => definitions.find((item) => pattern.test(item.key));
  const textKeys = definitions.filter((item) => item.key.startsWith("┗ Text"));
  return {
    headingText: typeof textKeys[0]?.defaultValue === "string" ? String(textKeys[0].defaultValue) : undefined,
    descriptionText: typeof textKeys[1]?.defaultValue === "string" ? String(textKeys[1].defaultValue) : undefined,
    labelText: typeof byKey(/^Label#/)?.defaultValue === "string" ? String(byKey(/^Label#/)?.defaultValue) : undefined,
    placeholderText:
      typeof byKey(/^Placeholder#/)?.defaultValue === "string" ? String(byKey(/^Placeholder#/)?.defaultValue) : undefined,
    errorText:
      typeof byKey(/Error Text/)?.defaultValue === "string" ? String(byKey(/Error Text/)?.defaultValue) : undefined,
    successText:
      typeof byKey(/Success Text/)?.defaultValue === "string" ? String(byKey(/Success Text/)?.defaultValue) : undefined,
    headingEnabled: byKey(/^Heading#/)?.defaultValue === true,
    descriptionEnabled: byKey(/^Description#/)?.defaultValue === true,
    leadingEnabled: byKey(/^Leading Content#/)?.defaultValue === true,
    trailingContentEnabled: byKey(/^Trailing Content#/)?.defaultValue === true,
    trailingButtonEnabled: byKey(/^Button#/)?.defaultValue === true || byKey(/^Trailing Button$/)?.defaultValue === true,
    requiredEnabled: byKey(/Required#/)?.defaultValue === true,
    extraEnabled: byKey(/Extra#/)?.defaultValue === true,
    menuEnabled: byKey(/^Menu#/)?.defaultValue === true
  };
};

const caseFromChild = (child: FigmaRawComponentChild, defaults: ExtractedInputDefaults): InputExtractionCase | null => {
  if (child.type !== "COMPONENT") return null;
  const props = child.variantProperties ?? {};
  const status = props["Status"];
  const focus = props["Focus"] === "True";
  const disable = props["Disable"] === "True";
  const trailingButton = props["Trailing Button"] === "True";

  const state: InputExtractionCase["state"] = disable
    ? "disabled"
    : focus
      ? "focus"
      : status === "Positive"
        ? "positive"
        : status === "Negative"
          ? "error"
          : "default";

  return {
    label: child.name ?? "Extracted case",
    inputText: defaults.labelText,
    size: "md",
    state,
    role: trailingButton ? "trailing-action" : defaults.leadingEnabled ? "leading-icon" : undefined,
    placeholderText: defaults.placeholderText,
    headingText: defaults.headingEnabled ? defaults.headingText : undefined,
    descriptionText:
      defaults.descriptionEnabled
        ? state === "error"
          ? defaults.errorText ?? defaults.descriptionText
          : state === "positive"
            ? defaults.successText ?? defaults.descriptionText
            : defaults.descriptionText
        : undefined,
    extraText: defaults.extraEnabled ? "Extra" : undefined,
    required: defaults.requiredEnabled,
    menu: defaults.menuEnabled,
    trailingButtonLabel: trailingButton ? "확인" : undefined,
    trailingContentText:
      !trailingButton && defaults.trailingContentEnabled
        ? state === "error"
          ? defaults.errorText ?? "에러"
          : state === "positive"
            ? defaults.successText ?? "성공"
            : "보조 정보"
        : undefined
  };
};

const propertyDefinitionsFromRaw = (
  definitions: Record<string, { type?: string; defaultValue?: unknown; variantOptions?: string[] }> | undefined
): InputPropertyDefinition[] => {
  if (!definitions) return [];
  return Object.entries(definitions).map(([key, value]) => ({
    key,
    type: value.type ?? "UNKNOWN",
    defaultValue: value.defaultValue,
    variantOptions: value.variantOptions
  }));
};

const syntheticCasesFromProperties = (
  definitions: InputPropertyDefinition[],
  defaults: ExtractedInputDefaults
): InputExtractionCase[] => {
  const result: InputExtractionCase[] = [];
  const find = (pattern: RegExp) => definitions.find((item) => pattern.test(item.key));

  const placeholder = find(/^Placeholder/i);
  if (placeholder && typeof placeholder.defaultValue === "string") {
    result.push({
      label: defaults.labelText ?? "입력 필드",
      inputText: "",
      size: "md",
      state: "default",
      placeholderText: placeholder.defaultValue,
      headingText: defaults.headingEnabled ? defaults.headingText : undefined,
      descriptionText: defaults.descriptionEnabled ? defaults.descriptionText : undefined
    });
  }

  const leading = find(/^Leading Content/i);
  if (leading?.defaultValue === false || leading?.defaultValue === true) {
    result.push({
      label: defaults.labelText ?? "입력 필드",
      inputText: defaults.labelText,
      size: "md",
      state: "default",
      role: "leading-icon",
      placeholderText: defaults.placeholderText,
      headingText: defaults.headingEnabled ? defaults.headingText : undefined,
      descriptionText: defaults.descriptionEnabled ? defaults.descriptionText : undefined
    });
  }

  const trailing = find(/^Trailing Content/i);
  if (trailing?.defaultValue === false || trailing?.defaultValue === true) {
    result.push({
      label: defaults.labelText ?? "입력 필드",
      inputText: defaults.labelText,
      size: "md",
      state: "default",
      role: "trailing-text",
      trailingContentText: defaults.successText ?? "성공 메시지를 나타내요.",
      placeholderText: defaults.placeholderText,
      headingText: defaults.headingEnabled ? defaults.headingText : undefined,
      descriptionText: defaults.descriptionEnabled ? defaults.descriptionText : undefined
    });
  }

  const button = find(/^Button#/i) ?? find(/^Trailing Button$/i);
  if (button) {
    result.push({
      label: defaults.labelText ?? "입력 필드",
      inputText: defaults.labelText,
      size: "md",
      state: "default",
      role: "trailing-action",
      trailingButtonLabel: "확인",
      placeholderText: defaults.placeholderText,
      headingText: defaults.headingEnabled ? defaults.headingText : undefined,
      descriptionText: defaults.descriptionEnabled ? defaults.descriptionText : undefined
    });
  }

  if (defaults.requiredEnabled === false && defaults.headingText) {
    result.push({
      label: defaults.labelText ?? "입력 필드",
      inputText: defaults.labelText,
      size: "md",
      state: "default",
      headingText: defaults.headingText,
      required: true,
      placeholderText: defaults.placeholderText
    });
  }

  if (defaults.extraEnabled === false && defaults.headingText) {
    result.push({
      label: defaults.labelText ?? "입력 필드",
      inputText: defaults.labelText,
      size: "md",
      state: "default",
      headingText: defaults.headingText,
      extraText: "Extra",
      placeholderText: defaults.placeholderText
    });
  }

  if (defaults.menuEnabled === false) {
    result.push({
      label: defaults.labelText ?? "입력 필드",
      inputText: defaults.labelText,
      size: "md",
      state: "default",
      placeholderText: defaults.placeholderText,
      headingText: defaults.headingEnabled ? defaults.headingText : undefined,
      descriptionText: defaults.descriptionEnabled ? defaults.descriptionText : undefined,
      menu: true
    });
  }

  return result;
};

const blueprintFromRaw = (artifact: FigmaRawArtifact): InputBlueprintArtifact | undefined => {
  const representative =
    artifact.document?.type === "COMPONENT_SET"
      ? artifact.document.children?.find((child) => child.type === "COMPONENT")
      : artifact.document;

  if (!representative) return undefined;

  return {
    targetComponent: "Input",
    sourceComponentName: artifact.name ?? artifact.document?.name ?? "Input",
    updatedAt: artifact.extractedAt ?? new Date().toISOString(),
    metrics: {
      width: representative.size?.width,
      height: representative.size?.height,
      paddingTop: representative.autoLayout?.paddingTop,
      paddingRight: representative.autoLayout?.paddingRight,
      paddingBottom: representative.autoLayout?.paddingBottom,
      paddingLeft: representative.autoLayout?.paddingLeft,
      itemSpacing: representative.autoLayout?.itemSpacing,
      radius: representative.cornerRadius,
      layoutMode: representative.autoLayout?.layoutMode
    },
    properties: {
      keys: Object.keys(artifact.document?.component?.componentPropertyDefinitions ?? {})
    }
  };
};

export const loadInputExtractionArtifacts = (): InputExtractionArtifacts => {
  if (!fs.existsSync(figmaRawDir)) {
    return { sources: [] };
  }

  const sources = fs
    .readdirSync(figmaRawDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const targetPath = path.join(figmaRawDir, file);
      return {
        key: file.replace(/\.raw\.json$/, ""),
        mtimeMs: fs.statSync(targetPath).mtimeMs,
        artifact: readJson<FigmaRawArtifact>(targetPath)
      };
    })
    .filter((entry) => entry.artifact && matchesInputName(entry.artifact.name ?? entry.artifact.document?.name))
    .sort((a, b) => a.mtimeMs - b.mtimeMs)
    .map((entry) => {
      const artifact = entry.artifact as FigmaRawArtifact;
      const propertyDefinitions = propertyDefinitionsFromRaw(artifact.document?.component?.componentPropertyDefinitions);
      const defaults = buildDefaultsFromProperties(propertyDefinitions);
      return {
        key: entry.key,
        name: artifact.name ?? artifact.document?.name ?? entry.key,
        extractedAt: artifact.extractedAt,
        propertyDefinitionKeys: Object.keys(artifact.document?.component?.componentPropertyDefinitions ?? {}),
        propertyDefinitions,
        blueprint: blueprintFromRaw(artifact),
        extractedCases: (artifact.document?.children ?? [])
          .map((child) => caseFromChild(child, defaults))
          .filter((child): child is InputExtractionCase => Boolean(child)),
        syntheticCases: syntheticCasesFromProperties(propertyDefinitions, defaults)
      };
    });

  return { sources };
};
