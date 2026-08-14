import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { industries } from "@/data/catalogue";
import { readChatHandoff, submitInquiry, type ChatHandoffContext } from "@/lib/inquiries";

interface ProblemSearch {
  problem?: string;
  industry?: string;
}

export const Route = createFileRoute("/tell-us-your-problem")({
  validateSearch: (search: Record<string, unknown>): ProblemSearch => ({
    ...(typeof search['problem'] === "string" ? { problem: search['problem'] } : {}),
    ...(typeof search['industry'] === "string" ? { industry: search['industry'] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Tell Us Your Problem — Aaxiiom Solution Assessment" },
      {
        name: "description",
        content:
          "Describe your business problem in a couple of minutes. We'll review whether AI, automation, analytics or custom software is the practical answer.",
      },
      { property: "og:title", content: "Tell Us Your Problem — Aaxiiom Solution Assessment" },
      {
        property: "og:description",
        content: "A short form, no account needed. We reply with an honest assessment.",
      },
    ],
  }),
  component: TellUsYourProblem,
});

function TellUsYourProblem() {
  const search = Route.useSearch();
  const [handoff, setHandoff] = useState<ChatHandoffContext | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [problem, setProblem] = useState(search.problem ?? "");
  const [industry, setIndustry] = useState(search.industry ?? "");

  useEffect(() => {
    const stored = readChatHandoff();
    if (stored) {
      setHandoff(stored);
      setProblem((current) => current || stored.problem);
    }
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();

    if (!name || !problem.trim()) {
      toast.error("Please add your name and a short description of the problem.");
      return;
    }
    if (!email && !phone) {
      toast.error("Please leave an email or a phone number so we can reply.");
      return;
    }

    setSubmitting(true);
    try {
      await submitInquiry({
        name,
        business_name: String(form.get("business") ?? ""),
        industry,
        email,
        phone,
        problem_description: problem,
        current_process: String(form.get("process") ?? ""),
        team_size: String(form.get("team") ?? ""),
        preferred_contact: String(form.get("contact") ?? ""),
        source: handoff ? "chatbot" : "form",
        chat_summary: handoff ? `${handoff.summary}\n\n${handoff.transcript}` : "",
        suggested_solution: handoff?.suggestedSolution ?? "",
      });
      setDone(true);
    } catch {
      toast.error("We couldn't send that. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 text-2xl">Thanks — we have your problem</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We'll review it and come back with an honest assessment of whether AI, automation,
            analytics or plain software is the right fit.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl sm:text-5xl">Tell us your problem</h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            No account, no long form. Describe what's slowing your business down and we'll tell you
            whether there's a practical AI or automation opportunity in it.
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-5">
          {handoff ? (
            <div className="rounded-2xl border border-border bg-accent/50 p-4 text-sm">
              <p className="font-semibold">Your AI Consultant conversation will be attached</p>
              {handoff.suggestedSolution ? (
                <p className="mt-1 text-muted-foreground">
                  Suggested direction: {handoff.suggestedSolution}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name *</Label>
              <Input id="name" name="name" required className="h-12" autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business">Business name</Label>
              <Input id="business" name="business" className="h-12" autoComplete="organization" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <select
              id="industry"
              name="industry"
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="h-12 w-full rounded-lg border border-input bg-background px-3 text-base"
            >
              <option value="">Select an industry</option>
              {industries.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.name}
                </option>
              ))}
              <option value="Other">Other / not listed</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" className="h-12" autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input id="phone" name="phone" type="tel" className="h-12" autoComplete="tel" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem">What problem are you facing? *</Label>
            <Textarea
              id="problem"
              name="problem"
              required
              rows={5}
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
              placeholder="For example: our team answers the same customer questions on WhatsApp all day."
              className="text-base"
            />
          </div>

          <details className="rounded-2xl border border-border bg-card p-4">
            <summary className="cursor-pointer text-sm font-semibold">
              Optional details (helps us respond faster)
            </summary>
            <div className="mt-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="process">How do you handle this today?</Label>
                <Textarea id="process" name="process" rows={3} className="text-base" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="team">Approximate team size</Label>
                  <Input id="team" name="team" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Preferred contact method</Label>
                  <Input id="contact" name="contact" className="h-12" placeholder="Email, call, WhatsApp" />
                </div>
              </div>
            </div>
          </details>

          <Button type="submit" size="lg" className="w-full text-base" disabled={submitting}>
            {submitting ? "Sending…" : "Send My Problem"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            We only use this to reply about your enquiry.
          </p>
        </form>
      </section>
    </>
  );
}
