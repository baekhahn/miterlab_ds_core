import type { LayoutDensity, SectionKey } from "./designPromptGrammar";
export declare const layoutRules: {
    sectionOrderFallback: SectionKey[];
    sectionSpacing: Record<LayoutDensity, number>;
    componentSpacing: Record<LayoutDensity, number>;
    headerSpacing: Record<LayoutDensity, number>;
    formSpacing: Record<LayoutDensity, number>;
    actionSpacing: Record<LayoutDensity, number>;
    framePadding: {
        x: number;
        top: number;
        contentTop: number;
        bottom: number;
    };
    contentWidth: {
        mobile: number;
        form: number;
        narrow: number;
        compact: number;
        preview: number;
    };
    controlHeights: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
    };
    rowHeights: {
        sm: number;
        md: number;
        lg: number;
    };
    controlInsets: {
        fieldGap: number;
        buttonX: number;
        buttonXLg: number;
        inputX: number;
        chipX: number;
        containerSm: number;
        containerMd: number;
        containerLg: number;
        containerXl: number;
    };
    controlRadius: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        button: number;
        input: number;
        chip: number;
        card: number;
        modal: number;
    };
    controlMinWidth: {
        button: number;
        chip: number;
        switch: number;
        tabs: number;
    };
    textHeights: {
        title: number;
        subtitle: number;
        body: number;
        label: number;
        caption: number;
    };
    componentDefaults: {
        input: {
            width: number;
            height: number;
        };
        textarea: {
            width: number;
            height: number;
        };
        select: {
            width: number;
            height: number;
        };
        "check-mark": {
            width: number;
            height: number;
        };
        checkbox: {
            width: number;
            height: number;
        };
        radio: {
            width: number;
            height: number;
        };
        switch: {
            width: number;
            height: number;
        };
        tabs: {
            width: number;
            height: number;
        };
        "nav-bar": {
            width: number;
            height: number;
        };
        "tab-bar": {
            width: number;
            height: number;
        };
        form: {
            width: number;
            height: number;
        };
        modal: {
            width: number;
            height: number;
        };
        dialog: {
            width: number;
            height: number;
        };
        popup: {
            width: number;
            height: number;
        };
        tag: {
            width: number;
            height: number;
        };
        badge: {
            width: number;
            height: number;
        };
        chip: {
            width: number;
            height: number;
        };
        pagination: {
            width: number;
            height: number;
        };
        "segmented-control": {
            width: number;
            height: number;
        };
        list: {
            width: number;
            height: number;
        };
        cell: {
            width: number;
            height: number;
        };
        table: {
            width: number;
            height: number;
        };
        "table-row": {
            width: number;
            height: number;
        };
        "list-row": {
            width: number;
            height: number;
        };
        "metadata-row": {
            width: number;
            height: number;
        };
        skeleton: {
            width: number;
            height: number;
        };
        spinner: {
            width: number;
            height: number;
        };
        progress: {
            width: number;
            height: number;
        };
        toast: {
            width: number;
            height: number;
        };
        alert: {
            width: number;
            height: number;
        };
        "form-field": {
            width: number;
            height: number;
        };
        label: {
            width: number;
            height: number;
        };
        divider: {
            width: number;
            height: number;
        };
        card: {
            width: number;
            height: number;
        };
        container: {
            width: number;
            height: number;
        };
        toolbar: {
            width: number;
            height: number;
        };
        sheet: {
            width: number;
            height: number;
        };
        popover: {
            width: number;
            height: number;
        };
        tooltip: {
            width: number;
            height: number;
        };
        panel: {
            width: number;
            height: number;
        };
        "icon-button": {
            width: number;
            height: number;
        };
        "text-button": {
            width: number;
            height: number;
        };
        "action-area": {
            width: number;
            height: number;
        };
        "list-cell": {
            width: number;
            height: number;
        };
        "list-card": {
            width: number;
            height: number;
        };
        avatar: {
            width: number;
            height: number;
        };
        "avatar-group": {
            width: number;
            height: number;
        };
        "content-badge": {
            width: number;
            height: number;
        };
        "play-badge": {
            width: number;
            height: number;
        };
        thumbnail: {
            width: number;
            height: number;
        };
        "section-header": {
            width: number;
            height: number;
        };
        accordion: {
            width: number;
            height: number;
        };
        snackbar: {
            width: number;
            height: number;
        };
        "section-message": {
            width: number;
            height: number;
        };
        "push-badge": {
            width: number;
            height: number;
        };
        "fallback-view": {
            width: number;
            height: number;
        };
        loading: {
            width: number;
            height: number;
        };
        tab: {
            width: number;
            height: number;
        };
        "pagination-dots": {
            width: number;
            height: number;
        };
        "page-counter": {
            width: number;
            height: number;
        };
        "progress-indicator": {
            width: number;
            height: number;
        };
        "progress-tracker": {
            width: number;
            height: number;
        };
        "bottom-navigation": {
            width: number;
            height: number;
        };
        "top-navigation": {
            width: number;
            height: number;
        };
        category: {
            width: number;
            height: number;
        };
        menu: {
            width: number;
            height: number;
        };
        "bottom-sheet": {
            width: number;
            height: number;
        };
        autocomplete: {
            width: number;
            height: number;
        };
        "text-field": {
            width: number;
            height: number;
        };
        "text-area": {
            width: number;
            height: number;
        };
        "search-field": {
            width: number;
            height: number;
        };
        slider: {
            width: number;
            height: number;
        };
        "date-picker": {
            width: number;
            height: number;
        };
        "time-picker": {
            width: number;
            height: number;
        };
        "framed-style": {
            width: number;
            height: number;
        };
    };
    widths: {
        mobile: number;
        preview: number;
    };
    heights: {
        mobile: number;
        preview: number;
    };
};
