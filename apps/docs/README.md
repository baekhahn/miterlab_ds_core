# Miterlab DS Docs App

경량 문서 앱입니다. 목적은 토큰/테마/컴포넌트 스펙을 빠르게 확인하는 것입니다.

## Scope
- Markdown 기반 문서 섹션
- YAML 스펙 기반 컴포넌트 뷰어
- 디자이너/개발자 공용 레퍼런스

## Run
```bash
pnpm --filter @miterlab/docs dev
```

## Structure
- `content/*`: 문서 원본 Markdown
- `src/components/MarkdownPage.tsx`: 문서 렌더러
- `src/components/SpecViewer.tsx`: 컴포넌트 스펙 뷰어
- `src/content/specs.ts`: `packages/ui-core/specs` 연결
