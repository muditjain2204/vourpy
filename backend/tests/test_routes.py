from app.core.errors import ResponseParsingError, UpstreamServiceError
from app.schemas.proposals import ProposalGenerationResponse
from app.services.proposal_service import get_proposal_service


class SuccessfulService:
    def generate_proposal(self, *, payload, request_id: str) -> ProposalGenerationResponse:
        return ProposalGenerationResponse(
            hookLine="I would approach this like a SaaS growth feature, not just a dev task.",
            proposal="I can help design and ship this with clear milestones and strong communication.",
            clientQuestions=(
                "Which user segment is most important for launch?",
                "What does success look like 30 days after release?",
            ),
            requestId=request_id,
            generatedAt="2026-03-29T00:00:00Z",
        )


class FailingService:
    def generate_proposal(self, *, payload, request_id: str):
        raise UpstreamServiceError("OpenAI request failed.", details="timeout")


class ParsingService:
    def generate_proposal(self, *, payload, request_id: str):
        raise ResponseParsingError("Model response could not be parsed.")


def test_generate_proposal_success(client) -> None:
    client.app.dependency_overrides[get_proposal_service] = lambda: SuccessfulService()

    response = client.post(
        "/api/v1/proposals/generate",
        json={
            "jobDescription": "Looking for a senior engineer to build a SaaS onboarding experience and admin tooling." * 2,
            "skills": ["React", "FastAPI"],
            "experienceLevel": "senior",
        },
    )

    assert response.status_code == 200
    assert response.json()["hookLine"].startswith("I would approach")


def test_generate_proposal_alias_success(client) -> None:
    client.app.dependency_overrides[get_proposal_service] = lambda: SuccessfulService()

    response = client.post(
        "/generate",
        json={
            "jobDescription": "Looking for a senior engineer to build a SaaS onboarding experience and admin tooling." * 2,
            "skills": ["React", "FastAPI"],
            "experienceLevel": "senior",
        },
    )

    assert response.status_code == 200
    assert response.json()["hookLine"].startswith("I would approach")


def test_proposals_help_route(client) -> None:
    response = client.get("/proposals")

    assert response.status_code == 200
    assert response.json()["docs"] == "/docs"


def test_generate_proposal_maps_upstream_errors(client) -> None:
    client.app.dependency_overrides[get_proposal_service] = lambda: FailingService()

    response = client.post(
        "/api/v1/proposals/generate",
        json={
            "jobDescription": "Looking for a senior engineer to build a SaaS onboarding experience and admin tooling." * 2,
            "skills": ["React", "FastAPI"],
            "experienceLevel": "senior",
        },
    )

    assert response.status_code == 502
    assert response.json()["code"] == "upstream_error"


def test_generate_proposal_maps_parsing_errors(client) -> None:
    client.app.dependency_overrides[get_proposal_service] = lambda: ParsingService()

    response = client.post(
        "/api/v1/proposals/generate",
        json={
            "jobDescription": "Looking for a senior engineer to build a SaaS onboarding experience and admin tooling." * 2,
            "skills": ["React", "FastAPI"],
            "experienceLevel": "senior",
        },
    )

    assert response.status_code == 502
    assert response.json()["code"] == "response_parse_error"
