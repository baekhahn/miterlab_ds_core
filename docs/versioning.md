# Versioning Rules (Simple SemVer)

복잡한 릴리즈 정책 대신 단순 SemVer를 사용합니다.

## Patch (x.y.Z)
- 토큰 값 미세 조정(키 변경 없음)
- 문서 수정
- 오탈자/설명 개선

## Minor (x.Y.z)
- 새 토큰 추가(하위 호환)
- 새 스펙 추가
- 새 컴포넌트 스펙 추가
- 새 프로젝트 brand/theme 추가

## Major (X.y.z)
- semantic 키 삭제/이름 변경
- 기존 스펙 축/속성의 breaking 변경
- 컴포넌트 소비 계약을 깨는 토큰 구조 변경

## Release Note Minimum
각 릴리즈는 아래만 기록합니다.
- changed: 무엇이 바뀌었는지
- impact: 어떤 팀/컴포넌트에 영향이 있는지
- action: 소비자가 해야 하는 작업
