# ----------
# ECR (Docker repositories)
# ----------

resource "aws_ecr_repository" "backend" {
  name                 = "backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "backend-expire-old" {
  repository = aws_ecr_repository.backend.name

  policy = <<EOF
  {
      "rules": [
          {
              "rulePriority": 1,
              "description": "Expire images older than 14 days",
              "selection": {
                  "tagStatus": "untagged",
                  "countType": "sinceImagePushed",
                  "countUnit": "days",
                  "countNumber": 14
              },
              "action": {
                  "type": "expire"
              }
          }
      ]
  }
  EOF
}

resource "aws_iam_role" "kalkulacka" {
  name = "kalkulacka"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "kalkulacka-cloudwatch" {
  name   = "kalkulacka-cloudwatch"
  role   = aws_iam_role.kalkulacka.id
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource": "*"
      }
    ]
}
EOF
}

resource "aws_iam_role_policy" "kalkulacka-dynamodb" {
  name   = "kalkulacka-dynamodb"
  role   = aws_iam_role.kalkulacka.id
  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "dynamodb:GetItem",
          "dynamodb:PutItem"
        ],
        "Resource": "${aws_dynamodb_table.dynamodb_table_results.arn}"
      }
    ]
}
EOF
}

resource "aws_lambda_permission" "api-gateway-invoke-lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.kalkulacka.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.kalkulacka.execution_arn}/*/*"
}

resource "aws_lambda_function" "kalkulacka" {
  function_name = "Kalkulacka"
  role          = aws_iam_role.kalkulacka.arn

  package_type = "Image"
  image_uri    = "${aws_ecr_repository.backend.repository_url}:latest"
}


