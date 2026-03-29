import { z } from "zod";

export const experienceLevels = ["junior", "mid", "senior"] as const;

export const parseSkillsInput = (value: string) =>
  Array.from(
    new Set(
      value
        .split(/[\n,]/g)
        .map((skill) => skill.trim())
        .filter(Boolean)
        .map((skill) => skill.toLowerCase()),
    ),
  );

export const proposalFormSchema = z.object({
  jobDescription: z
    .string()
    .trim()
    .min(50, "Add a more detailed brief so the proposal can be specific.")
    .max(5000, "Keep the job description under 5000 characters."),
  skillsInput: z
    .string()
    .trim()
    .refine((value) => parseSkillsInput(value).length >= 1, "Add at least one skill.")
    .refine((value) => parseSkillsInput(value).length <= 20, "Use no more than 20 skills."),
  experienceLevel: z.enum(experienceLevels),
});

export type ProposalFormValues = z.infer<typeof proposalFormSchema>;

