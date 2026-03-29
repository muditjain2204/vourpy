from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ExperienceLevel(str, Enum):
    junior = "junior"
    mid = "mid"
    senior = "senior"


class ProposalGenerationRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    jobDescription: str = Field(min_length=50, max_length=5000)
    skills: list[str]
    experienceLevel: ExperienceLevel

    @field_validator("jobDescription", mode="before")
    @classmethod
    def normalize_job_description(cls, value: Any) -> str:
        if not isinstance(value, str):
            raise TypeError("jobDescription must be a string.")
        normalized = value.strip()
        if not normalized:
            raise ValueError("jobDescription is required.")
        return normalized

    @field_validator("skills", mode="before")
    @classmethod
    def normalize_skills(cls, value: Any) -> list[str]:
        if not isinstance(value, list):
            raise TypeError("skills must be an array of strings.")

        deduped: list[str] = []
        seen: set[str] = set()
        for item in value:
            if not isinstance(item, str):
                raise TypeError("Each skill must be a string.")
            cleaned = item.strip()
            if not cleaned:
                continue
            lowered = cleaned.lower()
            if lowered in seen:
                continue
            seen.add(lowered)
            deduped.append(cleaned)

        if not deduped:
            raise ValueError("At least one skill is required.")
        if len(deduped) > 20:
            raise ValueError("No more than 20 skills are allowed.")
        return deduped


class ProposalContent(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    hookLine: str
    proposal: str
    clientQuestions: list[str]

    @field_validator("hookLine", "proposal")
    @classmethod
    def ensure_not_empty(cls, value: str) -> str:
        normalized = value.strip()
        if not normalized:
            raise ValueError("Model output fields cannot be empty.")
        return normalized

    @field_validator("clientQuestions")
    @classmethod
    def ensure_questions(cls, value: list[str]) -> list[str]:
        normalized = [question.strip() for question in value if question.strip()]
        if len(normalized) != 2:
            raise ValueError("Exactly two client questions are required.")
        return normalized


class ProposalGenerationResponse(ProposalContent):
    requestId: str
    generatedAt: datetime


class ErrorResponse(BaseModel):
    message: str
    code: str
    requestId: str
    details: Any | None = None

