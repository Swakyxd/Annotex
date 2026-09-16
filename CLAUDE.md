# Annotex Project & Infrastructure Guide (CLAUDE.md)

This file provides guidance and full context to Claude Code (`claude.ai/code`) when working with the Annotex codebase, local database, cloud deployment, and recent technical work.

---

## 1. Project Overview & Architecture

Annotex is a full-stack, transparent, crowdsourced data labeling platform with role-based access control (Admin, Contributor, Validator) and Solana blockchain micro-rewards.

### Three-Tier Architecture
- **Frontend** (`frontend/`):
  - Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + Lucide Icons
  - NextAuth.js session handling (`lib/auth-options.ts`, `app/api/auth/[...nextauth]/route.ts`)
  - Route groups: `(auth)` for login/register, `(app)/dashboard/*` for authenticated roles
  - Role-based UI gating (`components/rbac/`, `lib/role-utils.ts`)
  - Standalone Docker packaging (`output: "standalone"` in `next.config.ts`)
- **Backend** (`backend/`):
  - Node.js ≥ 20.19, Express.js, TypeScript with ESM/NodeNext (`.js` extensions on imports)
  - Prisma ORM (`backend/prisma/schema.prisma`), client generated in `backend/src/generated/prisma`
  - Layered architecture: `routes/` → `controllers/` → `services/` → Prisma DB
  - Security: Helmet, CORS, rate limiting (`middlewares/rateLimiter.ts`), Winston logger, Zod request validation
  - API Docs: Swagger UI mounted on `/api-docs`
- **Database**: PostgreSQL 16 (local docker or RDS/production docker container)
- **Blockchain**: Solana Web3 / Solana Pay (Devnet) for contributor task rewards (`services/blockchain.service.ts`)

### Workspace Context
This directory is a **git worktree** of the Annotex repo (`origin` = `github.com/myaumyauverse/Annotex.git`), checked out on `main` and tuned for production deployment. It adds:
- `DEPLOYMENT.md` and `deploy/` (EC2 bootstrap + backup scripts)
- `docker-compose.prod.yml` and `.env.production.example`
- `.github/workflows/ci.yml` (automated CI pipeline)

---

## 2. Database Schema & Core Entities

PostgreSQL database managed by Prisma in `backend/prisma/schema.prisma`:

1. **User (`users`)**:
   - `id` (UUID), `email` (unique), `password` (bcrypt), `firstName`, `lastName`
   - `role`: `"admin" | "validator" | "contributor"`
   - `walletAddress`: Solana public key
   - `totalEarnings`, `tasksCompleted`, `accuracyRate`
   - *Note*: First admin must be manually promoted in the database (signup defaults to contributor).
2. **Dataset (`datasets`)**:
   - `id`, `name`, `description`, `format`, `filePath`, `labelType` (`text`, `image_bbox`, `classification`)
   - `totalRecords`, `labeledRecords`, `totalRewardSOL`, `rewardPerRecord`
   - `maxLabelsPerRecord` (default 3), `consensusThreshold` (default 0.67)
   - `createdById` → User
3. **DataRecord (`data_records`)**:
   - `id`, `datasetId`, `content` (JSON raw data/URL), `status` (`pending`, `completed`, `rejected`)
   - `requiredLabels`, `currentLabels`, `consensusLabel` (JSON)
4. **Task (`tasks`)**:
   - `id`, `datasetId`, `recordId`, `assignedToId` → User
   - `status`: `"assigned" | "in_progress" | "submitted" | "validated" | "rejected" | "expired"`
   - `rewardSOL`, `timeSpentSeconds`, `deadline`
5. **Label (`labels`)**:
   - `id`, `taskId`, `recordId`, `userId`, `labelData` (JSON)
   - `isAccepted` (boolean consensus result), `confidenceScore`
6. **Payout (`payouts`) & Transaction (`transactions`)**:
   - Solana devnet transaction signatures, micro-reward tracking, status (`pending`, `processing`, `completed`, `failed`).

---

## 3. Cloud Deployment (AWS EC2 & Production Architecture)

Detailed in `DEPLOYMENT.md` (and `deploy/ec2-bootstrap.sh`):

### EC2 Production Stack
```text
[ Internet User ] ──► HTTPS (Port 443) ──► Nginx Reverse Proxy
                                                ├── /api/*      ──► Backend (Port 5000)
                                                ├── /api-docs   ──► Swagger UI (Port 5000)
                                                └── /*          ──► Frontend (Port 3000)
                                                                       │
                                                                       ▼
                                                           PostgreSQL Container (Port 5432)
```

