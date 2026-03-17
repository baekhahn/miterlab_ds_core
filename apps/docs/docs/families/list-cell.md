---
title: List / Cell
---

# List / Cell

## Purpose

Core data list row baseline for Ant Design Mobile List and ListItem behavior.

## Source Baseline

- Ant Design Mobile ListProps and ListItemProps
- Inspection screen: `list-cell-inspection`
- Parity mismatch count: `0`

## Current Status

| Check | Status |
| --- | --- |
| Spec parity | verified |
| Generator parity | verified |
| Plugin parity | verified |
| Canvas write verification | pending |

## Inspection Result

- Generation score: `100`
- Passed: `true`
- Node count: `13`

## List

- Spec file: `packages/ui-core/specs/list.spec.yaml`
- Purpose: freeze Ant Design Mobile List props as the core list schema

## Props / Axes

| Field | Value |
| --- | --- |
| header | reactNode |
| mode | default | card |
| children | reactNode |
| --active-background-color | string |
| --align-items | string |
| --border-bottom | string |
| --border-inner | string |
| --border-top | string |
| --extra-max-width | string |
| --font-size | string |
| --header-font-size | string |
| --padding-left | string |
| --padding-right | string |
| --prefix-padding-right | string |
| --prefix-width | string |


## States

None.

## Metrics

| Field | Value |
| --- | --- |
| cardMargin | 12px |
| cardRadius | 8px |
| headerPaddingY | 8px |
| itemContentPaddingY | 12px |
| itemExtraPaddingLeft | 12px |

## Token References

- `--active-background-color`
- `--align-items`
- `--border-bottom`
- `--border-inner`
- `--border-top`
- `--extra-max-width`
- `--font-size`
- `--header-font-size`
- `--padding-left`
- `--padding-right`
- `--prefix-padding-right`
- `--prefix-width`

## Cell

- Spec file: `packages/ui-core/specs/cell.spec.yaml`
- Purpose: freeze Ant Design Mobile ListItem props as the core cell schema

## Props / Axes

| Field | Value |
| --- | --- |
| title | reactNode |
| children | reactNode |
| description | reactNode |
| prefix | reactNode |
| extra | reactNode |
| clickable | false | true |
| arrowIcon | false | true | reactNode |
| disabled | false | true |
| onClick | function |
| arrow | false | true | reactNode |
| --prefix-width | string |
| --align-items | string |
| --active-background-color | string |


## States

| Field | Value |
| --- | --- |
| item | default | disabled | active |

## Metrics

| Field | Value |
| --- | --- |
| contentPaddingY | 12px |
| extraPaddingLeft | 12px |
| arrowMarginLeft | 4px |
| arrowFontSize | 19px |

## Token References

- `--prefix-width`
- `--align-items`
- `--active-background-color`

