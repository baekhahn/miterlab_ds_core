export interface EvaluationCriterion {
    key: string;
    description: string;
    weight: number;
}
export declare const evaluationCriteria: EvaluationCriterion[];
export declare const errorPenalty = 12;
export declare const warningPenalty = 4;
