---
title: Button
---

# Button

## Layer

`Button`은 `Component`입니다.

Button은 독립적으로 렌더 가능한 단일 액션 단위입니다.
Button 자체는 `Module`이 아니며, 화면 구조를 설명하는 `Pattern`도 아닙니다.

## Purpose

Button의 목적은 사용자가 의도적으로 실행하는 액션을 명확하게 트리거하는 것입니다.

Button은 다음 상황에 사용합니다.
- 다음 단계 진행
- 확인 또는 제출
- 취소 또는 닫기
- 위험 액션 실행

Button은 정보 표시용 요소가 아니라, 행동을 유도하는 요소입니다.

## Anatomy

Button은 아래 slot으로 구성합니다.

![Button anatomy preview](/previews/button-anatomy.svg)

- `leading icon`
- `label`
- `trailing icon`
- `container`

### Anatomy Compositions

- `label only`
- `icon + label`
- `icon only`

### Required Slots

- `label`
- `container`

### Optional Slots

- `leading icon`
- `trailing icon`

### Composition Rules

- 기본 button은 `container + label`로 구성합니다.
- leading icon variant는 `leading icon + label`을 사용합니다.
- trailing icon variant는 `label + trailing icon`을 사용합니다.
- icon only variant는 시각적 label 없이 렌더할 수 있지만, accessible name은 반드시 필요합니다.
- 하나의 button 안에 leading icon과 trailing icon을 동시에 기본값으로 두지 않습니다.

### Notes

- loading indicator는 상태 표현 요소이며, 기본 anatomy slot으로 보지 않습니다.
- interaction surface는 container의 상호작용 속성으로 다루고, 별도 visual slot으로 분리하지 않습니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Button preview](/previews/button-contract.svg)

현재 preview는 축 비교 구조를 유지하되, 과한 데모 톤보다 서비스형 CTA 위계와 절제된 강조를 우선합니다.

현재 Button 수치는 로컬 문서가 아니라 `Foundation`에서 파생됩니다.
즉 `md` control height가 바뀌면 Button preview, Figma inspection, 생성 수치가 함께 바뀌어야 합니다.

## Semantics

Button은 시각 장식보다 액션 의미를 먼저 전달해야 합니다.

주요 의미 계층:
- `primary`: 현재 문맥에서 가장 중요한 액션
- `assistive`: primary를 보조하는 일반 액션
- `destructive`: 데이터 손실 또는 되돌리기 어려운 액션

Button은 다음을 분명히 보여야 합니다.
- 이 액션이 얼마나 중요한지
- 지금 실행 가능한지
- 이미 진행 중인지
- 위험한 결과를 가질 수 있는지

## Hierarchy Presets

현재 Button은 `Hierarchy Preset` 중심으로 읽는 편이 가장 명확합니다.

- `primary level.4`
- `primary level.3`
- `assistive level.2`
- `assistive level.1`
- `destructive`

각 preset은 단순 의미 레벨만이 아니라, 실제 버튼 형태까지 함께 포함합니다.

예:
- `primary level.4` = solid primary
- `primary level.3` = outlined primary
- `assistive level.2` = soft filled assistive
- `assistive level.1` = outlined assistive 또는 text-like low emphasis

즉 현재 Button은 `hierarchy`가 기본 형태를 결정하는 preset 축입니다.

## Content Options

### Content

- `label only`
- `icon + label`
- `icon only`

이 axis는 버튼 내부 콘텐츠 조합을 정합니다.

### Size

- `sm`
- `md`
- `lg`

### State

- `enabled`
- `pressed`
- `disabled`
- `loading`

### Width

- `hug`
- `full`

## Preset Reading Rule

실제 버튼은 아래 순서로 읽습니다.

1. hierarchy preset을 먼저 정합니다.
2. content option을 선택합니다.
3. size, width, state를 적용합니다.

즉 현재 Button은 `variant -> color`보다 `hierarchy preset -> content -> size/state` 순서로 읽는 편이 더 자연스럽습니다.

## Icon Only Sizing Rule

- `icon only` 버튼은 square control로 다룹니다.
- width는 별도 라벨 폭이 아니라 현재 control height와 같습니다.
- 즉 현재 기준은 `sm 32`, `md 40`, `lg 48`의 정사각형입니다.
- 이 규칙이 없으면 icon only button의 폭, 터치 타깃, row 균형이 쉽게 흔들립니다.

## Metrics

아래 값은 Button 문서가 직접 소유하는 값이 아니라 `Foundation`에서 파생한 현재 결과입니다.

| Size | Height | PaddingX | PaddingY | Radius | Font Size | Line Height | Min Width |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `32` | `14` | `8` | `10` | `14` | `20` | `104` |
| `md` | `40` | `16` | `10` | `10` | `14` | `20` | `116` |
| `lg` | `48` | `18` | `13` | `12` | `16` | `22` | `148` |

## Widths

| Width | Value |
| --- | --- |
| `hug` | `128` |
| `full` | `360` |

