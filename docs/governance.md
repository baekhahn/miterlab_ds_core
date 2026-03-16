# Design System Governance

Miterlab Core DS 운영 원칙입니다. 목표는 통제보다 "일관성 + 속도"입니다.

## Scope
- 토큰: `packages/tokens`
- 테마: `packages/themes`
- 컴포넌트 스펙: `packages/ui-core/specs`
- 문서: `apps/docs`, `docs`
- Figma 매핑: `docs/figma-*.md`

## Operating Principles
1. Semantic-first: 컴포넌트는 semantic 토큰만 사용
2. Spec-first: 스펙 없는 컴포넌트 구현 금지
3. Lightweight: 최소 규칙으로 운영
4. Multi-project: 브랜드는 프로젝트 단에서 변경

## Decision Order
1. 문제 정의
2. 스펙 변경 필요 여부 확인
3. 토큰 변경 필요 여부 확인
4. 문서/Figma 동기화
5. 구현 반영

## Ownership (Lightweight)
- DS maintainer: 토큰/스펙 일관성 검토
- Product designer/developer: 요구사항 제안 및 적용
- 최종 기준 문서: 이 저장소

## Ready Criteria
변경은 아래가 충족되면 완료로 봅니다.
- 관련 스펙/문서 업데이트 완료
- semantic 키 일관성 유지
- 프로젝트 테마 영향 범위 확인 완료
