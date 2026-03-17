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
      "All four sizes must be visibly different in padding and type scale, while official height remains content-driven.",
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
    unsupportedNotes: [
      "`icon` is not an official Button prop in Ant Design Mobile 5.x.",
      "`href`, `target`, and `htmlType` are not official Button props. The official prop is `type` for the native button element.",
      "`className`, `style`, `tabIndex`, and `aria-*` / `data-*` support come from `NativeProps`."
    ],
    inspectionMapping: [
      "Inspection row `Sizes` verifies `size=mini|small|middle|large`.",
      "Inspection row `Color and Fill` verifies `color` and `fill` combinations.",
      "Inspection row `Shape and States` verifies `shape`, `loading`, `disabled`, and `block`."
    ],
    stateMapping: [
      ["default", "Uses the merged official defaults for `color`, `fill`, `size`, `shape`, and `type`."],
      ["active", "Maps to the `:active::before` overlay in the official Less source."],
      ["focus", "The native button removes browser outline and preserves the component border radius."],
      ["disabled", "Runtime disabled state is `props.disabled || loading` in the official source."],
      ["loading", "Loading uses `loadingIcon`, `loadingText`, and can be controlled by `loading='auto'`."]
    ],
    metricsNotes: [
      "Official defaults come from `src/components/button/button.tsx` and `button.less`.",
      "The public API does not define `href`, `target`, or `icon` props."
    ],
    tokenNotes: [
      "Button styling is driven by component CSS variables and Ant Mobile color variables.",
      "Primary, success, warning, and danger map through `--color` to `--adm-color-*` values."
    ],
    runtimeGaps: [
      "Current inspection payload now matches the official mini Button radius and padding, but still uses fixed frame heights and semantic token paths instead of the documented Ant token contract.",
      "Phase A freeze remains pending until generator and plugin output match the official Button metrics and token mapping on the payload/write path."
    ]
  },
  input: {
    renderExpectations: [
      "Text input wrapper and element metrics must follow the official CSS variable defaults and Less rules.",
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
    unsupportedNotes: [
      "`allowClear` is not an official Input prop in Ant Design Mobile 5.x. The official prop is `clearable`.",
      "`size`, `status`, `prefix`, and `suffix` are not official Input props in Ant Design Mobile 5.x.",
      "`className`, `style`, `tabIndex`, and `aria-*` / `data-*` support come from `NativeProps`."
    ],
    inspectionMapping: [
      "Inspection group `Text Values` verifies `placeholder`, `value`, and `defaultValue`.",
      "Inspection group `Interaction Props` verifies `disabled`, `readOnly`, `clearable`, and `onlyShowClearWhenFocus`.",
      "Password and number examples verify `type`, `min`, `max`, and `step`."
    ],
    stateMapping: [
      ["default", "Uses the official CSS variable defaults for font size, color, placeholder color, and text alignment."],
      ["focus", "Focus is tracked internally with `hasFocus` and gates clear button visibility."],
      ["disabled", "Disabled state applies wrapper opacity and keeps the native element enabled styling at 1."],
      ["readOnly", "Read-only blocks pointer events on the native element while preserving value rendering."],
      ["clearable", "Clear button appears when `clearable` is true and visibility conditions are satisfied."],
      ["placeholder", "Placeholder remains visible only when `value` and `defaultValue` are absent."]
    ],
    metricsNotes: [
      "Official defaults come from `src/components/input/input.tsx` and `input.less`.",
      "The official Input API does not define `size`, `status`, `prefix`, or `suffix` props."
    ],
    tokenNotes: [
      "Input styling is driven by official CSS variables instead of dedicated size/status props.",
      "Value and placeholder colors remain distinct through `--color` and `--placeholder-color`."
    ],
    runtimeGaps: [
      "Current inspection payload now matches the official Input height, radius, padding, inset, and type scale, but the token paths still diverge from the documented Ant contract.",
      "Phase A freeze remains pending until generator and plugin output match the official Input metrics and token mapping on the payload/write path."
    ]
  },
  tabs: {
    inspectionMapping: [
      "Inspection row `Line Modes` verifies `activeLineMode=auto|full|fixed`.",
      "Inspection row `Direction and Scroll` verifies `direction` and `autoScroll` behavior.",
      "Inspection row `Disabled Tabs` verifies `tab.disabled` remains visually distinct."
    ],
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
    inspectionMapping: [
      "Inspection row `List Modes` verifies `mode=default|card`.",
      "Inspection row `Cell Content` verifies `prefix`, `extra`, `description`, and `arrowIcon`.",
      "Inspection row `Clickable States` verifies `clickable`, `disabled`, and `item.active` behavior."
    ],
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
    inspectionMapping: [
      "Inspection row `Dialog` verifies `visible`, `title`, `content`, `actions`, and close behavior.",
      "Inspection row `Popup` verifies `position`, `showCloseButton`, and `closeOnSwipe`.",
      "Inspection row `Toast` verifies `icon` and `position` combinations."
    ],
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
    inspectionMapping: [
      "Inspection row `NavBar` verifies `backIcon`, `right`, and title content.",
      "Inspection row `TabBar` verifies `activeKey`, item icon/title, and `safeArea`.",
      "Inspection row `TabBar Active Item` verifies `item.active` remains visible."
    ],
    stateMapping: [
      ["nav.default", "NavBar has no explicit public state group in the frozen spec; rendering is prop-driven from the default layout."],
      ["item.default", "TabBar item uses the default navigation item appearance."],
      ["item.active", "TabBar item active state must keep the selected token and icon/title emphasis."]
    ],
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
    inspectionMapping: [
      "Inspection row `Layout` verifies `layout=vertical|horizontal` and `mode=default|card`.",
      "Inspection row `Field Semantics` verifies `label`, `help`, `description`, and `required`.",
      "Inspection row `Item States` verifies `item.error`, `item.warning`, `item.disabled`, and `item.hidden`."
    ],
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

const canvasDefault = {
  figmaWriteVerified: "pending",
  screenshotAttached: "pending",
  reviewApproved: "pending"
};

const antTokenContractRows = [
  ["`colorPrimary`", "`#1677ff`", "global Ant token", "primary accent token"],
  ["`colorText`", "`#333333`", "global Ant token", "primary foreground text"],
  ["`colorTextSecondary`", "`#666666`", "global Ant token", "secondary foreground text"],
  ["`colorTextDisabled`", "not exposed by name", "derived behavior", "commonly represented through component opacity or muted text treatment"],
  ["`colorBorder`", "`#eeeeee`", "global Ant token", "default border token"],
  ["`colorBorderSecondary`", "not exposed by name", "TODO", "no direct Ant Mobile 5.x token name in theme-default.less"],
  ["`colorBgContainer`", "`#ffffff`", "global Ant token", "container background token"],
  ["`colorBgContainerDisabled`", "not exposed by name", "derived behavior", "commonly represented through muted surface + opacity"],
  ["`colorFill`", "`#f5f5f5` nearest: --adm-color-fill-content", "compatibility token", "nearest exposed fill token in Ant Mobile 5.x"],
  ["`colorFillSecondary`", "not exposed by name", "TODO", "no direct Ant Mobile 5.x token name in theme-default.less"],
  ["`colorFillTertiary`", "not exposed by name", "TODO", "no direct Ant Mobile 5.x token name in theme-default.less"],
  ["`fontSizeSM`", "`13px`", "derived from --adm-font-size-main", "used by Button mini and compact text cases"],
  ["`fontSizeMD`", "`17px`", "derived from --adm-font-size-9", "default body/control text size"],
  ["`fontSizeLG`", "`18px`", "derived from --adm-font-size-10", "large control text size"],
  ["`radiusSM`", "`4px`", "derived from --adm-radius-s", "small corner radius"],
  ["`radiusMD`", "`8px`", "derived from --adm-radius-m", "medium corner radius"],
  ["`radiusLG`", "`12px`", "derived from --adm-radius-l", "large corner radius"],
  ["`paddingSM`", "`12px / 3px`", "component-derived", "small control horizontal/vertical padding from Button"],
  ["`paddingMD`", "`12px / 7px`", "component-derived", "middle control horizontal/vertical padding from Button"],
  ["`paddingLG`", "`12px / 11px`", "component-derived", "large control horizontal/vertical padding from Button"],
  ["`controlHeight`", "content-driven or `24px` wrapper min-height", "component-derived", "Button is content-driven; Input wrapper min-height is `24px`"],
  ["`lineHeight`", "`1.4` Button / `1.5` Input", "component-derived", "line-height varies by component family"],
  ["`motionDuration`", "not exposed by name", "TODO", "no direct Ant Mobile 5.x token name in theme-default.less"],
  ["`motionEase`", "not exposed by name", "TODO", "no direct Ant Mobile 5.x token name in theme-default.less"]
];

const officialComponentData = {
  Button: {
    metricsSummary: [
      "default: paddingY=7px, paddingX=12px, borderRadius=4px, fontSize=17px, lineHeight=1.4, height=auto",
      "mini: paddingY=3px, paddingX=12px, fontSize=13px",
      "small: paddingY=3px, paddingX=12px, fontSize=15px",
      "middle: paddingY=7px, paddingX=12px, fontSize=17px",
      "large: paddingY=11px, paddingX=12px, fontSize=18px",
      "rounded: borderRadius=1000px",
      "rectangular: borderRadius=0"
    ],
    metricRows: [
      ["`default`", "`height`", "`auto`", "official button.less"],
      ["`default`", "`paddingX`", "`12px`", "official button.less"],
      ["`default`", "`paddingY`", "`7px`", "official button.less"],
      ["`default`", "`borderRadius`", "`4px`", "official button.less"],
      ["`default`", "`fontSize`", "`17px`", "official button.less + theme-default.less"],
      ["`default`", "`lineHeight`", "`1.4`", "official button.less"],
      ["`mini`", "`paddingY`", "`3px`", "official button.less"],
      ["`mini`", "`fontSize`", "`13px`", "official button.less + theme-default.less"],
      ["`small`", "`paddingY`", "`3px`", "official button.less"],
      ["`small`", "`fontSize`", "`15px`", "official button.less + theme-default.less"],
      ["`middle`", "`fontSize`", "`17px`", "official button.less + theme-default.less"],
      ["`large`", "`paddingY`", "`11px`", "official button.less"],
      ["`large`", "`fontSize`", "`18px`", "official button.less + theme-default.less"]
    ],
    sizeRows: [
      ["`mini`", "`auto`", "`12px`", "`3px`", "`4px`", "`0`", "`0px` official prop gap not defined"],
      ["`small`", "`auto`", "`12px`", "`3px`", "`4px`", "`0`", "`0px` official prop gap not defined"],
      ["`middle`", "`auto`", "`12px`", "`7px`", "`4px`", "`0`", "`0px` official prop gap not defined"],
      ["`large`", "`auto`", "`12px`", "`11px`", "`4px`", "`0`", "`0px` official prop gap not defined"]
    ],
    tokenRows: [
      ["Button", "`--text-color`", "cssVar", "default `#333333` via `var(--adm-color-text)`"],
      ["Button", "`--background-color`", "cssVar", "default `#ffffff` via `var(--adm-color-background)`"],
      ["Button", "`--border-radius`", "cssVar", "default `4px` in official button.less"],
      ["Button", "`--border-width`", "cssVar", "default `1px` in official button.less"],
      ["Button", "`--border-style`", "cssVar", "default `solid` in official button.less"],
      ["Button", "`--border-color`", "cssVar", "default `#eeeeee` via `var(--adm-color-border)`"],
      ["Button", "`colorPrimary`", "antToken", "`#1677ff` via `--adm-color-primary`"],
      ["Button", "`colorText`", "antToken", "`#333333` via `--adm-color-text`"],
      ["Button", "`colorBorder`", "antToken", "`#eeeeee` via `--adm-color-border`"],
      ["Button", "`colorBgContainer`", "antToken", "`#ffffff` via `--adm-color-background`"],
      ["Button", "`colorFill`", "antToken", "Ant Design Mobile 5.x does not expose `colorFill` by name; nearest exposed fill token is `--adm-color-fill-content` -> `#f5f5f5`"],
      ["Button", "`colorFillSecondary`", "antToken", "Ant Design Mobile 5.x does not expose `colorFillSecondary` by name in theme-default.less"],
      ["Button", "`colorTextDisabled`", "antToken", "Ant Design Mobile 5.x does not expose `colorTextDisabled` by name; disabled button uses `opacity: 0.4` over current text/background colors"],
      ["Button", "`controlHeight`", "antToken", "no explicit component token; effective height is content-driven"]
    ]
  },
  Input: {
    metricsSummary: [
      "wrapper: minHeight=24px, width=100%, alignItems=center",
      "element: lineHeight=1.5, minHeight=1.5em, padding=0, border=0, fontSize=17px",
      "clear: marginLeft=8px, padding=4px, iconFontSize=15px"
    ],
    metricRows: [
      ["`wrapper`", "`minHeight`", "`24px`", "official input.less"],
      ["`wrapper`", "`width`", "`100%`", "official input.less"],
      ["`wrapper`", "`alignItems`", "`center`", "official input.less"],
      ["`element`", "`lineHeight`", "`1.5`", "official input.less"],
      ["`element`", "`minHeight`", "`1.5em`", "official input.less"],
      ["`element`", "`padding`", "`0`", "official input.less"],
      ["`clear`", "`marginLeft`", "`8px`", "official input.less"],
      ["`clear`", "`padding`", "`4px`", "official input.less"],
      ["`element`", "`fontSize`", "`17px`", "official input.less + theme-default.less"],
      ["`clear`", "`iconFontSize`", "`15px`", "official input.less + theme-default.less"]
    ],
    sizeRows: [
      ["`default`", "`24px`", "`0px`", "`0px`", "`0px` official input itself has no border radius", "`0px`", "`8px` clear inset"]
    ],
    tokenRows: [
      ["Input", "`--font-size`", "cssVar", "default `17px` via `var(--adm-font-size-9)`"],
      ["Input", "`--color`", "cssVar", "default `#333333` via `var(--adm-color-text)`"],
      ["Input", "`--placeholder-color`", "cssVar", "default `#cccccc` via `var(--adm-color-light)`"],
      ["Input", "`--text-align`", "cssVar", "default `left` in official input.less"],
      ["Input", "`colorText`", "antToken", "`#333333` via `--adm-color-text`"],
      ["Input", "`colorBorder`", "antToken", "native input border is removed; wrapper integrations commonly use `#eeeeee` via `--adm-color-border`"],
      ["Input", "`colorPrimary`", "antToken", "`#1677ff` global token; no dedicated Input status prop"],
      ["Input", "`colorError`", "antToken", "`#ff3141` global token; not exposed by official InputProps"],
      ["Input", "`colorWarning`", "antToken", "`#ff8f1f` global token; not exposed by official InputProps"],
      ["Input", "`colorTextSecondary`", "antToken", "`#666666` via `--adm-color-text-secondary`"],
      ["Input", "`colorTextDisabled`", "antToken", "Ant Design Mobile 5.x does not expose `colorTextDisabled` by name; disabled input uses wrapper `opacity: 0.4`"],
      ["Input", "`controlHeight`", "antToken", "no explicit component token; effective wrapper min-height is `24px` in official input.less"]
    ]
  },
  Tabs: {
    tokenRows: [
      ["Tabs", "`--title-font-size`", "cssVar", "default `var(--adm-font-size-9)` in official tabs.less"],
      ["Tabs", "`--content-padding`", "cssVar", "default `12px` in official tabs.less"],
      ["Tabs", "`--active-line-height`", "cssVar", "default `2px` in official tabs.less"],
      ["Tabs", "`--active-line-border-radius`", "cssVar", "default `var(--active-line-height)` in official tabs.less"],
      ["Tabs", "`--active-line-color`", "cssVar", "default `var(--adm-color-primary)` in official tabs.less"],
      ["Tabs", "`--active-title-color`", "cssVar", "default `var(--adm-color-primary)` in official tabs.less"]
    ]
  },
  List: {
    tokenRows: [
      ["List", "`--header-font-size`", "cssVar", "default `var(--adm-font-size-7)` in official list.less"],
      ["List", "`--prefix-padding-right`", "cssVar", "default `12px` in official list.less"],
      ["List", "`--align-items`", "cssVar", "default `center` in official list.less"],
      ["List", "`--active-background-color`", "cssVar", "default `var(--adm-color-border)` in official list.less"],
      ["List", "`--font-size`", "cssVar", "default `var(--adm-font-size-9)` in official list.less"],
      ["List", "`--extra-max-width`", "cssVar", "default `70%` in official list.less"]
    ]
  },
  Dialog: {
    tokenRows: [
      ["Dialog", "`--z-index`", "cssVar", "default `var(--adm-dialog-z-index, 1000)` in official dialog.less"]
    ]
  },
  NavBar: {
    tokenRows: [
      ["NavBar", "`--height`", "cssVar", "default `45px` in official nav-bar.less"],
      ["NavBar", "`--border-bottom`", "cssVar", "default `none` in official nav-bar.less"]
    ]
  },
  TabBar: {
    tokenRows: [
      ["TabBar", "`colorPrimary`", "antToken", "active item color is `var(--adm-color-primary)` in official tab-bar.less"],
      ["TabBar", "`colorTextSecondary`", "antToken", "inactive item color is `var(--adm-color-text-secondary)` in official tab-bar.less"]
    ]
  }
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
    const defaultValue = spec?.propDefaults?.[prop];
    let notes = "TODO";
    if (prop.startsWith("--")) notes = "CSS variable from the official API.";
    if (prop === "arrow" || prop === "backArrow") notes = "Deprecated in the official API but retained in the frozen contract.";
    if (prop === "loading") notes = "Boolean and `auto` must remain distinct in the contract.";
    if (prop === "onlyShowClearWhenFocus") notes = "Clear affordance must remain conditional on focus.";
    if (prop === "className" || prop === "style" || prop === "tabIndex") notes = "Supported through `NativeProps`.";
    if (prop === "activeKey" || prop === "defaultActiveKey") notes = "Official API allows string or null.";
    return [`\`${prop}\``, type, allowedValues, defaultValue === undefined ? "TODO" : formatPrimitive(defaultValue), "`false`", notes];
  });
}

