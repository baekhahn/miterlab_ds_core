---
title: Input
---

# Input

## Purpose

Input의 목적은 사용자가 텍스트 값을 입력하거나 편집할 수 있도록 하는 것입니다.

Input은 다음 상황에 사용합니다.
- 텍스트 입력
- 값 수정
- 검색어 입력의 기본 field
- 폼의 단일 입력 단위

기본 contract는 mobile single-line input에 집중합니다.

## Anatomy

Anatomy는 대표 Input의 기본 구조를 설명합니다.
즉 variation이 적용되기 전, Input이 공통으로 가지는 기본 slot 구조입니다.

![Input anatomy preview](/previews/input-anatomy.svg)

| Slot | Role | Required |
| --- | --- | --- |
| `container` | 입력 영역의 shell과 touch area | yes |
| `value` | 현재 입력값 또는 placeholder가 보이는 텍스트 영역 | yes |
| `label` | field 의미를 설명하는 외부 label | no |
| `helper text` | 설명, 오류, 상태 메시지 | no |
| `prefix` | 값 앞의 보조 요소 | no |
| `suffix` | 값 뒤의 보조 요소 | no |

### Composition Rules

- 기본 input은 `container + value`로 구성합니다.
- form 안의 input은 가능하면 `label`을 함께 가집니다.
- `placeholder`는 `value slot` 안의 보조 텍스트이며, label을 대체하지 않습니다.
- `helper text`는 field 아래에서 상태나 설명을 보조합니다.
- `prefix`, `suffix`는 제한적으로 허용합니다.

## Semantics

Input은 액션보다 상태와 입력 가능성을 먼저 전달해야 합니다.

주요 의미 축:
- `default`: 일반 입력 상태
- `error`: 오류 또는 수정 필요 상태
- `success`: 유효하거나 완료된 상태
- `disabled`: 입력 불가 상태
- `readonly`: 읽기 가능하지만 수정 불가 상태
- `loading`: 검증 또는 비동기 처리 중 상태

Input은 다음을 분명히 보여야 합니다.
- 지금 입력 가능한지
- 값이 유효한지
- 입력 중인지
- 설명이나 오류가 필요한지

## Variation

Input의 variation은 기본 anatomy 위에 axis가 적용되며 결정됩니다.
이 axis는 Figma component property와도 직접 연결되는 기준입니다.

| Axis | Options | Meaning | Figma Component Relation |
| --- | --- | --- | --- |
| `intent` | `default`, `error`, `success` | field의 의미 상태를 결정합니다. | intent 또는 validation property와 연결됩니다. |
| `size` | `sm`, `md`, `lg` | field 높이와 밀도를 결정합니다. | size property와 연결됩니다. |
| `state` | `enabled`, `focused`, `disabled`, `readonly`, `loading` | 상호작용 가능 여부와 진행 상태를 결정합니다. | state property와 연결됩니다. |
| `width` | `hug`, `full` | field의 레이아웃 점유 방식을 결정합니다. | layout option 또는 frame usage와 연결됩니다. |
| `content` | `value only`, `with label`, `with helper`, `with prefix/suffix` | anatomy slot을 어떤 조합으로 노출할지 결정합니다. | content-related property와 연결됩니다. |

### Width

| Width | Value |
| --- | --- |
| `hug` | `220` |
| `full` | `360` |

### Content Rules

- 기본 input은 `1 line` 입력을 기준으로 합니다.
- `prefix`, `suffix`는 제한적으로 허용합니다.
- `clear action`은 선택적으로 둘 수 있습니다.
- multiline 입력은 현재 contract 범위에 포함하지 않습니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Input preview](/previews/input-contract.svg)

현재 preview는 축 비교 구조를 유지하되, 입력 데모보다 실제 서비스 폼에서 보이는 절제된 field shell을 우선합니다.

현재 Input 수치는 로컬 문서가 아니라 `Foundation`에서 파생됩니다.
즉 `md` control height가 바뀌면 Input preview, Figma inspection, 생성 수치가 함께 바뀌어야 합니다.

## Metrics

아래 값은 Input 문서가 직접 소유하는 값이 아니라 `Foundation`에서 파생한 현재 결과입니다.

| Size | Height | PaddingX | PaddingY | Radius | Font Size | Line Height | Min Width |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `32` | `12` | `8` | `10` | `14` | `20` | `220` |
| `md` | `40` | `14` | `10` | `10` | `14` | `20` | `220` |
| `lg` | `48` | `16` | `13` | `12` | `16` | `22` | `220` |

## Color Mapping

