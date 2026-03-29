from fastapi import APIRouter

from app.api.routes.proposals import router as proposals_router

api_router = APIRouter()
api_router.include_router(proposals_router)

