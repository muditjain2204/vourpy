import type { ProposalRequest, ProposalResponse, StoredProposal } from "../types/proposals";

const HISTORY_STORAGE_KEY = "proposal-forge-history";
const HISTORY_LIMIT = 10;

export function loadHistoryEntries(): StoredProposal[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as StoredProposal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistHistoryEntries(entries: StoredProposal[]) {
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
}

export function saveHistoryEntry(entry: StoredProposal): StoredProposal[] {
  const nextEntries = [entry, ...loadHistoryEntries().filter((item) => item.id !== entry.id)].slice(0, HISTORY_LIMIT);
  persistHistoryEntries(nextEntries);
  return nextEntries;
}

export function removeHistoryEntry(id: string): StoredProposal[] {
  const nextEntries = loadHistoryEntries().filter((item) => item.id !== id);
  persistHistoryEntries(nextEntries);
  return nextEntries;
}

export function clearHistoryEntries() {
  window.localStorage.removeItem(HISTORY_STORAGE_KEY);
}

export function buildStoredProposal(payload: ProposalRequest, response: ProposalResponse): StoredProposal {
  return {
    id: crypto.randomUUID(),
    generatedAt: response.generatedAt,
    requestId: response.requestId,
    jobDescription: payload.jobDescription,
    skills: payload.skills,
    experienceLevel: payload.experienceLevel,
    hookLine: response.hookLine,
    proposal: response.proposal,
    proposalPreview: `${response.proposal.slice(0, 132).trim()}${response.proposal.length > 132 ? "..." : ""}`,
    clientQuestions: response.clientQuestions,
  };
}

