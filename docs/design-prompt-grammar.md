# Design Prompt Grammar

안정적인 화면 생성을 위한 구조화 프롬프트 규칙입니다.

## Core Fields
- `screen`: 화면 유형 (`login`, `settings`, `list`, `dashboard`, ...)
- `purpose`: 화면 목적
- `theme`: 프로젝트 테마 (`alpha`, `pulse`, `projectA`)
- `density`: `comfortable | compact`
- `sections`: 섹션 힌트
- `primaryAction`, `secondaryAction`
- `dataComplexity`: `low | medium | high`
- `state`: `empty | loading | filled | error`
- `components`: 구조화된 컴포넌트 목록

## Component Grammar
각 컴포넌트는 아래 필드를 가질 수 있습니다.
- `type`: `text | input | button | filter-button`
- `intent`: 역할 기반 의미 (`title`, `primary-action`, `email-input` 등)
- `section`: 강제 배치 섹션(선택)
- `variant`, `size`, `state`, `selected`

## Why
- "make a login screen" 같은 모호한 입력 대신
- 디자인 시스템 기준으로 예측 가능한 생성 결과를 보장합니다.
