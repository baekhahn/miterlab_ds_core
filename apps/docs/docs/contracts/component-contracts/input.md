---
title: Input
---

# Input

## Layer

`Input`은 `Component`입니다.

Input은 독립적으로 렌더 가능한 단일 입력 단위입니다.
Input 자체는 `Module`이 아니며, 화면 구조를 설명하는 `Pattern`도 아닙니다.

## Purpose

모바일 환경에서 텍스트 입력과 값 편집을 담당하는 core input contract입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Input preview](/previews/input-contract.svg)

현재 preview는 Bento식 축 비교 구조를 유지하되, foundation tone은 `Wanted`에 더 가깝게 조정합니다.
지금 기준은 입력 데모보다 실제 서비스 폼에서 보이는 절제된 field shell을 우선합니다.

현재 Input 수치는 로컬 문서가 아니라 `Foundation`에서 파생됩니다.
즉 `md` control height가 바뀌면 Input preview, Figma inspection, 생성 수치가 함께 바뀌어야 합니다.

## Current Source Signals

- `Default / Error / Success`가 같은 field shell 안에서 비교되어야 합니다.
- `Small / Medium / Large`의 높이 차이가 한 화면에서 보여야 합니다.
- `Focused / Disabled / Read Only`가 상태 차이로 읽혀야 합니다.
- `Hug Width / Full Width`가 필드 용도의 차이를 보여야 합니다.
- `With Helper / With Error Text / Multiline / Readonly Field`가 bundle 예시로 보여야 합니다.

## What Changed

- source 기준이 단순 Input API 문서가 아니라 Bento inputs bundle로 바뀌었습니다.
- 그래서 이 preview는 “하나의 input prop 조합”보다 “field shell 패턴 묶음”을 보여주는 방향으로 읽어야 합니다.
- 현재 preview는 bundle 전체가 아니라 single-line input core만 보여줍니다.
- `TextArea`는 source 범위에 포함되지만, 현재 contract 결과물에는 아직 포함되지 않습니다.

## Reference

