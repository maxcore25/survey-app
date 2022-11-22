from __future__ import annotations

from functools import lru_cache
from typing import Any, Dict, Optional

from dotenv import find_dotenv
from pydantic import BaseSettings, PostgresDsn, validator


class AsyncPostgresDsn(PostgresDsn):
    allowed_schemes = {"postgres+asyncpg", "postgresql+asyncpg"}


class _Settings(BaseSettings):
    class Config:
        env_file_encoding = "utf-8"


class Config(_Settings):
    # Debug
    DEBUG: bool

    # Backend
    BACKEND_TTILE: str
    BACKEND_DESCRIPTION: str
    BACKEND_PREFIX: str

    BACKEND_HOST: str
    BACKEND_PORT: int
    BACKEND_RELOAD: bool

    BACKEND_JWT_SECRET: str
    BACKEND_JWT_ALGORITHM: str
    BACKEND_JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int

    BACKEND_DISABLE_AUTH: bool

    # Postgres
    POSTGRES_SERVER: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    SQLALCHEMY_DATABASE_URI: Optional[AsyncPostgresDsn] = None

    @validator("SQLALCHEMY_DATABASE_URI", pre=True)
    def assemble_async_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return AsyncPostgresDsn.build(
            scheme="postgresql+asyncpg",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER"),
            path=f"/{values.get('POSTGRES_DB') or ''}",
        )


@lru_cache()
def get_config(env_file: str = ".env") -> Config:
    return Config(_env_file=find_dotenv(env_file))
