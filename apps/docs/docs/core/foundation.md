---
title: Foundation
---

# Foundation

## Role

Foundation은 모든 Component, Module, Pattern이 공통으로 참조하는 기반 레이어입니다.

Foundation의 목적은 다음과 같습니다.
- 토큰을 중앙에서 관리하고 모든 계약이 같은 키를 보게 하기
- 공통 상태와 상호작용 규칙을 표준화하기
- 접근성 최소 기준을 시스템 수준에서 고정하기
- 컴포넌트 계약을 단순하게 유지하기

즉 Foundation은 시각값 모음이 아니라, 공통 기준을 고정하는 레이어입니다.

## What Foundation Owns

Foundation이 직접 소유하는 영역은 다음입니다.
- color tokens
- typography tokens
- spacing tokens
- density tokens
- radius tokens
- elevation tokens
- motion tokens
- interaction tokens
- state tokens
- accessibility minimum
- shared utility behavior

## What Foundation Does Not Own

Foundation이 직접 소유하지 않는 영역은 다음입니다.
- 개별 Component 의미
- Module 구조
- Pattern 시나리오
- product-specific copy
- project-specific branding override

## Color Tokens

Color token은 개별 컴포넌트가 직접 색을 들고 있지 않도록 만드는 기본 단위입니다.

최소 구성 권장:
- `primary`
- `secondary`
- `success`
- `warning`
- `danger`
- `neutral`

각 색군은 level을 가질 수 있습니다.

예:
- `primary/50`
- `primary/100`
- `primary/500`
- `primary/700`
- `neutral/50`
- `neutral/900`

규칙:
- Component는 가능한 한 raw hex 대신 token key를 참조합니다.
- 상태 색도 가능한 한 color token 계층에서 유도합니다.
- destructive, success, warning은 의미 색으로 분리합니다.

현재 우선 반영하는 대표 role:
- `label/normal`
- `label/neutral`
- `label/alternative`
- `line/solid/normal`
- `background/normal/normal`
- `background/normal/alternative`
- `interaction/inactive`
- `interaction/disable`
- `status/positive`
- `status/negative`

현재 core는 semantic token 기준으로 light / dark를 함께 보관합니다.

### Current Semantic Colors

아래 컬러칩은 현재 Foundation이 직접 참조하는 대표 semantic 값입니다.

#### Light

| Role | Token | Value |
| --- | --- | --- |
| Primary / Normal | `semantic-primary-normal` | <span className="foundation-chip" style={{ backgroundColor: "#3385FF", borderColor: "#E1E2E4" }} />`#3385FF` |
| Primary / Strong | `semantic-primary-strong` | <span className="foundation-chip" style={{ backgroundColor: "#1A75FF", borderColor: "#E1E2E4" }} />`#1A75FF` |
| Primary / Heavy | `semantic-primary-heavy` | <span className="foundation-chip" style={{ backgroundColor: "#0066FF", borderColor: "#E1E2E4" }} />`#0066FF` |
| Label / Normal | `semantic-label-normal` | <span className="foundation-chip" style={{ backgroundColor: "#171719", borderColor: "#E1E2E4" }} />`#171719` |
| Label / Neutral | `semantic-label-neutral` | <span className="foundation-chip" style={{ backgroundColor: "#2E2F33", borderColor: "#E1E2E4" }} />`#2E2F33E0` |
| Line / Solid / Normal | `semantic-line-solid-normal` | <span className="foundation-chip" style={{ backgroundColor: "#E1E2E4", borderColor: "#D0D4DA" }} />`#E1E2E4` |
| Background / Normal | `semantic-background-normal-normal` | <span className="foundation-chip" style={{ backgroundColor: "#FFFFFF", borderColor: "#E1E2E4" }} />`#FFFFFF` |
| Background / Alternative | `semantic-background-normal-alternative` | <span className="foundation-chip" style={{ backgroundColor: "#F7F7F8", borderColor: "#E1E2E4" }} />`#F7F7F8` |
| Interaction / Disable | `semantic-interaction-disable` | <span className="foundation-chip" style={{ backgroundColor: "#F4F4F5", borderColor: "#E1E2E4" }} />`#F4F4F5` |
| Interaction / Inactive | `semantic-interaction-inactive` | <span className="foundation-chip" style={{ backgroundColor: "#989BA2", borderColor: "#E1E2E4" }} />`#989BA2` |
| Status / Positive | `semantic-status-positive` | <span className="foundation-chip" style={{ backgroundColor: "#00BF40", borderColor: "#E1E2E4" }} />`#00BF40` |
| Status / Cautionary | `semantic-status-cautionary` | <span className="foundation-chip" style={{ backgroundColor: "#FF9200", borderColor: "#E1E2E4" }} />`#FF9200` |
| Status / Negative | `semantic-status-negative` | <span className="foundation-chip" style={{ backgroundColor: "#FF4242", borderColor: "#E1E2E4" }} />`#FF4242` |

