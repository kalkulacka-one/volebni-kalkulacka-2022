resource "aws_cloudfront_origin_access_identity" "default" {
  comment = "Cloudfront Orgin Identity"
}

data "aws_cloudfront_cache_policy" "managed-cache-disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_cache_policy" "managed-cache-optimal" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_cache_policy" "long-cache" {
  name        = "Long-Cache"
  default_ttl = 2630000
  max_ttl     = 2630000
  min_ttl     = 2630000

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_origin_request_policy" "query-cookie" {
  name = "query-cookie"
  cookies_config {
    cookie_behavior = "all"
  }
  headers_config {
    header_behavior = "none"
  }
  query_strings_config {
    query_string_behavior = "all"
  }
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
    target_origin_id       = "S3-${aws_s3_bucket.frontend.id}"
    cache_policy_id        = data.aws_cloudfront_cache_policy.managed-cache-optimal.id
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
    target_origin_id       = "backend"
    cache_policy_id        = aws_cloudfront_cache_policy.long-cache.id
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    path_pattern           = "/image/*"
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
    target_origin_id       = "backend"
    cache_policy_id        = data.aws_cloudfront_cache_policy.managed-cache-optimal.id
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    path_pattern           = "/share/*"
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
    path_pattern           = "/js/script.outbound-links.js"
    target_origin_id       = "plausible.io"
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
    path_pattern           = "/api/event"
    target_origin_id       = "plausible.io"
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
    target_origin_id       = "S3-${aws_s3_bucket.data.id}"
    cache_policy_id        = data.aws_cloudfront_cache_policy.managed-cache-optimal.id
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
    path_pattern             = "/api*"
    target_origin_id         = "backend"
    origin_request_policy_id = aws_cloudfront_origin_request_policy.query-cookie.id
    cache_policy_id          = data.aws_cloudfront_cache_policy.managed-cache-disabled.id
    compress                 = true
    viewer_protocol_policy   = "redirect-to-https"
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
