# Engineering Rules

## Non-negotiables

- Strict TypeScript across apps and packages.
- No `any`; model unknown input explicitly and validate at boundaries.
- Feature-based frontend architecture and module-based backend architecture.
- Server Components by default in Next.js; Client Components only for interaction.
- DTOs and validation pipes at API boundaries.
- Repository interfaces in application/domain, implementations in infrastructure.
- Secrets never committed; use environment variables and managed secret stores.
- Accessibility, SEO, security headers and performance budgets are product requirements.

## Definition of Done

- Code compiles and passes lint, typecheck and tests.
- Public routes include metadata and accessible semantic structure.
- API changes include DTO validation and error handling.
- Database changes include Prisma schema updates and migration notes.
- Security impact is documented for auth, cookies, CORS, CSP and data exposure.
- New product behavior has at least one meaningful automated test.
