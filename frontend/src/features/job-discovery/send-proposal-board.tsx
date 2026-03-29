import { useMemo, useState } from "react";

import { Card } from "../../components/ui/card";
import type { StoredProposal } from "../../types/proposals";
import { freelanceBoards, type DiscoveryCollection } from "./job-board";

type SendProposalBoardProps = {
  proposal: StoredProposal | null;
};

type SendableProposal = {
  hookLine: string;
  proposal: string;
  clientQuestions: [string, string];
};

const importableExtensions = ".pdf,.doc,.docx,.txt,.md,.rtf,.jpeg,.jpg,.png,.webp";

function formatProposalForClipboard(proposal: SendableProposal) {
  return [
    proposal.hookLine,
    "",
    proposal.proposal,
    "",
    "Smart client questions:",
    `1. ${proposal.clientQuestions[0]}`,
    `2. ${proposal.clientQuestions[1]}`,
  ].join("\n");
}

function readFileAsText(file: File): Promise<string> {
  if (typeof file.text === "function") {
    return file.text();
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error ?? new Error("Unable to read file."));
    reader.readAsText(file);
  });
}

export function SendProposalBoard({ proposal }: SendProposalBoardProps) {
  const [lastTarget, setLastTarget] = useState<string | null>(null);
  const [importedProposal, setImportedProposal] = useState<SendableProposal | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [importNotes, setImportNotes] = useState("");
  const [importing, setImporting] = useState(false);

  const collections = useMemo<DiscoveryCollection[]>(() => freelanceBoards, []);
  const activeProposal = importedProposal ?? proposal;

  const handleFileImport = async (file: File | null) => {
    if (!file) {
      return;
    }

    setSelectedFileName(file.name);

    const isTextLike =
      file.type.startsWith("text/") ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md") ||
      file.name.endsWith(".rtf");

    if (!isTextLike) {
      return;
    }

    setImporting(true);
    try {
      const text = await readFileAsText(file);
      setImportNotes(text.trim());
    } finally {
      setImporting(false);
    }
  };

  const useImportedProposal = () => {
    const content = importNotes.trim();
    if (!content) {
      return;
    }

    const firstLine = content.split(/\r?\n/).find((line) => line.trim()) ?? "Imported proposal";
    const proposalBody = content.length > 180 ? content : `${content}\n\nPlease customize this imported draft before sending.`;

    setImportedProposal({
      hookLine: firstLine.trim(),
      proposal: proposalBody.trim(),
      clientQuestions: [
        "Can you confirm the exact scope and first deliverable you want to prioritize?",
        "What timeline or turnaround are you expecting for the first milestone?",
      ],
    });
  };

  const clearImportedProposal = () => {
    setImportedProposal(null);
    setImportNotes("");
    setSelectedFileName(null);
  };

  const handleSend = async (href: string, label: string) => {
    if (!activeProposal) {
      return;
    }

    await navigator.clipboard.writeText(formatProposalForClipboard(activeProposal));
    window.open(href, "_blank", "noopener,noreferrer");
    setLastTarget(label);
    window.setTimeout(() => setLastTarget((current) => (current === label ? null : current)), 2200);
  };

  return (
    <section className="space-y-6">
      <Card className="overflow-hidden">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-peach/60 bg-peach/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-ink">
            Send Proposals
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Open the platform, copy your latest proposal, and send it where the opportunity lives.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
            This keeps the workflow manual and transparent: one click copies your active proposal, then opens the target job platform so you can paste and submit it yourself.
          </p>

          <div className="mt-6 rounded-[24px] border border-line bg-white/80 p-4">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Import from device</div>
              <p className="text-sm text-muted">
                Upload proposal files from your device. Text files are read automatically. For PDF, Word, JPEG, PNG, and similar files, upload first and then paste or adjust the proposal text below before using it.
              </p>
              <input
                accept={importableExtensions}
                aria-label="Import proposal file"
                className="block w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink"
                onChange={(event) => void handleFileImport(event.target.files?.[0] ?? null)}
                type="file"
              />
              {selectedFileName ? <p className="text-sm font-semibold text-ink">Selected file: {selectedFileName}</p> : null}
              <textarea
                className="min-h-[180px] w-full rounded-3xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                onChange={(event) => setImportNotes(event.target.value)}
                placeholder="Paste or edit the imported proposal text here so Send can use it..."
                value={importNotes}
              />
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded-2xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!importNotes.trim() || importing}
                  onClick={useImportedProposal}
                  type="button"
                >
                  {importing ? "Reading file..." : "Use Imported Proposal"}
                </button>
                <button
                  className="rounded-2xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-black/5"
                  onClick={clearImportedProposal}
                  type="button"
                >
                  Clear Import
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-line bg-white/80 p-4">
            {activeProposal ? (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Active proposal</div>
                <div className="text-lg font-extrabold text-ink">{activeProposal.hookLine}</div>
                <div className="text-sm text-muted">
                  Clicking <span className="font-extrabold text-ink">Send</span> copies this proposal and opens the selected platform.
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {importedProposal ? "Source: Imported file" : "Source: Generated proposal"}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">No proposal selected</div>
                <div className="text-sm text-muted">
                  Generate or load a proposal first, then come back here to send it manually through your chosen platform.
                </div>
              </div>
            )}
          </div>

          {lastTarget ? (
            <p className="mt-4 text-sm font-semibold text-accent">
              Proposal copied. Opening {lastTarget}.
            </p>
          ) : null}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {collections.map((collection) => (
          <Card key={collection.name} className="h-full">
            <div className="flex h-full flex-col">
              <div>
                <h2 className="font-display text-3xl text-ink">{collection.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{collection.summary}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {collection.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {collection.links.map((link) => (
                  <button
                    aria-label={`Send proposal via ${link.label}`}
                    key={`${collection.name}-${link.href}`}
                    className="group flex w-full items-center justify-between rounded-[22px] border border-line bg-white px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-accent hover:bg-accent/5 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!activeProposal}
                    onClick={() => void handleSend(link.href, link.label)}
                    type="button"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="text-muted transition group-hover:font-extrabold group-hover:text-ink">
                      Send
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
