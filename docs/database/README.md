# Database

## PostgreSQL + Prisma

The initial schema covers:

- users and roles for future admin/CMS authentication
- projects for showcase and case studies
- blog posts for technical writing
- analytics events for product telemetry

Migrations should be generated with:

```bash
pnpm db:migrate
```

Production migrations must run in CI/CD as a controlled release step with rollback notes.
