import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const order = [
  { to: "/", label: "Home" },
  { to: "/industries", label: "Industries" },
  { to: "/solutions", label: "Solutions" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/tell-us-your-problem", label: "Tell Us Your Problem" },
] as const;

function baseOf(pathname: string) {
  if (pathname === "/") return "/";
  const segment = `/${pathname.split("/").filter(Boolean)[0] ?? ""}`;
  return segment;
}

const cardBase =
  "group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all";
const cardEnabled =
  "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]";
const cardDisabled = "cursor-not-allowed opacity-45";

export function PageNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const index = order.findIndex((item) => item.to === baseOf(pathname));
  if (index === -1) return null;

  const prev = order[index - 1];
  const next = order[index + 1];

  return (
    <nav aria-label="Page navigation" className="container-page py-10" data-reveal>
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link to={prev.to} className={cn(cardBase, cardEnabled)}>
            <ArrowLeft className="h-4 w-4 text-primary transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                Previous
              </span>
              <span className="block text-sm font-semibold">{prev.label}</span>
            </span>
          </Link>
        ) : (
          <div aria-disabled className={cn(cardBase, cardDisabled)}>
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
            <span>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                Previous
              </span>
              <span className="block text-sm font-semibold">Start of journey</span>
            </span>
          </div>
        )}

        {next ? (
          <Link to={next.to} className={cn(cardBase, cardEnabled, "justify-end text-right")}>
            <span>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                Next
              </span>
              <span className="block text-sm font-semibold">{next.label}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div aria-disabled className={cn(cardBase, cardDisabled, "justify-end text-right")}>
            <span>
              <span className="block text-xs uppercase tracking-widest text-muted-foreground">
                Next
              </span>
              <span className="block text-sm font-semibold">End of journey</span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      <ol className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {order.map((item, i) => {
          const state = i === index ? "current" : i < index ? "done" : "todo";
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-label={`Step ${i + 1} of ${order.length}: ${item.label}`}
                aria-current={state === "current" ? "page" : undefined}
                className="group/dot flex items-center gap-2"
              >
                <span
                  className={cn(
                    "block h-2 w-2 rounded-full transition-all duration-300",
                    state === "current" && "h-2.5 w-7 bg-primary shadow-[var(--shadow-glow)]",
                    state === "done" && "bg-primary/45 group-hover/dot:bg-primary",
                    state === "todo" && "bg-border group-hover/dot:bg-primary/50",
                  )}
                />
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-widest",
                    state === "current" ? "text-foreground" : "hidden sm:inline text-muted-foreground/60",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Step {index + 1} of {order.length}
      </p>
    </nav>
  );
}
