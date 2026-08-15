import { Maximize2, Minimize2 } from "lucide-react";

import { useCondensed } from "@/hooks/use-condensed";
import { cn } from "@/lib/utils";

export function CondensedToggle({ className }: { className?: string }) {
  const { condensed, toggle } = useCondensed();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={condensed}
      title={condensed ? "Show full detail" : "Condense long text"}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground",
        condensed && "border-primary/40 text-primary",
        className,
      )}
    >
      {condensed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
      {condensed ? "Full view" : "Condensed"}
    </button>
  );
}
