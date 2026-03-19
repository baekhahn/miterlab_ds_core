import { load } from "js-yaml";
import type { FigmaNode } from "../types/figmaNode";
import { layoutRules } from "../grammar/layoutRules";
import { resolveToken, type TokenResolveContext } from "../tokens/resolveToken";
import mobileCore from "../../../ui-core/contracts/mobile-core.json";
import { getButtonMetrics, getButtonWidth, getInputMetrics, getInputWidth } from "../../../ui-core/contracts/foundationModel.mjs";

interface ParsedSpec {
  component: string;
  props?: Record<string, unknown>;
  variants?: string[];
  tones?: string[];
  sizes?: string[];
  states?: string[];
  sizeDefaults?: Record<string, Record<string, number>>;
  defaults?: Record<string, unknown>;
  internalLayout?: Record<string, unknown>;
  semanticMapping?: Record<string, Record<string, Record<string, string>>>;
}

type FontWeight = "regular" | "medium" | "semibold";

export interface MapComponentInput {
  rawSpec: string;
  name?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  variant?: string;
  emphasis?: string;
  widthMode?: string;
  intent?: string;
  tone?: string;
  color?: string;
  fill?: string;
  shape?: string;
  size?: string;
  state?: string;
  selected?: boolean;
  iconOnly?: boolean;
  fullWidth?: boolean;
  block?: boolean;
  loading?: boolean | "auto";
  loadingText?: string;
  loadingIcon?: string;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  autoFocus?: boolean;
  pattern?: string;
  inputMode?: string;
  onFocus?: string;
  onBlur?: string;
  onPaste?: string;
  autoCapitalize?: string;
  autoCorrect?: string;
  onKeyDown?: string;
  onKeyUp?: string;
  onCompositionStart?: string;
  onCompositionEnd?: string;
  onClick?: string;
  step?: number;
  id?: string;
  enterKeyHint?: string;
  onChange?: string;
  clearIcon?: string;
  onlyShowClearWhenFocus?: boolean;
  onClear?: string;
  onEnterPress?: string;
  min?: number;
  max?: number;
  activeKey?: string;
  defaultActiveKey?: string;
  activeLineMode?: "auto" | "full" | "fixed";
  stretch?: boolean;
  direction?: "ltr" | "rtl";
  autoScroll?: boolean;
  title?: string;
  header?: string;
  mode?: "default" | "card";
  layout?: "vertical" | "horizontal";
  description?: string;
  prefix?: string;
  extra?: string;
  help?: string;
  footer?: string;
  left?: string;
  right?: string;
  back?: string;
  clickable?: boolean;
  arrowIcon?: boolean | string;
  arrow?: boolean | string;
  visible?: boolean;
  image?: string;
  content?: string;
  actions?: string;
  onAction?: string;
  onClose?: string;
  closeOnAction?: boolean;
  closeOnMaskClick?: boolean;
  position?: "top" | "bottom" | "left" | "right" | "center";
  closeOnSwipe?: boolean;
  showCloseButton?: boolean;
  mask?: boolean;
  icon?: "success" | "fail" | "loading" | string;
  duration?: number;
  maskClickable?: boolean;
  backIcon?: boolean | string;
  backArrow?: boolean | string;
  onBack?: string;
  forceRender?: boolean;
  destroyOnClose?: boolean;
  safeArea?: boolean;
  badge?: string;
  required?: boolean;
  hidden?: boolean;
  childElementPosition?: "normal" | "right";
  hasFeedback?: boolean;
  noStyle?: boolean;
  form?: string;
  children?: string;
  onMouseDown?: string;
  onMouseUp?: string;
  onTouchStart?: string;
  onTouchEnd?: string;
  cssTextColor?: string;
  cssBackgroundColor?: string;
  cssBorderRadius?: string;
  cssBorderWidth?: string;
  cssBorderStyle?: string;
  cssBorderColor?: string;
  cssFixedActiveLineWidth?: string;
  cssActiveLineHeight?: string;
  cssActiveLineBorderRadius?: string;
  cssTitleFontSize?: string;
  cssContentPadding?: string;
  cssActiveTitleColor?: string;
  cssActiveLineColor?: string;
  cssActiveBackgroundColor?: string;
  cssAlignItems?: string;
  cssBorderBottom?: string;
  cssBorderInner?: string;
  cssBorderTop?: string;
  cssExtraMaxWidth?: string;
  cssFontSize?: string;
  cssHeaderFontSize?: string;
  cssPaddingLeft?: string;
  cssPaddingRight?: string;
  cssPrefixPaddingRight?: string;
  cssPrefixWidth?: string;
  cssHeight?: string;
  cssZIndex?: string;
  cssMaxWidth?: string;
  cssMinWidth?: string;
  iconPosition?: "left" | "right";
  role?: string;
  label?: string;
  type?: string;
  tokenContext: TokenResolveContext;
}

