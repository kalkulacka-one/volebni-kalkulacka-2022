resource "google_project" "volebni_kalkulacka" {
  provider = google-beta

  project_id = "1088434750435"
  name       = "volebni-kalkulacka-mm-02"
  org_id     = "123456789"
}

resource "google_firebase_project" "volebni_kalkulacka" {
  provider = google-beta
  project  = google_project.volebni_kalkulacka.project_id
}