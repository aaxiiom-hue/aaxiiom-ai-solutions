import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { ProblemCard } from "@/components/site/ProblemCard";
import { getIndustry, industries } from "@/data/catalogue";

export const Route = createFileRoute("/industries/$industrySlug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.industrySlug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Industry not found | Aaxiiom" }, { name: "robots", content: "noindex" }],
      };
    }
    const { industry } = loaderData;
    const title = `${industry.name} — AI & Automation Solutions | Aaxiiom`;
    const description = `Common ${industry.name.toLowerCase()} business problems and the AI, automation and software solutions that could address them.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: IndustryPage,
  notFoundComponent: IndustryNotFound,
});

function IndustryNotFound() {
  return (
    <div className="container-page py-20">
      <h1 className="text-3xl">Industry not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This industry isn't in the catalogue yet.
      </p>
      <Link to="/industries" className="mt-5 inline-block text-sm font-semibold text-primary">
        Back to all industries
      </Link>
    </div>
  );
}

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const others = industries.filter((item) => item.slug !== industry.slug).slice(0, 6);

  return (
    <>
      <section className="border-b border-border bg-surface py-10 sm:py-14">
        <div className="container-page">
          <Link
            to="/industries"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All industries
          </Link>
          <h1 className="mt-5 text-3xl sm:text-5xl">{industry.name}</h1>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {industry.overview}
          </p>

          <div className="mt-7 rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Automation opportunities
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {industry.automationOpportunities.map((opportunity) => (
                <li key={opportunity} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <h2 className="text-2xl sm:text-3xl">Common business problems</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Not every problem needs AI. Each entry describes a possible AI or automation solution —
          sometimes better software or a process change is the right answer.
        </p>
        <div className="mt-7 space-y-6">
          {industry.problems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </section>

      <section className="container-page pb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Other industries
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              to="/industries/$industrySlug"
              params={{ industrySlug: item.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary/40"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title={`Facing a different ${industry.name.toLowerCase()} problem?`}
        description="Describe it in your own words. We'll review whether AI, automation, analytics or custom software is the practical answer."
        primaryLabel="Discuss My Problem"
      />
      <div className="h-14" />
    </>
  );
}
