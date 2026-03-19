---
title: BottomActionGroup
---

# BottomActionGroup

## Layer

`BottomActionGroup`는 `Module`입니다.

BottomActionGroup은 화면 하단의 주요 실행 액션을 묶는 재사용 블록입니다.

## Purpose

BottomActionGroup의 목적은 현재 문맥의 결론 액션을 하단에서 안정적으로 제공하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![BottomActionGroup preview](/previews/bottom-action-group-contract.svg)

## Structure

일반적인 구성:
- primary action
- optional secondary action
- safe-area-aware bottom spacing

## Rules

- primary action은 하나만 둡니다.
- destructive secondary는 일반 secondary와 명확히 구분합니다.
- 하단 고정 시 콘텐츠 가림을 피해야 합니다.

## Accessibility Constraints

- 하단 고정 영역도 충분한 터치 타깃과 safe area를 확보해야 합니다.

## Anti-Patterns

- 동일 위계의 버튼을 여러 개 두는 것
- 하단 CTA가 콘텐츠를 가리는 것

## Composition Notes

BottomActionGroup은 `Login Form`, `Product Detail with Sticky CTA`에서 자주 사용됩니다.
