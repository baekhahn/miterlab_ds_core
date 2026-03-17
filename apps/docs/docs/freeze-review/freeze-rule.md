# Freeze Rule

Purpose:
Lock the core once P1 completion is reached.

Freeze means:
- no prop changes
- no token changes
- no axis changes
- no schema changes
- no spec changes without explicit versioning
- no generator remapping for frozen families
- no plugin reinterpretation for frozen families

P1 completion gate:
All P1 families must have:
- status row present
- mismatch count tracked
- phase A complete
- phase B explicitly verified or explicitly pending with reason

After freeze:
- only additive extension allowed
- no breaking contract edits without new version
- P2 may start only after P1 freeze is recorded
