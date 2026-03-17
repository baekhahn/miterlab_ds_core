---
title: Plugin Contract
---

# Plugin Contract

The plugin expects a payload that conforms to the shared Figma write contract.

## Payload Structure Example

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

## Node Tree Example

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
            "height": 24,
            "text": "Sizes",
            "variables": {
              "text.color": "semantic.text.secondary"
            },
            "style": {
              "text": "te
...
```

## Instance Mapping Rules

- `component` must match the family runtime name exactly, such as `Button`, `Input`, `Tabs`, `List`, `Cell`, `Dialog`, `Popup`, `Toast`, `NavBar`, `TabBar`, or `Form`.
- `variant` keys must preserve frozen prop names without aliases or normalization.
- `text` is used as the visible label/value when the family expects textual content.

## State Mapping Rules

- State output must remain encoded through official family props or explicit state groups from the spec.
- Disabled, loading, active, hidden, visible, and item states must not be inferred from unrelated fields.
- Family-specific state groups such as `tab`, `item`, `dialog`, `popup`, and `toast` must remain separate.

## Metrics Mapping Rules

- `style.radius`, `paddingX`, `paddingY`, `gap`, `fontSize`, `lineHeight`, and `minWidth` must reflect the frozen spec metrics.
- Family size distinctions must remain visible in node dimensions and style fields.
- Plugin rendering must not override frozen metrics with generic presets.

## Token Mapping Rules

- `variables` should preserve semantic token paths emitted by the generator.
- CSS variable props remain part of the contract when present in the spec.
- Token remapping outside the family contract is not allowed in the runtime layer.
