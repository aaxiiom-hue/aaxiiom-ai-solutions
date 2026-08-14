import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { solutionCategories } from "@/data/catalogue";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions — AI Agents, Automation & Document AI | Aaxiiom" },
      {
        name: "description",
        content:
          "Reusable solution categories: AI agents, workflow automation, document AI, generative AI, machine learning and custom software.",
      },
      { property: "og:title", content: "Solutions — AI Agents, Automation & Document AI | Aaxiiom" },
      {
        property: "og:description",
        content: "The building blocks Aaxiiom combines around a specific business problem.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl sm:text-5xl">Solution categories</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            These are the building blocks. We only recommend one once we understand the problem it
            is supposed to solve — and sometimes the answer is plain software, not AI.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-4 lg:grid-cols-2">
          {solutionCategories.map((category) => (
            <div key={category.slug} className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold">{category.name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{category.description}</p>
              <ul className="mt-4 space-y-2">
                {category.solutions.map((solution) => (
                  <li key={solution.slug} className="rounded-xl bg-surface px-4 py-3">
                    <p className="text-sm font-semibold">{solution.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{solution.summary}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/solutions/$categorySlug"
                params={{ categorySlug: category.slug }}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary"
              >
                Explore {category.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure which of these fits?"
        description="Describe the problem instead of picking a technology. We'll map it to the right approach — or tell you it doesn't need one."
        primaryLabel="Request a Solution Assessment"
      />
      <div className="h-14" />
    </>
  );
}
