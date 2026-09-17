variable "region" {
  description = "Region for the Terraform state bucket. Should match the stack's region."
  type        = string
  default     = "ap-south-1"
}

variable "alert_email" {
  description = "Address that receives budget, anomaly and instance alerts. AWS sends a confirmation mail that must be clicked before anything is delivered."
  type        = string
}

variable "anomaly_monitor_name" {
  description = "Name of the account's single dimensional spend monitor. Defaults to the one AWS creates automatically, which this config adopts by import rather than duplicating."
  type        = string
  default     = "Default-Services-Monitor"
}

variable "monthly_budget_usd" {
  description = "Monthly gross spend that triggers alerts. Sized just above the projected t3.small bill."
  type        = string
  default     = "22"
}

variable "credit_budget_usd" {
  description = "Total credit balance to burn down against. Alerts as the runway is consumed."
  type        = string
  default     = "138"
}
