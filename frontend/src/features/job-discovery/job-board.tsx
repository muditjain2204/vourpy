import { useState } from "react";

import { Card } from "../../components/ui/card";

export type DiscoveryMode = "freelance" | "internships" | "hackathons";

export type JobLink = {
  label: string;
  href: string;
};

export type DiscoveryCollection = {
  name: string;
  summary: string;
  keywords: string[];
  links: JobLink[];
};

export const freelanceBoards: DiscoveryCollection[] = [
  {
    name: "SaaS Full-Stack",
    summary: "Product-minded engineering roles focused on dashboards, auth, billing, and internal tools.",
    keywords: ["React", "FastAPI", "SaaS", "Dashboards"],
    links: [
      {
        label: "Upwork SaaS roles",
        href: "https://www.upwork.com/nx/search/jobs/?q=SaaS%20full%20stack%20React%20FastAPI",
      },
      {
        label: "Fiverr SaaS gigs",
        href: "https://www.fiverr.com/search/gigs?query=saas%20full%20stack%20react",
      },
      {
        label: "Toptal SaaS network",
        href: "https://www.toptal.com/talent/apply",
      },
      {
        label: "Gigster engineering projects",
        href: "https://gigster.com/talent",
      },
      {
        label: "LinkedIn SaaS jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=SaaS%20full%20stack%20developer",
      },
      {
        label: "Naukri SaaS jobs",
        href: "https://www.naukri.com/saas-developer-jobs",
      },
      {
        label: "Indeed SaaS roles",
        href: "https://in.indeed.com/jobs?q=saas+full+stack+developer",
      },
      {
        label: "Wellfound startup jobs",
        href: "https://wellfound.com/jobs?query=SaaS%20full-stack%20developer",
      },
    ],
  },
  {
    name: "Frontend UI/UX",
    summary: "Openings for polished interfaces, landing pages, dashboards, and responsive product work.",
    keywords: ["React", "Tailwind", "Design Systems", "UX"],
    links: [
      {
        label: "Upwork frontend roles",
        href: "https://www.upwork.com/nx/search/jobs/?q=React%20Tailwind%20frontend%20UI%20UX",
      },
      {
        label: "Fiverr UI gigs",
        href: "https://www.fiverr.com/search/gigs?query=react%20tailwind%20ui%20ux",
      },
      {
        label: "Toptal design network",
        href: "https://www.toptal.com/designers/apply",
      },
      {
        label: "LinkedIn UI jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=frontend%20ui%20ux%20developer",
      },
      {
        label: "Naukri UI jobs",
        href: "https://www.naukri.com/frontend-ui-developer-jobs",
      },
      {
        label: "Indeed frontend roles",
        href: "https://in.indeed.com/jobs?q=frontend+ui+ux+developer",
      },
      {
        label: "Dribbble design jobs",
        href: "https://dribbble.com/jobs?search=frontend%20ui%20ux",
      },
      {
        label: "Gigster product design projects",
        href: "https://gigster.com/talent",
      },
    ],
  },
  {
    name: "AI Automation",
    summary: "Projects involving LLM apps, prompt workflows, automations, and AI-powered SaaS tools.",
    keywords: ["OpenAI", "Agents", "Automation", "Python"],
    links: [
      {
        label: "Upwork AI jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=OpenAI%20automation%20Python%20AI%20app",
      },
      {
        label: "Fiverr AI gigs",
        href: "https://www.fiverr.com/search/gigs?query=openai%20automation%20python",
      },
      {
        label: "Toptal engineering network",
        href: "https://www.toptal.com/talent/apply",
      },
      {
        label: "Gigster AI projects",
        href: "https://gigster.com/talent",
      },
      {
        label: "LinkedIn AI roles",
        href: "https://www.linkedin.com/jobs/search/?keywords=AI%20automation%20engineer",
      },
      {
        label: "Naukri AI jobs",
        href: "https://www.naukri.com/ai-engineer-jobs",
      },
      {
        label: "Indeed AI roles",
        href: "https://in.indeed.com/jobs?q=ai+automation+engineer",
      },
      {
        label: "Wellfound AI startup jobs",
        href: "https://wellfound.com/jobs?query=AI%20automation%20engineer",
      },
    ],
  },
  {
    name: "E-commerce & Growth",
    summary: "Storefront, conversion, retention, and analytics-heavy work for online businesses.",
    keywords: ["Shopify", "Funnels", "Conversion", "Analytics"],
    links: [
      {
        label: "Upwork e-commerce jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=Shopify%20conversion%20analytics%20developer",
      },
      {
        label: "Fiverr e-commerce gigs",
        href: "https://www.fiverr.com/search/gigs?query=shopify%20conversion%20developer",
      },
      {
        label: "LinkedIn growth jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=ecommerce%20growth%20developer",
      },
      {
        label: "Naukri e-commerce jobs",
        href: "https://www.naukri.com/ecommerce-developer-jobs",
      },
      {
        label: "Indeed e-commerce roles",
        href: "https://in.indeed.com/jobs?q=ecommerce+frontend+developer",
      },
      {
        label: "Gigster commerce projects",
        href: "https://gigster.com/talent",
      },
      {
        label: "Toptal commerce network",
        href: "https://www.toptal.com/talent/apply",
      },
    ],
  },
  {
    name: "Graphic Designer",
    summary: "Branding, social creatives, web visuals, ad assets, and campaign design work across freelance platforms.",
    keywords: ["Branding", "Ads", "Social Media", "Visual Design"],
    links: [
      {
        label: "Upwork graphic design jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=graphic%20designer",
      },
      {
        label: "Fiverr graphic design gigs",
        href: "https://www.fiverr.com/search/gigs?query=graphic%20designer",
      },
      {
        label: "Toptal design network",
        href: "https://www.toptal.com/designers/apply",
      },
      {
        label: "LinkedIn graphic designer jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=graphic%20designer",
      },
      {
        label: "Naukri graphic design jobs",
        href: "https://www.naukri.com/graphic-designer-jobs",
      },
      {
        label: "Indeed graphic design roles",
        href: "https://in.indeed.com/jobs?q=graphic+designer",
      },
    ],
  },
  {
    name: "Video Editor",
    summary: "Editing work for YouTube, ads, brand content, reels, explainers, and short-form performance creatives.",
    keywords: ["Editing", "Reels", "Ads", "YouTube"],
    links: [
      {
        label: "Upwork video editor jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=video%20editor",
      },
      {
        label: "Fiverr video editing gigs",
        href: "https://www.fiverr.com/search/gigs?query=video%20editor",
      },
      {
        label: "LinkedIn video editor jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=video%20editor",
      },
      {
        label: "Naukri video editor jobs",
        href: "https://www.naukri.com/video-editor-jobs",
      },
      {
        label: "Indeed video editor roles",
        href: "https://in.indeed.com/jobs?q=video+editor",
      },
    ],
  },
  {
    name: "Thumbnail Designer",
    summary: "YouTube and social thumbnail work focused on CTR, creative direction, and fast-turnaround marketing assets.",
    keywords: ["Thumbnails", "YouTube", "CTR", "Social Media"],
    links: [
      {
        label: "Upwork thumbnail design jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=thumbnail%20designer",
      },
      {
        label: "Fiverr thumbnail gigs",
        href: "https://www.fiverr.com/search/gigs?query=thumbnail%20designer",
      },
      {
        label: "LinkedIn thumbnail design jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=thumbnail%20designer",
      },
      {
        label: "Indeed thumbnail design roles",
        href: "https://in.indeed.com/jobs?q=thumbnail+designer",
      },
    ],
  },
  {
    name: "AI Agent Developer",
    summary: "Roles building AI agents, tool-using workflows, copilots, automations, and LLM-powered product features.",
    keywords: ["AI Agents", "OpenAI", "Automation", "LLMs"],
    links: [
      {
        label: "Upwork AI agent jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=AI%20agent%20developer",
      },
      {
        label: "Fiverr AI agent gigs",
        href: "https://www.fiverr.com/search/gigs?query=ai%20agent%20developer",
      },
      {
        label: "Toptal engineering network",
        href: "https://www.toptal.com/talent/apply",
      },
      {
        label: "Gigster AI agent projects",
        href: "https://gigster.com/talent",
      },
      {
        label: "LinkedIn AI agent roles",
        href: "https://www.linkedin.com/jobs/search/?keywords=AI%20agent%20developer",
      },
      {
        label: "Naukri AI agent jobs",
        href: "https://www.naukri.com/ai-developer-jobs",
      },
      {
        label: "Indeed AI agent roles",
        href: "https://in.indeed.com/jobs?q=ai+agent+developer",
      },
    ],
  },
  {
    name: "Product Manager",
    summary: "Product strategy, roadmap planning, user research, specs, growth experiments, and delivery coordination roles.",
    keywords: ["Roadmap", "Discovery", "Specs", "Growth"],
    links: [
      {
        label: "Upwork product manager jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=product%20manager",
      },
      {
        label: "Fiverr product strategy gigs",
        href: "https://www.fiverr.com/search/gigs?query=product%20manager%20strategy",
      },
      {
        label: "LinkedIn product manager jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=product%20manager",
      },
      {
        label: "Naukri product manager jobs",
        href: "https://www.naukri.com/product-manager-jobs",
      },
      {
        label: "Indeed product manager roles",
        href: "https://in.indeed.com/jobs?q=product+manager",
      },
      {
        label: "Wellfound product jobs",
        href: "https://wellfound.com/jobs?query=product%20manager",
      },
    ],
  },
  {
    name: "Data Analyst",
    summary: "Dashboarding, BI, reporting, SQL, and decision-support roles for product, finance, and operations teams.",
    keywords: ["SQL", "Dashboards", "BI", "Reporting"],
    links: [
      {
        label: "Upwork data analyst jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=data%20analyst",
      },
      {
        label: "Fiverr data analyst gigs",
        href: "https://www.fiverr.com/search/gigs?query=data%20analyst",
      },
      {
        label: "LinkedIn data analyst jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=data%20analyst",
      },
      {
        label: "Naukri data analyst jobs",
        href: "https://www.naukri.com/data-analyst-jobs",
      },
      {
        label: "Indeed data analyst roles",
        href: "https://in.indeed.com/jobs?q=data+analyst",
      },
    ],
  },
  {
    name: "Data Scientist",
    summary: "Machine learning, experimentation, modeling, feature engineering, and predictive analytics roles.",
    keywords: ["ML", "Models", "Python", "Analytics"],
    links: [
      {
        label: "Upwork data scientist jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=data%20scientist",
      },
      {
        label: "Fiverr data science gigs",
        href: "https://www.fiverr.com/search/gigs?query=data%20scientist",
      },
      {
        label: "LinkedIn data scientist jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=data%20scientist",
      },
      {
        label: "Naukri data scientist jobs",
        href: "https://www.naukri.com/data-scientist-jobs",
      },
      {
        label: "Indeed data scientist roles",
        href: "https://in.indeed.com/jobs?q=data+scientist",
      },
    ],
  },
  {
    name: "Frontend Developer",
    summary: "Roles focused on responsive UIs, performance, accessibility, design systems, and modern app interfaces.",
    keywords: ["React", "UI", "Accessibility", "Performance"],
    links: [
      {
        label: "Upwork frontend developer jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=frontend%20developer",
      },
      {
        label: "Fiverr frontend gigs",
        href: "https://www.fiverr.com/search/gigs?query=frontend%20developer",
      },
      {
        label: "Toptal frontend network",
        href: "https://www.toptal.com/talent/apply",
      },
      {
        label: "Gigster frontend projects",
        href: "https://gigster.com/talent",
      },
      {
        label: "LinkedIn frontend developer jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=frontend%20developer",
      },
      {
        label: "Naukri frontend developer jobs",
        href: "https://www.naukri.com/frontend-developer-jobs",
      },
      {
        label: "Indeed frontend developer roles",
        href: "https://in.indeed.com/jobs?q=frontend+developer",
      },
    ],
  },
  {
    name: "Backend Developer",
    summary: "Openings around APIs, services, databases, distributed systems, integrations, and platform engineering.",
    keywords: ["APIs", "Python", "Databases", "Services"],
    links: [
      {
        label: "Upwork backend developer jobs",
        href: "https://www.upwork.com/nx/search/jobs/?q=backend%20developer",
      },
      {
        label: "Fiverr backend gigs",
        href: "https://www.fiverr.com/search/gigs?query=backend%20developer",
      },
      {
        label: "Toptal backend network",
        href: "https://www.toptal.com/talent/apply",
      },
      {
        label: "Gigster backend projects",
        href: "https://gigster.com/talent",
      },
      {
        label: "LinkedIn backend developer jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=backend%20developer",
      },
      {
        label: "Naukri backend developer jobs",
        href: "https://www.naukri.com/backend-developer-jobs",
      },
      {
        label: "Indeed backend developer roles",
        href: "https://in.indeed.com/jobs?q=backend+developer",
      },
    ],
  },
];

