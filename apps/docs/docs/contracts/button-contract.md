---
title: Button Contract
---

# Button Contract

## Purpose

단일하고 명확한 액션을 실행하는 모바일용 core button contract입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Button preview](/previews/button-contract.svg)

## Current Source Signals

- `Primary / Secondary / Tertiary / Destructive`가 동시에 보여야 합니다.
- `Small / Medium / Large`가 한 화면에서 비교되어야 합니다.
- `Pressed / Disabled / Loading`이 구조적으로 분리되어 보여야 합니다.
- `Hug Width / Full Width`가 CTA 사용 차이를 드러내야 합니다.
- `Leading Icon / Icon Only / Bottom CTA / Danger CTA`가 bundle 예시로 보여야 합니다.

## What Changed

- source 기준이 단순 API 문서가 아니라 Bento button bundle로 바뀌었습니다.
- 그래서 이 preview는 “버튼 하나의 prop 예시”보다 “action hierarchy 묶음”을 보여주는 방향으로 읽어야 합니다.
- 현재 preview는 bundle 전체를 모두 재현하는 것이 아니라, 그 안의 공통 button unit만 보여줍니다.

## Reference

- Reference source: [Tamagui Bento Buttons](https://tamagui.dev/bento/elements/buttons)
- Core direction: platform-agnostic mobile contract
- 현재 문서는 Bento button patterns를 참고해, 우리 core에 남긴 범위만 고정한 문서입니다.

## Bento Source Scope

| Source Bundle | Meaning |
| --- | --- |
| `Buttons` | Bento의 button bundle 전체를 source로 봅니다. |
| `5 components` | Bento inventory 기준으로 button bundle은 여러 button pattern 조합을 포함합니다. |
| `pattern bundle` | 이 문서는 prop API 복제가 아니라, bundle 안의 공통 구조를 추출한 core contract입니다. |

## Component Identity

- component: button
- version: 1.0.0
- platform: agnostic

## What Is Included

- `emphasis`, `size`, `width`, `state`
- mobile touch target 기준
- inspection에서 확인할 수 있는 sample set
- core renderer가 바로 그릴 수 있는 최소 palette
- Bento buttons bundle에서 반복되는 공통 action hierarchy

## What Is Not Included

- Bento 예시에 포함된 모든 스타일 세부값
- framework 전용 API
- web 전용 form prop 전체
- icon, trailing affordance, button group의 전체 조합
- product-specific content patterns

## Bento Pattern Coverage

| Bundle Layer | Current Status | Notes |
| --- | --- | --- |
| base button shape | included | 현재 core button의 기본 unit입니다. |
| emphasis hierarchy | included | primary / secondary / tertiary / destructive로 추렸습니다. |
| width behavior | included | hug / full만 남겼습니다. |
| pressed / disabled / loading | included | 공통 interaction 상태만 남겼습니다. |
| icon variants | partial | 아직 contract 축으로 올리지 않았습니다. |
| grouped button patterns | excluded | bundle 수준 조합은 아직 미포함입니다. |
| share / follow / product CTA patterns | excluded | product-specific pattern은 아직 core 밖입니다. |

## Variants

| Axis | Values | Notes |
| --- | --- | --- |
| `emphasis` | `primary`, `secondary`, `tertiary`, `destructive` | 액션 우선순위를 나타냅니다. |
| `size` | `sm`, `md`, `lg` | 모바일 밀도와 터치 영역을 구분합니다. |
| `width` | `hug`, `full` | 콘텐츠 폭 또는 전폭 액션을 구분합니다. |

## Metrics

| Size | Height | PaddingX | PaddingY | Radius | Font Size | Line Height | Min Width |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `44` | `14` | `10` | `14` | `15` | `20` | `120` |
| `md` | `50` | `18` | `13` | `14` | `16` | `22` | `128` |
| `lg` | `56` | `20` | `16` | `16` | `17` | `24` | `176` |

## Widths

| Width | Value |
| --- | --- |
| `hug` | `128` |
| `full` | `358` |

## Palette

공통 color source는 `mobile-core.colors.button.emphasis`입니다.

| Emphasis | Fill | Stroke | Text | Pressed Fill | Pressed Stroke |
| --- | --- | --- | --- | --- | --- |
| `primary` | `#1F6BFF` | `#1F6BFF` | `#FFFFFF` | `#1859D6` | `#1859D6` |
| `secondary` | `#FFFFFF` | `#C7D2E5` | `#172033` | `#F4F7FB` | `#B7C5DD` |
| `tertiary` | `transparent` | `transparent` | `#172033` | `transparent` | `transparent` |
| `destructive` | `#DC3F45` | `#DC3F45` | `#FFFFFF` | `#B73238` | `#B73238` |
| `disabled` | `#F1F5F9` | `#E2E8F0` | `#94A3B8` | - | - |

## States

| State | Meaning |
| --- | --- |
| `enabled` | 기본 사용 가능 상태입니다. |
| `pressed` | 터치 또는 클릭 중 피드백 상태입니다. |
| `disabled` | 실행할 수 없는 상태입니다. |
| `loading` | 진행 중이며 반복 탭을 막는 상태입니다. |

## Rules

| Rule | Value | Meaning |
| --- | --- | --- |
| `min_touch_target` | `44` | 최소 터치 영역 기준입니다. |
| `single_primary_per_section` | `true` | 한 섹션에는 primary 액션을 하나만 둡니다. |
| `loading_blocks_repeat_tap` | `true` | loading 중에는 반복 탭을 막습니다. |
| `destructive_requires_confirmation` | `conditional` | 파괴적 액션은 상황에 따라 확인 단계를 둡니다. |
| `full_width_recommended_for_bottom_cta` | `true` | 하단 CTA는 full width를 권장합니다. |

## Content

| Rule | Value | Meaning |
| --- | --- | --- |
| `max_lines` | `2` | 라벨은 최대 2줄까지 허용합니다. |
| `allow_icon_leading` | `true` | 앞 아이콘을 허용합니다. |
| `allow_icon_trailing` | `limited` | 뒤 아이콘은 제한적으로 허용합니다. |
| `icon_only_requires_accessible_name` | `true` | 아이콘 전용 버튼은 접근 가능한 이름이 필요합니다. |

## Render Rules

- primary는 같은 영역 안에서 가장 먼저 읽혀야 합니다.
- secondary는 구조적으로 분명한 보조 액션이어야 합니다.
- tertiary는 배경 없이 가장 낮은 강조를 가져야 합니다.
- destructive는 일반 액션과 섞이지 않고 위험도가 분명해야 합니다.
- pressed는 즉시 반응해야 하지만 레이아웃을 흔들면 안 됩니다.
- loading은 현재 액션 진행 상태를 보여주고 반복 탭을 막아야 합니다.

## Inspection Rows

| Row | Samples |
| --- | --- |
| `emphasis` | `Primary`, `Secondary`, `Tertiary`, `Destructive` |
| `size` | `Small`, `Medium`, `Large` |
| `state` | `Pressed`, `Disabled`, `Loading` |
| `width` | `Hug Width`, `Full Width` |
| `bundle` | `Leading Icon`, `Icon Only`, `Bottom CTA`, `Danger CTA` |

## Current Gaps

- Bento buttons에서 보이는 icon 계열과 composition 범위는 아직 core contract에 들어오지 않았습니다.
- 현재 contract는 Button family의 최소 모바일 기준만 남겨둔 상태입니다.
- 필요하면 다음 단계에서 icon, trailing affordance, 더 세밀한 상태를 별도 축으로 확장할 수 있습니다.
- Bento bundle 전체를 모두 반영한 것은 아니며, 현재는 공통 base button contract만 고정한 상태입니다.

## Accessibility Minimum

- 버튼은 명확한 accessible name이 있어야 합니다.
- icon only button은 텍스트 대체 이름이 반드시 있어야 합니다.
- disabled와 loading은 시각적으로 구분되어야 합니다.
- 터치 타깃은 최소 44를 유지해야 합니다.
