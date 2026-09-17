resource "aws_iam_role" "ec2" {
  name = "${local.name}-ec2"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

# Session Manager (shell + SendCommand) and the agent's own telemetry.
resource "aws_iam_role_policy_attachment" "ssm_core" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "ecr_pull" {
  role       = aws_iam_role.ec2.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# Deliberately NOT attached: CloudWatchAgentServerPolicy. Attaching it invites
# installing the agent, whose default config publishes ~10 custom metrics at
# $0.30 each — $3/mo, a seventh of the budget, for data we read over SSM anyway.

resource "aws_iam_role_policy" "backups" {
  name = "backups"
  role = aws_iam_role.ec2.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:ListBucket"]
        Resource = aws_s3_bucket.backups.arn
      },
      {
        Effect   = "Allow"
        Action   = ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"]
        Resource = "${aws_s3_bucket.backups.arn}/*"
      },
    ]
  })
}

resource "aws_iam_role_policy" "params" {
  name = "parameters"
  role = aws_iam_role.ec2.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["ssm:GetParameter", "ssm:GetParameters", "ssm:GetParametersByPath"]
        # Scoped to this app's prefix. A wildcard here would expose every
        # parameter in the account to anything running on the box.
        #
        # Both entries are needed: GetParametersByPath authorizes against the
        # path itself, not the parameters under it, so the /* form alone is
        # denied. GetParameter needs the /* form.
        Resource = [
          "arn:aws:ssm:${var.region}:${local.account_id}:parameter${local.ssm_prefix}",
          "arn:aws:ssm:${var.region}:${local.account_id}:parameter${local.ssm_prefix}/*",
        ]
      },
      {
        # The deploy script records the live image tag so a reboot restarts the
        # right version without waiting for CI.
        Effect   = "Allow"
        Action   = ["ssm:PutParameter"]
        Resource = "arn:aws:ssm:${var.region}:${local.account_id}:parameter${local.ssm_prefix}/IMAGE_TAG"
      },
      {
        Effect   = "Allow"
        Action   = ["kms:Decrypt"]
        Resource = "*"
        Condition = {
          StringEquals = { "kms:ViaService" = "ssm.${var.region}.amazonaws.com" }
        }
      },
    ]
  })
}

# The disk-space timer publishes here. Cheaper than a CloudWatch custom metric
# ($0.30/mo) and SNS email is free for the first 1,000 messages a month.
resource "aws_iam_role_policy" "alerts" {
  name = "alerts"
  role = aws_iam_role.ec2.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["sns:Publish"]
      Resource = var.alerts_topic_arn
    }]
  })
}

resource "aws_iam_instance_profile" "ec2" {
  name = "${local.name}-ec2"
  role = aws_iam_role.ec2.name
}
