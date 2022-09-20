BACKEND_DIR=backend
FRONTENT_DIR=frontend
SCHEMAS_DIR=schemas
DATA_DIR=data

test: test-backend

test-backend:
	cd $(BACKEND_DIR); \
	make test

pre-commit-run-all:
	pre-commit run -a -v

pre-commit-install:
	pre-commit install

install-all: install-all-backend

install-all-backend:
	cd $(BACKEND_DIR); \
	make install-all

generate-data:
	(cd $(BACKEND_DIR); make run-generate-data) && \
	(cd $(SCHEMAS_DIR); ./validate.sh) && \
	(cd $(FRONTENT_DIR); npm run parse-data-schema) && \
	git add $(DATA_DIR);
