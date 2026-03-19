export declare const componentTaxonomy: {
    readonly typography: readonly ["Heading", "Text", "Label", "Caption", "HelperText"];
    readonly form: readonly ["Button", "IconButton", "TextButton", "Input", "TextField", "SearchField", "Textarea", "TextArea", "Select", "CheckMark", "Checkbox", "Radio", "Switch", "Slider", "DatePicker", "TimePicker", "Autocomplete", "FormField", "FilterButton", "SegmentedControl", "Chip", "FramedStyle"];
    readonly navigation: readonly ["Tab", "Tabs", "Pagination", "PaginationDots", "PageCounter", "BottomNavigation", "TopNavigation", "Category", "Tag", "Badge"];
    readonly overlay: readonly ["Modal", "Dialog", "Popover", "Tooltip", "Toast", "Alert", "Snackbar", "Popup", "BottomSheet", "Menu", "Sheet"];
    readonly layout: readonly ["Card", "Container", "Divider", "Toolbar", "Panel", "ActionArea", "SectionHeader", "Thumbnail", "Avatar", "AvatarGroup"];
    readonly data: readonly ["ListCell", "ListRow", "ListCard", "Table", "TableRow", "KeyValueRow", "Accordion", "ContentBadge", "PlayBadge", "EmptyState", "FallbackView"];
    readonly feedback: readonly ["Skeleton", "Spinner", "Progress", "ProgressIndicator", "ProgressTracker", "Loading", "SectionMessage", "PushBadge"];
};
export type TaxonomyGroup = keyof typeof componentTaxonomy;
