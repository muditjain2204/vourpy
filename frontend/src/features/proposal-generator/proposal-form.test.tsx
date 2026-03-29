import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProposalForm } from "./proposal-form";

describe("ProposalForm", () => {
  it("shows validation feedback for incomplete input", async () => {
    const onSubmit = vi.fn();
    render(<ProposalForm apiError={null} initialValue={null} isSubmitting={false} onSubmit={onSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/job description/i), "Too short");
    await user.click(screen.getByRole("button", { name: /generate proposal/i }));

    expect(await screen.findByText(/Add a more detailed brief/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("disables the submit button while generating", () => {
    render(<ProposalForm apiError={null} initialValue={null} isSubmitting onSubmit={vi.fn()} />);

    expect(screen.getByRole("button", { name: /generating/i })).toBeDisabled();
  });
});