#### Dark

| Role | Token | Value |
| --- | --- | --- |
| Primary / Normal | `semantic-primary-normal` | <span className="foundation-chip" style={{ backgroundColor: "#0066FF", borderColor: "#5A5C63" }} />`#0066FF` |
| Primary / Strong | `semantic-primary-strong` | <span className="foundation-chip" style={{ backgroundColor: "#005EEB", borderColor: "#5A5C63" }} />`#005EEB` |
| Primary / Heavy | `semantic-primary-heavy` | <span className="foundation-chip" style={{ backgroundColor: "#0054D1", borderColor: "#5A5C63" }} />`#0054D1` |
| Label / Normal | `semantic-label-normal` | <span className="foundation-chip" style={{ backgroundColor: "#F7F7F8", borderColor: "#5A5C63" }} />`#F7F7F8` |
| Label / Neutral | `semantic-label-neutral` | <span className="foundation-chip" style={{ backgroundColor: "#C2C4C8", borderColor: "#5A5C63" }} />`#C2C4C8E0` |
| Line / Solid / Normal | `semantic-line-solid-normal` | <span className="foundation-chip" style={{ backgroundColor: "#37383C", borderColor: "#5A5C63" }} />`#37383C` |
| Background / Normal | `semantic-background-normal-normal` | <span className="foundation-chip" style={{ backgroundColor: "#1B1C1E", borderColor: "#5A5C63" }} />`#1B1C1E` |
| Background / Alternative | `semantic-background-normal-alternative` | <span className="foundation-chip" style={{ backgroundColor: "#0F0F10", borderColor: "#5A5C63" }} />`#0F0F10` |
| Interaction / Disable | `semantic-interaction-disable` | <span className="foundation-chip" style={{ backgroundColor: "#2E2F33", borderColor: "#5A5C63" }} />`#2E2F33` |
| Interaction / Inactive | `semantic-interaction-inactive` | <span className="foundation-chip" style={{ backgroundColor: "#5A5C63", borderColor: "#5A5C63" }} />`#5A5C63` |
| Status / Positive | `semantic-status-positive` | <span className="foundation-chip" style={{ backgroundColor: "#1ED45A", borderColor: "#5A5C63" }} />`#1ED45A` |
| Status / Cautionary | `semantic-status-cautionary` | <span className="foundation-chip" style={{ backgroundColor: "#FFA938", borderColor: "#5A5C63" }} />`#FFA938` |
| Status / Negative | `semantic-status-negative` | <span className="foundation-chip" style={{ backgroundColor: "#FF6363", borderColor: "#5A5C63" }} />`#FF6363` |

## Typography Tokens

Typography token은 텍스트 역할을 공통 scale로 고정합니다.

권장 구성:
- `fontFamilies`
- `fontSizes`
- `fontWeights`
- `lineHeights`

예:
- `font/body/sm`
- `font/body/md`
- `font/heading/sm`
- `font/heading/lg`

규칙:
- Text, Button, Input label이 서로 다른 타이포 스케일을 임의로 만들지 않습니다.
- heading, body, helper, status의 역할을 토큰 레벨에서 구분합니다.

기본 서체 기준:
- `Pretendard` 계열을 기본으로 사용합니다.

