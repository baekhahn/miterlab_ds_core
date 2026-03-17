---
title: Dialog / Popup / Toast
---

# Dialog / Popup / Toast

## Purpose

Overlay and transient messaging baseline for Ant Design Mobile dialog, popup, and toast behaviors.

## Source Baseline

- Ant Design Mobile DialogProps, PopupProps, and ToastShowProps
- Spec files: `packages/ui-core/specs/dialog.spec.yaml`, `packages/ui-core/specs/popup.spec.yaml`, `packages/ui-core/specs/toast.spec.yaml`
- Parity mismatch count: `0`
- Spec notes: `source schema is Ant Design Mobile DialogProps`, `source schema is Ant Design Mobile PopupProps`, `source schema is Ant Design Mobile ToastShowProps`

## Inspection Screen

- Screen name: `overlay-inspection`
- Summary artifact: `artifacts/figma/overlay-inspection/summary.json`
- Payload artifact: `artifacts/figma/overlay-inspection/mcp-payload.json`
- Layout artifact: `artifacts/figma/overlay-inspection/layout.json`

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
- Node count: `11`
- Component count: `3`
- Warnings: none

## Metrics

- maxBodyHeight=70vh
- imageMaxHeight=40vh
- headerMarginBottom=8px
- contentPaddingX=12px
- contentPaddingBottom=20px
- actionPadding=10px
- closeIconOffset=8px
- closeIconPadding=4px
- closeIconSize=18px
- maxWidth=204px
- radius=8px
- textPadding=12px
- iconPaddingY=35px
- iconPaddingX=12px
- iconSize=36px

## Token References

- cssVar: `--z-index` -> default `var(--adm-dialog-z-index, 1000)` in official dialog.less
- CSS variable: `--z-index`
- CSS variable: `--size`

## Dialog

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `afterClose` | `function` | TODO | General prop contract. |
| `afterShow` | `function` | TODO | General prop contract. |
| `bodyClassName` | `string` | TODO | General prop contract. |
| `bodyStyle` | `object` | TODO | General prop contract. |
| `destroyOnClose` | `boolean` | `false`, `true` | General prop contract. |
| `disableBodyScroll` | `boolean` | `false`, `true` | General prop contract. |
| `forceRender` | `boolean` | `false`, `true` | General prop contract. |
| `getContainer` | `function` | TODO | General prop contract. |
| `maskClassName` | `string` | TODO | General prop contract. |
| `maskStyle` | `object` | TODO | General prop contract. |
| `stopPropagation` | `array` | TODO | General prop contract. |
| `visible` | `boolean` | `false`, `true` | General prop contract. |
| `image` | `string` | TODO | General prop contract. |
| `header` | `reactNode` | TODO | General prop contract. |
| `title` | `reactNode` | TODO | General prop contract. |
| `content` | `reactNode` | TODO | General prop contract. |
| `actions` | `array` | TODO | General prop contract. |
| `onAction` | `function` | TODO | General prop contract. |
| `onClose` | `function` | TODO | General prop contract. |
| `closeOnAction` | `boolean` | `false`, `true` | General prop contract. |
| `closeOnMaskClick` | `boolean` | `false`, `true` | General prop contract. |
| `--background-color` | `string` | TODO | Official CSS variable contract. |
| `--border-radius` | `string` | TODO | Official CSS variable contract. |
| `--max-width` | `string` | TODO | Official CSS variable contract. |
| `--min-width` | `string` | TODO | Official CSS variable contract. |
| `--z-index` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| `dialog.hidden` | Declared in spec state group `dialog`. |
| `dialog.visible` | Declared in spec state group `dialog`. |

### Metrics

