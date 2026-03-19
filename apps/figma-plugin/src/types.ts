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

export interface PluginWriteResult {
  createdNodeCount: number;
  createdFrameName: string;
}

export type PluginUiMessage =
  | PluginReadyMessage
  | PluginRenderInspectionFamilyMessage
  | PluginRenderContractPreviewMessage;
