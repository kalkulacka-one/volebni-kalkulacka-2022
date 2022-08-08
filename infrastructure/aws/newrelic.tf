/*
  Log ingestion for New Relic platform.
*/

module "newrelic_log_ingestion" {
  source             = "github.com/newrelic/aws-log-ingestion"
  nr_license_key     = var.newrelic-license-key
  nr_tags            = "project:kalkulacka"
  nr_logging_enabled = true
}
