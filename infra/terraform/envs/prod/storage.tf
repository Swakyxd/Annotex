resource "aws_s3_bucket" "backups" {
  bucket = "${local.name}-backups-${local.account_id}"
}

resource "aws_s3_bucket_versioning" "backups" {
  bucket = aws_s3_bucket.backups.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "backups" {
  bucket = aws_s3_bucket.backups.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Expiration only, no storage-class transitions. At this volume (~2 GB) moving
# objects to IA or Glacier loses money: transition requests are $0.01 per 1,000,
# objects under 128 KB are ineligible for IA, and Glacier adds 40 KB of metadata
# per object plus 90-day minimum durations and retrieval fees.
resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  depends_on = [aws_s3_bucket_versioning.backups]

  rule {
    id     = "expire-db-dumps"
    status = "Enabled"

    filter {
      prefix = "db/"
    }

    expiration {
      days = var.backup_retain_db_days
    }
  }

  rule {
    id     = "expire-upload-archives"
    status = "Enabled"

    filter {
      prefix = "uploads/"
    }

    expiration {
      days = var.backup_retain_uploads_days
    }
  }

  rule {
    id     = "expire-noncurrent"
    status = "Enabled"

    filter {}

    noncurrent_version_expiration {
      noncurrent_days = 7
    }
  }

  rule {
    id     = "abort-incomplete-uploads"
    status = "Enabled"

    filter {}

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}
