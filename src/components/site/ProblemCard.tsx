import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCategory, getSolution } from "@/data/catalogue";
import type { BusinessProblem } from "@/data/types";

export function ProblemCard({ problem }: { problem: BusinessProblem }) {
  const category = getCategory(problem.category);
  const solution = getSolution(problem.category, problem.solutionSlug);

  return (
    <article
      id={problem.slug}
      className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-7"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{problem.area}</p>
      <h3 className="mt-2 text-xl font-bold sm:text-2xl">{problem.title}</h3>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">The problem</p>
            <p className="mt-1 text-sm text-muted-foreground">{problem.problem}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Why it matters</p>
            <p className="mt-1 text-sm text-muted-foreground">{problem.whyItMatters}</p>
          </div>
          <div className="rounded-2xl bg-accent/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              Potential AI / automation solution
            </p>
            <p className="mt-1.5 text-sm font-medium">{problem.possibleSolution}</p>
            {category && solution ? (
              <Link
                to="/solutions/$categorySlug"
                params={{ categorySlug: category.slug }}
                hash={solution.slug}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary"
              >
                {category.name} · {solution.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold">How the solution works</p>
            <ul className="mt-2 space-y-1.5">
              {problem.howItWorks.map((step) => (
                <li key={step} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Potential benefits</p>
            <ul className="mt-2 space-y-1.5">
              {problem.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Example workflow
        </p>
        <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
          {problem.workflow.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-card px-3 py-1.5 text-xs font-medium shadow-[var(--shadow-soft)]">
                {step}
              </span>
              {index < problem.workflow.length - 1 ? (
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {problem.integrations.map((integration) => (
          <span
            key={integration}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
          >
            {integration}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link to="/tell-us-your-problem" search={{ problem: problem.title }}>
            I Have This Problem
          </Link>
        </Button>
        {category ? (
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link to="/solutions/$categorySlug" params={{ categorySlug: category.slug }}>
              Explore This Solution
            </Link>
          </Button>
        ) : null}
      </div>
    </article>
  );
}
