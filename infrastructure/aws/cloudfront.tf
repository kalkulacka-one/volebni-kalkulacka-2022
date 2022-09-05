resource "aws_cloudfront_origin_access_identity" "default" {
  comment = "Cloudfront Orgin Identity"
}

data "aws_cloudfront_cache_policy" "managed-cache-disabled" {
  name = "Managed-CachingDisabled"
}

resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend.id}"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = aws_s3_bucket.data.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.data.id}"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.default.cloudfront_access_identity_path
    }
  }

  origin {
    domain_name = replace(aws_api_gateway_deployment.kalkulacka.invoke_url, "/^https?://([^/]*).*/", "$1")
    origin_id   = "backend"
    origin_path = "/${aws_api_gateway_stage.kalkulacka.stage_name}"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = [
        "TLSv1.2"
      ]
    }
  }

  origin {
    domain_name = "plausible.io"
    origin_id   = "plausible.io"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = [
        "TLSv1.2"
      ]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [
    var.domain,
    "www.${var.domain}"
  ]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    target_origin_id = "S3-${aws_s3_bucket.frontend.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    path_pattern     = "/js/script.outbound-links.js"
    target_origin_id = "plausible.io"

    cache_policy_id        = data.aws_cloudfront_cache_policy.managed-cache-disabled.id
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    allowed_methods = [
      "GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    path_pattern     = "/api/event"
    target_origin_id = "plausible.io"

    cache_policy_id        = data.aws_cloudfront_cache_policy.managed-cache-disabled.id
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    path_pattern    = "/data*"
    allowed_methods = [
      "GET",
      "HEAD"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    target_origin_id = "S3-${aws_s3_bucket.data.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  ordered_cache_behavior {
    allowed_methods = [
      "GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    forwarded_values {
      query_string = true
      cookies {
        forward = "none"
      }
    }
    path_pattern           = "/api*"
    target_origin_id       = "backend"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.domain-certificate-arn
    cloudfront_default_certificate = false
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2018"
  }

  custom_error_response {
    error_code            = 403
    error_caching_min_ttl = 300
    response_code         = 200
    response_page_path    = "/index.html"
  }
}
