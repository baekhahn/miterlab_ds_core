import type { FigmaWritePayload } from "../../../../shared/contracts/figmaWritePayload";

export interface GenerateScreenResponse {
  payload: FigmaWritePayload;
  summary: {
    screen: string;
    theme: string;
    sectionsCreated: string[];
    componentCount: number;
    nodeCount: number;
    evaluationScore: number;
    passed: boolean;
  };
  evaluation: {
    score: number;
    passed: boolean;
    warnings: string[];
    errors: string[];
  };
  warnings: string[];
  metadata: {
    project?: string;
    source: "miterlab-figma-bridge";
    generatedAt: string;
  };
}
