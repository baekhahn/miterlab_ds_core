---
title: Tabs
---

# Tabs

## Purpose

Primary segmented navigation baseline for Ant Design Mobile Tabs behavior.

## Source Baseline

- Ant Design Mobile TabsProps and TabProps
- Spec files: `packages/ui-core/specs/tabs.spec.yaml`
- Parity mismatch count: `0`

## Inspection Screen

- Screen name: `tabs-inspection`
- Summary artifact: `artifacts/figma/tabs-inspection/summary.json`
- Payload artifact: `artifacts/figma/tabs-inspection/mcp-payload.json`
- Layout artifact: `artifacts/figma/tabs-inspection/layout.json`

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
- Node count: `15`
- Component count: `7`
- Warnings: none

## Metrics

- tabPaddingX=12px
- tabPaddingTop=8px
- tabPaddingBottom=10px
- contentPadding=12px
- activeLineHeight=2px

## Token References

- CSS variable: `--fixed-active-line-width`
- CSS variable: `--active-line-height`
- CSS variable: `--active-line-border-radius`
- CSS variable: `--title-font-size`
- CSS variable: `--content-padding`
- CSS variable: `--active-title-color`
- CSS variable: `--active-line-color`

## Tabs

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `activeKey` | `string` | TODO | General prop contract. |
| `defaultActiveKey` | `string` | TODO | General prop contract. |
| `activeLineMode` | `string` | `auto`, `full`, `fixed` | General prop contract. |
| `stretch` | `boolean` | `false`, `true` | General prop contract. |
| `onChange` | `function` | TODO | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `direction` | `string` | `ltr`, `rtl` | General prop contract. |
| `autoScroll` | `boolean` | `false`, `true` | General prop contract. |
| `--fixed-active-line-width` | `string` | TODO | Official CSS variable contract. |
| `--active-line-height` | `string` | TODO | Official CSS variable contract. |
| `--active-line-border-radius` | `string` | TODO | Official CSS variable contract. |
| `--title-font-size` | `string` | TODO | Official CSS variable contract. |
| `--content-padding` | `string` | TODO | Official CSS variable contract. |
| `--active-title-color` | `string` | TODO | Official CSS variable contract. |
| `--active-line-color` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| `tab.default` | Declared in spec state group `tab`. |
| `tab.active` | Declared in spec state group `tab`. |
| `tab.disabled` | Declared in spec state group `tab`. |

### Metrics

- tabPaddingX=12px
- tabPaddingTop=8px
- tabPaddingBottom=10px
- contentPadding=12px
- activeLineHeight=2px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--fixed-active-line-width` | cssVar | Official CSS variable contract |
| `--active-line-height` | cssVar | Official CSS variable contract |
| `--active-line-border-radius` | cssVar | Official CSS variable contract |
| `--title-font-size` | cssVar | Official CSS variable contract |
| `--content-padding` | cssVar | Official CSS variable contract |
| `--active-title-color` | cssVar | Official CSS variable contract |
| `--active-line-color` | cssVar | Official CSS variable contract |

## Render Expectations

- Active line width and placement must follow `activeLineMode`.
- Disabled tabs must preserve layout while suppressing active styling.
- Content padding must remain aligned with `--content-padding` and metrics.

## Failure Cases

- Tabs flattened into a single active line mode.
- Disabled tab still receives active line treatment.
- Direction axis ignored for layout and content order.

## Inspection Payload Example

```json
{
  "document": {
    "name": "tabs-inspection screen",
    "screen": "tabs-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_7",
    "type": "INSTANCE",
    "name": "Auto Line",
    "x": 48,
    "y": 116,
    "width": 320,
    "height": 92,
    "component": "Tabs",
    "style": {
      "paddingY": 10,
      "fontSize": 14,
      "lineHeight": 20,
      "fontWeight": "medium"
    },
    "variant": {
      "activeKey": "activity",
      "activeLineMode": "auto",
      "children": "overview:Overview|activity:Activity|settings:Settings"
    },
    "variables": {},
    "text": "overview:Overview|activity:Activity|settings:Settings"
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
        "content": "Tabs Inspection",
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
        "content": "Tabs Props",
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
            "name": "Auto Line",
            "component": "tabs",
            "props": {
              "activeKey": "activity",
              "activeLineMode": "auto",
              "children": "overview:Overview|activity:Activity|settings:Settings"
            },
            "width": 320,
            "height": 92,
            "label": "Auto Line"
          },
          {
            "type": "component",
            "name": "Full Line Stretch",
            "component": "tabs",
            "props": {
              "activeKey": "home",
              "activeLineMode": "full",
        
...
```
