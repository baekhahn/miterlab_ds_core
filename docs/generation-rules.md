# Generation Rules

안정적인 prompt-to-screen 생성을 위한 운영 규칙입니다.

## Placement Rules
- title -> header
- primary action -> action 영역(또는 폼 하단)
- filter button -> filter 영역
- helper text -> footer 또는 입력 하단

## Spacing and Hierarchy
- density에 따라 section/component gap 결정
- spacing 값은 foundation spacing 토큰 기반으로 해석
- header는 body보다 우선 순위가 높고 간격 규칙이 다름

## Token Rules
- 컴포넌트 생성 시 semantic만 사용
- foundation/brand 직접 사용 금지

## Scope Rules
- deterministic 규칙 기반 변환만 지원
- 오픈엔디드 AI 추론/시각 추정은 범위 밖
