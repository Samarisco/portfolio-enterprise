# Portfolio Enterprise

Portfolio full stack premium construido como una plataforma SaaS enterprise: monorepo, Next.js App Router, NestJS, PostgreSQL, Prisma, Docker, CI/CD, testing y documentacion tecnica continua.

## Sprint 0 Scope

- Monorepo con `apps/web`, `apps/api` y paquetes compartidos.
- Landing premium inicial orientada a producto, no template generico.
- API NestJS modular con capas limpias y endpoints de health/projects.
- Prisma schema para portfolio, blog, usuarios y analytics.
- Docker Compose local con PostgreSQL, API y Web.
- GitHub Actions para quality gate.
- Documentacion base de arquitectura, seguridad, testing y Scrum.

## Commands

```bash
pnpm install
pnpm db:generate
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
```

## Local Services

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- Health: `http://localhost:4000/health`

## Architecture Principle

Cada modulo se disena como una unidad de producto: dominio claro, contratos tipados, seguridad por defecto, rendimiento medible y documentacion de decisiones importantes.
