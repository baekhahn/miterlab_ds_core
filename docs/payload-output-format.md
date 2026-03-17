# Payload Output Format

로컬 생성 결과는 아래 파일로 저장됩니다.

## Files
- `layout.json`
- `figma-generator.json`
- `mcp-payload.json`
- `summary.json`

## File Meaning

### layout.json
- prompt translator가 만든 구조화 레이아웃
- section/stack/component 배치 확인용

### figma-generator.json
- 내부 생성 엔진 출력
- 노드/스타일/변수/컴포넌트 정보 포함

### mcp-payload.json
- MCP/Talk to Figma/브리지 연동용 payload
- 실행 계약 레이어 입력 포맷

### summary.json
- 화면/테마/섹션/컴포넌트 수
- 평가 점수 및 경고
- payload 검증 결과

## Handoff Use
이 파일 세트는 향후 아래 연동에서 그대로 사용 가능합니다.
- MCP 서버 호출
- Talk to Figma 브리지
- 내부 플러그인 브리지
