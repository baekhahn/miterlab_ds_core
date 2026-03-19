import type { TaxonomyGroup } from "./taxonomy";
export declare const coreAxes: {
    readonly size: readonly ["sm", "md", "lg"];
    readonly variant: readonly ["default", "primary", "secondary", "ghost", "text", "outlined", "elevated", "subtle"];
    readonly tone: readonly ["default", "success", "warning", "danger", "info"];
    readonly state: readonly ["default", "hover", "pressed", "disabled", "focus", "selected", "error"];
};
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
export declare const componentRegistry: Record<string, ComponentRegistryEntry>;
