---
title: Product Detail with Sticky CTA
---

# Product Detail with Sticky CTA

## Layer

`Product Detail with Sticky CTA`는 `Pattern`입니다.

이 Pattern은 상세 정보 탐색과 하단 실행 액션을 함께 다루는 화면 수준 구조입니다.

## Purpose

목적은 사용자가 상세 정보를 읽는 동안에도 주요 실행 액션을 놓치지 않게 하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Product Detail with Sticky CTA preview](/previews/product-detail-sticky-cta-pattern.svg)

## Core Modules

- content detail block
- BottomActionGroup
- optional ListRow or info section

## Rules

- sticky CTA는 현재 화면의 핵심 행동을 대표해야 합니다.
- 상세 정보 읽기 흐름을 가리지 않아야 합니다.
- 보조 액션은 sticky CTA보다 낮은 위계를 유지합니다.

## Anti-Patterns

- sticky CTA가 콘텐츠를 과도하게 가리는 것
- 핵심 행동이 아닌 일반 탐색 버튼을 sticky 영역에 두는 것
