---
title: Core Vs Theme
---

# Core Vs Theme

## Core

- source-of-truth contract를 가집니다
- schema, spec, generator, plugin contract의 기준입니다
- freeze 대상입니다

## Theme

- core 위에 적용되는 확장 레이어입니다
- token 값 조합과 project-level override를 담당합니다
- core contract를 바꾸면 안 됩니다

## Rule

- core가 먼저 고정됩니다
- theme는 core를 재해석하지 않습니다
- theme 때문에 family axis, prop, token 이름을 바꾸지 않습니다

## Related Docs

- [Core Contract](/core/contract)
- [Schema Contract](/schema/schema-contract)
- [Freeze Rule](/freeze-review/freeze-rule)
