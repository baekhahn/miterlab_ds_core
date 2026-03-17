# Design Prompt Format

Figma 생성 요청의 입력 포맷입니다.

## Example
```json
{
  "screen": "login",
  "theme": "core",
  "components": [
    { "type": "text", "role": "title", "label": "Welcome Back" },
    { "type": "input", "name": "email" },
    { "type": "input", "name": "password" },
    { "type": "button", "variant": "primary", "label": "Sign in" }
  ]
}
```

## Fields
- `screen`: 화면 이름
- `theme`: `alpha | pulse | projectA` 등 프로젝트 테마 키
- `components`: 화면에 배치할 컴포넌트 목록

컴포넌트 필드:
- `type`: `text | input | button | filter-button`
- `name`: 노드 이름(선택)
- `role`: 텍스트 역할(선택)
- `label`: 버튼/텍스트 내용(선택)
- `variant`, `size`, `state`, `selected`: spec 축 값(선택)

## Rule
- translator는 deterministic 규칙으로만 동작
- 자유 텍스트 해석 AI가 아니라 구조화 변환기 역할만 수행
- spec에 없는 축은 무시하거나 기본값 처리