- maxBodyHeight=70vh
- imageMaxHeight=40vh
- headerMarginBottom=8px
- contentPaddingX=12px
- contentPaddingBottom=20px
- actionPadding=10px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--z-index` | cssVar | default `var(--adm-dialog-z-index, 1000)` in official dialog.less |

## Popup

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `afterClose` | `function` | TODO | General prop contract. |
| `afterShow` | `function` | TODO | General prop contract. |
| `bodyClassName` | `string` | TODO | General prop contract. |
| `bodyStyle` | `object` | TODO | General prop contract. |
| `closeOnMaskClick` | `boolean` | `false`, `true` | General prop contract. |
| `closeIcon` | `reactNode` | TODO | General prop contract. |
| `destroyOnClose` | `boolean` | `false`, `true` | General prop contract. |
| `disableBodyScroll` | `boolean` | `false`, `true` | General prop contract. |
| `forceRender` | `boolean` | `false`, `true` | General prop contract. |
| `getContainer` | `function` | TODO | General prop contract. |
| `mask` | `boolean` | `false`, `true` | General prop contract. |
| `maskClassName` | `string` | TODO | General prop contract. |
| `maskStyle` | `object` | TODO | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `onClose` | `function` | TODO | General prop contract. |
| `onMaskClick` | `function` | TODO | General prop contract. |
| `showCloseButton` | `boolean` | `false`, `true` | General prop contract. |
| `stopPropagation` | `array` | TODO | General prop contract. |
| `visible` | `boolean` | `false`, `true` | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `position` | `string` | `bottom`, `top`, `left`, `right` | General prop contract. |
| `closeOnSwipe` | `boolean` | `false`, `true` | General prop contract. |
| `--z-index` | `string` | TODO | Official CSS variable contract. |

### States

| State | Expectation |
| --- | --- |
| `popup.hidden` | Declared in spec state group `popup`. |
| `popup.visible` | Declared in spec state group `popup`. |

### Metrics

- closeIconOffset=8px
- closeIconPadding=4px
- closeIconSize=18px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--z-index` | cssVar | Official CSS variable contract |

## Toast

### Props / Axes

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `afterClose` | `function` | TODO | General prop contract. |
| `maskStyle` | `object` | TODO | General prop contract. |
| `maskClassName` | `string` | TODO | General prop contract. |
| `maskClickable` | `boolean` | `false`, `true` | General prop contract. |
| `content` | `reactNode` | TODO | General prop contract. |
| `icon` | `string`, `reactNode` | `success`, `fail`, `loading`, `reactNode` | General prop contract. |
| `duration` | `number` | TODO | General prop contract. |
| `position` | `string` | `top`, `bottom`, `center` | General prop contract. |
| `getContainer` | `function` | TODO | General prop contract. |
| `stopPropagation` | `array` | TODO | General prop contract. |

### States

| State | Expectation |
| --- | --- |
| `toast.visible` | Declared in spec state group `toast`. |
| `toast.hidden` | Declared in spec state group `toast`. |

### Metrics

- maxWidth=204px
- radius=8px
- textPadding=12px
- iconPaddingY=35px
- iconPaddingX=12px
- iconSize=36px

### Tokens

| Token | Kind | Notes |
| --- | --- | --- |
| `--size` | cssVar | Official CSS variable contract |

## Variant Axes Table

### Dialog

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `afterClose` | `function` | TODO | General prop contract. |
| `afterShow` | `function` | TODO | General prop contract. |
| `bodyClassName` | `string` | TODO | General prop contract. |
| `bodyStyle` | `object` | TODO | General prop contract. |
| `destroyOnClose` | `boolean` | `false`, `true` | General prop contract. |
| `disableBodyScroll` | `boolean` | `false`, `true` | General prop contract. |
| `forceRender` | `boolean` | `false`, `true` | General prop contract. |
| `getContainer` | `function` | TODO | General prop contract. |
| `maskClassName` | `string` | TODO | General prop contract. |
| `maskStyle` | `object` | TODO | General prop contract. |
| `stopPropagation` | `array` | TODO | General prop contract. |
| `visible` | `boolean` | `false`, `true` | General prop contract. |
| `image` | `string` | TODO | General prop contract. |
| `header` | `reactNode` | TODO | General prop contract. |
| `title` | `reactNode` | TODO | General prop contract. |
| `content` | `reactNode` | TODO | General prop contract. |
| `actions` | `array` | TODO | General prop contract. |
| `onAction` | `function` | TODO | General prop contract. |
| `onClose` | `function` | TODO | General prop contract. |
| `closeOnAction` | `boolean` | `false`, `true` | General prop contract. |
| `closeOnMaskClick` | `boolean` | `false`, `true` | General prop contract. |
| `--background-color` | `string` | TODO | Official CSS variable contract. |
| `--border-radius` | `string` | TODO | Official CSS variable contract. |
| `--max-width` | `string` | TODO | Official CSS variable contract. |
| `--min-width` | `string` | TODO | Official CSS variable contract. |
| `--z-index` | `string` | TODO | Official CSS variable contract. |

