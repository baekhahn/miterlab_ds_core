---
title: NavBar / TabBar
---

# NavBar / TabBar

## Purpose

Core navigation bar baseline for Ant Design Mobile NavBar and TabBar behavior.

## Source Baseline

- Ant Design Mobile NavBarProps and TabBarProps
- Inspection screen: `navigation-inspection`
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
- Node count: `10`

## NavBar

- Spec file: `packages/ui-core/specs/nav-bar.spec.yaml`
- Purpose: freeze Ant Design Mobile NavBarProps as the core navigation bar schema

## Props / Axes

| Field | Value |
| --- | --- |
| back | reactNode |
| backIcon | false | true | reactNode |
| backArrow | false | true | reactNode |
| left | reactNode |
| right | reactNode |
| onBack | function |
| children | reactNode |
| --height | string |
| --border-bottom | string |


## States

None.

## Metrics

| Field | Value |
| --- | --- |
| height | 45px |
| paddingX | 12px |
| backMarginRight | 16px |
| backPaddingY | 6px |
| backArrowSize | 24px |

## Token References

- `--height`
- `--border-bottom`

## TabBar

- Spec file: `packages/ui-core/specs/tab-bar.spec.yaml`
- Purpose: freeze Ant Design Mobile TabBarProps and TabBarItemProps as the core tab bar schema

## Props / Axes

| Field | Value |
| --- | --- |
| activeKey | string |
| defaultActiveKey | string |
| onChange | function |
| safeArea | false | true |
| children | reactNode |

## Nested Item Props

| Field | Value |
| --- | --- |
| icon | reactNode | function |
| title | reactNode | function |
| badge | reactNode |
| onClick | function |

## States

| Field | Value |
| --- | --- |
| item | default | active |

## Metrics

| Field | Value |
| --- | --- |
| minHeight | 48px |
| itemPaddingY | 4px |
| itemPaddingX | 8px |
| iconSize | 24px |
| titleLineHeight | 15px |

## Token References

None.

