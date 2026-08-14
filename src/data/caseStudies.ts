import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "workflow-automation-platform",
    title: "AI-Powered Workflow Automation Platform",
    industry: "Professional Services",
    problem:
      "Teams were searching across large volumes of unstructured internal documents to complete routine workflows, which made every task slow and inconsistent.",
    solution:
      "A workflow automation platform integrated with an agentic retrieval-augmented generation system, so each workflow step retrieves the right context automatically.",
    outcome:
      "Sub-second contextual search across large unstructured data sets, with workflows completing without manual document hunting.",
    technologies: ["Node.js", "LangChain", "Vector DB", "Elasticsearch"],
    featured: true,
  },
  {
    slug: "real-time-analytics-dashboard",
    title: "Real-Time Analytics & Dashboard",
    industry: "Technology",
    problem:
      "Operational and session data was only visible after the fact, so issues were investigated long after they affected users.",
    solution:
      "A live analytics environment with caching and session tracking, surfacing activity as it happens.",
    outcome: "Sub-second tracking and session analysis available to the team in real time.",
    technologies: ["Redis", "Agora SDK", "Microservices"],
  },
  {
    slug: "agricultural-data-microservices",
    title: "Cloud Microservices for Agricultural Data",
    industry: "Agriculture",
    problem:
      "High-volume field data could not be processed reliably with the existing setup, creating delays and gaps in reporting.",
    solution:
      "A serverless, event-driven architecture processing entries continuously behind secured network boundaries.",
    outcome: "Over one million entries processed per hour with a predictable, scalable cost profile.",
    technologies: ["AWS Lambda", "PostgreSQL", "CI/CD"],
  },
  {
    slug: "multi-agent-chatbot-platform",
    title: "Multi-Agent AI Chatbot Platform",
    industry: "Customer Support",
    problem:
      "A single general-purpose assistant produced unreliable answers across very different types of requests.",
    solution:
      "Specialised agent nodes for copywriting, knowledge retrieval and marketing, each grounded in its own approved sources.",
    outcome: "Support cycles handled without fabricated answers, with clear escalation paths.",
    technologies: ["Python", "LangChain", "OpenAI"],
  },
  {
    slug: "retrieval-knowledge-assistant",
    title: "Retrieval-Augmented Knowledge Assistant",
    industry: "Enterprise",
    problem:
      "Staff could not find answers inside large corporate wikis and compliance handbooks, so questions went to colleagues instead.",
    solution:
      "A private knowledge assistant querying sensitive internal content with full citation mapping.",
    outcome: "Answers delivered with a traceable source for every claim, inside existing access rules.",
    technologies: ["Pinecone", "FastAPI", "Python"],
  },
  {
    slug: "seo-audit-analysis",
    title: "AI SEO Audit & Website Analysis",
    industry: "Marketing & Advertising",
    problem:
      "Site audits were manual, inconsistent and too slow to run regularly across many client websites.",
    solution:
      "Autonomous crawlers surfacing accessibility and performance bottlenecks, with model-generated remediation guidance.",
    outcome: "Repeatable audits across sites with prioritised, actionable fixes.",
    technologies: ["Puppeteer", "LLMs", "Node.js"],
  },
  {
    slug: "market-intelligence-tools",
    title: "Competitor & Market Intelligence Tools",
    industry: "Professional Services",
    problem:
      "Market and competitor tracking depended on ad hoc manual research that was never current.",
    solution:
      "Automated aggregation pipelines producing daily executive briefings on market movements.",
    outcome: "A consistent daily intelligence feed replacing occasional manual research.",
    technologies: ["Python", "Data Scraping", "LLMs"],
  },
  {
    slug: "content-marketing-automation",
    title: "AI Content & Marketing Automation",
    industry: "Marketing & Advertising",
    problem:
      "Content volume requirements outpaced what the in-house team could produce while staying on brand.",
    solution:
      "A programmatic content platform generating targeted content in the brand's tone, integrated directly with the CMS.",
    outcome: "High-volume publishing with brand consistency and human approval retained.",
    technologies: ["GPT-4", "Supabase", "React"],
  },
  {
    slug: "lead-generation-engine",
    title: "AI-Powered Lead Generation Engine",
    industry: "Sales",
    problem: "Prospect research was manual and produced inconsistent, poorly qualified lists.",
    solution: "Data pipelines building B2B prospect pools with AI enrichment and filtering.",
    outcome: "Higher-fidelity prospect lists delivered continuously instead of per campaign.",
    technologies: ["Node.js", "Enrichment APIs", "PostgreSQL"],
  },
  {
    slug: "document-processing-reports",
    title: "Document Processing & Report Synthesis",
    industry: "Finance & Accounting",
    problem:
      "Messy invoice PDFs, scanned images and non-standard receipts had to be read and re-keyed by staff.",
    solution:
      "Vision-based extraction combined with model interpretation to produce validated, structured records.",
    outcome: "Unstructured document piles converted into clean, validated data ready for downstream systems.",
    technologies: ["Vision AI", "OCR", "AWS S3", "Python"],
  },
  {
    slug: "agency-workflow-automation",
    title: "AI Workflow Automation for Agencies",
    industry: "Professional Services",
    problem:
      "Agency operations were split across Slack, Jira and CRM, with staff manually moving information between them.",
    solution:
      "Internal automation connecting those systems through custom workflows and asynchronous webhooks.",
    outcome: "Fewer manual handoffs and consistent status across tools.",
    technologies: ["n8n", "Webhooks", "REST APIs"],
  },
];
