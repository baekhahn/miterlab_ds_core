---
title: Login Form
---

# Login Form

## Layer

`Login Form`은 `Pattern`입니다.

Login Form은 여러 Module을 조합해 인증 시작 시나리오를 구성하는 화면 수준 구조입니다.

## Purpose

Login Form의 목적은 사용자가 계정 정보를 입력하고 로그인 흐름을 시작하게 하는 것입니다.

## Preview

현재 렌더 결과를 문서에서 바로 확인할 수 있는 snapshot입니다.

![Login Form preview](/previews/login-form-pattern.svg)

## Core Modules

- FormField
- BottomActionGroup
- optional helper or alternate action block

## Rules

- 인증에 필요한 최소 입력만 먼저 노출합니다.
- primary action은 로그인 실행에 집중합니다.
- 보조 경로는 주 경로를 방해하지 않게 둡니다.

## Anti-Patterns

- 과도한 링크와 보조 액션으로 집중을 깨는 것
- 로그인과 회원가입의 우선순위를 같은 수준으로 두는 것
