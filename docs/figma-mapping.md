# Figma Mapping Guide

Miterlab Core DS 토큰을 Figma 변수/스타일로 옮길 때의 기본 규칙입니다.

## 목표
- 토큰 구조를 그대로 유지
- semantic 중심 사용
- 프로젝트 브랜드 전환을 mode로 처리

## Token -> Figma Mapping

### 1) Foundation (Primitive Variables)
Collection: `Foundation`

- color -> Color variables
- spacing -> Number variables
- radius -> Number variables
- motion -> Number/String variables (duration/easing)
- breakpoint -> Number/String variables
- typography.fontSize / fontWeight / lineHeight -> Number variables

원칙:
- Foundation은 raw 값만 보관합니다.
- 컴포넌트에서 직접 사용하지 않습니다.

### 2) Semantic (Semantic Variables + Styles)
Collection: `Semantic`

- background.*, surface.*, border.*, text.*, icon.*, action.*, focus.*, status.*
- semantic color는 Figma Color styles에도 동일 이름으로 노출

원칙:
- 컴포넌트는 Semantic 변수/스타일만 참조합니다.
- alias 체인은 짧게 유지합니다.

### 3) Brand (Mode Inputs)
Collection: `Brand`
Modes:
- `Default`
- `Alpha`
- `Pulse`

키 예시:
- brand.primary
- brand.primaryHover
- brand.primaryPressed
- brand.secondary
- brand.accent

원칙:
- Brand는 역할/상태 값을 제공
- semantic action/focus에 주입되는 입력 레이어

### 4) Theme (Resolved Modes)
Collection: `Theme`
Modes:
- `Default`
- `Alpha`
- `Pulse`

원칙:
- semantic 구조는 고정
- 모드 전환 시 값만 변경
- 컴포넌트 구조/variant는 변경하지 않음

## Typography / Effect Mapping
- typography -> Text styles (Body/Label/Heading scale)
- shadow -> Effect styles (Elevation levels)
- spacing/radius -> Variables로 관리, Auto Layout에 연결

## Naming Rule
- dot 기반 이름 유지: `action.primaryHover`, `text.secondary`
- Figma variable path도 동일하게 맞춤
- 약어보다 의미 중심 이름 우선
