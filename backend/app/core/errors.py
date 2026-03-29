from typing import Any

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError


class AppError(Exception):
    def __init__(
        self,
        *,
        message: str,
        code: str,
        status_code: int,
        details: Any | None = None,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details


class ConfigurationError(AppError):
    def __init__(self, message: str = "Server configuration is incomplete.") -> None:
        super().__init__(
            message=message,
            code="configuration_error",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class UpstreamServiceError(AppError):
    def __init__(self, message: str = "OpenAI request failed.", details: Any | None = None) -> None:
        super().__init__(
            message=message,
            code="upstream_error",
            status_code=status.HTTP_502_BAD_GATEWAY,
            details=details,
        )


class ResponseParsingError(AppError):
    def __init__(self, message: str = "Model response could not be parsed.", details: Any | None = None) -> None:
        super().__init__(
            message=message,
            code="response_parse_error",
            status_code=status.HTTP_502_BAD_GATEWAY,
            details=details,
        )


def _error_payload(request: Request, *, message: str, code: str, details: Any | None = None) -> dict[str, Any]:
    request_id = getattr(request.state, "request_id", "unknown")
    payload: dict[str, Any] = {
        "message": message,
        "code": code,
        "requestId": request_id,
    }
    if details is not None:
        payload["details"] = details
    return payload


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppError)
    async def handle_app_error(request: Request, exc: AppError) -> JSONResponse:
        return JSONResponse(
            status_code=exc.status_code,
            content=_error_payload(
                request,
                message=exc.message,
                code=exc.code,
                details=exc.details,
            ),
        )

    @app.exception_handler(RequestValidationError)
    async def handle_validation_error(request: Request, exc: RequestValidationError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            content=_error_payload(
                request,
                message="Request validation failed.",
                code="validation_error",
                details=exc.errors(),
            ),
        )

    @app.exception_handler(ValidationError)
    async def handle_pydantic_validation_error(request: Request, exc: ValidationError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            content=_error_payload(
                request,
                message="Payload validation failed.",
                code="validation_error",
                details=exc.errors(),
            ),
        )

    @app.exception_handler(Exception)
    async def handle_unexpected_error(request: Request, _: Exception) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=_error_payload(
                request,
                message="Unexpected server error.",
                code="internal_server_error",
            ),
        )