const parseSpec = (rawSpec: string): ParsedSpec => {
  return load(rawSpec) as ParsedSpec;
};

const ensureSemanticToken = (token: string): void => {
  if (!token.startsWith("semantic.")) {
    throw new Error(`Only semantic tokens are allowed in component mapping. Received: ${token}`);
  }
};

const getSemanticMapping = (spec: ParsedSpec) => spec.semanticMapping ?? {};

const pickVariantKey = (input: MapComponentInput, spec: ParsedSpec): string => {
  const semanticMapping = getSemanticMapping(spec);
  if (semanticMapping.unselected && semanticMapping.selected) {
    return input.selected ? "selected" : "unselected";
  }
  const requested = input.variant ?? spec.variants?.[0] ?? Object.keys(semanticMapping)[0] ?? "default";
  if (requested === "neutral" && semanticMapping.secondary) return "secondary";
  if (requested === "critical" && semanticMapping.danger) return "danger";
  return requested;
};

const pickStateKey = (input: MapComponentInput, spec: ParsedSpec): string => {
  return input.state ?? spec.states?.[0] ?? "default";
};

const pickToneKey = (input: MapComponentInput, spec: ParsedSpec): string | undefined => {
  return input.tone ?? spec.tones?.[0];
};

const resolveButtonVariantKey = (input: MapComponentInput, spec: ParsedSpec) => {
  const semanticMapping = getSemanticMapping(spec);
  const fill = input.fill ?? "solid";
  const color = input.color ?? "default";
  const combined = `${fill}.${color}`;
  if (semanticMapping[combined]) return combined;
  if (semanticMapping[`${fill}.default`]) return `${fill}.default`;
  return combined;
};

const resolveButtonStateKey = (input: MapComponentInput) => {
  if (input.disabled || input.state === "disabled") return "disabled";
  if (input.loading === true || input.loading === "auto" || input.state === "loading") return "loading";
  if (input.state === "pressed" || input.state === "active") return "pressed";
  return input.state === "enabled" ? "enabled" : "default";
};

const resolveInputStateKey = (input: MapComponentInput) => {
  if (input.disabled || input.state === "disabled") return "disabled";
  if (input.readOnly || input.state === "readOnly" || input.state === "readonly") return "readonly";
  if (input.state === "focus" || input.state === "focused") return "focused";
  if (input.state === "loading") return "loading";
  return "enabled";
};

const isActionLike = (component: string) =>
  [
    "Button",
    "IconButton",
    "TextButton",
    "Chip",
    "Tag",
    "Badge",
    "FilterButton",
    "Tab",
    "Tabs",
    "SegmentedControl",
    "Category",
    "Pagination",
    "PaginationDots",
    "PageCounter"
  ].includes(component);

const resolveTextMetrics = (
  component: string,
  size: string
): { fontSize: number; lineHeight: number; fontWeight: FontWeight } => {
  if (component === "Button") {
    if (size === "large") return { fontSize: 18, lineHeight: 25, fontWeight: "medium" };
    if (size === "small") return { fontSize: 15, lineHeight: 21, fontWeight: "medium" };
    if (size === "mini") return { fontSize: 13, lineHeight: 18, fontWeight: "medium" };
    return { fontSize: 17, lineHeight: 24, fontWeight: "medium" };
  }

  if (component === "Input") {
    return { fontSize: 17, lineHeight: 26, fontWeight: "regular" };
  }

  if (component === "Label") {
    return size === "lg"
      ? { fontSize: 15, lineHeight: 20, fontWeight: "medium" }
      : size === "sm"
        ? { fontSize: 12, lineHeight: 18, fontWeight: "medium" }
        : { fontSize: 14, lineHeight: 20, fontWeight: "medium" };
  }

  if (isActionLike(component)) {
    return size === "lg"
      ? { fontSize: 16, lineHeight: 24, fontWeight: "medium" }
      : size === "sm"
        ? { fontSize: 13, lineHeight: 18, fontWeight: "medium" }
        : { fontSize: 14, lineHeight: 20, fontWeight: "medium" };
  }

  return size === "lg"
    ? { fontSize: 16, lineHeight: 24, fontWeight: "regular" }
    : size === "sm"
      ? { fontSize: 13, lineHeight: 18, fontWeight: "regular" }
      : { fontSize: 15, lineHeight: 22, fontWeight: "regular" };
};

