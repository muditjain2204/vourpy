from datetime import datetime, timezone
from functools import lru_cache

from app.clients.openai_client import OpenAIProposalClient
from app.core.config import get_settings
from app.prompts.proposal_prompt import build_proposal_messages
from app.schemas.proposals import ProposalGenerationRequest, ProposalGenerationResponse


class ProposalService:
    def __init__(self, client: OpenAIProposalClient) -> None:
        self._client = client

    def generate_proposal(
        self,
        *,
        payload: ProposalGenerationRequest,
        request_id: str,
    ) -> ProposalGenerationResponse:
        content = self._client.generate_proposal(build_proposal_messages(payload))
        return ProposalGenerationResponse(
            hookLine=content.hookLine,
            proposal=content.proposal,
            clientQuestions=content.clientQuestions,
            requestId=request_id,
            generatedAt=datetime.now(timezone.utc),
        )


@lru_cache
def get_proposal_service() -> ProposalService:
    settings = get_settings()
    client = OpenAIProposalClient(settings=settings)
    return ProposalService(client=client)
