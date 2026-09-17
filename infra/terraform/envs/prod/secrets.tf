# SSM Parameter Store, not Secrets Manager.
#
# Secrets Manager bills $0.40 per secret per month. The four secrets below would
# be $19.20/year — 14% of the entire credit balance — for rotation and
# cross-account sharing this stack does not use. Parameter Store Standard tier
# is free for the first 10,000 parameters.
#
# key_id is deliberately unset on every SecureString: that selects the
# AWS-managed alias/aws/ssm key, which is free. A customer-managed key is $1/mo.

locals {
  # No special characters: these values are interpolated into Postgres
  # connection strings, where reserved characters would need percent-encoding.
  secret_length = 64

  db_user = "annotex"
  db_name = "annotex_db"

  # Plain (non-SecureString) parameters. Public configuration, no secrets.
  #
  # PAYOUT_TOKEN_MINT is absent on purpose: it is optional, and Parameter Store
  # rejects empty values. render-env.sh writes an empty default for it, which
  # anything here would override.
  plain_parameters = merge(
    {
      POSTGRES_USER            = local.db_user
      POSTGRES_DB              = local.db_name
      API_VERSION              = "v1"
      JWT_EXPIRES_IN           = "24h"
      JWT_REFRESH_EXPIRES_IN   = "7d"
      CORS_ORIGIN              = local.base_url
      NEXT_PUBLIC_API_BASE_URL = "${local.base_url}/api/v1"
      NEXTAUTH_URL             = local.base_url
      BLOCKCHAIN_NETWORK       = var.blockchain_network
      SOLANA_RPC_URL           = var.solana_rpc_url
      PROJECT_TREASURY_WALLET  = var.treasury_wallet
      LOG_LEVEL                = "info"
      S3_BUCKET                = aws_s3_bucket.backups.id
    },
    var.payout_token_mint != "" ? { PAYOUT_TOKEN_MINT = var.payout_token_mint } : {},
  )
}

resource "random_password" "postgres" {
  length  = local.secret_length
  special = false
}

resource "random_password" "jwt" {
  length  = local.secret_length
  special = false
}

resource "random_password" "jwt_refresh" {
  length  = local.secret_length
  special = false
}

resource "random_password" "nextauth" {
  length  = local.secret_length
  special = false
}

locals {
  secret_parameters = {
    POSTGRES_PASSWORD  = random_password.postgres.result
    JWT_SECRET         = random_password.jwt.result
    JWT_REFRESH_SECRET = random_password.jwt_refresh.result
    NEXTAUTH_SECRET    = random_password.nextauth.result
  }
}

resource "aws_ssm_parameter" "secret" {
  for_each = local.secret_parameters

  name  = "${local.ssm_prefix}/${each.key}"
  type  = "SecureString"
  tier  = "Standard"
  value = each.value
}

resource "aws_ssm_parameter" "plain" {
  for_each = local.plain_parameters

  name  = "${local.ssm_prefix}/${each.key}"
  type  = "String"
  tier  = "Standard"
  value = each.value
}

# The live image tag, written by the deploy script on every successful release.
# Terraform seeds it once and then leaves it alone — without ignore_changes,
# every plan would try to roll production back to "bootstrap".
resource "aws_ssm_parameter" "image_tag" {
  name  = "${local.ssm_prefix}/IMAGE_TAG"
  type  = "String"
  tier  = "Standard"
  value = "bootstrap"

  lifecycle {
    ignore_changes = [value]
  }
}
