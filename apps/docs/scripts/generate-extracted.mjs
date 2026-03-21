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

const formatPropertyValue = (value) => {
  if (value === undefined || value === "") return undefined;
  if (value === true || value === "True" || value === "true") return "on";
  if (value === false || value === "False" || value === "false") return "off";
  return String(value);
};

const getPropertyValue = (variantProperties, candidates) => {
  for (const candidate of candidates) {
    const entry = Object.entries(variantProperties ?? {}).find(([key]) => key === candidate || key.startsWith(`${candidate}#`));
    if (entry) return entry[1];
  }
  return undefined;
};

const summarizeVariantProperties = (variantProperties) => {
  const items = [];
  const push = (label, value) => {
    const formatted = formatPropertyValue(value);
    if (!formatted) return;
    items.push(`${label}: ${formatted}`);
  };

  push("Trailing Button", getPropertyValue(variantProperties, ["Trailing Button", "Button"]));
  push("Status", getPropertyValue(variantProperties, ["Status"]));
  push("Active", getPropertyValue(variantProperties, ["Active"]));
  push("Focus", getPropertyValue(variantProperties, ["Focus"]));
  push("Disable", getPropertyValue(variantProperties, ["Disable"]));
  push("Label", getPropertyValue(variantProperties, ["Label"]));
  push("Placeholder", getPropertyValue(variantProperties, ["Placeholder"]));
  push("Leading Content", getPropertyValue(variantProperties, ["Leading Content"]));
  push("Trailing Content", getPropertyValue(variantProperties, ["Trailing Content"]));
  push("Heading", getPropertyValue(variantProperties, ["Heading"]));
  push("Description", getPropertyValue(variantProperties, ["Description"]));

  return [...new Set(items)];
};

const normalizePropertySummary = (items) =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      if (typeof item !== "string") return null;
      const normalized = item.replace(/\s*=\s*/g, ": ");
      return normalized
        .replace(/:\s*True\b/g, ": on")
        .replace(/:\s*False\b/g, ": off")
        .replace(/:\s*true\b/g, ": on")
        .replace(/:\s*false\b/g, ": off");
    })
    .filter(Boolean);

const buildPropertyGroups = (variantProperties) => {
  const formatEntry = (label, value) => {
    const formatted = formatPropertyValue(value);
    return formatted ? `${label}: ${formatted}` : null;
  };

  const groups = [
    {
      label: "State",
      items: [
        formatEntry("Status", getPropertyValue(variantProperties, ["Status"])),
        formatEntry("Active", getPropertyValue(variantProperties, ["Active"])),
        formatEntry("Focus", getPropertyValue(variantProperties, ["Focus"])),
        formatEntry("Disable", getPropertyValue(variantProperties, ["Disable"]))
      ].filter(Boolean)
    },
    {
      label: "Content",
      items: [
        formatEntry("Label", getPropertyValue(variantProperties, ["Label"])),
        formatEntry("Placeholder", getPropertyValue(variantProperties, ["Placeholder"])),
        formatEntry("Heading", getPropertyValue(variantProperties, ["Heading"])),
        formatEntry("Description", getPropertyValue(variantProperties, ["Description"]))
      ].filter(Boolean)
    },
    {
      label: "Adornments",
      items: [
        formatEntry("Trailing Button", getPropertyValue(variantProperties, ["Trailing Button", "Button"])),
        formatEntry("Leading Content", getPropertyValue(variantProperties, ["Leading Content"])),
        formatEntry("Trailing Content", getPropertyValue(variantProperties, ["Trailing Content"]))
      ].filter(Boolean)
    }
  ];

  return groups.filter((group) => group.items.length > 0);
};