export const mapComponent = (input: MapComponentInput): FigmaNode => {
  const spec = parseSpec(input.rawSpec);
  const semanticMapping = getSemanticMapping(spec);
  const variantKey =
    spec.component === "Button"
      ? resolveButtonVariantKey(input, spec)
      : pickVariantKey(input, spec);
  const stateKey =
    spec.component === "Button"
      ? resolveButtonStateKey(input)
      : spec.component === "Input"
        ? resolveInputStateKey(input)
        : pickStateKey(input, spec);
  const toneKey = pickToneKey(input, spec);

  const semanticKey = toneKey && semanticMapping[toneKey] ? toneKey : variantKey;
  const variantMap = semanticMapping[semanticKey] ?? {};
  const stateMap = variantMap[stateKey] ?? variantMap.default ?? {};

  const variables: Record<string, string> = {};
  const resolvedStyles: Record<string, string> = {};
  for (const [slotProperty, token] of Object.entries(stateMap)) {
    ensureSemanticToken(token);
    const resolved = resolveToken(token, input.tokenContext);
    variables[slotProperty] = resolved.variable;
    if (resolved.value) {
      resolvedStyles[slotProperty] = resolved.value;
    }
  }

  if (spec.component === "TextButton") {
    const primaryBlue = input.tokenContext.semanticValues["text.info"];
    const primaryBlueHover = input.tokenContext.semanticValues["status.info"] ?? primaryBlue;
    const assistiveText = input.tokenContext.semanticValues["text.primary"];
    const disabledText = input.tokenContext.semanticValues["text.muted"];

    if (variantKey === "primary" && primaryBlue) {
      resolvedStyles["label.color"] =
        stateKey === "disabled"
          ? disabledText ?? resolvedStyles["label.color"]
          : stateKey === "hover"
            ? primaryBlueHover ?? primaryBlue
            : primaryBlue;
    }

    if (variantKey === "assistive" && assistiveText) {
      resolvedStyles["label.color"] =
        stateKey === "disabled" ? disabledText ?? assistiveText : assistiveText;
    }
  }

  const resolvedSize = input.size ?? spec.sizes?.[0] ?? "md";
  const isCoreButton = spec.component === "Button";
  const isCoreInput = spec.component === "Input";
  const buttonRenderSize =
    resolvedSize === "sm" || resolvedSize === "md" || resolvedSize === "lg" ? getButtonMetrics(resolvedSize) : undefined;
  const inputRenderSize =
    resolvedSize === "sm" || resolvedSize === "md" || resolvedSize === "lg" ? getInputMetrics(resolvedSize) : undefined;
  const specHeight = spec.sizeDefaults?.[resolvedSize]?.height ?? spec.defaults?.height;
  const specPaddingX = spec.sizeDefaults?.[resolvedSize]?.paddingX ?? spec.defaults?.paddingX;
  const specPaddingY = spec.sizeDefaults?.[resolvedSize]?.paddingY ?? spec.defaults?.paddingY;
  const shapeKey = input.shape ?? "default";
  const specRadius =
    spec.component === "Button"
      ? shapeKey === "rounded"
        ? 999
        : shapeKey === "rectangular"
          ? spec.sizeDefaults?.[resolvedSize]?.radiusRectangular ?? spec.sizeDefaults?.[resolvedSize]?.radius
          : spec.sizeDefaults?.[resolvedSize]?.radius ?? spec.defaults?.radius
      : spec.sizeDefaults?.[resolvedSize]?.radius ?? spec.defaults?.radius;
  const specIconGap = spec.sizeDefaults?.[resolvedSize]?.iconGap ?? spec.defaults?.inset ?? 0;
  const specMinWidth = Number(spec.internalLayout?.minWidth ?? 0);
  const metrics = resolveTextMetrics(spec.component, resolvedSize);
  const defaultHeight =
    isCoreButton
      ? resolvedSize === "sm"
        ? buttonRenderSize?.height ?? 44
        : resolvedSize === "lg"
          ? buttonRenderSize?.height ?? 56
          : buttonRenderSize?.height ?? 50
      : isCoreInput
        ? resolvedSize === "sm"
          ? inputRenderSize?.height ?? 44
          : resolvedSize === "lg"
            ? inputRenderSize?.height ?? 56
            : inputRenderSize?.height ?? 48
      : typeof specHeight === "number"
      ? specHeight
      :
    resolvedSize === "sm"
      ? layoutRules.controlHeights.sm
      : resolvedSize === "lg"
        ? layoutRules.controlHeights.lg
        : layoutRules.controlHeights.md;
  const labelBasedWidth = (() => {
    const label = input.label ?? input.name ?? spec.component;
    const estimatedTextWidth = Math.max(16, label.length * 8);
    const horizontalPadding = Math.max(0, Number(specPaddingX ?? 0)) * 2;
    const minWidth = Math.max(0, specMinWidth);
    return Math.max(minWidth, estimatedTextWidth + horizontalPadding);
  })();
  const compactComponents = new Set([
    "Button",
    "FilterButton",
    "Tag",
    "Badge",
    "Chip",
    "Label",
    "Divider",
    "Checkbox",
    "Radio",
    "Switch",
    "MetadataRow"
  ]);
  const defaultWidth = compactComponents.has(spec.component)
    ? Math.max(labelBasedWidth, spec.component === "FilterButton" ? layoutRules.controlMinWidth.chip : layoutRules.controlMinWidth.button)
    : layoutRules.contentWidth.form;
  const buttonLike = spec.component === "Button" || spec.component === "IconButton" || spec.component === "TextButton";
  const finalWidth =
    input.iconOnly && buttonLike
      ? input.width ?? defaultHeight
      : input.widthMode === "full" || input.block || input.fullWidth
        ? input.width ?? (isCoreButton ? getButtonWidth("full") : isCoreInput ? getInputWidth("full") : layoutRules.contentWidth.form)
        : isCoreInput && input.widthMode === "hug"
          ? input.width ?? getInputWidth("hug")
          : isCoreButton && input.widthMode === "hug"
            ? input.width ?? getButtonWidth("hug")
          : input.width ?? defaultWidth;
  const textValue =
    spec.component === "Input"
      ? input.value ?? input.defaultValue
      : spec.component === "Tabs"
        ? input.children ?? input.label
        : spec.component === "Tab"
          ? input.title ?? input.children ?? input.label
        : spec.component === "List"
          ? input.header ?? input.children ?? input.label
          : spec.component === "Cell"
            ? input.title ?? input.children ?? input.label
            : spec.component === "Dialog" || spec.component === "Popup" || spec.component === "Toast"
              ? input.title ?? input.content ?? input.children ?? input.label
              : spec.component === "NavBar"
                ? input.children ?? input.title ?? input.label
                : spec.component === "TabBar"
                  ? input.children ?? input.label
                  : spec.component === "Form"
                    ? input.label ?? input.children ?? "Form"
      : input.label;

  const variantPayload =
    spec.component === "Tabs"
      ? {
          ...(input.activeKey ? { activeKey: input.activeKey } : {}),
          ...(input.defaultActiveKey ? { defaultActiveKey: input.defaultActiveKey } : {}),
          ...(input.activeLineMode ? { activeLineMode: input.activeLineMode } : {}),
          ...(typeof input.stretch === "boolean" ? { stretch: input.stretch } : {}),
          ...(input.onChange ? { onChange: input.onChange } : {}),
          ...(input.children ? { children: input.children } : {}),
          ...(input.direction ? { direction: input.direction } : {}),
          ...(typeof input.autoScroll === "boolean" ? { autoScroll: input.autoScroll } : {}),
          ...(input.cssFixedActiveLineWidth ? { "--fixed-active-line-width": input.cssFixedActiveLineWidth } : {}),
          ...(input.cssActiveLineHeight ? { "--active-line-height": input.cssActiveLineHeight } : {}),
          ...(input.cssActiveLineBorderRadius ? { "--active-line-border-radius": input.cssActiveLineBorderRadius } : {}),
          ...(input.cssTitleFontSize ? { "--title-font-size": input.cssTitleFontSize } : {}),
          ...(input.cssContentPadding ? { "--content-padding": input.cssContentPadding } : {}),
          ...(input.cssActiveTitleColor ? { "--active-title-color": input.cssActiveTitleColor } : {}),
          ...(input.cssActiveLineColor ? { "--active-line-color": input.cssActiveLineColor } : {})
        }
      : spec.component === "Tab"
        ? {
            ...(input.title ? { title: input.title } : {}),
            ...(typeof input.disabled === "boolean" ? { disabled: input.disabled } : {}),
            ...(typeof input.forceRender === "boolean" ? { forceRender: input.forceRender } : {}),
            ...(typeof input.destroyOnClose === "boolean" ? { destroyOnClose: input.destroyOnClose } : {}),
            ...(input.children ? { children: input.children } : {})
          }
        : spec.component === "List"
          ? {
              ...(input.header ? { header: input.header } : {}),
              ...(input.mode ? { mode: input.mode } : {}),
              ...(input.children ? { children: input.children } : {}),
              ...(input.cssActiveBackgroundColor ? { "--active-background-color": input.cssActiveBackgroundColor } : {}),
              ...(input.cssAlignItems ? { "--align-items": input.cssAlignItems } : {}),
              ...(input.cssBorderBottom ? { "--border-bottom": input.cssBorderBottom } : {}),
              ...(input.cssBorderInner ? { "--border-inner": input.cssBorderInner } : {}),
              ...(input.cssBorderTop ? { "--border-top": input.cssBorderTop } : {}),
              ...(input.cssExtraMaxWidth ? { "--extra-max-width": input.cssExtraMaxWidth } : {}),
              ...(input.cssFontSize ? { "--font-size": input.cssFontSize } : {}),
              ...(input.cssHeaderFontSize ? { "--header-font-size": input.cssHeaderFontSize } : {}),
              ...(input.cssPaddingLeft ? { "--padding-left": input.cssPaddingLeft } : {}),
              ...(input.cssPaddingRight ? { "--padding-right": input.cssPaddingRight } : {}),
              ...(input.cssPrefixPaddingRight ? { "--prefix-padding-right": input.cssPrefixPaddingRight } : {}),
              ...(input.cssPrefixWidth ? { "--prefix-width": input.cssPrefixWidth } : {})
            }
          : spec.component === "Cell"
            ? {
                ...(input.title ? { title: input.title } : {}),
                ...(input.children ? { children: input.children } : {}),
                ...(input.description ? { description: input.description } : {}),
                ...(input.prefix ? { prefix: input.prefix } : {}),
                ...(input.extra ? { extra: input.extra } : {}),
                ...(typeof input.clickable === "boolean" ? { clickable: input.clickable } : {}),
                ...(typeof input.arrowIcon === "boolean" || typeof input.arrowIcon === "string" ? { arrowIcon: input.arrowIcon } : {}),
                ...(typeof input.disabled === "boolean" ? { disabled: input.disabled } : {}),
                ...(input.onClick ? { onClick: input.onClick } : {}),
                ...(typeof input.arrow === "boolean" || typeof input.arrow === "string" ? { arrow: input.arrow } : {}),
                ...(input.cssPrefixWidth ? { "--prefix-width": input.cssPrefixWidth } : {}),
                ...(input.cssAlignItems ? { "--align-items": input.cssAlignItems } : {}),
                ...(input.cssActiveBackgroundColor ? { "--active-background-color": input.cssActiveBackgroundColor } : {})
              }
            : spec.component === "Dialog"
              ? {
                  ...(typeof input.visible === "boolean" ? { visible: input.visible } : {}),
                  ...(input.image ? { image: input.image } : {}),
                  ...(input.header ? { header: input.header } : {}),
                  ...(input.title ? { title: input.title } : {}),
                  ...(input.content ? { content: input.content } : {}),
                  ...(input.actions ? { actions: input.actions } : {}),
                  ...(input.onAction ? { onAction: input.onAction } : {}),
                  ...(input.onClose ? { onClose: input.onClose } : {}),
                  ...(typeof input.closeOnAction === "boolean" ? { closeOnAction: input.closeOnAction } : {}),
                  ...(typeof input.closeOnMaskClick === "boolean" ? { closeOnMaskClick: input.closeOnMaskClick } : {}),
                  ...(input.cssBackgroundColor ? { "--background-color": input.cssBackgroundColor } : {}),
                  ...(input.cssBorderRadius ? { "--border-radius": input.cssBorderRadius } : {}),
                  ...(input.cssMaxWidth ? { "--max-width": input.cssMaxWidth } : {}),
                  ...(input.cssMinWidth ? { "--min-width": input.cssMinWidth } : {}),
                  ...(input.cssZIndex ? { "--z-index": input.cssZIndex } : {})
                }
              : spec.component === "Popup"
                ? {
                    ...(typeof input.visible === "boolean" ? { visible: input.visible } : {}),
                    ...(input.position ? { position: input.position } : {}),
                    ...(typeof input.closeOnSwipe === "boolean" ? { closeOnSwipe: input.closeOnSwipe } : {}),
                    ...(typeof input.closeOnMaskClick === "boolean" ? { closeOnMaskClick: input.closeOnMaskClick } : {}),
                    ...(typeof input.showCloseButton === "boolean" ? { showCloseButton: input.showCloseButton } : {}),
                    ...(typeof input.mask === "boolean" ? { mask: input.mask } : {}),
                    ...(input.onClose ? { onClose: input.onClose } : {}),
                    ...(input.children ? { children: input.children } : {}),
                    ...(input.cssZIndex ? { "--z-index": input.cssZIndex } : {})
                  }
                : spec.component === "Toast"
                  ? {
                      ...(input.content ? { content: input.content } : {}),
                      ...(input.icon ? { icon: input.icon } : {}),
                      ...(typeof input.duration === "number" ? { duration: input.duration } : {}),
                      ...(input.position ? { position: input.position } : {}),
                      ...(typeof input.maskClickable === "boolean" ? { maskClickable: input.maskClickable } : {})
                    }
                  : spec.component === "NavBar"
                    ? {
                        ...(input.back ? { back: input.back } : {}),
                        ...(typeof input.backIcon === "boolean" || typeof input.backIcon === "string" ? { backIcon: input.backIcon } : {}),
                        ...(typeof input.backArrow === "boolean" || typeof input.backArrow === "string" ? { backArrow: input.backArrow } : {}),
                        ...(input.left ? { left: input.left } : {}),
                        ...(input.right ? { right: input.right } : {}),
                        ...(input.onBack ? { onBack: input.onBack } : {}),
                        ...(input.children ? { children: input.children } : {}),
                        ...(input.cssHeight ? { "--height": input.cssHeight } : {}),
                        ...(input.cssBorderBottom ? { "--border-bottom": input.cssBorderBottom } : {})
                      }
                    : spec.component === "TabBar"
                      ? {
                          ...(input.activeKey ? { activeKey: input.activeKey } : {}),
                          ...(input.defaultActiveKey ? { defaultActiveKey: input.defaultActiveKey } : {}),
                          ...(input.onChange ? { onChange: input.onChange } : {}),
                          ...(typeof input.safeArea === "boolean" ? { safeArea: input.safeArea } : {}),
                          ...(input.children ? { children: input.children } : {}),
                          ...(input.icon ? { icon: input.icon } : {}),
                          ...(input.title ? { title: input.title } : {}),
                          ...(input.badge ? { badge: input.badge } : {}),
                          ...(input.onClick ? { onClick: input.onClick } : {})
                        }
                      : spec.component === "Form"
                        ? {
                            ...(input.form ? { form: input.form } : {}),
                            ...(input.children ? { children: input.children } : {}),
                            ...(input.footer ? { footer: input.footer } : {}),
                            ...(input.mode ? { mode: input.mode } : {}),
                            ...(input.layout ? { layout: input.layout } : {}),
                            ...(input.label ? { label: input.label } : {}),
                            ...(input.help ? { help: input.help } : {}),
                            ...(typeof input.required === "boolean" ? { required: input.required } : {}),
                            ...(typeof input.disabled === "boolean" ? { disabled: input.disabled } : {}),
                            ...(typeof input.hidden === "boolean" ? { hidden: input.hidden } : {}),
                            ...(input.childElementPosition ? { childElementPosition: input.childElementPosition } : {}),
                            ...(input.extra ? { extra: input.extra } : {}),
                            ...(typeof input.clickable === "boolean" ? { clickable: input.clickable } : {}),
                            ...(typeof input.arrow === "boolean" || typeof input.arrow === "string" ? { arrow: input.arrow } : {}),
                            ...(typeof input.arrowIcon === "boolean" || typeof input.arrowIcon === "string" ? { arrowIcon: input.arrowIcon } : {}),
                            ...(input.description ? { description: input.description } : {}),
                            ...(typeof input.hasFeedback === "boolean" ? { hasFeedback: input.hasFeedback } : {}),
                            ...(typeof input.noStyle === "boolean" ? { noStyle: input.noStyle } : {}),
                            ...(input.cssBorderInner ? { "--border-inner": input.cssBorderInner } : {}),
                            ...(input.cssBorderTop ? { "--border-top": input.cssBorderTop } : {}),
                            ...(input.cssBorderBottom ? { "--border-bottom": input.cssBorderBottom } : {}),
                            ...(input.cssPrefixWidth ? { "--prefix-width": input.cssPrefixWidth } : {})
                          }
        : {
            ...(spec.component !== "Button" && spec.component !== "Input"
              ? { variant: input.variant ?? variantKey }
              : {}),
            ...(spec.component === "Button" && input.emphasis ? { emphasis: input.emphasis } : {}),
            ...(spec.component === "Button" && input.widthMode ? { width: input.widthMode } : {}),
            ...(spec.component === "Button" ? { state: resolveButtonStateKey(input) } : {}),
            ...(spec.component === "Input" && input.intent ? { intent: input.intent } : {}),
            ...(spec.component === "Input" && input.widthMode ? { width: input.widthMode } : {}),
            ...(spec.component === "Input" ? { state: resolveInputStateKey(input) } : {}),
            ...(toneKey ? { tone: toneKey } : {}),
            ...(spec.component !== "Button" && input.color ? { color: input.color } : {}),
            ...(spec.component !== "Button" && input.fill ? { fill: input.fill } : {}),
            ...(spec.component !== "Button" && input.shape ? { shape: input.shape } : {}),
            ...(spec.component !== "Input" ? { size: resolvedSize } : { size: resolvedSize }),
            ...(spec.component !== "Button" && spec.component !== "Input" ? { state: stateKey } : {}),
            ...(typeof input.selected === "boolean" ? { selected: input.selected } : {}),
            ...(spec.component !== "Button" && input.block ? { block: true } : {}),
            ...(typeof input.loading !== "undefined" ? { loading: input.loading } : {}),
            ...(input.disabled ? { disabled: true } : {}),
            ...(input.readOnly ? { readOnly: true } : {}),
            ...(input.clearable ? { clearable: true } : {}),
            ...(input.value ? { value: input.value } : {}),
            ...(input.defaultValue ? { defaultValue: input.defaultValue } : {}),
            ...(input.placeholder ? { placeholder: input.placeholder } : {}),
            ...(typeof input.maxLength === "number" ? { maxLength: input.maxLength } : {}),
            ...(typeof input.minLength === "number" ? { minLength: input.minLength } : {}),
            ...(input.autoComplete ? { autoComplete: input.autoComplete } : {}),
            ...(typeof input.autoFocus === "boolean" ? { autoFocus: input.autoFocus } : {}),
            ...(input.pattern ? { pattern: input.pattern } : {}),
            ...(input.inputMode ? { inputMode: input.inputMode } : {}),
            ...(input.onFocus ? { onFocus: input.onFocus } : {}),
            ...(input.onBlur ? { onBlur: input.onBlur } : {}),
            ...(input.onPaste ? { onPaste: input.onPaste } : {}),
            ...(input.autoCapitalize ? { autoCapitalize: input.autoCapitalize } : {}),
            ...(input.autoCorrect ? { autoCorrect: input.autoCorrect } : {}),
            ...(input.onKeyDown ? { onKeyDown: input.onKeyDown } : {}),
            ...(input.onKeyUp ? { onKeyUp: input.onKeyUp } : {}),
            ...(input.onCompositionStart ? { onCompositionStart: input.onCompositionStart } : {}),
            ...(input.onCompositionEnd ? { onCompositionEnd: input.onCompositionEnd } : {}),
            ...(input.onClick ? { onClick: input.onClick } : {}),
            ...(typeof input.step === "number" ? { step: input.step } : {}),
            ...(input.id ? { id: input.id } : {}),
            ...(input.enterKeyHint ? { enterKeyHint: input.enterKeyHint } : {}),
            ...(input.onChange ? { onChange: input.onChange } : {}),
            ...(input.clearIcon ? { clearIcon: input.clearIcon } : {}),
            ...(typeof input.onlyShowClearWhenFocus === "boolean"
              ? { onlyShowClearWhenFocus: input.onlyShowClearWhenFocus }
              : {}),
            ...(input.onClear ? { onClear: input.onClear } : {}),
            ...(input.onEnterPress ? { onEnterPress: input.onEnterPress } : {}),
            ...(typeof input.min === "number" ? { min: input.min } : {}),
            ...(typeof input.max === "number" ? { max: input.max } : {}),
            ...(input.children ? { children: input.children } : {}),
            ...(input.form ? { form: input.form } : {}),
            ...(input.onMouseDown ? { onMouseDown: input.onMouseDown } : {}),
            ...(input.onMouseUp ? { onMouseUp: input.onMouseUp } : {}),
            ...(input.onTouchStart ? { onTouchStart: input.onTouchStart } : {}),
            ...(input.onTouchEnd ? { onTouchEnd: input.onTouchEnd } : {}),
            ...(input.cssTextColor ? { "--text-color": input.cssTextColor } : {}),
            ...(input.cssBackgroundColor ? { "--background-color": input.cssBackgroundColor } : {}),
            ...(input.cssBorderRadius ? { "--border-radius": input.cssBorderRadius } : {}),
            ...(input.cssBorderWidth ? { "--border-width": input.cssBorderWidth } : {}),
            ...(input.cssBorderStyle ? { "--border-style": input.cssBorderStyle } : {}),
            ...(input.cssBorderColor ? { "--border-color": input.cssBorderColor } : {}),
            ...(input.iconPosition ? { iconPosition: input.iconPosition } : {}),
            ...(input.role ? { role: input.role } : {}),
            ...(input.type ? { type: input.type } : {})
          };

  const coreRenderMode = isCoreButton || isCoreInput;

  return {
    id: `node_${Math.random().toString(36).slice(2, 10)}`,
    type: "INSTANCE",
    name: input.name ?? spec.component,
    x: input.x ?? 0,
    y: input.y ?? 0,
    width: finalWidth,
    height: input.height ?? defaultHeight,
    component: spec.component,
    style: {
      ...(coreRenderMode
        ? {}
        : {
            fill:
              resolvedStyles["container.background"] ??
              resolvedStyles["field.background"] ??
              resolvedStyles["track.background"] ??
              resolvedStyles["control.background"],
            stroke:
              resolvedStyles["container.border"] ??
              resolvedStyles["field.border"] ??
              resolvedStyles["track.border"] ??
              resolvedStyles["control.border"],
            text:
              resolvedStyles["label.color"] ??
              resolvedStyles["icon.color"] ??
              resolvedStyles["value.color"] ??
              resolvedStyles["title.color"] ??
              resolvedStyles["mark.color"],
            effect: resolvedStyles["container.focusRing"] ?? resolvedStyles["field.focusRing"]
          }),
      radius:
        isCoreButton
          ? buttonRenderSize?.radius ?? 14
          : isCoreInput
            ? inputRenderSize?.radius ?? 14
            : typeof specRadius === "number"
              ? specRadius
              : undefined,
      paddingX:
        isCoreButton
          ? buttonRenderSize?.paddingX ?? 18
          : isCoreInput
            ? inputRenderSize?.paddingX ?? 14
            : typeof specPaddingX === "number"
              ? specPaddingX
              : undefined,
      paddingY:
        isCoreButton
          ? buttonRenderSize?.paddingY ?? 13
          : isCoreInput
            ? inputRenderSize?.paddingY ?? 14
          : typeof specPaddingY === "number"
          ? specPaddingY
          : Math.max(6, Math.round((defaultHeight - metrics.lineHeight) / 2)),
      gap: isCoreButton ? buttonRenderSize?.gap ?? 8 : typeof specIconGap === "number" ? specIconGap : undefined,
      fontSize: isCoreButton ? buttonRenderSize?.fontSize ?? 16 : isCoreInput ? inputRenderSize?.fontSize ?? 16 : metrics.fontSize,
      lineHeight: isCoreButton ? buttonRenderSize?.lineHeight ?? 22 : isCoreInput ? inputRenderSize?.lineHeight ?? 22 : metrics.lineHeight,
      fontWeight: isCoreButton ? "semibold" : isCoreInput ? "regular" : metrics.fontWeight,
      minWidth:
        isCoreButton
          ? buttonRenderSize?.minWidth
          : isCoreInput
            ? inputRenderSize?.minWidth
            : specMinWidth > 0
              ? specMinWidth
              : undefined
    },
    variant: variantPayload,
    variables: coreRenderMode ? {} : variables,
    text: textValue
  };
};
