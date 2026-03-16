# Spec to Figma Mapping

`packages/ui-core/specs/*.spec.yaml`을 Figma로 옮기는 기준입니다.

## Mapping
- spec `variant` -> Figma variant property `variant`
- spec `size` -> Figma variant property `size`
- spec `state` -> Figma variant property `state`
- spec `selected` -> Figma variant property `selected`
- spec `semanticMapping` -> 레이어별 변수/스타일 연결표

## Rules
- spec이 source of truth
- Figma 변경은 spec 반영 후 수행
- semantic 키 변경 시 spec과 Figma를 동시에 갱신

## Checklist
1. spec 축(variant/size/state) 확인
2. semanticMapping 키 확인
3. Figma variant property 생성
4. semantic 변수 연결
5. 상태별 시각 차이 검수
