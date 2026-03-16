# Figma Library Structure

실제 라이브러리 파일 구성 제안입니다.

## Page Structure
1. `00 Tokens`
2. `01 Styles`
3. `02 Components`
4. `03 Patterns`
5. `04 Examples`

## Page Details

### 00 Tokens
- Foundation / Semantic / Brand / Theme 변수 컬렉션 배치
- mode 전환 확인 영역 포함

### 01 Styles
- semantic color styles
- text styles
- effect styles(shadow)

### 02 Components
- Button, Input, FilterButton, Tabs, Modal
- property: variant/size/state(+selected)

### 03 Patterns
- 실무 조합 패턴
- 컴포넌트 조합 규칙 검증

### 04 Examples
- 프로젝트별 샘플 화면
- mode 전환 프리뷰

## Naming Rule
- 페이지 번호 접두어 고정
- 컴포넌트 set 이름은 spec와 동일
- variant/property 이름도 spec와 동일
