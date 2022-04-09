SCRIPTS=main.py
PROJECT_DIR=kalkulacka
TEST_DIR=tests

POETRY=poetry

API_HOST=0.0.0.0
API_PORT=8080

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

poetry-run:
	echo "Running on port $(API_PORT)"
	poetry run uvicorn main:app --host $(API_HOST) --port $(API_PORT)

run-api-docker: docker-run
run-api-poetry: poetry-run
