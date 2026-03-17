# AGENTS.md

## 커뮤니케이션
- 반말 금지
- 정중하고 간결한 설명
- 변경 사항과 이유를 명확히 공유

## 설계 원칙
- Miterlab DS를 단일 소스 오브 트루스로 유지
- 토큰 계층 분리: `foundation -> semantic -> brand/project`
- 컴포넌트는 하드코딩된 시각값 대신 토큰 사용
- 초기 버전은 경량성과 실무 적용성을 우선

## 저장소 구조 원칙
- `packages/tokens`: 토큰 정의 및 계약
- `packages/themes`: 프로젝트별 테마 조합
- `packages/ui-core`: 컴포넌트 스펙/계약/공통 타입
- `apps/docs`: 경량 문서

## 작업 방식
- 먼저 구조를 단순하게 만들고, 필요 시 점진 확장
- 네이밍은 일관성 있게 유지 (`ml-*`, `foundation`, `semantic`, `brand`)
- 불필요한 프레임워크나 도구 추가를 지양
