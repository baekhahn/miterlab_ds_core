# Miterlab Core Design System

Miterlab 제품군을 위한 경량 코어 디자인 시스템 저장소입니다.

## 목표
- 여러 프로젝트에서 공유 가능한 토큰/테마 기반
- 실무형 웹/SaaS 인터페이스에 맞는 단순하고 확장 가능한 구조
- 디자이너와 개발자가 함께 이해하기 쉬운 문서화

## 아키텍처
1. Foundation tokens
2. Semantic tokens
3. Project brand tokens
4. Project theme
5. Application UI

## 패키지 구조
- `apps/docs`: 경량 문서
- `apps/figma-bridge`: Fly 배포 대상 브리지 백엔드
- `apps/figma-plugin`: 실제 Figma write 플러그인
- `packages/tokens`: foundation/semantic/brand 토큰
- `packages/themes`: 프로젝트별 테마 조합
- `packages/ui-core`: 컴포넌트 택소노미와 스펙
- `packages/figma-generator`: prompt/layout/payload 생성 파이프라인
- `shared/contracts`: backend-plugin 공용 payload 계약

## 시작
```bash
npm install
npm run typecheck
npm run build
```

## 설계 원칙 요약
- 브랜드 독립적인 컴포넌트 계약
- semantic 토큰 중심 연결
- 과도한 variant 확장 지양
- Figma 매핑이 쉬운 명명 규칙 유지

## Figma 준비 문서
- `docs/figma-mapping.md`
- `docs/figma-variables.md`
- `docs/figma-tokens.md`
- `docs/figma-components.md`
- `docs/figma-variants.md`
- `docs/figma-structure.md`
- `docs/figma-theme.md`
- `docs/figma-mcp-flow.md`
- `docs/design-prompt-format.md`

## 운영 문서
- `docs/governance.md`
- `docs/change-rules.md`
- `docs/contribution.md`
- `docs/versioning.md`
- `docs/project-theme.md`
- `docs/mcp-execution-contract.md`
- `docs/mcp-runtime-handoff.md`
- `docs/prompt-screen-scope.md`
- `docs/local-generation-testing.md`
- `docs/payload-output-format.md`
- `docs/mcp-jsonrpc-flow.md`
- `docs/mcp-capabilities.md`
- `docs/read-only-figma-mcp.md`
- `docs/figma-write-architecture.md`
- `docs/fly-bridge.md`
- `docs/figma-plugin.md`
- `docs/local-plugin-testing.md`
- `docs/payload-contract.md`

## 디자인 생산 문서
- `docs/component-naming.md`
- `docs/component-variants.md`
- `docs/component-structure.md`
- `docs/component-groups.md`
- `docs/size-scale.md`
- `docs/state-rules.md`
- `docs/spec-to-figma.md`
- `docs/design-workflow.md`
- `docs/design-prompt-grammar.md`
- `docs/layout-grammar.md`
- `docs/screen-patterns.md`
- `docs/generation-rules.md`
- `docs/screen-evaluation.md`
- `docs/qa-rules.md`
- `docs/fix-suggestions.md`
