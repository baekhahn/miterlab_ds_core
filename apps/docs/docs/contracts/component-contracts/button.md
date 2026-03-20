---
title: Button
---

# Button

## Purpose

Button의 목적은 사용자가 의도적으로 실행하는 액션을 명확하게 트리거하는 것입니다.

Button은 다음 상황에 사용합니다.
- 다음 단계 진행
- 확인 또는 제출
- 취소 또는 닫기
- 위험 액션 실행

Button은 정보 표시용 요소가 아니라, 행동을 유도하는 요소입니다.

## Anatomy

Anatomy는 대표 Button의 기본 구조를 설명합니다.
즉 variation이 적용되기 전, Button이 공통으로 가지는 기본 slot 구조입니다.

![Button anatomy preview](/previews/button-anatomy.svg)

| Slot | Role | Required |
| --- | --- | --- |
| `container` | 터치 영역과 시각적 버튼 shell | yes |
| `label` | 액션 이름을 전달하는 기본 텍스트 | yes |
| `leading icon` | label 앞의 보조 시각 단서 | no |
| `trailing icon` | label 뒤의 보조 시각 단서 | no |

### Composition Rules

- 기본 button은 `container + label`로 구성합니다.
- variation에 따라 `leading icon`, `trailing icon`, `icon only` 구성이 파생됩니다.
- icon only variant는 시각적 label 없이 렌더할 수 있지만, accessible name은 반드시 필요합니다.
- 하나의 button 안에 leading icon과 trailing icon을 동시에 기본값으로 두지 않습니다.
- loading indicator는 상태 표현 요소이며, 기본 anatomy slot으로 보지 않습니다.

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

## Variation

Button의 variation은 기본 anatomy 위에 axis가 적용되며 결정됩니다.
이 axis는 Figma component property와도 직접 연결되는 기준입니다.

| Axis | Options | Meaning | Figma Component Relation |
| --- | --- | --- | --- |
| `hierarchy preset` | `primary level.4`, `primary level.3`, `assistive level.2`, `assistive level.1`, `destructive` | 버튼의 의미 우선순위와 기본 형태를 함께 결정합니다. | 주요 component preset 또는 variant 조합과 연결됩니다. |
| `content` | `label only`, `leading icon + label`, `trailing icon + label`, `icon only` | 기본 anatomy slot을 어떤 조합으로 노출할지 결정합니다. | icon option, content-related property와 연결됩니다. |
| `size` | `sm`, `md`, `lg` | 밀도와 control height를 결정합니다. | size property와 연결됩니다. |
| `state` | `enabled`, `pressed`, `disabled`, `loading` | 상호작용과 비활성/진행 상태를 결정합니다. | state property와 연결됩니다. |
| `width` | `hug`, `full` | 버튼의 레이아웃 점유 방식을 결정합니다. | layout option 또는 frame usage와 연결됩니다. |

### Hierarchy Presets

| Preset | Meaning | Visual Form |
| --- | --- | --- |
| `primary level.4` | 현재 문맥에서 가장 중요한 메인 액션 | `solid primary` |
| `primary level.3` | primary를 보조하는 대체 액션 | `outlined primary` |
| `assistive level.2` | 토글이나 보조 액션을 지원하는 액션 | `soft filled assistive` |
| `assistive level.1` | 닫기, 취소, 돌아가기 같은 낮은 강조 액션 | `outlined assistive` 또는 `text-like low emphasis` |
| `destructive` | 데이터 손실 또는 되돌리기 어려운 위험 액션 | `destructive emphasis` |

### Width

| Width | Value |
| --- | --- |
| `hug` | `128` |
| `full` | `360` |

### Icon Only Sizing Rule

- `icon only` 버튼은 square control로 다룹니다.
- width는 별도 라벨 폭이 아니라 현재 control height와 같습니다.
- 즉 현재 기준은 `sm 32`, `md 40`, `lg 48`의 정사각형입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Button preview](/previews/button-contract.svg)

