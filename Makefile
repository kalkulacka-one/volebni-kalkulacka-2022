BACKEND_DIR=backend

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
