# Change Rules

실무에서 자주 발생하는 변경을 단순 규칙으로 정리합니다.

## 1) Token Change Rules

### Foundation
- 매우 드물게 변경
- 변경 시 전역 영향이 크므로 대체로 값 보정만 허용

### Semantic
- 컴포넌트가 소비하는 기본 레이어
- 신규 semantic 추가는 실제 컴포넌트 요구가 있을 때만 허용
- 기존 semantic 이름 변경은 신중하게 처리

### Brand
- 프로젝트별 변경 허용
- role과 state 분리 유지 (`primary` vs `primaryHover`)

### Mandatory Rules
- 컴포넌트에서 foundation 직접 사용 금지
- 컴포넌트에서 brand 직접 사용 금지
- 컴포넌트는 semantic만 사용

## 2) Component/Spec Change Rules
- 구현보다 스펙을 먼저 변경
- 허용 축: `variant`, `size`, `state` (+ 필요한 경우 `selected`)
- `tone/intent/mode/density` 등 확장 축은 기본 금지
- variant 추가는 실제 화면 요구가 2회 이상 반복될 때만 검토

## 3) Theme/Brand Change Rules
- core foundation/semantic 구조는 안정적으로 유지
- 프로젝트별 차이는 brand 값으로 흡수
- theme는 brand -> semantic 매핑만 담당

## 4) Figma Update Rules
- token 변경 -> Figma 변수 업데이트
- semantic 변경 -> Figma semantic style/variable 업데이트
- spec 변경 -> Figma 컴포넌트 variant 업데이트
- 문서 업데이트 없이 Figma만 단독 변경 금지
