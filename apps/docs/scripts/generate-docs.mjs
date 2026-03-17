import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const repoRoot = path.resolve(process.cwd(), "..", "..");
const docsRoot = path.join(repoRoot, "apps/docs/docs");

const familyConfigs = [
  {
    id: "button",
    title: "Button",
    docPath: "families/button.md",
    baseline: "Ant Design Mobile ButtonProps",
    purpose: "Core action control baseline for Ant Design Mobile Button behavior.",
    specFiles: ["button.spec.yaml"],
    parityFile: "button.json",
    inspection: {
      name: "button-inspection",
      summaryFile: "button-inspection/summary.json",
      payloadFile: "button-inspection/mcp-payload.json",
      layoutFile: "button-inspection/layout.json"
    },
    priority: "P1"
  },
  {
    id: "input",
    title: "Input",
    docPath: "families/input.md",
    baseline: "Ant Design Mobile InputProps",
    purpose: "Core text entry baseline for Ant Design Mobile Input behavior.",
    specFiles: ["input.spec.yaml"],
    parityFile: "input.json",
    inspection: {
      name: "input-inspection",
      summaryFile: "input-inspection/summary.json",
      payloadFile: "input-inspection/mcp-payload.json",
      layoutFile: "input-inspection/layout.json"
    },
    priority: "P1"
  },
  {
    id: "tabs",
    title: "Tabs",
    docPath: "families/tabs.md",
    baseline: "Ant Design Mobile TabsProps and TabProps",
    purpose: "Primary segmented navigation baseline for Ant Design Mobile Tabs behavior.",
    specFiles: ["tabs.spec.yaml"],
    parityFile: "tabs.json",
    inspection: {
      name: "tabs-inspection",
      summaryFile: "tabs-inspection/summary.json",
      payloadFile: "tabs-inspection/mcp-payload.json",
      layoutFile: "tabs-inspection/layout.json"
    },
    priority: "P2"
  },
  {
    id: "list-cell",
    title: "List / Cell",
    docPath: "families/list-cell.md",
    baseline: "Ant Design Mobile ListProps and ListItemProps",
    purpose: "Structured list and row presentation baseline for Ant Design Mobile List and Cell behavior.",
    specFiles: ["list.spec.yaml", "cell.spec.yaml"],
    parityFile: "list-cell.json",
    inspection: {
      name: "list-cell-inspection",
      summaryFile: "list-cell-inspection/summary.json",
      payloadFile: "list-cell-inspection/mcp-payload.json",
      layoutFile: "list-cell-inspection/layout.json"
    },
    priority: "P2"
  },
  {
    id: "overlay",
    title: "Dialog / Popup / Toast",
    docPath: "families/dialog-popup-toast.md",
    baseline: "Ant Design Mobile DialogProps, PopupProps, and ToastShowProps",
    purpose: "Overlay and transient messaging baseline for Ant Design Mobile dialog, popup, and toast behaviors.",
    specFiles: ["dialog.spec.yaml", "popup.spec.yaml", "toast.spec.yaml"],
    parityFile: "overlay.json",
    inspection: {
      name: "overlay-inspection",
      summaryFile: "overlay-inspection/summary.json",
      payloadFile: "overlay-inspection/mcp-payload.json",
      layoutFile: "overlay-inspection/layout.json"
    },
    priority: "P2"
  },
  {
    id: "navigation",
    title: "NavBar / TabBar",
    docPath: "families/nav-bar-tab-bar.md",
    baseline: "Ant Design Mobile NavBarProps and TabBarProps",
    purpose: "Top and bottom navigation baseline for Ant Design Mobile navigation components.",
    specFiles: ["nav-bar.spec.yaml", "tab-bar.spec.yaml"],
    parityFile: "navigation.json",
    inspection: {
      name: "navigation-inspection",
      summaryFile: "navigation-inspection/summary.json",
      payloadFile: "navigation-inspection/mcp-payload.json",
      layoutFile: "navigation-inspection/layout.json"
    },
    priority: "P2"
  },
  {
    id: "form",
    title: "Form",
    docPath: "families/form.md",
    baseline: "Ant Design Mobile FormProps and FormItemProps",
    purpose: "Field grouping and validation baseline for Ant Design Mobile Form behavior.",
    specFiles: ["form.spec.yaml"],
    parityFile: "form.json",
    inspection: {
      name: "form-inspection",
      summaryFile: "form-inspection/summary.json",
      payloadFile: "form-inspection/mcp-payload.json",
      layoutFile: "form-inspection/layout.json"
    },
    priority: "P2"
  }
];

