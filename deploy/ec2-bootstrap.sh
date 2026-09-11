#!/usr/bin/env bash
#
# Annotex -> AWS EC2 (Ubuntu 24.04) one-shot bootstrap.
#
# Takes a blank EC2 instance to a live HTTPS site: swap, Docker, clone, secrets,
# build, Nginx, Let's Encrypt, then verifies the result.
#
# Usage:
#   bash ec2-bootstrap.sh                 deploy (or resume a failed deploy)
#   bash ec2-bootstrap.sh --verify-only   re-run the checks, change nothing
#   bash ec2-bootstrap.sh --help
#
# Environment overrides:
#   DOMAIN=app.example.com   use a real domain instead of the sslip.io default
#   REPO=<git url>           clone somewhere other than the upstream repo
#   APP_DIR=<path>           check out somewhere other than ~/Annotex
#
# Assumes a fresh t2.micro/t3.micro with an Elastic IP attached and a security
# group allowing 22, 80 and 443. Every step is idempotent: safe to re-run.
#
# See DEPLOYMENT.md for the full walkthrough, and for doing all of this by hand.
set -euo pipefail

REPO="${REPO:-https://github.com/myaumyauverse/Annotex.git}"
APP_DIR="${APP_DIR:-$HOME/Annotex}"
COMPOSE="docker compose --env-file .env.production -f docker-compose.prod.yml"

say()  { printf '\n\033[1;36m==> %s\033[0m\n' "$1"; }
warn() { printf '\033[1;33m    %s\033[0m\n' "$1"; }
die()  { printf '\n\033[1;31mFAILED: %s\033[0m\n' "$1" >&2; exit 1; }

usage() { sed -n '3,19p' "$0" | sed 's/^# \{0,1\}//'; exit 0; }

VERIFY_ONLY=0
case "${1:-}" in
  --help|-h)      usage ;;
  --verify-only)  VERIFY_ONLY=1 ;;
  "")             ;;
  *)              die "unknown argument: $1 (try --help)" ;;
esac

