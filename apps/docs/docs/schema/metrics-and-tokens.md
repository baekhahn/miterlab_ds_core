---
title: Metrics And Tokens
---

# Metrics And Tokens

Official Ant Mobile metric and token defaults are shown first when they are known from source. Frozen spec runtime-only fields remain listed with their spec source so current implementation gaps stay visible.

## Global Ant Token Contract

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
| `motionDuration` | not exposed by name | TODO | no direct Ant Mobile 5.x token name in theme-default.less |
| `motionEase` | not exposed by name | TODO | no direct Ant Mobile 5.x token name in theme-default.less |

## Button

### Button Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `height` | `auto` | official button.less |
| `default` | `paddingX` | `12px` | official button.less |
| `default` | `paddingY` | `7px` | official button.less |
| `default` | `borderRadius` | `4px` | official button.less |
| `default` | `fontSize` | `17px` | official button.less + theme-default.less |
| `default` | `lineHeight` | `1.4` | official button.less |
| `mini` | `paddingY` | `3px` | official button.less |
| `mini` | `fontSize` | `13px` | official button.less + theme-default.less |
| `small` | `paddingY` | `3px` | official button.less |
| `small` | `fontSize` | `15px` | official button.less + theme-default.less |
| `middle` | `fontSize` | `17px` | official button.less + theme-default.less |
| `large` | `paddingY` | `11px` | official button.less |
| `large` | `fontSize` | `18px` | official button.less + theme-default.less |
| `internalLayout` | `minWidth` | `0` | spec internalLayout |
| `internalLayout` | `textAlignX` | `center` | spec internalLayout |
| `internalLayout` | `textAlignY` | `center` | spec internalLayout |

### Button Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Button | `--text-color` | cssVar | default `#333333` via `var(--adm-color-text)` |
| Button | `--background-color` | cssVar | default `#ffffff` via `var(--adm-color-background)` |
| Button | `--border-radius` | cssVar | default `4px` in official button.less |
| Button | `--border-width` | cssVar | default `1px` in official button.less |
| Button | `--border-style` | cssVar | default `solid` in official button.less |
| Button | `--border-color` | cssVar | default `#eeeeee` via `var(--adm-color-border)` |
| Button | `colorPrimary` | antToken | `#1677ff` via `--adm-color-primary` |
| Button | `colorText` | antToken | `#333333` via `--adm-color-text` |
| Button | `colorBorder` | antToken | `#eeeeee` via `--adm-color-border` |
| Button | `colorBgContainer` | antToken | `#ffffff` via `--adm-color-background` |
| Button | `colorFill` | antToken | Ant Design Mobile 5.x does not expose `colorFill` by name; nearest exposed fill token is `--adm-color-fill-content` -> `#f5f5f5` |
| Button | `colorFillSecondary` | antToken | Ant Design Mobile 5.x does not expose `colorFillSecondary` by name in theme-default.less |
| Button | `colorTextDisabled` | antToken | Ant Design Mobile 5.x does not expose `colorTextDisabled` by name; disabled button uses `opacity: 0.4` over current text/background colors |
| Button | `controlHeight` | antToken | no explicit component token; effective height is content-driven |

## Input

### Input Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `wrapper` | `minHeight` | `24px` | official input.less |
| `wrapper` | `width` | `100%` | official input.less |
| `wrapper` | `alignItems` | `center` | official input.less |
| `element` | `lineHeight` | `1.5` | official input.less |
| `element` | `minHeight` | `1.5em` | official input.less |
| `element` | `padding` | `0` | official input.less |
| `clear` | `marginLeft` | `8px` | official input.less |
| `clear` | `padding` | `4px` | official input.less |
| `element` | `fontSize` | `17px` | official input.less + theme-default.less |
| `clear` | `iconFontSize` | `15px` | official input.less + theme-default.less |
| `default` | `height` | `24` | spec defaults |
| `default` | `paddingX` | `0` | spec defaults |
| `default` | `paddingY` | `0` | spec defaults |
| `default` | `radius` | `0` | spec defaults |
| `default` | `inset` | `8` | spec defaults |
| `default` | `fontSize` | `17` | spec defaults |
| `internalLayout` | `minWidth` | `0` | spec internalLayout |
| `internalLayout` | `textAlignX` | `start` | spec internalLayout |
| `internalLayout` | `textAlignY` | `center` | spec internalLayout |

### Input Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Input | `--font-size` | cssVar | default `17px` via `var(--adm-font-size-9)` |
| Input | `--color` | cssVar | default `#333333` via `var(--adm-color-text)` |
| Input | `--placeholder-color` | cssVar | default `#cccccc` via `var(--adm-color-light)` |
| Input | `--text-align` | cssVar | default `left` in official input.less |
| Input | `colorText` | antToken | `#333333` via `--adm-color-text` |
| Input | `colorBorder` | antToken | native input border is removed; wrapper integrations commonly use `#eeeeee` via `--adm-color-border` |
| Input | `colorPrimary` | antToken | `#1677ff` global token; no dedicated Input status prop |
| Input | `colorError` | antToken | `#ff3141` global token; not exposed by official InputProps |
| Input | `colorWarning` | antToken | `#ff8f1f` global token; not exposed by official InputProps |
| Input | `colorTextSecondary` | antToken | `#666666` via `--adm-color-text-secondary` |
| Input | `colorTextDisabled` | antToken | Ant Design Mobile 5.x does not expose `colorTextDisabled` by name; disabled input uses wrapper `opacity: 0.4` |
| Input | `controlHeight` | antToken | no explicit component token; effective wrapper min-height is `24px` in official input.less |

