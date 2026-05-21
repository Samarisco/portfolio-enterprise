# Frontend

## Principles

- Server Components by default; Client Components only for animation and interaction.
- Feature-based routes and components under `src/features`.
- Atomic UI primitives live in `packages/ui`.
- Accessibility is a design constraint: semantic landmarks, visible focus, reduced-motion support.
- Performance is protected through minimal client boundaries and optimized package imports.

## Current Slice

The landing page uses one client component because Framer Motion owns the initial interaction layer. Future content sections should split into server-rendered data components and isolated client islands only when needed.
