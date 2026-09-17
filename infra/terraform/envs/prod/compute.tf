data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Allocated standalone rather than via aws_instance, for two reasons: its
# public_ip is then known at plan time (so the sslip.io hostname can be baked
# into user_data and Parameter Store), and it survives instance replacement.
#
# An orphaned Elastic IP bills $0.005/hr forever, so never allocate one outside
# Terraform and never allocate a spare.
resource "aws_eip" "app" {
  domain = "vpc"

  tags = { Name = local.name }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type

  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2.name

  # The Elastic IP is the public address. Auto-assigning one here would attach a
  # second billable IPv4.
  associate_public_ip_address = false

  # t3 and t4g default to "unlimited", where surplus CPU credits bill at
  # $0.05/vCPU-hour with no ceiling — a runaway process can add real money with
  # no warning. "standard" caps cost absolutely: once credits run out the
  # instance throttles to its baseline instead of billing for the excess.
  credit_specification {
    cpu_credits = "standard"
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required" # IMDSv2 only
    # 1 hop reaches the host but not inside a container, so a compromised
    # container cannot read the instance role's credentials.
    http_put_response_hop_limit = 1
  }

  root_block_device {
    volume_type = "gp3"
    volume_size = var.root_volume_gb
    encrypted   = true # AWS-managed alias/aws/ebs, free

    # gp3 includes 3,000 IOPS and 125 MB/s at no charge. Provisioning beyond
    # that is $0.005 per IOPS-month — do not raise these.
    iops       = 3000
    throughput = 125

    delete_on_termination = true

    tags = { Name = "${local.name}-root" }
  }

  # gzipped, because the rendered script exceeds EC2's 16 KB user_data ceiling.
  # cloud-init detects the gzip magic bytes and decompresses before executing,
  # so this needs no change on the instance side.
  user_data_base64 = base64gzip(templatefile("${path.module}/templates/user_data.sh.tftpl", {
    host              = local.host
    letsencrypt_email = var.letsencrypt_email
    region            = var.region
    ssm_prefix        = local.ssm_prefix
    registry          = local.registry
    backup_bucket     = aws_s3_bucket.backups.id
    alerts_topic_arn  = var.alerts_topic_arn
    app_dir           = "/opt/annotex"

    # Injected as opaque strings. Substituted values are not re-interpolated, so
    # the compose file's ${VAR} syntax survives untouched.
    compose_file = file("${path.module}/templates/docker-compose.ecr.yml")
    nginx_conf = templatefile("${path.module}/templates/nginx-annotex.conf.tftpl", {
      host = local.host
    })
  }))

  tags = { Name = "${local.name}-app" }

  lifecycle {
    # The database lives on this instance's root volume. Replacing the instance
    # destroys it.
    #
    # data.aws_ami is most_recent, so Canonical publishing a new Ubuntu image
    # would otherwise force replacement on the next apply. Editing user_data
    # would too — and user_data only runs on first boot anyway, so a change
    # there is never worth a replacement. Roll changes out through the SSM
    # deploy document instead.
    #
    # associate_public_ip_address is in here because aws_eip_association gives
    # the instance an address, so AWS reports it back as true while the config
    # says false. That attribute forces replacement, so without this every
    # subsequent apply would try to rebuild the instance and lose the database.
    #
    # Treat any plan showing "must be replaced" for this resource as an incident.
    ignore_changes  = [ami, user_data_base64, associate_public_ip_address]
    prevent_destroy = true
  }

  # Certbot needs port 80 reachable at the Elastic IP, so the boot-time TLS
  # timer must not start before the address is attached.
  depends_on = [
    aws_iam_role_policy.params,
    aws_iam_role_policy.backups,
    aws_ssm_parameter.secret,
    aws_ssm_parameter.plain,
    aws_ssm_parameter.image_tag,
  ]
}

resource "aws_eip_association" "app" {
  instance_id   = aws_instance.app.id
  allocation_id = aws_eip.app.id
}
