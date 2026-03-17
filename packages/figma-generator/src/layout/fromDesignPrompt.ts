import {
  normalizePrompt,
  resolveComponentType,
  type GrammarComponent,
  type GrammarDesignPrompt,
  type SectionKey,
  validatePromptGrammar
} from "../grammar/designPromptGrammar";
import { componentPlacementRules, defaultPlacementByType } from "../grammar/componentPlacementRules";
import { layoutRules } from "../grammar/layoutRules";
import { resolvePattern } from "../grammar/screenPatterns";
import type { LayoutFrameNode, LayoutNode } from "../types/layout";
import { loadInputExtractionArtifacts } from "../examples/inputFamily/loadInputExtractionArtifacts";

const toTitle = (screen: string): string => {
  const clean = screen.replace(/[-_]/g, " ");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const toNodeName = (value: string, fallback: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  const clean = trimmed.replace(/[-_]/g, " ");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const sectionOrder = (sections: SectionKey[], patternFlow: SectionKey[]): SectionKey[] => {
  const flow = [...patternFlow, ...layoutRules.sectionOrderFallback];
  return [...sections].sort((a, b) => flow.indexOf(a) - flow.indexOf(b));
};

const resolveSectionForComponent = (component: GrammarComponent): { section: SectionKey; order: number } => {
  const componentType = resolveComponentType(component);
  if (component.section) {
    return { section: component.section, order: 50 };
  }

  if (component.intent && componentPlacementRules[component.intent]) {
    return componentPlacementRules[component.intent];
  }

  return defaultPlacementByType[componentType] ?? { section: "content", order: 99 };
};


const genericComponentTypes = new Set<ReturnType<typeof resolveComponentType>>([
  "textarea",
  "select",
  "check-mark",
  "checkbox",
  "radio",
  "switch",
  "tabs",
  "tab",
  "segmented-control",
  "modal",
  "dialog",
  "sheet",
  "snackbar",
  "menu",
  "popup",
  "bottom-sheet",
  "tag",
  "badge",
  "chip",
  "icon-button",
  "text-button",
  "action-area",
  "pagination",
  "pagination-dots",
  "page-counter",
  "table",
  "table-row",
  "list-cell",
  "list-row",
  "list-card",
  "empty-state",
  "fallback-view",
  "toast",
  "alert",
  "section-message",
  "push-badge",
  "form-field",
  "label",
  "divider",
  "card",
  "container",
  "toolbar",
  "section-header",
  "thumbnail",
  "avatar",
  "avatar-group",
  "content-badge",
  "play-badge",
  "accordion",
  "skeleton",
  "spinner",
  "loading",
  "progress",
  "progress-indicator",
  "progress-tracker",
  "popover",
  "tooltip",
  "panel",
  "top-navigation",
  "bottom-navigation",
  "category",
  "autocomplete",
  "text-field",
  "text-area",
  "search-field",
  "slider",
  "date-picker",
  "time-picker",
  "framed-style"
]);

const resolveButtonSize = (size?: GrammarComponent["size"]) => {
  if (size === "mini" || size === "small" || size === "middle" || size === "large") return size;
  if (size === "sm") return "small";
  if (size === "lg") return "large";
  return "middle";
};

const buttonHeightBySize = (size: ReturnType<typeof resolveButtonSize>) => {
  if (size === "mini") return 28;
  if (size === "small") return 32;
  if (size === "large") return 44;
  return 36;
};

const mapComponentToLayoutNode = (index: number, component: GrammarComponent, screen: string): LayoutNode => {
  const isInspectionScreen =
    screen === "catalog" ||
    screen === "button-inspection" ||
    screen === "input-inspection" ||
    screen === "tabs-inspection" ||
    screen === "list-cell-inspection" ||
    screen === "overlay-inspection" ||
    screen === "navigation-inspection" ||
    screen === "form-inspection";
  const componentType = resolveComponentType(component);

  if (componentType === "text") {
    const isTitle = component.intent === "title" || component.role === "title";
    const isSubtitle = component.intent === "subtitle";
    return {
      type: "text",
      name: component.name ? toNodeName(component.name, `Text ${index + 1}`) : `Text ${index + 1}`,
      content: component.label ?? (isTitle ? "Title" : "Text"),
      width: layoutRules.contentWidth.form,
      height: isTitle
        ? layoutRules.textHeights.title
        : isSubtitle
          ? layoutRules.textHeights.subtitle
          : layoutRules.textHeights.body,
      textStyle: isTitle ? "text/heading/xl" : isSubtitle ? "text/body/lg" : "text/body/md",
      colorToken: isTitle ? "semantic.text.primary" : "semantic.text.secondary"
    };
  }

  if (componentType === "input") {
    const extractedSource = screen === "input-inspection" ? loadInputExtractionArtifacts().sources.at(-1) : undefined;
    const extractedMetrics = extractedSource?.blueprint?.metrics;

    // Generator's job here is translation, not reinterpretation.
    // For extracted inspection screens, source-derived metrics win and layout rules are fallback only.
    const extractedWidth =
      typeof extractedMetrics?.width === "number" && extractedMetrics.width > 0 ? extractedMetrics.width : undefined;
    const extractedHeight =
      typeof extractedMetrics?.height === "number" && extractedMetrics.height > 0 ? extractedMetrics.height : undefined;

    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Input", `Input ${index + 1}`),
      component: "input",
      props: {
        maxLength: component.maxLength,
        minLength: component.minLength,
        autoComplete: component.autoComplete,
        autoFocus: component.autoFocus,
        pattern: component.pattern,
        inputMode: component.inputMode,
        type: typeof component.type === "string" && component.type !== "input" ? component.type : undefined,
        name: component.name,
        onFocus: component.onFocus,
        onBlur: component.onBlur,
        onPaste: component.onPaste,
        autoCapitalize: component.autoCapitalize,
        autoCorrect: component.autoCorrect,
        onKeyDown: component.onKeyDown,
        onKeyUp: component.onKeyUp,
        onCompositionStart: component.onCompositionStart,
        onCompositionEnd: component.onCompositionEnd,
        onClick: component.onClick,
        step: component.step,
        id: component.id,
        placeholder: component.placeholder,
        readOnly: component.readOnly,
        disabled: component.disabled,
        enterKeyHint: component.enterKeyHint,
        value: component.value,
        defaultValue: component.defaultValue,
        onChange: component.onChange,
        clearable: component.clearable,
        clearIcon: component.clearIcon,
        onlyShowClearWhenFocus: component.onlyShowClearWhenFocus,
        onClear: component.onClear,
        onEnterPress: component.onEnterPress,
        min: component.min,
        max: component.max,
        role: component.role
      },
      width:
        screen === "input-inspection"
          ? extractedWidth ?? 320
          : component.fullWidth === false
            ? 320
            : layoutRules.contentWidth.form,
      height: screen === "input-inspection" ? extractedHeight ?? 42 : 42,
      label: component.label
    };
  }

  if (componentType === "tabs") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Tabs", `Tabs ${index + 1}`),
      component: "tabs",
      props: {
        activeKey: component.activeKey,
        defaultActiveKey: component.defaultActiveKey,
        activeLineMode: component.activeLineMode,
        stretch: component.stretch,
        onChange: component.onChange,
        children: component.children,
        direction: component.direction,
        autoScroll: component.autoScroll,
        "--fixed-active-line-width": component["--fixed-active-line-width"],
        "--active-line-height": component["--active-line-height"],
        "--active-line-border-radius": component["--active-line-border-radius"],
        "--title-font-size": component["--title-font-size"],
        "--content-padding": component["--content-padding"],
        "--active-title-color": component["--active-title-color"],
        "--active-line-color": component["--active-line-color"]
      },
      width: isInspectionScreen ? 320 : layoutRules.contentWidth.form,
      height: 92,
      label: component.label ?? "Tabs"
    };
  }

  if (componentType === "tab") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.title ?? component.label ?? "Tab", `Tab ${index + 1}`),
      component: "tab",
      props: {
        title: component.title ?? component.label,
        disabled: component.disabled,
        forceRender: component.forceRender,
        destroyOnClose: component.destroyOnClose,
        children: component.children
      },
      width: 120,
      height: 40,
      label: component.title ?? component.label ?? "Tab"
    };
  }

  if (componentType === "list") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "List", `List ${index + 1}`),
      component: "list",
      props: {
        header: component.header ?? component.label,
        mode: component.mode,
        children: component.children,
        "--active-background-color": component["--active-background-color"],
        "--align-items": component["--align-items"],
        "--border-bottom": component["--border-bottom"],
        "--border-inner": component["--border-inner"],
        "--border-top": component["--border-top"],
        "--extra-max-width": component["--extra-max-width"],
        "--font-size": component["--font-size"],
        "--header-font-size": component["--header-font-size"],
        "--padding-left": component["--padding-left"],
        "--padding-right": component["--padding-right"],
        "--prefix-padding-right": component["--prefix-padding-right"],
        "--prefix-width": component["--prefix-width"]
      },
      width: layoutRules.contentWidth.form,
      height: component.mode === "card" ? 184 : 160,
      label: component.label ?? component.header ?? "List"
    };
  }

  if (componentType === "cell" || componentType === "list-cell") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.title ?? component.label ?? "Cell", `Cell ${index + 1}`),
      component: "cell",
      props: {
        title: component.title ?? component.label,
        children: component.children,
        description: component.description,
        prefix: component.prefix,
        extra: component.extra,
        clickable: component.clickable,
        arrowIcon: component.arrowIcon,
        disabled: component.disabled,
        onClick: component.onClick,
        arrow: component.arrow,
        "--prefix-width": component["--prefix-width"],
        "--align-items": component["--align-items"],
        "--active-background-color": component["--active-background-color"]
      },
      width: layoutRules.contentWidth.form,
      height: component.description ? 72 : 56,
      label: component.title ?? component.label ?? "Cell"
    };
  }

  if (componentType === "dialog") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.title ?? component.label ?? "Dialog", `Dialog ${index + 1}`),
      component: "dialog",
      props: {
        visible: component.visible,
        image: component.image,
        header: component.header,
        title: component.title ?? component.label,
        content: component.content,
        actions: component.actions,
        onAction: component.onAction,
        onClose: component.onClose,
        closeOnAction: component.closeOnAction,
        closeOnMaskClick: component.closeOnMaskClick,
        "--background-color": component["--background-color"],
        "--border-radius": component["--border-radius"],
        "--max-width": component["--max-width"],
        "--min-width": component["--min-width"],
        "--z-index": component["--z-index"]
      },
      width: 320,
      height: 220,
      label: component.title ?? component.label ?? "Dialog"
    };
  }

  if (componentType === "popup") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Popup", `Popup ${index + 1}`),
      component: "popup",
      props: {
        visible: component.visible,
        position: component.position,
        closeOnSwipe: component.closeOnSwipe,
        closeOnMaskClick: component.closeOnMaskClick,
        showCloseButton: component.showCloseButton,
        mask: component.mask,
        onClose: component.onClose,
        children: component.children,
        "--z-index": component["--z-index"]
      },
      width: layoutRules.contentWidth.form,
      height: 240,
      label: component.label ?? "Popup"
    };
  }

  if (componentType === "toast") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Toast", `Toast ${index + 1}`),
      component: "toast",
      props: {
        content: component.content ?? component.label,
        icon: component.icon,
        duration: component.duration,
        position: component.position,
        maskClickable: component.maskClickable
      },
      width: 220,
      height: 72,
      label: component.label ?? component.content ?? "Toast"
    };
  }

  if (componentType === "nav-bar") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "NavBar", `NavBar ${index + 1}`),
      component: "nav-bar",
      props: {
        back: component.back,
        backIcon: component.backIcon,
        backArrow: component.backArrow,
        left: component.left,
        right: component.right,
        onBack: component.onBack,
        children: component.children ?? component.label,
        "--height": component["--height"],
        "--border-bottom": component["--border-bottom"]
      },
      width: layoutRules.contentWidth.form,
      height: 45,
      label: component.label ?? component.children ?? "NavBar"
    };
  }

  if (componentType === "tab-bar") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "TabBar", `TabBar ${index + 1}`),
      component: "tab-bar",
      props: {
        activeKey: component.activeKey,
        defaultActiveKey: component.defaultActiveKey,
        onChange: component.onChange,
        safeArea: component.safeArea,
        children: component.children,
        icon: component.icon,
        title: component.title,
        badge: component.badge,
        onClick: component.onClick
      },
      width: layoutRules.contentWidth.form,
      height: 64,
      label: component.label ?? "TabBar"
    };
  }

  if (componentType === "form") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Form", `Form ${index + 1}`),
      component: "form",
      props: {
        form: component.form,
        children: component.children,
        footer: component.footer,
        mode: component.mode,
        layout: component.layout,
        label: component.label,
        help: component.help,
        required: component.required,
        disabled: component.disabled,
        hidden: component.hidden,
        childElementPosition: component.childElementPosition,
        extra: component.extra,
        clickable: component.clickable,
        arrow: component.arrow,
        arrowIcon: component.arrowIcon,
        description: component.description,
        hasFeedback: component.hasFeedback,
        noStyle: component.noStyle,
        "--border-inner": component["--border-inner"],
        "--border-top": component["--border-top"],
        "--border-bottom": component["--border-bottom"],
        "--prefix-width": component["--prefix-width"]
      },
      width: layoutRules.contentWidth.form,
      height: component.layout === "horizontal" ? 240 : 280,
      label: component.label ?? "Form"
    };
  }

  if (componentType === "icon-button") {
    const size = component.size ?? "md";
    const defaults = layoutRules.componentDefaults["icon-button"];
    const controlHeight =
      size === "sm"
        ? layoutRules.controlHeights.sm
        : size === "lg"
          ? layoutRules.controlHeights.lg
          : layoutRules.controlHeights.md;

    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Icon Button", `IconButton ${index + 1}`),
      component: "icon-button",
      props: {
        variant: component.variant ?? "primary",
        size,
        state: component.state ?? "default",
        iconOnly: component.iconOnly ?? true,
        loading: component.loading ?? false
      },
      width: controlHeight,
      height: defaults?.height ?? controlHeight,
      label: component.label ?? "+"
    };
  }

  if (componentType === "text-button") {
    const size = component.size ?? "md";
    const compactWidth = size === "sm" ? 88 : 108;
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Text Button", `TextButton ${index + 1}`),
      component: "text-button",
      props: {
        variant: component.variant ?? "primary",
        size,
        state: component.loading ? "loading" : component.state ?? "default",
        loading: component.loading ?? false,
        iconPosition: component.iconPosition
      },
      width: compactWidth,
      height: size === "sm" ? layoutRules.controlHeights.sm : layoutRules.controlHeights.md,
      label: component.label ?? "Text action"
    };
  }

  if (genericComponentTypes.has(componentType)) {
    const defaults = layoutRules.componentDefaults[componentType];
    const compactCatalogComponent = isInspectionScreen && (
      componentType === "tabs" ||
      componentType === "list" ||
      componentType === "segmented-control" ||
      componentType === "tag" ||
      componentType === "badge" ||
      componentType === "chip" ||
      componentType === "pagination"
    );
    const kebabName = componentType;
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? kebabName, `${toNodeName(kebabName, kebabName)} ${index + 1}`),
      component: kebabName,
      props: {
        variant: component.variant ?? "default",
        tone: component.tone ?? "default",
        size: component.size ?? "md",
        state: component.state ?? "default"
      },
      width: compactCatalogComponent ? undefined : defaults?.width ?? layoutRules.contentWidth.form,
      height: defaults?.height ?? layoutRules.controlHeights.md,
      label: component.label ?? toNodeName(kebabName, kebabName)
    };
  }

  if (componentType === "filter-button") {
    return {
      type: "component",
      name: toNodeName(component.name ?? component.label ?? "Filter Button", `FilterButton ${index + 1}`),
      component: "filter-button",
      props: {
        size: component.size ?? "md",
        state: component.state ?? "default",
        selected: component.selected ?? false
      },
      width: layoutRules.contentWidth.narrow,
      height:
        component.size === "sm"
          ? layoutRules.controlHeights.xs
          : component.size === "lg"
            ? layoutRules.controlHeights.sm
            : layoutRules.controlHeights.sm,
      label: component.label
    };
  }

  const size = resolveButtonSize(component.size);
  const inspectionButtonWidth =
    component.iconOnly
      ? buttonHeightBySize(size)
      : size === "mini"
        ? 92
        : size === "small"
          ? 108
          : size === "large"
            ? 156
            : 128;
  return {
    type: "component",
    name: toNodeName(component.name ?? component.label ?? "Button", `Button ${index + 1}`),
    component: "button",
    props: {
      color:
        component.color ??
        (component.intent === "secondary-action" ? "default" : "primary"),
      fill:
        component.fill ??
        (component.intent === "secondary-action" ? "outline" : "solid"),
      size,
      shape: component.shape,
      block: component.block ?? component.fullWidth,
      loading: component.loading,
      loadingText: component.loadingText,
      loadingIcon: component.loadingIcon,
      disabled: component.disabled,
      onClick: component.onClick,
      type: typeof component.type === "string" && component.type !== "button" ? component.type : undefined,
      children: component.children,
      onMouseDown: component.onMouseDown,
      onMouseUp: component.onMouseUp,
      onTouchStart: component.onTouchStart,
      onTouchEnd: component.onTouchEnd,
      id: component.id,
      form: component.form,
      "--text-color": component["--text-color"],
      "--background-color": component["--background-color"],
      "--border-radius": component["--border-radius"],
      "--border-width": component["--border-width"],
      "--border-style": component["--border-style"],
      "--border-color": component["--border-color"]
    },
    width:
      (component.block ?? component.fullWidth)
        ? layoutRules.contentWidth.form
        : isInspectionScreen
          ? inspectionButtonWidth
        : component.intent === "primary-action"
          ? layoutRules.contentWidth.form
          : undefined,
    height: buttonHeightBySize(size),
    label: component.label ?? "Action"
  };
};

