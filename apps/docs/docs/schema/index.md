---
title: Schema Index
---

# Schema Index

The frozen Ant-based specs are the source of truth for the current core runtime. Counts and axes below are generated from the live spec files and current parity artifacts.

| Family | Props count | Variant axes | States | Metrics defined | Tokens defined | Freeze status |
| --- | --- | --- | --- | --- | --- | --- |
| Button | 24 | `color`, `fill`, `size`, `shape`, `block`, `loading`, `disabled`, `type` | `default`, `hover`, `pressed`, `focus`, `disabled`, `loading` | 5 entries | 17 | Phase A verified / Phase B pending |
| Input | 35 | `placeholder`, `value`, `defaultValue`, `disabled`, `readOnly`, `clearable`, `onlyShowClearWhenFocus`, `type`, `min`, `max`, `step` | `default`, `disabled`, `readOnly`, `focused`, `clearable`, `placeholder` | 2 entries | 7 | Phase A verified / Phase B pending |
| Tabs | 20 | `activeLineMode`, `direction` | `tab: default, active, disabled` | 5 entries | 7 | Phase A verified / Phase B pending |
| List / Cell | 28 | `mode`, `clickable`, `arrowIcon` | `item: default, disabled, active` | 9 entries | 15 | Phase A verified / Phase B pending |
| Dialog / Popup / Toast | 59 | `closeOnAction`, `closeOnMaskClick`, `position`, `closeOnSwipe`, `icon`, `position` | `dialog: hidden, visible`, `popup: hidden, visible`, `toast: visible, hidden` | 15 entries | 7 | Phase A verified / Phase B pending |
| NavBar / TabBar | 18 | `backIcon`, `safeArea` | `item: default, active` | 10 entries | 2 | Phase A verified / Phase B pending |
| Form | 44 | `mode`, `layout`, `childElementPosition` | `item: default, hidden, disabled, error, warning` | 5 entries | 4 | Phase A verified / Phase B pending |
