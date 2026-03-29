from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse, RedirectResponse, Response

from app.schemas.proposals import ErrorResponse, ProposalGenerationRequest, ProposalGenerationResponse
from app.services.proposal_service import ProposalService, get_proposal_service

router = APIRouter(tags=["compatibility"])


def _route_guide() -> dict[str, object]:
    return {
        "message": "API is running. Open /docs to test the proposal generator from the browser.",
        "docs": "/docs",
        "health": "/health",
        "versionedGenerateEndpoint": {
            "method": "POST",
            "path": "/api/v1/proposals/generate",
        },
        "quickTestAlias": {
            "method": "POST",
            "path": "/generate",
        },
    }


@router.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    return RedirectResponse(url="/docs", status_code=status.HTTP_307_TEMPORARY_REDIRECT)


@router.get("/favicon.ico", include_in_schema=False)
async def favicon() -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/generate", include_in_schema=False)
async def generate_help() -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            **_route_guide(),
            "note": "This route accepts POST requests only. Use /docs or send JSON to POST /generate.",
        },
    )


@router.get("/proposals", include_in_schema=False)
async def proposals_help() -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            **_route_guide(),
            "note": "The proposal generator lives at POST /api/v1/proposals/generate.",
        },
    )


@router.post(
    "/generate",
    include_in_schema=False,
    response_model=ProposalGenerationResponse,
    responses={
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"model": ErrorResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ErrorResponse},
        status.HTTP_502_BAD_GATEWAY: {"model": ErrorResponse},
    },
)
async def generate_proposal_alias(
    payload: ProposalGenerationRequest,
    request: Request,
    service: ProposalService = Depends(get_proposal_service),
) -> ProposalGenerationResponse:
    request_id = getattr(request.state, "request_id", "unknown")
    return service.generate_proposal(payload=payload, request_id=request_id)
