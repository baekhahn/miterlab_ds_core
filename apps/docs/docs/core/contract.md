---
title: Core Contract
---

# Ant Mobile → Core Schema → Full Family Contract (Codex Handoff)

이 문서는 **Ant Design Mobile을 baseline으로 채택하여 core schema를 구성하고**, 현재 `mads.fly.dev` 문서를 **운영 가능한 contract docs 수준**으로 끌어올리기 위한 Codex 전달용 문서입니다.

핵심 원칙은 아래와 같습니다.

- **Ant Design Mobile이 source of truth**
- spec는 Ant 기준을 따른다
- generator는 spec 외 값을 만들지 않는다
- plugin은 payload를 flatten 하지 않는다
- Figma는 source가 아니라 output이다
- docs는 사람용 source of truth, spec은 기계용 source of truth다

---

## 1. Freeze Review Status 보강 문안

```md
## Freeze Review Status Rules

### Phase A — Implementation Freeze
A family reaches Phase A only when all three conditions are satisfied:

- Spec parity: the family spec matches the frozen Ant-based contract
- Generator parity: payload preserves all required axes, metrics, and token references
- Plugin parity: renderer/write path preserves those values without flattening or renaming

### Phase B — Canvas Freeze
A family reaches Phase B only when all three conditions are satisfied:

- Figma write verified
- Screenshot attached
- Review approved

### Priority
- P1: Button
- P1: Input
- P2: Tabs
- P2: List / Cell
- P2: Dialog / Popup / Toast
- P2: NavBar / TabBar
- P2: Form

### Reason Values
Use one of the following explicit reason values instead of generic pending:

- pending (token contract mismatch)
- pending (payload mismatch)
- pending (plugin mismatch)
- pending (canvas not verified)
- verified
```

---

## 2. Runtime / Plugin Contract 보강 문안

```md
## Plugin Contract

### Input
Plugin input must preserve:

- component identity
- component family
- variant axes
- state axes
- metrics
- token references

### Renderer Rules
The renderer must not:

- flatten multiple families into one preset
- rename token references for convenience
- drop size/state/variant axes
- replace payload values with hardcoded defaults
- collapse Ant contract values into internal semantic placeholders

### Allowed Behavior
The renderer may:

- convert payload into Figma node structure
- create frames, text nodes, and vector nodes
- map values into visual nodes without changing their meaning

### Forbidden Behavior
The renderer must not:

- reinterpret contract values
- replace Ant token names with generic semantic aliases
- merge Button / IconButton / TextButton into one visual preset
- merge Input status variants into one default state
```

---

## 3. Generation Contract 보강 문안

```md
## Generation Contract

### Flow
spec
→ generator
→ payload
→ plugin
→ figma

### Generator Rules
The generator must:

- read only frozen specs
- preserve all allowed props
- preserve all allowed variant axes
- preserve all allowed states
- preserve metrics
- preserve token references

The generator must not:

- invent new variants
- normalize sizes
- rename props
- rewrite token contracts
- drop unsupported values silently

### Payload Example

{
  "component": "Button",
  "variant": {
    "size": "large",
    "fill": "solid",
    "color": "primary",
    "shape": "default",
    "block": false
  },
  "state": {
    "loading": false,
    "disabled": false
  },
  "metrics": {
    "height": 44,
    "paddingX": 12,
    "paddingY": 11,
    "radius": 4,
    "iconGap": 4
  },
  "tokens": {
    "background": "colorPrimary",
    "text": "colorText",
    "border": "colorBorder"
  }
}

### Failure Cases
- axis missing
- variant flattened
- token missing
- wrong metrics
- plugin mismatch
- read-only write path
```

---

## 4. Token Contract 확장본

```md
## Token Contract (Ant Mobile aligned)

### Colors
colorPrimary
colorText
colorTextSecondary
colorTextDisabled

colorBorder
colorBorderSecondary

colorBgContainer
colorBgContainerDisabled

colorFill
colorFillSecondary
colorFillTertiary

colorError
colorWarning
colorSuccess

### Typography
fontSizeSM = 12
fontSizeMD = 14
fontSizeLG = 16

lineHeightSM = 16
lineHeightMD = 20
lineHeightLG = 22

fontWeightRegular = 400
fontWeightMedium = 500
fontWeightBold = 600

### Radius
radiusSM = 2
radiusMD = 4
radiusLG = 8

### Padding
paddingSM = 4
paddingMD = 8
paddingLG = 12
paddingXL = 16

### Control Metrics
controlHeightSM = 24
controlHeightMD = 32
controlHeightLG = 44
controlHeight = controlHeightLG

### Motion
motionDurationFast = 0.1s
motionDurationMid = 0.2s
motionDurationSlow = 0.3s

motionEaseInOut = cubic-bezier(0.4,0,0.2,1)
motionEaseOut = cubic-bezier(0,0,0.2,1)
motionEaseIn = cubic-bezier(0.4,0,1,1)
```

