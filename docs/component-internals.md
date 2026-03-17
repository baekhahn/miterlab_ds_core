# Component Internals

컴포넌트 내부 정렬과 padding은 `core backbone`의 일부입니다.

## Why It Matters
- 화면 바깥 spacing만 맞아도 버튼과 입력 필드가 어색하면 제품 완성도가 떨어집니다.
- theme는 나중에 색과 브랜드를 얹지만, label centering과 inset은 core에서 이미 해결되어야 합니다.

## Core Rules
- button md height: `40`
- button lg height: `48`
- input default height: `40`
- filter button md height: `32`
- button horizontal padding: `16`
- input horizontal inset: `14`
- filter button horizontal padding: `12`

## Alignment
- button label: optical center
- input text: left inset + vertical center
- chip label: compact center alignment

Wanted는 비례감과 정렬 감각의 참고 기준이며, Miterlab은 자체 spec과 token 구조를 유지합니다.
