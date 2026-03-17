# Inspection Rule

Purpose:
Define what inspection must prove before a family can move toward freeze.

Required inspection artifacts:
- payload
- layout
- node tree
- token mapping
- screenshot

Inspection must confirm:
- payload matches spec
- metrics match spec
- tokens match token contract
- layout matches inspection contract
- renderer output preserves family identity
- state/variant axes are not flattened

Rules:
- no family may claim inspection complete without artifacts
- screenshot is required for canvas freeze
- missing artifact must be marked explicitly in freeze status
