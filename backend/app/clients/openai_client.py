from openai import APIConnectionError, APIStatusError, APITimeoutError, OpenAI, OpenAIError
from pydantic import ValidationError

from app.core.config import Settings
from app.core.errors import ConfigurationError, ResponseParsingError, UpstreamServiceError
from app.schemas.proposals import ProposalContent


class OpenAIProposalClient:
    def __init__(self, settings: Settings, client: OpenAI | None = None) -> None:
        self._settings = settings
        self._client = client

    def _get_client(self) -> OpenAI:
        if not self._settings.openai_api_key:
            raise ConfigurationError("OPENAI_API_KEY is not configured.")
        if self._client is None:
            self._client = OpenAI(api_key=self._settings.openai_api_key)
        return self._client

    def generate_proposal(self, messages: list[dict[str, str]]) -> ProposalContent:
        client = self._get_client()
        try:
            response = client.responses.parse(
                model=self._settings.openai_model,
                input=messages,
                max_output_tokens=900,
                text_format=ProposalContent,
            )
        except (APIConnectionError, APITimeoutError, APIStatusError) as exc:
            raise UpstreamServiceError(details=str(exc)) from exc
        except OpenAIError as exc:
            raise UpstreamServiceError(details=str(exc)) from exc

        parsed = response.output_parsed
        if parsed is None:
            raise ResponseParsingError("OpenAI returned an empty or unstructured response.")
        try:
            return ProposalContent.model_validate(parsed)
        except ValidationError as exc:
            raise ResponseParsingError(details=exc.errors()) from exc