const estimateNodeHeight = (node: LayoutNode): number => {
  if (typeof node.height === "number") return node.height;
  if (node.type === "text") return layoutRules.textHeights.body;
  if (node.type === "component") return layoutRules.controlHeights.md;
  return 40;
};

const estimateSectionHeight = (node: LayoutNode): number => {
  if (node.type !== "stack") {
    return estimateNodeHeight(node);
  }

  const children = node.children ?? [];
  const childCount = children.length;
  if (node.direction === "horizontal") {
    return Math.max(44, ...children.map((child) => estimateNodeHeight(child)));
  }

  const contentHeight = children.reduce((sum, child) => sum + estimateNodeHeight(child), 0);
  const gapHeight = Math.max(0, childCount - 1) * (node.gap ?? 0);

  return Math.max(44, contentHeight + gapHeight);
};


const createCatalogSectionChildren = (
  section: SectionKey,
  entries: Array<{ order: number; node: LayoutNode }>,
  sectionWidth: number,
  componentGap: number
): LayoutNode[] => {
  if (entries.length === 0) return [];

  const children: LayoutNode[] = [];
  let currentRow: LayoutNode[] = [];
  let currentWidth = 0;
  let rowIndex = 0;

  const flushRow = () => {
    if (currentRow.length === 0) return;
    children.push({
      type: "stack",
      name: `${section}-row-${++rowIndex}`,
      direction: "horizontal",
      gap: componentGap,
      width: sectionWidth,
      children: currentRow
    });
    currentRow = [];
    currentWidth = 0;
  };

  for (const entry of entries) {
    const node = entry.node;
    const isSectionText = node.type === "text";
    const nodeWidth = Math.min(sectionWidth, node.width ?? sectionWidth);

    if (isSectionText) {
      flushRow();
      children.push(node);
      continue;
    }

    const nextWidth = currentRow.length === 0 ? nodeWidth : currentWidth + componentGap + nodeWidth;
    if (currentRow.length > 0 && nextWidth > sectionWidth) {
      flushRow();
    }

    currentRow.push(node);
    currentWidth = currentRow.length === 1 ? nodeWidth : currentWidth + componentGap + nodeWidth;
  }

  flushRow();
  return children;
};

