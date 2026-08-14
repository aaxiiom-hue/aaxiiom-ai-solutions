import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

interface CtaBandProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
}

export function CtaBand({
  title = "Have a problem that doesn't fit a template?",
  description = "Describe it in your own words. We'll tell you honestly whether AI, automation, better software or a simple process change is the right answer.",
  primaryLabel = "Discuss My Problem",
}: CtaBandProps) {
  return (
    <section className="container-page">
      <div className="rounded-3xl bg-ink px-6 py-12 text-ink-foreground sm:px-12 sm:py-14">
        <h2 className="max-w-2xl text-2xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-sm text-ink-foreground/70 sm:text-base">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/tell-us-your-problem">{primaryLabel}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-ink-foreground/25 bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground sm:w-auto"
          >
            <Link to="/industries">Find an Automation Opportunity</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
