---
applyTo: "backend/**/*.ts,backend/prisma/**/*.prisma,backend/prisma/migrations/**/*.sql,backend/Dockerfile"
---

- Prisma is the source of truth for persistence. Create reviewed migrations for schema changes and use `prisma migrate deploy` in production.
- Keep `DATABASE_URL`, JWT secrets, CORS origins, and Solana wallet configuration environment-driven; never hard-code credentials.
- Preserve authentication and role checks on every protected route. Validate request input and avoid logging tokens, passwords, or wallet secrets.
- Add or update Jest coverage for behavior changes. Production container changes must keep startup, health checks, and migrations functional.
