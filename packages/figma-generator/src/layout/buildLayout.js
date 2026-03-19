import { mapComponent } from "../components/mapComponent";
import { resolveToken } from "../tokens/resolveToken";
const nextId = (() => {
    let id = 0;
    return () => `layout_${++id}`;
})();
const baseNode = (name, type, x = 0, y = 0, width = 0, height = 0) => ({
    id: nextId(),
    type,
    name,
    x,
    y,
    width,
    height
});
const buildNode = (node, specs, tokenContext, offsetX = 0, offsetY = 0) => {
    const x = (node.x ?? 0) + offsetX;
    const y = (node.y ?? 0) + offsetY;
    if (node.type === "text") {
        const resolvedColor = node.colorToken ? resolveToken(node.colorToken, tokenContext) : undefined;
        return {
            ...baseNode(node.name, "TEXT", x, y, node.width ?? 240, node.height ?? 24),
            text: node.content,
            variables: node.colorToken ? { "text.color": node.colorToken } : undefined,
            style: {
                ...(node.textStyle ? { text: node.textStyle } : {}),
                ...(resolvedColor?.value ? { fill: resolvedColor.value } : {})
            }
        };
    }
    if (node.type === "component") {
        const rawSpec = node.component.toLowerCase() === "tab"
            ? specs.tabs?.replace(/^component:\s*Tabs/m, "component: Tab")
            : specs[node.component.toLowerCase()];
        if (!rawSpec) {
            throw new Error(`Missing component spec for: ${node.component}`);
        }
        const mapped = mapComponent({
            rawSpec,
            name: node.name,
            x,
            y,
            width: node.width,
            height: node.height,
            variant: typeof node.props?.variant === "string" ? node.props.variant : undefined,
            emphasis: typeof node.props?.emphasis === "string" ? node.props.emphasis : undefined,
            widthMode: typeof node.props?.width === "string" ? node.props.width : undefined,
            intent: typeof node.props?.intent === "string" ? node.props.intent : undefined,
            tone: typeof node.props?.tone === "string" ? node.props.tone : undefined,
            color: typeof node.props?.color === "string" ? node.props.color : undefined,
            fill: typeof node.props?.fill === "string" ? node.props.fill : undefined,
            shape: typeof node.props?.shape === "string" ? node.props.shape : undefined,
            size: typeof node.props?.size === "string" ? node.props.size : undefined,
            state: typeof node.props?.state === "string" ? node.props.state : undefined,
            selected: typeof node.props?.selected === "boolean" ? node.props.selected : undefined,
            iconOnly: typeof node.props?.iconOnly === "boolean" ? node.props.iconOnly : undefined,
            fullWidth: typeof node.props?.fullWidth === "boolean" ? node.props.fullWidth : undefined,
            block: typeof node.props?.block === "boolean" ? node.props.block : undefined,
            loading: node.props?.loading === true || node.props?.loading === false || node.props?.loading === "auto"
                ? node.props.loading
                : undefined,
            loadingText: typeof node.props?.loadingText === "string" ? node.props.loadingText : undefined,
            loadingIcon: typeof node.props?.loadingIcon === "string" ? node.props.loadingIcon : undefined,
            disabled: typeof node.props?.disabled === "boolean" ? node.props.disabled : undefined,
            readOnly: typeof node.props?.readOnly === "boolean" ? node.props.readOnly : undefined,
            clearable: typeof node.props?.clearable === "boolean" ? node.props.clearable : undefined,
            value: typeof node.props?.value === "string" ? node.props.value : undefined,
            defaultValue: typeof node.props?.defaultValue === "string" ? node.props.defaultValue : undefined,
            placeholder: typeof node.props?.placeholder === "string" ? node.props.placeholder : undefined,
            maxLength: typeof node.props?.maxLength === "number" ? node.props.maxLength : undefined,
            minLength: typeof node.props?.minLength === "number" ? node.props.minLength : undefined,
            autoComplete: typeof node.props?.autoComplete === "string" ? node.props.autoComplete : undefined,
            autoFocus: typeof node.props?.autoFocus === "boolean" ? node.props.autoFocus : undefined,
            pattern: typeof node.props?.pattern === "string" ? node.props.pattern : undefined,
            inputMode: typeof node.props?.inputMode === "string" ? node.props.inputMode : undefined,
            onFocus: typeof node.props?.onFocus === "string" ? node.props.onFocus : undefined,
            onBlur: typeof node.props?.onBlur === "string" ? node.props.onBlur : undefined,
            onPaste: typeof node.props?.onPaste === "string" ? node.props.onPaste : undefined,
            autoCapitalize: typeof node.props?.autoCapitalize === "string" ? node.props.autoCapitalize : undefined,
            autoCorrect: typeof node.props?.autoCorrect === "string" ? node.props.autoCorrect : undefined,
            onKeyDown: typeof node.props?.onKeyDown === "string" ? node.props.onKeyDown : undefined,
            onKeyUp: typeof node.props?.onKeyUp === "string" ? node.props.onKeyUp : undefined,
            onCompositionStart: typeof node.props?.onCompositionStart === "string" ? node.props.onCompositionStart : undefined,
            onCompositionEnd: typeof node.props?.onCompositionEnd === "string" ? node.props.onCompositionEnd : undefined,
            onClick: typeof node.props?.onClick === "string" ? node.props.onClick : undefined,
            step: typeof node.props?.step === "number" ? node.props.step : undefined,
            id: typeof node.props?.id === "string" ? node.props.id : undefined,
            enterKeyHint: typeof node.props?.enterKeyHint === "string" ? node.props.enterKeyHint : undefined,
            onChange: typeof node.props?.onChange === "string" ? node.props.onChange : undefined,
            clearIcon: typeof node.props?.clearIcon === "string" ? node.props.clearIcon : undefined,
            onlyShowClearWhenFocus: typeof node.props?.onlyShowClearWhenFocus === "boolean" ? node.props.onlyShowClearWhenFocus : undefined,
            onClear: typeof node.props?.onClear === "string" ? node.props.onClear : undefined,
            onEnterPress: typeof node.props?.onEnterPress === "string" ? node.props.onEnterPress : undefined,
            min: typeof node.props?.min === "number" ? node.props.min : undefined,
            max: typeof node.props?.max === "number" ? node.props.max : undefined,
            activeKey: typeof node.props?.activeKey === "string" ? node.props.activeKey : undefined,
            defaultActiveKey: typeof node.props?.defaultActiveKey === "string" ? node.props.defaultActiveKey : undefined,
            activeLineMode: node.props?.activeLineMode === "auto" || node.props?.activeLineMode === "full" || node.props?.activeLineMode === "fixed"
                ? node.props.activeLineMode
                : undefined,
            stretch: typeof node.props?.stretch === "boolean" ? node.props.stretch : undefined,
            direction: node.props?.direction === "ltr" || node.props?.direction === "rtl" ? node.props.direction : undefined,
            autoScroll: typeof node.props?.autoScroll === "boolean" ? node.props.autoScroll : undefined,
            title: typeof node.props?.title === "string" ? node.props.title : undefined,
            header: typeof node.props?.header === "string" ? node.props.header : undefined,
            mode: node.props?.mode === "default" || node.props?.mode === "card" ? node.props.mode : undefined,
            layout: node.props?.layout === "vertical" || node.props?.layout === "horizontal" ? node.props.layout : undefined,
            description: typeof node.props?.description === "string" ? node.props.description : undefined,
            prefix: typeof node.props?.prefix === "string" ? node.props.prefix : undefined,
            extra: typeof node.props?.extra === "string" ? node.props.extra : undefined,
            help: typeof node.props?.help === "string" ? node.props.help : undefined,
            footer: typeof node.props?.footer === "string" ? node.props.footer : undefined,
            left: typeof node.props?.left === "string" ? node.props.left : undefined,
            right: typeof node.props?.right === "string" ? node.props.right : undefined,
            back: typeof node.props?.back === "string" ? node.props.back : undefined,
            clickable: typeof node.props?.clickable === "boolean" ? node.props.clickable : undefined,
            arrowIcon: typeof node.props?.arrowIcon === "boolean" || typeof node.props?.arrowIcon === "string" ? node.props.arrowIcon : undefined,
            arrow: typeof node.props?.arrow === "boolean" || typeof node.props?.arrow === "string" ? node.props.arrow : undefined,
            visible: typeof node.props?.visible === "boolean" ? node.props.visible : undefined,
            image: typeof node.props?.image === "string" ? node.props.image : undefined,
            content: typeof node.props?.content === "string" ? node.props.content : undefined,
            actions: typeof node.props?.actions === "string" ? node.props.actions : undefined,
            onAction: typeof node.props?.onAction === "string" ? node.props.onAction : undefined,
            onClose: typeof node.props?.onClose === "string" ? node.props.onClose : undefined,
            closeOnAction: typeof node.props?.closeOnAction === "boolean" ? node.props.closeOnAction : undefined,
            closeOnMaskClick: typeof node.props?.closeOnMaskClick === "boolean" ? node.props.closeOnMaskClick : undefined,
            position: node.props?.position === "top" || node.props?.position === "bottom" || node.props?.position === "left" || node.props?.position === "right" || node.props?.position === "center"
                ? node.props.position
                : undefined,
            closeOnSwipe: typeof node.props?.closeOnSwipe === "boolean" ? node.props.closeOnSwipe : undefined,
            showCloseButton: typeof node.props?.showCloseButton === "boolean" ? node.props.showCloseButton : undefined,
            mask: typeof node.props?.mask === "boolean" ? node.props.mask : undefined,
            icon: node.props?.icon === "success" || node.props?.icon === "fail" || node.props?.icon === "loading" || typeof node.props?.icon === "string"
                ? node.props.icon
                : undefined,
            duration: typeof node.props?.duration === "number" ? node.props.duration : undefined,
            maskClickable: typeof node.props?.maskClickable === "boolean" ? node.props.maskClickable : undefined,
            backIcon: typeof node.props?.backIcon === "boolean" || typeof node.props?.backIcon === "string" ? node.props.backIcon : undefined,
            backArrow: typeof node.props?.backArrow === "boolean" || typeof node.props?.backArrow === "string" ? node.props.backArrow : undefined,
            onBack: typeof node.props?.onBack === "string" ? node.props.onBack : undefined,
            forceRender: typeof node.props?.forceRender === "boolean" ? node.props.forceRender : undefined,
            destroyOnClose: typeof node.props?.destroyOnClose === "boolean" ? node.props.destroyOnClose : undefined,
            safeArea: typeof node.props?.safeArea === "boolean" ? node.props.safeArea : undefined,
            badge: typeof node.props?.badge === "string" ? node.props.badge : undefined,
            required: typeof node.props?.required === "boolean" ? node.props.required : undefined,
            hidden: typeof node.props?.hidden === "boolean" ? node.props.hidden : undefined,
            childElementPosition: node.props?.childElementPosition === "normal" || node.props?.childElementPosition === "right"
                ? node.props.childElementPosition
                : undefined,
            hasFeedback: typeof node.props?.hasFeedback === "boolean" ? node.props.hasFeedback : undefined,
            noStyle: typeof node.props?.noStyle === "boolean" ? node.props.noStyle : undefined,
            form: typeof node.props?.form === "string" ? node.props.form : undefined,
            children: typeof node.props?.children === "string" ? node.props.children : undefined,
            onMouseDown: typeof node.props?.onMouseDown === "string" ? node.props.onMouseDown : undefined,
            onMouseUp: typeof node.props?.onMouseUp === "string" ? node.props.onMouseUp : undefined,
            onTouchStart: typeof node.props?.onTouchStart === "string" ? node.props.onTouchStart : undefined,
            onTouchEnd: typeof node.props?.onTouchEnd === "string" ? node.props.onTouchEnd : undefined,
            cssTextColor: typeof node.props?.["--text-color"] === "string" ? node.props["--text-color"] : undefined,
            cssBackgroundColor: typeof node.props?.["--background-color"] === "string" ? node.props["--background-color"] : undefined,
            cssBorderRadius: typeof node.props?.["--border-radius"] === "string" ? node.props["--border-radius"] : undefined,
            cssBorderWidth: typeof node.props?.["--border-width"] === "string" ? node.props["--border-width"] : undefined,
            cssBorderStyle: typeof node.props?.["--border-style"] === "string" ? node.props["--border-style"] : undefined,
            cssBorderColor: typeof node.props?.["--border-color"] === "string" ? node.props["--border-color"] : undefined,
            cssFixedActiveLineWidth: typeof node.props?.["--fixed-active-line-width"] === "string" ? node.props["--fixed-active-line-width"] : undefined,
            cssActiveLineHeight: typeof node.props?.["--active-line-height"] === "string" ? node.props["--active-line-height"] : undefined,
            cssActiveLineBorderRadius: typeof node.props?.["--active-line-border-radius"] === "string"
                ? node.props["--active-line-border-radius"]
                : undefined,
            cssTitleFontSize: typeof node.props?.["--title-font-size"] === "string" ? node.props["--title-font-size"] : undefined,
            cssContentPadding: typeof node.props?.["--content-padding"] === "string" ? node.props["--content-padding"] : undefined,
            cssActiveTitleColor: typeof node.props?.["--active-title-color"] === "string" ? node.props["--active-title-color"] : undefined,
            cssActiveLineColor: typeof node.props?.["--active-line-color"] === "string" ? node.props["--active-line-color"] : undefined,
            cssActiveBackgroundColor: typeof node.props?.["--active-background-color"] === "string" ? node.props["--active-background-color"] : undefined,
            cssAlignItems: typeof node.props?.["--align-items"] === "string" ? node.props["--align-items"] : undefined,
            cssBorderBottom: typeof node.props?.["--border-bottom"] === "string" ? node.props["--border-bottom"] : undefined,
            cssBorderInner: typeof node.props?.["--border-inner"] === "string" ? node.props["--border-inner"] : undefined,
            cssBorderTop: typeof node.props?.["--border-top"] === "string" ? node.props["--border-top"] : undefined,
            cssExtraMaxWidth: typeof node.props?.["--extra-max-width"] === "string" ? node.props["--extra-max-width"] : undefined,
            cssFontSize: typeof node.props?.["--font-size"] === "string" ? node.props["--font-size"] : undefined,
            cssHeaderFontSize: typeof node.props?.["--header-font-size"] === "string" ? node.props["--header-font-size"] : undefined,
            cssPaddingLeft: typeof node.props?.["--padding-left"] === "string" ? node.props["--padding-left"] : undefined,
            cssPaddingRight: typeof node.props?.["--padding-right"] === "string" ? node.props["--padding-right"] : undefined,
            cssPrefixPaddingRight: typeof node.props?.["--prefix-padding-right"] === "string" ? node.props["--prefix-padding-right"] : undefined,
            cssPrefixWidth: typeof node.props?.["--prefix-width"] === "string" ? node.props["--prefix-width"] : undefined,
            cssHeight: typeof node.props?.["--height"] === "string" ? node.props["--height"] : undefined,
            cssZIndex: typeof node.props?.["--z-index"] === "string" ? node.props["--z-index"] : undefined,
            cssMaxWidth: typeof node.props?.["--max-width"] === "string" ? node.props["--max-width"] : undefined,
            cssMinWidth: typeof node.props?.["--min-width"] === "string" ? node.props["--min-width"] : undefined,
            iconPosition: node.props?.iconPosition === "left" || node.props?.iconPosition === "right"
                ? node.props.iconPosition
                : undefined,
            role: typeof node.props?.role === "string" ? node.props.role : undefined,
            type: typeof node.props?.type === "string" ? node.props.type : undefined,
            label: node.label,
            tokenContext
        });
        return { ...mapped, id: nextId() };
    }
    const frameType = node.type === "stack" || node.type === "frame" ? "FRAME" : "GROUP";
    const container = baseNode(node.name, frameType, x, y, node.width ?? 360, node.height ?? 100);
    if ("children" in node) {
        container.children = node.children.map((child) => buildNode(child, specs, tokenContext, x, y));
    }
    return container;
};
export const buildLayout = (input) => {
    return buildNode(input.root, input.componentSpecs, input.tokenContext);
};
