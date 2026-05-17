# STRYD Frontend Architecture Blueprint (Project-Specific)

## 1) Goal

Define a **detailed, implementation-ready frontend architecture** for the current STRYD codebase (`React + TypeScript + Vite + TanStack Query + React Router`) that improves scalability, consistency, and delivery speed while preserving your existing feature-based structure.

---

## 2) Current State (What exists today)

Based on the current repository:

- `src/main.tsx` boots app with `Providers` + `RouterProvider`.
- `src/app/route.tsx` defines routes inline (`/`, `/dashboard`, `/activities/:id`).
- `src/app/ProtectedRoute.tsx` guards private pages by calling `useDashboard`.
- `src/api/client.ts` is the primary HTTP wrapper (`fetch`, env URL, 401 event).
- Feature modules exist and are mostly colocated:
  - `features/dashboard`
  - `features/activities`
  - `features/login`
- Shared area exists:
  - `shared/components`
  - `shared/lib`
  - `shared/utils`
- `store/` exists but is currently empty.

### Key strengths

1. Good base separation (`app`, `api`, `features`, `shared`)
2. Feature-first module organization already in place
3. TanStack Query already integrated
4. Core typing exists in feature folders

### Main architecture gaps

1. **Route config is centralized inline** (not route-module oriented)
2. **ProtectedRoute triggers dashboard query**, then dashboard page queries again (duplicated server-state read path)
3. **Top-level API and feature API folders coexist** without strict boundary rules
4. **Global state ownership rules are not defined** (`store/` empty)
5. **Cross-cutting standards** (errors, loading, telemetry, naming, dependency direction) are not codified in one source of truth

---

## 3) Target Architecture (Reference Model for this repo)

Use a **Feature-Sliced Modular Monolith** style with strict dependency direction:

`app -> pages/routes -> features -> entities/shared`

For your current scale, map this as:

- **App Layer**: initialization, providers, router assembly, app-wide boundaries
- **Domain Feature Layer**: dashboard, activities, login modules with colocated UI/hooks/api/model
- **Shared Infrastructure Layer**: HTTP, UI primitives, formatting, constants, utility helpers
- **Optional Client-State Layer (`store/`)**: UI/client-only state (not server state)

### Dependency rule

- `app/*` may import from `features/*` and `shared/*`
- `features/A/*` must not import from `features/B/*` directly (except through a documented shared contract)
- `features/*` may import from `shared/*` and `api/*` (or feature-local api abstraction)
- `shared/*` must never import from `features/*` or `app/*`

---

## 4) Proposed Folder Architecture

```text
src/
  app/
    main-shell/
      AppProviders.tsx
      AppRouter.tsx
      QueryClient.ts
    routes/
      public.routes.tsx
      protected.routes.tsx
      index.tsx
    guards/
      ProtectedRoute.tsx
    errors/
      AppErrorBoundary.tsx

  api/
    client.ts
    contracts/
      common.ts
      errors.ts
    services/
      auth.service.ts
      dashboard.service.ts
      activities.service.ts

  features/
    dashboard/
      pages/
        DashboardPage.tsx
      components/
      hooks/
        useDashboard.ts
      model/
        dashboard.types.ts
      api/
        dashboard.queries.ts

    activities/
      pages/
        ActivityDetailsPage.tsx
      components/
      hooks/
        useActivity.ts
      model/
        activity.types.ts
      api/
        activities.queries.ts

    login/
      pages/
        LoginPage.tsx
      model/
        auth.types.ts
      api/
        auth.commands.ts

  shared/
    components/
      feedback/
        LoadingState.tsx
        ErrorState.tsx
        EmptyState.tsx
      layout/
        Layout.tsx
      data-display/
    lib/
      query/
        queryKeys.ts
      logger/
        logger.ts
    utils/
      date/
        formatDate.ts

  store/
    ui.store.ts
    session.store.ts
```

> Note: this structure can be adopted incrementally; no big-bang rewrite required.

---

## 5) Runtime Architecture and Data Flow

### 5.1 App bootstrap flow

1. `main.tsx` mounts `AppErrorBoundary` -> `AppProviders` -> `RouterProvider`
2. `AppProviders` wires TanStack Query defaults + optional devtools
3. Router resolves route modules and lazy-loads feature pages

### 5.2 Auth/guard flow

Current guard uses `useDashboard` query as auth probe. Improve to:

- Introduce a lightweight `auth/session` check endpoint (or shared user endpoint)
- `ProtectedRoute` depends on `useSession()` (single auth source)
- Feature pages fetch their own data independent from guard

This removes duplicated dashboard dependency and creates cleaner ownership.

### 5.3 Server state flow (TanStack Query)

- Query ownership is feature-local (`features/*/api/*.queries.ts`)
- Query keys centralized in `shared/lib/query/queryKeys.ts`
- Mutations invalidate relevant keys only
- Keep server state in Query cache, not Zustand

### 5.4 Client/UI state flow (Zustand or local state)

Use `store/` only for:

- sidebar open/closed
- theme preference
- transient UI flags
- session UI metadata

Do **not** duplicate dashboard/activity payloads in store.

---

## 6) API Architecture Standards

### 6.1 Single transport abstraction

