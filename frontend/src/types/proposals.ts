export type ExperienceLevel = "junior" | "mid" | "senior";

export type ProposalRequest = {
  jobDescription: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
};

export type ProposalResponse = {
  hookLine: string;
  proposal: string;
  clientQuestions: [string, string];
  requestId: string;
  generatedAt: string;
};

export type StoredProposal = ProposalRequest &
  ProposalResponse & {
    id: string;
    proposalPreview: string;
  };
