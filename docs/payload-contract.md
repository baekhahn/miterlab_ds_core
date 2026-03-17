# Payload Contract

Backend와 Plugin 사이의 계약은 아래 타입을 기준으로 합니다.

- `shared/contracts/figmaWritePayload.ts`

## Core Fields
- `document`: screen/theme 메타데이터
- `nodes`: 생성 대상 노드(계층 포함)
- `frames`: frame 요약
- `components`: 컴포넌트 요약
- `variables/styles`: 토큰/스타일 참조
- `modes`: brand/theme 모드 정보
- `metadata`: 생성 정보

## Contract Rule
- Backend는 contract를 만족하는 payload만 반환
- Plugin은 contract를 기준으로만 렌더링
- 계약 변경 시 docs + backend + plugin을 함께 업데이트