현재 preview는 축 비교 구조를 유지하되, 과한 데모 톤보다 서비스형 CTA 위계와 절제된 강조를 우선합니다.

현재 Button 수치는 로컬 문서가 아니라 `Foundation`에서 파생됩니다.
즉 `md` control height가 바뀌면 Button preview, Figma inspection, 생성 수치가 함께 바뀌어야 합니다.

## Metrics

아래 값은 Button 문서가 직접 소유하는 값이 아니라 `Foundation`에서 파생한 현재 결과입니다.

| Size | Height | PaddingX | PaddingY | Radius | Font Size | Line Height | Min Width |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `32` | `14` | `8` | `10` | `14` | `20` | `104` |
| `md` | `40` | `16` | `10` | `10` | `14` | `20` | `116` |
| `lg` | `48` | `18` | `13` | `12` | `16` | `22` | `148` |

## Color Mapping

Color Mapping은 별도 시각 기준이 아니라, Foundation token이 Button의 실제 시각 역할에 어떻게 매핑되는지 보여주는 확인용 섹션입니다.

### `solid / primary`

- `default fill`: <span className="foundation-chip" style={{ backgroundColor: "#1A75FF", borderColor: "#E1E2E4" }} /> `semantic-primary-strong` `#1A75FF`
- `pressed fill`: <span className="foundation-chip" style={{ backgroundColor: "#0066FF", borderColor: "#E1E2E4" }} /> `semantic-primary-heavy` `#0066FF`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `text.inverse` `#FFFFFF`

### `solid / destructive`

- `default fill`: <span className="foundation-chip" style={{ backgroundColor: "#FF4242", borderColor: "#E1E2E4" }} /> `semantic-status-negative` `#FF4242`
- `pressed fill`: <span className="foundation-chip" style={{ backgroundColor: "#E52222", borderColor: "#E1E2E4" }} /> `status.dangerPressed` `#E52222`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `text.inverse` `#FFFFFF`

### `outlined / assistive`

- `default fill`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `background.elevated` `#FFFFFF`
- `default stroke`: <span className="foundation-chip" style={{ backgroundColor: "#E1E2E4", borderColor: "#D0D4DA" }} /> `line.solidNormal` `#E1E2E4`
- `pressed fill`: <span className="foundation-chip" style={{ backgroundColor: "#F7F7F8", borderColor: "#E1E2E4" }} /> `background.alternative` `#F7F7F8`
- `pressed stroke`: <span className="foundation-chip" style={{ backgroundColor: "#EAEBEC", borderColor: "#D0D4DA" }} /> `line.solidNeutral` `#EAEBEC`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#171719", borderColor: "#E1E2E4" }} /> `label.normal` `#171719`

### `outlined / primary`

- `default fill`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `background.elevated` `#FFFFFF`
- `default stroke`: <span className="foundation-chip" style={{ backgroundColor: "#1A75FF", borderColor: "#E1E2E4" }} /> `semantic-primary-strong` `#1A75FF`
- `pressed fill`: <span className="foundation-chip" style={{ backgroundColor: "#F7F7F8", borderColor: "#E1E2E4" }} /> `background.alternative` `#F7F7F8`
- `pressed stroke`: <span className="foundation-chip" style={{ backgroundColor: "#0066FF", borderColor: "#E1E2E4" }} /> `semantic-primary-heavy` `#0066FF`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#1A75FF", borderColor: "#E1E2E4" }} /> `semantic-primary-strong` `#1A75FF`

### `outlined / destructive`

