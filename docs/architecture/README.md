# Architecture

The portfolio is treated as a SaaS product, not a static brochure.

## System Shape

- `apps/web`: Next.js App Router frontend, server-first rendering and feature slices.
- `apps/api`: NestJS backend, modular boundaries and clean application use cases.
- `packages/ui`: reusable design-system primitives compatible with shadcn/ui conventions.
- `packages/types`: shared contracts consumed by web and api.
- `packages/utils`: small cross-cutting utilities with strict typing.
- `infrastructure`: Docker, nginx and operational scripts.

## Decisions

- Monorepo improves contract sharing and atomic changes across frontend/backend.
- Clean Architecture is applied where domain complexity exists; simple modules stay simple.
- Infrastructure implementations depend on application contracts, not the opposite.
- Prisma is the persistence standard, but API modules hide persistence behind repositories.
