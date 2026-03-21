---
title: Component Contract Template
---

# Component Contract Template

이 문서는 Component contract의 공통 목차 템플릿입니다.

모든 Component는 아래 구조를 기본으로 사용합니다.

이 문서는 main component 정의만 설명하는 것이 아니라, 실제로 생성되고 사용되는 instance를 어떤 기준으로 해석하고 만들지까지 포함합니다.

## Purpose

- 이 컴포넌트가 왜 존재하는지
- 언제 쓰는지

## Anatomy

- 대표 구조
- Anatomy SVG 필수
- 필수 slot / 선택 slot
- variation이 적용되기 전의 기본 구조만 설명

### Anatomy SVG Guide

- 구조 설명용 SVG를 필수로 포함합니다.
- slot 이름만 반복하지 말고, 실제 예시 데이터로 이해되게 만듭니다.
- callout line과 수치 가이드는 컴포넌트 위, 텍스트 아래 레이어에 둡니다.
- 수치 가이드는 별도 강조색으로 분리합니다.
- 간격, padding, height 같은 측정값은 실제 요소 사이 기준으로만 표시합니다.
- 설명 텍스트는 라운드 박스 없이 plain text로만 표시합니다.
- anatomy SVG 안의 전체 콘텐츠는 영역 기준으로 가운데 정렬합니다.
- 선끼리 겹치는 경로는 피하고, 각 callout은 분리된 lane으로 라우팅합니다.
- 컴포넌트를 가리키는 선은 컴포넌트 쪽 첫 구간이 45도 대각선이어야 합니다.

## Semantics

- 이 컴포넌트가 전달하는 의미
- hierarchy, validation, selection 같은 의미 축

## Component Properties

- 실제 달라지는 axis
- Figma component property와의 연결
- instance를 생성할 때 어떤 조합이 허용되는지 설명

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
- 직접 정의가 아니라 Variables/Foundation 파생값임을 명시

## Color Mapping

- Foundation color token이 실제 UI 역할에 어떻게 매핑되는지
- 항상 컬러칩 + token name + hex로 표시

## Variables

- 이 컴포넌트가 참조하는 variable 계층을 설명
- metrics와 color mapping이 어떤 variable에서 파생되는지 연결

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