const familyContracts = {
  button: {
    renderExpectations: [
      "All four sizes must be visibly different in height, padding, radius, and type scale.",
      "`fill=solid`, `fill=outline`, and `fill=none` must preserve distinct background and border behavior.",
      "`shape=default`, `shape=rounded`, and `shape=rectangular` must produce visibly different corner treatment.",
      "`block=true` must expand the control to the full inspection row width.",
      "`loading=true` must keep button height stable and display the loading label or indicator state.",
      "`disabled=true` must suppress the interactive color set and render disabled tokens."
    ],
    failureCases: [
      "Size axis dropped or normalized to a single height.",
      "Fill axis flattened into one visual preset.",
      "Shape axis ignored and always rendered with the same radius.",
      "Block button rendered at content width instead of row width.",
      "Loading state rendered as plain text with no state token change.",
      "Disabled state still uses primary action colors."
    ],
    inspectionMapping: [
      "Inspection row `Sizes` verifies `size=mini|small|middle|large`.",
      "Inspection row `Color and Fill` verifies `color` and `fill` combinations.",
      "Inspection row `Shape and States` verifies `shape`, `loading`, `disabled`, and `block`."
    ],
    stateMapping: [
      ["default", "Base semantic mapping from `semanticMapping`."],
      ["hover", "Hover token set must only change supported color/border outputs."],
      ["pressed", "Pressed token set must show stronger border or darker fill."],
      ["focus", "Focus ring must be rendered through `container.focusRing` mapping."],
      ["disabled", "Disabled tokens override interactive colors and border styling."],
      ["loading", "Loading uses the state mapping for the current fill/color pair."]
    ],
    metricsNotes: [
      "Height, padding, radius, and icon gap come from `sizeDefaults`.",
      "Minimum width and center alignment come from `internalLayout`."
    ],
    tokenNotes: [
      "Semantic tokens are derived from `semanticMapping` by fill, color, and state.",
      "CSS variable props remain part of the contract and can override runtime styling."
    ]
  },
  input: {
    renderExpectations: [
      "Text input height, padding, and radius must follow the frozen `defaults` metrics.",
      "Placeholder text must render with placeholder tokens until `value` or `defaultValue` is present.",
      "`readOnly=true` must keep value visible while switching to read-only token treatment.",
      "`disabled=true` must suppress interactive styling and use muted field/value tokens.",
      "`clearable=true` must render an action affordance when clear behavior is available.",
      "`onlyShowClearWhenFocus=true` must keep the clear affordance hidden until focus."
    ],
    failureCases: [
      "Placeholder and value text rendered with the same token treatment.",
      "Disabled and read-only collapsed into one visual state.",
      "Clearable prop ignored in payload or plugin write path.",
      "Number/password `type` props dropped during mapping.",
      "Field padding changed independently from frozen defaults.",
      "Text alignment or vertical centering broken in the rendered node."
    ],
    inspectionMapping: [
      "Inspection group `Text Values` verifies `placeholder`, `value`, and `defaultValue`.",
      "Inspection group `Interaction Props` verifies `disabled`, `readOnly`, `clearable`, and `onlyShowClearWhenFocus`.",
      "Password and number examples verify `type`, `min`, `max`, and `step`."
    ],
    stateMapping: [
      ["default", "Uses `field.background`, `field.border`, `value.color`, and `placeholder.color` from `semanticMapping.default.default`."],
      ["disabled", "Uses the disabled mapping from `semanticMapping.default.disabled`."],
      ["readOnly", "Uses the read-only mapping from `semanticMapping.default.readOnly`."],
      ["focused", "Runtime focus must preserve the frozen field metrics and expose focus treatment when implemented."],
      ["clearable", "Runtime must reserve action slot behavior when `clearable=true`."],
      ["placeholder", "Placeholder remains visible only when `value` and `defaultValue` are absent."]
    ],
    metricsNotes: [
      "Control height, padding, and radius come from `defaults`.",
      "Minimum width and text alignment come from `internalLayout`."
    ],
    tokenNotes: [
      "Semantic tokens come from `semanticMapping.default` by state.",
      "Value and placeholder colors are distinct contract outputs and must not be merged."
    ]
  },
  tabs: {
    renderExpectations: [
      "Active line width and placement must follow `activeLineMode`.",
      "Disabled tabs must preserve layout while suppressing active styling.",
      "Content padding must remain aligned with `--content-padding` and metrics."
    ],
    failureCases: [
      "Tabs flattened into a single active line mode.",
      "Disabled tab still receives active line treatment.",
      "Direction axis ignored for layout and content order."
    ]
  },
  "list-cell": {
    renderExpectations: [
      "List mode and cell clickable states must remain visible in row treatment.",
      "Prefix, extra, description, and arrow areas must preserve spacing metrics."
    ],
    failureCases: [
      "Cell extra/prefix spacing collapsed.",
      "List card mode rendered like default mode.",
      "Deprecated `arrow` support removed from runtime."
    ]
  },
  overlay: {
    renderExpectations: [
      "Dialog, popup, and toast overlays must keep family-specific positions and action regions.",
      "Visible and hidden states must remain separate in payload and write logic."
    ],
    failureCases: [
      "Overlay families flattened into one generic modal.",
      "Popup position ignored.",
      "Toast icon axis dropped."
    ]
  },
  navigation: {
    renderExpectations: [
      "NavBar top layout and TabBar bottom layout must remain family-specific.",
      "Active navigation item state must remain visible for TabBar."
    ],
    failureCases: [
      "NavBar and TabBar routed through tabs presets.",
      "Back icon or safe area axes dropped.",
      "Item badge or icon mapping ignored."
    ]
  },
  form: {
    renderExpectations: [
      "Form layout, mode, and item state must remain explicit in payload and renderer.",
      "Help, extra, feedback, and required indicators must preserve the spec contract."
    ],
    failureCases: [
      "Horizontal/vertical layout collapsed into one presentation.",
      "Error or warning item states ignored.",
      "Form item props merged into generic list cells without form semantics."
    ]
  }
};

const pluginStatus = "verified";
const canvasDefault = {
  figmaWriteVerified: "pending",
  screenshotAttached: "pending",
  reviewApproved: "pending"
};

