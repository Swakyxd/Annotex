data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
}

# ---------------------------------------------------------------- state bucket
#
# This bucket holds the state for BOTH root modules, including its own. Deleting
# it orphans every resource in the stack, which is what prevent_destroy guards.

resource "aws_s3_bucket" "tfstate" {
  bucket = "annotex-tfstate-${local.account_id}"

  lifecycle {
    prevent_destroy = true
  }
}

# Without versioning there is no way back from a corrupted or truncated state
# write. This is the whole safety net.
resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  versioning_configuration {
    status = "Enabled"
  }
}

# SSE-S3 rather than SSE-KMS: a customer-managed key would be $1/mo, and the
# AWS-managed S3 key offers the same at-rest protection here.
resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_lifecycle_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id

  depends_on = [aws_s3_bucket_versioning.tfstate]

  rule {
    id     = "expire-old-state-versions"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 90
    }
  }

  rule {
    id     = "abort-incomplete-uploads"
    status = "Enabled"

    filter {}

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}

# ------------------------------------------------------------------- alerting
#
# Used by the CloudWatch alarms and the on-box disk-space check in envs/prod.
# Budgets and anomaly detection email directly rather than routing through here,
# which avoids needing a topic policy for the AWS service principals.

resource "aws_sns_topic" "alerts" {
  name = "annotex-alerts"
}

resource "aws_sns_topic_subscription" "alerts_email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email

  # AWS emails a confirmation link. Until it is clicked this subscription stays
  # "PendingConfirmation" and delivers nothing — Terraform cannot detect that.
}

# -------------------------------------------------------------------- budgets
#
# include_credit = false is the single most important setting in this file.
# Left at its default of true, "actual cost" reads $0 for as long as promotional
# credits absorb the bill, so the alarm stays silent right up until the credits
# are gone. Tracking gross spend is the only way to see the burn rate.

resource "aws_budgets_budget" "monthly" {
  name         = "annotex-monthly-cost"
  budget_type  = "COST"
  time_unit    = "MONTHLY"
  limit_amount = var.monthly_budget_usd
  limit_unit   = "USD"

  cost_types {
    include_credit = false
    use_amortized  = true
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 50
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.alert_email]
  }
}

# The runway alarm. Tells you the credits are running out while there is still
# time to downsize rather than after the account is cut off.
resource "aws_budgets_budget" "credit_burn" {
  name         = "annotex-annual-credit-burn"
  budget_type  = "COST"
  time_unit    = "ANNUALLY"
  limit_amount = var.credit_budget_usd
  limit_unit   = "USD"

  cost_types {
    include_credit = false
    use_amortized  = true
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 50
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }
}

# ----------------------------------------------------- cost anomaly detection
#
# Free, and catches the failure mode budgets cannot: a single service suddenly
# costing more than its history predicts, days before the monthly threshold trips.
#
# AWS permits exactly one DIMENSIONAL/SERVICE monitor per account and creates
# one called "Default-Services-Monitor" automatically, so creating another fails
# with "Limit exceeded on dimensional spend monitor creation". This resource
# therefore adopts the existing monitor rather than adding one — keep the name
# matching so there is no diff, and import it before the first apply:
#
#   terraform import aws_ce_anomaly_monitor.services <monitor-arn>
#
# (aws ce get-anomaly-monitors --region us-east-1 prints the ARN.)
resource "aws_ce_anomaly_monitor" "services" {
  provider = aws.billing

  name              = var.anomaly_monitor_name
  monitor_type      = "DIMENSIONAL"
  monitor_dimension = "SERVICE"
}

resource "aws_ce_anomaly_subscription" "services" {
  provider = aws.billing

  name      = "annotex-anomaly-alerts"
  frequency = "DAILY" # IMMEDIATE requires an SNS subscriber, which needs a topic policy
  monitor_arn_list = [
    aws_ce_anomaly_monitor.services.arn,
  ]

  subscriber {
    type    = "EMAIL"
    address = var.alert_email
  }

  threshold_expression {
    dimension {
      key           = "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
      match_options = ["GREATER_THAN_OR_EQUAL"]
      values        = ["5"]
    }
  }
}
