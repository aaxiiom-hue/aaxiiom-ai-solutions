import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { industries } from "@/data/catalogue";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — AI & Automation Opportunities | Aaxiiom" },
      {
        name: "description",
        content:
          "Browse AI and automation opportunities by industry: retail, e-commerce, manufacturing, healthcare, logistics, finance and more.",
      },
      { property: "og:title", content: "Industries — AI & Automation Opportunities | Aaxiiom" },
      {
        property: "og:description",
        content: "Pick your industry and see the business problems AI and automation can address.",
      },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl sm:text-5xl">Find your industry, then your problem</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Each industry page covers an overview, the problems we see most often, possible AI and
            automation solutions, and a way to start a conversation about your specific situation.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to="/industries/$industrySlug"
              params={{ industrySlug: industry.slug }}
              className="group flex flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
            >
              <h2 className="text-lg font-bold">{industry.name}</h2>
              <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                {industry.overview}
              </p>
              <ul className="mt-4 space-y-1.5">
                {industry.problems.slice(0, 3).map((problem) => (
                  <li key={problem.slug} className="text-sm text-muted-foreground">
                    · {problem.title}
                  </li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Explore {industry.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Your industry isn't listed?"
        description="The catalogue grows from real conversations. Tell us your industry and the problem you're facing, and we'll review whether AI, automation or software fits."
        primaryLabel="Tell Us Your Problem"
      />
      <div className="h-14" />
    </>
  );
}
