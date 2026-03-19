import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.resolve(scriptDir, "..", "docs");
const staticDir = path.resolve(scriptDir, "..", "static", "extracted");
const extractedDir = path.resolve(scriptDir, "..", "..", "..", "artifacts", "figma-extractions");
const extractedDataPath = path.resolve(staticDir, "index.json");

const FONT_STACK = "Pretendard, Pretendard Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const sanitize = (value) =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "") || "extracted";

const rect = ({ x, y, width, height, rx = 0, fill = "transparent", stroke = "transparent", strokeWidth = 1 }) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${stroke === "transparent" ? 0 : strokeWidth}" />`;

const text = ({ x, y, value, size = 14, weight = 500, fill = "#171719" }) =>
  `<text x="${x}" y="${y}" font-family="${FONT_STACK}" font-size="${size}" font-weight="${weight}" fill="${fill}">${escapeXml(value)}</text>`;

const svgFrame = (width, height, parts) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="16" fill="#F7F7F8"/>
  ${parts.join("\n")}
</svg>`;

const parseDesignContext = async (filePath) => {
  try {
    const raw = JSON.parse(await fs.readFile(filePath, "utf-8"));
    const code = typeof raw.code === "string" ? raw.code : "";
    const notes = Array.isArray(raw.notes) ? raw.notes : [];
    const labelMatch = code.match(/>\s*([^<>{}\n]{1,24})\s*<\/p>/);
    return {
      label: labelMatch?.[1]?.trim() ?? "",
      note: notes.find((item) => typeof item === "string" && item.startsWith("1.  "))?.replace(/^1\.\s+/, "") ?? ""
    };
  } catch {
    return { label: "", note: "" };
  }
};

const readJson = async (filePath) => {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
  } catch {
    return null;
  }
};

const buildFallbackCardSvg = (item) => {
  const parts = [
    rect({ x: 16, y: 16, width: 488, height: 224, rx: 20, fill: "#FFFFFF", stroke: "#E1E2E4" }),
    text({ x: 32, y: 52, value: item.title, size: 20, weight: 600, fill: "#171719" }),
    text({ x: 32, y: 78, value: item.nodeName, size: 14, weight: 500, fill: "#2E2F33" }),
    rect({ x: 32, y: 96, width: 96, height: 28, rx: 14, fill: "#F4F4F5" }),
    text({ x: 48, y: 115, value: item.nodeType, size: 12, weight: 600, fill: "#37383C" }),
    text({ x: 32, y: 150, value: `fileKey  ${item.fileKey}`, size: 12, weight: 500, fill: "#5A5C63" }),
    text({ x: 32, y: 172, value: `nodeId   ${item.nodeId}`, size: 12, weight: 500, fill: "#5A5C63" }),
    text({ x: 32, y: 194, value: `saved    ${item.extractedAt}`, size: 12, weight: 500, fill: "#5A5C63" })
  ];

  if (item.label) {
    parts.push(text({ x: 272, y: 118, value: item.label, size: 16, weight: 600, fill: "#171719" }));
  }

  if (item.note) {
    parts.push(text({ x: 272, y: 146, value: item.note.slice(0, 34), size: 12, weight: 400, fill: "#5A5C63" }));
  }

  return svgFrame(520, 256, parts);
};

const getExtractionItems = async () => {
  try {
    const extractionNames = await fs.readdir(extractedDir);
    const items = [];

    for (const extractionName of extractionNames) {
      const root = path.resolve(extractedDir, extractionName);
      const stat = await fs.stat(root).catch(() => null);
      if (!stat?.isDirectory()) continue;

      const summaryPath = path.resolve(root, "summary.json");
      const requestPath = path.resolve(root, "request.json");
      const summary = await readJson(summaryPath);
      const request = await readJson(requestPath);
      const requestNodes = Array.isArray(request?.reference?.nodes) ? request.reference.nodes : [];
      const summaryNodes = Array.isArray(summary?.nodes) ? summary.nodes : [];
      if (!request?.reference?.fileKey || requestNodes.length === 0) continue;

      for (const requestNode of requestNodes) {
        const summaryNode = summaryNodes.find((item) => item.id === requestNode.id);
        const nodeDir = summaryNode?.dir ?? path.resolve(root, `${sanitize(requestNode.name)}-${requestNode.id.replace(/:/g, "-")}`);
        const designContextPath = path.resolve(nodeDir, "design-context.json");
        const parsed = await parseDesignContext(designContextPath);
        const svgName = `${sanitize(request.extractionName ?? extractionName)}-${sanitize(requestNode.name)}-${requestNode.id.replace(/:/g, "-")}.svg`;
        items.push({
          slug: extractionName,
          extractionName,
          title: request.extractionName ?? extractionName,
          extractedAt: summary?.extractedAt ?? request.extractedAt ?? "",
          fileKey: request.reference.fileKey,
          nodeId: requestNode.id,
          nodeName: requestNode.name,
          nodeType: requestNode.type ?? "UNKNOWN",
          isFigmaComponent: requestNode.isFigmaComponent ?? false,
          componentRole: requestNode.componentRole ?? "node",
          mainComponentName: requestNode.mainComponentName ?? null,
          variantProperties: requestNode.variantProperties ?? {},
          label: parsed.label,
          note: parsed.note,
          dir: nodeDir,
          rootDir: root,
          svgName,
          svgPath: `/extracted/${svgName}`
        });
      }
    }

    return items.sort((a, b) => b.extractedAt.localeCompare(a.extractedAt));
  } catch {
    return [];
  }
};

const renderMdx = () => `---
title: Extracted
slug: /extracted
---

import ExtractedGallery from "@site/src/components/ExtractedGallery";

# Extracted

수집된 Figma extraction artifact를 확인하는 페이지입니다.

<ExtractedGallery />
`;

const main = async () => {
  await fs.mkdir(staticDir, { recursive: true });
  const items = await getExtractionItems();

  for (const item of items) {
    const selectionSvgPath = path.resolve(item.rootDir, "selection.svg");
    const hasSelectionSvg = await fs
      .stat(selectionSvgPath)
      .then((stat) => stat.isFile())
      .catch(() => false);

    if (hasSelectionSvg) {
      await fs.copyFile(selectionSvgPath, path.resolve(staticDir, item.svgName));
    } else {
      await fs.writeFile(path.resolve(staticDir, item.svgName), buildFallbackCardSvg(item), "utf-8");
    }
  }

  const outputItems = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    nodeName: item.nodeName,
    nodeType: item.nodeType,
    isFigmaComponent: item.isFigmaComponent,
    componentRole: item.componentRole,
    mainComponentName: item.mainComponentName,
    variantProperties: item.variantProperties,
    fileKey: item.fileKey,
    nodeId: item.nodeId,
    extractedAt: item.extractedAt,
    dir: item.dir,
    svgPath: item.svgPath
  }));

  await fs.writeFile(extractedDataPath, `${JSON.stringify(outputItems, null, 2)}\n`, "utf-8");
  await fs.writeFile(path.resolve(docsDir, "extracted.mdx"), renderMdx(), "utf-8");
};

await main();
