# @miterlab/ui-core

Miterlab Core DS 컴포넌트 스펙 레이어입니다.

## Spec Format (v1)
모든 스펙은 `packages/ui-core/specs/*.spec.yaml`에 저장합니다.

필수 필드:
- `component`
- `status`
- `purpose`
- `model.axes`
- `variants` 또는 `selected` 같은 핵심 축
- `sizes`
- `states`
- `slots`
- `semanticMapping`

규칙:
- 컴포넌트는 semantic 토큰만 사용합니다.
- brand/foundation 토큰을 컴포넌트에서 직접 참조하지 않습니다.
- v1 축은 최소 유지합니다. (variant/size/state 중심)
- Figma와 React에서 동일 이름으로 매핑 가능해야 합니다.
