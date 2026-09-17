provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Project   = "annotex"
      ManagedBy = "terraform"
      Module    = "bootstrap"
    }
  }
}

# Cost Explorer and Budgets are global services whose API endpoints live only in
# us-east-1. They are reachable from any region's provider for Budgets, but
# aws_ce_anomaly_* will fail anywhere else.
provider "aws" {
  alias  = "billing"
  region = "us-east-1"

  default_tags {
    tags = {
      Project   = "annotex"
      ManagedBy = "terraform"
      Module    = "bootstrap"
    }
  }
}
