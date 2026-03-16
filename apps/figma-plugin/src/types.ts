import type { FigmaWritePayload } from "../../../shared/contracts/figmaWritePayload";

export interface PluginGenerateMessage {
  type: "generate";
  bridgeUrl: string;
  screen: string;
  theme: string;
}

export interface PluginWriteResult {
  createdNodeCount: number;
  createdFrameName: string;
}

export type PluginUiMessage = PluginGenerateMessage;
export type { FigmaWritePayload };
