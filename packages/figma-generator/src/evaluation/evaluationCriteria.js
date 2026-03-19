export const evaluationCriteria = [
    { key: "required_sections", description: "Required sections are present", weight: 15 },
    { key: "component_placement", description: "Components are placed in expected sections", weight: 15 },
    { key: "variant_state_size", description: "Variant/size/state usage is valid", weight: 15 },
    { key: "semantic_compliance", description: "Semantic token usage is correct", weight: 20 },
    { key: "spacing_hierarchy", description: "Spacing and hierarchy follow layout rules", weight: 15 },
    { key: "pattern_validity", description: "Screen pattern definition is respected", weight: 10 },
    { key: "broken_structure", description: "No broken or missing structure in output", weight: 10 }
];
export const errorPenalty = 12;
export const warningPenalty = 4;
