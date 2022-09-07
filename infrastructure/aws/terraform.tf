terraform {
  required_version = "1.1.9"

  required_providers {
    aws = "~> 4.0"
    local = {
      source = "hashicorp/local"
    }
  }

  backend "s3" {
    bucket = "cesko-digital-kalkulacka-terraform-backend"
    key    = "terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = var.aws-region
}

provider "aws" {
  region  = "us-east-1"
  alias   = "global"
}