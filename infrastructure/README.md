# Infrastructure

Our infrastructure is running on AWS. We use Terraform to define it as Infrastructure as Code and Github Actions to deploy and update.

More details about our principles can be found in our [DevTalk](https://cesko.digital/cedu/devtalk-1-infrastruktura). _(In czech)_

## Deployment

To deploy into new AWS account, you need to create these things outside of Terraform:

1. Create backend bucket on AWS S3 to hold Terraform state.
2. Create SSL certificate for your domain (and all domain aliases) on AWS Certificate Manager. This has to be done in region **US East (N. Virginia) us-east-1**

After that change backend bucket in /infrastructure/aws/terraform.tf and set this Github Secrets:

```
AWS_ACCESS_KEY_ID
AWS_REGION
AWS_SECRET_ACCESS_KEY
DATA_BUCKET_NAME
DOMAIN
DOMAIN_CERTIFICATE_ARN
FRONTEND_BUCKET_NAME
```

With this secrets you can manually run the action `terraform-apply.yaml` _(it might take two or more run to complete successfuly, because of default timeouts)_.
Once completed, add this Github Secrets:

```
CLOUDFRONT_DEPLOYMENT_ID
```

Finally set your DNS records for CloudFront CNAME (or ANAME when needed for root domain).

At this point all other Github Actions will be connected to your infrastructure and deploy on any change to **main** branch.
