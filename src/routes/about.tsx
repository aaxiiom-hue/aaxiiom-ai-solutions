import { createFileRoute } from "@tanstack/react-router";

import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aaxiiom — Practical AI & Automation Partners" },
      {
        name: "description",
        content:
          "Aaxiiom is a digital automation and AI studio that identifies where AI and automation can solve meaningful business problems.",
      },
      { property: "og:title", content: "About Aaxiiom — Practical AI & Automation Partners" },
      {
        property: "og:description",
        content: "We focus on outcomes, not technologies. Here's how we think and what we build with.",
      },
    ],
  }),
  component: AboutPage,
});

const technologies = [
  { group: "Languages & frameworks", items: ["Python", "TypeScript", "FastAPI", "Node.js", "React", "Flutter"] },
  { group: "AI & data", items: ["OpenAI APIs", "LangChain", "RAG pipelines", "Vector databases", "OCR / Vision"] },
  { group: "Automation", items: ["n8n", "Zapier", "Make", "Webhooks", "REST APIs"] },
  { group: "Infrastructure", items: ["PostgreSQL", "Redis", "Docker", "AWS", "GCP", "CI/CD"] },
];

const principles = [
  {
    title: "Problems before technology",
    body: "We start from what is slowing your business down, not from what is currently fashionable in AI.",
  },
  {
    title: "Honest scoping",
    body: "If a problem is better solved with a process change or ordinary software, we say so.",
  },
  {
    title: "Human in the loop",
    body: "Automation handles the repetitive part. People keep the judgement calls that matter.",
  },
  {
    title: "Small, provable steps",
    body: "One workflow, measured against the manual baseline, before anything is expanded.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl sm:text-5xl">
            We identify where AI and automation actually help
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Aaxiiom is a digital automation and AI studio. We've delivered agentic retrieval
            systems, document processing pipelines, analytics platforms and custom applications —
            but the work always starts with a business problem worth solving.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title} className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">{principle.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{principle.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <h2 className="text-2xl sm:text-3xl">Technology we build with</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Proof of implementation capability — not the reason to hire us.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {technologies.map((group) => (
            <div key={group.group} className="rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.group}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand primaryLabel="Talk to Aaxiiom" />
      <div className="h-14" />
    </>
  );
}
