# Figma MCP Flow

Miterlab DS에서 MCP/Talk to Figma 연동을 위한 경량 어댑터 흐름입니다.

## 목적
실제 API 호출 없이, MCP가 바로 소비할 수 있는 안정적인 payload를 생성합니다.

## Flow
1. Design Prompt 입력(JSON)
2. `fromDesignPrompt`로 Layout 변환
3. `buildLayout` + component specs로 Figma Node 트리 생성
4. `exportFigmaJson`으로 내부 표준 JSON 생성
5. `mapToMcpPayload`로 MCP-ready payload 변환

## Internal vs MCP
- Internal generator output: 노드/스타일/변수 중심의 DS 내부 포맷
- MCP payload: document/frames/components/modes/metadata가 포함된 외부 연동 포맷

## MCP-ready 의미
- semantic 변수 참조가 유지됨
- component/variant 정보가 유지됨
- theme/brand mode 정보가 포함됨
- 네트워크 호출 없이 직렬화 가능한 JSON으로 제공됨

## Future Integration
향후 Talk to Figma/Figma API 연동 시:
- 현재 payload를 입력으로 사용
- 인증/전송 레이어만 별도 추가
- generator/DS 구조는 그대로 유지