export const internshipBoards: DiscoveryCollection[] = [
  {
    name: "Engineering Internships",
    summary: "Early-career openings for software engineering, web development, and product-building internships.",
    keywords: ["Internships", "Engineering", "Frontend", "Backend"],
    links: [
      {
        label: "Internshala engineering internships",
        href: "https://internshala.com/internships/software-development-internship",
      },
      {
        label: "Unstop internship listings",
        href: "https://unstop.com/internships",
      },
      {
        label: "LinkedIn internship jobs",
        href: "https://www.linkedin.com/jobs/search/?keywords=software%20engineering%20intern",
      },
      {
        label: "Naukri internship openings",
        href: "https://www.naukri.com/internship-jobs",
      },
      {
        label: "Indeed internship listings",
        href: "https://in.indeed.com/jobs?q=software+engineering+internship",
      },
    ],
  },
  {
    name: "AI & Data Internships",
    summary: "Internships around machine learning, prompt engineering, automation, and AI-powered products.",
    keywords: ["AI", "ML", "Automation", "Data"],
    links: [
      {
        label: "Internshala AI internships",
        href: "https://internshala.com/internships/artificial-intelligence-internship",
      },
      {
        label: "Unstop AI internships",
        href: "https://unstop.com/internships?search=artificial%20intelligence",
      },
      {
        label: "LinkedIn AI intern roles",
        href: "https://www.linkedin.com/jobs/search/?keywords=ai%20intern",
      },
      {
        label: "Indeed AI internships",
        href: "https://in.indeed.com/jobs?q=ai+internship",
      },
    ],
  },
];

