from fastapi import APIRouter, Depends, Request, status

from app.schemas.proposals import ErrorResponse, ProposalGenerationRequest, ProposalGenerationResponse
from app.services.proposal_service import ProposalService, get_proposal_service

router = APIRouter(prefix="/proposals", tags=["proposals"])


@router.post(
    "/generate",
    response_model=ProposalGenerationResponse,
    responses={
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ErrorResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ErrorResponse},
        status.HTTP_502_BAD_GATEWAY: {"model": ErrorResponse},
    },
)
async def generate_proposal(
    payload: ProposalGenerationRequest,
    request: Request,
    service: ProposalService = Depends(get_proposal_service),
) -> ProposalGenerationResponse:
    request_id = getattr(request.state, "request_id", "unknown")
    return service.generate_proposal(payload=payload, request_id=request_id)
