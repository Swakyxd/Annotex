terraform {
  # 1.11 introduced use_lockfile on the S3 backend, which replaces the
  # DynamoDB lock table. envs/prod depends on it.
  required_version = ">= 1.11.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}
