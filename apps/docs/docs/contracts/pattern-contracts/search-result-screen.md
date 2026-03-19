---
title: Search Result Screen
---

# Search Result Screen

## Layer

`Search Result Screen`은 `Pattern`입니다.

Search Result Screen은 검색과 결과 탐색을 위한 화면 수준 구조입니다.

## Purpose

Search Result Screen의 목적은 검색 입력, 필터 변경, 결과 탐색을 하나의 흐름으로 연결하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Search Result Screen preview](/previews/search-result-screen-pattern.svg)

## Core Modules

- SearchBar
- FilterChipGroup
- ListRow or result list
- EmptyStateBlock

## Rules

- 검색과 필터는 결과와 가까운 문맥에서 연결되어야 합니다.
- 필터 적용 결과가 바로 이해되어야 합니다.
- 결과가 없을 때는 empty state와 다음 행동을 함께 제공합니다.

## Anti-Patterns

- 검색 입력과 결과 상태가 멀리 분리되는 것
- 필터 선택 규칙이 화면에서 읽히지 않는 것
