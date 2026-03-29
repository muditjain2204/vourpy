import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { generateProposal } from "./api/proposals";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { JobBoard } from "./features/job-discovery/job-board";
import { SendProposalBoard } from "./features/job-discovery/send-proposal-board";
import { HistoryPanel } from "./features/proposal-generator/history-panel";
import { ProposalForm } from "./features/proposal-generator/proposal-form";
import { ProposalResult } from "./features/proposal-generator/proposal-result";
import { useProposalHistory } from "./hooks/useProposalHistory";
import { buildStoredProposal } from "./lib/history";
import type { ProposalRequest, StoredProposal } from "./types/proposals";

const billingPlans = [
  {
    name: "Starter",
    price: "Rs 999",
    cadence: "/month",
    description: "A lean plan for solo freelancers who want faster replies without a heavy software bill.",
    features: ["20 proposal generations", "1 active workspace seat", "Email receipts and monthly invoice"],
  },
  {
    name: "Growth",
    price: "Rs 2,499",
    cadence: "/month",
    description: "Best for consistent lead flow, recurring outreach, and weekly client pitching sprints.",
    features: ["75 proposal generations", "Priority support", "Saved history and branded exports"],
  },
  {
    name: "Agency",
    price: "Rs 5,999",
    cadence: "/month",
    description: "Built for small teams handling multiple clients, approvals, and higher proposal volume.",
    features: ["Unlimited proposal generations", "5 team seats", "Consolidated billing and audit trail"],
  },
] as const;

const paymentGateways = [
  {
    name: "Razorpay Checkout",
    summary: "Accept UPI, cards, net banking, and wallets for India-first billing flows.",
  },
  {
    name: "Stripe",
    summary: "Handle international cards and global renewals for overseas clients or agencies.",
  },
  {
    name: "Manual invoice fallback",
    summary: "Share invoice references for bank transfer collections when a client needs offline billing.",
  },
] as const;

const billingHighlights = [
  "Monthly auto-renewal with plan upgrades or downgrades from the billing panel",
  "Instant payment confirmation and downloadable receipts after every successful charge",
  "Tax-ready invoice notes for finance reconciliation and client reimbursement tracking",
] as const;

