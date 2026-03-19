export interface WritePayloadInput {
    outputDir: string;
    layout: unknown;
    figma: unknown;
    mcpPayload: unknown;
    summary: unknown;
}
export declare const writePayload: (input: WritePayloadInput) => {
    layout: string;
    figmaGenerator: string;
    mcpPayload: string;
    summary: string;
};