---

## 5. Button Contract (완성본)

```md
## Button Contract

### Props
size: mini | small | middle | large
color: default | primary | success | warning | danger
fill: solid | outline | none
shape: default | rounded | rectangular

block: boolean
loading: boolean
disabled: boolean

type: button | submit | reset

icon
href
target
htmlType
onClick
style
className

### States
default
hover
active
focus
disabled
loading

### Metrics
mini
height = 24
paddingX = 12
paddingY = 3
radius = 4

small
height = 28
paddingX = 12
paddingY = 3
radius = 4

middle
height = 32
paddingX = 12
paddingY = 7
radius = 4

large
height = 44
paddingX = 12
paddingY = 11
radius = 4

rectangularRadius = 0
iconGap = 4

fontSizeSM = 12
fontSizeMD = 14
fontSizeLG = 16

### Tokens
background
- colorPrimary
- colorFill
- colorFillSecondary

text
- colorText
- colorTextDisabled

border
- colorBorder
- colorBorderSecondary

controlHeight

### Render Rules
fill = solid → background colorPrimary
fill = outline → border + transparent background
fill = none → text only

disabled → colorTextDisabled
loading → show loadingIcon
block → width = 100%
```

---

## 6. Input Contract (완성본)

```md
## Input Contract

### Props
size: small | middle | large

value
defaultValue
placeholder

disabled
readOnly
clearable

type
maxLength

status

prefix
suffix

autoFocus
inputMode

onChange
onFocus
onBlur

### States
default
focus
disabled
error
warning
readonly

### Metrics
small
height = 24
paddingX = 0
paddingY = 0
radius = 0

middle
height = 32
radius = 4

large
height = 44
radius = 4

inset = 8
fontSize = 17

### Tokens
text
- colorText
- colorTextSecondary
- colorTextDisabled

border
- colorBorder
- colorBorderSecondary

focus
- colorPrimary

error
- colorError

warning
- colorWarning

background
- colorBgContainer

controlHeight

### Render Rules
focus → border colorPrimary
error → border colorError
warning → border colorWarning
disabled → colorTextDisabled
clearable → show clearIcon
```

---

## 7. Full Family Contract 목록

Ant Mobile 기준 full family contract 대상은 아래와 같습니다.

```md
Button
Input
Textarea
Tabs
List
Cell
Form
Dialog
Popup
Toast
NavBar
TabBar
Checkbox
Radio
Switch
Slider
Stepper
Picker
DatePicker
SearchBar
Badge
Tag
Card
Grid
Space
Flex
Avatar
Image
Progress
Skeleton
Result
Empty
NoticeBar
Collapse
Dropdown
Popover
ActionSheet
PullToRefresh
InfiniteScroll
Swiper
FloatingBubble
WaterMark
Mask
Modal
```

---

## 8. Codex 실행 지침

Codex는 아래 원칙으로 동작해야 합니다.

```md
- Ant docs를 source of truth로 사용
- frozen spec을 우선시
- docs는 spec를 설명하는 계약 문서로 유지
- generator는 spec 외 값 생성 금지
- plugin은 payload flatten 금지
- token contract는 Ant 이름 유지
- Button/Input을 먼저 완전 고정
- 이후 Tabs, List/Cell, Overlay, Navigation, Form 순서로 확장
```

---

## 9. 다음 작업 우선순위

```md
P1
- Button
- Input

P2
- Tabs
- List / Cell
- Dialog / Popup / Toast
- NavBar / TabBar
- Form

P3
- 나머지 full family contract
```

---

## 10. 최종 목표

```md
Ant Mobile baseline
→ Core schema freeze
→ Generator parity
→ Plugin parity
→ Figma canvas verification
→ Theme layer
→ External DS adapter
```
