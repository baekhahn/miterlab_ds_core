import type { DesignPrompt } from "../types/designPrompt";
import { type GenerationSummary } from "./printSummary";
export interface RunPromptOptions {
    prompt: DesignPrompt;
    outputRoot?: string;
    print?: boolean;
}
export declare const runPrompt: (options: RunPromptOptions) => {
    summary: GenerationSummary;
    paths: {
        layout: string;
        figmaGenerator: string;
        mcpPayload: string;
        summary: string;
    };
    prompt: DesignPrompt;
    layout: import("../types/layout").LayoutFrameNode;
    figma: import("../export/exportFigmaJson").FigmaExport;
    mcpPayload: import("../mcp/types").McpPayload;
    payloadValidation: import("../mcp/validateMcpPayload").McpPayloadValidationResult;
    evaluation: import("../evaluation/types").ScreenEvaluationResult;
};
