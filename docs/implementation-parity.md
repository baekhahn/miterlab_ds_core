# Implementation Parity

Frozen source of truth:
- Ant Design Mobile-based specs in `packages/ui-core/specs`

Family mismatch counts:

| Family | Before Fix | After Fix | Status |
| --- | ---: | ---: | --- |
| Button | 2 | 0 | Ready for freeze review |
| Input | 2 | 0 | Ready for freeze review |
| Tabs | 4 | 0 | Ready for freeze review |
| List / Cell | 4 | 0 | Ready for freeze review |
| Dialog / Popup / Toast | 4 | 0 | Ready for freeze review |
| NavBar / TabBar | 5 | 0 | Ready for freeze review |
| Form | 5 | 0 | Ready for freeze review |

Artifacts:
- `artifacts/parity/button.json`
- `artifacts/parity/input.json`
- `artifacts/parity/tabs.json`
- `artifacts/parity/list-cell.json`
- `artifacts/parity/overlay.json`
- `artifacts/parity/navigation.json`
- `artifacts/parity/form.json`

Priority order:
1. Button
2. Input
3. Tabs
4. List / Cell
5. Dialog / Popup / Toast
6. NavBar / TabBar
7. Form