export const hackathonBoards: DiscoveryCollection[] = [
  {
    name: "Hackathons & Challenges",
    summary: "Join active hackathons and coding competitions where you can build, compete, and meet hiring teams.",
    keywords: ["Hackathons", "Challenges", "Teams", "Build"],
    links: [
      {
        label: "Unstop hackathons",
        href: "https://unstop.com/hackathons",
      },
      {
        label: "Unstop coding challenges",
        href: "https://unstop.com/competitions",
      },
      {
        label: "Internshala student events",
        href: "https://trainings.internshala.com/",
      },
    ],
  },
  {
    name: "Startup & Product Sprints",
    summary: "Product-building competitions and startup sprints that are useful for networking and portfolio building.",
    keywords: ["Startup", "Product", "Demo", "Portfolio"],
    links: [
      {
        label: "Unstop startup competitions",
        href: "https://unstop.com/competitions?oppstatus=open&domain=business",
      },
      {
        label: "Unstop innovation challenges",
        href: "https://unstop.com/competitions?search=innovation",
      },
    ],
  },
];

export const modeConfig: Record<
  DiscoveryMode,
  {
    badge: string;
    title: string;
    description: string;
    collections: DiscoveryCollection[];
  }
> = {
  freelance: {
    badge: "Freelance Jobs",
    title: "Find openings in the niche you actually want to pitch for.",
    description:
      "Pick a niche, open curated search links, and jump straight into relevant job boards without rebuilding the same searches every time.",
    collections: freelanceBoards,
  },
  internships: {
    badge: "Internships",
    title: "Track internship openings across student-friendly job platforms.",
    description:
      "Switch to internship mode to browse software, AI, and product internship searches across Internshala, Unstop, LinkedIn, Naukri, and Indeed.",
    collections: internshipBoards,
  },
  hackathons: {
    badge: "Hackathons",
    title: "Jump into live hackathons, coding contests, and startup challenges.",
    description:
      "Use hackathon mode to find active events that help you build portfolio work, meet collaborators, and discover talent-facing opportunities.",
    collections: hackathonBoards,
  },
};

const modeLabels: Record<DiscoveryMode, string> = {
  freelance: "Freelance",
  internships: "Internships",
  hackathons: "Hackathons",
};

export function JobBoard() {
  const [activeMode, setActiveMode] = useState<DiscoveryMode>("freelance");
  const config = modeConfig[activeMode];

  return (
    <section className="space-y-6">
      <Card className="overflow-hidden">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            {config.badge}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">{config.title}</h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{config.description}</p>

          <div className="mt-6 inline-flex flex-wrap rounded-full border border-line bg-white/80 p-1">
            {(Object.keys(modeLabels) as DiscoveryMode[]).map((mode) => (
              <button
                key={mode}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeMode === mode ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
                onClick={() => setActiveMode(mode)}
                type="button"
              >
                {modeLabels[mode]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {config.collections.map((collection) => (
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
                  <a
                    key={link.href}
                    className="group flex items-center justify-between rounded-[22px] border border-line bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:bg-accent/5"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="text-muted transition group-hover:font-extrabold group-hover:text-ink">
                      Open
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
