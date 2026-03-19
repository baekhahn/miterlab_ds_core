import { errorPenalty, evaluationCriteria, warningPenalty } from "./evaluationCriteria";
import { evaluateDsCompliance } from "./evaluateDsCompliance";
import { evaluateLayout } from "./evaluateLayout";
import { evaluateLayoutQuality } from "./evaluateLayoutQuality";
import { suggestFixes } from "./suggestFixes";
const unique = (items) => [...new Set(items)];
const collectAffected = (issues) => {
    const nodes = unique(issues.flatMap((issue) => issue.affectedNodes ?? []));
    const components = unique(issues.flatMap((issue) => issue.affectedComponents ?? []));
    return { nodes, components };
};
export const evaluateScreen = (input) => {
    const layoutResult = evaluateLayout(input.screen, input.layout);
    const dsResult = evaluateDsCompliance(input.payload);
    const qualityResult = evaluateLayoutQuality(input.layout);
    const warnings = [...layoutResult.warnings, ...dsResult.warnings, ...qualityResult.warnings];
    const errors = [...layoutResult.errors, ...dsResult.errors, ...qualityResult.errors];
    const rawScore = evaluationCriteria.reduce((sum, c) => sum + c.weight, 0) -
        errors.length * errorPenalty -
        warnings.length * warningPenalty;
    const score = Math.max(0, Math.min(100, rawScore));
    const allIssues = [...errors, ...warnings];
    const fixes = suggestFixes(allIssues);
    const affected = collectAffected(allIssues);
    const passed = errors.length === 0;
    const summary = passed
        ? `QA passed with score ${score}. ${warnings.length} warning(s) found.`
        : `QA failed with score ${score}. ${errors.length} error(s), ${warnings.length} warning(s).`;
    return {
        score,
        passed,
        warnings,
        errors,
        improvementSuggestions: fixes,
        affectedNodes: affected.nodes,
        affectedComponents: affected.components,
        summary
    };
};