## Foundation Reference

Button Contract는 다음을 직접 정의하지 않습니다.

- color value
- typography value
- spacing value
- radius value
- control height

Button은 Foundation token을 참조합니다.

Foundation이 변경되면 Button 수치는 자동으로 바뀝니다.

## States

- `enabled`
- `pressed`
- `disabled`
- `loading`

필요할 때만 보조적으로 다루는 상태:
- `focused`

`pressed`는 터치 피드백입니다.
`selected`나 `active navigation` 상태와 혼용하면 안 됩니다.

## Rules

### Action Hierarchy

- 한 섹션에는 primary 액션을 하나만 둡니다.
- assistive는 primary와 경쟁하면 안 됩니다.
- destructive는 일반 액션과 섞이지 않게 분리합니다.

### Width Usage

- `hug`는 콘텐츠 흐름 안의 로컬 액션에 사용합니다.
- `full`은 하단 CTA나 섹션 수준의 강한 실행 액션에 사용합니다.
- 모든 버튼을 기본적으로 `full`로 두면 안 됩니다.

### Loading Behavior

- loading은 액션이 수락되었고 현재 처리 중임을 뜻합니다.
- loading 중에는 반복 탭을 막아야 합니다.
- loading 때문에 버튼 의미가 사라지면 안 됩니다.

### Disabled Behavior

- disabled는 지금 실행할 수 없음을 뜻합니다.
- 중요한 다음 단계 조건을 disabled만으로 숨기면 안 됩니다.
- 이유가 중요하면 주변 문맥에서 설명해야 합니다.

### Labeling

- 라벨은 UI 이름이 아니라 행동을 설명해야 합니다.
- 짧고 명확한 동사 중심 문구를 우선합니다.
- `OK`, `확인`처럼 맥락이 약한 라벨은 최소화합니다.

## Accessibility Constraints

- 터치 타깃은 모바일 최소 기준 이상이어야 합니다.
- icon only 버튼은 접근 가능한 이름이 반드시 있어야 합니다.
- 색만으로 액션 의미를 전달하면 안 됩니다.
- disabled와 loading은 시각적으로 구분 가능해야 합니다.
- destructive 의미는 색이 없어도 이해 가능해야 합니다.

## Anti-Patterns

- Button을 정보 카드나 컨테이너처럼 사용하는 것
- 실제로는 `ListRow`나 `BottomActionGroup`이어야 하는 구조를 Button 하나로 대체하는 것
- 한 액션 그룹에 primary 버튼을 여러 개 두는 것
- 의미가 불명확한 icon only 버튼을 남발하는 것
- disabled 상태로만 사용자 안내를 대체하는 것
- 지속 상태 선택을 Button으로 표현하는 것

## Composition Notes

Button은 Module 안에서 자주 사용되지만, Module 자체가 되지는 않습니다.

예:
- `BottomActionGroup` 안의 primary / assistive action
- `EmptyStateBlock` 안의 recovery action
- `FormField` 아래의 submit action

판별 기준:
- Button 하나면 Component입니다.
- Button 묶음에 정렬, 간격, 우선순위 규칙이 붙으면 Module입니다.
- 여러 Module이 화면 시나리오를 이루면 Pattern입니다.

## Current Contract Scope

현재 문서는 다음 범위에 집중합니다.
- mobile action hierarchy
- touch interaction meaning
- reusable button semantics
- Component와 Module의 경계

현재 문서가 아직 다루지 않는 범위:
- product-specific CTA wording system
- complex button group pattern 전체
- brand-specific visual language

## Current Visual Direction

- 강조색은 과한 원색보다 서비스형 우선순위 전달에 집중합니다.
- assistive와 outlined는 샘플용 대비보다 실제 제품 화면에서의 안정감을 우선합니다.
- radius와 spacing은 과장된 showcase보다 실사용 밀도에 맞춥니다.

## Palette

현재 Button palette는 raw 색이 아니라 Foundation semantic token에서 파생합니다.

| Variant | Color | Fill | Stroke | Text | Pressed Fill | Pressed Stroke |
| --- | --- | --- | --- | --- | --- | --- |
| `solid` | `primary` | `#1A75FF` | `transparent` | `#FFFFFF` | `#0066FF` | `transparent` |
| `solid` | `destructive` | `#FF4242` | `transparent` | `#FFFFFF` | `#E52222` | `transparent` |
| `outlined` | `assistive` | `#FFFFFF` | `#E1E2E4` | `#171719` | `#F7F7F8` | `#EAEBEC` |
| `outlined` | `primary` | `#FFFFFF` | `#1A75FF` | `#1A75FF` | `#F7F7F8` | `#0066FF` |
| `outlined` | `destructive` | `#FFFFFF` | `#FF4242` | `#FF4242` | `#FFF1F1` | `#E52222` |
| `disabled` | `all` | `#F4F4F5` | `#E1E2E4` | `#989BA2` | - | - |
