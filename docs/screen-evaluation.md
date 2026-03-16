# Screen Evaluation

생성된 화면 구조(Layout/MCP payload)가 디자인 시스템 규칙을 지키는지 자동 점검합니다.

## Evaluated Inputs
- LayoutNode (prompt -> layout 결과)
- MCP payload (layout -> figma export 결과)

## Evaluated Areas
- 필수 섹션 존재 여부
- 컴포넌트 배치 규칙
- variant/size/state 유효성
- semantic 토큰 사용 준수
- spacing/hierarchy 품질
- 화면 패턴 일치 여부

## Not Evaluated
- 스크린샷 기반 시각 품질
- 픽셀 렌더링 정확도
- 이미지/아이콘 미학 품질
