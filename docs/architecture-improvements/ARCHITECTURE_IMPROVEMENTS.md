# Architecture Improvements for Scalability

## Executive Summary

This document outlines architectural improvements for the STRYD Frontend application to enhance scalability, maintainability, and developer experience as the project grows. The analysis covers current state, identified issues, and recommended changes.

**Analysis Date:** May 9, 2026  
**Project:** STRYD - Cyclist Progress Tracker Frontend  
**Tech Stack:** React 19, TypeScript 6, Vite 8, TanStack Query 5, React Router 7, Zustand, Tailwind CSS 4

---

## Current Architecture Overview

### Project Structure
```
src/
├── api/              # API client and endpoint functions
├── app/              # App configuration (routes, providers, guards)
├── assets/           # Static assets
├── features/         # Feature-based modules
│   ├── activities/
│   ├── dashboard/
│   └── login/
├── shared/           # Shared components and utilities
└── store/            # State management (currently empty)
```

### Strengths
✅ **Feature-based architecture** - Good separation of concerns  
✅ **Modern tech stack** - React 19, TypeScript 6, TanStack Query  
✅ **Type safety** - TypeScript usage throughout  
✅ **Colocation** - Features contain their own types, hooks, and components  

---

## Critical Issues & Recommendations

### 1. **API Layer Architecture** 🔴 HIGH PRIORITY

#### Issues:
- **Inconsistent API clients**: Two different fetch implementations (`fetcher` and `apiClient`)
- **Hardcoded URLs**: Logout URL hardcoded in Layout component
- **No centralized error handling**: Each API call handles errors differently
- **No request/response interceptors**: Missing authentication token handling, logging, etc.
- **Mixed concerns**: API functions in both `/api` and feature-specific folders

#### Current Code:
```typescript
// src/api/client.ts - Basic fetcher
export const fetcher = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    credentials: "include",
  });
  if (res.status === 401) {
    window.location.href = "/"; // Side effect in API layer
    throw new Error("Unauthorized");
  }
  // ...
};

// src/shared/lib/apiClients.ts - Different implementation
export const apiClient = async (url: string) => {
  const res = await fetch(url, { credentials: "include" })
  // Different error handling
};
```

#### Recommendations:

**A. Consolidate to a Single HTTP Client (fetch wrapper _or_ Axios)**

> React 19 does not require Axios. Best practice is consistency and centralized behavior (auth, errors, retries, parsing), whether implemented with `fetch` or Axios.

```typescript
// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth tokens, logging, etc.
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Centralized auth handling
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

Alternative (native `fetch`) is equally valid:

```typescript
// src/api/client.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });

  if (response.status === 401) {
    window.dispatchEvent(new CustomEvent('auth:logout'));
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return (await response.json()) as T;
}
```

**B. Create API Service Layer**
```typescript
// src/api/services/base.service.ts
export class BaseService {
  protected async get<T>(endpoint: string): Promise<T> {
    return apiClient.get(endpoint);
  }
  
  protected async post<T>(endpoint: string, data?: any): Promise<T> {
    return apiClient.post(endpoint, data);
  }
  
  // ... other methods
}

// src/api/services/activity.service.ts
export class ActivityService extends BaseService {
  async getActivity(id: string) {
    return this.get<ActivityDetails>(`/activities/${id}`);
  }
  
  async syncActivities() {
    return this.post('/dashboard/sync');
  }
}

export const activityService = new ActivityService();
```

---

### 2. **Environment Configuration** 🔴 HIGH PRIORITY

#### Issues:
- **Hardcoded API URLs**: Logout URL hardcoded in Layout component
- **No environment validation**: Missing runtime checks for required env vars
- **Inconsistent access**: Direct `import.meta.env` usage scattered throughout

#### Current Code:
```typescript
// src/shared/components/Layout.tsx
const handleLogout = () => {
  window.location.href = "https://stryd-backend.onrender.com/api/auth/logout";
};
```

#### Recommendations:

**A. Create Environment Config Module**
```typescript
// src/config/env.ts
interface EnvConfig {
  apiUrl: string;
  environment: 'development' | 'production' | 'staging';
  features: {
    enableAnalytics: boolean;
    enableDebugMode: boolean;
  };
}

function validateEnv(): EnvConfig {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (!apiUrl) {
    throw new Error('VITE_API_URL is required');
  }
  
  return {
    apiUrl,
    environment: import.meta.env.MODE as any,
    features: {
      enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
      enableDebugMode: import.meta.env.MODE === 'development',
    },
  };
}

export const env = validateEnv();
```

**B. Create API Endpoints Config**
```typescript
// src/config/api.config.ts
import { env } from './env';

