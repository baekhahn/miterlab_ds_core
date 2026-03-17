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
- Spec notes: `official InputProps does not define size, status, prefix, or suffix props`, `source schema is Ant Design Mobile InputProps`

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

- Official defaults come from `src/components/input/input.tsx` and `input.less`.
- The official Input API does not define `size`, `status`, `prefix`, or `suffix` props.
- wrapper: minHeight=24px, width=100%, alignItems=center
- element: lineHeight=1.5, minHeight=1.5em, padding=0, border=0
- clear: marginLeft=8px, padding=4px, iconFontSize=var(--adm-font-size-7)

## Token References

- Input styling is driven by official CSS variables instead of dedicated size/status props.
- Value and placeholder colors remain distinct through `--color` and `--placeholder-color`.
- cssVar: `--font-size` -> default `var(--adm-font-size-9)` in official input.less
- cssVar: `--color` -> default `var(--adm-color-text)` in official input.less
- cssVar: `--placeholder-color` -> default `var(--adm-color-light)` in official input.less
- cssVar: `--text-align` -> default `left` in official input.less
- antToken: `colorText` -> represented through `var(--adm-color-text)`
- antToken: `colorBorder` -> native input border is removed; field wrappers may use external border styling
- antToken: `colorPrimary` -> used indirectly for surrounding focused field patterns, not as an Input prop
- antToken: `colorError` -> not exposed by official InputProps
- antToken: `colorWarning` -> not exposed by official InputProps
- antToken: `colorTextSecondary` -> represented through light/weak text variables in Ant Mobile

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
| `--font-size` | `string` | TODO | Official CSS variable contract. |
| `--color` | `string` | TODO | Official CSS variable contract. |
| `--placeholder-color` | `string` | TODO | Official CSS variable contract. |
| `--text-align` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| `default` | Uses the official CSS variable defaults for font size, color, placeholder color, and text alignment. |
| `focus` | Focus is tracked internally with `hasFocus` and gates clear button visibility. |
| `disabled` | Disabled state applies wrapper opacity and keeps the native element enabled styling at 1. |
| `readOnly` | Read-only blocks pointer events on the native element while preserving value rendering. |
| `clearable` | Clear button appears when `clearable` is true and visibility conditions are satisfied. |
| `placeholder` | Placeholder remains visible only when `value` and `defaultValue` are absent. |

### Metrics

- wrapper: minHeight=24px, width=100%, alignItems=center
- element: lineHeight=1.5, minHeight=1.5em, padding=0, border=0
- clear: marginLeft=8px, padding=4px, iconFontSize=var(--adm-font-size-7)

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--font-size` | cssVar | default `var(--adm-font-size-9)` in official input.less |
| `--color` | cssVar | default `var(--adm-color-text)` in official input.less |
| `--placeholder-color` | cssVar | default `var(--adm-color-light)` in official input.less |
| `--text-align` | cssVar | default `left` in official input.less |
| `colorText` | antToken | represented through `var(--adm-color-text)` |
| `colorBorder` | antToken | native input border is removed; field wrappers may use external border styling |
| `colorPrimary` | antToken | used indirectly for surrounding focused field patterns, not as an Input prop |
| `colorError` | antToken | not exposed by official InputProps |
| `colorWarning` | antToken | not exposed by official InputProps |
| `colorTextSecondary` | antToken | represented through light/weak text variables in Ant Mobile |

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
| `--font-size` | `string` | TODO | Official CSS variable contract. |
| `--color` | `string` | TODO | Official CSS variable contract. |
| `--placeholder-color` | `string` | TODO | Official CSS variable contract. |
| `--text-align` | `string` | TODO | Official CSS variable contract. |

## Size Metrics Table

### Input

| Size | Height | Padding X | Padding Y | Radius | Rectangular Radius | Icon Gap |
| --- | --- | --- | --- | --- | --- | --- |
| `default` | `24px` | `0` | `0` | TODO | TODO | TODO |

## Inspection Mapping

- Inspection group `Text Values` verifies `placeholder`, `value`, and `defaultValue`.
- Inspection group `Interaction Props` verifies `disabled`, `readOnly`, `clearable`, and `onlyShowClearWhenFocus`.
- Password and number examples verify `type`, `min`, `max`, and `step`.

## State Mapping

### Input

| State | Expectation |
| --- | --- |
| `default` | Uses the official CSS variable defaults for font size, color, placeholder color, and text alignment. |
| `focus` | Focus is tracked internally with `hasFocus` and gates clear button visibility. |
| `disabled` | Disabled state applies wrapper opacity and keeps the native element enabled styling at 1. |
| `readOnly` | Read-only blocks pointer events on the native element while preserving value rendering. |
| `clearable` | Clear button appears when `clearable` is true and visibility conditions are satisfied. |
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

- Text input wrapper and element metrics must follow the official CSS variable defaults and Less rules.
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
