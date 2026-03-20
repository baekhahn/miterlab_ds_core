---
title: Component Contract Template
---

# Component Contract Template

이 문서는 Component contract의 공통 목차 템플릿입니다.

모든 Component는 아래 구조를 기본으로 사용합니다.

## Purpose

- 이 컴포넌트가 왜 존재하는지
- 언제 쓰는지

## Anatomy

- 대표 구조
- 필수 slot / 선택 slot
- variation이 적용되기 전의 기본 구조만 설명

## Semantics

- 이 컴포넌트가 전달하는 의미
- hierarchy, validation, selection 같은 의미 축

## Variation

- 실제 달라지는 axis
- Figma component property와의 연결

예:
- hierarchy
- variant
- content
- size
- state
- width

## Preview

- 대표 preview
- 필요하면 anatomy preview와 contract preview를 분리

## Metrics

- 높이, 패딩, 반지름, 타이포그래피 등
- 직접 정의가 아니라 Foundation 파생값임을 명시

## Color Mapping

- Foundation color token이 실제 UI 역할에 어떻게 매핑되는지
- 항상 컬러칩 + token name + hex로 표시

## Interaction

- hover, pressed, focus, disabled, loading 같은 상태 변화 규칙

## Accessibility

- accessible name
- keyboard
- contrast
- touch target
- screen reader 규칙

## Rules

- 실무 사용 규칙
- 금지 사항
- 경계 규칙

## Foundation Reference

- 이 문서가 직접 정의하지 않는 값
- Foundation 변경 시 자동 반영된다는 계약