Keep `src/api/client.ts` as the only low-level transport adapter:

- base URL normalization
- credentials mode
- JSON encode/decode
- HTTP error normalization
- 401 event dispatch

### 6.2 Service boundary

Create domain services in `api/services/*`:

- `auth.service.ts`
- `dashboard.service.ts`
- `activities.service.ts`

Features consume typed service methods rather than constructing endpoints in UI/hooks.

### 6.3 Error contract

Define `ApiError` shape once (status, code, message, metadata) and convert transport errors to it before surfaces reach UI.

---

## 7) UI Composition Architecture

### 7.1 Page vs component separation

- `pages/*`: route entry + orchestration
- `components/*`: reusable feature-level presentational blocks
- `shared/components/*`: cross-feature primitives

### 7.2 Query-state rendering pattern

Standardize all async screens with one pattern:

1. loading state
2. error state
3. empty state
4. success state

Back with reusable shared feedback components for visual consistency.

### 7.3 Layout ownership

`shared/components/layout/Layout.tsx` remains shared shell wrapper.
Any logout or session command inside layout should call `auth.service` (no hardcoded absolute URL).

---

## 8) Routing Architecture

Move from single inline route array to route modules:

- `app/routes/public.routes.tsx`
- `app/routes/protected.routes.tsx`
- `app/routes/index.tsx`

### Routing standards

1. lazy-load all feature pages
2. add `*` fallback to `NotFoundPage`
3. isolate guard wrapping in protected route module
4. keep route constants in a shared route map (`shared/lib/routes.ts`)

---

## 9) Type Architecture

Define three type domains explicitly:

1. **API contracts** (`api/contracts/*`): transport/request/response/error types
2. **Feature model types** (`features/*/model/*`): UI/domain-focused shapes
3. **Shared primitives** (`shared/types/*` optional): reusable value objects

Guideline: avoid leaking raw API response shapes directly into UI components when mapping is needed.

---

## 10) Cross-Cutting Concerns

### 10.1 Logging

Introduce `shared/lib/logger/logger.ts` with env-aware logging.
Remove raw `console.log` from production components (e.g., current `ProtectedRoute`).

### 10.2 Error boundaries

Add app-level boundary (`app/errors/AppErrorBoundary.tsx`) and optional route-level boundaries for complex pages.

### 10.3 Performance

- route-level lazy loading
- stable query stale times
- avoid unnecessary re-renders via smaller component boundaries
- optional manual chunking in Vite for heavy libs

### 10.4 Quality gates

- ESLint with stricter TS rules
- architecture linting rules (import boundaries)
- test coverage for critical flows (auth guard, dashboard query rendering, activity details)

---

## 11) Architecture Decision Records (ADRs) to add

Create `docs/adr/` with concise records:

1. ADR-001: Feature-first modular architecture
2. ADR-002: TanStack Query owns server state
3. ADR-003: Zustand limited to client/UI state
4. ADR-004: Single HTTP client abstraction
5. ADR-005: Route-module + lazy loading strategy

This prevents architectural drift as the team grows.

---

## 12) Phased Implementation Roadmap

## Phase 1 — Stabilize Foundations (High Priority)

Deliverables:

1. Query client defaults in `Providers`
2. App-level error boundary
3. Remove debug logs and hardcoded endpoint usage
4. Create shared query state UI components

Success criteria:

- Consistent loading/error rendering in dashboard + activity pages
- No direct hardcoded API URLs in components
- No production `console.log` in guards/core flows

## Phase 2 — Formalize Module Boundaries (High Priority)

Deliverables:

1. Route modules + lazy loading
2. Service layer under `api/services`
3. Feature-local query modules (`*.queries.ts`)
4. Query key registry

Success criteria:

- Routes are lazy-loaded
- Features rely on typed services/query modules
- Query keys are centralized and reusable

## Phase 3 — State Ownership and DX (Medium Priority)

Deliverables:

1. Session/auth probe hook for guard
2. Optional Zustand UI/session store
3. Path aliases + import cleanup
4. Architecture boundary linting

Success criteria:

- Guard no longer depends on dashboard data query
- No server-state duplication in client store
- Import paths become clearer/shorter

## Phase 4 — Testing + Governance (Medium Priority)

Deliverables:

1. Vitest + RTL setup
2. Critical path tests
3. ADR documentation

Success criteria:

- Auth route protection tested
- Dashboard and activity data states tested
- Architecture decisions documented and reviewable

---

## 13) Definition of Done (for Architecture Adoption)

Architecture rollout is considered complete when:

1. Route, API, feature, and shared layers follow documented boundaries
2. Auth/session flow is decoupled from dashboard query
3. Async UI states are standardized
4. Server vs client state ownership is explicit and enforced
5. Team documentation (this blueprint + ADRs) is up to date

---

## 14) Immediate Next Actions (Practical)

If you want to execute this architecture now, implement in this order:

1. `app/errors/AppErrorBoundary.tsx`
2. Query defaults in `app/providers.tsx`
3. Route modularization + lazy loading
4. Add `api/services/*` and shift feature hooks to use them
5. Replace guard dashboard probe with session probe hook

This gives the highest impact with minimal disruption.
