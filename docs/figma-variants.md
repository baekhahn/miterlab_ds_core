# Figma Variant Naming Rules

컴포넌트 variant 네이밍과 속성 규칙입니다.

## Variant Properties (v1)
- variant
- size
- state
- selected (FilterButton만)

## Allowed States
- default
- hover
- pressed
- disabled
- focus

## Naming Format
둘 중 하나를 사용하고, 파일 내에서는 하나로 통일합니다.

1. Slash 형식
- `Button / primary / md / default`
- `Button / primary / md / hover`

2. Property 형식 (권장)
- `variant=primary, size=md, state=default`
- `variant=primary, size=md, state=hover`

## Rules
- 대소문자/하이픈 규칙을 컴포넌트별로 고정
- 같은 의미의 상태명을 혼용하지 않음 (`active` vs `pressed` 금지)
- 축 추가는 spec 변경 이후에만 허용
