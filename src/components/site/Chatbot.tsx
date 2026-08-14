import { Link } from "@tanstack/react-router";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storeChatHandoff } from "@/lib/inquiries";

interface ChatLink {
  label: string;
  to: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  links?: ChatLink[] | undefined;
  fallback?: boolean | undefined;
}

const openers = [
  "We get too many repetitive customer questions",
  "Our leads are not followed up properly",
  "We spend hours preparing reports",
];

const greeting: Message = {
  role: "assistant",
  content:
    "Hi — I'm the Aaxiiom AI Consultant. Tell me what industry you're in and what's slowing your business down, and I'll look for a practical AI or automation option.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [suggested, setSuggested] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const firstProblem = messages.find((message) => message.role === "user")?.content ?? "";

  const handoff = () => {
    storeChatHandoff({
      problem: firstProblem,
      summary,
      suggestedSolution: suggested,
      transcript: messages
        .map((message) => `${message.role === "user" ? "You" : "Aaxiiom"}: ${message.content}`)
        .join("\n"),
    });
    setOpen(false);
  };

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await response.json()) as {
        message?: string;
        links?: ChatLink[];
        fallback?: boolean;
        summary?: string;
        suggestedSolution?: string;
        error?: string;
      };

      if (!response.ok) {
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              data.error ??
              "Something went wrong on my side. You can still send your problem to the team.",
            fallback: true,
          },
        ]);
        return;
      }

      if (data.summary) setSummary(data.summary);
      if (data.suggestedSolution) setSuggested(data.suggestedSolution);
      setMessages([
        ...next,
        {
          role: "assistant",
          content: data.message ?? "",
          links: data.links ?? [],
          fallback: data.fallback,
        },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "I couldn't reach the consultant service. Please send your problem to the team.",
          fallback: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03] sm:bottom-6 sm:right-6"
        aria-label="Open the AI Consultant"
      >
        <MessageSquare className="h-5 w-5" />
        AI Consultant
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-end bg-ink/40 p-0 backdrop-blur-sm sm:p-6">
          <div className="flex h-[100dvh] w-full flex-col bg-card shadow-[var(--shadow-lift)] sm:h-[min(38rem,85vh)] sm:w-[26rem] sm:rounded-3xl sm:border sm:border-border">
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Aaxiiom AI Consultant</p>
                  <p className="text-xs text-muted-foreground">Problem discovery, not sales talk</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the AI Consultant"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                    {message.role === "assistant" &&
                    ((message.links && message.links.length > 0) || message.fallback) ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.links?.map((link) => (
                          <Link
                            key={link.to + link.label}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className="rounded-full bg-background px-3 py-1.5 text-xs font-semibold text-primary"
                          >
                            {link.label}
                          </Link>
                        ))}
                        <Link
                          to="/tell-us-your-problem"
                          onClick={handoff}
                          className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                        >
                          {message.fallback ? "Send Inquiry" : "Discuss This With Aaxiiom"}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {messages.length === 1 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {openers.map((opener) => (
                    <button
                      key={opener}
                      type="button"
                      onClick={() => void send(opener)}
                      className="rounded-full border border-border px-3 py-2 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
                    >
                      {opener}
                    </button>
                  ))}
                </div>
              ) : null}

              {loading ? (
                <p className="text-xs text-muted-foreground">Consultant is thinking…</p>
              ) : null}
            </div>

            <form
              className="flex items-center gap-2 border-t border-border p-3"
              onSubmit={(event) => {
                event.preventDefault();
                void send(input);
              }}
            >
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Describe your business problem…"
                className="h-12 text-base"
                aria-label="Message the AI Consultant"
              />
              <Button type="submit" size="icon" className="h-12 w-12 shrink-0" disabled={loading}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