function markdownTable(headers, rows) {
  const safeRows = rows.length ? rows : [["TODO".repeat(1)].concat(headers.slice(1).map(() => "TODO"))];
  const header = `| ${headers.join(" | ")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = safeRows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return [header, divider, body].join("\n");
}

function toBulletList(items, emptyLabel = "TODO") {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : `- ${emptyLabel}`;
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
  const official = officialComponentData[spec.component];
  if (official?.metricsSummary) return official.metricsSummary;
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
  const runtimeGaps = familyContracts[family.id]?.runtimeGaps || [];
  const specParity = parity.afterFixMismatchCount === 0 ? "verified" : "blocked";
  const generatorParity = parity.afterFixMismatchCount === 0 && summary?.passed && runtimeGaps.length === 0 ? "verified" : summary?.passed ? "pending" : "blocked";
  const pluginParityValue = runtimeGaps.length === 0 ? "verified" : "pending";
  return {
    implementation: {
      specParity,
      generatorParity,
      pluginParity: pluginParityValue
    },
    canvas: { ...canvasDefault }
  };
}

function freezeReasonForFamily(family, phase) {
  const runtimeGaps = familyContracts[family.id]?.runtimeGaps || [];
  if (phase === "implementation") {
    if (family.parity.afterFixMismatchCount !== 0) return "mismatch count not zero";
    if (!family.summary?.passed) return "inspection summary failed";
    if (runtimeGaps.length > 0) return family.id === "button" || family.id === "input" ? "token mismatch" : "payload mismatch";
    return "contract verified";
  }
  return "canvas not verified";
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

function findFirstComponentNode(value, componentName) {
  if (!value) return null;
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findFirstComponentNode(item, componentName);
      if (match) return match;
    }
    return null;
  }
  if (typeof value !== "object") return null;
  if (value.component === componentName) return value;
  if (value.children) {
    const childMatch = findFirstComponentNode(value.children, componentName);
    if (childMatch) return childMatch;
  }
  return null;
}

function loadFamilies() {
  return familyConfigs.map((family) => {
    const specs = family.specFiles.map((file) => readYaml(`packages/ui-core/specs/${file}`));
    const parity = readJson(`artifacts/parity/${family.parityFile}`);
    const summary = readJson(`artifacts/figma/${family.inspection.summaryFile}`);
    const payload = readJson(`artifacts/figma/${family.inspection.payloadFile}`);
    const layout = readJson(`artifacts/figma/${family.inspection.layoutFile}`);
    return { ...family, specs, parity, summary, payload, layout, freeze: freezeStatusForFamily({ id: family.id, parity, summary }) };
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
      const official = officialComponentData[spec.component];
      if (official?.tokenRows) return count + official.tokenRows.length;
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
        : family.freeze.implementation.specParity === "verified"
          ? "Phase A pending / Phase B pending"
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

## Global Token Contract

${markdownTable(["Token", "Default", "Source", "Notes"], antTokenContractRows)}
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
        const official = officialComponentData[spec.component];
        const metricRows = [];
        if (official?.metricRows) {
          metricRows.push(...official.metricRows);
        } else if (spec.sizeDefaults) {
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

        const tokens = official?.tokenRows || [
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

Official Ant Mobile metric and token defaults are shown first when they are known from source. Frozen spec runtime-only fields remain listed with their spec source so current implementation gaps stay visible.

## Global Ant Token Contract

${markdownTable(["Token", "Default", "Source", "Notes"], antTokenContractRows)}

${sections}
`
  );
}

