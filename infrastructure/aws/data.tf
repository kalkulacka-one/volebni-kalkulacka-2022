resource "aws_s3_bucket" "data" {
  bucket = var.data-bucket-name
}

resource "aws_s3_bucket_acl" "data" {
  bucket = aws_s3_bucket.data.id
  acl    = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "data" {
  bucket = aws_s3_bucket.data.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_policy" "data" {
  bucket = aws_s3_bucket.data.id
  policy = <<EOT
    {
      "Version": "2008-10-17",
      "Id": "PolicyForCloudFrontPrivateContent",
      "Statement": [
        {
          "Sid": "1",
          "Effect": "Allow",
          "Principal": {
            "AWS": "${aws_cloudfront_origin_access_identity.default.iam_arn}"
          },
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::${var.data-bucket-name}/*"
        }
      ]
    }
  EOT
}
