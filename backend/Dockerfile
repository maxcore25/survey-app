FROM tiangolo/uvicorn-gunicorn-fastapi:latest

WORKDIR /app/

ENV POETRY_HOME="/opt/poetry" \
    POETRY_NO_INTERACTION=1 \
    POETRY_VERSION=1.3.1 \
    POETRY_VIRTUALENVS_CREATE=false

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="$PATH:$POETRY_HOME/bin"

# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./backend/pyproject.toml ./backend/poetry.lock* /app/

RUN poetry install

COPY ./backend /app

CMD ["bash", "./entrypoint.sh"]