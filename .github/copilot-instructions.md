# Annotex Copilot instructions

Annotex is a Next.js frontend (`frontend/`) and Express/Prisma/PostgreSQL backend (`backend/`).

- Use TypeScript and existing project conventions. Prefer small, focused changes.
- Backend imports use NodeNext ESM with `.js` relative import extensions.
- Prisma schema changes require a migration. Do not manually modify generated Prisma client files.
- Authentication, RBAC, wallet/payout logic, upload handling, and environment configuration are security-sensitive: validate input, retain authorization checks, and add or update tests.
- Never introduce secrets or weaken production environment validation. Use `.env.example` files for documented placeholders only.
- Run the narrowest relevant checks: frontend lint/build; backend lint/build/test. Keep Docker builds reproducible with `npm ci`.
- Do not modify `main`, use force-push, or discard existing work.
