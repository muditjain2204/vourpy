from app.schemas.proposals import ProposalGenerationRequest


def build_proposal_messages(payload: ProposalGenerationRequest) -> list[dict[str, str]]:
    skills = ", ".join(payload.skills)
    return [
        {
            "role": "system",
            "content": (
                "You are an elite SaaS freelancer proposal strategist. "
                "Write concise, specific, conversion-focused proposals that feel human, confident, and credible. "
                "Avoid hype, generic filler, fake guarantees, and markdown headings inside the proposal body. "
                "Always return valid JSON matching the required schema."
            ),
        },
        {
            "role": "user",
            "content": (
                "Create a freelancer proposal package for the following job.\n\n"
                f"Experience level: {payload.experienceLevel.value}\n"
                f"Skills: {skills}\n\n"
                "Job description:\n"
                f"{payload.jobDescription}\n\n"
                "Response requirements:\n"
                "- hookLine: one short opener tailored to the client.\n"
                "- proposal: a persuasive proposal between 180 and 280 words.\n"
                "- clientQuestions: exactly two smart follow-up questions that uncover scope, constraints, or success metrics.\n"
                "The proposal should reference relevant skills naturally and sound like a senior freelancer who understands SaaS delivery."
            ),
        },
    ]

