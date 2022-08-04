terraform {
  required_version = "1.1.9"

  required_providers {
    aws = "~> 4.0"
    google-beta = "~> 4.31.0"
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

provider "google-beta" {
  project     = "my-project-id"
  region      = "us-central"
  zone        = "us-central-c"
}
