# Fly Bridge

`apps/figma-bridge`는 Fly에 배포 가능한 경량 백엔드입니다.

## Endpoints
- `GET /health`
- `POST /generate-screen`
- `POST /generate-from-prompt`

## Local Run
```bash
npm run bridge:dev
```
기본 URL: `http://localhost:8787`

## Fly Prep
- 배포 설정 파일: `fly.toml`
- 포트: `PORT` (기본 `8080`)
- 기본 테마: `BRIDGE_DEFAULT_THEME` (기본 `alpha`)

## Debug Artifacts
브리지 호출 결과는 아래에 저장됩니다.
- `artifacts/bridge/last-generate-screen.json`
- `artifacts/bridge/last-generate-from-prompt.json`
