SCRIPTS=main.py enrich_with_pdv.py converter.py
PROJECT_DIR=generator
TEST_DIR=tests

POETRY=poetry

API_HOST=0.0.0.0
API_PORT=8080

DYNAMODB_URL=http://localhost:4566

checks: mypy test

mypy:
	$(POETRY) run mypy $(PROJECT_DIR) $(TEST_DIR) $(SCRIPTS)

test: test-ci

test-ci:
	poetry run pytest --cov=$(PROJECT_DIR) -v

coverage:
	$(POETRY) run coverage html -d coverage_html
	$(OPEN) coverage_html/index.html

test-and-coverage: test coverage

install-all: poetry-install dep-install

poetry-install:
	# https://python-poetry.org/docs/master/#installing-with-the-official-installer
	curl -sSL https://install.python-poetry.org | python3 -

dep-install:
	$(POETRY) install

dep-update:
	$(POETRY) update

docker-build:
	docker build -t kalkulacka-backend .

docker-run:
	echo "Running on port $(API_PORT)"
	docker run -p $(API_PORT):80 kalkulacka-backend:latest

poetry-run-api:
	echo "Running on port $(API_PORT)"; \
	export AWS_ACCESS_KEY_ID="foo"; \
	export and AWS_SECRET_ACCESS_KEY="bar"; \
	export AWS_DEFAULT_REGION="us-east-1"; \
	export DYNAMODB_URL="$(DYNAMODB_URL)"; \
	poetry run uvicorn main:app --reload --host $(API_HOST) --port $(API_PORT)

poetry-run-converter:
	poetry run ./converter.py

poetry-run-enrich-with-pdv:
	poetry run ./enrich_with_pdv.py

run-api-docker: docker-run
run-api-poetry: poetry-run-api
run-converter: poetry-run-converter
run-add-images: poetry-run-enrich-with-pdv
run-enrich-with-pdv: poetry-run-enrich-with-pdv

run-generate-data: poetry-run-converter poetry-run-enrich-with-pdv

run-localstack:
	# https://localstack.cloud/
	docker run --rm -it -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack

run-table-create:
	export AWS_ACCESS_KEY_ID="foo"; \
	export and AWS_SECRET_ACCESS_KEY="bar"; \
	export AWS_DEFAULT_REGION="us-east-1"; \
	aws dynamodb --endpoint-url=$(DYNAMODB_URL) create-table \
    --table-name Results \
    --attribute-definitions \
        AttributeName=result_id,AttributeType=S \
    --key-schema \
        AttributeName=result_id,KeyType=HASH \
	--billing-mode PAY_PER_REQUEST

run-table-delete:
	export AWS_ACCESS_KEY_ID="foo"; \
	export and AWS_SECRET_ACCESS_KEY="bar"; \
	export AWS_DEFAULT_REGION="us-east-1"; \
	aws dynamodb --endpoint-url=$(DYNAMODB_URL) delete-table \
    --table-name Results
