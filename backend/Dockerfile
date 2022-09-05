# https://fastapi.tiangolo.com/deployment/docker/

FROM python:3.9-alpine3.15 as builder

WORKDIR /backend

# copy requirement files
COPY ./poetry.lock /backend/
COPY ./pyproject.toml /backend/

# install required system packages
RUN apk add --no-cache \
    curl \
    gcc \
    libressl-dev \
    musl-dev \
    libffi-dev

# install and configure poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:${PATH}"

# install dependencies
RUN poetry config virtualenvs.create false
RUN poetry export \
    -o /backend/requirements.txt \
    -f requirements.txt \
    --without-hashes

# install pex
RUN poetry run pip install pex

# delete files that are not needed
RUN rm -rfv \
    /backend/__pycache__ \
    /backend/poetry.lock \
    /backend/pyproject.toml

# copy remaining source code
COPY ./main.py /backend/
COPY ./kalkulacka /backend/

# build PEX binary
RUN ls -lR /backend
RUN pex \
  --requirement=requirements.txt \
  --script=uvicorn \
  --sources-directory=/backend \
  --output-file=/backend/backend.pex

# build final image
FROM python:3.10-alpine3.15 as final

WORKDIR /root

# copy build PEX
COPY --from=builder /backend/backend.pex ./

# Run it
CMD ["./backend.pex", "main:app", "--host", "0.0.0.0", "--port", "80"]
