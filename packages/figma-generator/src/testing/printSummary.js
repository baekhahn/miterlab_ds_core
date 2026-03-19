export const printSummary = (summary) => {
    const lines = [
        "[Miterlab Figma Generator]",
        `screen: ${summary.screen}`,
        `theme: ${summary.theme}`,
        `sections: ${summary.sectionsCreated.join(", ") || "-"}`,
        `components: ${summary.componentCount}`,
        `nodes: ${summary.nodeCount}`,
        `evaluation: ${summary.evaluationScore} (${summary.passed ? "pass" : "fail"})`,
        `warnings: ${summary.warnings.length}`,
        "files:",
        ...Object.entries(summary.writtenFiles).map(([k, v]) => `  - ${k}: ${v}`)
    ];
    // eslint-disable-next-line no-console
    console.log(lines.join("\n"));
};