### Popup

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `afterClose` | `function` | TODO | General prop contract. |
| `afterShow` | `function` | TODO | General prop contract. |
| `bodyClassName` | `string` | TODO | General prop contract. |
| `bodyStyle` | `object` | TODO | General prop contract. |
| `closeOnMaskClick` | `boolean` | `false`, `true` | General prop contract. |
| `closeIcon` | `reactNode` | TODO | General prop contract. |
| `destroyOnClose` | `boolean` | `false`, `true` | General prop contract. |
| `disableBodyScroll` | `boolean` | `false`, `true` | General prop contract. |
| `forceRender` | `boolean` | `false`, `true` | General prop contract. |
| `getContainer` | `function` | TODO | General prop contract. |
| `mask` | `boolean` | `false`, `true` | General prop contract. |
| `maskClassName` | `string` | TODO | General prop contract. |
| `maskStyle` | `object` | TODO | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `onClose` | `function` | TODO | General prop contract. |
| `onMaskClick` | `function` | TODO | General prop contract. |
| `showCloseButton` | `boolean` | `false`, `true` | General prop contract. |
| `stopPropagation` | `array` | TODO | General prop contract. |
| `visible` | `boolean` | `false`, `true` | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `position` | `string` | `bottom`, `top`, `left`, `right` | General prop contract. |
| `closeOnSwipe` | `boolean` | `false`, `true` | General prop contract. |
| `--z-index` | `string` | TODO | Official CSS variable contract. |

### Toast

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `afterClose` | `function` | TODO | General prop contract. |
| `maskStyle` | `object` | TODO | General prop contract. |
| `maskClassName` | `string` | TODO | General prop contract. |
| `maskClickable` | `boolean` | `false`, `true` | General prop contract. |
| `content` | `reactNode` | TODO | General prop contract. |
| `icon` | `string`, `reactNode` | `success`, `fail`, `loading`, `reactNode` | General prop contract. |
| `duration` | `number` | TODO | General prop contract. |
| `position` | `string` | `top`, `bottom`, `center` | General prop contract. |
| `getContainer` | `function` | TODO | General prop contract. |
| `stopPropagation` | `array` | TODO | General prop contract. |

## Inspection Mapping

- Inspection row `Dialog` verifies `visible`, `title`, `content`, `actions`, and close behavior.
- Inspection row `Popup` verifies `position`, `showCloseButton`, and `closeOnSwipe`.
- Inspection row `Toast` verifies `icon` and `position` combinations.

## State Mapping

### Dialog

| State | Expectation |
| --- | --- |
| `dialog.hidden` | Declared in spec state group `dialog`. |
| `dialog.visible` | Declared in spec state group `dialog`. |

### Popup

| State | Expectation |
| --- | --- |
| `popup.hidden` | Declared in spec state group `popup`. |
| `popup.visible` | Declared in spec state group `popup`. |

### Toast

| State | Expectation |
| --- | --- |
| `toast.visible` | Declared in spec state group `toast`. |
| `toast.hidden` | Declared in spec state group `toast`. |

## Render Expectations

- Dialog, popup, and toast overlays must keep family-specific positions and action regions.
- Visible and hidden states must remain separate in payload and write logic.

## Current Runtime Gaps

- none

## Failure Cases

- Overlay families flattened into one generic modal.
- Popup position ignored.
- Toast icon axis dropped.

## Inspection Payload Example

```json
{
  "document": {
    "name": "overlay-inspection screen",
    "screen": "overlay-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_7",
    "type": "INSTANCE",
    "name": "Delete file",
    "x": 48,
    "y": 116,
    "width": 320,
    "height": 220,
    "component": "Dialog",
    "style": {
      "paddingY": 9,
      "fontSize": 15,
      "lineHeight": 22,
      "fontWeight": "regular"
    },
    "variant": {
      "visible": true,
      "title": "Delete file",
      "content": "This action cannot be undone.",
      "actions": "Cancel|Delete",
      "closeOnMaskClick": true
    },
    "variables": {},
    "text": "Delete file"
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
        "content": "Overlay Inspection",
        "width": 358,
        "height": 32,
        "textStyle": "text/heading/xl",
        "colorToken": "semantic.text.primary"
      }
    ]
  },
  {
    "type": "stack",
    "name": "modal-section",
    "x": 48,
    "y": 116,
    "width": 1320,
    "direction": "vertical",
    "gap": 16,
    "children": [
      {
        "type": "text",
        "name": "Text 2",
        "content": "Dialog / Popup / Toast",
        "width": 358,
        "height": 24,
        "textStyle": "text/body/lg",
        "colorToken": "semantic.text.secondary"
      },
      {
        "type": "stack",
        "name": "modal-row-1",
        "direction": "horizontal",
        "gap": 16,
        "width": 1320,
        "children": [
          {
            "type": "component",
            "name": "Delete file",
            "component": "dialog",
            "props": {
              "visible": true,
              "title": "Delete file",
              "content": "This action cannot be undone.",
              "actions": "Cancel|Delete",
              "closeOnMaskClick": true
            },
            "width": 320,
            "height": 220,
            "label": "Delete file"
          },
          {
            "type": "component",
            "name": "Bottom Popup",
            "component": "popup",
            "props": {
              "visible
...
```
