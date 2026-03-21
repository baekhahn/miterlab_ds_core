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

export interface PluginMakerDirectEditMessage {
  type: "makerDirectEdit";
  prompt: string;
  intent?: {
    kind: "direct-edit";
    targetScope?: "selection" | "container" | "container-children";
    message?: string;
    commands: Array<
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
        }
    >;
    analysis?: {
      componentName?: string;
      role?: string;
      resolvedStructureKind?: string;
      selectionIntentKind?: string;
    };
  };
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
  | PluginMakerGenerateMessage
  | PluginMakerDirectEditMessage;