줄바꿈 규칙:
- 한글은 `단어 개행`을 기본 규칙으로 사용합니다.
- 이 규칙은 web과 app 모두 동일하게 적용합니다.
- 영어와 숫자는 의미 단위를 유지한 채 줄바꿈되도록 합니다.
- 디자인 단계에서 수동 줄바꿈을 고정값처럼 다루지 않습니다.

현재 사용하는 typography scale:

| Style | Size | Line Height | Letter Spacing |
| --- | --- | --- | --- |
| `Display 1` | `56` | `72` | `-0.0319em` |
| `Display 2` | `40` | `52` | `-0.0282em` |
| `Display 3` | `36` | `48` | `-0.027em` |
| `Title 1` | `32` | `44` | `-0.0253em` |
| `Title 2` | `28` | `38` | `-0.0236em` |
| `Title 3` | `24` | `32` | `-0.023em` |
| `Heading 1` | `22` | `30` | `-0.0194em` |
| `Heading 2` | `20` | `28` | `-0.012em` |
| `Headline 1` | `18` | `26` | `-0.002em` |
| `Headline 2` | `17` | `26` | `0em` |
| `Body 1 / Normal` | `16` | `24` | `0.0057em` |
| `Body 1 / Reading` | `16` | `26` | `0.0057em` |
| `Body 2 / Normal` | `15` | `22` | `0.0096em` |
| `Body 2 / Reading` | `15` | `24` | `0.0096em` |
| `Label 1 / Normal` | `14` | `20` | `0.0145em` |
| `Label 1 / Reading` | `14` | `22` | `0.0145em` |
| `Label 2` | `13` | `18` | `0.0194em` |
| `Caption 1` | `12` | `16` | `0.0252em` |
| `Caption 2` | `11` | `14` | `0.0311em` |

## Spacing Tokens

Spacing token은 padding, margin, section gap을 표준화합니다.

권장 scale:
- `xs`
- `sm`
- `md`
- `lg`
- `xl`

규칙:
- spacing은 raw number보다 scale key를 우선합니다.
- Module 내부 spacing과 Pattern 간격을 같은 계층으로 섞지 않습니다.
- 기본 spacing 규칙은 `4px` 배수를 우선합니다.
- 시각 보정은 기본적으로 `2px` 단위까지 허용합니다.
- `1px` 조정은 예외 상황에서만 사용합니다.

권장 spacing scale 예시:
- `xs = 4`
- `sm = 8`
- `md = 12`
- `lg = 16`
- `xl = 20`

## Density

Density는 화면의 기본 밀도와 컨트롤 높이 기준을 고정하는 foundation 항목입니다.

현재 기준:
- `base size = md`
- `md control height = 40`
- `sm control height = 32`
- `lg control height = 48`
- `touch target minimum = 44`

운영 규칙:
- Button, Input은 개별 문서에서 높이를 직접 소유하지 않습니다.
- 기본 높이와 폰트 밀도는 Foundation에서 파생합니다.
- `md` 값이 바뀌면 Button, Input, preview, inspection이 함께 바뀌어야 합니다.
- 실질적인 시각 높이와 터치 타깃 최소값은 구분해서 관리합니다.

현재 파생 대상:
- Button height / padding / radius / label size
- Input height / padding / radius / value size
- preview sample density
- Figma inspection render density

## Grid

Grid는 Pattern과 Module의 레이아웃 기준을 고정하는 foundation 항목입니다.

### Artboard

현재 시스템이 우선 참조하는 대표 규격은 아래와 같습니다.

| Environment | Width | Height | Max Width |
| --- | --- | --- | --- |
| `Web desktop` | `1440px` | `960px` | `1100px` |
| `Web mobile` | `375px` | `635px` | - |
| `iOS` | `375pt` | `812pt` | - |
| `Android` | `360dp` | `800dp` | - |

운영 규칙:
- 모든 해상도를 개별 설계 기준으로 삼지 않습니다.
- 대표 아트보드 규격을 기준으로 시스템 레이아웃을 정의합니다.
- app contract에서는 `375pt`와 `360dp`를 우선 기준으로 봅니다.

### Breakpoint

현재 공통 breakpoint 기준은 아래와 같습니다.

