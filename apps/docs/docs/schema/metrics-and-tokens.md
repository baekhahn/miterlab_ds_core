---
title: Metrics And Tokens
---

# Metrics And Tokens

Known metric values are taken directly from the frozen specs. Unknown values remain marked as `TODO` instead of being omitted.

## Button

### Button Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
| `mini` | `height` | `28` | spec sizeDefaults |
| `mini` | `paddingX` | `10` | spec sizeDefaults |
| `mini` | `paddingY` | `5` | spec sizeDefaults |
| `mini` | `radius` | `8` | spec sizeDefaults |
| `mini` | `radiusRectangular` | `4` | spec sizeDefaults |
| `mini` | `iconGap` | `4` | spec sizeDefaults |
| `small` | `height` | `32` | spec sizeDefaults |
| `small` | `paddingX` | `12` | spec sizeDefaults |
| `small` | `paddingY` | `7` | spec sizeDefaults |
| `small` | `radius` | `10` | spec sizeDefaults |
| `small` | `radiusRectangular` | `6` | spec sizeDefaults |
| `small` | `iconGap` | `4` | spec sizeDefaults |
| `middle` | `height` | `36` | spec sizeDefaults |
| `middle` | `paddingX` | `16` | spec sizeDefaults |
| `middle` | `paddingY` | `8` | spec sizeDefaults |
| `middle` | `radius` | `12` | spec sizeDefaults |
| `middle` | `radiusRectangular` | `8` | spec sizeDefaults |
| `middle` | `iconGap` | `6` | spec sizeDefaults |
| `large` | `height` | `44` | spec sizeDefaults |
| `large` | `paddingX` | `20` | spec sizeDefaults |
| `large` | `paddingY` | `10` | spec sizeDefaults |
| `large` | `radius` | `14` | spec sizeDefaults |
| `large` | `radiusRectangular` | `10` | spec sizeDefaults |
| `large` | `iconGap` | `6` | spec sizeDefaults |
| `internalLayout` | `minWidth` | `64` | spec internalLayout |
| `internalLayout` | `textAlignX` | `center` | spec internalLayout |
| `internalLayout` | `textAlignY` | `center` | spec internalLayout |

### Button Tokens

| Scope | Token | Kind | Source |
| --- | --- | --- | --- |
| Button | `semantic.surface.subtle` | semantic | spec semanticMapping |
| Button | `semantic.text.primary` | semantic | spec semanticMapping |
| Button | `semantic.surface.sunken` | semantic | spec semanticMapping |
| Button | `semantic.border.strong` | semantic | spec semanticMapping |
| Button | `semantic.focus.ring` | semantic | spec semanticMapping |
| Button | `semantic.action.disabled` | semantic | spec semanticMapping |
| Button | `semantic.text.muted` | semantic | spec semanticMapping |
| Button | `semantic.action.primary` | semantic | spec semanticMapping |
| Button | `semantic.action.onPrimary` | semantic | spec semanticMapping |
| Button | `semantic.action.primaryHover` | semantic | spec semanticMapping |
| Button | `semantic.action.primaryPressed` | semantic | spec semanticMapping |
| Button | `semantic.status.success` | semantic | spec semanticMapping |
| Button | `semantic.status.warning` | semantic | spec semanticMapping |
| Button | `semantic.status.critical` | semantic | spec semanticMapping |
| Button | `semantic.surface.default` | semantic | spec semanticMapping |
| Button | `semantic.border.default` | semantic | spec semanticMapping |
| Button | `semantic.border.subtle` | semantic | spec semanticMapping |

## Input

### Input Metrics

| Scope | Metric | Value | Source |
| --- | --- | --- | --- |
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
| Input | `semantic.surface.default` | semantic | spec semanticMapping |
| Input | `semantic.border.default` | semantic | spec semanticMapping |
| Input | `semantic.text.primary` | semantic | spec semanticMapping |
| Input | `semantic.text.muted` | semantic | spec semanticMapping |
| Input | `semantic.surface.subtle` | semantic | spec semanticMapping |
| Input | `semantic.border.subtle` | semantic | spec semanticMapping |
| Input | `semantic.text.secondary` | semantic | spec semanticMapping |

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
| Tabs | `--fixed-active-line-width` | cssVar | spec tokens.cssVars |
| Tabs | `--active-line-height` | cssVar | spec tokens.cssVars |
| Tabs | `--active-line-border-radius` | cssVar | spec tokens.cssVars |
| Tabs | `--title-font-size` | cssVar | spec tokens.cssVars |
| Tabs | `--content-padding` | cssVar | spec tokens.cssVars |
| Tabs | `--active-title-color` | cssVar | spec tokens.cssVars |
| Tabs | `--active-line-color` | cssVar | spec tokens.cssVars |

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
| List | `--active-background-color` | cssVar | spec tokens.cssVars |
| List | `--align-items` | cssVar | spec tokens.cssVars |
| List | `--border-bottom` | cssVar | spec tokens.cssVars |
| List | `--border-inner` | cssVar | spec tokens.cssVars |
| List | `--border-top` | cssVar | spec tokens.cssVars |
| List | `--extra-max-width` | cssVar | spec tokens.cssVars |
| List | `--font-size` | cssVar | spec tokens.cssVars |
| List | `--header-font-size` | cssVar | spec tokens.cssVars |
| List | `--padding-left` | cssVar | spec tokens.cssVars |
| List | `--padding-right` | cssVar | spec tokens.cssVars |
| List | `--prefix-padding-right` | cssVar | spec tokens.cssVars |
| List | `--prefix-width` | cssVar | spec tokens.cssVars |

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
| Dialog | `--background-color` | cssVar | spec tokens.cssVars |
| Dialog | `--border-radius` | cssVar | spec tokens.cssVars |
| Dialog | `--max-width` | cssVar | spec tokens.cssVars |
| Dialog | `--min-width` | cssVar | spec tokens.cssVars |
| Dialog | `--z-index` | cssVar | spec tokens.cssVars |

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
| NavBar | `--height` | cssVar | spec tokens.cssVars |
| NavBar | `--border-bottom` | cssVar | spec tokens.cssVars |

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
| TabBar | TODO | TODO | TODO |

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
