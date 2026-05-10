# 03 — State Management

## Priority
🟡 Medium

## Current Issues
- Duplicate dashboard queries across components
- Zustand present but not structured for clear ownership

## React 19 + Query 5 Recommendation

- Keep **server state** in TanStack Query.
- Use Zustand for **client/UI state only** (theme, sidebar, view filters).
- Do not mirror query data in Zustand unless truly necessary.

## Actions
1. Remove duplicate `useDashboard()` calls where possible
2. Add `auth.store.ts` for auth/session metadata
3. Add `ui.store.ts` for layout/UI state
