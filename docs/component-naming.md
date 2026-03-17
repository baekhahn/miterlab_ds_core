# Component Naming Rules

실제 Figma 라이브러리 제작 시 사용하는 컴포넌트 네이밍 규칙입니다.

## Allowed Formats
다음 중 하나를 선택해 파일 전체에서 통일합니다.

1. Slash format
- `ComponentName`
- `ComponentName / Variant`
- `ComponentName / Variant / Size`
- `ComponentName / Variant / Size / State`

예시:
- `Button / primary / md / default`
- `Button / primary / md / hover`

2. Property format (권장)
- `ComponentName`
- `variant=primary, size=md, state=default`
- `variant=primary, size=md, state=hover`

## Rules
- 컴포넌트명은 spec 이름과 동일하게 유지
- 상태명/사이즈명은 소문자 고정
- 같은 의미의 별칭 금지 (`pressed`와 `active` 혼용 금지)