function App() {
  const history = useProposalHistory();
  const [activeProposal, setActiveProposal] = useState<StoredProposal | null>(null);
  const [draft, setDraft] = useState<ProposalRequest | null>(null);
  const [activeView, setActiveView] = useState<"generator" | "jobs" | "send">("generator");

  useEffect(() => {
    if (!activeProposal && history.entries.length > 0) {
      setActiveProposal(history.entries[0]);
      setDraft({
        jobDescription: history.entries[0].jobDescription,
        skills: history.entries[0].skills,
        experienceLevel: history.entries[0].experienceLevel,
      });
    }
  }, [activeProposal, history.entries]);

  const proposalMutation = useMutation({
    mutationFn: generateProposal,
    onSuccess: (data, variables) => {
      const entry = buildStoredProposal(variables, data);
      history.saveEntry(entry);
      setActiveProposal(entry);
      setDraft(variables);
    },
  });

  const handleGenerate = (payload: ProposalRequest) => {
    setDraft(payload);
    proposalMutation.mutate(payload);
  };

  const handleLoadHistory = (entry: StoredProposal) => {
    setActiveProposal(entry);
    setDraft({
      jobDescription: entry.jobDescription,
      skills: entry.skills,
      experienceLevel: entry.experienceLevel,
    });
  };

  const handleDeleteHistory = (id: string) => {
    if (activeProposal?.id === id) {
      setActiveProposal(null);
    }
    history.removeEntry(id);
  };

  const handleRegenerate = () => {
    if (draft) {
      proposalMutation.mutate(draft);
    }
  };

  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-full border border-line bg-white/80 p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeView === "generator" ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
              onClick={() => setActiveView("generator")}
              type="button"
            >
              Proposal Generator
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeView === "jobs" ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
              onClick={() => setActiveView("jobs")}
              type="button"
            >
              Find Open Jobs
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeView === "send" ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
              onClick={() => setActiveView("send")}
              type="button"
            >
              Send Proposals
            </button>
          </div>
          <p className="text-sm text-muted">
            Generate proposals, find openings by niche, or open a platform and send your latest draft.
          </p>
        </div>

        {activeView === "jobs" ? (
          <JobBoard />
        ) : activeView === "send" ? (
          <SendProposalBoard proposal={activeProposal} />
        ) : (
          <>
        <section className="mb-10 overflow-hidden rounded-[32px] border border-line/80 bg-white/70 p-6 shadow-glow sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Proposal Forge
              </span>
              <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
                Turn raw briefs into freelancer proposals that sound sharp, specific, and credible.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
                Paste a job post, add your skills, choose your experience level, and generate a polished outreach package with a hook line and thoughtful client questions.
              </p>
              <div className="mt-6">
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setActiveView("jobs")} type="button" variant="secondary">
                    Find Open Jobs In Your Niche
                  </Button>
                  <Button onClick={() => setActiveView("send")} type="button" variant="ghost">
                    Send Proposals
                  </Button>
                </div>
              </div>
            </div>
            <div className="glass-panel w-full max-w-sm rounded-[28px] border border-white/80 p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-extrabold text-ink">1</div>
                  <div className="text-sm text-muted">Tailored hook</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-ink">1</div>
                  <div className="text-sm text-muted">Ready proposal</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-ink">2</div>
                  <div className="text-sm text-muted">Smart questions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <div className="space-y-6">
            <ProposalForm
              initialValue={draft}
              onSubmit={handleGenerate}
              isSubmitting={proposalMutation.isPending}
              apiError={proposalMutation.error?.message ?? null}
            />
            <HistoryPanel
              entries={history.entries}
              selectedId={activeProposal?.id ?? null}
              onLoad={handleLoadHistory}
              onDelete={handleDeleteHistory}
              onClear={history.clearEntries}
            />
          </div>

          <div className="lg:sticky lg:top-6 lg:self-start">
            <ProposalResult
              proposal={activeProposal}
              isLoading={proposalMutation.isPending}
              onRegenerate={handleRegenerate}
              canRegenerate={Boolean(draft)}
            />
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <Card className="overflow-hidden">
            <div className="flex flex-col gap-6">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  Billing & Pricing
                </span>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                  Choose a plan, connect a payment gateway, and keep billing as polished as the proposal itself.
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
                  Pricing is built for freelancers and small studios, with support for recurring subscriptions, instant receipts, and gateway coverage for both domestic and international payments.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {billingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className="rounded-[28px] border border-line/80 bg-white/80 p-5 shadow-[0_14px_40px_rgba(19,22,29,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-extrabold text-ink">{plan.name}</h3>
                        <p className="mt-2 text-sm text-muted">{plan.description}</p>
                      </div>
                      {plan.name === "Growth" ? (
                        <span className="rounded-full bg-peach px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                          Popular
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-5 flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-ink">{plan.price}</span>
                      <span className="pb-1 text-sm font-semibold text-muted">{plan.cadence}</span>
                    </div>
                    <ul className="mt-5 space-y-3 text-sm text-muted">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-ink text-white">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                Payment Gateway
              </span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-white">
                Billing rails ready for cards, UPI, and recurring subscriptions.
              </h2>
              <p className="mt-3 text-sm text-white/70 sm:text-base">
                Use one gateway for local payments, a second for global cards, and keep every transaction tied to a clean invoice trail.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {paymentGateways.map((gateway) => (
                <div key={gateway.name} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-extrabold uppercase tracking-[0.18em] text-peach">{gateway.name}</div>
                  <p className="mt-2 text-sm leading-6 text-white/75">{gateway.summary}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-extrabold uppercase tracking-[0.18em] text-peach">What billing includes</div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                {billingHighlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-peach" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </section>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
