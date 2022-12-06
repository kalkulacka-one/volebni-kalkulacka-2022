# volebni-kalkulacka-2022

Volební kalkulačka, nová verze s Česko.Digital v roce 2022

## Setup

1. Install [pre-commit](https://pre-commit.com/)
2. Install hooks - `pre-commit install` or `make pre-commit-install`
3. Run `pre-commit` on existing code, to make sure, that it works - `make pre-commit-run-all`

## Frontend

Frontend is SPA Vue.js application.

[README](frontend/README.md)

## Generator

Generator uses Python and FastAPI framework.

[README](generator/README.md)

## Infrastructure

Everything is deployed to AWS and managed using Terraform.

[README](infrastructure/README.md)

## Data

Each instance of _volebni-kalkulacka-2022_ uses static dataset on CDN. During development this `.json` data are stored in repository in `data` directory. Any change in content of this directory is deployed to main domain under `https://<domain>/data/` directory.

## Contribution

This project is developed by volunteers at [Česko.Digital](https://cesko.digital). Join us [here](https://cesko.digital/join) and visit our channel [#inkubace-volebni_kalkulacka2022](https://cesko-digital.slack.com/archives/C0311K8LHFX).
