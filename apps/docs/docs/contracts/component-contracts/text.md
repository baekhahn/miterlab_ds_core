---
title: Text
---

# Text

## Layer

`Text`는 `Component`입니다.

Text는 독립적으로 렌더 가능한 단일 정보 표현 단위입니다.
Text 자체는 `Module`이 아니며, 화면 구조를 설명하는 `Pattern`도 아닙니다.

## Purpose

Text의 목적은 정보를 읽을 수 있는 형태로 전달하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Text preview](/previews/text-contract.svg)

## Semantics

- heading
- body
- label
- helper
- status

Text는 스타일 이름보다 정보 역할로 구분해야 합니다.

## Rules

- 강조 수준은 정보 중요도에 따라 결정합니다.
- 버튼 라벨, helper text, 상태 메시지는 같은 body text로 취급하지 않습니다.
- 읽기 흐름을 해치는 장식 텍스트를 최소화합니다.

## Accessibility Constraints

- 정보 위계는 크기만이 아니라 구조로도 구분합니다.
- 보조 텍스트도 충분한 대비를 가져야 합니다.
- 긴 텍스트는 모바일 폭에서 읽기 가능한 line length를 유지해야 합니다.

## Anti-Patterns

- 모든 텍스트를 동일한 역할로 취급하는 것
- 장식용 강조를 정보 위계보다 우선하는 것
- helper, error, title을 같은 tone으로 섞는 것

## Composition Notes

Text는 거의 모든 Module의 내부 요소이지만, 스스로 Module이 되지는 않습니다.
