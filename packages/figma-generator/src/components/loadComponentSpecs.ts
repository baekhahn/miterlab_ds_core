import fs from "node:fs";
import path from "node:path";

export const loadComponentSpecs = (specDir: string): Record<string, string> => {
  const entries = fs.readdirSync(specDir, { withFileTypes: true });
  const specs: Record<string, string> = {};

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".spec.yaml")) continue;

    const key = entry.name.replace(/\.spec\.yaml$/, "");
    const filePath = path.resolve(specDir, entry.name);
    specs[key] = fs.readFileSync(filePath, "utf-8");
  }

  return specs;
};
