import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Global scroll choreography:
 *  - a thin progress rail at the very top of the page
 *  - 3D "rise + tilt" reveals for every top-level section and card grid item
 *  - subtle parallax depth driven by a single rAF loop (60fps friendly)
 * Purely presentational; respects prefers-reduced-motion.
 */
export function ScrollFx() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    // Wait until hydration has fully settled so we never mutate DOM React is still matching.
    const timer = window.setTimeout(() => {
      cleanup = setup();
    }, 150);

    function setup() {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bar = document.getElementById("scroll-progress-bar");

      let ticking = false;
      let parallaxTargets: HTMLElement[] = [];

      const render = () => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;

        if (reduce) return;
        const vh = window.innerHeight;
        for (const el of parallaxTargets) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) continue;
          // -1 (below fold) .. 1 (above fold)
          const t = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
          const clamped = Math.max(-1, Math.min(1, t));
          el.style.setProperty("--parallax-y", `${(clamped * -14).toFixed(2)}px`);
          el.style.setProperty("--parallax-tilt", `${(clamped * 2.2).toFixed(2)}deg`);
          el.style.setProperty("--parallax-z", `${(-Math.abs(clamped) * 40).toFixed(2)}px`);
        }
      };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(render);
      };

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
          el.classList.add("reveal-3d", "snap-section");
          el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
          // Stagger direct children of grids for a deck-of-cards feel.
          const grid = el.querySelector<HTMLElement>("[class*='grid']");
          if (grid) {
            Array.from(grid.children).forEach((child, childIndex) => {
              const node = child as HTMLElement;
              node.style.setProperty("--stagger-delay", `${Math.min(childIndex, 8) * 60}ms`);
              node.classList.add("reveal-child", "depth-card");
              parallaxTargets.push(node);
            });
          }
          observer?.observe(el);
        });
      }

      render();

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        observer?.disconnect();
        parallaxTargets = [];
      };
    }

    return () => {
      window.clearTimeout(timer);
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
