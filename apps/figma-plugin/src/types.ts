export interface PluginReadyMessage {
  type: "pluginReady";
}

export interface PluginRenderInspectionFamilyMessage {
  type: "renderInspectionFamily";
  family: string;
}

export interface PluginWriteResult {
  createdNodeCount: number;
  createdFrameName: string;
}

export type PluginUiMessage = PluginReadyMessage | PluginRenderInspectionFamilyMessage;
