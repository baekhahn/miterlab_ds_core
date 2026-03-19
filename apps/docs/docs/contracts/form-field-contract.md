---
title: FormField Contract
---

# FormField Contract

## Layer

`FormField`는 `Module`입니다.

FormField는 하나 이상의 Component를 묶어 단일 입력 작업을 완성하는 재사용 블록입니다.

## Purpose

FormField의 목적은 입력 label, field shell, helper 또는 error를 하나의 입력 작업 단위로 묶는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![FormField preview](/previews/form-field-contract.svg)

## Structure

일반적인 구성:
- label
- input or selection control
- helper text or error text

## Rules

- placeholder는 label을 대체하지 않습니다.
- helper와 error는 같은 위치 체계를 유지합니다.
- 한 field는 하나의 주요 입력 작업만 담당합니다.

## Accessibility Constraints

- label과 field 연결이 명확해야 합니다.
- 오류 메시지는 field와 함께 인지 가능해야 합니다.

## Anti-Patterns

- 여러 입력을 하나의 field shell에 혼합하는 것
- label 없이 placeholder만 두는 것
- error를 field와 멀리 분리하는 것

## Composition Notes

FormField는 Pattern 안에서 반복 사용되지만, 화면 전체 구조를 설명하지는 않습니다.
