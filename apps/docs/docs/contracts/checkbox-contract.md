---
title: Checkbox Contract
---

# Checkbox Contract

## Layer

`Checkbox`는 `Component`입니다.

Checkbox는 독립적으로 렌더 가능한 단일 선택 단위입니다.
Checkbox 자체는 `Module`이 아니며, 화면 구조를 설명하는 `Pattern`도 아닙니다.

## Purpose

Checkbox의 목적은 여러 선택지 중 복수 선택을 명시적으로 제어하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Checkbox preview](/previews/checkbox-contract.svg)

## Semantics

- 선택 가능
- 선택됨
- 선택 해제됨
- 비활성

Checkbox는 on/off 토글이 아니라, 다중 선택 맥락의 선택 표시입니다.

## States

- `unchecked`
- `checked`
- `disabled`
- `indeterminate`

## Rules

- 단일 선택 문제에는 Checkbox 대신 다른 control을 사용합니다.
- label 없이 단독 노출하지 않습니다.
- 터치 타깃은 텍스트 영역까지 포함해 확보합니다.

## Accessibility Constraints

- 선택 상태는 색만으로 전달하지 않습니다.
- label 또는 accessible name이 있어야 합니다.
- `indeterminate`는 실제 의미가 있을 때만 사용합니다.

## Anti-Patterns

- 단일 선택을 Checkbox로 표현하는 것
- 설정 토글을 Checkbox로 대체하는 것
- 설명 없이 체크 상태만 노출하는 것

## Composition Notes

Checkbox는 `FilterChipGroup`이나 `FormField` 안에서 사용될 수 있지만, 그 구조 자체를 정의하지는 않습니다.
