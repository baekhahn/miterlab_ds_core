import type { TaxonomyGroup } from "./taxonomy";

export const coreAxes = {
  size: ["sm", "md", "lg"],
  variant: ["default", "primary", "secondary", "ghost", "text", "outlined", "elevated", "subtle"],
  tone: ["default", "success", "warning", "danger", "info"],
  state: ["default", "hover", "pressed", "disabled", "focus", "selected", "error"]
} as const;

export interface ComponentRegistryEntry {
  name: string;
  taxonomy: TaxonomyGroup;
  kind: "primitive" | "component";
  specKey?: string;
  officialProps?: string[];
  supports: {
    size?: string[];
    variant?: string[];
    tone?: string[];
    state?: string[];
  };
  catalogSection: "content" | "form" | "filter" | "action" | "modal" | "list";
  catalogTitle: string;
  catalogSamples: Array<{
    type: string;
    label: string;
    props?: Record<string, unknown>;
    size?: "sm" | "md" | "lg";
    variant?: string;
    tone?: "default" | "success" | "warning" | "danger" | "info";
    state?: string;
    selected?: boolean;
    intent?: string;
  }>;
}

const sectionByTaxonomy: Record<TaxonomyGroup, ComponentRegistryEntry["catalogSection"]> = {
  typography: "content",
  form: "form",
  navigation: "filter",
  overlay: "modal",
  layout: "content",
  data: "list",
  feedback: "action"
};

const titleByTaxonomy: Record<TaxonomyGroup, string> = {
  typography: "Typography / Text",
  form: "Form / Controls",
  navigation: "Navigation / Selection",
  overlay: "Overlay / Presentation",
  layout: "Layout / Container",
  data: "Data Display",
  feedback: "Feedback / Status"
};

const entry = (config: Omit<ComponentRegistryEntry, "catalogSection" | "catalogTitle">): ComponentRegistryEntry => ({
  ...config,
  catalogSection: sectionByTaxonomy[config.taxonomy],
  catalogTitle: titleByTaxonomy[config.taxonomy]
});

const primitiveText = (
  name: string,
  label: string,
  intent?: string,
  taxonomy: TaxonomyGroup = "typography"
): ComponentRegistryEntry =>
  entry({
    name,
    taxonomy,
    kind: "primitive",
    supports: {},
    catalogSamples: [{ type: "text", label, ...(intent ? { intent } : {}) }]
  });

const specEntry = (config: {
  name: string;
  taxonomy: TaxonomyGroup;
  specKey: string;
  officialProps?: string[];
  supports: ComponentRegistryEntry["supports"];
  catalogSamples: ComponentRegistryEntry["catalogSamples"];
}): ComponentRegistryEntry =>
  entry({
    name: config.name,
    taxonomy: config.taxonomy,
    kind: "component",
    specKey: config.specKey,
    supports: config.supports,
    catalogSamples: config.catalogSamples
  });

