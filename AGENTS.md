# Annotex agent rules

- Keep `main` protected: work on a short-lived branch and use pull requests.
- Never commit secrets, `.env` files, private keys, production URLs with credentials, or database dumps.
- Preserve Prisma as the backend persistence layer. Update `backend/prisma/schema.prisma` and create a reviewed migration for schema changes; do not hand-edit `backend/src/generated/prisma`.
- Run the relevant lint, build, and tests before committing. Do not claim a check passed when dependencies or infrastructure were unavailable.
- Keep Docker images reproducible with committed lockfiles and `npm ci`.
- Treat migrations, authentication, authorization, payouts, uploads, and deployment configuration as high-risk. Add tests and document operational impact.
- Do not delete, reset, force-push, rebase, or change remotes without explicit approval.
