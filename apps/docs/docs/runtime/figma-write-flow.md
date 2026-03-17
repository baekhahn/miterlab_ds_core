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

## Payload To Canvas Mapping

- Spec defines the legal props, states, metrics, and token references.
- Generator serializes those values into payload `variant`, `style`, and `variables` fields.
- Plugin converts payload nodes into Figma frames, text nodes, and instances.
- Canvas review validates that visible output still matches the documented contract.

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
