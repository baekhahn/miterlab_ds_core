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