function readYaml(relativePath) {
  return yaml.load(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeDoc(relativePath, content) {
  const fullPath = path.join(docsRoot, relativePath);
  ensureDir(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content.trim() + "\n");
}

function titleFrontmatter(title) {
  return `---\ntitle: ${title}\n---\n`;
}

function asArray(value) {
  return Array.isArray(value) ? value : value == null ? [] : [value];
}

function formatPrimitive(value) {
  if (value === undefined || value === null || value === "") return "TODO";
  if (typeof value === "boolean") return value ? "`true`" : "`false`";
  if (typeof value === "number") return `\`${value}\``;
  return `\`${String(value)}\``;
}

function normalizeTypeAndValues(value) {
  if (Array.isArray(value)) {
    const allowedValues = value.map((item) => String(item));
    const primitiveTypes = new Set(
      value.map((item) => {
        if (item === "reactNode") return "reactNode";
        if (item === "function") return "function";
        if (typeof item === "boolean" || item === "true" || item === "false") return "boolean";
        if (typeof item === "number") return "number";
        return "string";
      })
    );
    return {
      type: Array.from(primitiveTypes).map((item) => `\`${item}\``).join(", "),
      allowedValues: allowedValues.map((item) => `\`${item}\``).join(", ")
    };
  }

  if (typeof value === "string") {
    return {
      type: `\`${value}\``,
      allowedValues: value === "string" || value === "number" || value === "object" || value === "array" || value === "function" || value === "reactNode" || value === "formInstance" || value === "any"
        ? "TODO"
        : `\`${value}\``
    };
  }

  if (typeof value === "number") {
    return { type: "`number`", allowedValues: `\`${value}\`` };
  }

  if (typeof value === "boolean") {
    return { type: "`boolean`", allowedValues: value ? "`true`" : "`false`" };
  }

  return { type: "`unknown`", allowedValues: "TODO" };
}

function propRows(spec, sectionName = "props") {
  const section = spec?.[sectionName] || {};
  return Object.entries(section).map(([prop, value]) => {
    const { type, allowedValues } = normalizeTypeAndValues(value);
    let notes = "TODO";
    if (prop.startsWith("--")) notes = "CSS variable from the official API.";
    if (prop === "arrow" || prop === "backArrow") notes = "Deprecated in the official API but retained in the frozen contract.";
    if (prop === "loading") notes = "Boolean and `auto` must remain distinct in the contract.";
    if (prop === "onlyShowClearWhenFocus") notes = "Clear affordance must remain conditional on focus.";
    return [`\`${prop}\``, type, allowedValues, "TODO", "`false`", notes];
  });
}

function markdownTable(headers, rows) {
  const safeRows = rows.length ? rows : [["TODO".repeat(1)].concat(headers.slice(1).map(() => "TODO"))];
  const header = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = safeRows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return [header, divider, body].join("\n");
}

function toBulletList(items) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- TODO";
}

function collectSemanticTokens(value, output = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSemanticTokens(item, output));
    return output;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectSemanticTokens(item, output));
    return output;
  }
  if (typeof value === "string" && value.startsWith("semantic.")) {
    output.add(value);
  }
  return output;
}

function summarizeMetrics(spec) {
  const lines = [];
  if (spec.sizeDefaults) {
    for (const [size, metrics] of Object.entries(spec.sizeDefaults)) {
      lines.push(`${size}: ${Object.entries(metrics).map(([k, v]) => `${k}=${v}`).join(", ")}`);
    }
  }
  if (spec.defaults) {
    lines.push(`defaults: ${Object.entries(spec.defaults).map(([k, v]) => `${k}=${v}`).join(", ")}`);
  }
  if (spec.metrics) {
    lines.push(...Object.entries(spec.metrics).map(([k, v]) => `${k}=${v}`));
  }
  if (spec.internalLayout) {
    lines.push(`internalLayout: ${Object.entries(spec.internalLayout).map(([k, v]) => `${k}=${v}`).join(", ")}`);
  }
  return lines;
}

function extractVariantAxes(spec) {
  const axes = new Set();
  if (spec.variants) Object.keys(spec.variants).forEach((key) => axes.add(key));
  if (spec.component === "Button") ["color", "fill", "size", "shape", "block", "loading", "disabled", "type"].forEach((key) => axes.add(key));
  if (spec.component === "Input") ["placeholder", "value", "defaultValue", "disabled", "readOnly", "clearable", "onlyShowClearWhenFocus", "type", "min", "max", "step"].forEach((key) => axes.add(key));
  return Array.from(axes);
}

function freezeStatusForFamily(family) {
  const parity = family.parity;
  const summary = family.summary;
  const specParity = parity.afterFixMismatchCount === 0 ? "verified" : "blocked";
  const generatorParity = summary?.passed ? "verified" : "blocked";
  const pluginParityValue = pluginStatus;
  return {
    implementation: {
      specParity,
      generatorParity,
      pluginParity: pluginParityValue
    },
    canvas: { ...canvasDefault }
  };
}

function codeBlock(language, value) {
  return `\`\`\`${language}\n${value}\n\`\`\``;
}

