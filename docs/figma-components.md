# Figma Components Production Rules

`packages/ui-core/specs/*.spec.yaml`을 기준으로 Figma 컴포넌트를 만드는 규칙입니다.

## Core Rules
- 컴포넌트는 semantic 토큰만 사용
- foundation 값을 직접 넣지 않음
- brand 값을 직접 넣지 않음
- spec 없는 컴포넌트 생성 금지

## Property Rules
기본 속성:
- variant
- size
- state

추가 속성:
- selected (FilterButton)

## Allowed States
- default
- hover
- pressed
- disabled
- focus

## Spec Mapping
- `variant` -> Figma variant property `variant`
- `size` -> Figma variant property `size`
- `state` -> Figma variant property `state`
- `semanticMapping` -> 레이어별 변수/스타일 연결 기준

## Component Scope (v1)
- Button
- Input
- FilterButton
- Tabs
- Modal

## Lightweight Rule
- variant 축 확장 금지 (tone/intent/mode 등)
- 필요 시 spec 먼저 업데이트 후 Figma 반영
