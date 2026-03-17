---
title: Form
---

# Form

## Purpose

Field grouping and validation baseline for Ant Design Mobile Form behavior.

## Source Baseline

- Ant Design Mobile FormProps and FormItemProps
- Spec files: `packages/ui-core/specs/form.spec.yaml`
- Parity mismatch count: `0`

## Inspection Screen

- Screen name: `form-inspection`
- Summary artifact: `artifacts/figma/form-inspection/summary.json`
- Payload artifact: `artifacts/figma/form-inspection/mcp-payload.json`
- Layout artifact: `artifacts/figma/form-inspection/layout.json`

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
- Node count: `7`
- Component count: `2`
- Warnings: none

## Metrics

- footerPaddingY=20px
- footerPaddingX=12px
- prefixWidth=6.8em
- verticalLabelMarginBottom=4px
- feedbackMarginTop=4px

## Token References

- CSS variable: `--border-inner`
- CSS variable: `--border-top`
- CSS variable: `--border-bottom`
- CSS variable: `--prefix-width`

## Form

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `form` | `formInstance` | TODO | General prop contract. |
| `initialValues` | `object` | TODO | General prop contract. |
| `name` | `string` | TODO | General prop contract. |
| `preserve` | `boolean` | `false`, `true` | General prop contract. |
| `validateMessages` | `object` | TODO | General prop contract. |
| `validateTrigger` | `string` | TODO | General prop contract. |
| `onFieldsChange` | `function` | TODO | General prop contract. |
| `onFinish` | `function` | TODO | General prop contract. |
| `onFinishFailed` | `function` | TODO | General prop contract. |
| `onValuesChange` | `function` | TODO | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `footer` | `reactNode` | TODO | General prop contract. |
| `mode` | `string` | `default`, `card` | General prop contract. |
| `layout` | `string` | `vertical`, `horizontal` | General prop contract. |
| `label` | `reactNode` | TODO | General prop contract. |
| `help` | `reactNode` | TODO | General prop contract. |
| `helpIcon` | `reactNode` | TODO | General prop contract. |
| `hasFeedback` | `boolean` | `false`, `true` | General prop contract. |
| `required` | `boolean` | `false`, `true` | General prop contract. |
| `noStyle` | `boolean` | `false`, `true` | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `hidden` | `boolean` | `false`, `true` | General prop contract. |
| `childElementPosition` | `string` | `normal`, `right` | General prop contract. |
| `extra` | `reactNode` | TODO | General prop contract. |
| `clickable` | `boolean` | `false`, `true` | General prop contract. |
| `arrow` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | General prop contract. |
| `arrowIcon` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | General prop contract. |
| `description` | `reactNode` | TODO | General prop contract. |
| `dependencies` | `array` | TODO | General prop contract. |
| `valuePropName` | `string` | TODO | General prop contract. |
| `rules` | `array` | TODO | General prop contract. |
| `messageVariables` | `object` | TODO | General prop contract. |
| `trigger` | `string` | TODO | General prop contract. |
| `shouldUpdate` | `boolean`, `function` | `false`, `true`, `function` | General prop contract. |
| `initialValue` | `any` | TODO | General prop contract. |
| `getValueFromEvent` | `function` | TODO | General prop contract. |
| `getValueProps` | `function` | TODO | General prop contract. |
| `normalize` | `function` | TODO | General prop contract. |
| `validateFirst` | `boolean` | `false`, `true` | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `--border-inner` | `string` | TODO | Official CSS variable contract. |
| `--border-top` | `string` | TODO | Official CSS variable contract. |
| `--border-bottom` | `string` | TODO | Official CSS variable contract. |
| `--prefix-width` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| `item.default` | Declared in spec state group `item`. |
| `item.hidden` | Declared in spec state group `item`. |
| `item.disabled` | Declared in spec state group `item`. |
| `item.error` | Declared in spec state group `item`. |
| `item.warning` | Declared in spec state group `item`. |

### Metrics

- footerPaddingY=20px
- footerPaddingX=12px
- prefixWidth=6.8em
- verticalLabelMarginBottom=4px
- feedbackMarginTop=4px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--border-inner` | cssVar | Official CSS variable contract |
| `--border-top` | cssVar | Official CSS variable contract |
| `--border-bottom` | cssVar | Official CSS variable contract |
| `--prefix-width` | cssVar | Official CSS variable contract |

## Render Expectations

- Form layout, mode, and item state must remain explicit in payload and renderer.
- Help, extra, feedback, and required indicators must preserve the spec contract.

## Failure Cases

- Horizontal/vertical layout collapsed into one presentation.
- Error or warning item states ignored.
- Form item props merged into generic list cells without form semantics.

## Inspection Payload Example

```json
{
  "document": {
    "name": "form-inspection screen",
    "screen": "form-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_6",
    "type": "INSTANCE",
    "name": "Email",
    "x": 48,
    "y": 116,
    "width": 358,
    "height": 280,
    "component": "Form",
    "style": {
      "paddingY": 9,
      "fontSize": 15,
      "lineHeight": 22,
      "fontWeight": "regular"
    },
    "variant": {
      "footer": "Submit",
      "mode": "default",
      "layout": "vertical",
      "label": "Email",
      "help": "We will never share your email.",
      "required": true,
      "childElementPosition": "normal",
      "description": "Primary account email"
    },
    "variables": {},
    "text": "Email"
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
        "content": "Form Inspection",
        "width": 358,
        "height": 32,
        "textStyle": "text/heading/xl",
        "colorToken": "semantic.text.primary"
      }
    ]
  },
  {
    "type": "stack",
    "name": "form-section",
    "x": 48,
    "y": 116,
    "width": 1320,
    "direction": "vertical",
    "gap": 16,
    "children": [
      {
        "type": "stack",
        "name": "form-row-1",
        "direction": "horizontal",
        "gap": 16,
        "width": 1320,
        "children": [
          {
            "type": "component",
            "name": "Email",
            "component": "form",
            "props": {
              "footer": "Submit",
              "mode": "default",
              "layout": "vertical",
              "label": "Email",
              "help": "We will never share your email.",
              "required": true,
              "childElementPosition": "normal",
              "description": "Primary account email"
            },
            "width": 358,
            "height": 280,
            "label": "Email"
          },
          {
            "type": "component",
            "name": "Phone",
            "component": "form",
            "props": {
              "mode": "card",
              "layout": "horizontal",
              "label": "Phone",
              "help": "Optional",
              "childElementPosition": "
...
```
