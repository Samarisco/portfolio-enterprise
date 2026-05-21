# Backend

## Principles

- NestJS modules map to product capabilities.
- Controllers handle transport concerns only.
- Use cases contain application orchestration.
- Repositories are interfaces at the domain boundary.
- Infrastructure implementations can evolve from in-memory to Prisma without changing controllers.
- Validation pipes reject malformed input at the edge.

## Current Slice

`ProjectsModule` exposes `GET /projects/featured` through a use case and repository contract. The first implementation is in-memory for fast product iteration; Prisma schema is already present for the persistent implementation.
