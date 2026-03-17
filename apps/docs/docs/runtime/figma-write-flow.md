---
title: Figma Write Flow
---

# Figma Write Flow

## Flow

1. Generate the family inspection output.
2. Produce a Figma write payload that conforms to the shared contract.
3. Build the plugin runtime.
4. Trigger plugin write into the current document when a writable path is available.
5. Review the canvas output during Phase B freeze review.

## Payload Example

```json
{
  "document": {
    "name": "button-inspection screen",
    "screen": "button-inspection",
    "theme": "core"
  },
  "node": {
    "id": "layout_7",
    "type": "INSTANCE",
    "name": "Mini",
    "x": 48,
    "y": 116,
    "width": 92,
    "height": 28,
    "component": "Button",
    "style": {
      "fill": "#2E6CFF",
      "stroke": "#2E6CFF",
      "text": "#FFFFFF",
      "radius": 4,
      "paddingX": 12,
      "paddingY": 3,
      "gap": 0,
      "fontSize": 13,
      "lineHeight": 18,
      "fontWeight": "medium"
    },
    "variant": {
      "color": "primary",
      "fill": "solid",
      "size": "mini"
    },
    "variables": {
      "container.background": "Semantic/action/primary",
      "container.border": "Semantic/action/primary",
      "label.color": "Semantic/action/onPrimary"
    },
    "text": "Mini"
  }
}
```

## Node Tree Example

```json
[
  {
    "id": "layout_1",
    "type": "FRAME",
    "name": "Button inspection Screen",
    "x": 0,
    "y": 0,
    "width": 1440,
    "height": 1240,
    "children": [
      {
        "id": "layout_2",
        "type": "FRAME",
        "name": "header-section",
        "x": 48,
        "y": 40,
        "width": 1320,
        "height": 100,
        "children": [
          {
            "id": "layout_3",
            "type": "TEXT",
            "name": "Text 1",
            "x": 48,
            "y": 40,
            "width": 358,
            "height": 32,
            "text": "Button Inspection",
            "variables": {
              "text.color": "semantic.text.primary"
            },
            "style": {
              "text": "text/heading/xl",
              "fill": "#1F2430"
            }
          }
        ]
      },
      {
        "id": "layout_4",
        "type": "FRAME",
        "name": "content-section",
        "x": 48,
        "y": 116,
        "width": 1320,
        "height": 100,
        "children": [
          {
            "id": "layout_5",
            "type": "TEXT",
            "name": "Text 2",
            "x": 48,
            "y": 116,
            "width": 358,
...
```

## Payload To Canvas Mapping

- Spec defines the legal props, states, metrics, and token references.
- Generator serializes those values into payload `variant`, `style`, and `variables` fields.
- Plugin converts payload nodes into Figma frames, text nodes, and instances.
- Canvas review validates that visible output still matches the documented contract.

## Mapping Rules

| Contract area | Rule | Current status |
| --- | --- | --- |
| Variant mapping | Payload `variant` keys must remain identical to frozen spec prop names. | Verified for families with mismatch count `0`. |
| State mapping | State differences must remain encoded through official props or explicit spec state groups. | Canvas verification still pending for all families. |
| Metrics mapping | Payload `style` values must preserve frozen metrics and visible family differences. | Button/Input remain under review for runtime parity. |
| Token mapping | Payload `variables` must point to the documented token contract without ad hoc remapping. | Button/Input token path parity is still pending. |
| Node mapping | Plugin must map payload node types to frames, text, and instances without family flattening. | Plugin build is verified; live canvas write remains pending. |

## Current Limitations

- MCP write path is known to be read-only in the current environment.
- Local plugin build is verified, but live canvas verification is still pending for the frozen families.
- Screenshot attachment and final review approval remain part of Phase B and are not inferred from build success.

## Verification Checklist

- Payload generated successfully.
- Plugin build succeeded.
- Family parity mismatch count is `0`.
- Figma write verified only after live canvas write succeeds.
- Screenshot attached only after a real canvas capture exists.
