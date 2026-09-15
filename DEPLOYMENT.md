# Deploying Annotex to AWS

This guide takes you from nothing to a live HTTPS site on a single AWS EC2 instance. It
assumes you have never used AWS before and explains why each step exists, not just what to
click.

There are two ways through it:

- **Scripted** — do the AWS console steps in Part 1, then run one script. ~30 minutes,
  most of it waiting for a build.
- **By hand** — [Appendix A](#appendix-a--deploying-by-hand) lists every command the
  script runs, in order, if you would rather drive it yourself or need to recover from a
  failure partway through.

---

## What you are deploying

Three Docker containers on one virtual machine, with Nginx in front:

```
                                    ┌──────────────────────────────────────┐
 Internet ──HTTPS:443──► Nginx ──►  │  /api/*     →  backend      :5000    │
                           │        │  /uploads/* →  backend      :5000    │
                    (TLS ends here) │  /health    →  backend      :5000    │
                                    │  /*         →  frontend     :3000    │
                                    └──────────────────┬───────────────────┘
                                                       │
                                              postgres :5432
```

Nginx is the only thing listening on the public internet. The three containers bind to
`127.0.0.1` only, so nothing reaches them except through Nginx.

**Why one domain for both the app and the API:** the browser sees a single origin, so
there are no CORS preflight requests and no cross-origin cookie problems. Splitting the
API onto `api.yourdomain.com` would mean configuring CORS correctly forever after.

---

## What it costs

Be careful here, because "AWS Free Tier" does not mean what most guides say it means.

- **Accounts created after roughly July 2025** get a 6-month credit plan, not the old
  12-month always-free tier. Check your own account's plan before assuming anything.
- **Public IPv4 addresses bill at about $0.005/hour** (~$3.60/month). Since 1 February
  2024 this applies to **every** public IPv4 address, including an Elastic IP that is
  attached and in use. Older guides say Elastic IPs are "free while attached and charged
  only when idle" — that rule no longer exists. What covers you is the free tier's 750
  hours/month of public IPv4, not the fact that it is attached.
- A `t2.micro`/`t3.micro` with 30 GiB of gp3 storage is within the free allowances on an
  eligible account.

| Resource | Free allowance | Rule |
|---|---|---|
| EC2 hours | 750 hrs/month | Run exactly **one** instance. 750 hrs covers one instance 24/7. |
| Instance type | `t2.micro` / `t3.micro` | Not `t2.small` or larger. |
| EBS storage | 30 GiB | Set the volume to 30 GiB at launch. |
| Public IPv4 | 750 hrs/month | One Elastic IP, attached to the running instance. |
| Outbound data | 100 GB/month | Ample for this workload. |
| EBS snapshots | 1 GB-month | **Not enough to snapshot a 30 GiB volume.** Use [backups](#backups) instead. |

The budget alert in Part 1 is the first step for a reason. Do not skip it.

---

## Before you start

You need:

- An AWS account.
- A terminal with `ssh` (macOS and Linux have one; on Windows use PowerShell or WSL).
- No domain name required. The script uses [sslip.io](https://sslip.io), which resolves
  `54-1-2-3.sslip.io` to `54.1.2.3` automatically, so you get a real Let's Encrypt
  certificate without owning a domain or configuring DNS. [Moving to a real
  domain](#moving-to-a-real-domain) later is a short, documented change.

---

## Part 1 — AWS console

These steps are clicks in a web console. They are not scripted, because automating them
would require installing the AWS CLI and creating access keys, which is more setup than
the clicks it saves.

### 1. Create a zero-spend budget alert

1. Sign in to the AWS Console.
2. Search for **Budgets** in the top bar and open it.
3. **Create budget** → choose **Zero spend budget**.
4. Enter your email → **Create budget**.

AWS now emails you if charges ever exceed $0.01. Do this first so it is protecting you
during everything that follows.

### 2. Launch the EC2 instance

Search for **EC2** → **Instances** → **Launch instance**.

| Field | Value | Why |
|---|---|---|
| Name | `annotex-production` | Any name; this is just a label. |
| OS image | **Ubuntu Server 24.04 LTS (HVM), SSD** | The script targets Ubuntu 24.04. |
| Instance type | `t2.micro` or `t3.micro` | Free-tier eligible. Which one is free depends on your region; the console marks it. |
| Key pair | **Create new key pair** → name `annotex-key`, type RSA, format `.pem` | This is how you log in. Download it — AWS will not show it again. Save it to `~/.ssh/`. |
| Storage | Change 8 GiB to **30 GiB** gp3 | 30 GiB is the free-tier maximum. Docker images, the build cache, and Postgres data add up faster than you expect, and 8 GiB will run out. |

Under **Network settings**, click Edit and allow:

- **SSH (port 22)** — from **My IP** if your home IP is stable, otherwise Anywhere.
- **HTTP (port 80)** — from Anywhere. Certbot needs this to issue your certificate.
- **HTTPS (port 443)** — from Anywhere. This is how people reach your site.

Do **not** open 3000, 5000, or 5433. Those are the containers, and Nginx reaches them over
localhost. Leaving them closed means a misconfiguration cannot expose your database.

Click **Launch instance**.

### 3. Assign an Elastic IP

A default EC2 public IP changes every time the instance stops and starts, which would
break your DNS, your certificate, and your `.env.production` all at once. An Elastic IP is
a fixed address that stays yours.

1. EC2 sidebar → **Network & Security** → **Elastic IPs**.
2. **Allocate Elastic IP address** → **Allocate**.
3. Select it → **Actions** → **Associate Elastic IP address**.
4. Choose your `annotex-production` instance → **Associate**.

Copy the address. Everything below calls it `YOUR_ELASTIC_IP`.

---

## Part 2 — Connect to the server

In a terminal, from wherever you saved the key:

```bash
chmod 400 ~/.ssh/annotex-key.pem
ssh -i ~/.ssh/annotex-key.pem ubuntu@YOUR_ELASTIC_IP
```

The `chmod 400` is required. SSH refuses to use a key that other users on your machine
could read, and the error it gives is `UNPROTECTED PRIVATE KEY FILE` — if you see that,
you skipped the `chmod`.

Type `yes` at the host authenticity prompt. You are now on the server; the prompt changes
to `ubuntu@ip-...`.

---

## Part 3 — Run the bootstrap script

```bash
curl -fsSL https://raw.githubusercontent.com/myaumyauverse/Annotex/main/deploy/ec2-bootstrap.sh -o bootstrap.sh
bash bootstrap.sh
```

It asks you two things:

1. **An email for Let's Encrypt** — used only for expiry warnings.
2. **A Solana devnet treasury wallet** — press Enter to accept the default
   (`11111111111111111111111111111111`) if you are not testing payouts yet.

Then it runs unattended:

| Step | What it does |
|---|---|
| Detect IP | Asks EC2 for its own public IP, derives `YOUR-ELASTIC-IP.sslip.io` |
| Swap | Creates a 4 GB swapfile |
| Install | Docker, Docker Compose, Nginx, Certbot |
| Clone | Pulls the repo into `~/Annotex` |
| Secrets | Generates `.env.production` with three separate random secrets |
| Build | Builds and starts the three containers |
| Nginx | Writes and enables the reverse proxy config |
| Certbot | Issues your HTTPS certificate |
| Verify | Runs 8 checks and reports pass/fail |

**The build takes 10–20 minutes and prints nothing for long stretches.** This is normal on
a `t2.micro`. Do not interrupt it.

> **Why the swapfile matters.** A `t2.micro` has 1 GB of RAM. Building the Next.js
> frontend needs more than that, and Linux responds by killing the build with a bare
> `Killed` and no explanation. The 4 GB of swap is what makes the build possible at all.

The script is safe to re-run. Every step checks whether it has already been done, so if
something fails halfway you can fix it and run the script again without starting over.

---

## Part 4 — Make yourself an Admin

Sign up at `https://YOUR-ELASTIC-IP.sslip.io`. **You will be a Contributor**, and the
admin areas — user management, analytics, dataset management — will not be reachable.

This is expected, not a bug you have hit. Annotex deliberately does not let signup grant
the admin role (`backend/src/routes/auth.routes.ts` accepts only `contributor` and
`validator`), and there is no seed script. Every admin has to be promoted by someone who
already has database access — which, on day one, is you over SSH.

After signing up, run this on the server, substituting your email:

```bash
cd ~/Annotex
sudo docker compose --env-file .env.production -f docker-compose.prod.yml exec -T db \
  psql -U annotex -d annotex_db \
  -c "UPDATE users SET role='admin' WHERE email='you@example.com';"
```

It prints `UPDATE 1` on success. `UPDATE 0` means the email does not match any account —
check for typos, and note the address is stored lowercased.

**Log out and back in.** Your role is carried in your session token, so it will not change
until you get a new one.

Valid roles are `admin`, `contributor`, and `validator`. You can promote later users the
same way, or through the admin UI once you have an admin account.

---

## Part 5 — Verify it actually works

The script's checks run automatically, and you can re-run them any time:

```bash
bash ~/bootstrap.sh --verify-only
```

There is one check a script cannot do for you, and it is the important one:

> Open `https://YOUR-ELASTIC-IP.sslip.io`, log in, and open your browser's DevTools to the
> **Network** tab. Load the dashboard. Every API request must go to
> `YOUR-ELASTIC-IP.sslip.io/api/v1/...`.
>
> **If you see requests to `localhost:5000`, the frontend was built without
> `NEXT_PUBLIC_API_BASE_URL`.** The site will look fine and load its pages, but every
> logged-in feature will fail, because the browser is trying to reach a server on the
> visitor's own machine. See [Troubleshooting](#troubleshooting).

Then try the real workflow: upload a dataset, confirm the images render, label something.

---

## Part 6 — Running it day to day

### Redeploying after a code change

**Pushes to `main` now redeploy automatically.** The `deploy` job in
`.github/workflows/ci.yml` SSHes into the instance after `frontend` and
`backend` CI pass, pulls `main`, rebuilds, and waits for `/health` to come
back healthy — rolling back to the previous commit and rebuilding if it
doesn't within ~2.5 minutes. Watch it in the repo's Actions tab.

#### Setting up CD (one-time)

The `deploy` job needs three secrets, added under *Settings → Environments →
production → Secrets* (create the `production` environment if it doesn't
exist yet):

| Secret | Value |
|---|---|
| `EC2_HOST` | Your Elastic IP or domain |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Contents of your `annotex-key.pem` private key |

Treat this key as a real production credential — it's a deploy-only key now
living in GitHub Secrets rather than only on your laptop, so rotate it if
your collaborator list ever shrinks.

#### Manual redeploy (fallback)

You do not need the bootstrap script for this, and CI/CD doesn't need to be
involved. Once the server is set up, you can always do this by hand — for a
hotfix, or if CD itself is down:

```bash
cd ~/Annotex
git pull
sudo docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

Your database and uploaded files are in Docker volumes and survive this.

### Reading logs

```bash
cd ~/Annotex
C="sudo docker compose --env-file .env.production -f docker-compose.prod.yml"

$C ps                      # what is running, and is it healthy
$C logs -f backend         # follow backend logs
$C logs --tail=100 frontend
$C restart backend
```

### Backups

The bootstrap script installs a **nightly backup timer** (03:30) that dumps the database
and archives uploads to `~/annotex-backups`, keeping 7 days.

```bash
bash ~/Annotex/deploy/backup.sh            # run one now
systemctl list-timers 'annotex-*'          # confirm it is scheduled
ls -lh ~/annotex-backups
```

Restore a dump — this overwrites current data, and gives you 10 seconds to abort:

```bash
bash ~/Annotex/deploy/backup.sh --restore ~/annotex-backups/annotex-db-2026-09-12-0330.sql.gz
```

> **A backup on the same disk is not a backup.** By default these files live on the same
> EBS volume as the thing they are protecting. They survive a bad migration or a dropped
> table. They do **not** survive the instance being terminated, which is the failure that
> actually loses everything.

**Recommended: copy them to S3.** A dump of this data is measured in KB to MB. S3 Standard
is about $0.023 per GB-month, so 100 MB costs roughly **$0.002/month** — effectively
nothing, and the only option that survives losing the instance.

1. Create a bucket (`aws s3 mb s3://my-annotex-backups`, or via the console).
2. Give the instance write access — an **IAM role attached to the instance** is preferred
   over access keys on disk. EC2 → Actions → Security → Modify IAM role.
3. Install the CLI: `sudo apt-get install -y awscli`
4. Add `S3_BUCKET=my-annotex-backups` to `~/Annotex/.env.production`.

`backup.sh` picks it up on the next run and copies both files offsite. Set a bucket
lifecycle rule to expire objects after 30 days so storage never grows.

If you would rather stay at literally zero cost, pull them down by hand instead, and
accept that anything since your last download is lost if the instance dies:

```bash
# from your own machine
scp -i ~/.ssh/annotex-key.pem ubuntu@YOUR_ELASTIC_IP:'~/annotex-backups/*' .
```

### Disk space

You have 30 GiB, and two things eat it quietly. A full disk does not just stop uploads —
**Postgres can corrupt when it cannot write**, so this matters more than it sounds.

The bootstrap script handles both automatically:

- **Container logs** are capped at 10 MB × 3 files per service in `docker-compose.prod.yml`.
  Without that cap they grow forever.
- **A weekly prune timer** (Sundays, 04:30) reclaims old images and build cache, which
  accumulate on every `up -d --build`.

Check and intervene manually when needed:

```bash
df -h /                                        # overall usage
sudo docker system df                          # what Docker is holding
sudo docker system prune -af --filter until=168h   # reclaim now
du -sh ~/annotex-backups                       # backups growing?
```

If you are over ~85% and pruning does not help, the usual culprit is uploaded datasets.
`bash ~/Annotex/deploy/ec2-bootstrap.sh --verify-only` includes a disk check.

### Moving to a real domain

When you buy a domain, four things change. **The rebuild in step 4 is not optional** — the
API URL is compiled into the browser bundle, so editing the environment file alone changes
nothing that the browser sees. This is the single most common mistake when switching
domains.

1. **DNS**: at your registrar, add an `A` record for `@` (and `www`) pointing at
   `YOUR_ELASTIC_IP`. Wait for it to resolve: `dig +short yourdomain.com`.

2. **Environment**: edit `~/Annotex/.env.production` and change all three URLs:
   ```ini
   CORS_ORIGIN=https://yourdomain.com
   NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api/v1
   NEXTAUTH_URL=https://yourdomain.com
   ```

3. **Nginx**: edit `/etc/nginx/sites-available/annotex`, change `server_name` to your
   domain, then `sudo nginx -t && sudo systemctl reload nginx`.

4. **Rebuild and reissue**:
   ```bash
   cd ~/Annotex
   sudo docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

Verify with the DevTools Network check from Part 5.

### Certificate renewal

Certbot installs a systemd timer that renews automatically. Confirm it works:

```bash
sudo certbot renew --dry-run
```

---

## Security

What a deployment from this guide actually enforces. Everything listed is verifiable with
the command shown — treat any security claim you cannot check as not true.

| Control | How it works | Verify |
|---|---|---|
| Only Nginx is exposed | The three containers publish to `127.0.0.1` only | `ss -tln \| grep -E '3000\|5000\|5433'` — all `127.0.0.1` |
| HTTPS everywhere | Let's Encrypt via Certbot, HTTP redirected to HTTPS | `curl -sI http://HOST` → 301 |
| Certificate renewal | systemd timer, **not** cron | `systemctl list-timers \| grep certbot` |
| Containers run unprivileged | Both frontend and backend run as UID 1001 | `docker compose exec frontend id -u` → `1001` |
| Login brute-force limit | 5 failed attempts per IP per 15 min; successes are not counted | `backend/src/middlewares/rateLimiter.ts` |
| General API rate limit | 100 requests per IP per 15 min | same file |
| Security headers | `helmet` — nosniff, frame denial, and related | `curl -sI https://HOST/api/v1 \| grep -i x-` |
| Password storage | bcrypt, cost factor 12 | `backend/src/services/auth.service.ts` |
| Secrets | Three distinct 32-byte values, file mode 0600, gitignored | `ls -l ~/Annotex/.env.production` → `-rw-------` |
| Startup safety | Backend refuses to boot in production with missing or placeholder secrets | `backend/src/config/index.ts` |
| Upload restrictions | Extension allowlist, 10 MB cap, 200 MB expanded-archive cap | `backend/src/middlewares/upload.ts` |
| OS patches | `unattended-upgrades` enabled | `systemctl is-active unattended-upgrades` |
| SSH brute-force | `fail2ban` enabled; the AMI already disables password login | `sudo fail2ban-client status sshd` |

Run `bash ~/Annotex/deploy/ec2-bootstrap.sh --verify-only` to check most of these at once.

### What this does not give you

Be clear-eyed about the gaps, rather than assuming a checklist covers them:

- **`.env.production` at mode 0600 is readable by its owner (`ubuntu`) and by root.** It
  is not encrypted at rest. Anyone with SSH access to this instance has your secrets.
- **GitHub branch protection does not prevent committing secrets.** It controls merges and
  force-pushes. Secret scanning is a separate feature you must enable in repo settings.
- **No WAF, no DDoS protection, no intrusion detection.** One instance behind Nginx.
- **Uploaded files are served from the same origin as the app.** The extension allowlist
  is the control preventing active content; do not widen it to include `.html` or `.svg`.
- **No audit logging** of administrative actions.
- **One instance, one availability zone.** No redundancy — a hardware failure is downtime.

### Recommended, not automated

- Enable **Secret Scanning + Push Protection** in the GitHub repo settings.
- Restrict the SSH security group rule to your own IP rather than `0.0.0.0/0`.
- Rotate `JWT_SECRET` and `NEXTAUTH_SECRET` if they are ever exposed. Both invalidate
  existing sessions, so expect everyone to be logged out.
- Attach an **IAM role** to the instance for S3 backups instead of putting access keys in
  a file.

---

## Troubleshooting

### The build was "Killed" with no other output

Out of memory. Check swap is active:

```bash
free -h        # Swap should show 4.0Gi, not 0B
swapon --show
```

If it is missing, re-run the bootstrap script — it creates swap and skips the steps
already done.

### Backend keeps restarting

```bash
cd ~/Annotex
sudo docker compose --env-file .env.production -f docker-compose.prod.yml logs backend | tail -50
```

- **You see `placeholder` in a connection string** — your checkout predates the
  `DIRECT_URL` fix. Database migrations read `DIRECT_URL`, and without it Prisma tries a
  placeholder address, fails, and the container never starts. Fix with `git pull` and
  rebuild.
- **"Missing required environment variables in production"** — the backend refuses to
  start without `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGIN`, and
  `PROJECT_TREASURY_WALLET`. Check `.env.production` has all five filled in.
- **"Refusing to start in production with insecure default values"** — your JWT secrets
  are still the example placeholders. Replace them with `openssl rand -hex 32`.

### The site loads but login and dashboards fail

Check the DevTools Network tab. If requests go to `localhost:5000`, the frontend was built
without the API URL. Confirm `NEXT_PUBLIC_API_BASE_URL` is set in `.env.production`, then
**rebuild** — restarting is not enough, because the value is compiled in at build time:

```bash
cd ~/Annotex
sudo docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build frontend
```

### 502 Bad Gateway

Nginx is running but the containers are not. Check `docker compose ps`, then the logs of
whichever container is missing or restarting.

### Certbot fails to issue a certificate

- Port 80 must be open in your security group and reachable from the internet.
- The hostname must resolve to this server: `dig +short YOUR-HOSTNAME`.
- Let's Encrypt rate-limits repeated failures. Wait an hour rather than retrying in a loop.

### Disk is full / site suddenly broken

A full disk takes down Postgres and can corrupt it, so treat this as urgent:

```bash
df -h /
sudo docker system df
sudo docker system prune -af --filter until=168h
```

If that does not free enough, check `~/annotex-backups` and the uploads volume. See
[Disk space](#disk-space).

### Uploads disappear after a rebuild

Confirm the uploads volume is mounted:

```bash
sudo docker volume ls | grep uploads
```

If it is missing, your checkout predates the fix that added it. `git pull` and rebuild.

### Cannot SSH in

- `UNPROTECTED PRIVATE KEY FILE` → run `chmod 400` on the `.pem` file.
- Connection times out → your security group's SSH rule is set to "My IP" and your IP
  changed. Edit the rule in the EC2 console.
- `Permission denied (publickey)` → the username is `ubuntu`, not `root` or your own name.

---

## Appendix A — Deploying by hand

Every step the script performs. Use this to recover from a partial failure, or if you want
to understand what was done to your server.

**1. Swap** (1 GB of RAM cannot build the frontend):

```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**2. Docker, Nginx, Certbot:**

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg git nginx certbot python3-certbot-nginx

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```

Group membership applies only to a new login. Either log out and back in, or prefix
`docker` with `sudo` for the rest of this session.

**3. Clone:**

```bash
git clone https://github.com/myaumyauverse/Annotex.git ~/Annotex
cd ~/Annotex
```

**4. Environment.** Generate three *different* secrets — reusing one weakens all of them:

```bash
cp .env.production.example .env.production
chmod 600 .env.production
openssl rand -hex 32    # run once per secret
nano .env.production
```

Set `HOST` below to your hostname — `YOUR-ELASTIC-IP.sslip.io` with dots replaced by
dashes (`54.1.2.3` → `54-1-2-3.sslip.io`), or your real domain:

```ini
POSTGRES_USER=annotex
POSTGRES_PASSWORD=<random>
POSTGRES_DB=annotex_db

API_VERSION=v1

JWT_SECRET=<random>
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=<a different random>
JWT_REFRESH_EXPIRES_IN=7d

CORS_ORIGIN=https://HOST

BLOCKCHAIN_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
PROJECT_TREASURY_WALLET=11111111111111111111111111111111
PAYOUT_TOKEN_MINT=

LOG_LEVEL=info

NEXT_PUBLIC_API_BASE_URL=https://HOST/api/v1
NEXTAUTH_URL=https://HOST
NEXTAUTH_SECRET=<a third random>
```

**5. Build and start.** Use the HTTPS URL even though the certificate does not exist yet —
it is only a string being compiled in, and doing it now avoids a second long build:

```bash
sudo docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
```

**6. Nginx.** Create `/etc/nginx/sites-available/annotex`, replacing `HOST`:

```nginx
server {
    listen 80;
    server_name HOST;

    client_max_body_size 12M;

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads/ {
        proxy_pass http://localhost:5000/uploads/;
        proxy_set_header Host $host;
    }

    location = /health {
        proxy_pass http://localhost:5000/health;
        access_log off;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

`client_max_body_size` is 12M because the backend caps uploads at 10 MB; the extra is
headroom for multipart encoding. Setting it to 50M would let Nginx accept files the
backend then rejects, which is confusing to debug.

Enable it:

```bash
sudo ln -sfn /etc/nginx/sites-available/annotex /etc/nginx/sites-enabled/annotex
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

**7. Certificate.** A 502 at this point is expected — the ACME challenge only needs port
80, not a working app:

```bash
sudo certbot --nginx -d HOST --redirect
```

**8. Verify:**

```bash
cd ~/Annotex
C="sudo docker compose --env-file .env.production -f docker-compose.prod.yml"

$C ps                                    # three containers, db healthy
curl -s localhost:5000/health            # {"status":"healthy",...}
$C logs backend | grep "Server running"  # started, not looping
$C logs backend | grep placeholder       # must return NOTHING
curl -sI https://HOST | head -1          # HTTP/2 200
ss -tln | grep -E '3000|5000|5433'       # all 127.0.0.1, never 0.0.0.0
sudo certbot renew --dry-run
```

Then do [Part 4](#part-4--make-yourself-an-admin) to promote your admin account, and the
DevTools check in [Part 5](#part-5--verify-it-actually-works).

---

## Reference

| Thing | Value |
|---|---|
| App directory | `~/Annotex` |
| Environment file | `~/Annotex/.env.production` (mode 600, never committed) |
| Compose file | `docker-compose.prod.yml` |
| Services | `db`, `backend`, `frontend` |
| Volumes | `annotex-postgres-data`, `annotex-uploads` |
| Health endpoint | `/health` (not `/api/v1/health`) — checks the database |
| API base | `/api/v1` |
| Nginx site | `/etc/nginx/sites-available/annotex` |
| Certificates | `/etc/letsencrypt/live/<hostname>/` |
| Upload size cap | 10 MB (backend), 12 MB (Nginx), 200 MB expanded archive |
| Roles | `admin`, `contributor`, `validator` |
| Backups | `~/annotex-backups`, nightly 03:30, 7-day retention |
| Timers | `annotex-backup.timer`, `annotex-prune.timer`, `certbot.timer` |

### If you ever move the database to RDS

Change **both** `DATABASE_URL` and `DIRECT_URL` in `.env.production`. The application
connects with `DATABASE_URL`, but Prisma migrations read `DIRECT_URL`
(`backend/prisma.config.ts`). Changing only the first leaves migrations pointed at the old
database, which fails in confusing ways. Remove the `db` service from the compose file
once you have migrated the data across.
