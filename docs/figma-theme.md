# Figma Theme and Brand Modes

프로젝트별 테마를 Figma mode로 운영하는 규칙입니다.

## Modes
- Default
- Alpha
- ProjectA

## What Changes by Mode
- Brand 변수 값
  - `brand.primary`
  - `brand.primaryHover`
  - `brand.primaryPressed`
  - `brand.secondary`
  - `brand.accent`
- Theme resolved 값

## What Stays Stable
- semantic 변수 키
- 컴포넌트 variant/size/state 구조
- 컴포넌트 레이아웃

## Operation Flow
1. Brand mode 값 업데이트
2. Theme mode 값 확인
3. Components 페이지에서 mode 전환 테스트
4. spec 문서와 일치 여부 확인

## Rule
- 프로젝트 확장은 brand/theme mode만 추가
- semantic 구조 변경 없이 운영