- `default fill`: <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} /> `background.elevated` `#FFFFFF`
- `default stroke`: <span className="foundation-chip" style={{ backgroundColor: "#FF4242", borderColor: "#E1E2E4" }} /> `semantic-status-negative` `#FF4242`
- `pressed fill`: <span className="foundation-chip" style={{ backgroundColor: "#F4F4F5", borderColor: "#E1E2E4" }} /> `background.strong` `#F4F4F5`
- `pressed stroke`: <span className="foundation-chip" style={{ backgroundColor: "#E52222", borderColor: "#E1E2E4" }} /> `status.dangerPressed` `#E52222`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#FF4242", borderColor: "#E1E2E4" }} /> `semantic-status-negative` `#FF4242`

### `disabled`

- `fill`: <span className="foundation-chip" style={{ backgroundColor: "#F4F4F5", borderColor: "#E1E2E4" }} /> `interaction.disable` `#F4F4F5`
- `stroke`: <span className="foundation-chip" style={{ backgroundColor: "#E1E2E4", borderColor: "#D0D4DA" }} /> `line.solidNormal` `#E1E2E4`
- `text`: <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} /> `interaction.inactive` `#989BA2`

## Interaction

### States

| State | Meaning |
| --- | --- |
| `enabled` | 기본 실행 가능 상태입니다. |
| `pressed` | 터치 피드백 상태입니다. |
| `disabled` | 지금 실행할 수 없는 상태입니다. |
| `loading` | 액션은 수락되었고 현재 처리 중인 상태입니다. |
| `focused` | 필요할 때만 보조적으로 다루는 상태입니다. |

### Behavior

- `pressed`는 터치 피드백입니다.
- `selected`나 `active navigation` 상태와 혼용하면 안 됩니다.
- loading 중에는 반복 탭을 막아야 합니다.
- loading 때문에 버튼 의미가 사라지면 안 됩니다.
- disabled는 지금 실행할 수 없음을 뜻하며, 중요한 다음 단계 조건을 disabled만으로 숨기면 안 됩니다.

## Accessibility

- 터치 타깃은 모바일 최소 기준 이상이어야 합니다.
- icon only 버튼은 접근 가능한 이름이 반드시 있어야 합니다.
- 색만으로 액션 의미를 전달하면 안 됩니다.
- disabled와 loading은 시각적으로 구분 가능해야 합니다.
- destructive 의미는 색이 없어도 이해 가능해야 합니다.

## Rules

### Action Hierarchy

- 한 섹션에는 primary 액션을 하나만 둡니다.
- assistive는 primary와 경쟁하면 안 됩니다.
- destructive는 일반 액션과 섞이지 않게 분리합니다.

### Width Usage

- `hug`는 콘텐츠 흐름 안의 로컬 액션에 사용합니다.
- `full`은 하단 CTA나 섹션 수준의 강한 실행 액션에 사용합니다.
- 모든 버튼을 기본적으로 `full`로 두면 안 됩니다.

### Labeling

- 라벨은 UI 이름이 아니라 행동을 설명해야 합니다.
- 짧고 명확한 동사 중심 문구를 우선합니다.
- `OK`, `확인`처럼 맥락이 약한 라벨은 최소화합니다.

### Anti-Patterns

- Button을 정보 카드나 컨테이너처럼 사용하는 것
- 실제로는 `ListRow`나 `BottomActionGroup`이어야 하는 구조를 Button 하나로 대체하는 것
- 한 액션 그룹에 primary 버튼을 여러 개 두는 것
- 의미가 불명확한 icon only 버튼을 남발하는 것
- disabled 상태로만 사용자 안내를 대체하는 것
- 지속 상태 선택을 Button으로 표현하는 것

### Composition Boundary

- Button 하나면 Component입니다.
- Button 묶음에 정렬, 간격, 우선순위 규칙이 붙으면 Module입니다.
- 여러 Module이 화면 시나리오를 이루면 Pattern입니다.

## Foundation Reference

Button Contract는 다음을 직접 정의하지 않습니다.

- color value
- typography value
- spacing value
- radius value
- control height

Button은 Foundation token을 참조합니다.

Foundation이 변경되면 Button 수치는 자동으로 바뀝니다.
