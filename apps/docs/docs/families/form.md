---
title: Form
---

# Form

## Purpose

Core form container and item baseline for Ant Design Mobile Form behavior.

## Source Baseline

- Ant Design Mobile FormProps and FormItemProps
- Inspection screen: `form-inspection`
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
- Node count: `7`

## Form

- Spec file: `packages/ui-core/specs/form.spec.yaml`
- Purpose: freeze Ant Design Mobile FormProps and FormItemProps as the core form schema

## Props / Axes

| Field | Value |
| --- | --- |
| form | formInstance |
| initialValues | object |
| name | string |
| preserve | false | true |
| validateMessages | object |
| validateTrigger | string |
| onFieldsChange | function |
| onFinish | function |
| onFinishFailed | function |
| onValuesChange | function |
| children | reactNode |
| footer | reactNode |
| mode | default | card |
| layout | vertical | horizontal |
| label | reactNode |
| help | reactNode |
| helpIcon | reactNode |
| hasFeedback | false | true |
| required | false | true |
| noStyle | false | true |
| disabled | false | true |
| hidden | false | true |
| childElementPosition | normal | right |
| extra | reactNode |
| clickable | false | true |
| arrow | false | true | reactNode |
| arrowIcon | false | true | reactNode |
| description | reactNode |
| dependencies | array |
| valuePropName | string |
| rules | array |
| messageVariables | object |
| trigger | string |
| shouldUpdate | false | true | function |
| initialValue | any |
| getValueFromEvent | function |
| getValueProps | function |
| normalize | function |
| validateFirst | false | true |
| onClick | function |
| --border-inner | string |
| --border-top | string |
| --border-bottom | string |
| --prefix-width | string |


## States

| Field | Value |
| --- | --- |
| item | default | hidden | disabled | error | warning |

## Metrics

| Field | Value |
| --- | --- |
| footerPaddingY | 20px |
| footerPaddingX | 12px |
| prefixWidth | 6.8em |
| verticalLabelMarginBottom | 4px |
| feedbackMarginTop | 4px |

## Token References

- `--border-inner`
- `--border-top`
- `--border-bottom`
- `--prefix-width`

