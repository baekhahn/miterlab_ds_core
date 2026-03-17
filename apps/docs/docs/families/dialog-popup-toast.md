---
title: Dialog / Popup / Toast
---

# Dialog / Popup / Toast

## Purpose

Core overlay baseline for Ant Design Mobile dialog, popup, and toast behavior.

## Source Baseline

- Ant Design Mobile DialogProps, PopupProps, ToastShowProps
- Inspection screen: `overlay-inspection`
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
- Node count: `11`

## Dialog

- Spec file: `packages/ui-core/specs/dialog.spec.yaml`
- Purpose: freeze Ant Design Mobile DialogProps as the core dialog schema

## Props / Axes

| Field | Value |
| --- | --- |
| afterClose | function |
| afterShow | function |
| bodyClassName | string |
| bodyStyle | object |
| destroyOnClose | false | true |
| disableBodyScroll | false | true |
| forceRender | false | true |
| getContainer | function |
| maskClassName | string |
| maskStyle | object |
| stopPropagation | array |
| visible | false | true |
| image | string |
| header | reactNode |
| title | reactNode |
| content | reactNode |
| actions | array |
| onAction | function |
| onClose | function |
| closeOnAction | false | true |
| closeOnMaskClick | false | true |
| --background-color | string |
| --border-radius | string |
| --max-width | string |
| --min-width | string |
| --z-index | string |


## States

| Field | Value |
| --- | --- |
| dialog | hidden | visible |

## Metrics

| Field | Value |
| --- | --- |
| maxBodyHeight | 70vh |
| imageMaxHeight | 40vh |
| headerMarginBottom | 8px |
| contentPaddingX | 12px |
| contentPaddingBottom | 20px |
| actionPadding | 10px |

## Token References

- `--background-color`
- `--border-radius`
- `--max-width`
- `--min-width`
- `--z-index`

## Popup

- Spec file: `packages/ui-core/specs/popup.spec.yaml`
- Purpose: freeze Ant Design Mobile PopupProps as the core popup schema

## Props / Axes

| Field | Value |
| --- | --- |
| afterClose | function |
| afterShow | function |
| bodyClassName | string |
| bodyStyle | object |
| closeOnMaskClick | false | true |
| closeIcon | reactNode |
| destroyOnClose | false | true |
| disableBodyScroll | false | true |
| forceRender | false | true |
| getContainer | function |
| mask | false | true |
| maskClassName | string |
| maskStyle | object |
| onClick | function |
| onClose | function |
| onMaskClick | function |
| showCloseButton | false | true |
| stopPropagation | array |
| visible | false | true |
| children | reactNode |
| position | bottom | top | left | right |
| closeOnSwipe | false | true |
| --z-index | string |


## States

| Field | Value |
| --- | --- |
| popup | hidden | visible |

## Metrics

| Field | Value |
| --- | --- |
| closeIconOffset | 8px |
| closeIconPadding | 4px |
| closeIconSize | 18px |

## Token References

- `--z-index`

## Toast

- Spec file: `packages/ui-core/specs/toast.spec.yaml`
- Purpose: freeze Ant Design Mobile ToastShowProps as the core toast schema

## Props / Axes

| Field | Value |
| --- | --- |
| afterClose | function |
| maskStyle | object |
| maskClassName | string |
| maskClickable | false | true |
| content | reactNode |
| icon | success | fail | loading | reactNode |
| duration | number |
| position | top | bottom | center |
| getContainer | function |
| stopPropagation | array |


## States

| Field | Value |
| --- | --- |
| toast | visible | hidden |

## Metrics

| Field | Value |
| --- | --- |
| maxWidth | 204px |
| radius | 8px |
| textPadding | 12px |
| iconPaddingY | 35px |
| iconPaddingX | 12px |
| iconSize | 36px |

## Token References

- `--size`

