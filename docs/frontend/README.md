# Frontend

## Principles

- Server Components by default; Client Components only for interaction.
- Feature-based routes and components under `src/features`.
- Atomic UI primitives live in `packages/ui`.
- Accessibility is a design constraint: semantic landmarks, visible focus, reduced-motion support.
- Performance is protected through minimal client boundaries and optimized package imports.

## Current Slice

- Landing (`src/features/landing`): Server Components composed in `landing-page.tsx`. The only
  client islands are `theme-toggle.tsx` (light/dark, persisted) and `agent-graph.tsx` (interactive
  multi-agent graph in the hero). Motion is plain CSS/SVG; there is no animation library.
- Content lives in `features/landing/data/perfil.ts`; `perfil.spec.ts` and `e2e/*.spec.ts` guard
  against publishing forbidden data, including metadata and the `<head>`.
- Site-wide metadata is in `shared/lib/metadata.ts`; `app/robots.ts` and `app/sitemap.ts` list
  `/`, `/cv` and `/cv/en`.
- CV (`src/features/cv`): printable resume in Spanish and English with its own styles (`cv.css`).

Design and decisions: [`rediseno-portafolio.md`](rediseno-portafolio.md).