## Tabs

### Tabs Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `tabPaddingX` | `12px` | spec metrics |
| `default` | `tabPaddingTop` | `8px` | spec metrics |
| `default` | `tabPaddingBottom` | `10px` | spec metrics |
| `default` | `contentPadding` | `12px` | spec metrics |
| `default` | `activeLineHeight` | `2px` | spec metrics |

### Tabs Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Tabs | `--title-font-size` | cssVar | default `var(--adm-font-size-9)` in official tabs.less |
| Tabs | `--content-padding` | cssVar | default `12px` in official tabs.less |
| Tabs | `--active-line-height` | cssVar | default `2px` in official tabs.less |
| Tabs | `--active-line-border-radius` | cssVar | default `var(--active-line-height)` in official tabs.less |
| Tabs | `--active-line-color` | cssVar | default `var(--adm-color-primary)` in official tabs.less |
| Tabs | `--active-title-color` | cssVar | default `var(--adm-color-primary)` in official tabs.less |

## List / Cell

### List Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `cardMargin` | `12px` | spec metrics |
| `default` | `cardRadius` | `8px` | spec metrics |
| `default` | `headerPaddingY` | `8px` | spec metrics |
| `default` | `itemContentPaddingY` | `12px` | spec metrics |
| `default` | `itemExtraPaddingLeft` | `12px` | spec metrics |

### List Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| List | `--header-font-size` | cssVar | default `var(--adm-font-size-7)` in official list.less |
| List | `--prefix-padding-right` | cssVar | default `12px` in official list.less |
| List | `--align-items` | cssVar | default `center` in official list.less |
| List | `--active-background-color` | cssVar | default `var(--adm-color-border)` in official list.less |
| List | `--font-size` | cssVar | default `var(--adm-font-size-9)` in official list.less |
| List | `--extra-max-width` | cssVar | default `70%` in official list.less |

### Cell Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `contentPaddingY` | `12px` | spec metrics |
| `default` | `extraPaddingLeft` | `12px` | spec metrics |
| `default` | `arrowMarginLeft` | `4px` | spec metrics |
| `default` | `arrowFontSize` | `19px` | spec metrics |

### Cell Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Cell | `--prefix-width` | cssVar | spec tokens.cssVars |
| Cell | `--align-items` | cssVar | spec tokens.cssVars |
| Cell | `--active-background-color` | cssVar | spec tokens.cssVars |

## Dialog / Popup / Toast

### Dialog Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `maxBodyHeight` | `70vh` | spec metrics |
| `default` | `imageMaxHeight` | `40vh` | spec metrics |
| `default` | `headerMarginBottom` | `8px` | spec metrics |
| `default` | `contentPaddingX` | `12px` | spec metrics |
| `default` | `contentPaddingBottom` | `20px` | spec metrics |
| `default` | `actionPadding` | `10px` | spec metrics |

### Dialog Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Dialog | `--z-index` | cssVar | default `var(--adm-dialog-z-index, 1000)` in official dialog.less |

### Popup Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `closeIconOffset` | `8px` | spec metrics |
| `default` | `closeIconPadding` | `4px` | spec metrics |
| `default` | `closeIconSize` | `18px` | spec metrics |

### Popup Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Popup | `--z-index` | cssVar | spec tokens.cssVars |

### Toast Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `maxWidth` | `204px` | spec metrics |
| `default` | `radius` | `8px` | spec metrics |
| `default` | `textPadding` | `12px` | spec metrics |
| `default` | `iconPaddingY` | `35px` | spec metrics |
| `default` | `iconPaddingX` | `12px` | spec metrics |
| `default` | `iconSize` | `36px` | spec metrics |

### Toast Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Toast | `--size` | cssVar | spec tokens.cssVars |

## NavBar / TabBar

### NavBar Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `height` | `45px` | spec metrics |
| `default` | `paddingX` | `12px` | spec metrics |
| `default` | `backMarginRight` | `16px` | spec metrics |
| `default` | `backPaddingY` | `6px` | spec metrics |
| `default` | `backArrowSize` | `24px` | spec metrics |

### NavBar Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| NavBar | `--height` | cssVar | default `45px` in official nav-bar.less |
| NavBar | `--border-bottom` | cssVar | default `none` in official nav-bar.less |

### TabBar Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `minHeight` | `48px` | spec metrics |
| `default` | `itemPaddingY` | `4px` | spec metrics |
| `default` | `itemPaddingX` | `8px` | spec metrics |
| `default` | `iconSize` | `24px` | spec metrics |
| `default` | `titleLineHeight` | `15px` | spec metrics |

### TabBar Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| TabBar | `colorPrimary` | antToken | active item color is `var(--adm-color-primary)` in official tab-bar.less |
| TabBar | `colorTextSecondary` | antToken | inactive item color is `var(--adm-color-text-secondary)` in official tab-bar.less |

## Form

### Form Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `footerPaddingY` | `20px` | spec metrics |
| `default` | `footerPaddingX` | `12px` | spec metrics |
| `default` | `prefixWidth` | `6.8em` | spec metrics |
| `default` | `verticalLabelMarginBottom` | `4px` | spec metrics |
| `default` | `feedbackMarginTop` | `4px` | spec metrics |

### Form Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Form | `--border-inner` | cssVar | spec tokens.cssVars |
| Form | `--border-top` | cssVar | spec tokens.cssVars |
| Form | `--border-bottom` | cssVar | spec tokens.cssVars |
| Form | `--prefix-width` | cssVar | spec tokens.cssVars |
