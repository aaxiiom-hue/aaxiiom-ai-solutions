import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Bot, MessageSquare, Search, Workflow } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { caseStudies, industries, solutionCategories } from "@/data/catalogue";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aaxiiom — Discover What AI Can Do for Your Business" },
      {
        name: "description",
        content:
          "Explore common business problems by industry and discover practical AI and automation solutions that reduce repetitive work and help your business scale.",
      },
      { property: "og:title", content: "Aaxiiom — Discover What AI Can Do for Your Business" },
      {
        property: "og:description",
        content:
          "Business problem discovery, an AI solution catalogue and an AI consultant — built for practical results, not hype.",
      },
    ],
  }),
  component: Home,
});

const steps = [
  {
    icon: Search,
    title: "Start with your industry",
    body: "Browse a catalogue organised around business problems, not technologies.",
  },
  {
    icon: Workflow,
    title: "Find the real problem",
    body: "Each problem explains why it matters, a possible solution and an example workflow.",
  },
  {
    icon: Bot,
    title: "Talk to the AI Consultant",
    body: "Describe your situation and get pointed to a relevant solution — or an honest 'not yet'.",
  },
  {
    icon: MessageSquare,
    title: "Start a conversation",
    body: "Send us the problem in under two minutes. No accounts, no long forms.",
  },
];

function Home() {
  const featured = caseStudies.find((study) => study.featured) ?? caseStudies[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-backdrop" aria-hidden />
        <div className="container-page relative py-16 sm:py-24">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            AI · Automation · Custom Software
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Discover What <span className="text-gradient-brand">AI Can Do</span> for Your Business
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Explore common business problems and discover practical AI and automation solutions
            designed to reduce repetitive work, improve efficiency, and help your business scale.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full text-base sm:w-auto">
              <Link to="/industries">
                Explore AI Solutions
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full text-base sm:w-auto">
              <Link to="/tell-us-your-problem">Tell Us Your Problem</Link>
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Not sure where to start? Tap the{" "}
            <span className="font-semibold text-foreground">AI Consultant</span> button in the
            corner and describe your problem in plain language.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-4xl">Start with your industry</h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Every industry page lists the problems we see most often, the automation opportunities
            behind them and a possible solution for each.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to="/industries/$industrySlug"
              params={{ industrySlug: industry.slug }}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
            >
              <p className="text-base font-semibold">{industry.name}</p>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                {industry.problems.map((problem) => problem.area).join(" · ")}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {industry.problems.length} common problems
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl">How this works</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              We identify where AI and automation can solve meaningful business problems — and say
              so when the honest answer is better software or a simpler process.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <step.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {index + 1}
                </p>
                <p className="mt-1 text-base font-semibold">{step.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl">Solution categories</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Reusable building blocks we combine around your problem.
            </p>
          </div>
          <Link to="/solutions" className="text-sm font-semibold text-primary">
            View all solutions →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutionCategories.map((category) => (
            <Link
              key={category.slug}
              to="/solutions/$categorySlug"
              params={{ categorySlug: category.slug }}
              className="rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
            >
              <p className="text-base font-semibold">{category.name}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{category.tagline}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {category.solutions.map((solution) => solution.name).join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {featured ? (
        <section className="container-page pb-14 sm:pb-20">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Featured work
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl">{featured.title}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold">Business problem</p>
                <p className="mt-1 text-sm text-muted-foreground">{featured.problem}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Solution</p>
                <p className="mt-1 text-sm text-muted-foreground">{featured.solution}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Outcome</p>
                <p className="mt-1 text-sm text-muted-foreground">{featured.outcome}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-7">
              <Link to="/case-studies">See all case studies</Link>
            </Button>
          </div>
        </section>
      ) : null}

      <CtaBand />
      <div className="h-14" />
    </>
  );
}
