# ----------
# ECR (Docker repositories)
# ----------

resource "aws_ecr_repository" "lambda-utils" {
  name                 = "lambda-utils"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "lambda-utils-expire-old" {
  repository = aws_ecr_repository.lambda-utils.name

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

resource "aws_lambda_function" "lambda-inject-meta" {
  function_name = "lambda-inject-meta"
  role          = aws_iam_role.kalkulacka.arn

  package_type = "Image"
  image_uri    = "${aws_ecr_repository.lambda-utils.repository_url}:latest"

  image_config {
    command = ["injectMetadata.handler"]
  }
}

resource "aws_lambda_permission" "api-gateway-invoke-lambda-inject-meta" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-inject-meta.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.kalkulacka.execution_arn}/*/*"
}

resource "aws_lambda_function" "lambda-gen-ogimage" {
  function_name = "lambda-gen-ogimage"
  role          = aws_iam_role.kalkulacka.arn
  memory_size = 512
  timeout = 30

  package_type = "Image"
  image_uri    = "${aws_ecr_repository.lambda-utils.repository_url}:latest"

  image_config {
    command = ["renderMetaImage.handler"]
  }
}

resource "aws_lambda_permission" "api-gateway-invoke-lambda-gen-ogimage" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-gen-ogimage.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.kalkulacka.execution_arn}/*/*"
}
