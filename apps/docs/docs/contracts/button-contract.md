---
title: Button Contract
---

# Button Contract

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

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Button preview](/previews/button-contract.svg)

현재 preview는 Bento식 축 비교 구조를 유지하되, foundation tone은 `Wanted`에 더 가깝게 조정합니다.
지금 기준은 과한 데모 톤보다 서비스형 CTA 위계와 절제된 강조를 우선합니다.

## Semantics

Button은 시각 장식보다 액션 의미를 먼저 전달해야 합니다.

주요 의미 계층:
- `primary`: 현재 문맥에서 가장 중요한 액션
- `secondary`: 보조 액션
- `tertiary`: 낮은 강조의 보조 액션
- `destructive`: 데이터 손실 또는 되돌리기 어려운 액션

Button은 다음을 분명히 보여야 합니다.
- 이 액션이 얼마나 중요한지
- 지금 실행 가능한지
- 이미 진행 중인지
- 위험한 결과를 가질 수 있는지

## Variants

### Emphasis

- `primary`
- `secondary`
- `tertiary`
- `destructive`

### Size

- `sm`
- `md`
- `lg`

### Width

- `hug`
- `full`

### Content Form

- text only
- leading icon + text
- trailing icon + text
- icon only

현재 핵심 contract 축은 `emphasis`, `size`, `width`입니다.
content form은 허용 범위로 다루고, 별도 시각 계층을 만들지 않습니다.

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
- secondary는 primary와 경쟁하면 안 됩니다.
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
- `BottomActionGroup` 안의 primary / secondary action
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
- secondary와 tertiary는 샘플용 대비보다 실제 제품 화면에서의 안정감을 우선합니다.
- radius와 spacing은 과장된 showcase보다 실사용 밀도에 맞춥니다.

## Palette

현재 foundation은 Wanted 서비스의 semantic 색을 직접 참고합니다.

| Emphasis | Fill | Stroke | Text | Pressed Fill | Pressed Stroke |
| --- | --- | --- | --- | --- | --- |
| `primary` | `#0064FF` | `#0064FF` | `#FFFFFF` | `#0056DB` | `#0056DB` |
| `secondary` | `#FFFFFF` | `#E1E2E4` | `#171719` | `#F7F7F8` | `#D3D5D9` |
| `tertiary` | `transparent` | `transparent` | `#2E2F33` | `transparent` | `transparent` |
| `destructive` | `#FF4242` | `#FF4242` | `#FFFFFF` | `#E03838` | `#E03838` |
| `disabled` | `#F4F4F5` | `#E1E2E4` | `#989BA2` | - | - |
