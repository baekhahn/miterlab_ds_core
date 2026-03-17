# Contribution Workflow

간단한 제안-반영 흐름입니다.

## Standard Flow
1. Proposal: 변경 목적/영향 범위를 3~5줄로 작성
2. Spec: `packages/ui-core/specs` 먼저 수정
3. Token: 필요 시 `packages/tokens` 수정
4. Theme: 필요 시 `packages/themes` 매핑 수정
5. Docs: `apps/docs`/`docs` 반영
6. Figma: 변수/스타일/컴포넌트 동기화

## No-Direct-Change Rule
아래는 단독 변경하지 않습니다.
- 스펙 없는 컴포넌트 구현
- 문서 없는 토큰 구조 변경
- semantic 변경 후 Figma 미반영

## PR Checklist (Light)
- 어떤 문제를 해결하는지 명확한가?
- semantic 중심 규칙을 지켰는가?
- 스펙/문서/Figma 반영이 완료되었는가?
- 프로젝트 테마 영향 범위를 확인했는가?
