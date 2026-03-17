---
title: Schema Index
---

# Schema Index

The frozen Ant-based specs are the source of truth for the current core runtime. Counts and axes below are generated from the live spec files and current parity artifacts.

| Family | Props count | Variant axes | States | Metrics defined | Tokens defined | Freeze status |
| --- | --- | --- | --- | --- | --- | --- |
| Button | 27 | `color`, `fill`, `size`, `shape`, `block`, `loading`, `disabled`, `type` | `default`, `active`, `focus`, `disabled`, `loading` | 7 entries | 23 | Phase A pending / Phase B pending |
| Input | 42 | `placeholder`, `value`, `defaultValue`, `disabled`, `readOnly`, `clearable`, `onlyShowClearWhenFocus`, `type`, `min`, `max`, `step` | `default`, `focus`, `disabled`, `readOnly` | 3 entries | 11 | Phase A pending / Phase B pending |
| Tabs | 20 | `activeLineMode`, `direction` | `tab: default, active, disabled` | 5 entries | 7 | Phase A verified / Phase B pending |
| List / Cell | 28 | `mode`, `clickable`, `arrowIcon` | `item: default, disabled, active` | 9 entries | 15 | Phase A verified / Phase B pending |
| Dialog / Popup / Toast | 59 | `closeOnAction`, `closeOnMaskClick`, `position`, `closeOnSwipe`, `icon`, `position` | `dialog: hidden, visible`, `popup: hidden, visible`, `toast: visible, hidden` | 15 entries | 7 | Phase A verified / Phase B pending |
| NavBar / TabBar | 18 | `backIcon`, `safeArea` | `item: default, active` | 10 entries | 2 | Phase A verified / Phase B pending |
| Form | 45 | `mode`, `layout`, `childElementPosition` | `item: default, hidden, disabled, error, warning` | 5 entries | 4 | Phase A verified / Phase B pending |
