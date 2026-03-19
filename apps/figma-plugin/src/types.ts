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
  | PluginExtractSelectionMessage;
