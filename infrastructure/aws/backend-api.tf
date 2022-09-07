resource "aws_api_gateway_rest_api" "kalkulacka" {
  body = jsonencode({
    "openapi" : "3.0.1",
    "info" : {
      "title" : "kalkulacka",
      "version" : "1.0"
    },
    "paths" : {
      "/image/{proxy+}" : {
        "x-amazon-apigateway-any-method" : {
          "parameters" : [ {
            "name" : "proxy",
            "in" : "path",
            "required" : true,
            "schema" : {
              "type" : "string"
            }
          } ],
          "x-amazon-apigateway-integration" : {
            "httpMethod" : "POST",
            "uri" : aws_lambda_function.lambda-gen-ogimage.invoke_arn,
            "responses" : {
              "default" : {
                "statusCode" : "200",
              }
            },
            "passthroughBehavior" : "when_no_match",
            "cacheNamespace" : "hfghnw",
            "cacheKeyParameters" : [ "method.request.path.proxy" ],
            "contentHandling" : "CONVERT_TO_BINARY",
            "type" : "aws_proxy"
          }
        }
      },
      "/test/{proxy+}" : {
        "x-amazon-apigateway-any-method" : {
          "parameters" : [ {
            "name" : "proxy",
            "in" : "path",
            "required" : true,
            "schema" : {
              "type" : "string"
            }
          } ],
          "x-amazon-apigateway-integration" : {
            "httpMethod" : "POST",
            "uri" : aws_lambda_function.lambda-inject-meta.invoke_arn,
            "responses" : {
              "default" : {
                "statusCode" : "200"
              }
            },
            "passthroughBehavior" : "when_no_match",
            "cacheNamespace" : "hfghnw",
            "cacheKeyParameters" : [ "method.request.path.proxy" ],
            "contentHandling" : "CONVERT_TO_TEXT",
            "type" : "aws_proxy"
          }
        }
      },
      "/{proxy+}" : {
        "x-amazon-apigateway-any-method" : {
          "parameters" : [ {
            "name" : "proxy",
            "in" : "path",
            "required" : true,
            "schema" : {
              "type" : "string"
            }
          } ],
          "x-amazon-apigateway-integration" : {
            "httpMethod" : "POST",
            "uri" : aws_lambda_function.kalkulacka.invoke_arn,
            "responses" : {
              "default" : {
                "statusCode" : "200"
              }
            },
            "passthroughBehavior" : "when_no_match",
            "cacheNamespace" : "hfghnw",
            "cacheKeyParameters" : [ "method.request.path.proxy" ],
            "contentHandling" : "CONVERT_TO_TEXT",
            "type" : "aws_proxy"
          }
        }
      },
      "/" : {
        "x-amazon-apigateway-any-method" : {
          "x-amazon-apigateway-integration" : {
            "httpMethod" : "POST",
            "uri" : aws_lambda_function.kalkulacka.invoke_arn,
            "responses" : {
              "default" : {
                "statusCode" : "200"
              }
            },
            "passthroughBehavior" : "when_no_match",
            "contentHandling" : "CONVERT_TO_TEXT",
            "type" : "aws_proxy"
          }
        }
      }
    },
    "components" : { }
  })

  name = "kalkulacka"
  binary_media_types = [
    "*/*"
  ]

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "kalkulacka" {
  rest_api_id = aws_api_gateway_rest_api.kalkulacka.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.kalkulacka.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "kalkulacka" {
  deployment_id = aws_api_gateway_deployment.kalkulacka.id
  rest_api_id   = aws_api_gateway_rest_api.kalkulacka.id
  stage_name    = "default"
}