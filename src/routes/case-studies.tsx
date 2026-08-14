import { createFileRoute } from "@tanstack/react-router";

import { CtaBand } from "@/components/site/CtaBand";
import { caseStudies } from "@/data/catalogue";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Problem, Solution, Outcome | Aaxiiom" },
      {
        name: "description",
        content:
          "Real Aaxiiom projects presented as business problem, solution and outcome — with the technology underneath.",
      },
      { property: "og:title", content: "Case Studies — Problem, Solution, Outcome | Aaxiiom" },
      {
        property: "og:description",
        content: "AI, automation and data projects delivered across industries.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl sm:text-5xl">Work, described as problems solved</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Every project starts with a business problem. The technology is listed underneath as
            proof of implementation capability, not as the value proposition.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-4 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <article
              key={study.slug}
              className={`rounded-3xl border border-border bg-card p-6 ${
                study.featured ? "lg:col-span-2" : ""
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {study.industry}
              </p>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl">{study.title}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold">Business problem</p>
                  <p className="mt-1 text-sm text-muted-foreground">{study.problem}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Solution</p>
                  <p className="mt-1 text-sm text-muted-foreground">{study.solution}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Outcome</p>
                  <p className="mt-1 text-sm text-muted-foreground">{study.outcome}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {study.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title="Recognise your own problem here?"
        description="Tell us what's happening in your business and we'll assess whether a similar approach applies."
        primaryLabel="Discuss My Problem"
      />
      <div className="h-14" />
    </>
  );
}
