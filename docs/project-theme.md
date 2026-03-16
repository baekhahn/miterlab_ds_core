# Project Theme Guide

Miterlab DS에서 새 프로젝트 테마를 추가하는 최소 절차입니다.

## 원칙
- Core(foundation/semantic)는 변경하지 않습니다.
- 프로젝트별 차이는 brand 토큰에서만 처리합니다.
- theme는 brand 값을 semantic 소비 구조에 연결합니다.

## 1) Brand 토큰 추가
경로:
- `packages/tokens/src/brand/projects/<projectName>/brand.ts`

필수 키:
- `brand.primary`
- `brand.primaryHover`
- `brand.primaryPressed`
- `brand.secondary`
- `brand.accent`

예시:
```ts
export const projectABrandTokens = {
  projectId: "projectA",
  brand: {
    primary: "#5B3DF5",
    primaryHover: "#4A31CC",
    primaryPressed: "#3A27A3",
    secondary: "#00A3A3",
    accent: "#B6A8FF"
  }
};
```

## 2) Brand export 연결
- `packages/tokens/src/brand/index.ts`
- `packages/tokens/src/index.ts`

## 3) Theme 파일 추가
경로:
- `packages/themes/src/projects/<projectName>.ts`

패턴:
```ts
import { projectABrandTokens } from "@miterlab/tokens";
import { createProjectTheme } from "../createProjectTheme";

export const projectATheme = createProjectTheme(projectABrandTokens);
```

## 4) Theme export 연결
- `packages/themes/src/index.ts`

## 5) 검증 체크
- semantic 토큰 파일 수정이 없는지 확인
- 컴포넌트 스펙이 semantic만 참조하는지 확인
- resolver에서 `action.primary*`가 brand state를 참조하는지 확인

## 운영 포인트
- 브랜드 교체 시 컴포넌트 스펙은 그대로 유지됩니다.
- 프로젝트별 색 차이는 mode/theme 레이어에서만 흡수됩니다.