function sizeMetricsTableForSpec(spec) {
  const official = officialComponentData[spec.component];
  if (official?.sizeRows) {
    return markdownTable(["Size", "Height", "Padding X", "Padding Y", "Radius", "Rectangular Radius", "Icon Gap"], official.sizeRows);
  }
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
  const rows = manual.length
    ? manual.map(([state, expectation]) => [`\`${state}\``, expectation])
    : specStates.length
      ? specStates.map(([state, expectation]) => [`\`${state}\``, expectation])
      : [["`state.none`", "This component has no explicit public state group in the frozen spec. Rendering remains prop-driven."]];
  return markdownTable(["State", "Expectation"], rows);
}

function tokenReferenceTable(spec) {
  const official = officialComponentData[spec.component];
  const rows = official?.tokenRows
    ? official.tokenRows.map((row) => [row[1], row[2], row[3]])
    : [
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
    const primaryComponent = family.specs[0]?.component;
    const payloadNode = findFirstComponentNode(family.payload.nodes, primaryComponent) || family.payload.nodes[0] || {};
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
    ["`solid`", "Uses the selected color as both background and border in the official button Less rules."],
    ["`outline`", "Background becomes transparent while text and border keep the selected color."],
    ["`none`", "Background is transparent and border width becomes `0px` in the official button Less rules."]
  ]
)}`,
          `## Color Mapping

