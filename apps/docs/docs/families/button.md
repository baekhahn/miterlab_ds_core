---
title: Button
---

# Button

## Purpose

Core action control baseline for Ant Design Mobile Button behavior.

## Source Baseline

- Ant Design Mobile ButtonProps
- Inspection screen: `button-inspection`
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
- Node count: `25`

## Button

- Spec file: `packages/ui-core/specs/button.spec.yaml`
- Purpose: adopt Ant Design Mobile button props directly for the core button family baseline

## Props / Axes

| Field | Value |
| --- | --- |
| color | default | primary | success | warning | danger |
| fill | solid | outline | none |
| size | mini | small | middle | large |
| shape | default | rounded | rectangular |
| block | false | true |
| loading | false | true | auto |
| loadingText | string |
| loadingIcon | reactNode |
| disabled | false | true |
| onClick | function |
| type | button | submit | reset |
| children | reactNode |
| onMouseDown | function |
| onMouseUp | function |
| onTouchStart | function |
| onTouchEnd | function |
| id | string |
| form | string |
| --text-color | string |
| --background-color | string |
| --border-radius | string |
| --border-width | string |
| --border-style | string |
| --border-color | string |


## States

| Field | Value |
| --- | --- |
| 0 | default |
| 1 | hover |
| 2 | pressed |
| 3 | focus |
| 4 | disabled |
| 5 | loading |

## Metrics

None.

## Token References

None.

