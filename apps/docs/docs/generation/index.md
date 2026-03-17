---
title: Generation
---

# Generation

## Current Generator Contract

- Source prompt grammar: `packages/figma-generator/src/grammar/designPromptGrammar.ts`
- Layout translation: `packages/figma-generator/src/layout/fromDesignPrompt.ts`
- Component mapping: `packages/figma-generator/src/components/mapComponent.ts`
- Write payload contract: `shared/contracts/figmaWritePayload.ts`

## Rule

- Generator reads frozen specs
- Generator writes inspection payloads
- Generator does not redesign family schema
