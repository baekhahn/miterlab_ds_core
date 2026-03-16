# Figma Variables Guide

Miterlab DS를 Figma 라이브러리로 구축할 때 사용하는 변수 컬렉션 규칙입니다.

## Variable Collections
1. Foundation
2. Semantic
3. Brand
4. Theme

## Collection Roles

### Foundation
- raw token 값 저장
- 예: palette, spacing, radius, shadow, typography scale
- 컴포넌트에서 직접 사용하지 않음

### Semantic
- 컴포넌트가 실제로 사용하는 의미 레이어
- 예: `background.default`, `action.primary`, `text.primary`
- 컴포넌트는 이 컬렉션만 참조

### Brand
- 프로젝트별 브랜드 오버라이드 값
- 예: `brand.primary`, `brand.primaryHover`, `brand.primaryPressed`, `brand.secondary`, `brand.accent`
- mode로 프로젝트를 분리

### Theme
- brand 값을 semantic 소비 구조로 연결한 결과 레이어
- mode 전환 시 semantic 값만 바뀌고 컴포넌트 구조는 유지

## Recommended Modes
- Default
- Alpha
- ProjectA

## Key Rule
- Foundation은 기준값, Semantic은 사용값, Brand/Theme는 프로젝트 전환값입니다.
