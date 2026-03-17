---
title: Generation
---

# Generation

The generator reads frozen specs, emits family inspection prompts, resolves layout, and produces a Figma write payload. No family may bypass the spec contract.

## Generator Contract

- Spec is the only source for props, axes, states, metrics, and token references.
- Prompt examples must preserve family props without renaming or flattening.
- Layout must preserve visible distinctions for sizes, states, and family-specific variants.
- Payload must preserve family component names and prop keys as written in the frozen spec.

## Example Prompt

```ts
import type { DesignPrompt } from "../../types/designPrompt";

export const createButtonInspectionPrompt = (theme = "core"): DesignPrompt => {
  return {
    screen: "button-inspection",
    purpose: "button family inspection",
    theme,
    density: "comfortable",
    sections: ["header", "content"],
    dataComplexity: "low",
    state: "filled",
    components: [
      { component: "text", intent: "title", label: "Button Inspection" },
      { component: "text", section: "content", intent: "subtitle", label: "Sizes" },
      { component: "button", section: "content", label: "Mini", color: "primary", fill: "solid", size: "mini" },
      { component: "button", section: "content", label: "Small", color: "primary", fill: "solid", size: "small" },
      { component: "button", section: "content", label: "Middle", color: "primary", fill: "solid", size: "middle" },
      { component: "button", section: "content", label: "Large", color: "primary", fill: "solid", size: "large" },
      { component: "text", section: "content", intent: "subtitle", label: "Color and Fill" },
      { component: "button", section: "content", label: "Primary Solid", color: "primary", fill: "solid", size: "middle" },
      { component: "button", section: "content", label: "Default Outline", color: "default", fill: "outline", size: "middle" },
      { component: "button", section: "content", label: "Danger None", color: "danger", fill: "none", size: "middle" },
      { component: "text", section: "content", intent: "subtitle", label: "Shape and States" },
      { component: "button", section: "content", label: "Default", color: "primary", fill: "solid", size: "middle", shape: "default" },
      { component: "button", section: "content", label: "Rounded", color: "primary", fill: "solid", size: "middle
...
```

## Example Payload

```json
{
  "document": {
    "name": "button-inspection screen",
    "screen": "button-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_7",
    "type": "INSTANCE",
    "name": "Mini",
    "x": 48,
    "y": 116,
    "width": 92,
    "height": 28,
    "component": "Button",
    "style": {
      "fill": "#2E6CFF",
      "stroke": "#2E6CFF",
      "text": "#FFFFFF",
      "radius": 8,
      "paddingX": 10,
      "paddingY": 5,
      "gap": 4,
      "fontSize": 13,
      "lineHeight": 18,
      "fontWeight": "medium",
      "minWidth": 64
    },
    "variant": {
      "color": "primary",
      "fill": "solid",
      "size": "mini"
    },
    "variables": {
      "container.background": "Semantic/action/primary",
      "container.border": "Semantic/action/primary",
      "label.color": "Semantic/action/onPrimary"
    },
    "text": "Mini"
  }
}
```

## Example Layout

```json
[
  {
    "type": "stack",
    "name": "header-section",
    "x": 48,
    "y": 40,
    "width": 1320,
    "direction": "vertical",
    "gap": 12,
    "children": [
      {
        "type": "text",
        "name": "Text 1",
        "content": "Button Inspection",
        "width": 358,
        "height": 32,
        "textStyle": "text/heading/xl",
        "colorToken": "semantic.text.primary"
      }
    ]
  },
  {
    "type": "stack",
    "name": "content-section",
    "x": 48,
    "y": 116,
    "width": 1320,
    "direction": "vertical",
    "gap": 16,
    "children": [
      {
        "type": "text",
        "name": "Text 2",
        "content": "Sizes",
        "width": 358,
        "height": 24,
        "textStyle": "text/body/lg",
        "colorToken": "semantic.text.secondary"
      },
      {
        "type": "stack",
        "name": "content-row-1",
        "direction": "horizontal",
        "gap": 16,
        "width": 1320,
        "children": [
          {
            "type": "component",
            "name": "Mini",
            "component": "button",
            "props": {
              "color": "primary",
              "fill": "solid",
              "size": "mini"
            },
            "width": 92,
            "height": 28,
            "label": "Mini"
          },
          {
            "type": "component",
            "name": "Small",
            "component": "button",
            "props": {
              "color": "primary",
              "fill": "solid",
              "size": "small"
            },
            "width": 108,
            "height": 32,
          
...
```

## Example Render Result

```json
{
  "button": {
    "screen": "button-inspection",
    "theme": "core",
    "sectionsCreated": [
      "header",
      "content",
      "form",
      "action"
    ],
    "componentCount": 13,
    "nodeCount": 25,
    "warnings": [],
    "evaluationScore": 100,
    "passed": true,
    "payloadValidation": {
      "valid": true,
      "errors": [],
      "warnings": []
    },
    "evaluation": {
      "score": 100,
      "passed": true,
      "warnings": [],
      "errors": [],
      "improvementSuggestions": [],
      "affectedNodes": [],
      "affectedComponents": [],
      "summary": "QA passed with score 100. 0 warning(s) found."
    }
  },
  "input": {
    "screen": "input-inspection",
    "theme": "core",
    "sectionsCreated": [
      "header",
      "content",
      "form",
      "action"
    ],
    "componentCount": 9,
    "nodeCount": 20,
    "warnings": [
      "No primary action button found"
    ],
    "evaluationScore": 96,
    "passed": true,
    "payloadValidation": {
      "valid": true,
      "errors": [],
      "warnings": []
    },
    "evaluation": {
      "score": 96,
      "passed": true,
      "warnings": [
        {
          "level": "warning",
          "c
...
```

## Failure Cases

- `axis dropped`: a frozen prop axis does not appear in the prompt or payload.
- `variant flattened`: multiple official values collapse into one rendered preset.
- `state ignored`: state output exists in spec but not in payload or renderer.
- `plugin mismatch`: payload is correct but plugin write path renders the wrong family behavior.
- `missing token`: output falls back to semantic or ad hoc token paths instead of the documented Ant token or CSS variable mapping.
- `wrong metrics`: payload size, padding, radius, or line-height diverges from the official Ant defaults.
- `read-only write path`: generation succeeds but the write environment cannot create nodes on canvas.

## Verification Checklist

- Confirm the inspection prompt uses only frozen family props.
- Confirm the layout shows every required family distinction.
- Confirm the payload node variants preserve the same prop names as the spec.
- Confirm parity artifact mismatch count is `0`.
- Confirm the inspection summary passes.
