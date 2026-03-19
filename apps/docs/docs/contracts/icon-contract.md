---
title: Icon Contract
---

# Icon Contract

## Layer

`Icon`은 `Component`입니다.

Icon은 독립적으로 렌더 가능한 단일 시각 보조 단위입니다.
Icon 자체는 `Module`이 아니며, 화면 구조를 설명하는 `Pattern`도 아닙니다.

## Purpose

Icon의 목적은 텍스트를 보조하거나, 빠른 인지를 돕거나, 반복되는 의미를 압축하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Icon preview](/previews/icon-contract.svg)

## Semantics

- 방향
- 상태
- 기능
- 경고 또는 확인

Icon은 단독 의미보다 문맥 보조에 강합니다.

## Rules

- 핵심 의미를 icon만으로 전달하지 않습니다.
- 반복적으로 학습된 의미만 단독 노출합니다.
- 버튼 안 icon은 액션 라벨을 보조해야 합니다.

## Accessibility Constraints

- icon only interactive control은 accessible name이 필요합니다.
- 색만으로 상태를 전달하지 않습니다.

## Anti-Patterns

- 설명 없이 생소한 icon을 단독 사용하는 것
- decorative icon을 기능 icon처럼 보이게 하는 것
- 과도한 icon 혼합으로 정보 위계를 흐리는 것

## Composition Notes

Icon은 Button, ListRow, SearchBar 같은 Module 내부에서 자주 쓰이지만 그 구조를 대체하지 않습니다.
