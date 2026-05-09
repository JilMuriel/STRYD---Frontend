# 01 — API Layer Architecture

## Priority
🔴 High

## Current Issues
- Inconsistent API clients (`fetcher` and `apiClient`)
- Hardcoded URLs in UI components
- Inconsistent error handling
- Mixed API concerns across folders

## React 19 Best-Practice Recommendation

Use **one HTTP strategy** across the app:
- Either **Axios with interceptors**, or
- A **centralized fetch wrapper**

The important part is consistency and centralized handling for auth, parsing, and errors.

## Actions
1. Consolidate all API calls behind `src/api/client.ts`
2. Centralize `401` handling via app event/navigation callback
3. Move endpoint logic into service modules (`src/api/services/*`)
4. Remove direct network calls from UI components

## Example Structure
```text
src/api/
  client.ts
  services/
    base.service.ts
    activity.service.ts
    dashboard.service.ts
```
