# 05 — Error Handling & Loading States

## Priority
🟡 Medium

## Current Issues
- Inconsistent loading and error UI
- No unified fallback strategy

## Recommendation

Standardize async UI states and add resilient error boundaries.

## Actions
1. Add a reusable `QueryStateHandler` for loading/error/empty states
2. Add app-level `ErrorBoundary`
3. Define route-level error/pending UX where applicable
4. Tune TanStack Query defaults (`staleTime`, `gcTime`, retries)
