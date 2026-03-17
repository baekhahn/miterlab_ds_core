---
title: Input
---

# Input

## Purpose

Core text entry baseline for Ant Design Mobile Input behavior.

## Source Baseline

- Ant Design Mobile InputProps
- Spec files: `packages/ui-core/specs/input.spec.yaml`
- Parity mismatch count: `0`

## Inspection Screen

- Screen name: `input-inspection`
- Summary artifact: `artifacts/figma/input-inspection/summary.json`
- Payload artifact: `artifacts/figma/input-inspection/mcp-payload.json`
- Layout artifact: `artifacts/figma/input-inspection/layout.json`

## Freeze Status

| Check | Status |
| --- | --- |
| Spec parity | verified |
| Generator parity | verified |
| Plugin parity | verified |
| Figma write verification | pending |
| Screenshot attached | pending |
| Review approved | pending |

## Inspection Result

- Generation score: `96`
- Passed: `true`
- Node count: `20`
- Component count: `9`
- Warnings: `No primary action button found`

## Metrics

- Control height, padding, and radius come from `defaults`.
- Minimum width and text alignment come from `internalLayout`.
- defaults: height=42, paddingX=14, paddingY=10, radius=12
- internalLayout: minWidth=220, textAlignX=start, textAlignY=center

## Token References

- Semantic tokens come from `semanticMapping.default` by state.
- Value and placeholder colors are distinct contract outputs and must not be merged.
- Token: `semantic.surface.default`
- Token: `semantic.border.default`
- Token: `semantic.text.primary`
- Token: `semantic.text.muted`
- Token: `semantic.surface.subtle`
- Token: `semantic.border.subtle`
- Token: `semantic.text.secondary`

## Input

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `maxLength` | `number` | TODO | General prop contract. |
| `minLength` | `number` | TODO | General prop contract. |
| `autoComplete` | `string` | TODO | General prop contract. |
| `autoFocus` | `boolean` | `false`, `true` | General prop contract. |
| `pattern` | `string` | TODO | General prop contract. |
| `inputMode` | `string` | TODO | General prop contract. |
| `type` | `string` | TODO | General prop contract. |
| `name` | `string` | TODO | General prop contract. |
| `onFocus` | `function` | TODO | General prop contract. |
| `onBlur` | `function` | TODO | General prop contract. |
| `onPaste` | `function` | TODO | General prop contract. |
| `autoCapitalize` | `string` | TODO | General prop contract. |
| `autoCorrect` | `string` | TODO | General prop contract. |
| `onKeyDown` | `function` | TODO | General prop contract. |
| `onKeyUp` | `function` | TODO | General prop contract. |
| `onCompositionStart` | `function` | TODO | General prop contract. |
| `onCompositionEnd` | `function` | TODO | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `step` | `number` | TODO | General prop contract. |
| `id` | `string` | TODO | General prop contract. |
| `placeholder` | `string` | TODO | General prop contract. |
| `readOnly` | `boolean` | `false`, `true` | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `enterKeyHint` | `string` | TODO | General prop contract. |
| `value` | `string` | TODO | General prop contract. |
| `defaultValue` | `string` | TODO | General prop contract. |
| `onChange` | `function` | TODO | General prop contract. |
| `clearable` | `boolean` | `false`, `true` | General prop contract. |
| `clearIcon` | `reactNode` | TODO | General prop contract. |
| `onlyShowClearWhenFocus` | `boolean` | `false`, `true` | Visibility of the clear affordance is gated by focus. |
| `onClear` | `function` | TODO | General prop contract. |
| `onEnterPress` | `function` | TODO | General prop contract. |
| `min` | `number` | TODO | General prop contract. |
| `max` | `number` | TODO | General prop contract. |
| `role` | `string` | TODO | General prop contract. |

### States

| State | Expectation |
| --- | --- |
| `default` | Uses `field.background`, `field.border`, `value.color`, and `placeholder.color` from `semanticMapping.default.default`. |
| `disabled` | Uses the disabled mapping from `semanticMapping.default.disabled`. |
| `readOnly` | Uses the read-only mapping from `semanticMapping.default.readOnly`. |
| `focused` | Runtime focus must preserve the frozen field metrics and expose focus treatment when implemented. |
| `clearable` | Runtime must reserve action slot behavior when `clearable=true`. |
| `placeholder` | Placeholder remains visible only when `value` and `defaultValue` are absent. |

### Metrics

- defaults: height=42, paddingX=14, paddingY=10, radius=12
- internalLayout: minWidth=220, textAlignX=start, textAlignY=center

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `semantic.surface.default` | semantic | Semantic token referenced in the frozen spec |
| `semantic.border.default` | semantic | Semantic token referenced in the frozen spec |
| `semantic.text.primary` | semantic | Semantic token referenced in the frozen spec |
| `semantic.text.muted` | semantic | Semantic token referenced in the frozen spec |
| `semantic.surface.subtle` | semantic | Semantic token referenced in the frozen spec |
| `semantic.border.subtle` | semantic | Semantic token referenced in the frozen spec |
| `semantic.text.secondary` | semantic | Semantic token referenced in the frozen spec |

## Variant Axes Table

