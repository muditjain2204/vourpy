from functools import lru_cache
from typing import Any

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "AI Freelancer Proposal Generator API"
    api_v1_prefix: str = "/api/v1"
    openai_api_key: str | None = None
    openai_model: str = "gpt-5.4"
    backend_cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173"])
    log_level: str = "INFO"

    @field_validator("backend_cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: Any) -> list[str]:
        if isinstance(value, list):
            return value
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        raise ValueError("BACKEND_CORS_ORIGINS must be a comma-separated string or list.")


@lru_cache
def get_settings() -> Settings:
    return Settings()

