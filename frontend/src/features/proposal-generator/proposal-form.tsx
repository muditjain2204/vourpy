import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import type { ProposalRequest } from "../../types/proposals";
import { parseSkillsInput, proposalFormSchema, type ProposalFormValues } from "./schema";

type ProposalFormProps = {
  initialValue: ProposalRequest | null;
  onSubmit: (payload: ProposalRequest) => void;
  isSubmitting: boolean;
  apiError: string | null;
};

function titleCaseSkill(value: string) {
  return value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function ProposalForm({ initialValue, onSubmit, isSubmitting, apiError }: ProposalFormProps) {
  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      jobDescription: initialValue?.jobDescription ?? "",
      skillsInput: initialValue?.skills.join(", ") ?? "",
      experienceLevel: initialValue?.experienceLevel ?? "senior",
    },
  });

  useEffect(() => {
    form.reset({
      jobDescription: initialValue?.jobDescription ?? "",
      skillsInput: initialValue?.skills.join(", ") ?? "",
      experienceLevel: initialValue?.experienceLevel ?? "senior",
    });
  }, [form, initialValue]);

  const submitForm = (values: ProposalFormValues) => {
    onSubmit({
      jobDescription: values.jobDescription.trim(),
      skills: parseSkillsInput(values.skillsInput).map(titleCaseSkill),
      experienceLevel: values.experienceLevel,
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-ink">Generate a proposal</h2>
          <p className="mt-2 text-sm text-muted">
            Strong results come from a rich brief. Skills are auto-cleaned and deduplicated before submission.
          </p>
        </div>
        <div className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          FastAPI + GPT-5.4
        </div>
      </div>

      <form className="space-y-5" onSubmit={form.handleSubmit(submitForm)}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink" htmlFor="jobDescription">
            Job description
          </label>
          <textarea
            id="jobDescription"
            rows={8}
            className="w-full rounded-3xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
            placeholder="Paste the full client brief here..."
            {...form.register("jobDescription")}
          />
          <p className="text-xs text-muted">{form.watch("jobDescription").length}/5000 characters</p>
          {form.formState.errors.jobDescription ? (
            <p className="text-sm text-red-600">{form.formState.errors.jobDescription.message}</p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink" htmlFor="skillsInput">
              Skills
            </label>
            <textarea
              id="skillsInput"
              rows={4}
              className="w-full rounded-3xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              placeholder="React, TypeScript, FastAPI, SaaS UX"
              {...form.register("skillsInput")}
            />
            {form.formState.errors.skillsInput ? (
              <p className="text-sm text-red-600">{form.formState.errors.skillsInput.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-ink" htmlFor="experienceLevel">
              Experience level
            </label>
            <select
              id="experienceLevel"
              className="w-full rounded-3xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              {...form.register("experienceLevel")}
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
            </select>
            <p className="text-xs text-muted">This adjusts tone, confidence, and delivery framing.</p>
          </div>
        </div>

        {apiError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{apiError}</div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">The output includes a hook line, full proposal, and 2 discovery questions.</p>
          <Button className="min-w-[180px]" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Generating..." : "Generate Proposal"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

