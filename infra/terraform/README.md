# Annotex infrastructure

Terraform for the Annotex production stack on AWS. Replaces the hand-provisioned
EC2 box and the SSH-based deploy in `.github/workflows/ci.yml`.

## What this builds

One EC2 instance in a public subnet with an Elastic IP, running nginx on the
host and the application in Docker Compose. Images are built by GitHub Actions
and pulled from ECR; nothing is ever built on the instance. Postgres runs as a
container on the instance's EBS volume, backed up nightly to S3.

```
Internet ─► Elastic IP ─► nginx (TLS) ─┬─► :5000 backend  ─┐
                                       └─► :3000 frontend  ├─ docker compose
                                                 postgres ─┘
             instance profile ─► SSM (shell + deploys), Parameter Store,
                                 ECR (pull), S3 (backups)
```

Port 22 is closed. Shell access is SSM Session Manager.

**Cost: roughly $21–22/month** in ap-south-1 — about 70% of it the `t3.small`
instance, plus $3.65 for the public IPv4 address.

This account is on the post-July-2025 credit plan, where the only free-tier
entitlements are the "Always Free" ones (SNS, SQS, KMS request quotas and
similar). There is no 12-month allowance for EC2 hours, EBS storage or RDS, so
the figure above is what actually gets billed. Dropping to `t3.micro` saves
about $8/month, but as a cheaper instance — not a free one.

## Layout

| Path | Purpose |
|---|---|
| `bootstrap/` | State bucket, SNS topic, budgets, cost anomaly detection. Run once, first. |
| `envs/prod/` | The stack itself. |
| `envs/prod/templates/` | Files rendered onto the instance: `user_data`, nginx config, Compose manifest, deploy script. |

There are no child modules. One environment, one instance, no reuse — module
boundaries would add three layers of variable plumbing and buy nothing. Promote
to modules if a second environment ever appears.

## First run

Prerequisites: Terraform ≥ 1.11, AWS CLI v2 configured with an administrator
identity, and the [Session Manager plugin][ssm-plugin].

[ssm-plugin]: https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html

### 1. Bootstrap — guardrails before anything billable

```bash
cd infra/terraform/bootstrap
cp terraform.tfvars.example terraform.tfvars   # set alert_email
terraform init
terraform apply
```

Then:

1. **Click the confirmation link** in the SNS email. Until you do, the topic
   delivers nothing and Terraform cannot tell.
2. Move this module's own state into the bucket it just created:

   ```bash
   terraform output state_bucket_name          # annotex-tfstate-<account_id>
   ```

   Create `bootstrap/backend.tf` with that literal name and
   `key = "bootstrap/terraform.tfstate"`, then:

   ```bash
   terraform init -migrate-state
   rm -f terraform.tfstate terraform.tfstate.backup
   ```

Backend blocks are resolved before the resource graph exists, so they cannot
interpolate variables — the bucket name has to be hardcoded.

> **Never `terraform destroy` this module.** It holds the state for `envs/prod`.
> `prevent_destroy` guards the bucket, but do not go looking for a way around it.

### 2. The stack

```bash
cd ../envs/prod
cp backend.tf.example backend.tf          # substitute the account id
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply
```

Required in `terraform.tfvars`: `letsencrypt_email`, `treasury_wallet`, and
`alerts_topic_arn` from the bootstrap output.

### 3. Wire up CI

`terraform output github_variables` prints what to set under **Settings →
Secrets and variables → Actions → Variables**. All four are non-secret:

| Variable | Source |
|---|---|
| `AWS_ROLE_ARN` | `terraform output github_actions_role_arn` |
| `AWS_REGION` | `ap-south-1` |
| `EC2_INSTANCE_ID` | `terraform output instance_id` |
| `PUBLIC_API_BASE_URL` | `terraform output url` + `/api/v1` |

Then **delete the old secrets**: `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`. The
workflow authenticates via OIDC and stores no AWS keys.

Push to `main`. CI builds both images, pushes them to ECR, and runs the
`annotex-deploy` SSM document.

### 4. First admin

Signup cannot grant the admin role and there is no seed script:

```bash
aws ssm start-session --target <instance-id> --region ap-south-1
cd /opt/annotex
sudo docker compose --env-file .env.production -f docker-compose.yml \
  exec -T db psql -U annotex -d annotex_db \
  -c "UPDATE users SET role='admin' WHERE email='you@example.com';"
```

Log out and back in for the role to appear in your session.

## Migrating from the pre-Terraform instance

One-time procedure for moving off the hand-provisioned box (`annotex-production`,
built by `deploy/ec2-bootstrap.sh`). Both instances exist during the cutover, so
keep the overlap to days rather than weeks — the old box costs about $14.60/month.

Do this **after** the new stack's first successful CI deploy, so the schema
already exists and `/health` reports `database: up`.

Both stacks use the same role and database names (`annotex` / `annotex_db`), so
ownership in the dump resolves cleanly.

### 1. Dump from the old box

It has no instance profile, so access is SSH with the `annotex-key` pair:

```bash
ssh -i annotex-key.pem ubuntu@3.7.117.46
cd ~/Annotex
COMPOSE="sudo docker compose --env-file .env.production -f docker-compose.prod.yml"

$COMPOSE exec -T db pg_dump -U annotex annotex_db | gzip > /tmp/annotex-db.sql.gz
$COMPOSE exec -T backend tar czf - -C /app/uploads . > /tmp/annotex-uploads.tar.gz
ls -lh /tmp/annotex-*        # both must be non-empty
```

### 2. Relay via S3

The old box has no AWS credentials and the new one has no SSH, so the transfer
goes through the backups bucket. Run these on your own machine:

```bash
scp -i annotex-key.pem ubuntu@3.7.117.46:/tmp/annotex-db.sql.gz .
scp -i annotex-key.pem ubuntu@3.7.117.46:/tmp/annotex-uploads.tar.gz .

BUCKET=$(cd infra/terraform/envs/prod && terraform output -raw backups_bucket)
aws s3 cp annotex-db.sql.gz      "s3://$BUCKET/migration/"
aws s3 cp annotex-uploads.tar.gz "s3://$BUCKET/migration/"
```

The instance role already grants read access to this bucket. The `migration/`
prefix has no expiry rule — delete it once the cutover is verified.

### 3. Restore onto the new instance

```bash
aws ssm start-session --target <instance-id> --region ap-south-1
sudo -i
cd /opt/annotex
COMPOSE="docker compose --env-file .env.production -f docker-compose.yml"

aws s3 cp "s3://$BUCKET/migration/annotex-db.sql.gz" /tmp/
aws s3 cp "s3://$BUCKET/migration/annotex-uploads.tar.gz" /tmp/

# The deploy already ran migrations, so the schema exists and a plain-SQL
# restore would collide with it. Drop it first: the dump carries the schema,
# the data and the _prisma_migrations table, so prisma migrate deploy becomes a
# no-op afterwards rather than trying to re-apply anything.
$COMPOSE exec -T db psql -U annotex -d annotex_db \
  -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

gunzip -c /tmp/annotex-db.sql.gz | $COMPOSE exec -T db psql -U annotex -d annotex_db
$COMPOSE exec -T backend tar xzf - -C /app/uploads < /tmp/annotex-uploads.tar.gz

$COMPOSE restart backend
```

### 4. Verify, then decommission

```bash
curl -fsS https://<new-host>/health | jq .database        # expect "up"
$COMPOSE exec -T db psql -U annotex -d annotex_db -c "SELECT count(*) FROM users;"
```

Log in as an existing user and open a dataset with images, confirming
`/uploads/...` resolves. **Users will have to sign in again** — `JWT_SECRET` and
`NEXTAUTH_SECRET` are newly generated, so old tokens and sessions are invalid.
Stored password hashes are in the dump, so accounts themselves are unaffected.

Only once that passes, release the old resources — terminating is irreversible:

```bash
aws ec2 terminate-instances --region ap-south-1 --instance-ids i-009a1bf8e94d6ee2e
aws ec2 release-address --region ap-south-1 --allocation-id <old-eip-alloc-id>
```