const normalizePropertyLabel = (key) =>
  String(key)
    .replace(/#.*/, "")
    .replace(/\u200b/g, "")
    .replace(/^┗\s*/, "")
    .trim();

const buildPropertyHierarchy = (variantProperties) => {
  const hierarchy = [];
  let currentParent = null;

  for (const [rawKey, rawValue] of Object.entries(variantProperties ?? {})) {
    const value = formatPropertyValue(rawValue);
    if (!value) continue;

    const isChild = String(rawKey).trim().startsWith("┗");
    const name = normalizePropertyLabel(rawKey);

    if (isChild && currentParent) {
      currentParent.children.push({ name, value });
      continue;
    }

    currentParent = { name, value, children: [] };
    hierarchy.push(currentParent);
  }

  return hierarchy;
};

const buildNestedInstances = (designCode, variantProperties) => {
  const dataNames = [...new Set(Array.from(String(designCode).matchAll(/data-name="([^"]+)"/g), (match) => match[1].trim()))];

  const present = [...new Set(dataNames.filter((name) =>
    [
      "Background",
      "Icon",
      "Leading Content",
      "Trailing Content",
      "Trailing Content 2",
      "Trailing Button",
      "Menu"
    ].includes(name)
  ))];

  const available = [...new Set([
    ...present,
    ...Object.keys(variantProperties ?? {})
      .map((key) => normalizePropertyLabel(key))
      .flatMap((key) => {
        if (key === "Button" || key === "Trailing Button") return ["Trailing Button"];
        if (key === "Leading Content") return ["Leading Content"];
        if (key === "Trailing Content") return ["Trailing Content", "Trailing Content 2"];
        if (key === "Menu") return ["Menu", "Icon"];
        return [];
      })
  ])];

  return { present, available };
};

const parseVariantSignature = (value) =>
  String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const parseComponentSetSummary = (metadataText, requestNode) => {
  const variants = Array.from(String(metadataText).matchAll(/<symbol id="([^"]+)" name="([^"]+)"[^>]*\/>/g), (match) => ({
    id: match[1],
    name: match[2],
    signature: parseVariantSignature(match[2])
  }));

  const propertyMap = new Map();
  for (const variant of variants) {
    for (const token of variant.signature) {
      const [rawName, rawValue] = token.split("=");
      const name = rawName?.trim();
      const value = rawValue?.trim();
      if (!name || !value) continue;
      if (!propertyMap.has(name)) propertyMap.set(name, new Set());
      propertyMap.get(name).add(value);
    }
  }

  const figmaProperties = Array.from(propertyMap.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values)
  }));

  return {
    figmaProperties,
    figmaVariants: variants,
    figmaInstances: [],
    properties: {
      variantProperties: {},
      enabled: [],
      summary: figmaProperties.map((entry) => `${entry.name}: ${entry.values.join(", ")}`),
      groups: figmaProperties.length ? [{ label: "Figma Properties", items: figmaProperties.map((entry) => `${entry.name}: ${entry.values.join(", ")}`) }] : [],
      hierarchy: []
    },
    resolvedStructure: {
      kind: "component-set",
      slots: [],
      flow: []
    },
    semantics: {
      headline: `${requestNode.name}의 Figma variant set입니다.`,
      notes: variants.length ? [`${variants.length}개의 variant가 포함되어 있습니다.`] : []
    },
    metricsSummary: variants.length ? [`variants ${variants.length}`] : []
  };
};

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
    const texts = Array.isArray(raw?.content)
      ? raw.content.filter((item) => item && item.type === "text" && typeof item.text === "string").map((item) => item.text)
      : [];
    const code = texts.find((item) => item.includes("export default function")) ?? "";
    const notes = texts;
    const labelMatch = code.match(/>\s*([^<>{}\n]{1,24})\s*<\/p>/);
    return {
      label: labelMatch?.[1]?.trim() ?? "",
      note: notes.find((item) => typeof item === "string" && item.startsWith("1.  "))?.replace(/^1\.\s+/, "") ?? "",
      code
    };
  } catch {
    return { label: "", note: "", code: "" };
  }
};

const readJson = async (filePath) => {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8"));
  } catch {
    return null;
  }
};

