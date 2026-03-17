# Parity Rule

Purpose:
Define parity requirements for all P1 families.

Required parity dimensions:
- spec parity
- generator parity
- plugin parity
- canvas parity

Definitions:
- spec parity: spec matches frozen baseline
- generator parity: payload preserves all contract fields
- plugin parity: renderer/write path preserves payload semantics
- canvas parity: live Figma result matches expected contract

Rules:
- mismatch count must be tracked by family
- mismatch count must reach 0 before a family is phase-a complete
- no family may move to verified while any parity dimension is incomplete
- P2 may not start until all P1 families meet the defined gate
