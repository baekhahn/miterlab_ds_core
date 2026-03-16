# Local Generation Testing

로컬에서 prompt-to-Figma payload 생성을 테스트하는 방법입니다.

## Input Prompt Files
- `packages/figma-generator/src/examples/prompts/login.prompt.json`
- `packages/figma-generator/src/examples/prompts/settings.prompt.json`
- `packages/figma-generator/src/examples/prompts/dashboard.prompt.json`
- `packages/figma-generator/src/examples/prompts/filter-list.prompt.json`

## Commands
루트 기준:
- `npm run generate:login`
- `npm run generate:settings`
- `npm run generate:dashboard`
- `npm run generate:filter-list`
- `MCP_ENDPOINT=<endpoint> npm run execute:login`
- `MCP_ENDPOINT=<endpoint> npm run mcp:probe:readonly`
- `MCP_ENDPOINT=<endpoint> npm run mcp:probe:writable`

패키지 기준:
- `npm run generate:login -w @miterlab/figma-generator`
- `MCP_ENDPOINT=<endpoint> npm run execute:login -w @miterlab/figma-generator`

선택 인증:
- `MCP_TOKEN=<token>`

## What Runner Does
1. prompt 파일 로드
2. prompt 문법 검증
3. layout 생성
4. figma-generator JSON 생성
5. MCP payload 생성
6. payload/화면 평가 실행
7. `artifacts/figma/<screen>/`에 JSON 저장
8. 터미널 요약 출력
9. (`execute:*` 사용 시) MCP 엔드포인트로 실행 요청 전송

## Output Path
기본 출력 경로:
- `artifacts/figma/<screen>/`
