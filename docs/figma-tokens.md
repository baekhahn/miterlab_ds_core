# Figma Token Mapping

토큰 타입별 Figma 매핑 기준입니다.

## Color
- foundation color -> Foundation Color variables
- semantic color -> Semantic Color variables + Color styles
- brand color -> Brand mode values
- theme color -> Theme mode values

## Typography
- foundation typography scale -> Foundation number/string variables
- text styles는 semantic 목적 기준으로 생성
  - 예: `text/body/sm`, `text/body/md`, `text/heading/md`

## Spacing
- foundation spacing -> Foundation number variables
- Auto Layout 패딩/간격은 spacing 변수로 연결

## Radius
- foundation radius -> Foundation number variables
- 컴포넌트 코너는 semantic/component rule을 통해 적용

## Shadow
- foundation shadow -> Effect styles
- 필요 시 semantic surface rule에 연결

## Mapping Principle
1. Foundation은 primitive 저장소
2. Semantic은 컴포넌트 소비 레이어
3. Brand/Theme는 mode 전환 레이어
4. 컴포넌트에서 foundation/brand 직접 참조 금지
