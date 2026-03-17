---
title: Ant Mobile P1 Source Of Truth
---

# Codex Handoff — Ant Mobile P1 Source of Truth (No External Browsing)

## Rules

1. Do NOT browse Ant Design Mobile directly.
2. Do NOT reinterpret the official API through existing implementation shortcuts.
3. Treat this file as the frozen local baseline for P1 families.
4. If current implementation conflicts with this file, implementation must change.
5. Do NOT redesign schema.
6. Do NOT add custom variant axes.
7. Do NOT rename props for convenience.
8. Do NOT flatten families in generator or plugin.
9. Do NOT broaden scope beyond P1 unless explicitly instructed.

---

## P1 Families

- Button
- Input
- Tabs
- List
- Cell
- Form
- Dialog
- Popup
- Toast
- NavBar
- TabBar
- Checkbox
- Radio
- Switch

P2 and later must not start until P1 is complete.

---

## P1 Completion Gate

A P1 family is complete only when all four conditions are satisfied:

1. Spec parity
2. Generator parity
3. Plugin parity
4. Canvas verification

Allowed temporary state:
- Phase A complete
- Phase B pending (canvas not verified)

But P2 must not begin until P1 group milestone is approved.

---

## Token Contract (Ant-aligned baseline)

### Colors
- colorPrimary
- colorText
- colorTextSecondary
- colorTextDisabled
- colorBorder
- colorBorderSecondary
- colorBgContainer
- colorBgContainerDisabled
- colorFill
- colorFillSecondary
- colorFillTertiary
- colorError
- colorWarning
- colorSuccess

### Typography
- fontSizeSM = 12
- fontSizeMD = 14
- fontSizeLG = 16
- lineHeightSM = 16
- lineHeightMD = 20
- lineHeightLG = 22
- fontWeightRegular = 400
- fontWeightMedium = 500
- fontWeightBold = 600

### Radius
- radiusSM = 2
- radiusMD = 4
- radiusLG = 8

### Padding
- paddingSM = 4
- paddingMD = 8
- paddingLG = 12
- paddingXL = 16

### Control metrics
- controlHeightSM = 24
- controlHeightMD = 32
- controlHeightLG = 44
- controlHeight = controlHeightLG

### Motion
- motionDurationFast = 0.1s
- motionDurationMid = 0.2s
- motionDurationSlow = 0.3s
- motionEaseInOut = cubic-bezier(0.4,0,0.2,1)
- motionEaseOut = cubic-bezier(0,0,0.2,1)
- motionEaseIn = cubic-bezier(0.4,0,1,1)

---

## Button Contract

### Props
- size: mini | small | middle | large
- color: default | primary | success | warning | danger
- fill: solid | outline | none
- shape: default | rounded | rectangular
- block: boolean
- loading: boolean
- disabled: boolean
- type: button | submit | reset
- icon
- href
- target
- htmlType
- onClick
- style
- className

### States
- default
- hover
- active
- focus
- disabled
- loading

### Metrics
- mini: height 24, paddingX 12, paddingY 3, radius 4
- small: height 28, paddingX 12, paddingY 3, radius 4
- middle: height 32, paddingX 12, paddingY 7, radius 4
- large: height 44, paddingX 12, paddingY 11, radius 4
- rectangularRadius = 0
- iconGap = 4
- fontSizeSM = 12
- fontSizeMD = 14
- fontSizeLG = 16

### Token references
- background: colorPrimary | colorFill | colorFillSecondary
- text: colorText | colorTextDisabled
- border: colorBorder | colorBorderSecondary
- controlHeight

### Render rules
- fill=solid → background colorPrimary
- fill=outline → border + transparent background
- fill=none → text only
- disabled → colorTextDisabled
- loading → show loadingIcon
- block → width = 100%

---

## Input Contract

### Props
- size: small | middle | large
- value
- defaultValue
- placeholder
- disabled
- readOnly
- clearable
- type
- maxLength
- status
- prefix
- suffix
- autoFocus
- inputMode
- onChange
- onFocus
- onBlur

