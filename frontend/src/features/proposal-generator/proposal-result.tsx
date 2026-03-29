import { useState } from "react";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import type { StoredProposal } from "../../types/proposals";

type ProposalResultProps = {
  proposal: StoredProposal | null;
  isLoading: boolean;
  onRegenerate: () => void;
  canRegenerate: boolean;
};

function formatProposalForClipboard(proposal: StoredProposal) {
  return [
    `Hook Line: ${proposal.hookLine}`,
    "",
    "Proposal:",
    proposal.proposal,
    "",
    "Client Questions:",
    `1. ${proposal.clientQuestions[0]}`,
    `2. ${proposal.clientQuestions[1]}`,
  ].join("\n");
}

export function ProposalResult({ proposal, isLoading, onRegenerate, canRegenerate }: ProposalResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!proposal) {
      return;
    }
    await navigator.clipboard.writeText(formatProposalForClipboard(proposal));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Card className="min-h-[560px]">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl text-ink">Generated output</h2>
          <p className="mt-2 text-sm text-muted">Review, copy, and regenerate until the pitch feels right.</p>
        </div>
        <div className="flex gap-2">
          <Button disabled={!proposal} onClick={handleCopy} type="button" variant="ghost">
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button disabled={!canRegenerate || isLoading} onClick={onRegenerate} type="button" variant="secondary">
            {isLoading ? "Working..." : "Regenerate"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4" data-testid="proposal-loading">
          <div className="h-7 w-2/3 animate-pulse rounded-full bg-black/10" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded-full bg-black/10" />
            <div className="h-4 w-[94%] animate-pulse rounded-full bg-black/10" />
            <div className="h-4 w-[89%] animate-pulse rounded-full bg-black/10" />
            <div className="h-4 w-[76%] animate-pulse rounded-full bg-black/10" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-[70%] animate-pulse rounded-full bg-black/10" />
            <div className="h-4 w-[80%] animate-pulse rounded-full bg-black/10" />
          </div>
        </div>
      ) : proposal ? (
        <div className="space-y-6">
          <div className="rounded-[24px] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Hook line</p>
            <p className="mt-3 text-lg font-semibold text-ink">{proposal.hookLine}</p>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Proposal</p>
              <p className="text-xs text-muted">{new Date(proposal.generatedAt).toLocaleString()}</p>
            </div>
            <div className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-ink">{proposal.proposal}</div>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Client questions</p>
            <ol className="mt-3 space-y-3 pl-5 text-[15px] leading-7 text-ink">
              <li>{proposal.clientQuestions[0]}</li>
              <li>{proposal.clientQuestions[1]}</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-dashed border-line bg-white/70 p-8 text-center">
          <div className="max-w-md">
            <p className="font-display text-3xl text-ink">Ready when you are.</p>
            <p className="mt-3 text-sm leading-6 text-muted">
              Submit a client brief to generate a strong first message, a polished proposal body, and two follow-up questions worth asking.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
