import { Link } from "@tanstack/react-router";

import { industries } from "@/data/catalogue";

const technologies = [
  "Python",
  "FastAPI",
  "React",
  "Node.js",
  "OpenAI APIs",
  "LangChain",
  "PostgreSQL",
  "Vector Databases",
  "n8n",
  "Docker",
  "AWS",
  "Flutter",
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-extrabold">
              Aaxiiom<span className="text-primary">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              We identify where AI and automation can solve meaningful business problems — and
              build only what earns its place.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/industries" className="hover:text-foreground">
                  Industries
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-foreground">
                  Solutions
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-foreground">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/tell-us-your-problem" className="hover:text-foreground">
                  Tell Us Your Problem
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Popular industries</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-muted-foreground">
              {industries.slice(0, 8).map((industry) => (
                <li key={industry.slug}>
                  <Link
                    to="/industries/$industrySlug"
                    params={{ industrySlug: industry.slug }}
                    className="hover:text-foreground"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Technology we build with
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aaxiiom. Practical AI, automation and software for real
            business problems.
          </p>
        </div>
      </div>
    </footer>
  );
}