Releasing the old Elastic IP matters: a detached one still bills $0.005/hr, so a
forgotten address is ~$3.65/month indefinitely. Take a snapshot of the old
30 GiB volume first if you want a fallback (~$1.50/month while it exists).

## Operating it

```bash
# shell
aws ssm start-session --target <instance-id> --region ap-south-1

# logs (there is no CloudWatch log group — see "cost choices")
sudo docker compose --env-file /opt/annotex/.env.production \
  -f /opt/annotex/docker-compose.yml logs --tail=100 backend

# redeploy or roll back by hand
aws ssm send-command --document-name annotex-deploy \
  --instance-ids <instance-id> --parameters imageTag=sha-<commit>

# backup now
sudo /opt/annotex/backup.sh

# verify a deploy from on the box
curl -fsS localhost:5000/health            # expect database: "up"
docker compose --env-file /opt/annotex/.env.production \
  -f /opt/annotex/docker-compose.yml config | grep DIRECT_URL
```

That last check is the one worth remembering. `prisma migrate deploy` reads
`DIRECT_URL`, not `DATABASE_URL`, and it must resolve to the `db` host — if it
ever says `localhost`, migrations silently target the wrong database. Note it is
composed in `docker-compose.yml` from the Postgres values and is deliberately
**not** in `.env.production`, so grepping the env file for it finds nothing even
when everything is correct.

Secrets live in SSM Parameter Store under `/annotex/prod/`. The instance
regenerates `/opt/annotex/.env.production` from them on every deploy and every
boot, so rotating one is a `terraform apply` followed by a redeploy — never an
edit on the box.

## Cost choices worth knowing before you change something

Each of these is deliberate, and reversing one has a real monthly price:

| Choice | Why | Cost of the alternative |
|---|---|---|
| Public subnet, no NAT Gateway | The instance needs SSM, ECR and Solana RPC egress | NAT: **+$33/mo**; six interface VPC endpoints: **+$44/mo** |
| nginx on the host, no ALB | One instance; there is nothing to balance | ALB: **+$16/mo** |
| Postgres in a container | RDS costs more than this entire stack | RDS `db.t4g.micro` + storage: **+$14/mo** |
| SSM Parameter Store | Standard tier is free | Secrets Manager: **+$1.60/mo** for four secrets |
| `cpu_credits = "standard"` | Caps cost absolutely | `unlimited` bills surplus credits at **$0.05/vCPU-hr, uncapped** |
| No CloudWatch agent | Logs are read over SSM | Agent defaults publish ~10 custom metrics: **+$3/mo** |
| sslip.io, not Route 53 | Free wildcard DNS, real Let's Encrypt cert | Hosted zone: **+$0.50/mo** |
| No storage-class transitions on backups | At ~2 GB, transition requests cost more than they save | net loss |
| `include_credit = false` on budgets | Otherwise "actual cost" reads $0 while credits absorb the bill and the alarm never fires | silent overrun |

## Things that will bite you

- **`aws_instance` has `prevent_destroy` and `ignore_changes = [ami, user_data]`.**
  The database lives on its root volume, and `data.aws_ami` is `most_recent`, so
  without this a new Ubuntu release would replace the instance on the next
  apply. Treat any plan showing `must be replaced` here as an incident.
- **`user_data` only runs on first boot.** Editing the template changes nothing
  on a running instance. Apply changes by hand over SSM, or rebuild deliberately
  from a backup.
- **Recovery point is 24 hours.** The nightly `pg_dump` at 03:30 UTC is the only
  one. Uploads have the same exposure — they are on local disk, not S3.
- **Changing `domain` requires rebuilding the frontend image.**
  `NEXT_PUBLIC_API_BASE_URL` is inlined into the browser bundle at build time,
  so a `terraform apply` alone leaves the old host compiled in.
- **Secrets are in Terraform state** in plaintext (`random_password` →
  `aws_ssm_parameter`). The state bucket is private, encrypted and versioned,
  but anyone who can run `terraform plan` can read them.
- **Port 22 is closed.** If the SSM agent breaks you are locked out. Set
  `ssh_cidrs = ["<your-ip>/32"]` and apply as a break-glass, or use the EC2
  Serial Console.
