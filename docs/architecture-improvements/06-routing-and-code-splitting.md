# 06 — Routing & Code Splitting

## Priority
🟡 Medium

## Current Issues
- Routes are mostly eager-loaded
- No dedicated 404 experience

## React 19 + React Router 7 Recommendation

Use Router 7 data-router patterns with route-level `lazy`, plus per-route pending/error handling.

## Actions
1. Move route definitions to dedicated route module(s)
2. Add route-level lazy loading for feature pages
3. Add a catch-all route and `NotFound` page
4. Keep app-level error boundary and add route-specific fallbacks
