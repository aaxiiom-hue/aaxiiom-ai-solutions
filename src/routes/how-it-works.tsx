import { createFileRoute } from "@tanstack/react-router";

import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — From Business Problem to Solution | Aaxiiom" },
      {
        name: "description",
        content:
          "How Aaxiiom moves from a business problem to a scoped AI, automation or software solution — discovery, assessment, pilot, rollout.",
      },
      { property: "og:title", content: "How It Works — From Business Problem to Solution | Aaxiiom" },
      {
        property: "og:description",
        content: "A short, practical process: discover the problem, assess the options, pilot, then scale.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const phases = [
  {
    title: "1. Problem discovery",
    body: "We start with the process, not the technology. What happens today, how often, who is involved, and what the delay or error actually costs.",
    points: [
      "Short discovery conversation",
      "Current workflow mapped step by step",
      "Volume and effort quantified with your numbers",
    ],
  },
  {
    title: "2. Solution assessment",
    body: "We say honestly whether AI, automation, analytics, better software or a process change is the right answer — including when the answer is 'do nothing yet'.",
    points: [
      "Options compared against effort and risk",
      "Integration and data requirements identified",
      "Clear scope with what is deliberately excluded",
    ],
  },
  {
    title: "3. Pilot",
    body: "A narrow first build against one workflow, measured against the manual baseline before anything is expanded.",
    points: [
      "One workflow, real data, real users",
      "Human review kept in the loop",
      "Measured against the before state",
    ],
  },
  {
    title: "4. Rollout and handover",
    body: "Once the pilot proves itself, we widen the scope, add monitoring and hand over documentation your team can maintain.",
    points: ["Monitoring and failure alerts", "Documentation and training", "Agreed support model"],
  },
];

function HowItWorksPage() {
  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl sm:text-5xl">
            From business problem to working solution
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            No long discovery phases and no platform commitments. We aim to prove value on one
            workflow before anything is expanded.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {phases.map((phase) => (
            <div key={phase.title} className="rounded-3xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold">{phase.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{phase.body}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                {phase.points.map((point) => (
                  <li key={point}>· {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold">What we won't claim</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            We don't promise guaranteed ROI, "100% automation" or the cheapest price. Automation
            that removes human judgement from the wrong step creates more work than it saves, so we
            keep review steps where they matter and tell you when a problem doesn't need AI at all.
          </p>
        </div>
      </section>

      <CtaBand primaryLabel="Request a Solution Assessment" />
      <div className="h-14" />
    </>
  );
}
