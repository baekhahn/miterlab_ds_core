# Themes

프로젝트 테마는 공통 semantic 구조를 유지하면서 브랜드 값만 바꿉니다.

## 연결 흐름
1. foundation tokens
2. semantic reference tokens
3. project brand tokens
4. resolved semantic tokens

## 예시 매핑
- `action.primary` = `brand.primary`
- `action.primaryHover` = `brand.primaryHover`
- `action.primaryPressed` = `brand.primaryPressed`
- `focus.ring` = `brand.accent`

이 방식으로 컴포넌트 API를 변경하지 않고 프로젝트별 스타일을 적용할 수 있습니다.
