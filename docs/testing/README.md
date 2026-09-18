# Testing Annotex

A practical guide for someone who has not done platform testing before. Start at
[Setup](#setup), then read [The six kinds of testing](#the-six-kinds-of-testing) to see where
each piece fits.

---

## The one rule that matters most

**The backend tests run against a real database and delete rows.**

There is no mock. `prisma.user.create()` and `prisma.user.deleteMany()` in the test suite are real
writes and real deletes. Point them at a shared or hosted database and you will destroy real data.

`backend/.env` has historically held a **Neon cloud** URL, so this is not hypothetical. The test
setup now refuses to start if it detects a hosted provider:

```
Refusing to run tests against what looks like a hosted database (neon.tech).
```

If you ever see that message, the guard just saved you. Fix `backend/.env.test` rather than
working around it.

---

## Setup

You need this once.

**1. Docker Desktop** — the tests need a throwaway Postgres. WSL 2 is already enabled on this
machine, so the installer should just work. Verify:

```bash
docker --version
```

**2. `zip`** — [`hardening.test.ts`](../../backend/src/__tests__/hardening.test.ts) shells out to
it to build a zip-bomb fixture. `unzip` is already present; `zip` is not. Install via
`choco install zip`, or Git Bash's optional Unix tools.

**3. The test database config:**

```bash
cd backend
cp .env.test.example .env.test
```

Never edit `.env.test` to point somewhere shared. That is the whole point of it existing.

**4. Start the database and create the schema:**

```bash
npm run db:test:up          # starts Postgres on port 5433
npm run prisma:deploy       # creates the tables
```

Port 5433, not 5432, so it cannot collide with a Postgres you already have running.

---

## Running tests

From `backend/`:

| Command | What it does | Needs a database? |
|---|---|---|
| `npm run test:unit` | Schema/validation tests only. Fast — under a second. | No |
| `npm test` | Everything, with a coverage report. | **Yes** |
| `npm run test:watch` | Re-runs on save. The one to use while writing tests. | Yes |
| `npm run typecheck:tests` | Type-checks test files without running them. | No |
| `npm run lint` | ESLint over source *and* tests. | No |

Start with `npm run test:unit`. It needs nothing installed and proves your setup works.

When you're done: `npm run db:test:down`.

### Why `--runInBand` is not optional

CI runs `npm test -- --runInBand`, which means "one test file at a time, no parallelism".

Every suite shares one database and cleans up by deleting every user whose email contains
`@annotex.dev`. Run two files at once and they delete each other's fixtures mid-test, producing
failures that move around each run. If you see tests that only fail sometimes, check this first.

---

## Writing a test

Reuse the helpers in [`src/__tests__/helpers/`](../../backend/src/__tests__/helpers/) rather than
rolling your own setup.

```ts
import { afterAll, beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import type { Application } from 'express';
import request from 'supertest';

import { disconnectPrisma } from '../config/prisma.js';
import { UserRole } from '../types/index.js';
import { cleanupTestUsers, seedUser } from './helpers/testData.js';

describe('Example', () => {
  let app: Application;

  beforeAll(async () => {
    const { createTestApp } = await import('./helpers/createTestApp.js');
    app = await createTestApp();
  });

  beforeEach(cleanupTestUsers);
  afterAll(async () => {
    await cleanupTestUsers();
    await disconnectPrisma();
  });

  it('rejects a contributor', async () => {
    const contributor = await seedUser(UserRole.CONTRIBUTOR);

    const res = await request(app).get('/api/v1/users').set(contributor.headers);

    expect(res.status).toBe(403);
  });
});
```

Three things that will trip you up:

**Relative imports need a `.js` suffix**, even though the file is `.ts`. The project is ESM with
`NodeNext` resolution, and Jest maps the extension away. `../config/prisma.js` is correct;
`../config/prisma` will not resolve.

**Import the app inside `beforeAll`, not at the top.** `config/index.ts` reads environment
variables at module scope, so it has to load *after* the test setup has set them. That is the only
reason `createTestApp()` is async.

**`seedUser()` writes to the database directly**, and it has to. Registration always assigns
`contributor`; becoming a `validator` requires an existing admin; and nothing in the application
can create an admin at all. Seeding is the only way to get an admin or validator fixture.

---

## The six kinds of testing

Plain definitions, and where each one lives.

### Functional — *does the feature do what it should?*

The ordinary kind. Call an endpoint, check the response. Covers happy paths, error cases and
boundaries (what happens at exactly 0, at the maximum, one over).

Lives in `backend/src/__tests__/*.routes.test.ts`. Tools: Jest + supertest.

A cheap trick specific to this codebase: every Zod schema is `.strict()`, so sending an unexpected
field is a 400. That is a one-line negative test for any endpoint.

### Usability — *can a real person actually use it?*

The only kind you cannot automate. It means watching someone who has never seen the app try to
finish a task, and noting where they get stuck. Five people finds about 85% of the problems.

The automatable proxy is **accessibility** — screen reader support, keyboard navigation, colour
contrast. Most accessibility failures are usability failures for everyone. Tool: `axe-core` driven
by Playwright.

### Compatibility — *does it work everywhere?*

Different browsers and screen sizes. Chrome, Firefox and Safari disagree more than you would
expect, and phone-width layouts break in ways desktop testing never shows.

Playwright runs Chromium, Firefox and **WebKit** (Safari's engine) from one config. That WebKit
support is why Playwright was chosen over Cypress.

### Performance — *is it fast enough, and where does it break?*

Two different questions. **Load testing** asks how many users it survives; **front-end
performance** asks how fast a page feels. Tools: k6 for load, Lighthouse for pages.

> ⚠️ **Never load test production.** The server is a `t3.small` with CPU credits capped at
> `standard`. Sustained load drains the credit balance and throttles the machine to a fraction of
> its speed — the live site slows down for real users and stays slow until credits rebuild. Load
> tests run against the local stack only.

### Security — *can it be abused?*

Scanners find known-bad dependencies and risky code patterns. Written tests prove your own rules
hold — that a contributor really cannot reach an admin endpoint.

The role matrix *is* the test matrix: 3 roles × every endpoint, asserting a 403 where one belongs.
That is the highest-value security testing available here, and it is ordinary Jest.

### Interface — *do the parts agree with each other?*

Two layers. The **API contract**: do responses match what the Swagger docs promise? And
**frontend ↔ backend**: does the UI handle every shape the API returns, including errors?

Worth knowing: this backend currently returns **three different error shapes** depending on which
layer rejected the request. Interface tests are how you find that kind of thing.

---

## What exists today

Phase 0 of the plan — the foundation — is in place:

- The hosted-database guard in [`setup.ts`](../../backend/src/__tests__/setup.ts)
- Shared fixtures in [`helpers/testData.ts`](../../backend/src/__tests__/helpers/testData.ts)
- Test files are now type-checked and linted, which they were not before

Still to come, in order: the authorization matrix suite, Playwright and the five main user flows,
CI security scanners, accessibility, the browser compatibility matrix, k6 load scripts, and the
manual usability round.
