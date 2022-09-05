resource "aws_dynamodb_table" "dynamodb-table-results" {
  name           = "Results"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "result_id"

  attribute {
    name = "result_id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }
}
