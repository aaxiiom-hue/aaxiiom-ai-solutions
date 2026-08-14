import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

export function PageNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const index = order.findIndex((item) => item.to === baseOf(pathname));
  if (index === -1) return null;

  const prev = order[index - 1];
  const next = order[index + 1];
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Page navigation"
      className="container-page grid gap-3 py-10 sm:grid-cols-2"
      data-reveal
    >
      {prev ? (
        <Link
          to={prev.to}
          className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
        >
          <ArrowLeft className="h-4 w-4 text-primary transition-transform group-hover:-translate-x-1" />
          <span>
            <span className="block text-xs uppercase tracking-widest text-muted-foreground">
              Previous
            </span>
            <span className="block text-sm font-semibold">{prev.label}</span>
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      {next ? (
        <Link
          to={next.to}
          className="group flex items-center justify-end gap-3 rounded-2xl border border-border bg-card p-4 text-right transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
        >
          <span>
            <span className="block text-xs uppercase tracking-widest text-muted-foreground">
              Next
            </span>
            <span className="block text-sm font-semibold">{next.label}</span>
          </span>
          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </nav>
  );
}
