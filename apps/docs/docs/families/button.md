---
title: Button
---

# Button

## Purpose

Core action control baseline for Ant Design Mobile Button behavior.

## Source Baseline

- Ant Design Mobile ButtonProps
- Spec files: `packages/ui-core/specs/button.spec.yaml`
- Parity mismatch count: `0`
- Spec notes: `official ButtonProps does not define href, target, or icon props`, `source schema is Ant Design Mobile ButtonProps`

## Inspection Screen

- Screen name: `button-inspection`
- Summary artifact: `artifacts/figma/button-inspection/summary.json`
- Payload artifact: `artifacts/figma/button-inspection/mcp-payload.json`
- Layout artifact: `artifacts/figma/button-inspection/layout.json`

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

- Generation score: `100`
- Passed: `true`
- Node count: `25`
- Component count: `13`
- Warnings: none

## Metrics

- Official defaults come from `src/components/button/button.tsx` and `button.less`.
- The public API does not define `href`, `target`, or `icon` props.
- default: paddingY=7px, paddingX=12px, borderRadius=4px, fontSize=var(--adm-font-size-9), lineHeight=1.4, height=auto
- mini: paddingY=3px, paddingX=12px, fontSize=var(--adm-font-size-main)
- small: paddingY=3px, paddingX=12px, fontSize=var(--adm-font-size-7)
- middle: paddingY=7px, paddingX=12px, fontSize=var(--adm-font-size-9)
- large: paddingY=11px, paddingX=12px, fontSize=var(--adm-font-size-10)
- rounded: borderRadius=1000px
- rectangular: borderRadius=0

## Token References

- Button styling is driven by component CSS variables and Ant Mobile color variables.
- Primary, success, warning, and danger map through `--color` to `--adm-color-*` values.
- cssVar: `--text-color` -> default `var(--adm-color-text)` in official button.less
- cssVar: `--background-color` -> default `var(--adm-color-background)` in official button.less
- cssVar: `--border-radius` -> default `4px` in official button.less
- cssVar: `--border-width` -> default `1px` in official button.less
- cssVar: `--border-style` -> default `solid` in official button.less
- cssVar: `--border-color` -> default `var(--adm-color-border)` in official button.less
- antToken: `colorPrimary` -> represented through `var(--adm-color-primary)`
- antToken: `colorText` -> represented through `var(--adm-color-text)`
- antToken: `colorBorder` -> represented through `var(--adm-color-border)`
- antToken: `colorBgContainer` -> represented through `var(--adm-color-background)`
- antToken: `controlHeight` -> no explicit component token; effective height is content-driven

## Button

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `color` | `string` | `default`, `primary`, `success`, `warning`, `danger` | General prop contract. |
| `fill` | `string` | `solid`, `outline`, `none` | General prop contract. |
| `size` | `string` | `mini`, `small`, `middle`, `large` | General prop contract. |
| `shape` | `string` | `default`, `rounded`, `rectangular` | General prop contract. |
| `block` | `boolean` | `false`, `true` | General prop contract. |
| `loading` | `boolean`, `string` | `false`, `true`, `auto` | Supports boolean and `auto`. |
| `loadingText` | `string` | TODO | General prop contract. |
| `loadingIcon` | `reactNode` | TODO | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `type` | `string` | `button`, `submit`, `reset` | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `onMouseDown` | `function` | TODO | General prop contract. |
| `onMouseUp` | `function` | TODO | General prop contract. |
| `onTouchStart` | `function` | TODO | General prop contract. |
| `onTouchEnd` | `function` | TODO | General prop contract. |
| `id` | `string` | TODO | General prop contract. |
| `form` | `string` | TODO | General prop contract. |
| `--text-color` | `string` | TODO | Official CSS variable contract. |
| `--background-color` | `string` | TODO | Official CSS variable contract. |
| `--border-radius` | `string` | TODO | Official CSS variable contract. |
| `--border-width` | `string` | TODO | Official CSS variable contract. |
| `--border-style` | `string` | TODO | Official CSS variable contract. |
| `--border-color` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| `default` | Uses the merged official defaults for `color`, `fill`, `size`, `shape`, and `type`. |
| `active` | Maps to the `:active::before` overlay in the official Less source. |
| `focus` | The native button removes browser outline and preserves the component border radius. |
| `disabled` | Runtime disabled state is `props.disabled || loading` in the official source. |
| `loading` | Loading uses `loadingIcon`, `loadingText`, and can be controlled by `loading='auto'`. |

### Metrics