### States
- default
- focus
- disabled
- error
- warning
- readonly

### Metrics
- small: height 24, paddingX 0, paddingY 0, radius 0
- middle: height 32, radius 4
- large: height 44, radius 4
- inset = 8
- fontSize = 17

### Token references
- text: colorText | colorTextSecondary | colorTextDisabled
- border: colorBorder | colorBorderSecondary
- focus: colorPrimary
- error: colorError
- warning: colorWarning
- background: colorBgContainer
- controlHeight

### Render rules
- focus → border colorPrimary
- error → border colorError
- warning → border colorWarning
- disabled → colorTextDisabled
- clearable → show clearIcon

---

## Tabs Contract (minimum P1 baseline)

### Props
- activeKey
- defaultActiveKey
- onChange
- stretch
- activeLineMode

### States
- default
- active
- disabled

### Metrics
- tabHeight uses controlHeightMD or family-specific metric if frozen
- active line thickness must be explicit in spec/docs

### Tokens
- colorText
- colorTextSecondary
- colorPrimary
- colorBorder

---

## List / Cell Contract (minimum P1 baseline)

### List Props
- header
- mode

### Cell Props
- title
- description
- extra
- prefix
- clickable
- arrow
- onClick

### States
- default
- clickable
- disabled if supported by implementation

### Metrics
- cellHeight
- paddingX
- paddingY
- title / description spacing

### Tokens
- colorText
- colorTextSecondary
- colorBorder
- colorBgContainer

---

## Form Contract (minimum P1 baseline)

### Props
- layout
- footer
- onFinish
- onFinishFailed

### States
- default
- error
- disabled

### Metrics
- field gap
- label gap
- control spacing

### Tokens
- colorText
- colorError
- colorBorder

---

## Overlay Contract (Dialog / Popup / Toast)

### Dialog Props
- visible
- title
- content
- actions
- closeOnAction

### Popup Props
- visible
- position
- bodyStyle
- onMaskClick

### Toast Props
- content
- duration
- icon
- position
- maskClickable

### States
- visible
- hidden

### Metrics
- overlay radius
- overlay padding
- action gap

### Tokens
- colorBgContainer
- colorText
- colorBorder
- colorFill

---

## Navigation Contract (NavBar / TabBar)

### NavBar Props
- back
- backArrow
- left
- right
- onBack
- children

### TabBar Props
- activeKey
- onChange
- safeArea
- children / items

### States
- default
- active
- disabled if supported

### Metrics
- navBarHeight
- tabBarHeight
- item spacing

### Tokens
- colorText
- colorTextSecondary
- colorPrimary
- colorBgContainer
- colorBorder

---

## Selection Contract (Checkbox / Radio / Switch)

### Checkbox Props
- checked
- defaultChecked
- disabled
- onChange

### Radio Props
- checked
- defaultChecked
- disabled
- onChange

### Switch Props
- checked
- defaultChecked
- disabled
- onChange

### States
- default
- checked
- disabled

### Metrics
- control size
- handle size (Switch)
- label gap

### Tokens
- colorPrimary
- colorText
- colorTextDisabled
- colorBorder
- colorFill

---

## Codex Execution Instructions

Use this file as the local baseline.
Do NOT browse Ant docs directly.

When fixing P1 families:

1. Compare current spec against this file
2. Compare generator output against this file
3. Compare plugin renderer/write path against this file
4. Update docs to reflect this file
5. Produce mismatch tables
6. Drive mismatch count to 0
7. Keep canvas verification explicit

---

## Required Docs Placement

This file should be committed to a docs-facing location such as:

- docs/codex-handoff/ant-mobile-p1-source-of-truth.md
or
- apps/docs/docs/core/ant-mobile-p1-source-of-truth.md

If added to the docs site, link it from:
- Core Overview
- Freeze Review
- Schema Index

---

## Required Output from Codex

For every loop, Codex must output:

- changed files
- current P1 family status table
- mismatch counts before fix
- mismatch counts after fix
- which family is complete
- which family is blocked
- exact blocker reason
- confirmation that P2 has not started
