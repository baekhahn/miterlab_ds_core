export interface PluginReadyMessage {
  type: "pluginReady";
}

export interface PluginRenderInspectionFamilyMessage {
  type: "renderInspectionFamily";
  family: string;
}

export interface PluginRenderContractPreviewMessage {
  type: "renderContractPreview";
  previewId: string;
}

export interface PluginRequestSelectionInfoMessage {
  type: "requestSelectionInfo";
}

export interface PluginRequestSelectionSvgMessage {
  type: "requestSelectionSvg";
}

export interface PluginSaveFileUrlMessage {
  type: "saveFileUrl";
  fileUrl: string;
}

export interface PluginExtractSelectionMessage {
  type: "extractSelection";
  nodeUrl?: string;
}

export interface PluginMakerGenerateMessage {
  type: "makerGenerate";
  payload: unknown;
  placement?: "new-frame" | "selection" | "selection-preview";
}

export interface PluginRequestMakerGenerateMessage {
  type: "requestMakerGenerate";
  prompt: string;
  selectionSummary?: unknown;
  placement?: "new-frame" | "selection" | "selection-preview";
}

export interface PluginRequestMakerRunMessage {
  type: "requestMakerRun";
  prompt: string;
  selectionSummary?: unknown;
  placement?: "new-frame" | "selection";
}

export interface PluginMakerDirectEditMessage {
  type: "makerDirectEdit";
  prompt: string;
  intent?: MakerDirectEditIntent;
}

export interface PluginCancelExtractionMessage {
  type: "cancelExtraction";
}

export interface PluginWriteResult {
  createdNodeCount: number;
  createdFrameName: string;
}

export type PluginUiMessage =
  | PluginReadyMessage
  | PluginRenderInspectionFamilyMessage
  | PluginRenderContractPreviewMessage
  | PluginRequestSelectionInfoMessage
  | PluginRequestSelectionSvgMessage
  | PluginSaveFileUrlMessage
  | PluginCancelExtractionMessage
  | PluginExtractSelectionMessage
  | PluginRequestMakerGenerateMessage
  | PluginRequestMakerRunMessage
  | PluginMakerGenerateMessage
  | PluginMakerDirectEditMessage;

export type MakerDirectEditTargetScope = "selection" | "container" | "container-children";

export type MakerDirectEditCommand =
  | {
      type: "set-container-cross-align";
      value: "CENTER" | "MIN" | "MAX";
    }
  | {
      type: "set-node-layout-align";
      value: "STRETCH" | "INHERIT" | "MIN" | "CENTER" | "MAX";
    }
  | {
      type: "set-node-layout-grow";
      value: number;
    }
  | {
      type: "set-node-layout-sizing-horizontal";
      value: "FILL" | "HUG" | "FIXED";
    }
  | {
      type: "resize-node-width-to-parent-inner";
    }
  | {
      type: "center-node-in-parent";
    }
  | {
      type: "shrink-node-to-hug-content";
    };

export interface MakerDirectEditAnalysis {
  componentName?: string;
  role?: string;
  resolvedStructureKind?: string;
  selectionIntentKind?: string;
  localIntentKind?: string;
  matchedConcepts?: string[];
}

export interface MakerDirectEditIntent {
  kind: "direct-edit";
  targetScope?: MakerDirectEditTargetScope;
  message?: string;
  commands: MakerDirectEditCommand[];
  analysis?: MakerDirectEditAnalysis;
}