- default: paddingY=7px, paddingX=12px, borderRadius=4px, fontSize=var(--adm-font-size-9), lineHeight=1.4, height=auto
- mini: paddingY=3px, paddingX=12px, fontSize=var(--adm-font-size-main)
- small: paddingY=3px, paddingX=12px, fontSize=var(--adm-font-size-7)
- middle: paddingY=7px, paddingX=12px, fontSize=var(--adm-font-size-9)
- large: paddingY=11px, paddingX=12px, fontSize=var(--adm-font-size-10)
- rounded: borderRadius=1000px
- rectangular: borderRadius=0

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--text-color` | cssVar | default `var(--adm-color-text)` in official button.less |
| `--background-color` | cssVar | default `var(--adm-color-background)` in official button.less |
| `--border-radius` | cssVar | default `4px` in official button.less |
| `--border-width` | cssVar | default `1px` in official button.less |
| `--border-style` | cssVar | default `solid` in official button.less |
| `--border-color` | cssVar | default `var(--adm-color-border)` in official button.less |
| `colorPrimary` | antToken | represented through `var(--adm-color-primary)` |
| `colorText` | antToken | represented through `var(--adm-color-text)` |
| `colorBorder` | antToken | represented through `var(--adm-color-border)` |
| `colorBgContainer` | antToken | represented through `var(--adm-color-background)` |
| `controlHeight` | antToken | no explicit component token; effective height is content-driven |

## Variant Axes Table

### Button

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `color` | `string` | `default`, `primary`, `success`, `warning`, `danger` | General prop contract. |
| `fill` | `string` | `solid`, `outline`, `none` | General prop contract. |
| `size` | `string` | `mini`, `small`, `middle`, `large` | General prop contract. |
| `shape` | `string` | `default`, `rounded`, `rectangular` | General prop contract. |
| `block` | `boolean` | `false`, `true` | General prop contract. |
| `loading` | `boolean`, `string` | `false`, `true`, `auto` | Supports boolean and `auto`. |
| `loadingText` | `string` | TODO | General prop contract. |
| `loadingIcon` | `reactNode` | TODO | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `type` | `string` | `button`, `submit`, `reset` | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `onMouseDown` | `function` | TODO | General prop contract. |
| `onMouseUp` | `function` | TODO | General prop contract. |
| `onTouchStart` | `function` | TODO | General prop contract. |
| `onTouchEnd` | `function` | TODO | General prop contract. |
| `id` | `string` | TODO | General prop contract. |
| `form` | `string` | TODO | General prop contract. |
| `--text-color` | `string` | TODO | Official CSS variable contract. |
| `--background-color` | `string` | TODO | Official CSS variable contract. |
| `--border-radius` | `string` | TODO | Official CSS variable contract. |
| `--border-width` | `string` | TODO | Official CSS variable contract. |
| `--border-style` | `string` | TODO | Official CSS variable contract. |
| `--border-color` | `string` | TODO | Official CSS variable contract. |

## Size Metrics Table

### Button

| Size | Height | Padding X | Padding Y | Radius | Rectangular Radius | Icon Gap |
| --- | --- | --- | --- | --- | --- | --- |
| `mini` | `auto` | `12px` | `3px` | `4px` | `0` | TODO |
| `small` | `auto` | `12px` | `3px` | `4px` | `0` | TODO |
| `middle` | `auto` | `12px` | `7px` | `4px` | `0` | TODO |
| `large` | `auto` | `12px` | `11px` | `4px` | `0` | TODO |

## Inspection Mapping

- Inspection row `Sizes` verifies `size=mini|small|middle|large`.
- Inspection row `Color and Fill` verifies `color` and `fill` combinations.
- Inspection row `Shape and States` verifies `shape`, `loading`, `disabled`, and `block`.

## State Mapping

### Button

| State | Expectation |
| --- | --- |
| `default` | Uses the merged official defaults for `color`, `fill`, `size`, `shape`, and `type`. |
| `active` | Maps to the `:active::before` overlay in the official Less source. |
| `focus` | The native button removes browser outline and preserves the component border radius. |
| `disabled` | Runtime disabled state is `props.disabled || loading` in the official source. |
| `loading` | Loading uses `loadingIcon`, `loadingText`, and can be controlled by `loading='auto'`. |

## Fill Mapping

| Fill | Expected render behavior |
| --- | --- |
| `solid` | Uses the selected color as both background and border in the official button Less rules. |
| `outline` | Background becomes transparent while text and border keep the selected color. |
| `none` | Background is transparent and border width becomes `0px` in the official button Less rules. |

## Color Mapping

| Color | Expected token family |
| --- | --- |
| `default` | `--adm-color-text`, `--adm-color-background`, `--adm-color-border` |
| `primary` | `--adm-color-primary` |
| `success` | `--adm-color-success` |
| `warning` | `--adm-color-warning` |
| `danger` | `--adm-color-danger` |

## Shape Mapping

| Shape | Expected radius behavior |
| --- | --- |
| `default` | Uses the official default border radius `4px`. |
| `rounded` | Uses the official rounded border radius `1000px`. |
| `rectangular` | Uses the official rectangular border radius `0`. |

## Block Behavior

- `block=false`: width follows label content with the family minimum width.
- `block=true`: width expands to the inspection row width while preserving size height metrics.

## Loading Behavior

- `loading=true`: runtime must show the loading state and preserve control height.
- `loading=auto`: official contract value remains valid even if runtime handling is environment-specific.
- `loadingText`: when present, replaces or supplements the visible label during loading.

## Disabled Behavior

- Disabled state must override interactive color tokens.
- Disabled state must keep layout metrics stable and remove active emphasis.

## Render Expectations

- All four sizes must be visibly different in padding and type scale, while official height remains content-driven.
- `fill=solid`, `fill=outline`, and `fill=none` must preserve distinct background and border behavior.
- `shape=default`, `shape=rounded`, and `shape=rectangular` must produce visibly different corner treatment.
- `block=true` must expand the control to the full inspection row width.
- `loading=true` must keep button height stable and display the loading label or indicator state.
- `disabled=true` must suppress the interactive color set and render disabled tokens.

## Failure Cases

- Size axis dropped or normalized to a single height.
- Fill axis flattened into one visual preset.
- Shape axis ignored and always rendered with the same radius.
- Block button rendered at content width instead of row width.
- Loading state rendered as plain text with no state token change.
- Disabled state still uses primary action colors.

## Inspection Payload Example

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