export const fromDesignPrompt = (prompt: GrammarDesignPrompt): LayoutFrameNode => {
  const validation = validatePromptGrammar(prompt);
  if (!validation.valid) {
    throw new Error(`Invalid design prompt: ${validation.errors.join(", ")}`);
  }

  const normalized = normalizePrompt(prompt);
  const pattern = resolvePattern(normalized.screen);

  const sectionSet = new Set<SectionKey>([
    ...(normalized.sections ?? []),
    ...pattern.requiredSections,
    ...pattern.optionalSections.filter((section) =>
      normalized.components.some((component) => resolveSectionForComponent(component).section === section)
    )
  ]);

  const orderedSections = sectionOrder([...sectionSet], pattern.layoutFlow);
  const sectionBuckets: Record<string, Array<{ order: number; node: LayoutNode }>> = {};

  for (const [index, component] of normalized.components.entries()) {
    const placement = resolveSectionForComponent(component);
    const node = mapComponentToLayoutNode(index, component, normalized.screen);
    const key = placement.section;
    sectionBuckets[key] = sectionBuckets[key] ?? [];
    sectionBuckets[key].push({ order: placement.order, node });
  }

  const isCatalog = normalized.screen === "catalog";
  const isInspectionScreen =
    normalized.screen === "catalog" ||
    normalized.screen === "button-inspection" ||
    normalized.screen === "input-inspection" ||
    normalized.screen === "tabs-inspection" ||
    normalized.screen === "list-cell-inspection" ||
    normalized.screen === "overlay-inspection" ||
    normalized.screen === "navigation-inspection" ||
    normalized.screen === "form-inspection";
  const sectionGap = layoutRules.sectionSpacing[normalized.density];
  const componentGap = layoutRules.componentSpacing[normalized.density];
  const formGap = layoutRules.formSpacing[normalized.density];
  const actionGap = layoutRules.actionSpacing[normalized.density];
  const frameWidth = isInspectionScreen ? layoutRules.widths.catalog : layoutRules.widths.mobile;
  const frameHeightBase = isInspectionScreen ? layoutRules.heights.catalog : layoutRules.heights.mobile;
  const sectionWidth = isInspectionScreen ? layoutRules.contentWidth.catalog : layoutRules.contentWidth.mobile;
  const framePaddingX = isInspectionScreen ? 48 : layoutRules.framePadding.x;

  let currentY = layoutRules.framePadding.top;
  const children: LayoutNode[] = [];

  for (const section of orderedSections) {
    const entries = (sectionBuckets[section] ?? []).sort((a, b) => a.order - b.order);
    if (entries.length === 0 && !pattern.requiredSections.includes(section)) {
      continue;
    }

    const sectionChildren = isInspectionScreen
      ? createCatalogSectionChildren(section, entries, sectionWidth, componentGap)
      : entries.map((entry) => entry.node);

    const sectionNode: LayoutNode = {
      type: "stack",
      name: `${section}-section`,
      x: framePaddingX,
      y: currentY,
      width: sectionWidth,
      direction: "vertical",
      gap:
        section === "header"
          ? layoutRules.headerSpacing[normalized.density]
          : section === "form"
            ? formGap
            : section === "action"
              ? actionGap
              : componentGap,
      children: sectionChildren
    };

    children.push(sectionNode);
    const sectionContentHeight = Math.max(
      44,
      sectionNode.children.reduce((sum, child) => sum + estimateNodeHeight(child), 0) +
        Math.max(
          0,
          sectionNode.children.length - 1
        ) *
          (section === "header"
            ? layoutRules.headerSpacing[normalized.density]
            : section === "form"
              ? formGap
              : section === "action"
                ? actionGap
                : componentGap)
    );
    currentY += sectionContentHeight + sectionGap;
  }

  const contentBottom =
    children.length > 0
      ? Math.max(
          ...children.map((child) => (child.y ?? 0) + estimateSectionHeight(child)),
          frameHeightBase
        ) + layoutRules.framePadding.bottom
      : frameHeightBase;

  return {
    type: "frame",
    name: `${toTitle(normalized.screen)} Screen`,
    width: frameWidth,
    height: Math.max(frameHeightBase, contentBottom),
    children
  };
};
