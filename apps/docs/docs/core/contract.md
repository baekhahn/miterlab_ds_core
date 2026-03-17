---
title: Core Contract
---

# Core Contract

Ant Mobile aligned core schema contract.

## Token Contract

### Colors

| Token | Value |
| --- | --- |
| `colorPrimary` | `#1677ff` |
| `colorText` | `#333333` |
| `colorTextSecondary` | `#666666` |
| `colorTextDisabled` | `TODO` |
| `colorBorder` | `#eeeeee` |
| `colorBorderSecondary` | `TODO` |
| `colorBgContainer` | `#ffffff` |
| `colorBgContainerDisabled` | `TODO` |
| `colorFill` | `#f5f5f5` nearest exposed fill |
| `colorFillSecondary` | `TODO` |
| `colorFillTertiary` | `TODO` |
| `colorError` | `#ff3141` |
| `colorWarning` | `#ff8f1f` |
| `colorSuccess` | `#00b578` |

### Typography

| Token | Value |
| --- | --- |
| `fontSizeSM` | `12` |
| `fontSizeMD` | `14` |
| `fontSizeLG` | `16` |
| `lineHeightSM` | `16` |
| `lineHeightMD` | `20` |
| `lineHeightLG` | `22` |
| `fontWeightRegular` | `400` |
| `fontWeightMedium` | `500` |
| `fontWeightBold` | `600` |

### Radius

| Token | Value |
| --- | --- |
| `radiusSM` | `2` |
| `radiusMD` | `4` |
| `radiusLG` | `8` |

### Padding

| Token | Value |
| --- | --- |
| `paddingSM` | `4` |
| `paddingMD` | `8` |
| `paddingLG` | `12` |
| `paddingXL` | `16` |

### Control Metrics

| Token | Value |
| --- | --- |
| `controlHeightSM` | `24` |
| `controlHeightMD` | `32` |
| `controlHeightLG` | `44` |
| `controlHeight` | `controlHeightLG` |

### Motion

| Token | Value |
| --- | --- |
| `motionDurationFast` | `0.1s` |
| `motionDurationMid` | `0.2s` |
| `motionDurationSlow` | `0.3s` |
| `motionEaseInOut` | `cubic-bezier(0.4,0,0.2,1)` |
| `motionEaseOut` | `cubic-bezier(0,0,0.2,1)` |
| `motionEaseIn` | `cubic-bezier(0.4,0,1,1)` |

## Button Contract

### Props

| Prop | Contract |
| --- | --- |
| `size` | `mini | small | middle | large` |
| `color` | `default | primary | success | warning | danger` |
| `fill` | `solid | outline | none` |
| `shape` | `default | rounded | rectangular` |
| `block` | `boolean` |
| `loading` | `boolean` |
| `disabled` | `boolean` |
| `type` | `button | submit | reset` |
| `icon` | supported by contract document |
| `href` | supported by contract document |
| `target` | supported by contract document |
| `htmlType` | supported by contract document |
| `onClick` | supported |
| `style` | supported |
| `className` | supported |

### States

- `default`
- `hover`
- `active`
- `focus`
- `disabled`
- `loading`

### Metrics

| Size | Height | Padding X | Padding Y | Radius |
| --- | --- | --- | --- | --- |
| `mini` | `24` | `12` | `3` | `4` |
| `small` | `28` | `12` | `3` | `4` |
| `middle` | `32` | `12` | `7` | `4` |
| `large` | `44` | `12` | `11` | `4` |

| Metric | Value |
| --- | --- |
| `rectangularRadius` | `0` |
| `iconGap` | `4` |
| `fontSizeSM` | `12` |
| `fontSizeMD` | `14` |
| `fontSizeLG` | `16` |

### Tokens

| Group | Tokens |
| --- | --- |
| `background` | `colorPrimary`, `colorFill`, `colorFillSecondary` |
| `text` | `colorText`, `colorTextDisabled` |
| `border` | `colorBorder`, `colorBorderSecondary` |
| `control` | `controlHeight` |

### Render Rules

- `fill=solid` -> background `colorPrimary`
- `fill=outline` -> border with transparent background
- `fill=none` -> text only
- `disabled` -> `colorTextDisabled`
- `loading` -> show `loadingIcon`
- `block` -> width `100%`

## Input Contract

### Props

| Prop | Contract |
| --- | --- |
| `size` | `small | middle | large` |
| `value` | supported |
| `defaultValue` | supported |
| `placeholder` | supported |
| `disabled` | `boolean` |
| `readOnly` | `boolean` |
| `clearable` | `boolean` |
| `type` | supported |
| `maxLength` | supported |
| `status` | supported by contract document |
| `prefix` | supported by contract document |
| `suffix` | supported by contract document |
| `autoFocus` | supported |
| `inputMode` | supported |
| `onChange` | supported |
| `onFocus` | supported |
| `onBlur` | supported |

### States

- `default`
- `focus`
- `disabled`
- `error`
- `warning`
- `readonly`

### Metrics

| Size | Height | Padding X | Padding Y | Radius |
| --- | --- | --- | --- | --- |
| `small` | `24` | `0` | `0` | `0` |
| `middle` | `32` | `0` | `0` | `4` |
| `large` | `44` | `0` | `0` | `4` |

| Metric | Value |
| --- | --- |
| `inset` | `8` |
| `fontSize` | `17` |

### Tokens

| Group | Tokens |
| --- | --- |
| `text` | `colorText`, `colorTextSecondary`, `colorTextDisabled` |
| `border` | `colorBorder`, `colorBorderSecondary` |
| `focus` | `colorPrimary` |
| `error` | `colorError` |
| `warning` | `colorWarning` |
| `background` | `colorBgContainer` |
| `control` | `controlHeight` |

### Render Rules

- `focus` -> border `colorPrimary`
- `error` -> border `colorError`
- `warning` -> border `colorWarning`
- `disabled` -> `colorTextDisabled`
- `clearable` -> show `clearIcon`

## Freeze Review Contract

### Columns

- `Family`
- `Priority`
- `Phase A`
- `Phase B`
- `Reason`

### Phase A

- `spec parity`
- `generator parity`
- `plugin parity`

### Phase B

- `figma write verified`
- `screenshot attached`
- `review approved`

### Priority

| Priority | Families |
| --- | --- |
| `P1` | `Button`, `Input` |
| `P2` | `Tabs`, `List`, `Dialog`, `Popup`, `Toast`, `NavBar`, `TabBar`, `Form` |

### Reason Examples

- `pending (token mismatch)`
- `pending (payload mismatch)`
- `pending (plugin mismatch)`
- `pending (canvas not verified)`
- `verified`

## Runtime Contract

### Flow

`spec -> generator -> payload -> plugin -> figma`

### Payload Fields

- `component`
- `variant`
- `state`
- `metrics`
- `tokens`

### Rules

- Plugin must not rewrite token names.
- Plugin must not flatten variant.
- Plugin must not drop state.
- Plugin must not change metrics.

## Generation Contract

### Flow

`Prompt -> layout rules -> component mapping -> payload -> plugin render`

### Payload Example

```json
{
  "component": "Button",
  "variant": {
    "size": "large",
    "fill": "solid",
    "color": "primary"
  },
  "state": "default",
  "metrics": {
    "height": 44
  },
  "tokens": {
    "background": "colorPrimary"
  }
}
```

### Failure Cases

- `axis missing`
- `variant flattened`
- `token missing`
- `metrics wrong`
- `plugin mismatch`
- `read-only write`

### Verification Checklist

- `size correct`
- `radius correct`
- `padding correct`
- `token correct`
- `state correct`
- `variant correct`