function truncateJson(value, maxLength = 1600) {
  const text = JSON.stringify(value, null, 2);
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}\n...`;
}

function truncateText(value, maxLength = 1600) {
  return value.length <= maxLength ? value : `${value.slice(0, maxLength)}\n...`;
}

function loadFamilies() {
  return familyConfigs.map((family) => {
    const specs = family.specFiles.map((file) => readYaml(`packages/ui-core/specs/${file}`));
    const parity = readJson(`artifacts/parity/${family.parityFile}`);
    const summary = readJson(`artifacts/figma/${family.inspection.summaryFile}`);
    const payload = readJson(`artifacts/figma/${family.inspection.payloadFile}`);
    const layout = readJson(`artifacts/figma/${family.inspection.layoutFile}`);
    return { ...family, specs, parity, summary, payload, layout, freeze: freezeStatusForFamily({ parity, summary }) };
  });
}

function familyStatusTable(family) {
  return markdownTable(
    ["Check", "Status"],
    [
      ["Spec parity", family.freeze.implementation.specParity],
      ["Generator parity", family.freeze.implementation.generatorParity],
      ["Plugin parity", family.freeze.implementation.pluginParity],
      ["Figma write verification", family.freeze.canvas.figmaWriteVerified],
      ["Screenshot attached", family.freeze.canvas.screenshotAttached],
      ["Review approved", family.freeze.canvas.reviewApproved]
    ]
  );
}

function buildSchemaIndex(families) {
  const rows = families.map((family) => {
    const propsCount = family.specs.reduce((count, spec) => {
      return count + Object.keys(spec.props || {}).length + Object.keys(spec.itemProps || {}).length + Object.keys(spec.tabProps || {}).length;
    }, 0);
    const axes = family.specs.flatMap((spec) => extractVariantAxes(spec));
    const states = family.specs.flatMap((spec) => Array.isArray(spec.states) ? spec.states : spec.states ? Object.entries(spec.states).flatMap(([group, values]) => [`${group}: ${asArray(values).join(", ")}`]) : []);
    const manualStates = familyContracts[family.id]?.stateMapping?.map(([state]) => state) || [];
    const metrics = family.specs.flatMap((spec) => summarizeMetrics(spec));
    const tokenCount = family.specs.reduce((count, spec) => {
      const cssVars = spec.tokens?.cssVars?.length || 0;
      const semantic = collectSemanticTokens(spec.semanticMapping).size;
      return count + cssVars + semantic;
    }, 0);
    return [
      family.title,
      String(propsCount),
      axes.length ? axes.map((axis) => `\`${axis}\``).join(", ") : "TODO",
      states.length ? states.map((state) => `\`${state}\``).join(", ") : manualStates.length ? manualStates.map((state) => `\`${state}\``).join(", ") : "TODO",
      metrics.length ? `${metrics.length} entries` : "TODO",
      String(tokenCount || 0),
      family.freeze.implementation.specParity === "verified" && family.freeze.implementation.generatorParity === "verified" && family.freeze.implementation.pluginParity === "verified"
        ? "Phase A verified / Phase B pending"
        : "blocked"
    ];
  });

  writeDoc(
    "schema/index.md",
    `${titleFrontmatter("Schema Index")}
# Schema Index

The frozen Ant-based specs are the source of truth for the current core runtime. Counts and axes below are generated from the live spec files and current parity artifacts.

${markdownTable(
  ["Family", "Props count", "Variant axes", "States", "Metrics defined", "Tokens defined", "Freeze status"],
  rows
)}
`
  );
}

function buildAxesAndProps(families) {
  const sections = families
    .map((family) => {
      const parts = [`## ${family.title}`];
      family.specs.forEach((spec) => {
        parts.push(`### ${spec.component}`);
        parts.push(markdownTable(["prop", "type", "allowed values", "default", "required", "notes"], propRows(spec, "props")));
        if (spec.itemProps) {
          parts.push(`### ${spec.component} itemProps`);
          parts.push(markdownTable(["prop", "type", "allowed values", "default", "required", "notes"], propRows(spec, "itemProps")));
        }
        if (spec.tabProps) {
          parts.push(`### ${spec.component} tabProps`);
          parts.push(markdownTable(["prop", "type", "allowed values", "default", "required", "notes"], propRows(spec, "tabProps")));
        }
      });
      return parts.join("\n\n");
    })
    .join("\n\n");

  writeDoc(
    "schema/axes-and-props.md",
    `${titleFrontmatter("Axes And Props")}
# Axes And Props

Every prop table in this document is generated from the frozen Ant-based spec files. If a doc and a spec diverge, the spec wins.

${sections}
`
  );
}

function buildMetricsAndTokens(families) {
  const sections = families
    .map((family) => {
      const parts = [`## ${family.title}`];
      family.specs.forEach((spec) => {
        const metricRows = [];
        if (spec.sizeDefaults) {
          for (const [size, metrics] of Object.entries(spec.sizeDefaults)) {
            for (const [metric, value] of Object.entries(metrics)) {
              metricRows.push([`\`${size}\``, `\`${metric}\``, formatPrimitive(value), "spec sizeDefaults"]);
            }
          }
        }
        if (spec.defaults) {
          for (const [metric, value] of Object.entries(spec.defaults)) {
            metricRows.push(["`default`", `\`${metric}\``, formatPrimitive(value), "spec defaults"]);
          }
        }
        if (spec.metrics) {
          for (const [metric, value] of Object.entries(spec.metrics)) {
            metricRows.push(["`default`", `\`${metric}\``, formatPrimitive(value), "spec metrics"]);
          }
        }
        if (spec.internalLayout) {
          for (const [metric, value] of Object.entries(spec.internalLayout)) {
            metricRows.push(["`internalLayout`", `\`${metric}\``, formatPrimitive(value), "spec internalLayout"]);
          }
        }

        const tokens = [
          ...(spec.tokens?.cssVars || []).map((token) => [spec.component, `\`${token}\``, "cssVar", "spec tokens.cssVars"]),
          ...Array.from(collectSemanticTokens(spec.semanticMapping)).map((token) => [spec.component, `\`${token}\``, "semantic", "spec semanticMapping"])
        ];

        parts.push(`### ${spec.component} Metrics`);
        parts.push(markdownTable(["Scope", "Metric", "Value", "Source"], metricRows.length ? metricRows : [["TODO", "TODO", "TODO", "TODO"]]));
        parts.push(`### ${spec.component} Tokens`);
        parts.push(markdownTable(["Scope", "Token", "Kind", "Source"], tokens.length ? tokens : [[spec.component, "TODO", "TODO", "TODO"]]));
      });
      return parts.join("\n\n");
    })
    .join("\n\n");

  writeDoc(
    "schema/metrics-and-tokens.md",
    `${titleFrontmatter("Metrics And Tokens")}
# Metrics And Tokens

Known metric values are taken directly from the frozen specs. Unknown values remain marked as \`TODO\` instead of being omitted.

${sections}
`
  );
}

