# Component Structure Rules

Figma에서 컴포넌트를 만드는 기본 구조 규칙입니다.

## Token Rule
- semantic 토큰만 사용
- foundation 토큰 직접 사용 금지
- brand 토큰 직접 사용 금지

## Build Rule
- size 차이는 variant property `size`로 처리
- state 차이는 variant property `state`로 처리
- 시각 상태를 로컬 오버라이드 값으로 직접 입력하지 않음

## Layer Rule
- 슬롯 이름은 spec 기준으로 통일 (`container`, `label`, `field`, `icon`)
- semantic 키를 기준으로 fill/border/text/effect 연결

## Practical Rule
- 컴포넌트마다 동일한 상태 순서 사용
- default -> hover -> pressed -> disabled -> focus 순서 권장
