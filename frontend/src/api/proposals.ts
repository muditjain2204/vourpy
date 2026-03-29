import type { ProposalRequest, ProposalResponse } from "../types/proposals";

type ApiErrorResponse = {
  message?: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export async function generateProposal(payload: ProposalRequest): Promise<ProposalResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/proposals/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = "Unable to generate a proposal right now.";
    try {
      const error = (await response.json()) as ApiErrorResponse;
      if (error.message) {
        message = error.message;
      }
    } catch {
      // Ignore JSON parsing errors and use the fallback message.
    }
    throw new Error(message);
  }

  return (await response.json()) as ProposalResponse;
}