function sizeMetricsTableForSpec(spec) {
  if (spec.sizeDefaults) {
    const rows = Object.entries(spec.sizeDefaults).map(([size, metrics]) => [
      `\`${size}\``,
      formatPrimitive(metrics.height),
      formatPrimitive(metrics.paddingX),
      formatPrimitive(metrics.paddingY),
      formatPrimitive(metrics.radius),
      formatPrimitive(metrics.radiusRectangular ?? "TODO"),
      formatPrimitive(metrics.iconGap ?? "TODO")
    ]);
    return markdownTable(["Size", "Height", "Padding X", "Padding Y", "Radius", "Rectangular Radius", "Icon Gap"], rows);
  }
  if (spec.defaults) {
    return markdownTable(
      ["Size", "Height", "Padding X", "Padding Y", "Radius", "Rectangular Radius", "Icon Gap"],
      [["`default`", formatPrimitive(spec.defaults.height), formatPrimitive(spec.defaults.paddingX), formatPrimitive(spec.defaults.paddingY), formatPrimitive(spec.defaults.radius), "TODO", "TODO"]]
    );
  }
  return markdownTable(["Size", "Height", "Padding X", "Padding Y", "Radius", "Rectangular Radius", "Icon Gap"], [["TODO", "TODO", "TODO", "TODO", "TODO", "TODO", "TODO"]]);
}

function componentAxesTable(spec) {
  const rows = Object.entries(spec.props || {}).map(([prop, value]) => {
    const { type, allowedValues } = normalizeTypeAndValues(value);
    let notes = "General prop contract.";
    if (prop.startsWith("--")) notes = "Official CSS variable contract.";
    if (prop === "loading") notes = "Supports boolean and `auto`.";
    if (prop === "onlyShowClearWhenFocus") notes = "Visibility of the clear affordance is gated by focus.";
    return [`\`${prop}\``, type, allowedValues, notes];
  });
  return markdownTable(["Axis / prop", "Type", "Allowed values", "Notes"], rows);
}

function stateTable(spec, familyId) {
  const manual = familyContracts[familyId]?.stateMapping || [];
  const specStates = Array.isArray(spec.states)
    ? spec.states.map((state) => [state, "Declared directly in the spec."])
    : spec.states
      ? Object.entries(spec.states).flatMap(([group, values]) => asArray(values).map((state) => [`${group}.${state}`, `Declared in spec state group \`${group}\`.`]))
      : [];
  const rows = manual.length ? manual.map(([state, expectation]) => [`\`${state}\``, expectation]) : specStates.map(([state, expectation]) => [`\`${state}\``, expectation]);
  return markdownTable(["State", "Expectation"], rows);
}

function tokenReferenceTable(spec) {
  const rows = [
    ...(spec.tokens?.cssVars || []).map((token) => [`\`${token}\``, "cssVar", "Official CSS variable contract"]),
    ...Array.from(collectSemanticTokens(spec.semanticMapping)).map((token) => [`\`${token}\``, "semantic", "Semantic token referenced in the frozen spec"])
  ];
  return markdownTable(["Token", "Kind", "Notes"], rows.length ? rows : [["TODO", "TODO", "TODO"]]);
}