Color Mapping은 별도 시각 기준이 아니라, Foundation token이 Input의 상태별 역할에 어떻게 매핑되는지 보여주는 확인용 섹션입니다.

### `default`

- `fill`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `background.elevated` `#FFFFFF`
- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#E1E2E4", borderColor: "#D0D4DA" }} /> `line.solidNormal` `#E1E2E4`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#171719", borderColor: "#E1E2E4" }} /> `label.normal` `#171719`
- `subtle`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`

### `error`

- `fill`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `background.elevated` `#FFFFFF`
- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#FF4242", borderColor: "#E1E2E4" }} /> `status.negative` `#FF4242`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#171719", borderColor: "#E1E2E4" }} /> `label.normal` `#171719`
- `subtle`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`

### `success`

- `fill`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `background.elevated` `#FFFFFF`
- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#00BF40", borderColor: "#E1E2E4" }} /> `status.positive` `#00BF40`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#171719", borderColor: "#E1E2E4" }} /> `label.normal` `#171719`
- `subtle`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`

### `disabled`

- `fill`: <span className="foundation-chip" style={{ backgroundColor: "#F4F4F5", borderColor: "#E1E2E4" }} /> `interaction.disable` `#F4F4F5`
- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#E1E2E4", borderColor: "#D0D4DA" }} /> `line.solidNormal` `#E1E2E4`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`
- `subtle`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`

### `readonly`

- `fill`: <span className="foundation-chip" style={{ backgroundColor: "#F7F7F8", borderColor: "#E1E2E4" }} /> `background.alternative` `#F7F7F8`
- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#E1E2E4", borderColor: "#D0D4DA" }} /> `line.solidNormal` `#E1E2E4`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#2E2F33", borderColor: "#E1E2E4" }} /> `label.neutral` `#2E2F33`
- `subtle`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`

### `loading`

- `fill`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `background.elevated` `#FFFFFF`
- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#E1E2E4", borderColor: "#D0D4DA" }} /> `line.solidNormal` `#E1E2E4`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`
- `subtle`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`

### `focus ring`

- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#0066FF", borderColor: "#E1E2E4" }} /> `semantic-primary-heavy` `#0066FF`
- `strokeWeight`: `2`

## Interaction

| State | Meaning |
| --- | --- |
| `enabled` | 기본 편집 가능 상태입니다. |
| `focused` | 현재 입력 중인 활성 상태입니다. |
| `disabled` | 입력할 수 없는 상태입니다. |
| `readonly` | 값은 보이지만 수정할 수 없는 상태입니다. |
| `loading` | 값 검증 또는 비동기 처리 중인 상태입니다. |

### Behavior

- focused는 즉시 인지 가능한 focus treatment를 가져야 합니다.
- error intent는 helper text와 구분되는 오류 상태를 분명히 드러내야 합니다.
- success intent는 완료 또는 유효 상태를 보조적으로 보여야 합니다.
- readonly는 비활성처럼 보이면 안 되고 읽기 가능한 상태여야 합니다.
- disabled는 입력 affordance를 제거하되 값 읽힘은 유지해야 합니다.
- full은 form field 기본 폭으로 사용하고, hug는 짧은 값 입력에만 사용합니다.

## Accessibility

- input은 명확한 accessible name 또는 label이 있어야 합니다.
- placeholder만으로 의미를 전달하면 안 됩니다.
- error 상태는 텍스트 또는 보조 설명으로 함께 전달되어야 합니다.
- 터치 타깃은 최소 `44`를 유지해야 합니다.

## Rules

| Rule | Value | Meaning |
| --- | --- | --- |
| `min_touch_target` | `44` | 최소 터치 영역 기준입니다. |
| `label_required_for_form` | `true` | 폼 안의 필드는 명확한 label을 가져야 합니다. |
| `placeholder_is_not_label` | `true` | placeholder는 label을 대체하지 않습니다. |
| `error_text_below_field` | `true` | 오류 메시지는 필드 아래에 둡니다. |
| `support_value_and_hint` | `true` | 값, placeholder, helper text를 구분해 보여야 합니다. |

### Current Scope

- 현재 contract는 single-line mobile input만 다룹니다.
- helper text, prefix/suffix, input group은 다음 단계에서 분리된 family로 다루는 편이 적절합니다.
- multiline 입력은 별도 family 또는 하위 contract로 분리할 수 있습니다.

## Foundation Reference

Input Contract는 다음을 직접 정의하지 않습니다.

- color value
- typography value
- spacing value
- radius value
- control height

Input은 Foundation token을 참조합니다.

Foundation이 변경되면 Input 수치는 자동으로 바뀝니다.
