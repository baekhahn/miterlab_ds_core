# @miterlab/themes

프로젝트 브랜드 토큰을 코어 semantic 토큰에 연결하는 패키지입니다.

## How Mapping Works
1. `@miterlab/tokens`의 foundation + semantic reference를 가져옵니다.
2. 프로젝트별 `brand.primary/secondary/accent`를 주입합니다.
3. `resolved.semantic`을 생성해 앱에서 즉시 사용 가능한 값으로 제공합니다.

## Example
`alpha` 프로젝트에서:
- `action.primary` -> `alpha.brand.primary`
- `action.primaryHover` -> `alpha.brand.primaryHover`
- `action.primaryPressed` -> `alpha.brand.primaryPressed`
- `focus.ring` -> `alpha.brand.accent`

## Principle
- semantic 키 구조는 공통으로 유지
- 프로젝트 차이는 brand 값으로만 제어
