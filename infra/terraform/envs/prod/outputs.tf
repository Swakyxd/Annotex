output "host" {
  description = "Public hostname. Set as the PUBLIC_API_BASE_URL GitHub variable, via https://<host>/api/v1."
  value       = local.host
}

output "url" {
  value = local.base_url
}

output "public_ip" {
  value = aws_eip.app.public_ip
}

output "instance_id" {
  description = "Set as the EC2_INSTANCE_ID GitHub variable."
  value       = aws_instance.app.id
}

output "github_actions_role_arn" {
  description = "Set as the AWS_ROLE_ARN GitHub variable."
  value       = aws_iam_role.github_actions.arn
}

output "ecr_registry" {
  value = local.registry
}

output "ecr_repositories" {
  value = { for k, r in aws_ecr_repository.app : k => r.repository_url }
}

output "backups_bucket" {
  value = aws_s3_bucket.backups.id
}

output "session_command" {
  description = "Shell access. Requires the Session Manager plugin for the AWS CLI."
  value       = "aws ssm start-session --target ${aws_instance.app.id} --region ${var.region}"
}

output "github_variables" {
  description = "Repository variables to set under Settings > Secrets and variables > Actions > Variables."
  value = {
    AWS_ROLE_ARN        = aws_iam_role.github_actions.arn
    AWS_REGION          = var.region
    EC2_INSTANCE_ID     = aws_instance.app.id
    PUBLIC_API_BASE_URL = "${local.base_url}/api/v1"
  }
}