### Input

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `maxLength` | `number` | TODO | General prop contract. |
| `minLength` | `number` | TODO | General prop contract. |
| `autoComplete` | `string` | TODO | General prop contract. |
| `autoFocus` | `boolean` | `false`, `true` | General prop contract. |
| `pattern` | `string` | TODO | General prop contract. |
| `inputMode` | `string` | TODO | General prop contract. |
| `type` | `string` | TODO | General prop contract. |
| `name` | `string` | TODO | General prop contract. |
| `onFocus` | `function` | TODO | General prop contract. |
| `onBlur` | `function` | TODO | General prop contract. |
| `onPaste` | `function` | TODO | General prop contract. |
| `autoCapitalize` | `string` | TODO | General prop contract. |
| `autoCorrect` | `string` | TODO | General prop contract. |
| `onKeyDown` | `function` | TODO | General prop contract. |
| `onKeyUp` | `function` | TODO | General prop contract. |
| `onCompositionStart` | `function` | TODO | General prop contract. |
| `onCompositionEnd` | `function` | TODO | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `step` | `number` | TODO | General prop contract. |
| `id` | `string` | TODO | General prop contract. |
| `placeholder` | `string` | TODO | General prop contract. |
| `readOnly` | `boolean` | `false`, `true` | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `enterKeyHint` | `string` | TODO | General prop contract. |
| `value` | `string` | TODO | General prop contract. |
| `defaultValue` | `string` | TODO | General prop contract. |
| `onChange` | `function` | TODO | General prop contract. |
| `clearable` | `boolean` | `false`, `true` | General prop contract. |
| `clearIcon` | `reactNode` | TODO | General prop contract. |
| `onlyShowClearWhenFocus` | `boolean` | `false`, `true` | Visibility of the clear affordance is gated by focus. |
| `onClear` | `function` | TODO | General prop contract. |
| `onEnterPress` | `function` | TODO | General prop contract. |
| `min` | `number` | TODO | General prop contract. |
| `max` | `number` | TODO | General prop contract. |
| `role` | `string` | TODO | General prop contract. |

## Size Metrics Table

### Input

| Size | Height | Padding X | Padding Y | Radius | Rectangular Radius | Icon Gap |
| --- | --- | --- | --- | --- | --- | --- |
| `default` | `42` | `14` | `10` | `12` | TODO | TODO |

## Inspection Mapping

- Inspection group `Text Values` verifies `placeholder`, `value`, and `defaultValue`.
- Inspection group `Interaction Props` verifies `disabled`, `readOnly`, `clearable`, and `onlyShowClearWhenFocus`.
- Password and number examples verify `type`, `min`, `max`, and `step`.

## State Mapping

### Input

| State | Expectation |
| --- | --- |
| `default` | Uses `field.background`, `field.border`, `value.color`, and `placeholder.color` from `semanticMapping.default.default`. |
| `disabled` | Uses the disabled mapping from `semanticMapping.default.disabled`. |
| `readOnly` | Uses the read-only mapping from `semanticMapping.default.readOnly`. |
| `focused` | Runtime focus must preserve the frozen field metrics and expose focus treatment when implemented. |
| `clearable` | Runtime must reserve action slot behavior when `clearable=true`. |
| `placeholder` | Placeholder remains visible only when `value` and `defaultValue` are absent. |

## Placeholder Behavior

- Placeholder renders only when `value` and `defaultValue` are absent.
- Placeholder uses `placeholder.color`, not the value color token.

## Focus State

- Focus is part of runtime expectations even though it is not a standalone prop in the frozen spec.
- Focus treatment must preserve the frozen metrics and action slot positioning.

## Status Mapping

- `status` is not part of the frozen Input spec.
- Any runtime status styling must not add a new public Input prop without a spec change.

## Clearable Mapping

- `clearable=true` enables the action slot for clear affordance rendering.
- `onlyShowClearWhenFocus=true` limits that affordance to the focused runtime path.

## ReadOnly Mapping

- `readOnly=true` keeps the value visible, applies the read-only token set, and suppresses edit affordances.

## Disabled Mapping

- `disabled=true` applies the disabled token set and suppresses interaction while preserving layout metrics.

## Render Expectations

- Text input height, padding, and radius must follow the frozen `defaults` metrics.
- Placeholder text must render with placeholder tokens until `value` or `defaultValue` is present.
- `readOnly=true` must keep value visible while switching to read-only token treatment.
- `disabled=true` must suppress interactive styling and use muted field/value tokens.
- `clearable=true` must render an action affordance when clear behavior is available.
- `onlyShowClearWhenFocus=true` must keep the clear affordance hidden until focus.

## Failure Cases

- Placeholder and value text rendered with the same token treatment.
- Disabled and read-only collapsed into one visual state.
- Clearable prop ignored in payload or plugin write path.
- Number/password `type` props dropped during mapping.
- Field padding changed independently from frozen defaults.
- Text alignment or vertical centering broken in the rendered node.

## Inspection Payload Example

```json
{
  "document": {
    "name": "input-inspection screen",
    "screen": "input-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_8",
    "type": "INSTANCE",
    "name": "Placeholder",
    "x": 48,
    "y": 192,
    "width": 320,
    "height": 42,
    "component": "Input",
    "style": {
      "fill": "#FFFFFF",
      "stroke": "#E0E6EE",
      "text": "#1F2430",
      "paddingY": 9,
      "fontSize": 15,
      "lineHeight": 22,
      "fontWeight": "regular",
      "minWidth": 220
    },
    "variant": {
      "placeholder": "Type here"
    },
    "variables": {
      "field.background": "Semantic/surface/default",
      "field.border": "Semantic/border/default",
      "value.color": "Semantic/text/primary",
      "placeholder.color": "Semantic/text/muted"
    }
  }
}
```

## Inspection Layout Example

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
        "content": "Input Inspection",
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
    "children": []
  }
]
```
