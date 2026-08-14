import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Global scroll choreography:
 *  - a thin progress rail at the very top of the page
 *  - 3D "rise + tilt" reveals for every top-level section and card grid item
 * Purely presentational; respects prefers-reduced-motion.
 */
export function ScrollFx() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let frame = 0;
    let cleanup: (() => void) | undefined;
    // Wait until after hydration so we never mutate DOM React is still matching.
    frame = window.requestAnimationFrame(() => {
      cleanup = setup();
    });

    function setup() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = document.getElementById("scroll-progress-bar");

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let observer: IntersectionObserver | undefined;

    if (!reduce) {
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>("main section, main [data-reveal]"),
      );

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
      );

      targets.forEach((el, index) => {
        el.classList.add("reveal-3d");
        el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
        // Stagger direct children of grids for a deck-of-cards feel.
        const grid = el.querySelector<HTMLElement>("[class*='grid']");
        if (grid) {
          Array.from(grid.children).forEach((child, childIndex) => {
            (child as HTMLElement).style.setProperty(
              "--stagger-delay",
              `${Math.min(childIndex, 8) * 60}ms`,
            );
            (child as HTMLElement).classList.add("reveal-child");
          });
        }
        observer?.observe(el);
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
    };
    }

    return () => {
      window.cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        id="scroll-progress-bar"
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-primary to-accent-foreground"
      />
    </div>
  );
}
