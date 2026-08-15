import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { CondensedToggle } from "@/components/site/CondensedToggle";
import { Button } from "@/components/ui/button";


const navItems = [
  { to: "/", label: "Home" },
  { to: "/industries", label: "Industries" },
  { to: "/solutions", label: "Solutions" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
          Aaxiiom<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <CondensedToggle />
          <Button asChild>
            <Link to="/tell-us-your-problem">Tell Us Your Problem</Link>
          </Button>
        </div>


        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="lg" className="my-3">
              <Link to="/tell-us-your-problem" onClick={() => setOpen(false)}>
                Tell Us Your Problem
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
