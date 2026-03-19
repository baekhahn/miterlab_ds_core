---
title: SearchBar Contract
---

# SearchBar Contract

## Layer

`SearchBar`는 `Module`입니다.

SearchBar는 검색 입력과 관련 affordance를 묶은 반복 가능한 검색 작업 블록입니다.

## Purpose

SearchBar의 목적은 사용자가 검색 질의를 입력, 수정, 초기화, 제출할 수 있게 하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![SearchBar preview](/previews/search-bar-contract.svg)

## Structure

일반적인 구성:
- search input
- leading search icon
- clear action
- optional cancel or scope control

## Rules

- 검색 시작점은 항상 명확해야 합니다.
- 검색 입력과 일반 폼 입력은 시각적으로 구분되어야 합니다.
- clear action은 값이 있을 때만 노출할 수 있습니다.

## Accessibility Constraints

- 검색 목적이 accessible name으로 드러나야 합니다.
- 아이콘만으로 주요 기능을 숨기지 않습니다.

## Anti-Patterns

- 일반 입력창을 SearchBar처럼 오용하는 것
- 검색 취소와 검색 제출을 같은 affordance로 혼합하는 것

## Composition Notes

SearchBar는 `Search Result Screen` 같은 Pattern의 상단 Module로 자주 사용됩니다.
