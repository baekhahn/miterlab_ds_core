import { componentRegistry, componentTaxonomy, coreAxes } from "../../../ui-core/src/index";
export const loadComponentRegistry = () => {
    return {
        axes: coreAxes,
        taxonomy: componentTaxonomy,
        components: componentRegistry
    };
};
