# Local Plugin Testing

## 1) Bridge 실행
```bash
npm run bridge:dev
```

## 2) Plugin 빌드
```bash
npm run plugin:build
```

## 3) Figma Desktop에서 플러그인 로드
- Development plugin으로 `apps/figma-plugin/manifest.json` 선택
- 실행 후 Bridge URL(`http://127.0.0.1:8787`) 입력
- `screen=login`, `theme=alpha`로 Generate

## 4) 확인
- 현재 페이지에 생성된 최상위 Frame 이름 확인
- 노드 수/레이어 구조 확인
