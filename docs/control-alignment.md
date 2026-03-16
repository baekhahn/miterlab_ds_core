# Control Alignment

코어 DS의 컨트롤은 수학적 중앙정렬보다 시각적 균형을 우선합니다.

## Button
- label은 중앙 정렬이 기본
- 실제 렌더에서는 약한 optical offset이 허용됩니다
- 작은 버튼은 너무 높은 radius를 쓰지 않습니다

## Input
- 텍스트는 좌측 inset이 고정되어야 합니다
- 필드 높이는 변해도 세로 중심은 유지되어야 합니다
- placeholder와 value는 같은 alignment rule을 공유합니다

## Filter Button
- chip 계열은 버튼보다 더 낮고 더 촘촘해야 합니다
- 텍스트는 가운데 정렬, 좌우 padding은 과하지 않게 유지합니다

## Backbone Rule
브랜드를 얹기 전에도 컨트롤 자체가 정렬돼 보이지 않으면 theme 단계에서 해결되지 않습니다.
