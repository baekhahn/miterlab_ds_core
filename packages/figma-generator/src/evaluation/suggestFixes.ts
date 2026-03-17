import type { EvaluationIssue, EvaluationSuggestion } from "./types";

const fixMap: Record<string, string> = {
  missing_required_section: "필수 섹션을 패턴 정의에 맞게 추가해 주세요.",
  duplicated_section: "중복 섹션을 제거하고 단일 섹션으로 정리해 주세요.",
  missing_primary_action: "action 영역에 primary 버튼을 추가해 주세요.",
  missing_action_section: "primary action이 있으면 action 섹션을 명시적으로 배치해 주세요.",
  invalid_nesting: "section 내부의 frame 중첩을 stack 구조로 단순화해 주세요.",
  direct_non_semantic_token: "foundation/brand 직접 참조를 semantic 변수로 교체해 주세요.",
  non_semantic_reference: "변수 경로를 Semantic/* 형식으로 통일해 주세요.",
  unsupported_variant_property: "지원 축(variant/size/state/selected 및 입력 메타)만 사용해 주세요.",
  invalid_state: "지원 상태(default/hover/pressed/disabled/focus/error/positive/readOnly)로 정규화해 주세요.",
  invalid_size: "size를 sm/md/lg로 맞춰 주세요.",
  component_naming: "컴포넌트 노드 이름을 Pascal/Title 시작 형태로 통일해 주세요.",
  section_spacing_tight: "섹션 간격을 density 규칙에 맞게 늘려 주세요.",
  hierarchy_invalid: "header -> content/form -> action 순으로 섹션 순서를 정렬해 주세요.",
  action_grouping_dense: "액션 버튼을 1~2개 핵심 동작으로 축소하거나 보조 메뉴로 분리해 주세요."
};

export const suggestFixes = (issues: EvaluationIssue[]): EvaluationSuggestion[] => {
  const uniqueCodes = [...new Set(issues.map((issue) => issue.code))];
  return uniqueCodes.map((code) => ({
    code,
    message: fixMap[code] ?? "해당 이슈 코드에 대한 수동 검토가 필요합니다."
  }));
};
