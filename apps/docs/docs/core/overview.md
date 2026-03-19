---
title: Overview
slug: /
---

# Overview

## Purpose

이 시스템은 모바일 앱 UI를 AI와 사람이 같은 구조로 이해하고 조합하기 위한 기준입니다.

목표는 다음과 같습니다.
- 단일 컴포넌트 설명서가 아니라 실제 제품 UI를 만들 수 있는 구조를 제공
- 화면마다 새로 해석하지 않고 반복 가능한 UX 단위를 재사용
- 구현 프레임워크보다 의미, 상호작용, 조합 규칙을 먼저 고정

이 시스템은 웹 전용 UI 라이브러리 마이그레이션 문서가 아닙니다.
또한 React, SwiftUI, Compose, Flutter API를 기준으로 작성하지 않습니다.

## Design Direction

현재 시스템은 다음 방향을 따릅니다.
- 구조는 명시적이고 조합 가능해야 합니다.
- 톤은 실무적이고 서비스 맥락에 맞아야 합니다.
- 과한 데모 스타일보다 실제 제품 화면에 가까워야 합니다.

## Foundation Tone

현재 foundation의 시각 기준은 다음을 지향합니다.
- 과한 데모 스타일보다 서비스 화면에 가까운 안정감
- 강한 showcase 대비보다 실사용 위계
- 선명한 원색보다 절제된 강조색
- 과장된 pill 형태보다 실무적인 radius와 spacing

현재 대표 foundation 색은 시스템의 공통 semantic token으로 아래 값을 사용합니다.
- primary action: `#0066FF`
- primary text: `#171719`
- secondary text: `#2E2F33`
- line: `#E1E2E4`
- disabled fill: `#F4F4F5`
- disabled text: `#989BA2`
- negative: `#FF4242`
- positive: `#00BF40`

## What Is Fixed

이 시스템이 고정하는 것은 다음입니다.
- layer boundary
- semantic meaning
- interaction expectation
- reusable composition unit
- accessibility minimum
- AI generation rule

## What Is Not Fixed

이 시스템이 지금 고정하지 않는 것은 다음입니다.
- framework API shape
- platform-specific implementation detail
- brand-specific visual identity
- product copy
- business logic

## Hierarchy

### Core

Core는 시스템의 운영 원칙입니다.

Core는 다음을 정의합니다.
- 시스템 목적
- 범위
- 무엇을 고정하고 무엇을 열어두는지
- AI가 어떤 단위로 UI를 읽고 조합해야 하는지

Core는 시각 스타일 자체보다 구조와 경계를 정의합니다.

### Foundation

Foundation은 공통 디자인 값 계층입니다.

예시:
- color role
- spacing scale
- typography scale
- radius
- elevation
- motion
- touch target
- safe area

Foundation은 모든 상위 레이어를 지원하지만, 단독으로 제품 작업을 설명하지는 않습니다.

### Component

Component는 독립적으로 렌더 가능한 단일 목적 UI 단위입니다.

예시:
- Button
- Input
- Checkbox
- Text
- Icon

판별 기준:
- 하나의 분명한 역할이 있는가
- 혼자 렌더해도 의미가 성립하는가
- 여러 화면과 모듈에서 반복 사용할 수 있는가

### Module

Module은 하나 이상의 Component로 구성된 재사용 가능한 상호작용 블록입니다.

Module은 화면 안에서 반복되는 실무 UX 작업을 해결합니다.

예시:
- FormField
- SearchBar
- ListRow
- FilterChipGroup
- BottomActionGroup
- EmptyStateBlock

판별 기준:
- 화면 안에서 자주 반복되는 작업 단위인가
- Component보다 크지만 화면 전체는 아닌가
- 같은 구조로 여러 Pattern에 재사용되는가

### Pattern

Pattern은 Module을 조합한 화면 수준 또는 플로우 수준 구조입니다.

예시:
- Login Form
- Search Result Screen
- Settings Screen
- Product Detail with Sticky CTA

Pattern은 실제 제품 시나리오를 설명하지만, 내부는 다시 Module 단위로 분해 가능해야 합니다.

## Boundary Rules

- Component는 Module이 아닙니다.
- Module은 Pattern이 아닙니다.
- Module은 Component와 Pattern 사이의 실무 조합 계층입니다.
- Pattern은 가능한 한 Module로 구성하고, raw Component를 직접 나열하는 방식은 최소화합니다.
- 하나의 control이면 Component입니다.
- 반복되는 작업 블록이면 Module입니다.
- 화면 또는 플로우이면 Pattern입니다.

## AI Usage Principles

AI는 이 시스템을 컴포넌트 목록이 아니라 조합 규칙으로 읽어야 합니다.

### AI should do

- 먼저 현재 단위가 Component인지 Module인지 Pattern인지 판단
- 의미와 상호작용을 먼저 결정
- Pattern을 Module 중심으로 조합
- Module 내부에 필요한 Component를 넣는 방식으로 확장
- 시각보다 역할, 상태, 제약을 먼저 해석

### AI should not do

- raw Component만 나열해서 화면을 조립
- Module이 필요한 문제를 Component 하나로 축소
- Pattern을 하나의 거대한 custom block으로 정의
- framework prop 이름을 시스템 구조로 사용
- 웹 전용 상호작용을 기본값으로 가정

## Operational Rule

UI를 정의하거나 생성할 때는 아래 순서를 따릅니다.

1. layer를 식별합니다.
2. boundary를 유지합니다.
3. semantic meaning을 정합니다.
4. interaction rule을 적용합니다.
5. 필요할 때만 상위 레이어로 조합합니다.
