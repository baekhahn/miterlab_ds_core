# MCP JSON-RPC Flow

Miterlab figma-generator의 MCP 실행은 JSON-RPC 세션 프로토콜을 따릅니다.

## Why Previous Flow Failed
기존 방식은 `McpExecutionRequest`를 HTTP body로 직접 전송했습니다.
하지만 Figma Desktop MCP는 아래 순서를 요구합니다.

1. `initialize`
2. `tools/list`
3. `tools/call`

또한 `mcp-session-id`를 요청 헤더로 유지해야 합니다.

## Current Protocol Flow
1. prompt -> layout -> figma JSON -> MCP payload 생성
2. MCP session initialize
3. tools/list로 capability discovery
4. 서버 모드 분기
   - readOnly: metadata/context/screenshot 같은 도구만 호출
   - writable 가능: 향후 create/update 도구로 매핑

## Separation
- payload generation: 내부 DS 책임
- MCP execution: 외부 adapter 책임
