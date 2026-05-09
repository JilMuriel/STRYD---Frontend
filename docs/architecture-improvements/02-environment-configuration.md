# 02 — Environment Configuration

## Priority
🔴 High

## Current Issues
- Hardcoded backend URLs in components
- Scattered `import.meta.env` usage
- No startup validation of required env vars

## Recommendation

Create a typed environment module and consume config values from a single source.

## Actions
1. Add `src/config/env.ts` with runtime validation
2. Add `src/config/api.config.ts` for endpoint constants
3. Replace hardcoded URLs with config references