### Key Deployment Details
- **Docker Compose**: `docker-compose.prod.yml` runs 3 isolated services:
  - `db`: `postgres:16-alpine` with healthcheck, persistent volume `postgres_data`, internal network only.
  - `backend`: Runs `prisma migrate deploy` on boot before starting Express on port 5000.
  - `frontend`: Next.js standalone container on port 3000.
- **Environment Variables**:
  - `DIRECT_URL`: Used by Prisma migrations (`prisma migrate deploy`).
  - `DATABASE_URL`: Connection string used by backend application.
  - `NEXT_PUBLIC_API_BASE_URL`: Compiled into the frontend bundle at **build** time.
- **Nginx & SSL**:
  - Let's Encrypt SSL via Certbot.
  - Reverse proxy blocks, proxy headers (`X-Forwarded-For`, `X-Forwarded-Proto`), client max body size 20M for dataset uploads.
- **Automated Bootstrap & Backups**:
  - `deploy/ec2-bootstrap.sh`: Automates Ubuntu 24.04 setup, Docker installation, swap file configuration, and security.
  - `deploy/backup.sh`: Automated daily pg_dump database snapshots.

---

## 4. Key Work Done Till Now & Recent Fixes

When modifying code, keep these recent changes and patterns in mind:

1. **Task Dashboard & Workflow**:
   - Scrollable task queue with dynamic progress bar and real-time accuracy calculation based on accepted vs rejected labels.
   - Rejection cascading: When a validator rejects a task, dependent tasks and consensus status update cleanly.
   - Assignment pipeline: Fixed 403 authorization issues when contributor requests assigned tasks.
2. **Backend API Validation & Security**:
   - Zod schema validation added across all request bodies.
   - Rate limiting tuned to prevent false 429 errors during dashboard polling.
   - Swagger OpenAPI 3.0 docs configured and served on `/api-docs` with relative server paths.
3. **Frontend Hydration & Stability**:
   - Suppressed hydration mismatch warnings on theme/dynamic client components (e.g., password toggle in `auth-form.tsx`, `layout.tsx`).
   - Clean NextAuth JWT propagation across API requests using Axios interceptors.
4. **CI/CD Pipeline**:
   - GitHub Actions (`.github/workflows/ci.yml`) fully green on `main`: Runs lint, build, Prisma migration, and Jest integration tests on every PR.
   - Main branch is protected; changes must pass CI.

---

## 5. Daily Development & Operational Commands

### Development
```bash
# Start local Postgres DB:
docker compose up -d

# Start Backend (watches src/):
cd backend && npm run dev

# Start Frontend:
cd frontend && npm run dev
```

### Database & Prisma
```bash
cd backend
npm run prisma:generate   # Regenerate Prisma Client into src/generated/prisma
npm run prisma:migrate    # Create/apply new local migration
npm run prisma:deploy     # Apply migrations in production (reads DIRECT_URL)
npx prisma studio         # Visual web interface for database inspection
```

### Testing & Quality Checks
```bash
# Backend tests (Jest against test DB):
cd backend && npm test
cd backend && npm test -- src/tests/validation.service.test.ts

# Linter & formatter:
cd backend && npm run lint && npm run format
cd frontend && npm run lint
```

### Production Build & Verification
```bash
cd backend && npm run build    # tsc && cp -r src/generated dist/
cd frontend && npm run build   # next build (creates standalone bundle)
```

---

## 6. Critical Rules for Claude Code

1. **TypeScript ESM**: In `backend/src/`, all relative imports MUST include the `.js` extension (e.g., `import { prisma } from "./lib/prisma.js";`).
2. **Never Edit Generated Code**: Never hand-edit files in `backend/src/generated/prisma`. Modify `schema.prisma` and run `npm run prisma:migrate`.
3. **Protect Secrets**: Never hardcode private keys, JWT secrets, database passwords, or production credentials in source code.
4. **Frontend API URL**: Changing `NEXT_PUBLIC_API_BASE_URL` requires a complete frontend rebuild (`npm run build`), not just a container restart.
5. **Admin Role Promotion**: The signup endpoint never creates admins. First admin must be promoted via DB:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'admin@annotex.com';
   ```
