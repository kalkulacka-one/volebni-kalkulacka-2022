BACKEND_DIR=backend
GENERATOR_DIR=generator
FRONTENT_DIR=frontend
SCHEMAS_DIR=schemas
DATA_DIR=data

test: test-generator

test-generator:
	cd $(GENERATOR_DIR); \
	make test

pre-commit-run-all:
	pre-commit run -a -v

pre-commit-install:
	pre-commit install

install-all: install-all-generator

install-all-generator:
	cd $(GENERATOR_DIR); \
	make install-all

generate-data:
	(cd $(GENERATOR_DIR); make run-generate-data) && \
	(cd $(SCHEMAS_DIR); ./validate.sh) && \
	(cd $(FRONTENT_DIR); npm run parse-data-schema) && \
	git add $(DATA_DIR);