function buildFamilyDocs(families) {
  for (const family of families) {
    const specSections = family.specs.map((spec) => {
      const axesTable = componentAxesTable(spec);
      const states = stateTable(spec, family.id);
      const metricsList = summarizeMetrics(spec);
      const tokens = tokenReferenceTable(spec);

      return [
        `## ${spec.component}`,
        `### Props / Axes`,
        axesTable,
        `### States`,
        states,
        `### Metrics`,
        metricsList.length ? toBulletList(metricsList) : "- TODO",
        `### Tokens`,
        tokens
      ].join("\n\n");
    }).join("\n\n");

    const contract = familyContracts[family.id] || {};
    const payloadNode = family.payload.nodes.find((node) => node.component) || family.payload.nodes[0] || {};
    const layoutExample = family.layout.children?.slice(0, 2) || family.layout.sections?.slice(0, 2) || family.layout;

    const extraSections = [];
    if (family.id === "button" || family.id === "input") {
      const contractSections = [];
      if (family.id === "button") {
        contractSections.push(
          `## Fill Mapping

${markdownTable(
  ["Fill", "Expected render behavior"],
  [
    ["`solid`", "Background and border both use the semantic action/status fill for the selected color."],
    ["`outline`", "Background remains surface-driven while border and label use the selected color family."],
    ["`none`", "Background is transparent or surface-neutral and emphasis stays on label color."]
  ]
)}`,
          `## Color Mapping

${markdownTable(
  ["Color", "Expected token family"],
  [
    ["`default`", "`semantic.surface.*`, `semantic.border.*`, `semantic.text.*`"],
    ["`primary`", "`semantic.action.primary*`, `semantic.action.onPrimary`"],
    ["`success`", "`semantic.status.success`, `semantic.action.onPrimary`"],
    ["`warning`", "`semantic.status.warning`, `semantic.text.primary`"],
    ["`danger`", "`semantic.status.critical`, `semantic.action.onPrimary`"]
  ]
)}`,
          `## Shape Mapping

${markdownTable(
  ["Shape", "Expected radius behavior"],
  [
    ["`default`", "Uses the base size radius."],
    ["`rounded`", "Uses the full rounded treatment from runtime shape mapping."],
    ["`rectangular`", "Uses `radiusRectangular` for the selected size."]
  ]
)}`,
          `## Block Behavior

- \`block=false\`: width follows label content with the family minimum width.
- \`block=true\`: width expands to the inspection row width while preserving size height metrics.`,
          `## Loading Behavior

- \`loading=true\`: runtime must show the loading state and preserve control height.
- \`loading=auto\`: official contract value remains valid even if runtime handling is environment-specific.
- \`loadingText\`: when present, replaces or supplements the visible label during loading.`,
          `## Disabled Behavior

- Disabled state must override interactive color tokens.
- Disabled state must keep layout metrics stable and remove active emphasis.`
        );
      }
      if (family.id === "input") {
        contractSections.push(
          `## Placeholder Behavior

- Placeholder renders only when \`value\` and \`defaultValue\` are absent.
- Placeholder uses \`placeholder.color\`, not the value color token.`,
          `## Focus State

- Focus is part of runtime expectations even though it is not a standalone prop in the frozen spec.
- Focus treatment must preserve the frozen metrics and action slot positioning.`,
          `## Status Mapping

- \`status\` is not part of the frozen Input spec.
- Any runtime status styling must not add a new public Input prop without a spec change.`,
          `## Clearable Mapping

- \`clearable=true\` enables the action slot for clear affordance rendering.
- \`onlyShowClearWhenFocus=true\` limits that affordance to the focused runtime path.`,
          `## ReadOnly Mapping

- \`readOnly=true\` keeps the value visible, applies the read-only token set, and suppresses edit affordances.`,
          `## Disabled Mapping

- \`disabled=true\` applies the disabled token set and suppresses interaction while preserving layout metrics.`
        );
      }
      extraSections.push(
        `## Variant Axes Table\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${componentAxesTable(spec)}`).join("\n\n")}`,
        `## Size Metrics Table\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${sizeMetricsTableForSpec(spec)}`).join("\n\n")}`,
        `## Inspection Mapping\n\n${toBulletList(contract.inspectionMapping || [])}`,
        `## State Mapping\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${stateTable(spec, family.id)}`).join("\n\n")}`,
        ...contractSections,
        `## Render Expectations\n\n${toBulletList(contract.renderExpectations || [])}`,
        `## Failure Cases\n\n${toBulletList(contract.failureCases || [])}`
      );
    } else {
      extraSections.push(
        `## Render Expectations\n\n${toBulletList(contract.renderExpectations || [])}`,
        `## Failure Cases\n\n${toBulletList(contract.failureCases || [])}`
      );
    }

    writeDoc(
      family.docPath,
      `${titleFrontmatter(family.title)}
# ${family.title}

## Purpose

${family.purpose}

## Source Baseline

- ${family.baseline}
- Spec files: ${family.specFiles.map((file) => `\`packages/ui-core/specs/${file}\``).join(", ")}
- Parity mismatch count: \`${family.parity.afterFixMismatchCount}\`

## Inspection Screen

- Screen name: \`${family.inspection.name}\`
- Summary artifact: \`artifacts/figma/${family.inspection.summaryFile}\`
- Payload artifact: \`artifacts/figma/${family.inspection.payloadFile}\`
- Layout artifact: \`artifacts/figma/${family.inspection.layoutFile}\`

## Freeze Status

${familyStatusTable(family)}

## Inspection Result

- Generation score: \`${family.summary.evaluationScore}\`
- Passed: \`${family.summary.passed}\`
- Node count: \`${family.summary.nodeCount}\`
- Component count: \`${family.summary.componentCount}\`
- Warnings: ${family.summary.warnings?.length ? family.summary.warnings.map((warning) => `\`${warning}\``).join(", ") : "none"}

## Metrics

${toBulletList((familyContracts[family.id]?.metricsNotes || []).concat(family.specs.flatMap((spec) => summarizeMetrics(spec))))}

## Token References

${toBulletList([
  ...(familyContracts[family.id]?.tokenNotes || []),
  ...family.specs.flatMap((spec) => Array.from(collectSemanticTokens(spec.semanticMapping)).map((token) => `Token: \`${token}\``)),
  ...family.specs.flatMap((spec) => (spec.tokens?.cssVars || []).map((token) => `CSS variable: \`${token}\``))
])}

${specSections}

${extraSections.join("\n\n")}

## Inspection Payload Example

${codeBlock("json", truncateJson({ document: family.payload.document, node: payloadNode }))}

## Inspection Layout Example

${codeBlock("json", truncateJson(layoutExample))}
`
    );
  }

  writeDoc(
    "families/index.md",
    `${titleFrontmatter("Families")}
# Families

The families below are the currently frozen runtime families documented from the live spec, parity, and inspection artifacts.

