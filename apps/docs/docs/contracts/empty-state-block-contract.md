---
title: EmptyStateBlock Contract
---

# EmptyStateBlock Contract

## Layer

`EmptyStateBlock`는 `Module`입니다.

EmptyStateBlock은 데이터 부재 상황을 설명하고 다음 행동을 안내하는 재사용 블록입니다.

## Purpose

EmptyStateBlock의 목적은 비어 있는 상태를 설명하고, 사용자가 다음 행동을 이해하도록 돕는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![EmptyStateBlock preview](/previews/empty-state-block-contract.svg)

## Structure

일반적인 구성:
- title
- supporting text
- optional illustration or icon
- recovery action

## Rules

- 빈 상태의 이유와 다음 행동을 함께 보여야 합니다.
- 감정적 문구보다 실질적 안내를 우선합니다.
- recovery action은 하나의 명확한 다음 단계여야 합니다.

## Accessibility Constraints

- 텍스트만으로도 상태를 이해할 수 있어야 합니다.
- illustration은 보조 요소여야 합니다.

## Anti-Patterns

- “아무것도 없음”만 보여주고 행동을 안내하지 않는 것
- 시각 장식만 있고 설명이 없는 것

## Composition Notes

EmptyStateBlock은 여러 Pattern에서 공통 fallback Module로 사용됩니다.
