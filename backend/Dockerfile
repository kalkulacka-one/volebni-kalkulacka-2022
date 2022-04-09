# https://fastapi.tiangolo.com/deployment/docker/

FROM python:3.10-slim-bullseye

WORKDIR /backend

# copy requirement files
COPY ./poetry.lock /backend/
COPY ./pyproject.toml /backend/

# install required system packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# install and configure poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:${PATH}"

# cleanup
RUN apt-get remove -y curl


# install dependencies
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

# copy remaining source code
COPY ./main.py /backend/
COPY ./kalkulacka /backend/



CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
