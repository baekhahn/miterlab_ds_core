# MCP Execution Contract

실제 MCP 실행 계층을 위한 요청/응답 계약입니다.

## Request
타입: `McpExecutionRequest`

필드:
- `documentName`: 생성 대상 문서 이름
- `pageName`: 생성 대상 페이지 이름
- `theme`: 적용 테마 키
- `payload`: `McpPayload`
- `metadata`(optional): 요청 추적 정보

## Response
타입: `McpExecutionResponse`

필드:
- `success`: 실행 성공 여부
- `createdNodeCount`: 생성 노드 수
- `createdComponentCount`: 생성 컴포넌트 수
- `warnings`: 경고 목록
- `executionSummary`: 실행 요약 문자열

## Validation Gate
실행 전 `validateMcpPayload`를 통과해야 합니다.

주요 검증 항목:
- node name 누락
- INSTANCE node의 component 매핑 누락
- semantic variable 참조 누락/비정상
- theme/mode 정보 누락
- FRAME 노드가 없는 잘못된 레이아웃