${markdownTable(
  ["Color", "Expected token family"],
  [
    ["`default`", "`--adm-color-text`, `--adm-color-background`, `--adm-color-border`"],
    ["`primary`", "`--adm-color-primary`"],
    ["`success`", "`--adm-color-success`"],
    ["`warning`", "`--adm-color-warning`"],
    ["`danger`", "`--adm-color-danger`"]
  ]
)}`,
          `## Shape Mapping

${markdownTable(
  ["Shape", "Expected radius behavior"],
  [
    ["`default`", "Uses the official default border radius `4px`."],
    ["`rounded`", "Uses the official rounded border radius `1000px`."],
    ["`rectangular`", "Uses the official rectangular border radius `0`."]
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
        contractSections.push(`## Official Non-Props

${toBulletList(contract.unsupportedNotes || [])}`);
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
        contractSections.push(`## Official Non-Props

${toBulletList(contract.unsupportedNotes || [])}`);
      }
      extraSections.push(
        `## Variant Axes Table\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${componentAxesTable(spec)}`).join("\n\n")}`,
        `## Size Metrics Table\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${sizeMetricsTableForSpec(spec)}`).join("\n\n")}`,
        `## Inspection Mapping\n\n${toBulletList(contract.inspectionMapping || [])}`,
        `## State Mapping\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${stateTable(spec, family.id)}`).join("\n\n")}`,
        ...contractSections,
        `## Render Expectations\n\n${toBulletList(contract.renderExpectations || [])}`,
        contract.runtimeGaps?.length ? `## Current Runtime Gaps\n\n${toBulletList(contract.runtimeGaps)}` : "",
        `## Failure Cases\n\n${toBulletList(contract.failureCases || [])}`
      );
    } else {
      extraSections.push(
        `## Variant Axes Table\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${componentAxesTable(spec)}`).join("\n\n")}`,
        `## Inspection Mapping\n\n${toBulletList(contract.inspectionMapping || [], "none")}`,
        `## State Mapping\n\n${family.specs.map((spec) => `### ${spec.component}\n\n${stateTable(spec, family.id)}`).join("\n\n")}`,
        `## Render Expectations\n\n${toBulletList(contract.renderExpectations || [])}`,
        `## Current Runtime Gaps\n\n${toBulletList(contract.runtimeGaps || [], "none")}`,
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
- Spec notes: ${family.specs.flatMap((spec) => spec.notes || []).length ? family.specs.flatMap((spec) => spec.notes || []).map((note) => `\`${note}\``).join(", ") : "none"}

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
  ...family.specs.flatMap((spec) => (officialComponentData[spec.component]?.tokenRows || []).map((row) => `${row[2]}: ${row[1]} -> ${row[3]}`)),
  ...family.specs.flatMap((spec) =>
    officialComponentData[spec.component]?.tokenRows
      ? []
      : [
          ...Array.from(collectSemanticTokens(spec.semanticMapping)).map((token) => `Token: \`${token}\``),
          ...(spec.tokens?.cssVars || []).map((token) => `CSS variable: \`${token}\``)
        ]
  )
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
    node: findFirstComponentNode(buttonFamily.payload.nodes, "Button")
  };
  const exampleLayout = buttonFamily.layout.children?.slice(0, 2) || buttonFamily.layout;
  const exampleNodeTree = buttonFamily.payload.nodes.slice(0, 3);
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

