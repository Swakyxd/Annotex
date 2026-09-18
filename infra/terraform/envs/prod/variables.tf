variable "region" {
  description = "Baked into state, ECR image URLs and the Elastic IP. Changing it means rebuilding the stack."
  type        = string
  default     = "ap-south-1"
}

variable "availability_zone" {
  description = "Single AZ. The EBS root volume holds the database, so there is nothing to spread across zones."
  type        = string
  default     = "ap-south-1a"
}

variable "instance_type" {
  description = "t3.small gives 2 GiB RAM for Postgres + backend + frontend on one box. t3.micro halves both the memory and the cost; neither is free on this account's credit plan."
  type        = string
  default     = "t3.small"
}

variable "root_volume_gb" {
  description = "Holds the OS, Docker images, Postgres data, uploads, logs and swap. A full disk corrupts Postgres, so do not undersize this."
  type        = number
  default     = 16
}

variable "domain" {
  description = "Custom hostname. Empty means derive an sslip.io name from the Elastic IP, which needs no DNS records. Changing this later requires a frontend rebuild and a new certificate."
  type        = string
  default     = ""
}

variable "letsencrypt_email" {
  description = "Address Let's Encrypt sends expiry notices to."
  type        = string
}

variable "treasury_wallet" {
  description = "Solana devnet pubkey for PROJECT_TREASURY_WALLET. The backend refuses to boot in production without it."
  type        = string
  default     = "11111111111111111111111111111111"
}

variable "payout_token_mint" {
  description = "Optional SPL token mint for payouts. Left empty, no parameter is created and the app sees an empty value."
  type        = string
  default     = ""
}

variable "solana_rpc_url" {
  description = "Outbound HTTPS target for the blockchain service."
  type        = string
  default     = "https://api.devnet.solana.com"
}

variable "blockchain_network" {
  type    = string
  default = "devnet"
}

variable "github_repo" {
  description = "owner/repo. The OIDC trust policy is pinned to this repo's main branch."
  type        = string
  default     = "myaumyauverse/Annotex"
}

variable "github_branch" {
  description = "Only this branch can assume the deploy role. A wildcard here would let any pull request branch deploy."
  type        = string
  default     = "main"
}

variable "github_environment" {
  description = "GitHub Actions environment the deploy job targets. A job with an environment gets an \"environment:<name>\" subject claim instead of a \"ref:refs/heads/<branch>\" one, so both have to be trusted."
  type        = string
  default     = "production"
}

variable "github_oidc_sub_prefix" {
  description = <<-EOT
    Prefix of the OIDC subject claim GitHub sends, without the trailing context.

    Leave empty for the classic form, derived as "repo:<owner>/<name>". Set it
    explicitly when the repository has immutable subject claims enabled, where
    GitHub substitutes numeric owner and repository IDs and sends
    "repo:<owner>@<owner_id>/<name>@<repo_id>" instead. The two do not match, and
    a mismatch fails as "Not authorized to perform sts:AssumeRoleWithWebIdentity".

    Read the current value with:
      gh api repos/<owner>/<name>/actions/oidc/customization/sub
  EOT
  type        = string
  default     = ""
}

variable "alerts_topic_arn" {
  description = "SNS topic from the bootstrap module. Receives CloudWatch alarms and the on-box disk-space warning."
  type        = string
}

variable "ssh_cidrs" {
  description = "Break-glass only. Normal access is SSM Session Manager, which is why port 22 is closed. Set to your own /32 temporarily if the SSM agent ever breaks."
  type        = list(string)
  default     = []
}

variable "ecr_keep_images" {
  description = "Tagged images retained per repository: one live plus rollback targets. Each extra tag is roughly 0.65 GB of billable ECR storage."
  type        = number
  default     = 3
}

variable "backup_retain_db_days" {
  type    = number
  default = 30
}

variable "backup_retain_uploads_days" {
  type    = number
  default = 14
}
