# A public subnet, deliberately.
#
# The "secure" private-subnet pattern for an instance that needs SSM and ECR
# costs either a NAT Gateway ($0.045/hr = ~$33/mo) or six interface VPC
# endpoints at $0.01/hr each (~$44/mo). Either one exceeds the entire budget
# for this stack several times over.
#
# A public subnet reaches SSM, ECR, apt, Let's Encrypt and the Solana RPC
# endpoint over the Internet Gateway for free. Exposure is controlled by the
# security group below, which opens only 80 and 443 — not by network topology.
#
# Do not "fix" this by adding a NAT Gateway.

resource "aws_vpc" "main" {
  cidr_block           = "10.20.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = local.name }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = { Name = local.name }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.20.1.0/24"
  availability_zone = var.availability_zone

  # The Elastic IP supplies the public address. Auto-assigning another one would
  # attach a second billable IPv4 ($0.005/hr each since Feb 2024).
  map_public_ip_on_launch = false

  tags = { Name = "${local.name}-public" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  tags = { Name = "${local.name}-public" }
}

resource "aws_route" "default" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Gateway endpoints are free (unlike interface endpoints). Keeps nightly backup
# traffic on the AWS network instead of out through the IGW.
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${var.region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.public.id]

  tags = { Name = "${local.name}-s3" }
}

resource "aws_security_group" "web" {
  name        = "${local.name}-web"
  description = "Annotex public ingress. HTTP/HTTPS only; shell access is via SSM."
  vpc_id      = aws_vpc.main.id

  tags = { Name = "${local.name}-web" }
}

resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.web.id
  # AWS restricts rule descriptions to a-zA-Z0-9._-:/()#,@[]+=&;{}!$* — no dashes
  # beyond ASCII hyphen, so keep this plain.
  description = "HTTP for the ACME challenge and the redirect to HTTPS"
  cidr_ipv4   = "0.0.0.0/0"
  from_port   = 80
  to_port     = 80
  ip_protocol = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "https" {
  security_group_id = aws_security_group.web.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
}

# Empty by default. Port 22 stays closed; shell access is SSM Session Manager.
# Populate var.ssh_cidrs only to recover from a broken SSM agent.
resource "aws_vpc_security_group_ingress_rule" "ssh_breakglass" {
  for_each = toset(var.ssh_cidrs)

  security_group_id = aws_security_group.web.id
  description       = "Break-glass SSH"
  cidr_ipv4         = each.value
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
}

# Egress must stay open: SSM, ECR, apt, Let's Encrypt ACME and api.devnet.solana.com.
resource "aws_vpc_security_group_egress_rule" "all" {
  security_group_id = aws_security_group.web.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
