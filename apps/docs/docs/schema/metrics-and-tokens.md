---
title: Metrics And Tokens
---

# Metrics And Tokens

Known metric values are taken directly from the frozen specs. Unknown values remain marked as `TODO` instead of being omitted.

## Button

### Button Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `default` | `height` | `auto` | official button.less |
| `default` | `paddingX` | `12px` | official button.less |
| `default` | `paddingY` | `7px` | official button.less |
| `default` | `borderRadius` | `4px` | official button.less |
| `default` | `fontSize` | `var(--adm-font-size-9)` | official button.less |
| `default` | `lineHeight` | `1.4` | official button.less |
| `mini` | `paddingY` | `3px` | official button.less |
| `mini` | `fontSize` | `var(--adm-font-size-main)` | official button.less |
| `small` | `paddingY` | `3px` | official button.less |
| `small` | `fontSize` | `var(--adm-font-size-7)` | official button.less |
| `large` | `paddingY` | `11px` | official button.less |
| `large` | `fontSize` | `var(--adm-font-size-10)` | official button.less |
| `internalLayout` | `minWidth` | `64` | spec internalLayout |
| `internalLayout` | `textAlignX` | `center` | spec internalLayout |
| `internalLayout` | `textAlignY` | `center` | spec internalLayout |

### Button Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Button | `--text-color` | cssVar | default `var(--adm-color-text)` in official button.less |
| Button | `--background-color` | cssVar | default `var(--adm-color-background)` in official button.less |
| Button | `--border-radius` | cssVar | default `4px` in official button.less |
| Button | `--border-width` | cssVar | default `1px` in official button.less |
| Button | `--border-style` | cssVar | default `solid` in official button.less |
| Button | `--border-color` | cssVar | default `var(--adm-color-border)` in official button.less |
| Button | `colorPrimary` | antToken | represented through `var(--adm-color-primary)` |
| Button | `colorText` | antToken | represented through `var(--adm-color-text)` |
| Button | `colorBorder` | antToken | represented through `var(--adm-color-border)` |
| Button | `colorBgContainer` | antToken | represented through `var(--adm-color-background)` |
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
| `default` | `height` | `42` | spec defaults |
| `default` | `paddingX` | `14` | spec defaults |
| `default` | `paddingY` | `10` | spec defaults |
| `default` | `radius` | `12` | spec defaults |
| `internalLayout` | `minWidth` | `220` | spec internalLayout |
| `internalLayout` | `textAlignX` | `start` | spec internalLayout |
| `internalLayout` | `textAlignY` | `center` | spec internalLayout |

### Input Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Input | `--font-size` | cssVar | default `var(--adm-font-size-9)` in official input.less |
| Input | `--color` | cssVar | default `var(--adm-color-text)` in official input.less |
| Input | `--placeholder-color` | cssVar | default `var(--adm-color-light)` in official input.less |
| Input | `--text-align` | cssVar | default `left` in official input.less |
| Input | `colorText` | antToken | represented through `var(--adm-color-text)` |
| Input | `colorBorder` | antToken | native input border is removed; field wrappers may use external border styling |
| Input | `colorPrimary` | antToken | used indirectly for surrounding focused field patterns, not as an Input prop |
| Input | `colorError` | antToken | not exposed by official InputProps |
| Input | `colorWarning` | antToken | not exposed by official InputProps |
| Input | `colorTextSecondary` | antToken | represented through light/weak text variables in Ant Mobile |

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
