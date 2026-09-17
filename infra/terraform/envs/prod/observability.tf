# Free-tier only: two alarms (the first ten are free) and no log groups.
#
# Deliberately absent: the CloudWatch agent. Its default configuration publishes
# roughly ten custom metrics at $0.30 each — $3/mo against a ~$22 budget — for
# memory and disk figures this stack gets from a systemd timer and SNS instead.
# Container logs stay on the json-file driver (10 MB x 3 per service) and are
# read through Session Manager.

# System status checks fail when the underlying host has a problem the instance
# cannot fix. The ec2:recover action migrates it to healthy hardware, keeping the
# instance id, Elastic IP and EBS volume. Free.
resource "aws_cloudwatch_metric_alarm" "status_check" {
  alarm_name          = "${local.name}-status-check-failed"
  alarm_description   = "System status check failed; attempting automatic recovery."
  namespace           = "AWS/EC2"
  metric_name         = "StatusCheckFailed_System"
  statistic           = "Maximum"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  threshold           = 1
  period              = 60
  evaluation_periods  = 2

  dimensions = {
    InstanceId = aws_instance.app.id
  }

  alarm_actions = [
    "arn:aws:automate:${var.region}:ec2:recover",
    var.alerts_topic_arn,
  ]
}

# With cpu_credits = "standard" an exhausted balance means throttling to
# baseline, not a surprise bill. This is the early warning that the instance is
# undersized for its load.
resource "aws_cloudwatch_metric_alarm" "cpu_credits" {
  alarm_name          = "${local.name}-cpu-credits-low"
  alarm_description   = "CPU credit balance is low; the instance will throttle to baseline performance."
  namespace           = "AWS/EC2"
  metric_name         = "CPUCreditBalance"
  statistic           = "Average"
  comparison_operator = "LessThanThreshold"
  threshold           = 20
  period              = 300
  evaluation_periods  = 2
  treat_missing_data  = "notBreaching"

  dimensions = {
    InstanceId = aws_instance.app.id
  }

  alarm_actions = [var.alerts_topic_arn]
}