export const API_ENDPOINTS = {
  auth: {
    login: `${env.apiUrl}/auth/strava`,
    logout: `${env.apiUrl}/auth/logout`,
  },
  dashboard: `${env.apiUrl}/dashboard`,
  activities: {
    list: `${env.apiUrl}/activities`,
    detail: (id: string) => `${env.apiUrl}/activities/${id}`,
    sync: `${env.apiUrl}/dashboard/sync`,
  },
} as const;
```

---

### 3. **State Management** 🟡 MEDIUM PRIORITY

#### Issues:
- **Empty store folder**: Zustand installed but not used
- **Prop drilling**: Dashboard data fetched in ProtectedRoute but used elsewhere
- **No global state**: User data, auth state scattered across components
- **Duplicate queries**: Dashboard query called in both ProtectedRoute and DashboardPage

#### Current Code:
```typescript
// src/app/ProtectedRoute.tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useDashboard(); // Query #1
  // ...
};

// src/features/dashboard/DashboardPage.tsx
const Dashboard = () => {
  const { data, isLoading, isError } = useDashboard(); // Query #2 (duplicate)
  // ...
};
```

#### Recommendations:

> React 19 best practice: keep **server state** in TanStack Query and use Zustand only for **client/UI state** (theme, drawer state, transient selections). Avoid duplicating query data in Zustand.

**A. Create Auth Store**
```typescript
// src/store/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuth: (user) => set({ isAuthenticated: true, user }),
      clearAuth: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

**B. Create UI Store for Global UI State**
```typescript
// src/store/ui.store.ts
import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  theme: 'light',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTheme: (theme) => set({ theme }),
}));
```

---

### 4. **Type System & Data Models** 🟡 MEDIUM PRIORITY

#### Issues:
- **Scattered type definitions**: Types defined in feature folders only
- **No shared models**: Common types like metrics duplicated
- **Inline types**: Some components use inline type definitions
- **No API response types**: Missing request/response type definitions

#### Recommendations:

**A. Create Shared Type Definitions**
```typescript
// src/types/models/metrics.ts
export interface Metrics {
  ctl: number;  // Chronic Training Load
  atl: number;  // Acute Training Load
  tsb: number;  // Training Stress Balance
}

// src/types/models/activity.ts
export interface Activity {
  id: string;
  name: string;
  distance: number;
  duration: number;
  tss: number;
  avgPower?: number | null;
}

export interface ActivityDetails extends Activity {
  insight: ActivityInsight;
  metric?: Metrics | null;
}

export interface ActivityInsight {
  type: string;
  fatigue: string;
  effort: string;
  message: string;
}

// src/types/models/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  stravaId: string;
}
```

**B. Create API Contract Types**
```typescript
// src/types/api/responses.ts
import { Activity, ActivityDetails, Metrics } from '../models';

export interface DashboardResponse {
  metrics: Metrics;
  chart: ChartDataPoint[];
  recentActivities: Activity[];
}

export interface ChartDataPoint {
  date: string;
  ctl: number;
  atl: number;
  tsb: number;
  hasRide?: boolean;
  tss?: number;
}

// src/types/api/requests.ts
export interface SyncActivitiesRequest {
  startDate?: string;
  endDate?: string;
}
```

---

### 5. **Error Handling & Loading States** 🟡 MEDIUM PRIORITY

#### Issues:
- **Inconsistent error UI**: Different error messages across components
- **Basic loading states**: Simple "Loading..." text
- **No error boundaries**: Missing React error boundaries
- **No retry logic**: Failed requests not retryable by user

#### Recommendations:

**A. Create Error Boundary Component**
```typescript
// src/shared/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry for the inconvenience</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**B. Create Reusable Error and Loading Components**
```typescript
// src/shared/components/QueryStateHandler.tsx
interface Props {
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  isEmpty?: boolean;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  children: ReactNode;
}

