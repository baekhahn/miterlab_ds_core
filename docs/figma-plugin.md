# Figma Plugin

`apps/figma-plugin`은 bridge payload를 받아 현재 Figma 페이지에 노드를 생성합니다.

## Scope (v1)
- Frame 생성
- Text 생성
- Rectangle 기반 컨테이너 생성
- 계층(children) 기반 기본 그룹 구성
- 로그인 화면 같은 구조형 화면 생성

## Write Path
1. plugin UI에서 bridge URL, screen, theme 입력
2. bridge `/generate-screen` 호출
3. payload 파싱
4. `renderPayload`로 노드 생성

## Key Files
- `apps/figma-plugin/src/code.ts`
- `apps/figma-plugin/src/api/fetchPayload.ts`
- `apps/figma-plugin/src/write/renderPayload.ts`
