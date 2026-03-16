# Read-Only Figma MCP Mode

현재 연결된 MCP 서버가 read-only일 때의 동작 규칙입니다.

## Behavior
- "화면 생성 성공" 같은 오해 소지가 있는 메시지를 내지 않음
- read-only capability를 명확히 보고
- 가능한 경우 `get_metadata` 등 조회 도구만 실행
- 결과를 요약 artifact로 저장

## Output
- `artifacts/mcp/session.json`
- `artifacts/mcp/tools-list.json`
- `artifacts/mcp/capabilities.json`
- `artifacts/mcp/read-only-summary.json`

## Future Writable Integration
실제 write 도구가 노출되면 아래만 추가하면 됩니다.
- payload -> tool args 매핑
- tools/call 실행 시퀀스
- 실패 롤백/재시도 정책
