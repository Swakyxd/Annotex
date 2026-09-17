locals {
  ecr_repos = {
    backend  = "annotex/backend"
    frontend = "annotex/frontend"
  }

  registry = "${local.account_id}.dkr.ecr.${var.region}.amazonaws.com"
}

resource "aws_ecr_repository" "app" {
  for_each = local.ecr_repos

  name = each.value

  # Immutable tags force every deploy to carry its commit SHA, which makes
  # rollback deterministic: .last-good names an image that cannot have been
  # overwritten since it was verified healthy.
  image_tag_mutability = "IMMUTABLE"

  image_scanning_configuration {
    # Basic scanning, free. Registry-level enhanced (Inspector) scanning is
    # $0.09 per image per month.
    scan_on_push = true
  }
}

# Without this, ~20 pushes a month at ~650 MB each reaches 13 GB ($1.30/mo) by
# month two and keeps climbing. Retaining three tags leaves one live image plus
# two rollback targets.
resource "aws_ecr_lifecycle_policy" "app" {
  for_each = aws_ecr_repository.app

  repository = each.value.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 10
        description  = "Expire untagged layers left behind by overwritten builds"
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = 1
        }
        action = { type = "expire" }
      },
      {
        rulePriority = 20
        description  = "Keep only the most recent sha- tags"
        selection = {
          tagStatus     = "tagged"
          tagPrefixList = ["sha-"]
          countType     = "imageCountMoreThan"
          countNumber   = var.ecr_keep_images
        }
        action = { type = "expire" }
      },
    ]
  })
}
