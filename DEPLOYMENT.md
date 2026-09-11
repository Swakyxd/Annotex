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
- **Public IPv4 addresses bill at about $0.005/hour** (~$3.60/month) once you are past the
  free 750 hours/month. This applies to Elastic IPs even while attached and in use.
- A `t2.micro`/`t3.micro` with 30 GiB of gp3 storage is within the free allowances on a
  new account.

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

You do not need the bootstrap script for this. Once the server is set up:

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

### Backing up

The database lives in a Docker volume, which survives rebuilds but not a deleted
instance. Take real backups before you have data you care about losing.

```bash
cd ~/Annotex
# Database
sudo docker compose --env-file .env.production -f docker-compose.prod.yml exec -T db \
  pg_dump -U annotex annotex_db > ~/annotex-$(date +%F).sql

# Uploaded files (check the exact volume name with: sudo docker volume ls)
sudo docker run --rm \
  -v annotex_annotex-uploads:/data \
  -v "$HOME":/backup alpine \
  tar czf /backup/annotex-uploads-$(date +%F).tar.gz -C /data .
```

Copy them off the server — a backup on the same disk is not a backup:

```bash
# from your own machine
scp -i ~/.ssh/annotex-key.pem ubuntu@YOUR_ELASTIC_IP:~/annotex-*.sql .
```

To restore a database dump:

```bash
cat annotex-2026-09-11.sql | sudo docker compose --env-file .env.production \
  -f docker-compose.prod.yml exec -T db psql -U annotex -d annotex_db
```

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
| Health endpoint | `/health` (not `/api/v1/health`) |
| API base | `/api/v1` |
| Nginx site | `/etc/nginx/sites-available/annotex` |
| Certificates | `/etc/letsencrypt/live/<hostname>/` |
| Upload size cap | 10 MB (backend), 12 MB (Nginx) |
| Roles | `admin`, `contributor`, `validator` |
