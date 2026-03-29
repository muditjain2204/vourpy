import pytest
from pydantic import ValidationError

from app.schemas.proposals import ProposalGenerationRequest


def test_request_normalizes_and_deduplicates_skills() -> None:
    payload = ProposalGenerationRequest(
        jobDescription="Build a scalable SaaS dashboard with billing, analytics, and polished UX." * 2,
        skills=["React", " React ", "FastAPI", "", "react"],
        experienceLevel="senior",
    )

    assert payload.skills == ["React", "FastAPI"]


def test_request_rejects_short_job_description() -> None:
    with pytest.raises(ValidationError):
        ProposalGenerationRequest(
            jobDescription="Too short",
            skills=["React"],
            experienceLevel="mid",
        )