- Reference source: [Tamagui Bento Inputs](https://tamagui.dev/bento/forms/inputs)
- Core direction: platform-agnostic mobile contract
- 현재 문서는 Bento inputs patterns를 참고해, 우리 core에 남긴 single-line field 기준만 고정한 문서입니다.

## Bento Source Scope

| Source Bundle | Meaning |
| --- | --- |
| `Inputs` | Bento의 input bundle 전체를 source로 봅니다. |
| `10 components` | Bento inventory 기준으로 inputs bundle은 여러 field composition을 포함합니다. |
| `TextAreas` | 같은 source 맥락에서 multiline field bundle도 함께 봐야 합니다. |
| `4 components` | Bento inventory 기준으로 textarea bundle도 별도로 존재합니다. |
| `pattern bundle` | 이 문서는 prop API 복제가 아니라, bundle 안의 공통 field 구조를 추출한 core contract입니다. |

## Component Identity

- component: input
- version: 1.0.0
- platform: agnostic

## What Is Included

- `intent`, `size`, `width`, `state`
- mobile field height 기준
- focus ring과 상태별 field palette
- inspection에서 바로 검증할 수 있는 sample set
- Bento inputs bundle에서 반복되는 공통 field shell

## What Is Not Included

- Bento inputs 예시에 포함된 모든 스타일 세부값
- multiline, textarea, select, search 조합
- prefix/suffix/icon affordance 전체
- framework 전용 Input API

## Bento Pattern Coverage

| Bundle Layer | Current Status | Notes |
| --- | --- | --- |
| base single-line input | included | 현재 core input의 기본 unit입니다. |
| intent state | included | default / error / success만 남겼습니다. |
| width behavior | included | hug / full만 남겼습니다. |
| focused / disabled / readonly / loading | included | 공통 interaction 상태만 남겼습니다. |
| helper / validation composition | partial | contract rule에는 있으나 별도 subcomponent는 아직 없습니다. |
| prefix / suffix / affordance patterns | excluded | bundle 수준 조합은 아직 미포함입니다. |
| textarea / multiline | excluded | 별도 family 또는 하위 contract로 분리할 대상입니다. |
| search / select / grouped field patterns | excluded | 현재는 base input scope 밖입니다. |

## Variants

| Axis | Values | Notes |
| --- | --- | --- |
| `intent` | `default`, `error`, `success` | 필드의 의미 상태를 나타냅니다. |
| `size` | `sm`, `md`, `lg` | 모바일 필드 높이와 텍스트 밀도를 구분합니다. |
| `width` | `hug`, `full` | 짧은 값 입력 또는 전폭 필드를 구분합니다. |

## Metrics

아래 값은 Input 문서가 직접 소유하는 값이 아니라 `Foundation`에서 파생한 현재 결과입니다.

| Size | Height | PaddingX | PaddingY | Radius | Font Size | Line Height | Min Width |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `32` | `12` | `8` | `10` | `14` | `20` | `220` |
| `md` | `40` | `14` | `10` | `10` | `14` | `20` | `220` |
| `lg` | `48` | `16` | `13` | `12` | `16` | `22` | `220` |

## Widths

| Width | Value |
| --- | --- |
| `hug` | `220` |
| `full` | `360` |

## Palette

공통 color source는 `mobile-core.colors.input.intent`입니다.

| Intent | Fill | Stroke | Text | Subtle |
| --- | --- | --- | --- | --- |
| `default` | `#FFFFFF` | `#E1E2E4` | `#171719` | `#989BA2` |
| `error` | `#FFFFFF` | `#FF4242` | `#171719` | `#989BA2` |
| `success` | `#FFFFFF` | `#00BF40` | `#171719` | `#989BA2` |
| `disabled` | `#F4F4F5` | `#E1E2E4` | `#989BA2` | `#989BA2` |
| `readonly` | `#F7F7F8` | `#E1E2E4` | `#2E2F33` | `#989BA2` |
| `loading` | `#FFFFFF` | `#E1E2E4` | `#989BA2` | `#989BA2` |

## Focus Ring

focus ring source는 `mobile-core.colors.input.focusRing`입니다.

| Token | Value |
| --- | --- |
| `stroke` | `#0064FF` |
| `strokeWeight` | `2` |

## States

| State | Meaning |
| --- | --- |
| `enabled` | 기본 편집 가능 상태입니다. |
| `focused` | 현재 입력 중인 활성 상태입니다. |
| `disabled` | 입력할 수 없는 상태입니다. |
| `readonly` | 값은 보이지만 수정할 수 없는 상태입니다. |
| `loading` | 값 검증 또는 비동기 처리 중인 상태입니다. |

## Rules

| Rule | Value | Meaning |
| --- | --- | --- |
| `min_touch_target` | `44` | 최소 터치 영역 기준입니다. |
| `label_required_for_form` | `true` | 폼 안의 필드는 명확한 label을 가져야 합니다. |
| `placeholder_is_not_label` | `true` | placeholder는 label을 대체하지 않습니다. |
| `error_text_below_field` | `true` | 오류 메시지는 필드 아래에 둡니다. |
| `support_value_and_hint` | `true` | 값, placeholder, helper text를 구분해 보여야 합니다. |

## Content

| Rule | Value | Meaning |
| --- | --- | --- |
| `max_lines` | `1` | 기본 input은 1줄 입력을 기준으로 합니다. |
| `allow_prefix` | `limited` | 접두 요소는 제한적으로 허용합니다. |
| `allow_suffix` | `limited` | 접미 요소는 제한적으로 허용합니다. |
| `clear_action_optional` | `true` | clear affordance는 선택적으로 둘 수 있습니다. |

## Render Rules

- focused는 즉시 인지 가능한 focus treatment를 가져야 합니다.
- error intent는 helper text와 구분되는 오류 상태를 분명히 드러내야 합니다.
- success intent는 완료 또는 유효 상태를 보조적으로 보여야 합니다.
- readonly는 비활성처럼 보이면 안 되고 읽기 가능한 상태여야 합니다.
- disabled는 입력 affordance를 제거하되 값 읽힘은 유지해야 합니다.
- full은 form field 기본 폭으로 사용하고, hug는 짧은 값 입력에만 사용합니다.

## Inspection Rows

| Row | Samples |
| --- | --- |
| `intent` | `Default`, `Error`, `Success` |
| `size` | `Small`, `Medium`, `Large` |
| `state` | `Focused`, `Disabled`, `Read Only` |
| `width` | `Hug Width`, `Full Width` |
| `bundle` | `With Helper`, `With Error Text`, `Multiline`, `Readonly Field` |

## Current Gaps

- Bento inputs 안의 TextArea 범위는 아직 현재 contract에 포함되지 않았습니다.
- 현재 contract는 single-line mobile input만 다룹니다.
- helper text, prefix/suffix, input group은 다음 단계에서 분리된 family로 다루는 편이 적절합니다.
- Bento inputs bundle 전체를 모두 반영한 것은 아니며, 현재는 공통 base input contract만 고정한 상태입니다.

## Accessibility Minimum

- input은 명확한 accessible name 또는 label이 있어야 합니다.
- placeholder만으로 의미를 전달하면 안 됩니다.
- error 상태는 텍스트 또는 보조 설명으로 함께 전달되어야 합니다.
- 터치 타깃은 최소 44를 유지해야 합니다.

## Current Visual Direction

- stroke와 focus ring은 튀는 강조보다 안정적인 입력 맥락을 우선합니다.
- readonly와 disabled는 같은 회색 처리가 아니라 읽기 가능성과 비활성을 구분합니다.
- field shell은 과장된 component showcase보다 실제 폼 사용 맥락에 맞춘 밀도를 유지합니다.
