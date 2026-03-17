---
title: Tabs
---

# Tabs

## Purpose

Core segmented navigation baseline for Ant Design Mobile Tabs and Tab behavior.

## Source Baseline

- Ant Design Mobile TabsProps and TabProps
- Inspection screen: `tabs-inspection`
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
- Node count: `15`

## Tabs

- Spec file: `packages/ui-core/specs/tabs.spec.yaml`
- Purpose: freeze Ant Design Mobile Tabs and Tab props as the core tabs schema

## Props / Axes

| Field | Value |
| --- | --- |
| activeKey | string |
| defaultActiveKey | string |
| activeLineMode | auto | full | fixed |
| stretch | false | true |
| onChange | function |
| children | reactNode |
| direction | ltr | rtl |
| autoScroll | false | true |
| --fixed-active-line-width | string |
| --active-line-height | string |
| --active-line-border-radius | string |
| --title-font-size | string |
| --content-padding | string |
| --active-title-color | string |
| --active-line-color | string |

## Nested Item Props

| Field | Value |
| --- | --- |
| title | reactNode |
| disabled | false | true |
| forceRender | false | true |
| destroyOnClose | false | true |
| children | reactNode |

## States

| Field | Value |
| --- | --- |
| tab | default | active | disabled |

## Metrics

| Field | Value |
| --- | --- |
| tabPaddingX | 12px |
| tabPaddingTop | 8px |
| tabPaddingBottom | 10px |
| contentPadding | 12px |
| activeLineHeight | 2px |

## Token References

- `--fixed-active-line-width`
- `--active-line-height`
- `--active-line-border-radius`
- `--title-font-size`
- `--content-padding`
- `--active-title-color`
- `--active-line-color`

