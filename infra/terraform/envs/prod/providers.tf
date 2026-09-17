provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project   = "annotex"
      Env       = "prod"
      ManagedBy = "terraform"
    }
  }
}

data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
  name       = "annotex-prod"

  # sslip.io resolves 13-234-5-6.sslip.io to 13.234.5.6, so Let's Encrypt can
  # issue a real certificate with no domain and no DNS records. Because the EIP
  # is allocated separately from the instance, this is known at plan time.
  host = var.domain != "" ? var.domain : "${replace(aws_eip.app.public_ip, ".", "-")}.sslip.io"

  base_url = "https://${local.host}"

  ssm_prefix = "/annotex/prod"
}
