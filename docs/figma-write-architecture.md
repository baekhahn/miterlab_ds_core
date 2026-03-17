# Figma Write Architecture

Miterlab DS의 실제 쓰기 경로는 MCP read-only 경로와 분리됩니다.

## Flow
1. Design prompt 입력
2. DS generator(`packages/figma-generator`)가 layout/payload 생성
3. `apps/figma-bridge`가 payload를 HTTP로 제공
4. `apps/figma-plugin`이 payload를 받아 Figma 문서에 노드 생성

## Responsibility Split
- Generator: 디자인 시스템 기반 구조/토큰/스펙 해석
- Bridge backend: 요청 수신, 생성 파이프라인 호출, payload 응답
- Plugin: Figma Plugin API로 실제 노드 생성(write)

## Why Plugin Is Required
현재 Desktop MCP는 read-only 도구 중심이며, 문서에 노드를 생성하는 확정 write API는 보이지 않습니다.
따라서 실제 생성은 Plugin API가 담당해야 합니다.
