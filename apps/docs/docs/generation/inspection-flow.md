---
title: Inspection Flow
---

# Inspection Flow

Inspection screens are family validation outputs, not product screens.

## Flow

1. Frozen spec defines the family contract.
2. Family inspection prompt enumerates the minimum visible cases.
3. Layout builder creates section and component placement.
4. Payload writer maps layout nodes into the Figma write contract.
5. Plugin write path renders nodes into the current Figma page when a writable path is available.

## Current Inspection Screens

- `button-inspection` for Button
- `input-inspection` for Input
- `tabs-inspection` for Tabs
- `list-cell-inspection` for List / Cell
- `overlay-inspection` for Dialog / Popup / Toast
- `navigation-inspection` for NavBar / TabBar
- `form-inspection` for Form

## Failure Cases

- Axis present in spec but missing from the inspection prompt.
- Layout width or height normalized so size differences disappear.
- Payload variant keys renamed from the frozen spec.
- Plugin renderer ignores family state or metric fields.
- Write path blocked by a read-only environment.

## Verification Checklist

- Inspection summary passes for the family.
- Payload contains at least one node for the target component.
- Payload node variants preserve official field names.
- Plugin build succeeds before canvas verification.
- Canvas verification remains `pending` until live write is confirmed.
