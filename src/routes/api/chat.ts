import { createFileRoute } from "@tanstack/react-router";

import { catalogueSummary, solutionSummary } from "@/data/catalogue";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const systemPrompt = () => `You are the Aaxiiom AI Consultant — an AI and automation solution consultant, not a generic FAQ bot.

Your job: understand a business owner's problem and map it to a solution that exists in the Aaxiiom catalogue below. You never invent solutions, capabilities, prices, timelines or results.

CONSULTING BEHAVIOUR
- Ask short, focused questions one or two at a time: industry, the problem, how it is handled today, how often it happens, how many people are involved, what they would like to improve.
- Keep answers short and plain. No jargon, no hype. Never promise ROI, guaranteed savings, "100% automation" or "cheapest".
- Always phrase recommendations as a "potential AI/automation solution". Some problems are better solved with normal software or process changes — say so when that is true.

CATALOGUE (the only solutions you may recommend)
${catalogueSummary()}

SOLUTION CATEGORIES
${solutionSummary()}

FALLBACK RULE (critical)
If the user's problem is not clearly represented in the catalogue, do NOT invent a solution. Reply with:
"I don't currently have a predefined solution for this exact problem, but it may be possible to improve this workflow using AI, automation, analytics, or custom software. Our team can review your specific situation."
and set "fallback": true.

RESPONSE FORMAT
Reply with raw JSON only (no markdown fences), shaped exactly:
{
  "message": "your reply text",
  "links": [{"label": "View Suggested Solution", "to": "/industries/retail#..." }],
  "fallback": false,
  "summary": "one-line summary of the user's problem so far",
  "suggestedSolution": "name of the catalogue solution, or empty string"
}
Only use "to" values that appear in the catalogue above, or "/tell-us-your-problem". Use at most 2 links. Leave links empty while you are still asking questions.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-16) : [];
        if (messages.length === 0) {
          return Response.json({ error: "Messages are required" }, { status: 400 });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json({ error: "AI is not configured" }, { status: 500 });
        }

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
          },
          body: JSON.stringify({
            model: "google/gemini-3.5-flash",
            messages: [{ role: "system", content: systemPrompt() }, ...messages],
          }),
        });

        if (response.status === 429) {
          return Response.json(
            { error: "The consultant is busy right now. Please try again in a moment." },
            { status: 429 },
          );
        }
        if (response.status === 402) {
          return Response.json(
            { error: "The AI consultant is temporarily unavailable. Please send us your problem instead." },
            { status: 402 },
          );
        }
        if (!response.ok) {
          return Response.json({ error: "The consultant could not respond." }, { status: 502 });
        }

        const data = (await response.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const raw = data.choices?.[0]?.message?.content ?? "";
        const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();

        try {
          const parsed = JSON.parse(cleaned);
          return Response.json({
            message: String(parsed.message ?? ""),
            links: Array.isArray(parsed.links) ? parsed.links.slice(0, 2) : [],
            fallback: Boolean(parsed.fallback),
            summary: String(parsed.summary ?? ""),
            suggestedSolution: String(parsed.suggestedSolution ?? ""),
          });
        } catch {
          return Response.json({
            message: cleaned || "Could you tell me a little more about the problem?",
            links: [],
            fallback: false,
            summary: "",
            suggestedSolution: "",
          });
        }
      },
    },
  },
});