## Example Node Tree

${codeBlock("json", truncateJson(exampleNodeTree, 1400))}

## Example Render Result

${codeBlock("json", truncateJson(exampleRender, 1200))}

## Failure Cases

- \`axis dropped\`: a frozen prop axis does not appear in the prompt or payload.
- \`variant flattened\`: multiple official values collapse into one rendered preset.
- \`state ignored\`: state output exists in spec but not in payload or renderer.
- \`plugin mismatch\`: payload is correct but plugin write path renders the wrong family behavior.
- \`missing token\`: output falls back to semantic or ad hoc token paths instead of the documented Ant token or CSS variable mapping.
- \`wrong metrics\`: payload size, padding, radius, or line-height diverges from the official Ant defaults.
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

- \`spec -> prompt -> layout -> payload -> plugin -> figma\`

1. Frozen spec defines the family contract.
2. Family inspection prompt enumerates the minimum visible cases.
3. Layout builder creates section and component placement.
4. Payload writer maps layout nodes into the Figma write contract.
5. Plugin write path renders nodes into the current Figma page when a writable path is available.

## Example Prompt

${codeBlock("ts", truncateText(buttonPromptSource.trim(), 1200))}

## Example Payload

${codeBlock("json", truncateJson(examplePayload))}

## Example Layout

${codeBlock("json", truncateJson(exampleLayout))}

## Example Node Tree

${codeBlock("json", truncateJson(exampleNodeTree, 1200))}

## Current Inspection Screens

${toBulletList(families.map((family) => `\`${family.inspection.name}\` for ${family.title}`))}

