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

- Height, padding, radius, and icon gap come from `sizeDefaults`.
- Minimum width and center alignment come from `internalLayout`.
- mini: height=28, paddingX=10, paddingY=5, radius=8, radiusRectangular=4, iconGap=4
- small: height=32, paddingX=12, paddingY=7, radius=10, radiusRectangular=6, iconGap=4
- middle: height=36, paddingX=16, paddingY=8, radius=12, radiusRectangular=8, iconGap=6
- large: height=44, paddingX=20, paddingY=10, radius=14, radiusRectangular=10, iconGap=6
- internalLayout: minWidth=64, textAlignX=center, textAlignY=center

## Token References

- Semantic tokens are derived from `semanticMapping` by fill, color, and state.
- CSS variable props remain part of the contract and can override runtime styling.
- Token: `semantic.surface.subtle`
- Token: `semantic.text.primary`
- Token: `semantic.surface.sunken`
- Token: `semantic.border.strong`
- Token: `semantic.focus.ring`
- Token: `semantic.action.disabled`
- Token: `semantic.text.muted`
- Token: `semantic.action.primary`
- Token: `semantic.action.onPrimary`
- Token: `semantic.action.primaryHover`
- Token: `semantic.action.primaryPressed`
- Token: `semantic.status.success`
- Token: `semantic.status.warning`
- Token: `semantic.status.critical`
- Token: `semantic.surface.default`
- Token: `semantic.border.default`
- Token: `semantic.border.subtle`

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
| `default` | Base semantic mapping from `semanticMapping`. |
| `hover` | Hover token set must only change supported color/border outputs. |
| `pressed` | Pressed token set must show stronger border or darker fill. |
| `focus` | Focus ring must be rendered through `container.focusRing` mapping. |
| `disabled` | Disabled tokens override interactive colors and border styling. |
| `loading` | Loading uses the state mapping for the current fill/color pair. |

### Metrics

- mini: height=28, paddingX=10, paddingY=5, radius=8, radiusRectangular=4, iconGap=4
- small: height=32, paddingX=12, paddingY=7, radius=10, radiusRectangular=6, iconGap=4
- middle: height=36, paddingX=16, paddingY=8, radius=12, radiusRectangular=8, iconGap=6
- large: height=44, paddingX=20, paddingY=10, radius=14, radiusRectangular=10, iconGap=6
- internalLayout: minWidth=64, textAlignX=center, textAlignY=center

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `semantic.surface.subtle` | semantic | Semantic token referenced in the frozen spec |
| `semantic.text.primary` | semantic | Semantic token referenced in the frozen spec |
| `semantic.surface.sunken` | semantic | Semantic token referenced in the frozen spec |
| `semantic.border.strong` | semantic | Semantic token referenced in the frozen spec |
| `semantic.focus.ring` | semantic | Semantic token referenced in the frozen spec |
| `semantic.action.disabled` | semantic | Semantic token referenced in the frozen spec |
| `semantic.text.muted` | semantic | Semantic token referenced in the frozen spec |
| `semantic.action.primary` | semantic | Semantic token referenced in the frozen spec |
| `semantic.action.onPrimary` | semantic | Semantic token referenced in the frozen spec |
| `semantic.action.primaryHover` | semantic | Semantic token referenced in the frozen spec |
| `semantic.action.primaryPressed` | semantic | Semantic token referenced in the frozen spec |
| `semantic.status.success` | semantic | Semantic token referenced in the frozen spec |
| `semantic.status.warning` | semantic | Semantic token referenced in the frozen spec |
| `semantic.status.critical` | semantic | Semantic token referenced in the frozen spec |
| `semantic.surface.default` | semantic | Semantic token referenced in the frozen spec |
| `semantic.border.default` | semantic | Semantic token referenced in the frozen spec |
| `semantic.border.subtle` | semantic | Semantic token referenced in the frozen spec |

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
| `mini` | `28` | `10` | `5` | `8` | `4` | `4` |
| `small` | `32` | `12` | `7` | `10` | `6` | `4` |
| `middle` | `36` | `16` | `8` | `12` | `8` | `6` |
| `large` | `44` | `20` | `10` | `14` | `10` | `6` |

## Inspection Mapping

- Inspection row `Sizes` verifies `size=mini|small|middle|large`.
- Inspection row `Color and Fill` verifies `color` and `fill` combinations.
- Inspection row `Shape and States` verifies `shape`, `loading`, `disabled`, and `block`.

## State Mapping

### Button

| State | Expectation |
| --- | --- |
| `default` | Base semantic mapping from `semanticMapping`. |
| `hover` | Hover token set must only change supported color/border outputs. |
| `pressed` | Pressed token set must show stronger border or darker fill. |
| `focus` | Focus ring must be rendered through `container.focusRing` mapping. |
| `disabled` | Disabled tokens override interactive colors and border styling. |
| `loading` | Loading uses the state mapping for the current fill/color pair. |

## Fill Mapping

| Fill | Expected render behavior |
| --- | --- |
| `solid` | Background and border both use the semantic action/status fill for the selected color. |
| `outline` | Background remains surface-driven while border and label use the selected color family. |
| `none` | Background is transparent or surface-neutral and emphasis stays on label color. |

## Color Mapping

| Color | Expected token family |
| --- | --- |
| `default` | `semantic.surface.*`, `semantic.border.*`, `semantic.text.*` |
| `primary` | `semantic.action.primary*`, `semantic.action.onPrimary` |
| `success` | `semantic.status.success`, `semantic.action.onPrimary` |
| `warning` | `semantic.status.warning`, `semantic.text.primary` |
| `danger` | `semantic.status.critical`, `semantic.action.onPrimary` |

## Shape Mapping

| Shape | Expected radius behavior |
| --- | --- |
| `default` | Uses the base size radius. |
| `rounded` | Uses the full rounded treatment from runtime shape mapping. |
| `rectangular` | Uses `radiusRectangular` for the selected size. |

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

- All four sizes must be visibly different in height, padding, radius, and type scale.
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