${markdownTable(
  ["Family", "Purpose", "Inspection screen", "Mismatch count", "Phase A", "Phase B"],
  families.map((family) => [
    family.title,
    family.purpose,
    `\`${family.inspection.name}\``,
    `\`${family.parity.afterFixMismatchCount}\``,
    family.freeze.implementation.specParity === "verified" && family.freeze.implementation.generatorParity === "verified" && family.freeze.implementation.pluginParity === "verified" ? "verified" : "blocked",
    family.freeze.canvas.figmaWriteVerified
  ])
)}
`
  );
}

function buildGenerationDocs(families) {
  const buttonFamily = families.find((family) => family.id === "button");
  const inputFamily = families.find((family) => family.id === "input");
  const buttonPromptSource = fs.readFileSync(path.join(repoRoot, "packages/figma-generator/src/examples/buttonFamily/createButtonInspectionPrompt.ts"), "utf8");
  const examplePayload = {
    document: buttonFamily.payload.document,
    node: buttonFamily.payload.nodes.find((node) => node.component === "Button")
  };
  const exampleLayout = buttonFamily.layout.children?.slice(0, 2) || buttonFamily.layout;
  const exampleRender = {
    button: buttonFamily.summary,
    input: inputFamily.summary
  };

  writeDoc(
    "generation/index.md",
    `${titleFrontmatter("Generation")}
# Generation

The generator reads frozen specs, emits family inspection prompts, resolves layout, and produces a Figma write payload. No family may bypass the spec contract.

## Generator Contract

- Spec is the only source for props, axes, states, metrics, and token references.
- Prompt examples must preserve family props without renaming or flattening.
- Layout must preserve visible distinctions for sizes, states, and family-specific variants.
- Payload must preserve family component names and prop keys as written in the frozen spec.

## Example Prompt

${codeBlock("ts", truncateText(buttonPromptSource.trim(), 1800))}

## Example Payload

${codeBlock("json", truncateJson(examplePayload))}

## Example Layout

${codeBlock("json", truncateJson(exampleLayout))}

## Example Render Result

${codeBlock("json", truncateJson(exampleRender, 1200))}

## Failure Cases

- \`axis dropped\`: a frozen prop axis does not appear in the prompt or payload.
- \`variant flattened\`: multiple official values collapse into one rendered preset.
- \`state ignored\`: state output exists in spec but not in payload or renderer.
- \`plugin mismatch\`: payload is correct but plugin write path renders the wrong family behavior.
- \`read-only write path\`: generation succeeds but the write environment cannot create nodes on canvas.

## Verification Checklist

- Confirm the inspection prompt uses only frozen family props.
- Confirm the layout shows every required family distinction.
- Confirm the payload node variants preserve the same prop names as the spec.
- Confirm parity artifact mismatch count is \`0\`.
- Confirm the inspection summary passes.
`
  );

  writeDoc(
    "generation/inspection-flow.md",
    `${titleFrontmatter("Inspection Flow")}
# Inspection Flow

Inspection screens are family validation outputs, not product screens.

## Flow

1. Frozen spec defines the family contract.
2. Family inspection prompt enumerates the minimum visible cases.
3. Layout builder creates section and component placement.
4. Payload writer maps layout nodes into the Figma write contract.
5. Plugin write path renders nodes into the current Figma page when a writable path is available.

## Current Inspection Screens

${toBulletList(families.map((family) => `\`${family.inspection.name}\` for ${family.title}`))}

## Failure Cases

- Axis present in spec but missing from the inspection prompt.
- Layout width or height normalized so size differences disappear.
- Payload variant keys renamed from the frozen spec.
- Plugin renderer ignores family state or metric fields.
- Write path blocked by a read-only environment.

## Verification Checklist

- Inspection summary passes for the family.
- Payload contains at least one node for the target component.
- Payload node variants preserve official field names.
- Plugin build succeeds before canvas verification.
- Canvas verification remains \`pending\` until live write is confirmed.
`
  );
}

function buildInspectionDocs(families) {
  writeDoc(
    "inspection/index.md",
    `${titleFrontmatter("Inspection")}
# Inspection

Inspection output is the runtime validation layer between frozen specs and Figma canvas output.

${markdownTable(
  ["Family", "Inspection screen", "Score", "Passed", "Warnings"],
  families.map((family) => [
    family.title,
    `\`${family.inspection.name}\``,
    `\`${family.summary.evaluationScore}\``,
    `\`${family.summary.passed}\``,
    family.summary.warnings?.length ? family.summary.warnings.join(", ") : "none"
  ])
)}
`
  );

  writeDoc(
    "inspection/screens.md",
    `${titleFrontmatter("Inspection Screens")}
# Inspection Screens

${families
  .map(
    (family) => `## ${family.title}

- Screen: \`${family.inspection.name}\`
- Summary: \`artifacts/figma/${family.inspection.summaryFile}\`
- Payload: \`artifacts/figma/${family.inspection.payloadFile}\`
- Layout: \`artifacts/figma/${family.inspection.layoutFile}\`
- Current status: ${family.summary.passed ? "verified" : "blocked"}`
  )
  .join("\n\n")}
`
  );
}

function buildRuntimeDocs(families) {
  const buttonFamily = families.find((family) => family.id === "button");
  const exampleNode = buttonFamily.payload.nodes.find((node) => node.component === "Button") || buttonFamily.payload.nodes[0];

  writeDoc(
    "runtime/index.md",
    `${titleFrontmatter("Runtime")}
# Runtime