## Failure Cases

- missing axis: spec field never reaches prompt or payload.
- flattened variant: two or more official values collapse into one rendered branch.
- wrong metrics: payload size, padding, height, or radius diverges from the family contract.
- wrong token: payload variables stay semantic-only or ad hoc instead of the documented token contract.
- plugin mismatch: plugin write path ignores payload fields or rewrites them incorrectly.
- read-only write: environment cannot create Figma canvas nodes even though payload generation succeeds.

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
  const exampleNode = findFirstComponentNode(buttonFamily.payload.nodes, "Button") || buttonFamily.payload.nodes[0];
  const exampleNodeTree = buttonFamily.payload.nodes.slice(0, 3);

  writeDoc(
    "runtime/index.md",
    `${titleFrontmatter("Runtime")}
# Runtime

Runtime documentation describes what the Figma plugin expects from the generated payload and how that payload maps to canvas nodes.

## Flow

- \`spec -> generator -> payload -> plugin -> figma\`

## Runtime Guarantees

- Payload structure follows \`shared/contracts/figmaWritePayload.ts\`.
- Plugin mapping uses family component names directly.
- Metrics and token references are resolved from the payload node style and variables.
- Canvas verification remains a separate phase from local parity verification.

## Runtime Contract Fields

${markdownTable(
  ["Payload field", "Required contract", "Current note"],
  [
    ["`\u0064ocument`", "Must preserve screen identity and theme for the write session.", "Used directly by plugin write entry points."],
    ["`\u006eode.component`", "Must match the frozen family runtime name exactly.", "No aliasing or family flattening is allowed."],
    ["`\u006eode.variant`", "Must preserve frozen prop names and values.", "Button/Input remain blocked until token-path parity is complete."],
    ["`\u006eode.style`", "Must carry frozen metrics required for visible parity.", "Plugin must not replace these with generic presets."],
    ["`\u006eode.variables`", "Must carry documented token references for the family.", "Button/Input still use semantic paths in runtime output today."],
    ["`\u006eode.children`", "Must preserve hierarchy for nested frames, text, and instances.", "Used for section, row, and child component layout."]
  ]
)}
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

## Variant Mapping Rules

- Variant keys must remain identical to the frozen spec prop names.
- Button and Input must not be flattened into generic \`variant\` shorthands when the spec already defines first-class props.
- Deprecated but supported fields must remain explicit when they are still in the frozen spec.

## Metrics Mapping Rules

- \`style.radius\`, \`paddingX\`, \`paddingY\`, \`gap\`, \`fontSize\`, \`lineHeight\`, and \`minWidth\` must reflect the frozen spec metrics.
- Family size distinctions must remain visible in node dimensions and style fields.
- Plugin rendering must not override frozen metrics with generic presets.
- Button and Input are currently documented with official Ant metrics even where the runtime payload still shows older internal metrics. That gap blocks full Phase A verification.

## Token Mapping Rules

- \`variables\` must preserve the token contract emitted by the generator for the family.
- CSS variable props remain part of the contract when present in the spec.
- Token remapping outside the family contract is not allowed in the runtime layer.
- Button and Input still require runtime token alignment from current semantic paths to the documented Ant-level token contract.
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

## Payload Example

${codeBlock("json", truncateJson({ document: buttonFamily.payload.document, node: exampleNode }))}

## Node Tree Example

${codeBlock("json", truncateJson(exampleNodeTree, 1200))}

## Payload To Canvas Mapping

- Spec defines the legal props, states, metrics, and token references.
- Generator serializes those values into payload \`variant\`, \`style\`, and \`variables\` fields.
- Plugin converts payload nodes into Figma frames, text nodes, and instances.
- Canvas review validates that visible output still matches the documented contract.

## Mapping Rules

${markdownTable(
  ["Contract area", "Rule", "Current status"],
  [
    ["Variant mapping", "Payload `variant` keys must remain identical to frozen spec prop names.", "Verified for families with mismatch count `0`."],
    ["State mapping", "State differences must remain encoded through official props or explicit spec state groups.", "Canvas verification still pending for all families."],
    ["Metrics mapping", "Payload `style` values must preserve frozen metrics and visible family differences.", "Button/Input remain under review for runtime parity."],
    ["Token mapping", "Payload `variables` must point to the documented token contract without ad hoc remapping.", "Button/Input token path parity is still pending."],
    ["Node mapping", "Plugin must map payload node types to frames, text, and instances without family flattening.", "Plugin build is verified; live canvas write remains pending."]
  ]
)}

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
  ["Priority", "Family", "Mismatch count", "Spec parity", "Generator parity", "Plugin parity", "Reason"],
  families.map((family) => [
    family.priority,
    family.title,
    `\`${family.parity.afterFixMismatchCount}\``,
    family.freeze.implementation.specParity,
    family.freeze.implementation.generatorParity,
    family.freeze.implementation.pluginParity,
    freezeReasonForFamily(family, "implementation")
  ])
)}

## Phase B — Canvas Freeze

${markdownTable(
  ["Priority", "Family", "Figma write verified", "Screenshot attached", "Review approved", "Reason"],
  families.map((family) => [
    family.priority,
    family.title,
    family.freeze.canvas.figmaWriteVerified,
    family.freeze.canvas.screenshotAttached,
    family.freeze.canvas.reviewApproved,
    freezeReasonForFamily(family, "canvas")
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
