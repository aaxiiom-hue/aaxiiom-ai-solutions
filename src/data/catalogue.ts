import { caseStudies } from "./caseStudies";
import { industries } from "./industries";
import { solutionCategories } from "./solutions";
import type { BusinessProblem, Industry, Solution, SolutionCategory } from "./types";

export { industries, solutionCategories, caseStudies };
export type * from "./types";

export const getIndustry = (slug: string): Industry | undefined =>
  industries.find((industry) => industry.slug === slug);

export const getCategory = (slug: string): SolutionCategory | undefined =>
  solutionCategories.find((category) => category.slug === slug);

export const getSolution = (
  categorySlug: string,
  solutionSlug: string,
): Solution | undefined =>
  getCategory(categorySlug)?.solutions.find((solution) => solution.slug === solutionSlug);

export const allProblems: Array<BusinessProblem & { industrySlug: string; industryName: string }> =
  industries.flatMap((industry) =>
    industry.problems.map((problem) => ({
      ...problem,
      industrySlug: industry.slug,
      industryName: industry.name,
    })),
  );

export const problemsForCategory = (categorySlug: string) =>
  allProblems.filter((problem) => problem.category === categorySlug);

/** Compact catalogue description used to ground the AI consultant. */
export const catalogueSummary = () =>
  industries
    .map(
      (industry) =>
        `INDUSTRY: ${industry.name} (/industries/${industry.slug})\n` +
        industry.problems
          .map(
            (problem) =>
              `  - PROBLEM: ${problem.title} [${problem.area}] -> ${problem.possibleSolution} (category: ${problem.category}, link: /industries/${industry.slug}#${problem.slug})`,
          )
          .join("\n"),
    )
    .join("\n");

export const solutionSummary = () =>
  solutionCategories
    .map(
      (category) =>
        `CATEGORY: ${category.name} (/solutions/${category.slug}) - ${category.solutions
          .map((solution) => solution.name)
          .join(", ")}`,
    )
    .join("\n");