# --------------------------------------------------------------- hostname
# Ask EC2 what our own public IP is (IMDSv2), then let sslip.io be our DNS:
# 54-1-2-3.sslip.io resolves to 54.1.2.3, so Let's Encrypt can issue a real
# certificate with no domain and no DNS records to configure.
detect_host() {
  local token
  # --max-time so this fails in seconds off EC2 instead of hanging on a
  # link-local address that nothing answers.
  token=$(curl -fsS --max-time 5 -X PUT "http://169.254.169.254/latest/api/token" \
    -H "X-aws-ec2-metadata-token-ttl-seconds: 300" 2>/dev/null) \
    || die "not an EC2 instance, or IMDS is blocked"
  PUBLIC_IP=$(curl -fsS --max-time 5 -H "X-aws-ec2-metadata-token: $token" \
    http://169.254.169.254/latest/meta-data/public-ipv4) \
    || die "no public IP — attach an Elastic IP first (DEPLOYMENT.md, Part 1 step 5)"
  HOST="${DOMAIN:-${PUBLIC_IP//./-}.sslip.io}"
}

# --------------------------------------------------------------- verify
# Each check maps to a real failure mode, not to "a container started".
# Containers can sit in a restart loop and still look busy.
verify() {
  local fail=0
  check() {
    printf '    %-32s' "$1"; shift
    if "$@" >/dev/null 2>&1; then echo "OK"; else echo "FAIL"; fail=1; fi
  }

  sudo $COMPOSE ps

  check "backend /health"       bash -c "curl -fsS localhost:5000/health | grep -q healthy"
  check "frontend responding"   bash -c "curl -fsS -o /dev/null localhost:3000"
  check "migrations applied"    bash -c "sudo $COMPOSE logs backend 2>&1 | grep -q 'Server running on port 5000'"
  # If DIRECT_URL is missing, prisma migrate deploy hits the placeholder DSN
  # baked into backend/Dockerfile and the container never starts.
  check "no placeholder DSN"    bash -c "! sudo $COMPOSE logs backend 2>&1 | grep -q placeholder"
  check "https serving"         bash -c "curl -fsS -o /dev/null https://$HOST"
  # No -f here: we WANT the 4xx. It proves the API is reachable over HTTPS and
  # validating input, which is what breaks when the frontend was built without
  # NEXT_PUBLIC_API_BASE_URL.
  check "api reachable (https)"  bash -c "curl -sS -o /dev/null -w '%{http_code}' -X POST https://$HOST/api/v1/auth/login | grep -qE '^(400|401|422)$'"
  check "ports loopback-only"   bash -c "! ss -tln | grep -qE '0\.0\.0\.0:(3000|5000|5433)'"
  check "cert auto-renew"       sudo certbot renew --dry-run

  return $fail
}

if [ "$VERIFY_ONLY" -eq 1 ]; then
  detect_host
  cd "$APP_DIR" 2>/dev/null || die "$APP_DIR not found — nothing deployed yet"
  say "Verifying $HOST"
  verify && say "All checks passed" || die "see: sudo $COMPOSE logs --tail=80 backend"
  exit 0
fi

# =========================================================== deploy ========

say "Detecting public IP"
detect_host
echo "    public IP : $PUBLIC_IP"
echo "    hostname  : $HOST"
[ -n "${DOMAIN:-}" ] || echo "    (sslip.io resolves this to your IP — no DNS setup needed)"

read -rp "Email for Let's Encrypt renewal notices: " LE_EMAIL
[ -n "$LE_EMAIL" ] || die "email is required for certificate issuance"

# --------------------------------------------------------------- 1. swap
# t2.micro has 1GB RAM. Building Next 16 + React 19 and compiling the backend
# will be OOM-killed without this, usually with a bare "Killed" and no cause.
if ! swapon --show | grep -q /swapfile; then
  say "Creating 4G swap (1GB RAM is not enough to build)"
  sudo fallocate -l 4G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile >/dev/null
  sudo swapon /swapfile
  grep -q '^/swapfile' /etc/fstab \
    || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
else
  say "Swap already present, skipping"
fi
free -h | sed 's/^/    /'

# ----------------------------------------------------- 2. docker + nginx
if ! command -v docker >/dev/null; then
  say "Installing Docker, Nginx, Certbot"
  sudo apt-get update -qq
  sudo apt-get install -y -qq ca-certificates curl gnupg git nginx certbot python3-certbot-nginx
  sudo install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
  sudo apt-get update -qq
  sudo apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  # Group membership only applies to a NEW login, so this script keeps using
  # sudo for docker. After you log out and back in, plain `docker` works.
  sudo usermod -aG docker "$USER"
else
  say "Docker already installed, skipping"
fi

# --------------------------------------------------------------- 3. clone
if [ ! -d "$APP_DIR/.git" ]; then
  say "Cloning Annotex"
  git clone --depth 1 "$REPO" "$APP_DIR"
else
  say "Repo present, pulling latest"
  git -C "$APP_DIR" pull --ff-only
fi
cd "$APP_DIR"

# Refuse to run against a checkout that predates the migration fix, rather than
# building for 20 minutes and landing in a restart loop.
grep -q 'DIRECT_URL' docker-compose.prod.yml \
  || die "this checkout predates the DIRECT_URL fix — pull latest main, or the backend will crash-loop"

# ----------------------------------------------------------------- 4. env
if [ ! -f .env.production ]; then
  say "Generating .env.production"
  read -rp "Solana devnet treasury wallet [11111111111111111111111111111111]: " WALLET
  WALLET="${WALLET:-11111111111111111111111111111111}"
  umask 077
  cat > .env.production <<EOF
POSTGRES_USER=annotex
POSTGRES_PASSWORD=$(openssl rand -hex 32)
POSTGRES_DB=annotex_db

API_VERSION=v1

JWT_SECRET=$(openssl rand -hex 32)
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=$(openssl rand -hex 32)
JWT_REFRESH_EXPIRES_IN=7d

CORS_ORIGIN=https://$HOST

BLOCKCHAIN_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com
PROJECT_TREASURY_WALLET=$WALLET
PAYOUT_TOKEN_MINT=

LOG_LEVEL=info

NEXT_PUBLIC_API_BASE_URL=https://$HOST/api/v1
NEXTAUTH_URL=https://$HOST
NEXTAUTH_SECRET=$(openssl rand -hex 32)
EOF
  echo "    wrote .env.production (0600), three distinct 32-byte secrets"
else
  say ".env.production exists, leaving it alone"
  grep -q "$HOST" .env.production \
    || warn "WARNING: it does not mention $HOST. URLs may be stale — see DEPLOYMENT.md, 'Moving to a real domain'."
fi

# --------------------------------------------------------------- 5. build
# NEXT_PUBLIC_API_BASE_URL is compiled into the browser bundle here, before the
# certificate exists. That is fine, it is only a string, and it means one build
# instead of two.
say "Building and starting containers"
warn "This takes 10-20 minutes on a t2.micro and prints nothing for long stretches."
sudo $COMPOSE up -d --build

# --------------------------------------------------------------- 6. nginx
say "Configuring Nginx for $HOST"
sudo tee /etc/nginx/sites-available/annotex >/dev/null <<EOF
server {
    listen 80;
    server_name $HOST;

    # multer caps uploads at 10MB (backend/src/config/index.ts); the extra 2MB
    # is headroom for multipart encoding overhead.
    client_max_body_size 12M;

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location /uploads/ {
        proxy_pass http://localhost:5000/uploads/;
        proxy_set_header Host \$host;
    }

    # Health lives at /health, NOT /api/v1/health.
    location = /health {
        proxy_pass http://localhost:5000/health;
        access_log off;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
sudo ln -sfn /etc/nginx/sites-available/annotex /etc/nginx/sites-enabled/annotex
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# ------------------------------------------------------------- 7. certbot
if sudo test -d "/etc/letsencrypt/live/$HOST"; then
  say "Certificate already issued for $HOST, skipping"
else
  say "Issuing Let's Encrypt certificate"
  # A 502 on / right now is expected and does not block issuance: the ACME
  # challenge only needs port 80.
  sudo certbot --nginx -d "$HOST" --non-interactive --agree-tos \
    -m "$LE_EMAIL" --redirect --no-eff-email
fi

# -------------------------------------------------------------- 8. verify
say "Verifying"
if verify; then
  PG_USER=$(grep '^POSTGRES_USER=' .env.production | cut -d= -f2)
  PG_DB=$(grep '^POSTGRES_DB=' .env.production | cut -d= -f2)
  say "Done — https://$HOST"
  cat <<EOF

    Next steps:

    1. Open https://$HOST and sign up. You will be a Contributor.

    2. Make yourself an Admin. Signup cannot grant the admin role and there is
       no seed script, so the first admin is promoted directly in the database:

       sudo $COMPOSE exec -T db \\
         psql -U $PG_USER -d $PG_DB \\
         -c "UPDATE users SET role='admin' WHERE email='YOUR@EMAIL.HERE';"

       Log out and back in for the new role to appear in your session.

    3. Confirm the frontend is talking to the right host: open DevTools, go to
       the Network tab, and load the dashboard. Requests must go to
       $HOST/api/v1/... and never to localhost:5000.

    Re-run these checks any time with:  bash $0 --verify-only

EOF
else
  say "Some checks failed"
  echo "    Logs:        sudo $COMPOSE logs --tail=80 backend"
  echo "    Diagnosis:   DEPLOYMENT.md, 'Troubleshooting'"
  exit 1
fi
