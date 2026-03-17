---
title: Axes And Props
---

# Axes And Props

Every prop table in this document is generated from the frozen Ant-based spec files. If a doc and a spec diverge, the spec wins.

## Button

### Button

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `color` | `string` | `default`, `primary`, `success`, `warning`, `danger` | TODO | `false` | TODO |
| `fill` | `string` | `solid`, `outline`, `none` | TODO | `false` | TODO |
| `size` | `string` | `mini`, `small`, `middle`, `large` | TODO | `false` | TODO |
| `shape` | `string` | `default`, `rounded`, `rectangular` | TODO | `false` | TODO |
| `block` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `loading` | `boolean`, `string` | `false`, `true`, `auto` | TODO | `false` | Boolean and `auto` must remain distinct in the contract. |
| `loadingText` | `string` | TODO | TODO | `false` | TODO |
| `loadingIcon` | `reactNode` | TODO | TODO | `false` | TODO |
| `disabled` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `onClick` | `function` | TODO | TODO | `false` | TODO |
| `type` | `string` | `button`, `submit`, `reset` | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |
| `onMouseDown` | `function` | TODO | TODO | `false` | TODO |
| `onMouseUp` | `function` | TODO | TODO | `false` | TODO |
| `onTouchStart` | `function` | TODO | TODO | `false` | TODO |
| `onTouchEnd` | `function` | TODO | TODO | `false` | TODO |
| `id` | `string` | TODO | TODO | `false` | TODO |
| `form` | `string` | TODO | TODO | `false` | TODO |
| `--text-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--background-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-radius` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-style` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |

## Input

### Input

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `maxLength` | `number` | TODO | TODO | `false` | TODO |
| `minLength` | `number` | TODO | TODO | `false` | TODO |
| `autoComplete` | `string` | TODO | TODO | `false` | TODO |
| `autoFocus` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `pattern` | `string` | TODO | TODO | `false` | TODO |
| `inputMode` | `string` | TODO | TODO | `false` | TODO |
| `type` | `string` | TODO | TODO | `false` | TODO |
| `name` | `string` | TODO | TODO | `false` | TODO |
| `onFocus` | `function` | TODO | TODO | `false` | TODO |
| `onBlur` | `function` | TODO | TODO | `false` | TODO |
| `onPaste` | `function` | TODO | TODO | `false` | TODO |
| `autoCapitalize` | `string` | TODO | TODO | `false` | TODO |
| `autoCorrect` | `string` | TODO | TODO | `false` | TODO |
| `onKeyDown` | `function` | TODO | TODO | `false` | TODO |
| `onKeyUp` | `function` | TODO | TODO | `false` | TODO |
| `onCompositionStart` | `function` | TODO | TODO | `false` | TODO |
| `onCompositionEnd` | `function` | TODO | TODO | `false` | TODO |
| `onClick` | `function` | TODO | TODO | `false` | TODO |
| `step` | `number` | TODO | TODO | `false` | TODO |
| `id` | `string` | TODO | TODO | `false` | TODO |
| `placeholder` | `string` | TODO | TODO | `false` | TODO |
| `readOnly` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `disabled` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `enterKeyHint` | `string` | TODO | TODO | `false` | TODO |
| `value` | `string` | TODO | TODO | `false` | TODO |
| `defaultValue` | `string` | TODO | TODO | `false` | TODO |
| `onChange` | `function` | TODO | TODO | `false` | TODO |
| `clearable` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `clearIcon` | `reactNode` | TODO | TODO | `false` | TODO |
| `onlyShowClearWhenFocus` | `boolean` | `false`, `true` | TODO | `false` | Clear affordance must remain conditional on focus. |
| `onClear` | `function` | TODO | TODO | `false` | TODO |
| `onEnterPress` | `function` | TODO | TODO | `false` | TODO |
| `min` | `number` | TODO | TODO | `false` | TODO |
| `max` | `number` | TODO | TODO | `false` | TODO |
| `role` | `string` | TODO | TODO | `false` | TODO |

## Tabs

### Tabs

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `activeKey` | `string` | TODO | TODO | `false` | TODO |
| `defaultActiveKey` | `string` | TODO | TODO | `false` | TODO |
| `activeLineMode` | `string` | `auto`, `full`, `fixed` | TODO | `false` | TODO |
| `stretch` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `onChange` | `function` | TODO | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |
| `direction` | `string` | `ltr`, `rtl` | TODO | `false` | TODO |
| `autoScroll` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `--fixed-active-line-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--active-line-height` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--active-line-border-radius` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--title-font-size` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--content-padding` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--active-title-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--active-line-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |

### Tabs tabProps

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `title` | `reactNode` | TODO | TODO | `false` | TODO |
| `disabled` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `forceRender` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `destroyOnClose` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |

## List / Cell

### List

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `header` | `reactNode` | TODO | TODO | `false` | TODO |
| `mode` | `string` | `default`, `card` | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |
| `--active-background-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--align-items` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-bottom` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-inner` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-top` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--extra-max-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--font-size` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--header-font-size` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--padding-left` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--padding-right` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--prefix-padding-right` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--prefix-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |

### Cell

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `title` | `reactNode` | TODO | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |
| `description` | `reactNode` | TODO | TODO | `false` | TODO |
| `prefix` | `reactNode` | TODO | TODO | `false` | TODO |
| `extra` | `reactNode` | TODO | TODO | `false` | TODO |
| `clickable` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `arrowIcon` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | TODO | `false` | TODO |
| `disabled` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `onClick` | `function` | TODO | TODO | `false` | TODO |
| `arrow` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | TODO | `false` | Deprecated in the official API but retained in the frozen contract. |
| `--prefix-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--align-items` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--active-background-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |

## Dialog / Popup / Toast

### Dialog

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `afterClose` | `function` | TODO | TODO | `false` | TODO |
| `afterShow` | `function` | TODO | TODO | `false` | TODO |
| `bodyClassName` | `string` | TODO | TODO | `false` | TODO |
| `bodyStyle` | `object` | TODO | TODO | `false` | TODO |
| `destroyOnClose` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `disableBodyScroll` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `forceRender` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `getContainer` | `function` | TODO | TODO | `false` | TODO |
| `maskClassName` | `string` | TODO | TODO | `false` | TODO |
| `maskStyle` | `object` | TODO | TODO | `false` | TODO |
| `stopPropagation` | `array` | TODO | TODO | `false` | TODO |
| `visible` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `image` | `string` | TODO | TODO | `false` | TODO |
| `header` | `reactNode` | TODO | TODO | `false` | TODO |
| `title` | `reactNode` | TODO | TODO | `false` | TODO |
| `content` | `reactNode` | TODO | TODO | `false` | TODO |
| `actions` | `array` | TODO | TODO | `false` | TODO |
| `onAction` | `function` | TODO | TODO | `false` | TODO |
| `onClose` | `function` | TODO | TODO | `false` | TODO |
| `closeOnAction` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `closeOnMaskClick` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `--background-color` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-radius` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--max-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--min-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--z-index` | `string` | TODO | TODO | `false` | CSS variable from the official API. |

### Popup

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `afterClose` | `function` | TODO | TODO | `false` | TODO |
| `afterShow` | `function` | TODO | TODO | `false` | TODO |
| `bodyClassName` | `string` | TODO | TODO | `false` | TODO |
| `bodyStyle` | `object` | TODO | TODO | `false` | TODO |
| `closeOnMaskClick` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `closeIcon` | `reactNode` | TODO | TODO | `false` | TODO |
| `destroyOnClose` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `disableBodyScroll` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `forceRender` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `getContainer` | `function` | TODO | TODO | `false` | TODO |
| `mask` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `maskClassName` | `string` | TODO | TODO | `false` | TODO |
| `maskStyle` | `object` | TODO | TODO | `false` | TODO |
| `onClick` | `function` | TODO | TODO | `false` | TODO |
| `onClose` | `function` | TODO | TODO | `false` | TODO |
| `onMaskClick` | `function` | TODO | TODO | `false` | TODO |
| `showCloseButton` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `stopPropagation` | `array` | TODO | TODO | `false` | TODO |
| `visible` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |
| `position` | `string` | `bottom`, `top`, `left`, `right` | TODO | `false` | TODO |
| `closeOnSwipe` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `--z-index` | `string` | TODO | TODO | `false` | CSS variable from the official API. |

### Toast

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `afterClose` | `function` | TODO | TODO | `false` | TODO |
| `maskStyle` | `object` | TODO | TODO | `false` | TODO |
| `maskClassName` | `string` | TODO | TODO | `false` | TODO |
| `maskClickable` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `content` | `reactNode` | TODO | TODO | `false` | TODO |
| `icon` | `string`, `reactNode` | `success`, `fail`, `loading`, `reactNode` | TODO | `false` | TODO |
| `duration` | `number` | TODO | TODO | `false` | TODO |
| `position` | `string` | `top`, `bottom`, `center` | TODO | `false` | TODO |
| `getContainer` | `function` | TODO | TODO | `false` | TODO |
| `stopPropagation` | `array` | TODO | TODO | `false` | TODO |

