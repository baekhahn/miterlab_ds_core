export interface GenerationSummary {
    screen: string;
    theme: string;
    sectionsCreated: string[];
    componentCount: number;
    nodeCount: number;
    warnings: string[];
    evaluationScore: number;
    passed: boolean;
    writtenFiles: Record<string, string>;
}
export declare const printSummary: (summary: GenerationSummary) => void;