| Token | Environment | Width | Max Width |
| --- | --- | --- | --- |
| `xs` | mobile | `0–768px` | - |
| `sm` | tablet portrait | `768–992px` | - |
| `md` | tablet landscape | `992–1200px` | - |
| `lg` | desktop | `1200–1600px` | `1100px` |
| `xl` | large desktop | `1600px+` | `1440px` |

운영 규칙:
- 현재 MADS는 mobile app 기준을 우선합니다.
- 따라서 Pattern contract에서는 `xs` 구간을 기본 기준으로 다룹니다.
- tablet과 desktop breakpoint는 이후 확장 시 사용하되, 현재 mobile contract를 흔들지 않도록 분리합니다.

### Spacing Rule

Grid spacing은 Foundation spacing token과 연결됩니다.

핵심 규칙:
- 기본 간격은 `4px` 배수로 구성합니다.
- 시각 보정은 `2px` 단위까지 허용합니다.
- `1px` 보정은 최종 미세 조정에서만 허용합니다.
- grid spacing과 component padding을 같은 의미로 혼용하지 않습니다.

### Column Layout

현재 레이아웃 기준은 아래와 같습니다.

| Environment | Columns | Column Gap |
| --- | --- | --- |
| `Mobile` | `2` | `20px` |
| `Tablet` | `3` | `20px` |
| `Desktop` | `12` | `20px` |

### Column Merge Rule

- 컬럼은 해상도와 시나리오에 따라 병합해서 사용할 수 있습니다.
- 작은 카드나 보조 정보는 단일 컬럼 기준으로 배치할 수 있습니다.
- 주요 콘텐츠 블록은 병합 컬럼을 사용해 읽기 흐름을 확보할 수 있습니다.
- Pattern은 column count 자체보다 정보 위계와 읽기 흐름을 우선합니다.

운영 규칙:
- mobile app 패턴은 `2-column grid + 20px gap`을 기본으로 사용합니다.
- Module은 grid 위에서 정렬되되, 내부 spacing 규칙과 혼동하지 않습니다.
- sticky area, bottom CTA, system inset 대응은 grid보다 safe area와 touch target을 우선합니다.
- grid는 정렬 기준이고, 상호작용 우선순위를 대신하지 않습니다.

## Radius Tokens

Radius token은 컴포넌트 shell의 라운드 체계를 고정합니다.

현재 공통 radius token:
- `none = 0`
- `sm = 10`
- `md = 10`
- `lg = 12`
- `round = 999`

규칙:
- radius는 데모용 과장보다 제품 밀도에 맞춰야 합니다.
- Button, Input, Chip이 각자 다른 라운드 체계를 임의로 만들지 않습니다.
- Component는 개별 radius 값을 직접 정의하지 않고 Foundation radius token을 참조합니다.

## Current Exceptions

아래 항목은 아직 Foundation token으로 완전히 올라가지 않았습니다.

- contract preview 전용 정적 layout size
  - panel width / height
  - sample card width / height
  - screen mock frame size
- docs shell styling
  - Docusaurus navbar / sidebar chrome size
  - docs-only spacing and border styling
- plugin UI shell styling
  - plugin 내부 패널 간격과 radius
  - inspection selector UI 크기

운영 규칙:
- Component, Module, Pattern의 의미에 영향을 주는 값은 Foundation으로 올립니다.
- preview shell이나 docs chrome처럼 시스템 자체를 설명하기 위한 보조 UI는 예외로 둘 수 있습니다.
- 예외로 남긴 값도 반복 사용되기 시작하면 Foundation token으로 승격합니다.

## Elevation Tokens

모바일에서는 elevation을 최소한으로 사용합니다.

권장 구성:
- `none`
- `low`
- `medium`

규칙:
- 카드 구분이나 sticky surface 같은 실질적 필요에만 사용합니다.
- 화면 전체가 elevation 경쟁 상태가 되면 안 됩니다.

## Size Tokens

Size token은 공통 크기 계층입니다.

권장 구성:
- `mini`
- `small`
- `middle`
- `large`

또는 현재 시스템처럼:
- `sm`
- `md`
- `lg`

