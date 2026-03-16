# @miterlab/tokens

Miterlab Core DS 토큰의 단일 기준 패키지입니다.

## Token Layers
1. foundation: 기본 스케일(팔레트/타이포/간격/반경/그림자/모션/브레이크포인트)
2. semantic: UI 의미 레이어(컴포넌트가 직접 소비)
3. brand: 프로젝트별 브랜드 값

## Folder Structure
```text
src/
  foundation/
    color.ts
    typography.ts
    spacing.ts
    radius.ts
    shadow.ts
    motion.ts
    breakpoint.ts
  semantic/
    background.ts
    surface.ts
    border.ts
    text.ts
    icon.ts
    action.ts
    focus.ts
    status.ts
    index.ts
  brand/
    projects/
      alpha/brand.ts
      pulse/brand.ts
```

## Naming Convention
- foundation: `slate100`, `sm`, `md`, `lg` 같은 짧고 예측 가능한 scale 이름
- semantic: `background.default`, `surface.raised`, `text.primary`, `action.primaryHover`
- brand: `brand.primary`, `brand.primaryHover`, `brand.primaryPressed`, `brand.secondary`, `brand.accent`

## Rules
- 공유 semantic 토큰에 프로젝트 고정값을 직접 넣지 않습니다.
- 컴포넌트는 foundation보다 semantic을 우선 사용합니다.
- brand 값은 theme 단계에서 semantic에 연결합니다.
- alias 체인은 2단계를 넘기지 않습니다.
- role과 state를 분리합니다. (`secondary`는 역할, `primaryHover`는 primary의 상태)

## Action Tokens (v1)
- `action.primary`
- `action.primaryHover`
- `action.primaryPressed`
- `action.neutral`
- `action.neutralHover`
- `action.neutralPressed`
- `action.disabled`
- `action.onPrimary`

## Component Readiness
- Button: `action.*`, `focus.ring`, `text.inverse`
- Input: `surface.default`, `border.default`, `focus.ring`, `status.critical`
- FilterButton: `action.primary`, `surface.subtle`, `text.secondary`
- Tabs: `action.primary`(indicator), `text.primary`, `border.default`
- Modal: `surface.raised`, `text.primary`, `border.default`, `background.inverse`

## Figma Mapping Hint
- foundation: Primitive variables
- semantic: Alias variables
- brand: Project collection variables
