import type { FigmaExport } from "../export/exportFigmaJson";
import type { McpPayload } from "./types";
export interface MapToMcpPayloadInput {
    figma: FigmaExport;
    documentName: string;
    screen: string;
    theme: string;
    mode?: {
        brand?: string;
        theme?: string;
    };
}
export declare const mapToMcpPayload: (input: MapToMcpPayloadInput) => McpPayload;