export const QueryStateHandler = ({
  isLoading,
  isError,
  error,
  isEmpty,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}: Props) => {
  if (isLoading) {
    return loadingComponent || <LoadingSpinner />;
  }

  if (isError) {
    return errorComponent || <ErrorMessage error={error} />;
  }

  if (isEmpty) {
    return emptyComponent || <EmptyState />;
  }

  return <>{children}</>;
};
```

**C. Configure TanStack Query Defaults**
```typescript
// src/app/providers.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
```

---

### 6. **Routing & Code Splitting** 🟡 MEDIUM PRIORITY

#### Issues:
- **No lazy loading**: All routes loaded upfront
- **No route guards abstraction**: ProtectedRoute logic could be more flexible
- **No route configuration**: Routes defined inline
- **Missing 404 page**: No catch-all route

#### Recommendations:

> Since this project uses **React Router 7**, prefer Data Router patterns (route modules + `lazy`) and route-level pending/error UI instead of putting all async UI handling in a single top-level `Suspense`.

**A. Implement Route-level Lazy Loading (Router v7 style)**
```typescript
// src/app/routes.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { default: Login } = await import('../features/login/Login');
      return { element: <PublicRoute><Login /></PublicRoute> };
    },
  },
  {
    path: '/dashboard',
    lazy: async () => {
      const { default: Dashboard } = await import('../features/dashboard/DashboardPage');
      return { element: <ProtectedRoute><Dashboard /></ProtectedRoute> };
    },
  },
  {
    path: '/activities/:id',
    lazy: async () => {
      const { default: ActivityDetails } = await import('../features/activities/ActivityDetailsPage');
      return { element: <ProtectedRoute><ActivityDetails /></ProtectedRoute> };
    },
  },
  {
    path: '/404',
    lazy: async () => {
      const { default: NotFound } = await import('../features/errors/NotFoundPage');
      return { element: <NotFound /> };
    },
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);
```

**B. Keep App-level Error Boundary; Use Route Pending/Error UI**
```typescript
// src/main.tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { Providers } from './app/providers';
import { ErrorBoundary } from './shared/components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ErrorBoundary>
  </StrictMode>
);
```

In route modules, define `HydrateFallback` / pending UI and `ErrorBoundary` where needed for granular loading/error behavior.

---

### 7. **Component Architecture** 🟢 LOW PRIORITY

#### Issues:
- **Inline styles**: Some Tailwind classes could be extracted
- **No component composition**: Limited use of compound components
- **Hardcoded values**: Magic numbers and strings in components
- **Console.logs**: Debug logs left in production code

#### Recommendations:

**A. Extract Constants**
```typescript
// src/features/dashboard/constants/metrics.ts
export const METRIC_THRESHOLDS = {
  FRESH: 10,
  BALANCED_MIN: -10,
  PRODUCTIVE_MIN: -25,
  FATIGUED: -30,
} as const;

export const METRIC_COLORS = {
  FITNESS: '#3b82f6',
  FATIGUE: '#ef4444',
  FORM: '#22c55e',
} as const;

export const METRIC_LABELS = {
  CTL: 'Fitness (CTL)',
  ATL: 'Fatigue (ATL)',
  TSB: 'Form (TSB)',
} as const;
```

**B. Create Compound Components**
```typescript
// src/shared/components/Card/Card.tsx
export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-2xl p-4 shadow-sm ${className}`}>
    {children}
  </div>
);

Card.Header = ({ children }: { children: ReactNode }) => (
  <h2 className="text-lg font-semibold mb-4">{children}</h2>
);

Card.Body = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

// Usage
<Card>
  <Card.Header>Recent Rides</Card.Header>
  <Card.Body>
    {/* content */}
  </Card.Body>
</Card>
```

**C. Remove Debug Code**
```typescript
// Remove all console.logs from production
// Add proper logging utility instead

// src/shared/utils/logger.ts
const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => isDev && console.log(...args),
  error: (...args: any[]) => console.error(...args),
  warn: (...args: any[]) => isDev && console.warn(...args),
};
```

---

### 8. **Testing Infrastructure** 🔴 HIGH PRIORITY

#### Issues:
- **No tests**: No testing framework configured
- **No test files**: Zero test coverage
- **No CI/CD**: Missing automated testing pipeline

#### Recommendations:

