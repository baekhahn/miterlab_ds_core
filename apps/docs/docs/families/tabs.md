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
- Spec notes: `activeKey and defaultActiveKey allow null in the official API`, `source schema is Ant Design Mobile TabsProps and TabProps`

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

- cssVar: `--title-font-size` -> default `var(--adm-font-size-9)` in official tabs.less
- cssVar: `--content-padding` -> default `12px` in official tabs.less
- cssVar: `--active-line-height` -> default `2px` in official tabs.less
- cssVar: `--active-line-border-radius` -> default `var(--active-line-height)` in official tabs.less
- cssVar: `--active-line-color` -> default `var(--adm-color-primary)` in official tabs.less
- cssVar: `--active-title-color` -> default `var(--adm-color-primary)` in official tabs.less

## Tabs

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `activeKey` | `string` | `string`, `null` | General prop contract. |
| `defaultActiveKey` | `string` | `string`, `null` | General prop contract. |
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
| `--title-font-size` | cssVar | default `var(--adm-font-size-9)` in official tabs.less |
| `--content-padding` | cssVar | default `12px` in official tabs.less |
| `--active-line-height` | cssVar | default `2px` in official tabs.less |
| `--active-line-border-radius` | cssVar | default `var(--active-line-height)` in official tabs.less |
| `--active-line-color` | cssVar | default `var(--adm-color-primary)` in official tabs.less |
| `--active-title-color` | cssVar | default `var(--adm-color-primary)` in official tabs.less |

## Variant Axes Table

### Tabs

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `activeKey` | `string` | `string`, `null` | General prop contract. |
| `defaultActiveKey` | `string` | `string`, `null` | General prop contract. |
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

## Inspection Mapping

- Inspection row `Line Modes` verifies `activeLineMode=auto|full|fixed`.
- Inspection row `Direction and Scroll` verifies `direction` and `autoScroll` behavior.
- Inspection row `Disabled Tabs` verifies `tab.disabled` remains visually distinct.

## State Mapping

### Tabs

| State | Expectation |
| --- | --- |
| `tab.default` | Declared in spec state group `tab`. |
| `tab.active` | Declared in spec state group `tab`. |
| `tab.disabled` | Declared in spec state group `tab`. |

## Render Expectations

- Active line width and placement must follow `activeLineMode`.
- Disabled tabs must preserve layout while suppressing active styling.
- Content padding must remain aligned with `--content-padding` and metrics.

## Current Runtime Gaps

- none

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
