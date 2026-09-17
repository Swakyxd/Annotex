# A purpose-built document rather than letting CI call AWS-RunShellScript.
#
# Granting ssm:SendCommand on AWS-RunShellScript is equivalent to handing the
# caller root on the instance — a compromised workflow could run anything.
# Scoping the CI role to this document means it can only ever run this reviewed
# script, with one string parameter.
#
# It is also versioned in Terraform, so there is no deploy script on the box
# that could drift from what is in the repo.

resource "aws_ssm_document" "deploy" {
  name            = "annotex-deploy"
  document_type   = "Command"
  document_format = "JSON"

  content = jsonencode({
    schemaVersion = "2.2"
    description   = "Pull the given image tag from ECR, migrate, restart, and roll back if unhealthy."

    parameters = {
      imageTag = {
        type        = "String"
        description = "ECR tag to deploy, e.g. sha-<commit>."
        # Anchored so the parameter cannot smuggle shell metacharacters into the
        # script body.
        allowedPattern = "^[A-Za-z0-9._-]{1,128}$"
      }
    }

    mainSteps = [{
      action = "aws:runShellScript"
      name   = "deploy"
      inputs = {
        timeoutSeconds = "900"
        runCommand = split("\n", templatefile("${path.module}/templates/deploy.sh.tftpl", {
          app_dir    = "/opt/annotex"
          region     = var.region
          registry   = local.registry
          ssm_prefix = local.ssm_prefix
        }))
      }
    }]
  })
}
