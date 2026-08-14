import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { getCategory, problemsForCategory, solutionCategories } from "@/data/catalogue";

export const Route = createFileRoute("/solutions/$categorySlug")({
  loader: ({ params }) => {
    const category = getCategory(params.categorySlug);
    if (!category) throw notFound();
    return { category, problems: problemsForCategory(category.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Solution not found | Aaxiiom" }, { name: "robots", content: "noindex" }],
      };
    }
    const { category } = loaderData;
    const title = `${category.name} — ${category.tagline} | Aaxiiom`;
    return {
      meta: [
        { title },
        { name: "description", content: category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: category.description },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryNotFound() {
  return (
    <div className="container-page py-20">
      <h1 className="text-3xl">Solution not found</h1>
      <Link to="/solutions" className="mt-5 inline-block text-sm font-semibold text-primary">
        Back to all solutions
      </Link>
    </div>
  );
}

function CategoryPage() {
  const { category, problems } = Route.useLoaderData();
  const others = solutionCategories.filter((item) => item.slug !== category.slug);

  return (
    <>
      <section className="border-b border-border bg-surface py-10 sm:py-14">
        <div className="container-page">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All solutions
          </Link>
          <h1 className="mt-5 text-3xl sm:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {category.description}
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="space-y-4">
          {category.solutions.map((solution) => (
            <article
              key={solution.slug}
              id={solution.slug}
              className="scroll-mt-24 rounded-3xl border border-border bg-card p-6"
            >
              <h2 className="text-xl font-bold">{solution.name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{solution.summary}</p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold">How it works</p>
                  <ul className="mt-2 space-y-1.5">
                    {solution.howItWorks.map((step) => (
                      <li key={step} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold">Typical integrations</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {solution.integrations.map((integration) => (
                      <span
                        key={integration}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {problems.length > 0 ? (
        <section className="container-page pb-12">
          <h2 className="text-2xl sm:text-3xl">Problems this could address</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <Link
                key={`${problem.industrySlug}-${problem.slug}`}
                to="/industries/$industrySlug"
                params={{ industrySlug: problem.industrySlug }}
                hash={problem.slug}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {problem.industryName}
                </p>
                <p className="mt-1.5 text-sm font-semibold">{problem.title}</p>
                <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">
                  {problem.problem}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-page pb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Other categories
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              to="/solutions/$categorySlug"
              params={{ categorySlug: item.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary/40"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <CtaBand primaryLabel="Talk to Aaxiiom" />
      <div className="h-14" />
    </>
  );
}