const toNormalizedSummary = (requestNode, summaryNode, designCode = "", metadataText = "") => {
  if (requestNode?.type === "COMPONENT_SET" || requestNode?.componentRole === "component-set") {
    const parsedSet = parseComponentSetSummary(metadataText, requestNode);
    return {
      component: {
        name: requestNode.name,
        type: requestNode.type ?? "COMPONENT_SET",
        isFigmaComponent: requestNode.isFigmaComponent ?? true,
        role: requestNode.componentRole ?? "component-set",
        mainComponentName: requestNode.mainComponentName ?? requestNode.name
      },
      ...parsedSet,
      nestedInstances: {
        present: [],
        available: []
      }
    };
  }

  const component =
    summaryNode?.component ?? {
      name: requestNode.name,
      type: requestNode.type ?? "UNKNOWN",
      isFigmaComponent: requestNode.isFigmaComponent ?? false,
      role: requestNode.componentRole ?? "node",
      mainComponentName: requestNode.mainComponentName ?? null
    };

  const properties =
    summaryNode?.properties ?? {
      variantProperties: requestNode.variantProperties ?? {},
      enabled: Object.entries(requestNode.variantProperties ?? {})
        .filter(([, value]) => value === true || value === "True" || value === "true")
        .map(([key]) => key),
      summary: summarizeVariantProperties(requestNode.variantProperties ?? {}),
      groups: buildPropertyGroups(requestNode.variantProperties ?? {}),
      hierarchy: buildPropertyHierarchy(requestNode.variantProperties ?? {})
    };

  if (!Array.isArray(properties.summary) || properties.summary.length === 0) {
    properties.summary = summarizeVariantProperties(properties.variantProperties ?? {});
  } else {
    properties.summary = normalizePropertySummary(properties.summary);
  }
  if (!Array.isArray(properties.groups) || properties.groups.length === 0) {
    properties.groups = buildPropertyGroups(properties.variantProperties ?? {});
  }
  if (!Array.isArray(properties.hierarchy) || properties.hierarchy.length === 0) {
    properties.hierarchy = buildPropertyHierarchy(properties.variantProperties ?? {});
  }

  const resolvedStructure =
    summaryNode?.resolvedStructure ??
    (summaryNode?.insight
      ? {
          kind: summaryNode.insight.kind ?? "node",
          slots: summaryNode.insight.detectedSlots ?? [],
          flow: summaryNode.insight.structure ?? []
        }
      : null);

  const semantics =
    summaryNode?.semantics ??
    (summaryNode?.insight
      ? {
          headline: summaryNode.insight.headline ?? "",
          notes: summaryNode.insight.notes ?? []
        }
      : null);

  const metricsSummary = summaryNode?.metrics ?? summaryNode?.insight?.metrics ?? [];
  const nestedInstances =
    summaryNode?.nestedInstances ??
    buildNestedInstances(designCode, properties.variantProperties ?? {});

  return {
    component,
    figmaProperties: summaryNode?.figmaProperties ?? [],
    figmaVariants: summaryNode?.figmaVariants ?? [],
    figmaInstances: summaryNode?.figmaInstances ?? [],
    properties,
    nestedInstances,
    resolvedStructure,
    semantics,
    metricsSummary
  };
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

const buildScreenshotSvg = (screenshot) => {
  const imageItem = Array.isArray(screenshot?.content)
    ? screenshot.content.find((item) => item && item.type === "image" && typeof item.data === "string")
    : null;

  if (!imageItem?.data) return null;

  const mimeType = typeof imageItem.mimeType === "string" ? imageItem.mimeType : "image/png";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="520" height="256" viewBox="0 0 520 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="520" height="256" rx="16" fill="#F7F7F8"/>
  <rect x="16" y="16" width="488" height="224" rx="20" fill="#FFFFFF" stroke="#E1E2E4"/>
  <image x="24" y="24" width="472" height="208" preserveAspectRatio="xMidYMid meet" href="data:${mimeType};base64,${imageItem.data}" />
</svg>`;
};

const buildInterpretedPreviewSvg = (item) => {
  if (Array.isArray(item.figmaVariants) && item.figmaVariants.length > 0) {
    const parts = [
      rect({ x: 16, y: 16, width: 488, height: 224, rx: 20, fill: "#FFFFFF", stroke: "#E1E2E4" }),
      text({ x: 32, y: 48, value: "Interpreted Preview", size: 14, weight: 600, fill: "#5A5C63" }),
      text({ x: 32, y: 78, value: item.title, size: 20, weight: 600, fill: "#171719" }),
      text({ x: 32, y: 104, value: `${item.figmaVariants.length} variants`, size: 13, weight: 500, fill: "#5A5C63" })
    ];

    let y = 134;
    for (const variant of item.figmaVariants.slice(0, 5)) {
      parts.push(rect({ x: 32, y: y - 18, width: 456, height: 26, rx: 10, fill: "#F7F7F8", stroke: "#E1E2E4" }));
      parts.push(text({ x: 44, y, value: variant.name, size: 12, weight: 500, fill: "#2E2F33" }));
      y += 34;
    }

    return svgFrame(520, 256, parts);
  }

  const crisp = (value) => Number(value) + 0.5;
  const parts = [
    rect({ x: 16, y: 16, width: 488, height: 224, rx: 20, fill: "#FFFFFF", stroke: "#E1E2E4" }),
    text({ x: 32, y: 48, value: "Interpreted Preview", size: 14, weight: 600, fill: "#5A5C63" })
  ];

  const propertyMap = Object.fromEntries(
    Object.entries(item.properties?.variantProperties ?? {}).map(([key, value]) => {
      const normalizedKey = key.replace(/#.*/, "");
      return [normalizedKey, value];
    })
  );
  const designCode = typeof item.designCode === "string" ? item.designCode : "";

  const normalized = (value) => formatPropertyValue(value) ?? "";
  const label = String(getPropertyValue(propertyMap, ["Label"]) ?? "값");
  const placeholder = String(getPropertyValue(propertyMap, ["Placeholder"]) ?? "텍스트를 입력해 주세요.");
  const status = String(getPropertyValue(propertyMap, ["Status"]) ?? "Normal");
  const focusOn = normalized(getPropertyValue(propertyMap, ["Focus"])) === "on";
  const disabledOn = normalized(getPropertyValue(propertyMap, ["Disable"])) === "on";
  const activeOn = normalized(getPropertyValue(propertyMap, ["Active"])) === "on";
  const headingOn = normalized(getPropertyValue(propertyMap, ["Heading"])) === "on";
  const descriptionOn = normalized(getPropertyValue(propertyMap, ["Description"])) === "on";
  const trailingButtonOn = normalized(getPropertyValue(propertyMap, ["Trailing Button", "Button"])) === "on";
  const leadingContentOn = normalized(getPropertyValue(propertyMap, ["Leading Content"])) === "on";
  const trailingContentOn = normalized(getPropertyValue(propertyMap, ["Trailing Content"])) === "on";

  const helperText =
    status.toLowerCase() === "negative"
      ? "에러 메시지를 나타내요."
      : status.toLowerCase() === "positive"
        ? "성공 메시지를 나타내요."
        : "메시지에 마침표를 찍어요.";

  const frameX = 72;
  const frameY = 86;
  const frameW = 376;
  const frameH = 48;
  const bgFill = disabledOn ? "#F2F3F5" : "#FFFFFF";
  const stroke = focusOn ? "#0066FF" : "#D8DADE";
  const textFill = disabledOn ? "#9A9CA3" : "#171719";
  const mutedFill = "#70737C";

  if (headingOn) {
    parts.push(text({ x: frameX, y: 66, value: "주제", size: 13, weight: 600, fill: "#171719" }));
  }

  const inferredRadius = Number((designCode.match(/rounded-\[(\d+)px\]/) || [])[1] || 12);
  const inferredButtonW = Number((designCode.match(/data-name="Trailing Button"[\s\S]*?min-w-\[(\d+)px\]/) || [])[1] || 80);
  const strokeWidth = focusOn ? 2 : 1;
  const leftRadius = Number((designCode.match(/rounded-tl-\[(\d+)px\]/) || [])[1] || inferredRadius);
  const rightRadius = Number((designCode.match(/rounded-tr-\[(\d+)px\]/) || [])[1] || inferredRadius);

  if (trailingButtonOn && /data-name="Trailing Button"/.test(designCode)) {
    const dividerX = frameX + frameW - inferredButtonW;
    parts.push(
      rect({
        x: crisp(frameX),
        y: crisp(frameY),
        width: frameW - 1,
        height: frameH - 1,
        rx: inferredRadius,
        fill: bgFill,
        stroke,
        strokeWidth
      })
    );
    parts.push(
      `<line x1="${crisp(dividerX)}" y1="${crisp(frameY + 1)}" x2="${crisp(dividerX)}" y2="${crisp(frameY + frameH - 2)}" stroke="${stroke}" stroke-width="${strokeWidth}" />`
    );
  } else {
    parts.push(rect({ x: crisp(frameX), y: crisp(frameY), width: frameW - 1, height: frameH - 1, rx: inferredRadius, fill: bgFill, stroke, strokeWidth }));
  }

  let contentX = frameX + 16;
  const contentY = frameY + 30;

  if (leadingContentOn) {
    parts.push(rect({ x: contentX, y: frameY + 16, width: 16, height: 16, rx: 8, fill: "#C8CBD1" }));
    contentX += 24;
  }

  const valueText = activeOn ? label : placeholder;
  parts.push(
    text({
      x: contentX,
      y: contentY,
      value: valueText,
      size: 16,
      weight: 400,
      fill: activeOn ? textFill : mutedFill
    })
  );

  let trailingX = frameX + frameW - 16;
  if (trailingButtonOn) {
    const dividerX = frameX + frameW - inferredButtonW;
    parts.push(text({ x: dividerX + 24, y: contentY, value: "확인", size: 16, weight: 500, fill: "#171719" }));
    trailingX = frameX + frameW - inferredButtonW - 12;
  } else if (trailingContentOn) {
    parts.push(rect({ x: trailingX - 16, y: frameY + 16, width: 16, height: 16, rx: 8, fill: "#C8CBD1" }));
    trailingX -= 24;
  }

  if (descriptionOn || helperText) {
    parts.push(text({ x: frameX, y: frameY + frameH + 22, value: helperText, size: 12, weight: 400, fill: status.toLowerCase() === "negative" ? "#D14343" : "#70737C" }));
  }

  parts.push(text({ x: 32, y: 202, value: item.resolvedStructure?.flow?.join(" -> ") || "resolved structure unavailable", size: 12, weight: 500, fill: "#5A5C63" }));

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
        const metadata = await readJson(path.resolve(nodeDir, "metadata.json"));
        const metadataText = Array.isArray(metadata?.content)
          ? metadata.content.filter((item) => item && item.type === "text" && typeof item.text === "string").map((item) => item.text).find((text) => text.startsWith("<")) ?? ""
          : "";
        const normalizedWithMetadata = toNormalizedSummary(requestNode, summaryNode, parsed.code, metadataText);
        items.push({
          slug: extractionName,
          extractionName,
          title: request.extractionName ?? extractionName,
          extractedAt: summary?.extractedAt ?? request.extractedAt ?? "",
          promotionStatus: summary?.promotionStatus ?? "draft",
          promotedAt: summary?.promotedAt ?? null,
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
          component: {
            ...normalizedWithMetadata.component,
            mainComponentName: normalizedWithMetadata.component.mainComponentName ?? requestNode.name
          },
          designCode: parsed.code,
          figmaProperties: normalizedWithMetadata.figmaProperties,
          figmaVariants: normalizedWithMetadata.figmaVariants,
          figmaInstances: normalizedWithMetadata.figmaInstances,
          properties: normalizedWithMetadata.properties,
          nestedInstances: normalizedWithMetadata.nestedInstances,
          resolvedStructure: normalizedWithMetadata.resolvedStructure,
          semantics: normalizedWithMetadata.semantics,
          metricsSummary: normalizedWithMetadata.metricsSummary,
          insight: summaryNode?.insight ?? null,
          dir: nodeDir,
          rootDir: root,
          svgName,
          svgPath: `/extracted/${svgName}`,
          interpretedSvgName: `${sanitize(request.extractionName ?? extractionName)}-${sanitize(requestNode.name)}-${requestNode.id.replace(/:/g, "-")}-interpreted.svg`,
          interpretedSvgPath: `/extracted/${sanitize(request.extractionName ?? extractionName)}-${sanitize(requestNode.name)}-${requestNode.id.replace(/:/g, "-")}-interpreted.svg`
        });
      }
    }

    const deduped = new Map();
    for (const item of items.sort((a, b) => b.extractedAt.localeCompare(a.extractedAt))) {
      const signature = `${item.fileKey}::${item.nodeId}`;
      if (!deduped.has(signature)) {
        deduped.set(signature, item);
      }
    }

    return Array.from(deduped.values()).sort((a, b) => b.extractedAt.localeCompare(a.extractedAt));
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
      const screenshotPath = path.resolve(item.dir, "screenshot.json");
      const screenshot = await readJson(screenshotPath);
      const screenshotSvg = buildScreenshotSvg(screenshot);
      await fs.writeFile(
        path.resolve(staticDir, item.svgName),
        screenshotSvg ?? buildFallbackCardSvg(item),
        "utf-8"
      );
    }

    await fs.writeFile(
      path.resolve(staticDir, item.interpretedSvgName),
      buildInterpretedPreviewSvg(item),
      "utf-8"
    );
  }

  const outputItems = items.map((item) => ({
    slug: item.slug,
    title: item.title,
    nodeName: item.nodeName,
    nodeType: item.nodeType,
    promotionStatus: item.promotionStatus,
    promotedAt: item.promotedAt,
    isFigmaComponent: item.isFigmaComponent,
    componentRole: item.componentRole,
    mainComponentName: item.mainComponentName,
    variantProperties: item.variantProperties,
    component: item.component,
    figmaProperties: item.figmaProperties,
    figmaVariants: item.figmaVariants,
    figmaInstances: item.figmaInstances,
    properties: item.properties,
    nestedInstances: item.nestedInstances,
    resolvedStructure: item.resolvedStructure,
    semantics: item.semantics,
    metricsSummary: item.metricsSummary,
    insight: item.insight,
    fileKey: item.fileKey,
    nodeId: item.nodeId,
    extractedAt: item.extractedAt,
    dir: item.dir,
    svgPath: item.svgPath,
    interpretedSvgPath: item.interpretedSvgPath
  }));

  await fs.writeFile(extractedDataPath, `${JSON.stringify(outputItems, null, 2)}\n`, "utf-8");
  await fs.writeFile(path.resolve(docsDir, "extracted.mdx"), renderMdx(), "utf-8");
};

await main();
