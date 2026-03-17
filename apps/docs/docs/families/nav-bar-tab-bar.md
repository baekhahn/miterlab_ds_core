---
title: NavBar / TabBar
---

# NavBar / TabBar

## Purpose

Top and bottom navigation baseline for Ant Design Mobile navigation components.

## Source Baseline

- Ant Design Mobile NavBarProps and TabBarProps
- Spec files: `packages/ui-core/specs/nav-bar.spec.yaml`, `packages/ui-core/specs/tab-bar.spec.yaml`
- Parity mismatch count: `0`
- Spec notes: `source schema is Ant Design Mobile NavBarProps`, `deprecated field `backArrow` is retained because it exists in the official API`, `source schema is Ant Design Mobile TabBarProps and TabBarItemProps`

## Inspection Screen

- Screen name: `navigation-inspection`
- Summary artifact: `artifacts/figma/navigation-inspection/summary.json`
- Payload artifact: `artifacts/figma/navigation-inspection/mcp-payload.json`
- Layout artifact: `artifacts/figma/navigation-inspection/layout.json`

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
- Node count: `10`
- Component count: `2`
- Warnings: none

## Metrics

- height=45px
- paddingX=12px
- backMarginRight=16px
- backPaddingY=6px
- backArrowSize=24px
- minHeight=48px
- itemPaddingY=4px
- itemPaddingX=8px
- iconSize=24px
- titleLineHeight=15px

## Token References

- cssVar: `--height` -> default `45px` in official nav-bar.less
- cssVar: `--border-bottom` -> default `none` in official nav-bar.less
- antToken: `colorPrimary` -> active item color is `var(--adm-color-primary)` in official tab-bar.less
- antToken: `colorTextSecondary` -> inactive item color is `var(--adm-color-text-secondary)` in official tab-bar.less

## NavBar

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `back` | `reactNode` | TODO | General prop contract. |
| `backIcon` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | General prop contract. |
| `backArrow` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | General prop contract. |
| `left` | `reactNode` | TODO | General prop contract. |
| `right` | `reactNode` | TODO | General prop contract. |
| `onBack` | `function` | TODO | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `--height` | `string` | TODO | Official CSS variable contract. |
| `--border-bottom` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| TODO | TODO |

### Metrics

- height=45px
- paddingX=12px
- backMarginRight=16px
- backPaddingY=6px
- backArrowSize=24px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--height` | cssVar | default `45px` in official nav-bar.less |
| `--border-bottom` | cssVar | default `none` in official nav-bar.less |

## TabBar

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `activeKey` | `string` | TODO | General prop contract. |
| `defaultActiveKey` | `string` | TODO | General prop contract. |
| `onChange` | `function` | TODO | General prop contract. |
| `safeArea` | `boolean` | `false`, `true` | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |

### States

| State | Expectation |
| --- | --- |
| `item.default` | Declared in spec state group `item`. |
| `item.active` | Declared in spec state group `item`. |

### Metrics

- minHeight=48px
- itemPaddingY=4px
- itemPaddingX=8px
- iconSize=24px
- titleLineHeight=15px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `colorPrimary` | antToken | active item color is `var(--adm-color-primary)` in official tab-bar.less |
| `colorTextSecondary` | antToken | inactive item color is `var(--adm-color-text-secondary)` in official tab-bar.less |

## Render Expectations

- NavBar top layout and TabBar bottom layout must remain family-specific.
- Active navigation item state must remain visible for TabBar.

## Failure Cases

- NavBar and TabBar routed through tabs presets.
- Back icon or safe area axes dropped.
- Item badge or icon mapping ignored.

## Inspection Payload Example

```json
{
  "document": {
    "name": "navigation-inspection screen",
    "screen": "navigation-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_5",
    "type": "INSTANCE",
    "name": "NavBar",
    "x": 48,
    "y": 40,
    "width": 358,
    "height": 45,
    "component": "NavBar",
    "style": {
      "paddingY": 9,
      "fontSize": 15,
      "lineHeight": 22,
      "fontWeight": "regular"
    },
    "variant": {
      "backIcon": true,
      "right": "Edit",
      "children": "Page title"
    },
    "variables": {},
    "text": "Page title"
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
        "content": "Navigation Inspection",
        "width": 358,
        "height": 32,
        "textStyle": "text/heading/xl",
        "colorToken": "semantic.text.primary"
      },
      {
        "type": "stack",
        "name": "header-row-1",
        "direction": "horizontal",
        "gap": 16,
        "width": 1320,
        "children": [
          {
            "type": "component",
            "name": "NavBar",
            "component": "nav-bar",
            "props": {
              "backIcon": true,
              "right": "Edit",
              "children": "Page title"
            },
            "width": 358,
            "height": 45,
            "label": "NavBar"
          }
        ]
      }
    ]
  },
  {
    "type": "stack",
    "name": "content-section",
    "x": 48,
    "y": 156,
    "width": 1320,
    "direction": "vertical",
    "gap": 16,
    "children": [
      {
        "type": "text",
        "name": "Text 3",
        "content": "TabBar Props",
        "width": 358,
        "height": 24,
        "textStyle": "text/body/lg",
        "colorToken": "semantic.text.secondary"
      }
    ]
  }
]
```
