# 04 — Type System & Data Models

## Priority
🟡 Medium

## Current Issues
- Types are scattered and occasionally duplicated
- Missing centralized API contract types

## Recommendation

Create shared model types and API request/response contracts.

## Actions
1. Add `src/types/models/*`
2. Add `src/types/api/requests.ts` and `responses.ts`
3. Replace inline component types with shared types