Runtime documentation describes what the Figma plugin expects from the generated payload and how that payload maps to canvas nodes.

## Runtime Guarantees

- Payload structure follows \`shared/contracts/figmaWritePayload.ts\`.
- Plugin mapping uses family component names directly.
- Metrics and token references are resolved from the payload node style and variables.
- Canvas verification remains a separate phase from local parity verification.
`
  );

  writeDoc(
    "runtime/plugin-contract.md",
    `${titleFrontmatter("Plugin Contract")}
# Plugin Contract

The plugin expects a payload that conforms to the shared Figma write contract.

## Payload Structure Example

${codeBlock("json", truncateJson({ document: buttonFamily.payload.document, node: exampleNode }))}

## Node Tree Example

${codeBlock("json", truncateJson(buttonFamily.payload.nodes.slice(0, 3), 1400))}

## Instance Mapping Rules

- \`component\` must match the family runtime name exactly, such as \`Button\`, \`Input\`, \`Tabs\`, \`List\`, \`Cell\`, \`Dialog\`, \`Popup\`, \`Toast\`, \`NavBar\`, \`TabBar\`, or \`Form\`.
- \`variant\` keys must preserve frozen prop names without aliases or normalization.
- \`text\` is used as the visible label/value when the family expects textual content.

## State Mapping Rules

- State output must remain encoded through official family props or explicit state groups from the spec.
- Disabled, loading, active, hidden, visible, and item states must not be inferred from unrelated fields.
- Family-specific state groups such as \`tab\`, \`item\`, \`dialog\`, \`popup\`, and \`toast\` must remain separate.

## Metrics Mapping Rules

- \`style.radius\`, \`paddingX\`, \`paddingY\`, \`gap\`, \`fontSize\`, \`lineHeight\`, and \`minWidth\` must reflect the frozen spec metrics.
- Family size distinctions must remain visible in node dimensions and style fields.
- Plugin rendering must not override frozen metrics with generic presets.

## Token Mapping Rules

- \`variables\` should preserve semantic token paths emitted by the generator.
- CSS variable props remain part of the contract when present in the spec.
- Token remapping outside the family contract is not allowed in the runtime layer.
`
  );

  writeDoc(
    "runtime/figma-write-flow.md",
    `${titleFrontmatter("Figma Write Flow")}
# Figma Write Flow

## Flow

1. Generate the family inspection output.
2. Produce a Figma write payload that conforms to the shared contract.
3. Build the plugin runtime.
4. Trigger plugin write into the current document when a writable path is available.
5. Review the canvas output during Phase B freeze review.

## Current Limitations

- MCP write path is known to be read-only in the current environment.
- Local plugin build is verified, but live canvas verification is still pending for the frozen families.
- Screenshot attachment and final review approval remain part of Phase B and are not inferred from build success.

## Verification Checklist

- Payload generated successfully.
- Plugin build succeeded.
- Family parity mismatch count is \`0\`.
- Figma write verified only after live canvas write succeeds.
- Screenshot attached only after a real canvas capture exists.
`
  );
}

function buildFreezeReview(families) {
  writeDoc(
    "freeze-review/status.md",
    `${titleFrontmatter("Freeze Review Status")}
# Freeze Review Status

## Phase A — Implementation Freeze

${markdownTable(
  ["Priority", "Family", "Mismatch count", "Spec parity", "Generator parity", "Plugin parity"],
  families.map((family) => [
    family.priority,
    family.title,
    `\`${family.parity.afterFixMismatchCount}\``,
    family.freeze.implementation.specParity,
    family.freeze.implementation.generatorParity,
    family.freeze.implementation.pluginParity
  ])
)}

## Phase B — Canvas Freeze

${markdownTable(
  ["Priority", "Family", "Figma write verified", "Screenshot attached", "Review approved"],
  families.map((family) => [
    family.priority,
    family.title,
    family.freeze.canvas.figmaWriteVerified,
    family.freeze.canvas.screenshotAttached,
    family.freeze.canvas.reviewApproved
  ])
)}

## Status Terms

- \`verified\`: the required implementation or verification step is complete.
- \`pending\`: the path exists, but the live verification step has not been completed yet.
- \`blocked\`: the path failed or cannot proceed in the current environment.
`
  );
}

function buildCoreDocs() {
  writeDoc(
    "core/overview.md",
    `${titleFrontmatter("Core Overview")}
# Core Overview

This site is the internal source-of-truth documentation for the frozen core runtime.

## Core Rules

- Ant Design Mobile API is the source baseline for the current frozen families.
- Spec is the source of truth for props, states, metrics, and tokens.
- Generator and plugin must adapt to the frozen spec, not the reverse.
- Figma canvas is an output verification step, not a schema source.
`
  );

  writeDoc(
    "intro.md",
    `---
title: Miterlab AI Design System
slug: /
---

# Miterlab AI Design System

This documentation site records the current frozen core runtime state: family contracts, schema, generation flow, runtime expectations, and freeze review status.

## Current Coverage

- Button
- Input
- Tabs
- List / Cell
- Dialog / Popup / Toast
- NavBar / TabBar
- Form
`
  );
}

function main() {
  const families = loadFamilies();
  buildCoreDocs();
  buildSchemaIndex(families);
  buildAxesAndProps(families);
  buildMetricsAndTokens(families);
  buildFamilyDocs(families);
  buildGenerationDocs(families);
  buildInspectionDocs(families);
  buildRuntimeDocs(families);
  buildFreezeReview(families);
}

main();
