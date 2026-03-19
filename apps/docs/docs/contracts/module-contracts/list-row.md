---
title: ListRow
---

# ListRow

## Layer

`ListRow`는 `Module`입니다.

ListRow는 정보, 상태, 이동 affordance를 한 줄 단위로 묶는 재사용 블록입니다.

## Purpose

ListRow의 목적은 리스트 문맥 안에서 하나의 항목을 읽고 탭하거나 확인하게 하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![ListRow preview](/previews/list-row-contract.svg)

## Structure

일반적인 구성:
- title
- optional subtitle or meta
- optional leading visual
- optional trailing value or chevron

## Rules

- 한 줄의 주요 행동은 하나만 명확해야 합니다.
- row 전체가 tappable인지 일부만 interactive인지 일관되게 유지합니다.
- 단순 정보 row와 이동 row는 구분되어야 합니다.

## Accessibility Constraints

- row의 주요 의미가 텍스트로 전달되어야 합니다.
- chevron만으로 이동 의미를 전달하지 않습니다.

## Anti-Patterns

- row 안에 여러 경쟁 액션을 섞는 것
- 카드와 row의 역할을 혼합하는 것

## Composition Notes

ListRow는 `Settings Screen`이나 결과 목록 Pattern의 기본 구성 블록입니다.
