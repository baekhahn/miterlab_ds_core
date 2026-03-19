---
title: FilterChipGroup Contract
---

# FilterChipGroup Contract

## Layer

`FilterChipGroup`는 `Module`입니다.

FilterChipGroup은 다수의 필터 선택 상태를 묶어 보여주는 재사용 블록입니다.

## Purpose

FilterChipGroup의 목적은 사용자가 현재 필터 상태를 빠르게 읽고 변경하게 하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![FilterChipGroup preview](/previews/filter-chip-group-contract.svg)

## Structure

일반적인 구성:
- chip list
- selected / unselected state
- optional clear all or reset action

## Rules

- 필터 상태는 탭 후 결과가 어떻게 바뀌는지 예측 가능해야 합니다.
- 단일 선택과 다중 선택 규칙을 혼용하지 않습니다.
- 선택 상태는 명확하게 유지합니다.

## Accessibility Constraints

- 선택 상태는 색만으로 전달하지 않습니다.
- 칩 라벨이 실제 필터 의미를 설명해야 합니다.

## Anti-Patterns

- 의미 없는 짧은 태그를 필터처럼 쓰는 것
- 선택 규칙이 모호한 칩 그룹을 만드는 것

## Composition Notes

FilterChipGroup은 `Search Result Screen`의 결과 제어 Module로 자주 사용됩니다.
