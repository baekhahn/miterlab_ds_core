---
title: Input
---

# Input

## Purpose

텍스트 입력과 폼 데이터 수집을 담당하는 core text entry family입니다.

## Implementation Priority

- 이 페이지는 설명 문서가 아니라 구현 계약 문서입니다.
- 구현은 spec보다 앞설 수 없고, generator와 plugin은 아래 계약을 그대로 따라야 합니다.
- reference baseline은 배경 정보입니다. 실제 구현 입력은 이 페이지의 계약 표와 규칙만 사용하면 됩니다.

## Public Props Contract

### Input

| Axis / prop | Type | Allowed values | Notes |
| --- | --- | --- | --- |
| `maxLength` | `number` | TODO | General prop contract. |
| `minLength` | `number` | TODO | General prop contract. |
| `autoComplete` | `string` | TODO | General prop contract. |
| `autoFocus` | `boolean` | `false`, `true` | General prop contract. |
| `pattern` | `string` | TODO | General prop contract. |
| `inputMode` | `string` | TODO | General prop contract. |
| `type` | `string` | TODO | General prop contract. |
| `name` | `string` | TODO | General prop contract. |
| `onFocus` | `function` | TODO | General prop contract. |
| `onBlur` | `function` | TODO | General prop contract. |
| `onPaste` | `function` | TODO | General prop contract. |
| `autoCapitalize` | `string` | TODO | General prop contract. |
| `autoCorrect` | `string` | TODO | General prop contract. |
| `onKeyDown` | `function` | TODO | General prop contract. |
| `onKeyUp` | `function` | TODO | General prop contract. |
| `onCompositionStart` | `function` | TODO | General prop contract. |
| `onCompositionEnd` | `function` | TODO | General prop contract. |
| `onClick` | `function` | TODO | General prop contract. |
| `step` | `number` | TODO | General prop contract. |
| `id` | `string` | TODO | General prop contract. |
| `placeholder` | `string` | TODO | General prop contract. |
| `readOnly` | `boolean` | `false`, `true` | General prop contract. |
| `disabled` | `boolean` | `false`, `true` | General prop contract. |
| `enterKeyHint` | `string` | TODO | General prop contract. |
| `value` | `string` | TODO | General prop contract. |
| `defaultValue` | `string` | TODO | General prop contract. |
| `onChange` | `function` | TODO | General prop contract. |
| `clearable` | `boolean` | `false`, `true` | General prop contract. |
| `clearIcon` | `reactNode` | TODO | General prop contract. |
| `onlyShowClearWhenFocus` | `boolean` | `false`, `true` | Visibility of the clear affordance is gated by focus. |
| `onClear` | `function` | TODO | General prop contract. |
| `onEnterPress` | `function` | TODO | General prop contract. |
| `min` | `number` | TODO | General prop contract. |
| `max` | `number` | TODO | General prop contract. |
| `role` | `string` | TODO | General prop contract. |
| `className` | `string` | TODO | General prop contract. |
| `style` | `object` | TODO | General prop contract. |
| `tabIndex` | `number` | TODO | General prop contract. |
| `--font-size` | `string` | TODO | Official CSS variable contract. |
| `--color` | `string` | TODO | Official CSS variable contract. |
| `--placeholder-color` | `string` | TODO | Official CSS variable contract. |
| `--text-align` | `string` | TODO | Official CSS variable contract. |

## State Contract

### Input

| State | Expectation |
| --- | --- |
| `default` | 기본 텍스트 입력 상태이며 label, field, helper의 관계가 가장 자연스럽게 보여야 합니다. |
| `focus` | 사용자가 현재 입력 중인 필드로 읽혀야 하며 blue focus treatment가 분명해야 합니다. |
| `disabled` | 사용 불가 상태로 읽혀야 하며 정보는 남겨두되 interaction affordance는 제거해야 합니다. |
| `readOnly` | 값은 보여주되 수정 중인 필드처럼 보이지 않아야 합니다. |
| `clearable` | `clearable=true`일 때 clear affordance가 실제 편집 가능 상태와 함께 읽혀야 합니다. |
| `placeholder` | `value`와 `defaultValue`가 없을 때만 placeholder가 보여야 합니다. |

## Field Metrics Contract

### Input

| Field tier | Width guidance | Usage |
| --- | --- | --- |
| `default` | single-line field | 기본 텍스트 입력 필드입니다. |
| `short` | 75px | 짧은 코드, 숫자, 약어 입력에 사용합니다. |
| `medium` | 150px~250px | 이름, 태그, 짧은 라벨 입력에 사용합니다. |
| `long` | 350px~500px | 이메일, 주소, 긴 텍스트 입력에 사용합니다. |
| `full-width` | container width | 폼 레이아웃이 전폭 필드를 요구할 때만 사용합니다. |

## Token Contract

