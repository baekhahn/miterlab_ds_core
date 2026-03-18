import type { FigmaWritePayload } from "../../../shared/contracts/figmaWritePayload";
import type { DesignPrompt } from "../../../packages/figma-generator/src/types/designPrompt";

export interface PluginGenerateMessage {
  type: "generate";
  bridgeUrl: string;
  screen: string;
  theme: string;
}

export interface PluginGenerateFromTextMessage {
  type: "generateFromText";
  bridgeUrl: string;
  screen: string;
  theme: string;
  promptText: string;
  selectionPromptText?: string;
}

export interface PluginExtractSelectionMessage {
  type: "extractSelection";
  bridgeUrl: string;
}

export interface PluginReadyMessage {
  type: "pluginReady";
}

export interface PluginRefreshExtractionStateMessage {
  type: "refreshExtractionState";
}

export interface PluginLoadExtractionMessage {
  type: "loadExtraction";
  bridgeUrl: string;
  extractionKey: string;
  render?: boolean;
}

export interface PluginRenderInspectionFamilyMessage {
  type: "renderInspectionFamily";
  family: string;
}

export interface PluginWriteResult {
  createdNodeCount: number;
  createdFrameName: string;
}

export type PluginUiMessage =
  | PluginGenerateMessage
  | PluginGenerateFromTextMessage
  | PluginExtractSelectionMessage
  | PluginReadyMessage
  | PluginRefreshExtractionStateMessage
  | PluginLoadExtractionMessage
  | PluginRenderInspectionFamilyMessage;
export type { FigmaWritePayload };
export type { DesignPrompt };