export const componentRegistry: Record<string, ComponentRegistryEntry> = {
  Heading: primitiveText("Heading", "Heading / Title", "title"),
  Text: primitiveText("Text", "Body / Default product copy rhythm for lists and forms."),
  Label: specEntry({
    name: "Label",
    taxonomy: "typography",
    specKey: "label",
    supports: { size: ["sm", "md", "lg"], state: ["default", "disabled"] },
    catalogSamples: [{ type: "label", label: "Label / Field", size: "md" }]
  }),
  Caption: primitiveText("Caption", "Caption / Compact metadata copy."),
  HelperText: primitiveText("HelperText", "Helper text / Validation and guidance.", "helper-text"),

  Button: specEntry({
    name: "Button",
    taxonomy: "form",
    specKey: "button",
    officialProps: ["color", "fill", "size", "shape", "block", "loading", "loadingText", "loadingIcon", "disabled", "onClick", "type", "children"],
    supports: { size: ["mini", "small", "middle", "large"], state: ["default", "hover", "pressed", "disabled", "focus", "loading"] },
    catalogSamples: [
      { type: "button", label: "Button / primary / middle", props: { color: "primary", fill: "solid", size: "middle" }, intent: "primary-action" },
      { type: "button", label: "Button / default / outline", props: { color: "default", fill: "outline", size: "middle" }, intent: "secondary-action" },
      { type: "button", label: "Button / danger / none", props: { color: "danger", fill: "none", size: "middle" }, intent: "secondary-action" },
      { type: "button", label: "Button / block / large", props: { color: "primary", fill: "solid", size: "large", block: true }, intent: "primary-action" }
    ]
  }),
  IconButton: specEntry({
    name: "IconButton",
    taxonomy: "form",
    specKey: "icon-button",
    supports: { size: ["sm", "md", "lg"], variant: ["primary", "secondary", "ghost"], state: ["default", "hover", "pressed", "disabled", "focus"] },
    catalogSamples: [
      { type: "icon-button", label: "IconButton / Primary / sm", variant: "primary", size: "sm" },
      { type: "icon-button", label: "IconButton / Secondary / md", variant: "secondary", size: "md" },
      { type: "icon-button", label: "IconButton / Ghost / lg", variant: "ghost", size: "lg" }
    ]
  }),
  TextButton: specEntry({
    name: "TextButton",
    taxonomy: "form",
    specKey: "text-button",
    supports: { size: ["sm", "md"], variant: ["primary", "secondary", "danger"], state: ["default", "hover", "pressed", "disabled", "loading"] },
    catalogSamples: [
      { type: "text-button", label: "TextButton / Primary / sm", variant: "primary", size: "sm" },
      { type: "text-button", label: "TextButton / Secondary / md", variant: "secondary", size: "md" },
      { type: "text-button", label: "TextButton / Danger / md", variant: "danger", size: "md" }
    ]
  }),
  Input: specEntry({
    name: "Input",
    taxonomy: "form",
    specKey: "input",
    officialProps: ["value", "defaultValue", "placeholder", "disabled", "readOnly", "clearable", "onlyShowClearWhenFocus", "type", "min", "max", "step"],
    supports: {},
    catalogSamples: [
      { type: "input", label: "Input / placeholder", props: { placeholder: "Type here" }, intent: "text-input" },
      { type: "input", label: "Input / value", props: { value: "Current value" }, intent: "text-input" },
      { type: "input", label: "Input / readOnly", props: { value: "Read only", readOnly: true }, intent: "text-input" }
    ]
  }),
  Form: specEntry({
    name: "Form",
    taxonomy: "form",
    specKey: "form",
    officialProps: ["form", "initialValues", "name", "preserve", "validateMessages", "validateTrigger", "onFieldsChange", "onFinish", "onFinishFailed", "onValuesChange", "children", "footer", "mode", "layout"],
    supports: {},
    catalogSamples: [
      { type: "form", label: "Form / default", props: { mode: "default", layout: "vertical" } },
      { type: "form", label: "Form / card", props: { mode: "card", layout: "horizontal" } }
    ]
  }),
  TextField: specEntry({
    name: "TextField",
    taxonomy: "form",
    specKey: "text-field",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "focus", "disabled", "error"] },
    catalogSamples: [
      { type: "text-field", label: "TextField / sm", size: "sm" },
      { type: "text-field", label: "TextField / outlined / md", size: "md", variant: "outlined" },
      { type: "text-field", label: "TextField / lg / error", size: "lg", state: "error" }
    ]
  }),
  SearchField: specEntry({
    name: "SearchField",
    taxonomy: "form",
    specKey: "search-field",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "focus", "disabled", "error"] },
    catalogSamples: [
      { type: "search-field", label: "SearchField / sm", size: "sm" },
      { type: "search-field", label: "SearchField / md / focus", size: "md", state: "focus" },
      { type: "search-field", label: "SearchField / outlined / lg", size: "lg", variant: "outlined" }
    ]
  }),
  Textarea: specEntry({
    name: "Textarea",
    taxonomy: "form",
    specKey: "textarea",
    supports: { size: ["sm", "md", "lg"], state: ["default", "focus", "disabled", "error"] },
    catalogSamples: [
      { type: "textarea", label: "Textarea / sm", size: "sm" },
      { type: "textarea", label: "Textarea / md", size: "md" },
      { type: "textarea", label: "Textarea / lg / error", size: "lg", state: "error" }
    ]
  }),
  TextArea: specEntry({
    name: "TextArea",
    taxonomy: "form",
    specKey: "text-area",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "focus", "disabled", "error"] },
    catalogSamples: [
      { type: "text-area", label: "TextArea / sm", size: "sm" },
      { type: "text-area", label: "TextArea / outlined / md", size: "md", variant: "outlined" },
      { type: "text-area", label: "TextArea / lg / error", size: "lg", state: "error" }
    ]
  }),
  Select: specEntry({
    name: "Select",
    taxonomy: "form",
    specKey: "select",
    supports: { size: ["sm", "md", "lg"], state: ["default", "focus", "disabled", "error"] },
    catalogSamples: [
      { type: "select", label: "Select / sm", size: "sm" },
      { type: "select", label: "Select / md / focus", size: "md", state: "focus" },
      { type: "select", label: "Select / lg / disabled", size: "lg", state: "disabled" }
    ]
  }),
  CheckMark: specEntry({
    name: "CheckMark",
    taxonomy: "form",
    specKey: "check-mark",
    supports: { size: ["sm", "md", "lg"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "disabled", "selected"] },
    catalogSamples: [
      { type: "check-mark", label: "Check mark / sm", size: "sm", tone: "default", state: "selected" },
      { type: "check-mark", label: "Check mark / md", size: "md", tone: "success", state: "selected" },
      { type: "check-mark", label: "Check mark / lg", size: "lg", tone: "info", state: "selected" }
    ]
  }),
  Checkbox: specEntry({
    name: "Checkbox",
    taxonomy: "form",
    specKey: "checkbox",
    supports: { size: ["sm", "md", "lg"], variant: ["unchecked", "checked"], state: ["default", "hover", "disabled", "focus"] },
    catalogSamples: [
      { type: "checkbox", label: "Checkbox / sm", size: "sm", variant: "unchecked" },
      { type: "checkbox", label: "Checkbox / md checked", size: "md", variant: "checked" },
      { type: "checkbox", label: "Checkbox / lg disabled", size: "lg", variant: "checked", state: "disabled" }
    ]
  }),
  Radio: specEntry({
    name: "Radio",
    taxonomy: "form",
    specKey: "radio",
    supports: { size: ["sm", "md", "lg"], variant: ["unchecked", "checked"], state: ["default", "hover", "disabled", "focus"] },
    catalogSamples: [
      { type: "radio", label: "Radio / sm", size: "sm", variant: "unchecked" },
      { type: "radio", label: "Radio / md checked", size: "md", variant: "checked" },
      { type: "radio", label: "Radio / lg disabled", size: "lg", variant: "checked", state: "disabled" }
    ]
  }),
  Switch: specEntry({
    name: "Switch",
    taxonomy: "form",
    specKey: "switch",
    supports: { size: ["sm", "md", "lg"], variant: ["off", "on"], state: ["default", "hover", "disabled", "focus"] },
    catalogSamples: [
      { type: "switch", label: "Switch / sm", size: "sm", variant: "off" },
      { type: "switch", label: "Switch / md on", size: "md", variant: "on" },
      { type: "switch", label: "Switch / lg disabled", size: "lg", variant: "on", state: "disabled" }
    ]
  }),
  Slider: specEntry({
    name: "Slider",
    taxonomy: "form",
    specKey: "slider",
    supports: { size: ["sm", "md", "lg"], variant: ["single", "range"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "hover", "pressed", "disabled", "focus", "selected"] },
    catalogSamples: [
      { type: "slider", label: "Slider / single / sm", size: "sm", variant: "single" },
      { type: "slider", label: "Slider / range / md", size: "md", variant: "range" },
      { type: "slider", label: "Slider / single / lg", size: "lg", variant: "single", tone: "info" }
    ]
  }),
  DatePicker: specEntry({
    name: "DatePicker",
    taxonomy: "form",
    specKey: "date-picker",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "focus", "disabled", "error", "selected"] },
    catalogSamples: [
      { type: "date-picker", label: "DatePicker / sm", size: "sm" },
      { type: "date-picker", label: "DatePicker / md / selected", size: "md", state: "selected" },
      { type: "date-picker", label: "DatePicker / lg / error", size: "lg", state: "error" }
    ]
  }),
  TimePicker: specEntry({
    name: "TimePicker",
    taxonomy: "form",
    specKey: "time-picker",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "focus", "disabled", "error", "selected"] },
    catalogSamples: [
      { type: "time-picker", label: "TimePicker / sm", size: "sm" },
      { type: "time-picker", label: "TimePicker / md / selected", size: "md", state: "selected" },
      { type: "time-picker", label: "TimePicker / lg / error", size: "lg", state: "error" }
    ]
  }),
  Autocomplete: specEntry({
    name: "Autocomplete",
    taxonomy: "form",
    specKey: "autocomplete",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "async"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "focus", "disabled", "error", "selected"] },
    catalogSamples: [
      { type: "autocomplete", label: "Autocomplete / sm", size: "sm" },
      { type: "autocomplete", label: "Autocomplete / async / md", size: "md", variant: "async" },
      { type: "autocomplete", label: "Autocomplete / lg / selected", size: "lg", state: "selected" }
    ]
  }),
  FormField: specEntry({
    name: "FormField",
    taxonomy: "form",
    specKey: "form-field",
    supports: { size: ["sm", "md", "lg"], state: ["default", "error", "disabled"] },
    catalogSamples: [
      { type: "form-field", label: "FormField / sm", size: "sm" },
      { type: "form-field", label: "FormField / md", size: "md" },
      { type: "form-field", label: "FormField / lg / error", size: "lg", state: "error" }
    ]
  }),
  FilterButton: specEntry({
    name: "FilterButton",
    taxonomy: "form",
    specKey: "filter-button",
    supports: { size: ["sm", "md", "lg"], state: ["default", "hover", "disabled", "focus", "selected"] },
    catalogSamples: [
      { type: "filter-button", label: "FilterButton / sm", size: "sm", selected: false },
      { type: "filter-button", label: "FilterButton / md selected", size: "md", selected: true },
      { type: "filter-button", label: "FilterButton / lg", size: "lg", selected: false }
    ]
  }),
  SegmentedControl: specEntry({
    name: "SegmentedControl",
    taxonomy: "form",
    specKey: "segmented-control",
    supports: { size: ["sm", "md", "lg"], state: ["default", "hover", "selected", "disabled", "focus"] },
    catalogSamples: [
      { type: "segmented-control", label: "Segmented / sm", size: "sm", state: "selected" },
      { type: "segmented-control", label: "Segmented / md", size: "md", state: "selected" },
      { type: "segmented-control", label: "Segmented / lg", size: "lg", state: "selected" }
    ]
  }),
  Chip: specEntry({
    name: "Chip",
    taxonomy: "form",
    specKey: "chip",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "selected", "removable", "filter"], state: ["default", "hover", "disabled", "selected"] },
    catalogSamples: [
      { type: "chip", label: "Chip / default / sm", variant: "default", size: "sm" },
      { type: "chip", label: "Chip / selected / md", variant: "selected", size: "md" },
      { type: "chip", label: "Chip / removable / lg", variant: "removable", size: "lg" }
    ]
  }),
  FramedStyle: specEntry({
    name: "FramedStyle",
    taxonomy: "form",
    specKey: "framed-style",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined", "elevated"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "hover", "selected", "disabled"] },
    catalogSamples: [
      { type: "framed-style", label: "FramedStyle / default", size: "sm", variant: "default" },
      { type: "framed-style", label: "FramedStyle / outlined", size: "md", variant: "outlined" },
      { type: "framed-style", label: "FramedStyle / elevated", size: "lg", variant: "elevated" }
    ]
  }),

  Tab: specEntry({
    name: "Tab",
    taxonomy: "navigation",
    specKey: "tab",
    supports: { size: ["sm", "md", "lg"], variant: ["underline", "segment", "button"], state: ["default", "hover", "selected", "disabled", "focus"] },
    catalogSamples: [
      { type: "tab", label: "Tab / underline / sm", variant: "underline", size: "sm", state: "selected" },
      { type: "tab", label: "Tab / segment / md", variant: "segment", size: "md", state: "selected" },
      { type: "tab", label: "Tab / button / lg", variant: "button", size: "lg", state: "selected" }
    ]
  }),
  Tabs: specEntry({
    name: "Tabs",
    taxonomy: "navigation",
    specKey: "tabs",
    officialProps: ["activeKey", "defaultActiveKey", "activeLineMode", "stretch", "onChange", "direction", "autoScroll", "children"],
    supports: {},
    catalogSamples: [
      { type: "tabs", label: "Tabs / fixed", props: { activeLineMode: "fixed", activeKey: "tab-1" } },
      { type: "tabs", label: "Tabs / stretch", props: { stretch: true, activeKey: "tab-2" } }
    ]
  }),
  Pagination: specEntry({
    name: "Pagination",
    taxonomy: "navigation",
    specKey: "pagination",
    supports: { size: ["sm", "md", "lg"], state: ["default", "hover", "selected", "disabled"] },
    catalogSamples: [
      { type: "pagination", label: "Pagination / sm", size: "sm", state: "selected" },
      { type: "pagination", label: "Pagination / md", size: "md", state: "selected" },
      { type: "pagination", label: "Pagination / lg", size: "lg", state: "selected" }
    ]
  }),
  PaginationDots: specEntry({
    name: "PaginationDots",
    taxonomy: "navigation",
    specKey: "pagination-dots",
    supports: { size: ["sm", "md", "lg"], state: ["default", "selected"] },
    catalogSamples: [{ type: "pagination-dots", label: "PaginationDots / md", size: "md", state: "selected" }]
  }),
  PageCounter: specEntry({
    name: "PageCounter",
    taxonomy: "navigation",
    specKey: "page-counter",
    supports: { size: ["sm", "md", "lg"], state: ["default", "selected"] },
    catalogSamples: [{ type: "page-counter", label: "PageCounter / md", size: "md", state: "selected" }]
  }),
  BottomNavigation: specEntry({
    name: "BottomNavigation",
    taxonomy: "navigation",
    specKey: "bottom-navigation",
    supports: { size: ["sm", "md", "lg"], state: ["default", "selected", "disabled"] },
    catalogSamples: [{ type: "bottom-navigation", label: "BottomNavigation / md", size: "md", state: "selected" }]
  }),
  TopNavigation: specEntry({
    name: "TopNavigation",
    taxonomy: "navigation",
    specKey: "top-navigation",
    supports: { size: ["sm", "md", "lg"], state: ["default", "selected", "disabled"] },
    catalogSamples: [{ type: "top-navigation", label: "TopNavigation / md", size: "md", state: "selected" }]
  }),
  NavBar: specEntry({
    name: "NavBar",
    taxonomy: "navigation",
    specKey: "nav-bar",
    officialProps: ["back", "backIcon", "backArrow", "left", "right", "onBack", "children"],
    supports: {},
    catalogSamples: [
      { type: "nav-bar", label: "NavBar / back", props: { children: "Title", backIcon: true } },
      { type: "nav-bar", label: "NavBar / left-right", props: { left: "Back", right: "Edit", children: "Title" } }
    ]
  }),
  TabBar: specEntry({
    name: "TabBar",
    taxonomy: "navigation",
    specKey: "tab-bar",
    officialProps: ["activeKey", "defaultActiveKey", "onChange", "safeArea", "children", "icon", "title", "badge", "onClick"],
    supports: {},
    catalogSamples: [
      { type: "tab-bar", label: "TabBar / default", props: { activeKey: "home", safeArea: true } },
      { type: "tab-bar", label: "TabBar / secondary", props: { defaultActiveKey: "search", safeArea: false } }
    ]
  }),
  Category: specEntry({
    name: "Category",
    taxonomy: "navigation",
    specKey: "category",
    supports: { size: ["sm", "md", "lg"], state: ["default", "selected", "disabled"] },
    catalogSamples: [
      { type: "category", label: "Category / sm", size: "sm" },
      { type: "category", label: "Category / md selected", size: "md", state: "selected" },
      { type: "category", label: "Category / lg", size: "lg" }
    ]
  }),
  Tag: specEntry({
    name: "Tag",
    taxonomy: "navigation",
    specKey: "tag",
    supports: { size: ["sm", "md", "lg"], variant: ["subtle", "emphasized"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "hover", "disabled"] },
    catalogSamples: [
      { type: "tag", label: "Tag / default / sm", variant: "subtle", tone: "default", size: "sm" },
      { type: "tag", label: "Tag / success / md", variant: "subtle", tone: "success", size: "md" },
      { type: "tag", label: "Tag / danger / lg", variant: "emphasized", tone: "danger", size: "lg" }
    ]
  }),
  Badge: specEntry({
    name: "Badge",
    taxonomy: "navigation",
    specKey: "badge",
    supports: { size: ["sm", "md", "lg"], variant: ["solid", "subtle"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "disabled"] },
    catalogSamples: [
      { type: "badge", label: "Badge / info / sm", variant: "solid", tone: "info", size: "sm" },
      { type: "badge", label: "Badge / warning / md", variant: "solid", tone: "warning", size: "md" },
      { type: "badge", label: "Badge / success / lg", variant: "subtle", tone: "success", size: "lg" }
    ]
  }),

  Modal: specEntry({
    name: "Modal",
    taxonomy: "overlay",
    specKey: "modal",
    supports: { size: ["sm", "md", "lg"], state: ["default", "open", "closing"] },
    catalogSamples: [{ type: "modal", label: "Modal / md", size: "md" }]
  }),
  Dialog: specEntry({
    name: "Dialog",
    taxonomy: "overlay",
    specKey: "dialog",
    officialProps: ["image", "header", "title", "content", "actions", "onAction", "onClose", "closeOnAction", "closeOnMaskClick", "visible"],
    supports: {},
    catalogSamples: [{ type: "dialog", label: "Dialog / visible", props: { visible: true, title: "Dialog", content: "Body" } }]
  }),
  Popover: specEntry({
    name: "Popover",
    taxonomy: "overlay",
    specKey: "popover",
    supports: { size: ["sm", "md", "lg"], state: ["default", "open", "closing"] },
    catalogSamples: [{ type: "popover", label: "Popover / md", size: "md" }]
  }),
  Tooltip: specEntry({
    name: "Tooltip",
    taxonomy: "overlay",
    specKey: "tooltip",
    supports: { size: ["sm", "md", "lg"], state: ["default", "open"] },
    catalogSamples: [{ type: "tooltip", label: "Tooltip / sm", size: "sm", state: "open" }]
  }),
  Toast: specEntry({
    name: "Toast",
    taxonomy: "overlay",
    specKey: "toast",
    officialProps: ["content", "icon", "duration", "position", "maskClickable", "getContainer", "stopPropagation"],
    supports: {},
    catalogSamples: [
      { type: "toast", label: "Toast / success", props: { icon: "success", content: "Saved", position: "bottom" } },
      { type: "toast", label: "Toast / fail", props: { icon: "fail", content: "Failed", position: "center" } }
    ]
  }),
  Alert: specEntry({
    name: "Alert",
    taxonomy: "overlay",
    specKey: "alert",
    supports: { size: ["sm", "md", "lg"], variant: ["subtle"], tone: ["default", "success", "warning", "danger", "info"], state: ["default"] },
    catalogSamples: [
      { type: "alert", label: "Alert / info / sm", variant: "subtle", tone: "info", size: "sm" },
      { type: "alert", label: "Alert / warning / md", variant: "subtle", tone: "warning", size: "md" },
      { type: "alert", label: "Alert / danger / lg", variant: "subtle", tone: "danger", size: "lg" }
    ]
  }),
  Snackbar: specEntry({
    name: "Snackbar",
    taxonomy: "overlay",
    specKey: "snackbar",
    supports: { size: ["sm", "md", "lg"], variant: ["subtle", "elevated"], tone: ["default", "success", "warning", "danger", "info"], state: ["default"] },
    catalogSamples: [
      { type: "snackbar", label: "Snackbar / default / sm", variant: "subtle", tone: "default", size: "sm" },
      { type: "snackbar", label: "Snackbar / success / md", variant: "elevated", tone: "success", size: "md" },
      { type: "snackbar", label: "Snackbar / danger / lg", variant: "elevated", tone: "danger", size: "lg" }
    ]
  }),
  Popup: specEntry({
    name: "Popup",
    taxonomy: "overlay",
    specKey: "popup",
    officialProps: ["position", "closeOnSwipe", "closeOnMaskClick", "closeIcon", "destroyOnClose", "disableBodyScroll", "forceRender", "mask", "visible", "showCloseButton", "children"],
    supports: {},
    catalogSamples: [
      { type: "popup", label: "Popup / bottom", props: { position: "bottom", visible: true } },
      { type: "popup", label: "Popup / right", props: { position: "right", visible: true, showCloseButton: true } }
    ]
  }),
  BottomSheet: specEntry({
    name: "BottomSheet",
    taxonomy: "overlay",
    specKey: "bottom-sheet",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "full"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "open", "closing"] },
    catalogSamples: [
      { type: "bottom-sheet", label: "BottomSheet / default / md", variant: "default", size: "md" },
      { type: "bottom-sheet", label: "BottomSheet / full / lg", variant: "full", size: "lg" }
    ]
  }),
  Menu: specEntry({
    name: "Menu",
    taxonomy: "overlay",
    specKey: "menu",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "elevated"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "selected", "disabled"] },
    catalogSamples: [
      { type: "menu", label: "Menu / default / sm", variant: "default", size: "sm" },
      { type: "menu", label: "Menu / elevated / md", variant: "elevated", size: "md" },
      { type: "menu", label: "Menu / selected / lg", variant: "elevated", size: "lg", state: "selected" }
    ]
  }),
  Sheet: specEntry({
    name: "Sheet",
    taxonomy: "overlay",
    specKey: "sheet",
    supports: { size: ["sm", "md", "lg"], state: ["default", "open", "closing"] },
    catalogSamples: [{ type: "sheet", label: "Sheet / lg", size: "lg" }]
  }),

  Card: specEntry({
    name: "Card",
    taxonomy: "layout",
    specKey: "card",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined", "elevated"], state: ["default", "hover", "selected"] },
    catalogSamples: [
      { type: "card", label: "Card / default / sm", variant: "default", size: "sm" },
      { type: "card", label: "Card / outlined / md", variant: "outlined", size: "md" },
      { type: "card", label: "Card / elevated / lg", variant: "elevated", size: "lg" }
    ]
  }),
  Container: specEntry({
    name: "Container",
    taxonomy: "layout",
    specKey: "container",
    supports: { size: ["sm", "md", "lg"], state: ["default"] },
    catalogSamples: [
      { type: "container", label: "Container / sm", size: "sm" },
      { type: "container", label: "Container / md", size: "md" },
      { type: "container", label: "Container / lg", size: "lg" }
    ]
  }),
  Divider: specEntry({
    name: "Divider",
    taxonomy: "layout",
    specKey: "divider",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "strong"], state: ["default"] },
    catalogSamples: [
      { type: "divider", label: "Divider / sm", size: "sm", variant: "default" },
      { type: "divider", label: "Divider / md", size: "md", variant: "strong" },
      { type: "divider", label: "Divider / lg", size: "lg", variant: "strong" }
    ]
  }),
  Toolbar: specEntry({
    name: "Toolbar",
    taxonomy: "layout",
    specKey: "toolbar",
    supports: { size: ["sm", "md", "lg"], state: ["default"] },
    catalogSamples: [
      { type: "toolbar", label: "Toolbar / sm", size: "sm" },
      { type: "toolbar", label: "Toolbar / md", size: "md" },
      { type: "toolbar", label: "Toolbar / lg", size: "lg" }
    ]
  }),
  Panel: specEntry({
    name: "Panel",
    taxonomy: "layout",
    specKey: "panel",
    supports: { size: ["sm", "md", "lg"], state: ["default"] },
    catalogSamples: [
      { type: "panel", label: "Panel / sm", size: "sm" },
      { type: "panel", label: "Panel / md", size: "md" },
      { type: "panel", label: "Panel / lg", size: "lg" }
    ]
  }),
  ActionArea: specEntry({
    name: "ActionArea",
    taxonomy: "layout",
    specKey: "action-area",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "stacked", "split"], state: ["default", "disabled"] },
    catalogSamples: [
      { type: "action-area", label: "ActionArea / default", size: "sm", variant: "default" },
      { type: "action-area", label: "ActionArea / stacked", size: "md", variant: "stacked" },
      { type: "action-area", label: "ActionArea / split", size: "lg", variant: "split" }
    ]
  }),
  SectionHeader: specEntry({
    name: "SectionHeader",
    taxonomy: "layout",
    specKey: "section-header",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "compact", "emphasized"], state: ["default"] },
    catalogSamples: [
      { type: "section-header", label: "SectionHeader / compact", size: "sm", variant: "compact" },
      { type: "section-header", label: "SectionHeader / default", size: "md", variant: "default" },
      { type: "section-header", label: "SectionHeader / emphasized", size: "lg", variant: "emphasized" }
    ]
  }),
  Thumbnail: specEntry({
    name: "Thumbnail",
    taxonomy: "layout",
    specKey: "thumbnail",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined", "elevated"], state: ["default", "hover", "selected"] },
    catalogSamples: [
      { type: "thumbnail", label: "Thumbnail / default", size: "sm", variant: "default" },
      { type: "thumbnail", label: "Thumbnail / outlined", size: "md", variant: "outlined" },
      { type: "thumbnail", label: "Thumbnail / elevated", size: "lg", variant: "elevated" }
    ]
  }),
  Avatar: specEntry({
    name: "Avatar",
    taxonomy: "layout",
    specKey: "avatar",
    supports: { size: ["sm", "md", "lg"], variant: ["image", "text", "icon"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "disabled"] },
    catalogSamples: [
      { type: "avatar", label: "Avatar / image / sm", size: "sm", variant: "image" },
      { type: "avatar", label: "Avatar / text / md", size: "md", variant: "text" },
      { type: "avatar", label: "Avatar / icon / lg", size: "lg", variant: "icon" }
    ]
  }),
  AvatarGroup: specEntry({
    name: "AvatarGroup",
    taxonomy: "layout",
    specKey: "avatar-group",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "stacked"], state: ["default", "disabled"] },
    catalogSamples: [
      { type: "avatar-group", label: "AvatarGroup / sm", size: "sm", variant: "default" },
      { type: "avatar-group", label: "AvatarGroup / md", size: "md", variant: "stacked" },
      { type: "avatar-group", label: "AvatarGroup / lg", size: "lg", variant: "stacked" }
    ]
  }),

  List: specEntry({
    name: "List",
    taxonomy: "data",
    specKey: "list",
    officialProps: ["header", "mode", "children"],
    supports: {},
    catalogSamples: [
      { type: "list", label: "List / default", props: { mode: "default", header: "Header" } },
      { type: "list", label: "List / card", props: { mode: "card", header: "Header" } }
    ]
  }),
  Cell: specEntry({
    name: "Cell",
    taxonomy: "data",
    specKey: "cell",
    officialProps: ["title", "children", "description", "prefix", "extra", "clickable", "arrowIcon", "disabled", "onClick", "arrow"],
    supports: {},
    catalogSamples: [
      { type: "list-cell", label: "Cell / default", props: { title: "Title", description: "Description" } },
      { type: "list-cell", label: "Cell / clickable", props: { title: "Title", clickable: true, arrowIcon: true } }
    ]
  }),
  ListCell: specEntry({
    name: "ListCell",
    taxonomy: "data",
    specKey: "list-cell",
    officialProps: ["title", "children", "description", "prefix", "extra", "clickable", "arrowIcon", "disabled", "onClick", "arrow"],
    supports: {},
    catalogSamples: [
      { type: "list-cell", label: "ListCell / default", props: { title: "Title", description: "Description" } },
      { type: "list-cell", label: "ListCell / clickable", props: { title: "Title", clickable: true, arrowIcon: true } }
    ]
  }),
  ListRow: specEntry({
    name: "ListRow",
    taxonomy: "data",
    specKey: "list-row",
    supports: { size: ["sm", "md", "lg"], state: ["default", "hover", "selected"] },
    catalogSamples: [
      { type: "list-row", label: "ListRow / sm", size: "sm" },
      { type: "list-row", label: "ListRow / md", size: "md" },
      { type: "list-row", label: "ListRow / lg selected", size: "lg", state: "selected" }
    ]
  }),
  ListCard: specEntry({
    name: "ListCard",
    taxonomy: "data",
    specKey: "list-card",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined", "elevated"], state: ["default", "hover", "selected"] },
    catalogSamples: [
      { type: "list-card", label: "ListCard / default", size: "sm", variant: "default" },
      { type: "list-card", label: "ListCard / outlined", size: "md", variant: "outlined" },
      { type: "list-card", label: "ListCard / elevated", size: "lg", variant: "elevated" }
    ]
  }),
  Table: specEntry({
    name: "Table",
    taxonomy: "data",
    specKey: "table",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "striped", "selectable"], state: ["default"] },
    catalogSamples: [
      { type: "table", label: "Table / default", size: "sm", variant: "default" },
      { type: "table", label: "Table / striped", size: "md", variant: "striped" },
      { type: "table", label: "Table / selectable", size: "lg", variant: "selectable" }
    ]
  }),
  TableRow: specEntry({
    name: "TableRow",
    taxonomy: "data",
    specKey: "table-row",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "selected"], state: ["default", "hover", "selected"] },
    catalogSamples: [
      { type: "table-row", label: "TableRow / sm", size: "sm", variant: "default" },
      { type: "table-row", label: "TableRow / md selected", size: "md", variant: "selected", state: "selected" },
      { type: "table-row", label: "TableRow / lg", size: "lg", variant: "default" }
    ]
  }),
  KeyValueRow: specEntry({
    name: "KeyValueRow",
    taxonomy: "data",
    specKey: "metadata-row",
    supports: { size: ["sm", "md", "lg"], state: ["default"] },
    catalogSamples: [
      { type: "metadata-row", label: "KeyValueRow / sm", size: "sm" },
      { type: "metadata-row", label: "KeyValueRow / md", size: "md" },
      { type: "metadata-row", label: "KeyValueRow / lg", size: "lg" }
    ]
  }),
  Accordion: specEntry({
    name: "Accordion",
    taxonomy: "data",
    specKey: "accordion",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "outlined", "elevated"], state: ["default", "hover", "selected", "disabled"] },
    catalogSamples: [
      { type: "accordion", label: "Accordion / default", size: "sm", variant: "default" },
      { type: "accordion", label: "Accordion / outlined", size: "md", variant: "outlined" },
      { type: "accordion", label: "Accordion / elevated", size: "lg", variant: "elevated" }
    ]
  }),
  ContentBadge: specEntry({
    name: "ContentBadge",
    taxonomy: "data",
    specKey: "content-badge",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "solid"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "disabled"] },
    catalogSamples: [
      { type: "content-badge", label: "ContentBadge / default / sm", size: "sm", variant: "default" },
      { type: "content-badge", label: "ContentBadge / solid / md", size: "md", variant: "solid" },
      { type: "content-badge", label: "ContentBadge / info / lg", size: "lg", variant: "solid", tone: "info" }
    ]
  }),
  PlayBadge: specEntry({
    name: "PlayBadge",
    taxonomy: "data",
    specKey: "play-badge",
    supports: { size: ["sm", "md", "lg"], variant: ["default", "emphasized"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "hover", "disabled"] },
    catalogSamples: [
      { type: "play-badge", label: "PlayBadge / default / sm", size: "sm", variant: "default" },
      { type: "play-badge", label: "PlayBadge / emphasized / md", size: "md", variant: "emphasized" },
      { type: "play-badge", label: "PlayBadge / info / lg", size: "lg", variant: "emphasized", tone: "info" }
    ]
  }),
  EmptyState: specEntry({
    name: "EmptyState",
    taxonomy: "data",
    specKey: "empty-state",
    supports: { size: ["sm", "md", "lg"], state: ["default"] },
    catalogSamples: [
      { type: "empty-state", label: "EmptyState / sm", size: "sm" },
      { type: "empty-state", label: "EmptyState / md", size: "md" },
      { type: "empty-state", label: "EmptyState / lg", size: "lg" }
    ]
  }),
  FallbackView: specEntry({
    name: "FallbackView",
    taxonomy: "data",
    specKey: "fallback-view",
    supports: { size: ["sm", "md", "lg"], tone: ["default", "success", "warning", "danger", "info"], state: ["default"] },
    catalogSamples: [
      { type: "fallback-view", label: "FallbackView / default / sm", size: "sm", tone: "default" },
      { type: "fallback-view", label: "FallbackView / warning / md", size: "md", tone: "warning" },
      { type: "fallback-view", label: "FallbackView / danger / lg", size: "lg", tone: "danger" }
    ]
  }),

  Skeleton: specEntry({
    name: "Skeleton",
    taxonomy: "feedback",
    specKey: "skeleton",
    supports: { size: ["sm", "md", "lg"], variant: ["line", "block", "avatar"], state: ["default"] },
    catalogSamples: [
      { type: "skeleton", label: "Skeleton / line / sm", size: "sm", variant: "line" },
      { type: "skeleton", label: "Skeleton / block / md", size: "md", variant: "block" },
      { type: "skeleton", label: "Skeleton / avatar / lg", size: "lg", variant: "avatar" }
    ]
  }),
  Spinner: specEntry({
    name: "Spinner",
    taxonomy: "feedback",
    specKey: "spinner",
    supports: { size: ["sm", "md", "lg"], tone: ["default", "info"], state: ["default"] },
    catalogSamples: [
      { type: "spinner", label: "Spinner / sm", size: "sm", tone: "default" },
      { type: "spinner", label: "Spinner / md", size: "md", tone: "info" },
      { type: "spinner", label: "Spinner / lg", size: "lg", tone: "info" }
    ]
  }),
  Progress: specEntry({
    name: "Progress",
    taxonomy: "feedback",
    specKey: "progress",
    supports: { size: ["sm", "md", "lg"], variant: ["line", "circle"], tone: ["default", "success", "warning", "danger", "info"], state: ["default"] },
    catalogSamples: [
      { type: "progress", label: "Progress / line / sm", size: "sm", variant: "line", tone: "default" },
      { type: "progress", label: "Progress / line / md", size: "md", variant: "line", tone: "success" },
      { type: "progress", label: "Progress / circle / lg", size: "lg", variant: "circle", tone: "info" }
    ]
  }),
  ProgressIndicator: specEntry({
    name: "ProgressIndicator",
    taxonomy: "feedback",
    specKey: "progress-indicator",
    supports: { size: ["sm", "md", "lg"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "selected"] },
    catalogSamples: [
      { type: "progress-indicator", label: "ProgressIndicator / sm", size: "sm", tone: "default" },
      { type: "progress-indicator", label: "ProgressIndicator / md", size: "md", tone: "info", state: "selected" },
      { type: "progress-indicator", label: "ProgressIndicator / lg", size: "lg", tone: "success" }
    ]
  }),
  ProgressTracker: specEntry({
    name: "ProgressTracker",
    taxonomy: "feedback",
    specKey: "progress-tracker",
    supports: { size: ["sm", "md", "lg"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "selected"] },
    catalogSamples: [
      { type: "progress-tracker", label: "ProgressTracker / sm", size: "sm", tone: "default" },
      { type: "progress-tracker", label: "ProgressTracker / md", size: "md", tone: "info", state: "selected" },
      { type: "progress-tracker", label: "ProgressTracker / lg", size: "lg", tone: "success" }
    ]
  }),
  Loading: specEntry({
    name: "Loading",
    taxonomy: "feedback",
    specKey: "loading",
    supports: { size: ["sm", "md", "lg"], tone: ["default", "info"], state: ["default"] },
    catalogSamples: [
      { type: "loading", label: "Loading / sm", size: "sm", tone: "default" },
      { type: "loading", label: "Loading / md", size: "md", tone: "info" },
      { type: "loading", label: "Loading / lg", size: "lg", tone: "info" }
    ]
  }),
  SectionMessage: specEntry({
    name: "SectionMessage",
    taxonomy: "feedback",
    specKey: "section-message",
    supports: { size: ["sm", "md", "lg"], variant: ["subtle", "outlined"], tone: ["default", "success", "warning", "danger", "info"], state: ["default"] },
    catalogSamples: [
      { type: "section-message", label: "SectionMessage / default / sm", size: "sm", variant: "subtle", tone: "default" },
      { type: "section-message", label: "SectionMessage / success / md", size: "md", variant: "subtle", tone: "success" },
      { type: "section-message", label: "SectionMessage / danger / lg", size: "lg", variant: "outlined", tone: "danger" }
    ]
  }),
  PushBadge: specEntry({
    name: "PushBadge",
    taxonomy: "feedback",
    specKey: "push-badge",
    supports: { size: ["sm", "md", "lg"], tone: ["default", "success", "warning", "danger", "info"], state: ["default", "selected"] },
    catalogSamples: [
      { type: "push-badge", label: "PushBadge / default / sm", size: "sm", tone: "default" },
      { type: "push-badge", label: "PushBadge / info / md", size: "md", tone: "info", state: "selected" },
      { type: "push-badge", label: "PushBadge / danger / lg", size: "lg", tone: "danger" }
    ]
  })
} as const;
