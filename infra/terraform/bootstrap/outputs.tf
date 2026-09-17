output "state_bucket_name" {
  description = "Put this literal value in both backend.tf files — backend blocks cannot interpolate variables."
  value       = aws_s3_bucket.tfstate.id
}

output "alerts_topic_arn" {
  description = "Pass to envs/prod as var.alerts_topic_arn."
  value       = aws_sns_topic.alerts.arn
}

output "account_id" {
  value = local.account_id
}
