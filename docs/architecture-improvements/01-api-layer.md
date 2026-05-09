# 01 — API Layer Architecture

## Priority
🔴 High

## Current Issues
- Inconsistent API clients (`fetcher` and `apiClient`)
- Hardcoded URLs in UI components
- Inconsistent error handling
- Mixed API concerns across folders

## React 19 Best-Practice Recommendation

Use a **centralized fetch wrapper** across the app.

For this project, the API layer is now implemented with `fetch` in `src/api/client.ts` (`apiRequest` + `fetcher`) and all API modules should consume that client.

Key behavior now centralized:
- URL construction via `buildApiUrl`
- `credentials: "include"`
- Default JSON headers/body handling
- `401` handling via `auth:logout` event dispatch
- Consistent error throwing for non-OK responses

## Actions
1. Consolidate all API calls behind `src/api/client.ts`
2. Centralize `401` handling via app event/navigation callback
3. Move endpoint logic into service modules (`src/api/services/*`)
4. Remove direct network calls from UI components

## Implemented in Codebase

- ✅ `src/api/client.ts` upgraded to a single reusable fetch client (`apiRequest`)
- ✅ `src/api/activities.ts` refactored to use `apiRequest`/`fetcher`
- ✅ Legacy duplicate client removed: `src/shared/lib/apiClients.ts`

## File-by-File Changes & Explanation

### 1) `src/api/client.ts`

**What changed**
- Added `apiRequest<T>(endpoint, options)` as the central request function.
- Added `buildApiUrl(endpoint)` to normalize URL joining.
- Added runtime guard for missing `VITE_API_URL`.
- Standardized request defaults:
  - `credentials: "include"`
  - JSON `Content-Type`
  - JSON body serialization
- Standardized response handling:
  - Dispatch `auth:logout` event on `401`
  - Throw consistent error on non-OK responses
  - Handle `204 No Content`
- Kept `fetcher<T>()` as a compatibility wrapper.

**Why**
- Ensures every API call follows the same auth/error behavior.
- Removes side effects like direct hard redirects inside random API callers.
- Makes future extension easier (e.g., request IDs, tracing, retry wrappers).

**Impact**
- Lower risk of inconsistent behavior across features.
- Easier maintenance and debugging of network behavior.

### 2) `src/api/activities.ts`

**What changed**
- Removed dependency on old shared client.
- Switched to imports from `src/api/client.ts` only.
- `syncActivities()` now calls centralized `apiRequest()`.

**Why**
- Eliminates mixed client usage in one module.
- Keeps activity API aligned with single-client architecture.

**Impact**
- Activity-related requests now inherit the same auth/error defaults as the rest of API calls.

### 3) `src/shared/lib/apiClients.ts` (deleted)

**What changed**
- Removed obsolete duplicate API client implementation.

**Why**
- Duplicate clients create drift in error handling and auth behavior.
- Single source of truth is now `src/api/client.ts`.

**Impact**
- Reduced architectural duplication and confusion.

### 4) `docs/architecture-improvements/01-api-layer.md`

**What changed**
- Updated recommendation from mixed Axios/fetch phrasing to **fetch-first implementation**.
- Added implemented-status notes.
- Added this detailed file-by-file explanation section.

**Why**
- Keeps architecture docs synchronized with what is actually implemented.

**Impact**
- Easier for reviewers and future contributors to understand the rationale and changes quickly.

## Next API-layer Cleanup

- Replace hardcoded logout/login URL usage in UI with centralized auth endpoint config

## Example Structure
```text
src/api/
  client.ts
  services/
    base.service.ts
    activity.service.ts
    dashboard.service.ts
```
