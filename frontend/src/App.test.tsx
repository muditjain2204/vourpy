import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

function renderApp() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>,
  );
}

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders billing plans and payment gateway details", () => {
    renderApp();

    expect(screen.getByText(/billing & pricing/i)).toBeInTheDocument();
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Growth")).toBeInTheDocument();
    expect(screen.getByText("Agency")).toBeInTheDocument();
    expect(screen.getByText("Rs 2,499")).toBeInTheDocument();
    expect(screen.getByText("Razorpay Checkout")).toBeInTheDocument();
    expect(screen.getByText("Stripe")).toBeInTheDocument();
  });

  it("opens the niche jobs page from the hero button", async () => {
    renderApp();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /find open jobs in your niche/i }));

    expect(screen.getByText(/find openings in the niche you actually want to pitch for/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /upwork saas roles/i })).toHaveAttribute(
      "href",
      expect.stringContaining("upwork.com"),
    );
    expect(screen.getByRole("link", { name: /linkedin ai roles/i })).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com"),
    );
    expect(screen.getByRole("link", { name: /fiverr saas gigs/i })).toHaveAttribute(
      "href",
      expect.stringContaining("fiverr.com"),
    );
    expect(screen.getByRole("link", { name: /naukri ai jobs/i })).toHaveAttribute(
      "href",
      expect.stringContaining("naukri.com"),
    );
    expect(screen.getByText("Graphic Designer")).toBeInTheDocument();
    expect(screen.getByText("AI Agent Developer")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Backend Developer")).toBeInTheDocument();
  });

  it("switches to internships and hackathons discovery options", async () => {
    renderApp();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /find open jobs in your niche/i }));
    await user.click(screen.getByRole("button", { name: /^internships$/i }));

    expect(screen.getByText(/track internship openings across student-friendly job platforms/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /internshala engineering internships/i })).toHaveAttribute(
      "href",
      expect.stringContaining("internshala.com"),
    );
    expect(screen.getByRole("link", { name: /unstop internship listings/i })).toHaveAttribute(
      "href",
      expect.stringContaining("unstop.com"),
    );

    await user.click(screen.getByRole("button", { name: /^hackathons$/i }));

    expect(screen.getByText(/jump into live hackathons, coding contests, and startup challenges/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /unstop hackathons/i })).toHaveAttribute(
      "href",
      expect.stringContaining("unstop.com"),
    );
  });

  it("opens the send proposals page and enables send actions after a proposal exists", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          hookLine: "I can help turn this requirement into a polished product launch plan.",
          proposal: "I have experience shipping similar projects and can handle delivery end to end.",
          clientQuestions: [
            "Which user workflow matters most in the first release?",
            "Do you already have designs or should I define the UI direction too?",
          ],
          requestId: "req_send",
          generatedAt: "2026-03-30T00:00:00Z",
        }),
      }),
    );

    const clipboardWrite = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      value: {
        writeText: clipboardWrite,
      },
      configurable: true,
    });
    vi.stubGlobal("open", vi.fn());

    renderApp();
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: /send proposals/i })[0]);
    expect(screen.getByText(/generate or load a proposal first/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send proposal via upwork saas roles/i })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /proposal generator/i }));
    await user.type(
      screen.getByLabelText(/job description/i),
      "Need a full-stack engineer to build a SaaS onboarding flow, admin dashboard, and proposal-ready UI for our B2B product.",
    );
    await user.type(screen.getByLabelText(/skills/i), "React, FastAPI, SaaS UX");
    await user.click(screen.getByRole("button", { name: /generate proposal/i }));

    await screen.findAllByText(/I can help turn this requirement into a polished product launch plan/i);

    await user.click(screen.getAllByRole("button", { name: /^send proposals$/i })[0]);
    const sendButton = screen.getByRole("button", { name: /send proposal via upwork saas roles/i });
    expect(sendButton).toBeEnabled();

    await user.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/proposal copied\. opening upwork saas roles\./i)).toBeInTheDocument();
      expect(window.open).toHaveBeenCalled();
    });
  });

  it("uses an imported proposal as the send source", async () => {
    renderApp();
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: /send proposals/i })[0]);

    const upload = new File(["Imported proposal headline\n\nThis imported file contains a custom proposal draft."], "proposal.txt", {
      type: "text/plain",
    });
    await user.upload(screen.getByLabelText(/import proposal file/i), upload);

    await user.clear(screen.getByPlaceholderText(/paste or edit the imported proposal text here/i));
    await user.type(
      screen.getByPlaceholderText(/paste or edit the imported proposal text here/i),
      "Imported hook line{enter}{enter}This imported proposal is ready to be used for sending.",
    );
    await user.click(screen.getByRole("button", { name: /use imported proposal/i }));

    expect(screen.getByText(/source: imported file/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send proposal via upwork saas roles/i })).toBeEnabled();
  });

  it("renders generated content and saves it to history", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          hookLine: "This feels like a SaaS funnel problem I can help fix quickly.",
          proposal: "I can translate this brief into a clean build plan and move from UX to delivery without losing momentum.",
          clientQuestions: [
            "Which activation metric matters most to you?",
            "Do you already have designs or should I define the interaction model too?",
          ],
          requestId: "req_123",
          generatedAt: "2026-03-29T00:00:00Z",
        }),
      }),
    );

    renderApp();
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/job description/i),
      "Need a full-stack engineer to build a SaaS onboarding flow, admin dashboard, and proposal-ready UI for our B2B product.",
    );
    await user.type(screen.getByLabelText(/skills/i), "React, FastAPI, SaaS UX");
    await user.click(screen.getByRole("button", { name: /generate proposal/i }));

    expect(await screen.findAllByText(/This feels like a SaaS funnel problem/i)).toHaveLength(2);
    expect(screen.getByText(/Which activation metric matters most/i)).toBeInTheDocument();

    await waitFor(() => {
      const history = window.localStorage.getItem("proposal-forge-history");
      expect(history).toContain("req_123");
    });
  });

  it("shows an API error banner", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          message: "OpenAI request failed.",
        }),
      }),
    );

    renderApp();
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/job description/i),
      "Need a full-stack engineer to build a SaaS onboarding flow, admin dashboard, and proposal-ready UI for our B2B product.",
    );
    await user.type(screen.getByLabelText(/skills/i), "React, FastAPI, SaaS UX");
    await user.click(screen.getByRole("button", { name: /generate proposal/i }));

    expect(await screen.findByText("OpenAI request failed.")).toBeInTheDocument();
  });
});
