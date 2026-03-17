# MCP Capability Discovery

`tools/list` 결과를 기반으로 서버 capability를 분류합니다.

## Modes
- `readOnly`: 생성/수정 도구 없음
- `partiallyWritable`: 읽기 + 일부 쓰기 도구 존재
- `writable`: 쓰기 중심 도구 다수 존재

## Tool Categories
- context
- screenshot
- metadata
- selection
- create
- update
- component
- variable
- style
- unknown

## Artifacts
실행 시 아래 파일이 생성됩니다.
- `artifacts/mcp/tools-list.json`
- `artifacts/mcp/capabilities.json`

이 결과로 실제 write 가능 여부를 명확히 판단합니다.
