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
즉 component properties가 적용되기 전, Input이 공통으로 가지는 기본 slot 구조입니다.

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
- `prefix`, `suffix`, `trailing button`은 component properties에 따라 선택적으로 붙습니다.

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

이 문서의 최종 대상은 main component 설명 자체보다, 실제 화면에서 쓰이는 Input instance입니다.

### Fixed vs Flexible

- 고정: 입력 구조의 의미, 상태 축, trailing button의 역할, accessibility rule, variable 연결
- 개방: 어떤 property 조합을 켤지, heading/description을 붙일지, helper 문구와 텍스트 값, 대표 variant 선택
- 즉 Input contract는 하나의 정답 화면을 고정하는 문서가 아니라, 허용된 instance 범위를 정의하는 문서입니다.

## Component Properties

Input의 component properties는 기본 anatomy 위에 axis가 적용되며 결정됩니다.
이 axis는 Figma component property와 직접 연결되는 기준입니다.
즉 docs에서는 “Input이 어떤 instance 조합으로 생성될 수 있는가”를 이 섹션에서 설명합니다.

| Axis | Options | Meaning | Figma Component Relation |
| --- | --- | --- | --- |
| `status` | `normal`, `positive`, `negative` | field의 의미 상태를 결정합니다. | `Status` property와 연결됩니다. |
| `active` | `true`, `false` | 현재 입력값이 채워진 active state를 결정합니다. | `Active` property와 연결됩니다. |
| `focus` | `true`, `false` | focus treatment 노출 여부를 결정합니다. | `Focus` property와 연결됩니다. |
| `disable` | `true`, `false` | 입력 가능 여부를 결정합니다. | `Disable` property와 연결됩니다. |
| `heading` | `true`, `false` | field 위 heading/label block 노출 여부를 결정합니다. | `Heading` property와 연결됩니다. |
| `description` | `true`, `false` | helper/description block 노출 여부를 결정합니다. | `Description` property와 연결됩니다. |
| `leading content` | `true`, `false` | 좌측 보조 content 노출 여부를 결정합니다. | `Leading Content` property와 연결됩니다. |
| `trailing content` | `true`, `false` | 우측 보조 content 노출 여부를 결정합니다. | `Trailing Content` property와 연결됩니다. |
| `trailing button` | `true`, `false` | 우측 action segment 노출 여부를 결정합니다. | `Trailing Button` 또는 `Button` property와 연결됩니다. |
| `label / placeholder / text` | string | instance 안의 텍스트 값을 결정합니다. | text property와 연결됩니다. |

다만 모든 property를 한 instance에서 다 켜야 하는 것은 아닙니다.
- contract가 고정하는 것은 property axis와 그 의미입니다.
- 실제 instance 생성에서는 form 맥락에 맞는 property 조합만 선택합니다.

### Width

| Width | Value |
| --- | --- |
| `hug` | `220` |
| `full` | `360` |

### Content Rules

- 기본 input은 `1 line` 입력을 기준으로 합니다.
- `prefix`, `suffix`는 제한적으로 허용합니다.
- `trailing button`은 suffix icon이 아니라 우측 action segment로 취급합니다.
- `clear action`은 선택적으로 둘 수 있습니다.
- multiline 입력은 현재 contract 범위에 포함하지 않습니다.

대표 variant set이 있어도, 실제 서비스에서는 그중 일부만 채택해 instance를 구성할 수 있습니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Input preview](/previews/input-contract.svg)

현재 preview는 축 비교 구조를 유지하되, 입력 데모보다 실제 서비스 폼에서 보이는 절제된 field shell을 우선합니다.

현재 Input 수치는 로컬 문서가 아니라 `Variables/Foundation`에서 파생됩니다.
즉 `md` control height가 바뀌면 Input preview, Figma inspection, 생성 수치가 함께 바뀌어야 합니다.

Preview는 대표 instance 예시입니다.
- preview 하나가 Input의 유일한 정답은 아닙니다.
- 같은 contract 안에서도 `Trailing Button`, `Heading`, `Description`, `Status` 조합에 따라 다른 instance가 자연스럽게 나올 수 있습니다.

## Metrics

아래 값은 Input 문서가 직접 소유하는 값이 아니라 `Variables/Foundation`에서 파생한 현재 결과입니다.

| Size | Height | PaddingX | PaddingY | Radius | Font Size | Line Height | Min Width |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `32` | `12` | `8` | `10` | `14` | `20` | `220` |
| `md` | `40` | `14` | `10` | `10` | `14` | `20` | `220` |
| `lg` | `48` | `16` | `13` | `12` | `16` | `22` | `220` |

## Color Mapping

Color Mapping은 별도 시각 기준이 아니라, Foundation token이 Input의 상태별 역할에 어떻게 매핑되는지 보여주는 확인용 섹션입니다.

## Variables

Input은 다음 계열의 variable을 참조합니다.

- color variables
- spacing variables
- radius variables
- typography variables
- control size variables

즉 `Metrics`와 `Color Mapping`은 Input이 직접 정의한 값이 아니라, variable 계층이 instance에 적용된 현재 결과입니다.

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

### Instance Selection

- 같은 Input contract 안에서도 폼 목적에 따라 다른 instance를 선택할 수 있습니다.
- 예: 단순 입력은 기본 field, 검증이 필요한 경우는 `status`, 즉시 액션이 필요한 경우는 `trailing button` instance를 사용합니다.
- contract는 가능한 조합과 경계를 정의하고, 실제 instance 선택은 화면 문맥에서 결정합니다.

## Foundation Reference

Input Contract는 다음을 직접 정의하지 않습니다.

- color value
- typography value
- spacing value
- radius value
- control height

Input은 Variables/Foundation token을 참조합니다.

Foundation이 변경되면 Input 수치는 자동으로 바뀝니다.
