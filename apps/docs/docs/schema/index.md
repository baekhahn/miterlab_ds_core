---
title: Schema Index
---

# Schema Index

The frozen Ant-based specs are the source of truth for the current core runtime. Counts and axes below are generated from the live spec files and current parity artifacts.

| Family | Props count | Variant axes | States | Metrics defined | Tokens defined | Freeze status |
| --- | --- | --- | --- | --- | --- | --- |
| Button | 27 | `color`, `fill`, `size`, `shape`, `block`, `loading`, `disabled`, `type` | `default`, `active`, `focus`, `disabled`, `loading` | 7 entries | 14 | Phase A pending / Phase B pending |
| Input | 42 | `placeholder`, `value`, `defaultValue`, `disabled`, `readOnly`, `clearable`, `onlyShowClearWhenFocus`, `type`, `min`, `max`, `step` | `default`, `focus`, `disabled`, `readOnly` | 3 entries | 12 | Phase A pending / Phase B pending |
| Tabs | 20 | `activeLineMode`, `direction` | `tab: default, active, disabled` | 5 entries | 6 | Phase A verified / Phase B pending |
| List / Cell | 28 | `mode`, `clickable`, `arrowIcon` | `item: default, disabled, active` | 9 entries | 9 | Phase A verified / Phase B pending |
| Dialog / Popup / Toast | 59 | `closeOnAction`, `closeOnMaskClick`, `position`, `closeOnSwipe`, `icon`, `position` | `dialog: hidden, visible`, `popup: hidden, visible`, `toast: visible, hidden` | 15 entries | 3 | Phase A verified / Phase B pending |
| NavBar / TabBar | 18 | `backIcon`, `safeArea` | `item: default, active` | 10 entries | 4 | Phase A verified / Phase B pending |
| Form | 45 | `mode`, `layout`, `childElementPosition` | `item: default, hidden, disabled, error, warning` | 5 entries | 4 | Phase A verified / Phase B pending |

## Global Token Contract

| Token | Default | Source | Notes |
| --- | --- | --- | --- |
| `colorPrimary` | `#1677ff` | global Ant token | primary accent token |
| `colorText` | `#333333` | global Ant token | primary foreground text |
| `colorTextSecondary` | `#666666` | global Ant token | secondary foreground text |
| `colorTextDisabled` | not exposed by name | derived behavior | commonly represented through component opacity or muted text treatment |
| `colorBorder` | `#eeeeee` | global Ant token | default border token |
| `colorBorderSecondary` | not exposed by name | TODO | no direct Ant Mobile 5.x token name in theme-default.less |
| `colorBgContainer` | `#ffffff` | global Ant token | container background token |
| `colorBgContainerDisabled` | not exposed by name | derived behavior | commonly represented through muted surface + opacity |
| `colorFill` | `#f5f5f5` nearest: --adm-color-fill-content | compatibility token | nearest exposed fill token in Ant Mobile 5.x |
| `colorFillSecondary` | not exposed by name | TODO | no direct Ant Mobile 5.x token name in theme-default.less |
| `colorFillTertiary` | not exposed by name | TODO | no direct Ant Mobile 5.x token name in theme-default.less |
| `fontSizeSM` | `13px` | derived from --adm-font-size-main | used by Button mini and compact text cases |
| `fontSizeMD` | `17px` | derived from --adm-font-size-9 | default body/control text size |
| `fontSizeLG` | `18px` | derived from --adm-font-size-10 | large control text size |
| `radiusSM` | `4px` | derived from --adm-radius-s | small corner radius |
| `radiusMD` | `8px` | derived from --adm-radius-m | medium corner radius |
| `radiusLG` | `12px` | derived from --adm-radius-l | large corner radius |
| `paddingSM` | `12px / 3px` | component-derived | small control horizontal/vertical padding from Button |
| `paddingMD` | `12px / 7px` | component-derived | middle control horizontal/vertical padding from Button |
| `paddingLG` | `12px / 11px` | component-derived | large control horizontal/vertical padding from Button |
| `controlHeight` | content-driven or `24px` wrapper min-height | component-derived | Button is content-driven; Input wrapper min-height is `24px` |
| `lineHeight` | `1.4` Button / `1.5` Input | component-derived | line-height varies by component family |
