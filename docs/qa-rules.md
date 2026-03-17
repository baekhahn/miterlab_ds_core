# QA Rules

## Scoring
- 기본 점수: 100
- error 1건당 큰 감점
- warning 1건당 작은 감점

## Errors vs Warnings
- Error: DS 규칙 위반 또는 구조 파손
  - 예: 필수 섹션 누락, invalid state, direct foundation token binding
- Warning: 품질 저하 가능성, 개선 필요
  - 예: spacing 과밀, 이름 규칙 미준수, 비표준 size

## Deterministic QA
- 같은 입력은 같은 평가 결과를 반환
- 임의성/ML 추론 없이 규칙 기반으로만 평가
