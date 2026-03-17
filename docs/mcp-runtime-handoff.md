# MCP Runtime Handoff

내부 DS 제너레이터와 향후 MCP 런타임 사이의 연결 방식입니다.

## Internal Flow
1. `DesignPrompt` 입력
2. `fromDesignPrompt` -> `LayoutNode`
3. `buildLayout` -> `FigmaNode` 트리
4. `exportFigmaJson` -> 내부 표준 JSON
5. `mapToMcpPayload` -> MCP payload
6. `McpExecutionRequest` 생성
7. 실행 클라이언트 호출 (현재는 `mockMcpClient`)

## Plug-in Point for Real MCP
추후 실제 연동 시 교체되는 부분:
- `mockMcpClient.execute()`

유지되는 부분:
- spec 기반 component 매핑
- semantic 토큰 참조
- MCP payload 포맷
- execution contract 타입

## Why This Split
- DS/generator 로직은 안정적으로 유지
- 런타임 네트워크/인증 계층만 독립적으로 교체 가능
- Talk to Figma, MCP 서버, Figma API 브리지에 동일 payload 재사용 가능
