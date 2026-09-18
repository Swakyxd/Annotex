# GitHub Actions authenticates by exchanging a short-lived OIDC token for this
# role. No AWS access keys are stored in the repository.

data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

locals {
  github_sub_prefix = var.github_oidc_sub_prefix != "" ? var.github_oidc_sub_prefix : "repo:${var.github_repo}"

  # GitHub picks the subject claim's context from the job, not the workflow:
  # a job with no `environment:` gets "ref:refs/heads/<branch>", while one that
  # targets an environment gets "environment:<name>" instead — the branch is not
  # included. build-push is the former and deploy is the latter, so trusting only
  # one of these fails half the pipeline with
  # "Not authorized to perform sts:AssumeRoleWithWebIdentity".
  #
  # An IAM condition with a list of values matches if any one of them matches.
  github_subs = [
    "${local.github_sub_prefix}:ref:refs/heads/${var.github_branch}",
    "${local.github_sub_prefix}:environment:${var.github_environment}",
  ]
}

resource "aws_iam_role" "github_actions" {
  name = "${local.name}-github-actions"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Federated = aws_iam_openid_connect_provider.github.arn }
      Action    = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
        }
        # Pinned to one branch and one environment. A wildcard such as
        # repo:owner/name:* would let a workflow on any pull request branch
        # assume this role and deploy.
        #
        # The prefix is not always "repo:<owner>/<name>": with immutable subject
        # claims enabled GitHub sends numeric owner and repo IDs instead. See
        # var.github_oidc_sub_prefix.
        #
        # The environment entry is only as strong as the environment's own
        # deployment branch rules — without one, a run on any branch that targets
        # this environment satisfies it. Add a branch rule limiting the
        # environment to var.github_branch in the repo settings to close that.
        StringLike = {
          "token.actions.githubusercontent.com:sub" = local.github_subs
        }
      }
    }]
  })
}

resource "aws_iam_role_policy" "github_actions" {
  name = "deploy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["ecr:GetAuthorizationToken"]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:PutImage",
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer",
        ]
        Resource = [for r in aws_ecr_repository.app : r.arn]
      },
      {
        Effect = "Allow"
        Action = ["ssm:SendCommand"]
        # Both halves are required, and both are narrow: this role can run only
        # the annotex-deploy document, and only against this one instance.
        Resource = [
          aws_ssm_document.deploy.arn,
          "arn:aws:ec2:${var.region}:${local.account_id}:instance/${aws_instance.app.id}",
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "ssm:GetCommandInvocation",
          "ssm:ListCommandInvocations",
          "ssm:ListCommands",
        ]
        Resource = "*"
      },
      {
        # The frontend bundle inlines this at build time, so CI needs to read it
        # before building the image.
        Effect   = "Allow"
        Action   = ["ssm:GetParameter"]
        Resource = "arn:aws:ssm:${var.region}:${local.account_id}:parameter${local.ssm_prefix}/NEXT_PUBLIC_API_BASE_URL"
      },
    ]
  })
}
