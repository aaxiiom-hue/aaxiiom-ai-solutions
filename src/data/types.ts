export type SolutionCategorySlug =
  | "ai-agents"
  | "automation"
  | "document-ai"
  | "generative-ai"
  | "ml-analytics"
  | "custom-software";

export interface Solution {
  slug: string;
  name: string;
  summary: string;
  howItWorks: string[];
  integrations: string[];
}

export interface SolutionCategory {
  slug: SolutionCategorySlug;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  solutions: Solution[];
}

export interface BusinessProblem {
  slug: string;
  area: string;
  title: string;
  problem: string;
  whyItMatters: string;
  possibleSolution: string;
  category: SolutionCategorySlug;
  solutionSlug: string;
  howItWorks: string[];
  benefits: string[];
  workflow: string[];
  integrations: string[];
}

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  overview: string;
  automationOpportunities: string[];
  problems: BusinessProblem[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  technologies: string[];
  featured?: boolean;
}
