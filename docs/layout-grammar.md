# Layout Grammar

프롬프트를 실제 레이아웃 구조로 변환하는 문법입니다.

## Supported Layout Primitives
- frame
- stack
- row
- column
- section
- card
- form-group
- action-area
- list-block
- filter-area
- detail-block

## Deterministic Conversion
1. prompt 검증
2. screen pattern 선택
3. section 순서 결정
4. component placement rule 적용
5. density 기반 간격 적용
6. 최종 LayoutNode 생성

## Result
항상 같은 입력은 같은 레이아웃 구조를 생성합니다.
