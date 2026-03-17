---
title: List / Cell
---

# List / Cell

## Purpose

Structured list and row presentation baseline for Ant Design Mobile List and Cell behavior.

## Source Baseline

- Ant Design Mobile ListProps and ListItemProps
- Spec files: `packages/ui-core/specs/list.spec.yaml`, `packages/ui-core/specs/cell.spec.yaml`
- Parity mismatch count: `0`
- Spec notes: `source schema is Ant Design Mobile ListProps`, `source schema is Ant Design Mobile ListItemProps`, `deprecated field `arrow` is retained because it exists in the official API`

## Inspection Screen

- Screen name: `list-cell-inspection`
- Summary artifact: `artifacts/figma/list-cell-inspection/summary.json`
- Payload artifact: `artifacts/figma/list-cell-inspection/mcp-payload.json`
- Layout artifact: `artifacts/figma/list-cell-inspection/layout.json`

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
- Node count: `13`
- Component count: `5`
- Warnings: none

## Metrics

- cardMargin=12px
- cardRadius=8px
- headerPaddingY=8px
- itemContentPaddingY=12px
- itemExtraPaddingLeft=12px
- contentPaddingY=12px
- extraPaddingLeft=12px
- arrowMarginLeft=4px
- arrowFontSize=19px

## Token References

- cssVar: `--header-font-size` -> default `var(--adm-font-size-7)` in official list.less
- cssVar: `--prefix-padding-right` -> default `12px` in official list.less
- cssVar: `--align-items` -> default `center` in official list.less
- cssVar: `--active-background-color` -> default `var(--adm-color-border)` in official list.less
- cssVar: `--font-size` -> default `var(--adm-font-size-9)` in official list.less
- cssVar: `--extra-max-width` -> default `70%` in official list.less
- CSS variable: `--prefix-width`
- CSS variable: `--align-items`
- CSS variable: `--active-background-color`

## List

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `header` | `reactNode` | TODO | General prop contract. |
| `mode` | `string` | `default`, `card` | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `--active-background-color` | `string` | TODO | Official CSS variable contract. |
| `--align-items` | `string` | TODO | Official CSS variable contract. |
| `--border-bottom` | `string` | TODO | Official CSS variable contract. |
| `--border-inner` | `string` | TODO | Official CSS variable contract. |
| `--border-top` | `string` | TODO | Official CSS variable contract. |
| `--extra-max-width` | `string` | TODO | Official CSS variable contract. |
| `--font-size` | `string` | TODO | Official CSS variable contract. |
| `--header-font-size` | `string` | TODO | Official CSS variable contract. |
| `--padding-left` | `string` | TODO | Official CSS variable contract. |
| `--padding-right` | `string` | TODO | Official CSS variable contract. |
| `--prefix-padding-right` | `string` | TODO | Official CSS variable contract. |
| `--prefix-width` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| TODO | TODO |

### Metrics

- cardMargin=12px
- cardRadius=8px
- headerPaddingY=8px
- itemContentPaddingY=12px
- itemExtraPaddingLeft=12px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--header-font-size` | cssVar | default `var(--adm-font-size-7)` in official list.less |
| `--prefix-padding-right` | cssVar | default `12px` in official list.less |
| `--align-items` | cssVar | default `center` in official list.less |
| `--active-background-color` | cssVar | default `var(--adm-color-border)` in official list.less |
| `--font-size` | cssVar | default `var(--adm-font-size-9)` in official list.less |
| `--extra-max-width` | cssVar | default `70%` in official list.less |

## Cell

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `title` | `reactNode` | TODO | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `description` | `reactNode` | TODO | General prop contract. |
| `prefix` | `reactNode` | TODO | General prop contract. |
| `extra` | `reactNode` | TODO | General prop contract. |
| `clickable` | `boolean` | `false`, `true` | General prop contract. |
| `arrowIcon` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `arrow` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | General prop contract. |
| `--prefix-width` | `string` | TODO | Official CSS variable contract. |
| `--align-items` | `string` | TODO | Official CSS variable contract. |
| `--active-background-color` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| `item.default` | Declared in spec state group `item`. |
| `item.disabled` | Declared in spec state group `item`. |
| `item.active` | Declared in spec state group `item`. |

### Metrics

- contentPaddingY=12px
- extraPaddingLeft=12px
- arrowMarginLeft=4px
- arrowFontSize=19px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--prefix-width` | cssVar | Official CSS variable contract |
| `--align-items` | cssVar | Official CSS variable contract |
| `--active-background-color` | cssVar | Official CSS variable contract |

## Render Expectations

- List mode and cell clickable states must remain visible in row treatment.
- Prefix, extra, description, and arrow areas must preserve spacing metrics.

## Failure Cases

- Cell extra/prefix spacing collapsed.
- List card mode rendered like default mode.
- Deprecated `arrow` support removed from runtime.

## Inspection Payload Example

```json
{
  "document": {
    "name": "list-cell-inspection screen",
    "screen": "list-cell-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_7",
    "type": "INSTANCE",
    "name": "Default List",
    "x": 48,
    "y": 116,
    "width": 358,
    "height": 160,
    "component": "List",
    "style": {
      "paddingY": 9,
      "fontSize": 15,
      "lineHeight": 22,
      "fontWeight": "regular"
    },
    "variant": {
      "header": "Settings",
      "mode": "default",
      "children": "General|Notifications|Privacy"
    },
    "variables": {},
    "text": "Settings"
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
        "content": "List / Cell Inspection",
        "width": 358,
        "height": 32,
        "textStyle": "text/heading/xl",
        "colorToken": "semantic.text.primary"
      }
    ]
  },
  {
    "type": "stack",
    "name": "list-section",
    "x": 48,
    "y": 116,
    "width": 1320,
    "direction": "vertical",
    "gap": 16,
    "children": [
      {
        "type": "text",
        "name": "Text 2",
        "content": "List Props",
        "width": 358,
        "height": 24,
        "textStyle": "text/body/lg",
        "colorToken": "semantic.text.secondary"
      },
      {
        "type": "stack",
        "name": "list-row-1",
        "direction": "horizontal",
        "gap": 16,
        "width": 1320,
        "children": [
          {
            "type": "component",
            "name": "Default List",
            "component": "list",
            "props": {
              "header": "Settings",
              "mode": "default",
              "children": "General|Notifications|Privacy"
            },
            "width": 358,
            "height": 160,
            "label": "Default List"
          },
          {
            "type": "component",
            "name": "Card List",
            "component": "list",
            "props": {
              "header": "Account",
              "mode": "card",
              "children": "Profile|Billing|Security"
...
```
