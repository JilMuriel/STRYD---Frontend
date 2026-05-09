# Architecture Improvements (Split Docs)

This folder separates the architecture recommendations into focused documents for easier review and implementation tracking.

## Contents

1. [01-api-layer.md](./01-api-layer.md)
2. [02-environment-configuration.md](./02-environment-configuration.md)
3. [03-state-management.md](./03-state-management.md)
4. [04-type-system-and-models.md](./04-type-system-and-models.md)
5. [05-error-handling-and-loading.md](./05-error-handling-and-loading.md)
6. [06-routing-and-code-splitting.md](./06-routing-and-code-splitting.md)
7. [07-component-architecture.md](./07-component-architecture.md)
8. [08-testing-infrastructure.md](./08-testing-infrastructure.md)
9. [09-build-and-development-config.md](./09-build-and-development-config.md)
10. [10-documentation-and-dx.md](./10-documentation-and-dx.md)
11. [11-implementation-priority-and-metrics.md](./11-implementation-priority-and-metrics.md)

## Notes

- Recommendations are aligned to **React 19**, **React Router 7**, and **TanStack Query 5**.
- Prefer incremental implementation by priority (High → Medium → Low).
- Keep `ARCHITECTURE_IMPROVEMENTS.md` as the full master document and use this folder for section-by-section execution.
