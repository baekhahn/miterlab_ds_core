---
title: Runtime
---

# Runtime

Runtime documentation describes what the Figma plugin expects from the generated payload and how that payload maps to canvas nodes.

## Flow

- `spec -> generator -> payload -> plugin -> figma`

## Runtime Guarantees

- Payload structure follows `shared/contracts/figmaWritePayload.ts`.
- Plugin mapping uses family component names directly.
- Metrics and token references are resolved from the payload node style and variables.
- Canvas verification remains a separate phase from local parity verification.

## Runtime Contract Fields

| Payload field | Required contract | Current note |
| --- | --- | --- |
| `document` | Must preserve screen identity and theme for the write session. | Used directly by plugin write entry points. |
| `node.component` | Must match the frozen family runtime name exactly. | No aliasing or family flattening is allowed. |
| `node.variant` | Must preserve frozen prop names and values. | Button/Input remain blocked until token-path parity is complete. |
| `node.style` | Must carry frozen metrics required for visible parity. | Plugin must not replace these with generic presets. |
| `node.variables` | Must carry documented token references for the family. | Button/Input still use semantic paths in runtime output today. |
| `node.children` | Must preserve hierarchy for nested frames, text, and instances. | Used for section, row, and child component layout. |
