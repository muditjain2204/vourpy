import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HistoryPanel } from "./history-panel";
import type { StoredProposal } from "../../types/proposals";

const entry: StoredProposal = {
  id: "entry_1",
  generatedAt: "2026-03-29T00:00:00Z",
  requestId: "req_1",
  jobDescription: "Need a SaaS engineer for onboarding, billing, and analytics.",
  skills: ["React", "FastAPI"],
  experienceLevel: "senior",
  hookLine: "I can help shape this like a product feature, not a ticket queue.",
  proposal: "Sample proposal",
  proposalPreview: "Sample proposal",
  clientQuestions: ["Question one?", "Question two?"],
};

describe("HistoryPanel", () => {
  it("loads and deletes entries", async () => {
    const onLoad = vi.fn();
    const onDelete = vi.fn();
    const onClear = vi.fn();

    render(
      <HistoryPanel
        entries={[entry]}
        selectedId={null}
        onClear={onClear}
        onDelete={onDelete}
        onLoad={onLoad}
      />,
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /load/i }));
    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(onLoad).toHaveBeenCalledWith(entry);
    expect(onDelete).toHaveBeenCalledWith("entry_1");
  });
});

