---
title: Button
---

# Button

## Purpose

주요 액션과 보조 액션의 우선순위를 드러내는 core action family입니다.

## Implementation Priority

- 이 페이지는 설명 문서가 아니라 구현 계약 문서입니다.
- 구현은 spec보다 앞설 수 없고, generator와 plugin은 아래 계약을 그대로 따라야 합니다.
- reference baseline은 배경 정보입니다. 실제 구현 입력은 이 페이지의 계약 표와 규칙만 사용하면 됩니다.

## Public Props Contract

### Button

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `color` | `string` | `default`, `primary`, `success`, `warning`, `danger` | General prop contract. |
| `fill` | `string` | `solid`, `outline`, `none` | General prop contract. |
| `size` | `string` | `mini`, `small`, `middle`, `large` | General prop contract. |
| `shape` | `string` | `default`, `rounded`, `rectangular` | General prop contract. |
| `block` | `boolean` | `false`, `true` | General prop contract. |
| `loading` | `boolean`, `string` | `false`, `true`, `auto` | Supports boolean and `auto`. |
| `loadingText` | `string` | TODO | General prop contract. |
| `loadingIcon` | `reactNode` | TODO | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `type` | `string` | `button`, `submit`, `reset` | General prop contract. |
| `children` | `reactNode` | TODO | General prop contract. |
| `onMouseDown` | `function` | TODO | General prop contract. |
| `onMouseUp` | `function` | TODO | General prop contract. |
| `onTouchStart` | `function` | TODO | General prop contract. |
| `onTouchEnd` | `function` | TODO | General prop contract. |
| `id` | `string` | TODO | General prop contract. |
| `form` | `string` | TODO | General prop contract. |
| `className` | `string` | TODO | General prop contract. |
| `style` | `object` | TODO | General prop contract. |
| `tabIndex` | `number` | TODO | General prop contract. |
| `--text-color` | `string` | TODO | Official CSS variable contract. |
| `--background-color` | `string` | TODO | Official CSS variable contract. |
| `--border-radius` | `string` | TODO | Official CSS variable contract. |
| `--border-width` | `string` | TODO | Official CSS variable contract. |
| `--border-style` | `string` | TODO | Official CSS variable contract. |
| `--border-color` | `string` | TODO | Official CSS variable contract. |

## State Contract

### Button

| State | Expectation |
| --- | --- |
| `default` | 기본 액션 상태이며 현재 화면에서의 우선순위를 가장 잘 보여주는 외형을 사용합니다. |
| `active` | pressed 순간의 피드백이 즉시 보여야 하며 action intent는 유지되어야 합니다. |
| `focus` | 키보드 이동 시 focus ring 또는 focus border가 또렷하게 보여야 합니다. |
| `disabled` | 비활성 액션으로 읽혀야 하며 interaction affordance가 제거되어야 합니다. |
| `loading` | 현재 액션 진행 중임을 보여야 하며 버튼 레이아웃은 유지되어야 합니다. |

## Size Contract

### Button

| Size | Density | Usage |
| --- | --- | --- |
| `mini` | compact | 짧은 라벨, 보조 액션, 밀도 높은 컨텍스트에 사용합니다. |
| `small` | compact | compact group 안의 일반 액션에 사용합니다. |
| `middle` | default | 기본 화면 밀도의 표준 액션입니다. |
| `large` | roomy | 강한 CTA 또는 넓은 터치 영역이 필요한 경우에 사용합니다. |

## Token Contract

### Button

| Token | Kind | Usage |
| --- | --- | --- |
| `action.primary.background` | token | 가장 강한 액션 계층의 배경입니다. |
| `action.primary.text` | token | primary action label에 사용합니다. |
| `action.secondary.border` | token | secondary action의 outline 경계에 사용합니다. |
| `action.secondary.text` | token | outline 및 low-emphasis action label에 사용합니다. |
| `action.subtle.background` | token | none 또는 subtle action hover/pressed treatment에 사용합니다. |
| `action.disabled.text` | token | disabled action label에 사용합니다. |
| `action.disabled.surface` | token | disabled action surface에 사용합니다. |
| `action.focus.ring` | token | 키보드 focus가 분명히 읽히는 ring 또는 outline에 사용합니다. |
| `action.loading.foreground` | token | loading label과 indicator가 같은 상태로 읽히도록 사용합니다. |

## Appearance Mapping

### Action hierarchy

| Current runtime | Interpretation |
| --- | --- |
| `fill=solid` + emphasized color | 주요 액션. 화면에서 가장 먼저 읽혀야 합니다. |
| `fill=outline` | 보조 액션. primary보다 한 단계 낮은 강조를 가집니다. |
| `fill=none` | 링크성 또는 취소성 액션. 가장 낮은 강조를 가집니다. |

### Width behavior

| Current runtime | Interpretation |
| --- | --- |
| `block=false` | 콘텐츠 폭에 맞는 일반 버튼입니다. |
| `block=true` | 전폭 액션으로 해석합니다. |

### Density

| Current runtime | Interpretation |
| --- | --- |
| `mini`, `small` | compact action density로 해석합니다. |
| `middle`, `large` | default 또는 roomy action density로 해석합니다. |

## Form Placement Rules

- 단일 페이지 form에서는 primary action을 field 왼쪽 정렬선에 맞춰 두는 것이 자연스럽습니다.
- modal이나 dialog 계열에서는 primary action이 가장 마지막 위치에서 읽히도록 배치할 수 있습니다.
- 한 그룹 안에서 primary emphasis는 하나만 두는 것을 기본으로 봅니다.
- cancel 성격의 액션은 `fill=none` 또는 가장 낮은 강조로 두는 편이 자연스럽습니다.

## Render Rules

- 한 화면 안에서는 primary emphasis가 가장 먼저 읽혀야 하며, 보조 액션은 그보다 낮은 시각 우선순위를 가져야 합니다.
- `fill=solid`, `fill=outline`, `fill=none`은 서로 다른 action hierarchy로 읽혀야 합니다.
- `block=true`는 shouldFitContainer와 같은 전폭 액션으로 동작해야 합니다.
- `loading=true`는 레이블 점프 없이 현재 액션 진행 상태를 보여야 합니다.
- `disabled=true`는 클릭 가능해 보이지 않아야 하며, hover/pressed affordance도 제거되어야 합니다.

## Forbidden Changes

- primary와 secondary가 같은 강조도로 보여 액션 우선순위가 사라짐.
- fill 축이 하나의 시각 preset으로 납작해짐.
- block button이 전폭 액션처럼 보이지 않음.
- loading state가 레이블 이동이나 높이 점프로 보임.
- disabled state가 여전히 클릭 가능해 보임.

## Verification Checklist

- `size` 네 축이 payload와 render 결과에서 모두 구분되는지 확인합니다.
- `fill`과 `color`가 함께 유지되고 flatten되지 않았는지 확인합니다.
- `shape`, `block`, `loading`, `disabled`가 payload와 render 양쪽에서 유지되는지 확인합니다.
- padding, radius, text scale이 size 계약과 일치하는지 확인합니다.
- token path가 documented contract를 따르는지 확인합니다.

## Reference Notes

- Reference baseline: Atlassian Design System `Button`
- Spec files: `packages/ui-core/specs/button.spec.yaml`
- `icon`은 현재 공개 Button 계약에 포함되지 않습니다.
- `href`, `target`, `htmlType`는 현재 공개 Button 계약 밖의 항목입니다. 네이티브 버튼 필드는 `type`을 유지합니다.
- `className`, `style`, `tabIndex`, `aria-*`, `data-*`는 `NativeProps`를 통해 지원됩니다.
