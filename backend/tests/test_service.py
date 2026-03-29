from app.schemas.proposals import ProposalContent, ProposalGenerationRequest
from app.services.proposal_service import ProposalService


class StubProposalClient:
    def generate_proposal(self, _: list[dict[str, str]]) -> ProposalContent:
        return ProposalContent(
            hookLine="I can turn this brief into a reliable SaaS launch plan.",
            proposal="I have shipped similar products and can help deliver this cleanly.",
            clientQuestions=(
                "Which workflow matters most in the first release?",
                "Do you already have design assets or should I define the UI system too?",
            ),
        )


def test_service_returns_api_response_shape() -> None:
    service = ProposalService(client=StubProposalClient())
    payload = ProposalGenerationRequest(
        jobDescription="Need a full-stack SaaS MVP with auth, payments, and admin tooling." * 2,
        skills=["React", "FastAPI"],
        experienceLevel="senior",
    )

    response = service.generate_proposal(payload=payload, request_id="req_123")

    assert response.requestId == "req_123"
    assert response.hookLine.startswith("I can turn")
    assert len(response.clientQuestions) == 2

