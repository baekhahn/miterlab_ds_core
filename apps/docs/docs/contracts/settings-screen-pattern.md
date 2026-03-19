---
title: Settings Screen Pattern
---

# Settings Screen Pattern

## Layer

`Settings Screen`은 `Pattern`입니다.

Settings Screen은 설정 항목 탐색과 상태 변경을 위한 화면 수준 구조입니다.

## Purpose

Settings Screen의 목적은 사용자가 현재 설정 상태를 읽고, 필요한 설정을 찾아 변경하게 하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Settings Screen preview](/previews/settings-screen-pattern.svg)

## Core Modules

- ListRow
- optional FormField
- optional BottomActionGroup

## Rules

- 설정 항목은 그룹별로 묶어야 합니다.
- 위험한 설정은 일반 설정과 분리합니다.
- 즉시 적용과 저장 후 적용 규칙을 혼용하지 않습니다.

## Anti-Patterns

- 모든 설정을 한 레벨로 나열하는 것
- row, toggle, action의 의미가 섞이는 것
