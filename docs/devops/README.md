# DevOps

## Local

Docker Compose provides PostgreSQL, API and Web services.

```bash
docker compose up --build
```

## CI/CD

The current quality gate runs install, Prisma generation, lint, typecheck, tests and build. Deployment should later split into:

- Vercel for `apps/web`
- Railway for `apps/api` and PostgreSQL
- Cloudflare for DNS, WAF, caching and security headers

Rollback strategy: immutable deployment artifacts, database backward-compatible migrations and environment-level redeploy.
