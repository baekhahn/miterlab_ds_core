import fs from "node:fs";
import path from "node:path";
const writeJson = (filePath, data) => {
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
};
export const writePayload = (input) => {
    fs.mkdirSync(input.outputDir, { recursive: true });
    const paths = {
        layout: path.resolve(input.outputDir, "layout.json"),
        figmaGenerator: path.resolve(input.outputDir, "figma-generator.json"),
        mcpPayload: path.resolve(input.outputDir, "mcp-payload.json"),
        summary: path.resolve(input.outputDir, "summary.json")
    };
    writeJson(paths.layout, input.layout);
    writeJson(paths.figmaGenerator, input.figma);
    writeJson(paths.mcpPayload, input.mcpPayload);
    writeJson(paths.summary, input.summary);
    return paths;
};