## NavBar / TabBar

### NavBar

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `back` | `reactNode` | TODO | TODO | `false` | TODO |
| `backIcon` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | TODO | `false` | TODO |
| `backArrow` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | TODO | `false` | Deprecated in the official API but retained in the frozen contract. |
| `left` | `reactNode` | TODO | TODO | `false` | TODO |
| `right` | `reactNode` | TODO | TODO | `false` | TODO |
| `onBack` | `function` | TODO | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |
| `--height` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-bottom` | `string` | TODO | TODO | `false` | CSS variable from the official API. |

### TabBar

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `activeKey` | `string` | TODO | TODO | `false` | TODO |
| `defaultActiveKey` | `string` | TODO | TODO | `false` | TODO |
| `onChange` | `function` | TODO | TODO | `false` | TODO |
| `safeArea` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |

### TabBar itemProps

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `icon` | `reactNode`, `function` | `reactNode`, `function` | TODO | `false` | TODO |
| `title` | `reactNode`, `function` | `reactNode`, `function` | TODO | `false` | TODO |
| `badge` | `reactNode` | TODO | TODO | `false` | TODO |
| `onClick` | `function` | TODO | TODO | `false` | TODO |

## Form

### Form

| prop | type | allowed values | default | required | notes |
| --- | --- | --- | --- | --- | --- |
| `form` | `formInstance` | TODO | TODO | `false` | TODO |
| `initialValues` | `object` | TODO | TODO | `false` | TODO |
| `name` | `string` | TODO | TODO | `false` | TODO |
| `preserve` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `validateMessages` | `object` | TODO | TODO | `false` | TODO |
| `validateTrigger` | `string` | TODO | TODO | `false` | TODO |
| `onFieldsChange` | `function` | TODO | TODO | `false` | TODO |
| `onFinish` | `function` | TODO | TODO | `false` | TODO |
| `onFinishFailed` | `function` | TODO | TODO | `false` | TODO |
| `onValuesChange` | `function` | TODO | TODO | `false` | TODO |
| `children` | `reactNode` | TODO | TODO | `false` | TODO |
| `footer` | `reactNode` | TODO | TODO | `false` | TODO |
| `mode` | `string` | `default`, `card` | TODO | `false` | TODO |
| `layout` | `string` | `vertical`, `horizontal` | TODO | `false` | TODO |
| `label` | `reactNode` | TODO | TODO | `false` | TODO |
| `help` | `reactNode` | TODO | TODO | `false` | TODO |
| `helpIcon` | `reactNode` | TODO | TODO | `false` | TODO |
| `hasFeedback` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `required` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `noStyle` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `disabled` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `hidden` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `childElementPosition` | `string` | `normal`, `right` | TODO | `false` | TODO |
| `extra` | `reactNode` | TODO | TODO | `false` | TODO |
| `clickable` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `arrow` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | TODO | `false` | Deprecated in the official API but retained in the frozen contract. |
| `arrowIcon` | `boolean`, `reactNode` | `false`, `true`, `reactNode` | TODO | `false` | TODO |
| `description` | `reactNode` | TODO | TODO | `false` | TODO |
| `dependencies` | `array` | TODO | TODO | `false` | TODO |
| `valuePropName` | `string` | TODO | TODO | `false` | TODO |
| `rules` | `array` | TODO | TODO | `false` | TODO |
| `messageVariables` | `object` | TODO | TODO | `false` | TODO |
| `trigger` | `string` | TODO | TODO | `false` | TODO |
| `shouldUpdate` | `boolean`, `function` | `false`, `true`, `function` | TODO | `false` | TODO |
| `initialValue` | `any` | TODO | TODO | `false` | TODO |
| `getValueFromEvent` | `function` | TODO | TODO | `false` | TODO |
| `getValueProps` | `function` | TODO | TODO | `false` | TODO |
| `normalize` | `function` | TODO | TODO | `false` | TODO |
| `validateFirst` | `boolean` | `false`, `true` | TODO | `false` | TODO |
| `onClick` | `function` | TODO | TODO | `false` | TODO |
| `--border-inner` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-top` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--border-bottom` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
| `--prefix-width` | `string` | TODO | TODO | `false` | CSS variable from the official API. |