### Input

| Token | Kind | Usage |
| --- | --- | --- |
| `field.background` | token | 기본 입력 표면입니다. |
| `field.border.default` | token | 기본 field 경계입니다. |
| `field.border.focused` | token | focus 상태에서 분명히 읽히는 blue treatment입니다. |
| `field.border.invalid` | token | error 또는 invalid 상태의 경계입니다. |
| `field.text.default` | token | 입력값 본문 텍스트에 사용합니다. |
| `field.text.placeholder` | token | placeholder에 사용하며 본문보다 한 단계 낮게 읽혀야 합니다. |
| `field.text.helper` | token | helper text에 사용합니다. |
| `field.text.error` | token | error message와 invalid helper에 사용합니다. |
| `field.text.disabled` | token | disabled field 텍스트에 사용합니다. |
| `field.surface.disabled` | token | disabled field 배경에 사용합니다. |
| `field.icon.clear` | token | clear affordance icon에 사용합니다. |

## Form Composition Contract

### Label and field

- label은 왼쪽 정렬하고 field는 그 아래에 두는 구성을 기본으로 봅니다.
- placeholder도 sentence case와 왼쪽 정렬을 기본으로 봅니다.
- required field는 label에 `*`를 붙여 드러냅니다.

### Field lengths

- field 길이는 예상 입력 길이를 반영해야 합니다.
- 기본 길이 단계는 `75px`, `150px`, `250px`, `350px`, `500px`입니다.
- 모든 field를 한 가지 폭으로만 늘어놓지 않고, 입력 의도에 맞는 길이를 선택합니다.

### Help and validation

- helper text와 error text는 field 아래에서 읽혀야 합니다.
- unfocused field도 error 상태를 명확히 드러낼 수 있어야 합니다.
- focus 중에는 error와 구분되는 blue focus treatment가 보여야 합니다.

## Interaction Rules

- placeholder는 `value`와 `defaultValue`가 모두 없을 때만 보입니다.
- focus는 별도 공개 prop이 아니라 runtime state로 취급합니다.
- `clearable=true`는 clear affordance를 활성화합니다.
- `onlyShowClearWhenFocus=true`는 focus 중일 때만 clear affordance를 보여줍니다.
- `readOnly=true`는 value는 유지하고 수정 affordance만 제거합니다.
- `disabled=true`는 interaction을 막고 muted treatment를 사용합니다.

## Non-Public Fields

- `status`는 frozen Input 공개 계약에 포함되지 않습니다.
- `size`, `prefix`, `suffix`도 현재 공개 계약에 포함되지 않습니다.
- runtime에서 필요하더라도 공개 prop으로 승격하려면 spec 변경이 먼저 필요합니다.

## Render Rules

- label은 왼쪽 정렬, field는 그 아래 배치되는 폼 구조를 기본으로 봅니다.
- field width는 입력될 내용 길이를 반영해야 하며, 동일한 화면 안에서 과도하게 넓거나 좁지 않아야 합니다.
- focus 상태에서는 blue focus treatment가 분명히 보여야 합니다.
- error는 field 아래 메시지와 함께 읽혀야 하며, unfocused field에서도 오류 상태가 드러나야 합니다.
- `readOnly=true`는 값을 유지한 채 편집 affordance만 제거해야 합니다.
- `disabled=true`는 사용할 수 없는 필드로 읽혀야 합니다.

## Forbidden Changes

- field 길이가 입력 내용과 무관하게 전부 같은 폭으로만 보임.
- label, helper, error가 field와 분리되지 않고 한 덩어리처럼 보임.
- focus와 error가 같은 색 처리로 섞임.
- disabled와 readOnly가 하나의 시각 상태로 합쳐짐.
- `type=number|password`가 mapping 과정에서 사라짐.

## Verification Checklist

- `placeholder`, `value`, `defaultValue`가 서로 다른 render path를 유지하는지 확인합니다.
- `disabled`, `readOnly`, `clearable`, `onlyShowClearWhenFocus`가 payload와 render에서 모두 유지되는지 확인합니다.
- `type`, `min`, `max`, `step`이 mapping 과정에서 사라지지 않는지 확인합니다.
- field 길이, 배치, focus treatment가 계약과 일치하는지 확인합니다.
- token path가 documented contract를 따르는지 확인합니다.

## Reference Notes

- Reference baseline: Atlassian Design System `Text field` and `Forms`
- Spec files: `packages/ui-core/specs/input.spec.yaml`
- `allowClear`는 현재 공개 Input 계약 밖의 항목이며, frozen contract는 `clearable`을 사용합니다.
- `size`, `status`, `prefix`, `suffix`는 현재 공개 Input 계약 밖의 항목입니다.
- `className`, `style`, `tabIndex`, `aria-*`, `data-*`는 `NativeProps`를 통해 지원됩니다.
