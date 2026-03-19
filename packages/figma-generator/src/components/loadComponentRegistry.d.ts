export declare const loadComponentRegistry: () => {
    axes: {
        readonly size: readonly ["sm", "md", "lg"];
        readonly variant: readonly ["default", "primary", "secondary", "ghost", "text", "outlined", "elevated", "subtle"];
        readonly tone: readonly ["default", "success", "warning", "danger", "info"];
        readonly state: readonly ["default", "hover", "pressed", "disabled", "focus", "selected", "error"];
    };
    taxonomy: {
        readonly typography: readonly ["Heading", "Text", "Label", "Caption", "HelperText"];
        readonly form: readonly ["Button", "IconButton", "TextButton", "Input", "TextField", "SearchField", "Textarea", "TextArea", "Select", "CheckMark", "Checkbox", "Radio", "Switch", "Slider", "DatePicker", "TimePicker", "Autocomplete", "FormField", "FilterButton", "SegmentedControl", "Chip", "FramedStyle"];
        readonly navigation: readonly ["Tab", "Tabs", "Pagination", "PaginationDots", "PageCounter", "BottomNavigation", "TopNavigation", "Category", "Tag", "Badge"];
        readonly overlay: readonly ["Modal", "Dialog", "Popover", "Tooltip", "Toast", "Alert", "Snackbar", "Popup", "BottomSheet", "Menu", "Sheet"];
        readonly layout: readonly ["Card", "Container", "Divider", "Toolbar", "Panel", "ActionArea", "SectionHeader", "Thumbnail", "Avatar", "AvatarGroup"];
        readonly data: readonly ["ListCell", "ListRow", "ListCard", "Table", "TableRow", "KeyValueRow", "Accordion", "ContentBadge", "PlayBadge", "EmptyState", "FallbackView"];
        readonly feedback: readonly ["Skeleton", "Spinner", "Progress", "ProgressIndicator", "ProgressTracker", "Loading", "SectionMessage", "PushBadge"];
    };
    components: Record<string, import("../../../ui-core/src/registry").ComponentRegistryEntry>;
};