Size token은 보통 아래를 함께 결정합니다.
- font size
- line height
- padding
- min height
- touch target

규칙:
- Button size와 Input size는 다른 시각값을 가져도 같은 size 언어를 공유해야 합니다.
- `sm / md / lg`는 Foundation의 density 기준을 먼저 보고, 개별 contract는 그 결과만 사용합니다.

현재 core 파생 규칙:

| Token | `sm` | `md` | `lg` |
| --- | --- | --- | --- |
| `controlHeight` | `32` | `40` | `48` |
| `buttonLabel` | `14 / 20` | `14 / 20` | `16 / 22` |
| `inputValue` | `14 / 20` | `14 / 20` | `16 / 22` |
| `buttonRadius` | `10` | `10` | `12` |
| `inputRadius` | `10` | `10` | `12` |

## Motion Tokens

Motion token은 화면 전환보다 컴포넌트 반응을 일관되게 만드는 데 우선 사용합니다.

권장 구성:
- `duration/fast`
- `duration/normal`
- `duration/slow`
- `easing/standard`
- `easing/emphasized`

규칙:
- loading, pressed, expand/collapse 같은 반복 인터랙션에 우선 적용합니다.
- mobile에서는 과한 motion보다 즉시성, 명확성, 안정성을 우선합니다.

## Interaction Tokens

Interaction token은 active/focus 등의 공통 상호작용 표현을 고정합니다.

권장 구성:
- `focusOutlineWidth`
- `focusOutlineColor`
- `activeOpacity`
- `pressedScale`

규칙:
- 각 Component가 focus/pressed 표현을 제멋대로 정의하지 않습니다.
- 같은 의미의 interaction은 같은 시각 언어를 공유해야 합니다.

## State Tokens

State token은 상태별 시각 변화를 공통화합니다.

권장 구성:
- `disabledOpacity`
- `loadingOpacity`
- `pressedScale`
- `readonlyTone`

규칙:
- disabled는 단순 opacity 저하로만 끝나지 않게 합니다.
- loading은 비활성과 구분되어야 합니다.
- pressed는 순간 피드백이지 선택 상태가 아닙니다.

## Accessibility Rules

Foundation은 최소 접근성 기준을 시스템 레벨에서 고정해야 합니다.

필수 기준:
- touch target minimum
- contrast minimum
- label / accessible name requirement
- focus order clarity
- 상태 전달의 비색상 의존성

권장 최소값:
- touch target: `44 x 44`

규칙:
- Component는 접근성 기준을 개별 구현마다 다시 정의하지 않습니다.
- Foundation이 최소 기준을 제공하고, Component 계약은 그 기준을 사용합니다.

## Shared Utility Props

공통 utility는 여러 Component가 반복적으로 쓰는 행동만 다룹니다.

권장 범위:
- `block`
- `fullWidth`
- `iconOnly`
- `iconStart`
- `iconEnd`
- `fluid`
- `fixed`

규칙:
- utility는 의미 계층을 대체하면 안 됩니다.
- utility는 layout 또는 affordance 보조에 한정합니다.

## Foundation -> Contract Rule

Contract는 다음만 할 수 있습니다.

- Foundation token을 참조한다
- Foundation rule을 변경할 수 없다
- Component 내부에서 raw value를 정의하지 않는다
- Contract는 의미만 정의한다

Foundation이 바뀌면 Contract는 자동으로 따라가야 합니다.

## Operational Rules

Foundation을 만들 때는 아래 순서를 따릅니다.

1. raw value보다 token key를 먼저 정의합니다.
2. Component별 예외보다 공통 기준을 먼저 찾습니다.
3. 상태 규칙은 Foundation에 두고, 의미 규칙은 Component에 둡니다.
4. visual style보다 재사용성과 일관성을 우선합니다.
5. brand/project override는 Foundation 위에서 분리합니다.

## Recommended Next Step

다음 단계에서는 각 contract가 Foundation을 어떻게 참조하는지 연결해야 합니다.

예:
- Button Contract -> color / size / interaction token 참조
- Input Contract -> color / typography / state token 참조
- Module Contract -> spacing / radius / accessibility token 참조
