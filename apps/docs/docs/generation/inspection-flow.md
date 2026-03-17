---
title: Inspection Flow
---

# Inspection Flow

Inspection screens are family validation outputs, not product screens.

## Flow

- `spec -> prompt -> layout -> payload -> plugin -> figma`

1. Frozen spec defines the family contract.
2. Family inspection prompt enumerates the minimum visible cases.
3. Layout builder creates section and component placement.
4. Payload writer maps layout nodes into the Figma write contract.
5. Plugin write path renders nodes into the current Figma page when a writable path is available.

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
      { component: "button", section: "content", label: "Primary Solid", color: "primary", fill: "solid", size: "midd
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
      "radius": 4,
      "paddingX": 12,
      "paddingY": 3,
      "gap": 0,
      "fontSize": 13,
      "lineHeight": 18,
      "fontWeight": "medium"
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

## Example Node Tree

```json
[
  {
    "id": "layout_1",
    "type": "FRAME",
    "name": "Button inspection Screen",
    "x": 0,
    "y": 0,
    "width": 1440,
    "height": 1240,
    "children": [
      {
        "id": "layout_2",
        "type": "FRAME",
        "name": "header-section",
        "x": 48,
        "y": 40,
        "width": 1320,
        "height": 100,
        "children": [
          {
            "id": "layout_3",
            "type": "TEXT",
            "name": "Text 1",
            "x": 48,
            "y": 40,
            "width": 358,
            "height": 32,
            "text": "Button Inspection",
            "variables": {
              "text.color": "semantic.text.primary"
            },
            "style": {
              "text": "text/heading/xl",
              "fill": "#1F2430"
            }
          }
        ]
      },
      {
        "id": "layout_4",
        "type": "FRAME",
        "name": "content-section",
        "x": 48,
        "y": 116,
        "width": 1320,
        "height": 100,
        "children": [
          {
            "id": "layout_5",
            "type": "TEXT",
            "name": "Text 2",
            "x": 48,
            "y": 116,
            "width": 358,
...
```

## Current Inspection Screens

- `button-inspection` for Button
- `input-inspection` for Input
- `tabs-inspection` for Tabs
- `list-cell-inspection` for List / Cell
- `overlay-inspection` for Dialog / Popup / Toast
- `navigation-inspection` for NavBar / TabBar
- `form-inspection` for Form

## Failure Cases

- missing axis: spec field never reaches prompt or payload.
- flattened variant: two or more official values collapse into one rendered branch.
- wrong metrics: payload size, padding, height, or radius diverges from the family contract.
- wrong token: payload variables stay semantic-only or ad hoc instead of the documented token contract.
- plugin mismatch: plugin write path ignores payload fields or rewrites them incorrectly.
- read-only write: environment cannot create Figma canvas nodes even though payload generation succeeds.

## Verification Checklist

- Inspection summary passes for the family.
- Payload contains at least one node for the target component.
- Payload node variants preserve official field names.
- Plugin build succeeds before canvas verification.
- Canvas verification remains `pending` until live write is confirmed.
