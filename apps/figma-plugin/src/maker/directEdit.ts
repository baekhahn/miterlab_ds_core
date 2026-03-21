import type { MakerDirectEditCommand, MakerDirectEditIntent, MakerDirectEditTargetScope } from "../types";

type SelectionIntentKind =
  | "single-component"
  | "component-group"
  | "section"
  | "screen-fragment"
  | "unknown";

type SelectionSummaryLike = {
  selectionIntent?: {
    kind?: SelectionIntentKind;
  };
} | null | undefined;

type EditIntentKind = "fill-width" | "center-align";

type EditIntentDefinition = {
  kind: EditIntentKind;
  concepts: readonly string[];
  message: string;
  targetScopeBySelection: Record<SelectionIntentKind, MakerDirectEditTargetScope>;
  commandsByScope: Record<MakerDirectEditTargetScope, MakerDirectEditCommand[]>;
};

const normalizeEditPrompt = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[.,!?/\\()[\]{}:+-]/g, "");

const hasAnyKeyword = (value: string, keywords: readonly string[]) =>
  keywords.some((keyword) => value.includes(keyword));

const widthDimensionKeywords = ["width", "fullwidth", "full", "너비", "폭", "가로폭", "가로"] as const;
const widthActionKeywords = ["fill", "stretch", "full", "가득", "꽉", "채워", "늘려", "넓혀", "넓게", "확장"] as const;
const widthDirectionalKeywords = ["좌우", "양옆", "전체"] as const;

const centerPositionKeywords = ["center", "centered", "middle", "가운데", "중앙", "센터"] as const;
const centerActionKeywords = ["align", "alignment", "정렬", "맞춰", "배치"] as const;

const editIntentDefinitions: Record<EditIntentKind, EditIntentDefinition> = {
  "fill-width": {
    kind: "fill-width",
    concepts: ["width", "fill", "stretch"],
    message: "선택 영역에 full width 직접 수정을 적용합니다.",
    targetScopeBySelection: {
      "single-component": "selection",
      "component-group": "selection",
      section: "container-children",
      "screen-fragment": "container-children",
      unknown: "selection"
    },
    commandsByScope: {
      selection: [
        { type: "set-node-layout-align", value: "STRETCH" },
        { type: "set-node-layout-sizing-horizontal", value: "FILL" },
        { type: "resize-node-width-to-parent-inner" }
      ],
      container: [
        { type: "set-node-layout-align", value: "STRETCH" },
        { type: "set-node-layout-sizing-horizontal", value: "FILL" },
        { type: "set-node-layout-grow", value: 0 }
      ],
      "container-children": [
        { type: "set-node-layout-align", value: "STRETCH" },
        { type: "set-node-layout-sizing-horizontal", value: "FILL" },
        { type: "set-node-layout-grow", value: 0 }
      ]
    }
  },
  "center-align": {
    kind: "center-align",
    concepts: ["alignment", "center", "layout"],
    message: "선택 영역에 가운데 정렬 직접 수정을 적용합니다.",
    targetScopeBySelection: {
      "single-component": "selection",
      "component-group": "selection",
      section: "container",
      "screen-fragment": "container",
      unknown: "selection"
    },
    commandsByScope: {
      selection: [
        { type: "set-container-cross-align", value: "CENTER" },
        { type: "set-node-layout-align", value: "INHERIT" },
        { type: "set-node-layout-grow", value: 0 },
        { type: "shrink-node-to-hug-content" },
        { type: "center-node-in-parent" }
      ],
      container: [
        { type: "set-container-cross-align", value: "CENTER" },
        { type: "set-node-layout-align", value: "INHERIT" },
        { type: "set-node-layout-grow", value: 0 },
        { type: "shrink-node-to-hug-content" }
      ],
      "container-children": [
        { type: "set-container-cross-align", value: "CENTER" },
        { type: "set-node-layout-align", value: "INHERIT" },
        { type: "set-node-layout-grow", value: 0 },
        { type: "shrink-node-to-hug-content" }
      ]
    }
  }
};

export const parseLocalEditIntentKind = (value: string): EditIntentKind | null => {
  const normalized = normalizeEditPrompt(value);

  const widthScore =
    (hasAnyKeyword(normalized, widthDimensionKeywords) ? 1 : 0) +
    (hasAnyKeyword(normalized, widthActionKeywords) ? 1 : 0) +
    (hasAnyKeyword(normalized, widthDirectionalKeywords) ? 1 : 0);

  if (
    normalized.includes("fullwidth") ||
    normalized.includes("fillwidth") ||
    (widthScore >= 2 && !hasAnyKeyword(normalized, centerPositionKeywords))
  ) {
    return "fill-width";
  }

  if (
    hasAnyKeyword(normalized, centerPositionKeywords) &&
    (hasAnyKeyword(normalized, centerActionKeywords) || normalized.endsWith("로"))
  ) {
    return "center-align";
  }

  return null;
};

export const buildLocalDirectEditIntent = (
  prompt: string,
  selectionSummary?: SelectionSummaryLike
): MakerDirectEditIntent | null => {
  const intentKind = parseLocalEditIntentKind(prompt);
  if (!intentKind) {
    return null;
  }

  const selectionKind = selectionSummary?.selectionIntent?.kind ?? "unknown";
  const definition = editIntentDefinitions[intentKind];
  const targetScope = definition.targetScopeBySelection[selectionKind];

  return {
    kind: "direct-edit",
    targetScope,
    message: definition.message,
    commands: definition.commandsByScope[targetScope],
    analysis: {
      localIntentKind: intentKind,
      selectionIntentKind: selectionKind,
      matchedConcepts: [...definition.concepts]
    }
  };
};