**A. Add Testing Dependencies (React 19 compatible; avoid pinning stale majors)**
```json
// package.json
{
  "devDependencies": {
    "@testing-library/react": "<latest React 19-compatible>",
    "@testing-library/jest-dom": "<latest>",
    "@testing-library/user-event": "<latest>",
    "@vitest/ui": "<latest>",
    "vitest": "<latest>",
    "jsdom": "<latest>"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

> Use current versions from npm at implementation time to prevent this document from becoming outdated.

**B. Configure Vitest**
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**C. Create Test Utilities**
```typescript
// src/test/utils/test-utils.tsx
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient();
  
  return (
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
```

---

### 9. **Build & Development Configuration** 🟢 LOW PRIORITY

#### Issues:
- **No path aliases**: Relative imports can get messy
- **No bundle analysis**: Can't identify large dependencies
- **Basic Vite config**: Missing optimizations

#### Recommendations:

**A. Add Path Aliases**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, './src/api'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'chart-vendor': ['echarts', 'echarts-for-react'],
        },
      },
    },
  },
});
```

**B. Update TypeScript Config**
```json
// tsconfig.app.json
{
  "compilerOptions": {
    // ... existing config
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@api/*": ["./src/api/*"],
      "@features/*": ["./src/features/*"],
      "@shared/*": ["./src/shared/*"],
      "@store/*": ["./src/store/*"],
      "@types/*": ["./src/types/*"],
      "@config/*": ["./src/config/*"]
    }
  }
}
```

---

### 10. **Documentation & Developer Experience** 🟢 LOW PRIORITY

#### Issues:
- **Minimal README**: Basic project info only
- **No component documentation**: Missing prop documentation
- **No architecture docs**: This is the first architecture document
- **No contribution guidelines**: Missing for team collaboration

#### Recommendations:

**A. Enhance README**
```markdown
# STRYD - Cyclist Progress Tracker

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Project Structure
- `/src/api` - API client and services
- `/src/features` - Feature modules (dashboard, activities, etc.)
- `/src/shared` - Shared components and utilities
- `/src/store` - Global state management
- `/src/types` - TypeScript type definitions

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Lint code

## Environment Variables
See `.env.example` for required variables.
```

**B. Add JSDoc Comments**
```typescript
/**
 * Fetches activity details by ID
 * @param id - The activity ID
 * @returns Promise resolving to activity details
 * @throws {Error} When activity is not found
 */
export const getActivity = (id: string): Promise<ActivityDetails> => {
  return apiClient.get(`/activities/${id}`);
};
```

---

## Implementation Priority

### Phase 1: Foundation (Week 1-2) 🔴
1. ✅ Consolidate API clients
2. ✅ Set up environment configuration
3. ✅ Configure TanStack Query defaults
4. ✅ Add error boundaries
5. ✅ Set up testing infrastructure

### Phase 2: Architecture (Week 3-4) 🟡
1. ✅ Implement shared type system
2. ✅ Create state management stores
3. ✅ Add lazy loading and code splitting
4. ✅ Implement path aliases
5. ✅ Create reusable components

### Phase 3: Polish (Week 5-6) 🟢
1. ✅ Extract constants and configurations
2. ✅ Remove debug code
3. ✅ Write tests for critical paths
4. ✅ Improve documentation
5. ✅ Add bundle analysis

---

## Metrics for Success

### Before Improvements
- ❌ No tests (0% coverage)
- ❌ 2 different API clients
- ❌ Hardcoded URLs in components
- ❌ No error boundaries
- ❌ All routes loaded upfront
- ❌ Duplicate API calls

### After Improvements
- ✅ >70% test coverage
- ✅ Single, consistent API client
- ✅ Centralized configuration
- ✅ Error boundaries on all routes
- ✅ Lazy-loaded routes
- ✅ Optimized query caching

---

## Long-term Scalability Considerations

### As the Project Grows

1. **Micro-frontends**: Consider splitting into separate apps if features become too large
2. **Monorepo**: Use tools like Turborepo or Nx for managing multiple packages
3. **Design System**: Extract shared components into a separate package
4. **API Mocking**: Use MSW (Mock Service Worker) for development and testing
5. **Performance Monitoring**: Add tools like Sentry, LogRocket, or DataDog
6. **Internationalization**: Prepare for i18n with react-i18next
7. **Accessibility**: Implement ARIA labels and keyboard navigation
8. **PWA Features**: Add offline support and push notifications

---

## Conclusion

These improvements will transform the STRYD frontend from a functional prototype into a production-ready, scalable application. The recommended changes focus on:

- **Consistency**: Unified patterns across the codebase
- **Maintainability**: Clear structure and documentation
- **Scalability**: Prepared for growth in features and team size
- **Quality**: Testing and error handling
- **Performance**: Code splitting and optimization

Implementing these changes incrementally will minimize disruption while steadily improving the codebase quality.

---

## React 19 Alignment Notes (Review Outcome)

The recommendations are generally strong, with the following React 19 / ecosystem updates applied:

1. **HTTP layer**: Updated from “Axios only” to “single client strategy” (Axios _or_ fetch wrapper).
2. **Router guidance**: Adjusted examples to **React Router 7** route-level lazy patterns.
3. **Suspense usage**: Clarified that route-level pending/error UI is preferred with Data Router patterns.
4. **State ownership**: Reinforced separation of Query server state vs Zustand UI/client state.
5. **Testing stack**: Replaced stale hard-pinned versions with “latest React 19-compatible”.

---

**Document Version:** 1.0  
**Last Updated:** May 9, 2026  
**Next Review:** June 9, 2026
