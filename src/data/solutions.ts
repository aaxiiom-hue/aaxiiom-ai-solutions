import type { SolutionCategory } from "./types";

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "ai-agents",
    name: "AI Agents",
    tagline: "Assistants that handle conversations and repetitive requests",
    description:
      "Conversational agents that answer questions, qualify enquiries and hand complex cases to your team, using your own content and rules.",
    icon: "Bot",
    solutions: [
      {
        slug: "customer-support-agent",
        name: "Customer Support Agent",
        summary:
          "Answers repetitive customer questions across web chat, WhatsApp or email, and escalates anything unusual.",
        howItWorks: [
          "Your FAQs, policies and product data are indexed as a knowledge base",
          "The agent answers only from approved content",
          "Unclear or sensitive requests are routed to a human",
        ],
        integrations: ["WhatsApp Business", "Website chat", "Gmail / Outlook", "Zendesk", "CRM"],
      },
      {
        slug: "sales-lead-agent",
        name: "Sales / Lead Agent",
        summary:
          "Engages new enquiries within seconds, asks qualifying questions and books the right ones into your calendar.",
        howItWorks: [
          "Captures enquiries from forms, ads, WhatsApp or email",
          "Asks your qualification questions and scores intent",
          "Writes the result into your CRM and notifies the owner",
        ],
        integrations: ["HubSpot", "Zoho", "Pipedrive", "Google Calendar", "WhatsApp"],
      },
      {
        slug: "voice-agent",
        name: "Voice Agent",
        summary:
          "Handles inbound or outbound calls for bookings, reminders, order status and simple triage.",
        howItWorks: [
          "Speech is transcribed in real time",
          "The agent follows a scripted but natural conversation flow",
          "Call summaries and outcomes are logged automatically",
        ],
        integrations: ["Twilio", "Telephony / PBX", "Booking systems", "CRM"],
      },
      {
        slug: "internal-knowledge-agent",
        name: "Internal Knowledge Agent",
        summary:
          "Lets staff ask questions about SOPs, policies and product documentation and get cited answers.",
        howItWorks: [
          "Internal documents are indexed with access control",
          "Answers include citations back to the source document",
          "Gaps in documentation are reported back to you",
        ],
        integrations: ["SharePoint", "Google Drive", "Notion", "Confluence", "Slack"],
      },
      {
        slug: "ai-assistant",
        name: "AI Assistant",
        summary:
          "A task-focused assistant embedded in your tools to draft, summarise and prepare work for review.",
        howItWorks: [
          "Connects to the systems your team already uses",
          "Drafts replies, notes and summaries",
          "A human always approves before anything is sent",
        ],
        integrations: ["Slack", "Microsoft Teams", "Email", "Internal tools"],
      },
    ],
  },
  {
    slug: "automation",
    name: "Automation",
    tagline: "Remove manual steps between the systems you already use",
    description:
      "Workflow automation that moves data, triggers follow-ups and produces routine output without anyone copying and pasting.",
    icon: "Workflow",
    solutions: [
      {
        slug: "workflow-automation",
        name: "Workflow Automation",
        summary: "Connects tools so a trigger in one system produces the right action in another.",
        howItWorks: [
          "We map the current process step by step",
          "Rules and exceptions are agreed with your team",
          "The workflow runs with logging and failure alerts",
        ],
        integrations: ["n8n", "Zapier", "Make", "REST APIs", "Webhooks"],
      },
      {
        slug: "email-automation",
        name: "Email Automation",
        summary: "Sorts, routes, drafts and follows up on high-volume email traffic.",
        howItWorks: [
          "Incoming mail is classified by intent",
          "Routine replies are drafted from templates plus context",
          "Follow-up sequences run until a reply is received",
        ],
        integrations: ["Gmail", "Outlook", "IMAP", "CRM"],
      },
      {
        slug: "whatsapp-automation",
        name: "WhatsApp Automation",
        summary: "Handles enquiries, order updates and reminders on the channel customers actually use.",
        howItWorks: [
          "Connects to the WhatsApp Business API",
          "Handles common flows automatically",
          "Hands over to a human inbox when needed",
        ],
        integrations: ["WhatsApp Business API", "Twilio", "CRM", "Order systems"],
      },
      {
        slug: "crm-automation",
        name: "CRM Automation",
        summary: "Keeps records complete and follow-ups consistent without manual data entry.",
        howItWorks: [
          "Leads are captured and de-duplicated automatically",
          "Activities and notes are logged from calls and messages",
          "Stale opportunities trigger reminders",
        ],
        integrations: ["HubSpot", "Zoho", "Salesforce", "Pipedrive"],
      },
      {
        slug: "reporting-automation",
        name: "Reporting Automation",
        summary: "Assembles recurring reports from your systems and delivers them on schedule.",
        howItWorks: [
          "Data is pulled from source systems on a schedule",
          "Metrics are calculated with agreed definitions",
          "Reports are delivered as dashboards, PDF or email digests",
        ],
        integrations: ["PostgreSQL", "MySQL", "Google Sheets", "Power BI", "Metabase"],
      },
    ],
  },
  {
    slug: "document-ai",
    name: "Document AI",
    tagline: "Turn paperwork into structured, usable data",
    description:
      "Extraction and classification pipelines for invoices, forms, contracts and scanned documents, with validation before anything is trusted.",
    icon: "FileText",
    solutions: [
      {
        slug: "ocr",
        name: "OCR",
        summary: "Reads scanned or photographed documents, including poor-quality images.",
        howItWorks: [
          "Documents are pre-processed and read",
          "Confidence scores flag uncertain fields",
          "Low-confidence items go to human review",
        ],
        integrations: ["AWS S3", "Google Drive", "Scanners", "Email inboxes"],
      },
      {
        slug: "document-extraction",
        name: "Document Extraction",
        summary: "Converts unstructured documents into validated, structured records.",
        howItWorks: [
          "Field templates are defined per document type",
          "Extracted values are validated against business rules",
          "Clean records are written into your systems",
        ],
        integrations: ["ERP", "Accounting software", "Databases", "APIs"],
      },
      {
        slug: "document-classification",
        name: "Classification",
        summary: "Sorts incoming documents by type, department or priority.",
        howItWorks: [
          "Documents are classified on arrival",
          "Routing rules send them to the right queue",
          "Unclassifiable items are escalated",
        ],
        integrations: ["Email", "Document management systems", "Storage buckets"],
      },
      {
        slug: "summarization",
        name: "Summarization",
        summary: "Produces short, reviewable summaries of long documents and threads.",
        howItWorks: [
          "Long documents are chunked and summarised",
          "Key clauses or figures are highlighted",
          "Summaries link back to the source text",
        ],
        integrations: ["Google Drive", "SharePoint", "Email", "Internal tools"],
      },
      {
        slug: "invoice-processing",
        name: "Invoice Processing",
        summary: "Captures invoice data, matches it to purchase orders and prepares it for approval.",
        howItWorks: [
          "Invoices arrive by email or upload",
          "Line items and totals are extracted and checked",
          "Exceptions are queued for a finance reviewer",
        ],
        integrations: ["Xero", "QuickBooks", "Tally", "ERP", "Accounts payable"],
      },
    ],
  },
  {
    slug: "generative-ai",
    name: "Generative AI",
    tagline: "Grounded assistants and content built on your own knowledge",
    description:
      "Retrieval-based systems that answer from your data with citations, plus content tooling that keeps your tone and standards.",
    icon: "Sparkles",
    solutions: [
      {
        slug: "rag-systems",
        name: "RAG Systems",
        summary: "Retrieval-augmented generation so answers are grounded in your documents, not guesswork.",
        howItWorks: [
          "Your content is chunked and embedded into a vector index",
          "Relevant passages are retrieved for every question",
          "The model answers only from retrieved context, with citations",
        ],
        integrations: ["Vector databases", "PostgreSQL / pgvector", "S3", "SharePoint"],
      },
      {
        slug: "knowledge-assistants",
        name: "Knowledge Assistants",
        summary: "A searchable, conversational layer over scattered internal knowledge.",
        howItWorks: [
          "Sources are connected and permissions respected",
          "Staff ask questions in plain language",
          "Answers cite the source and version",
        ],
        integrations: ["Notion", "Confluence", "Google Drive", "Slack"],
      },
      {
        slug: "content-generation",
        name: "Content Generation",
        summary: "Drafts product copy, descriptions and campaign variants at volume, for human approval.",
        howItWorks: [
          "Brand tone and constraints are captured as guidelines",
          "Drafts are generated per product or segment",
          "Everything is reviewed before publishing",
        ],
        integrations: ["CMS", "Shopify", "WooCommerce", "Marketing tools"],
      },
      {
        slug: "internal-copilots",
        name: "Internal Copilots",
        summary: "Role-specific copilots that speed up repetitive knowledge work.",
        howItWorks: [
          "A workflow is chosen with a clear before/after",
          "The copilot is embedded where the work happens",
          "Usage is measured against the manual baseline",
        ],
        integrations: ["Internal apps", "CRM", "Helpdesk", "Spreadsheets"],
      },
    ],
  },
  {
    slug: "ml-analytics",
    name: "Machine Learning & Analytics",
    tagline: "Use your historical data to plan ahead",
    description:
      "Forecasting, recommendation and anomaly detection models built on your operational history, with honest accuracy reporting.",
    icon: "LineChart",
    solutions: [
      {
        slug: "forecasting",
        name: "Forecasting",
        summary: "Demand, stock and revenue forecasts based on your own history and seasonality.",
        howItWorks: [
          "Historical data is cleaned and validated",
          "Models are backtested against past periods",
          "Forecasts ship with confidence ranges, not false certainty",
        ],
        integrations: ["ERP", "POS", "Data warehouse", "Spreadsheets"],
      },
      {
        slug: "recommendation-systems",
        name: "Recommendation Systems",
        summary: "Suggests relevant products or next actions based on behaviour patterns.",
        howItWorks: [
          "Behaviour and catalogue data are combined",
          "Recommendations are served through an API",
          "Results are A/B tested before full rollout",
        ],
        integrations: ["E-commerce platforms", "CDP", "Analytics"],
      },
      {
        slug: "anomaly-detection",
        name: "Anomaly Detection",
        summary: "Flags unusual transactions, usage or machine behaviour early.",
        howItWorks: [
          "Normal behaviour is learned from history",
          "Deviations raise ranked alerts",
          "Feedback from your team reduces false positives",
        ],
        integrations: ["Payment systems", "IoT / sensors", "Log pipelines"],
      },
      {
        slug: "predictive-analytics",
        name: "Predictive Analytics",
        summary: "Scores likelihood of churn, conversion, delay or failure so teams can act first.",
        howItWorks: [
          "Target outcomes are defined with your team",
          "Models are evaluated on held-out data",
          "Scores are surfaced inside existing tools",
        ],
        integrations: ["CRM", "Data warehouse", "Dashboards"],
      },
    ],
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    tagline: "When the right answer is a well-built tool",
    description:
      "Sometimes a problem does not need AI. Web apps, mobile apps, dashboards and internal tools built around how you actually work.",
    icon: "Layers",
    solutions: [
      {
        slug: "web-applications",
        name: "Web Applications",
        summary: "Customer or staff-facing web products built for reliability and speed.",
        howItWorks: [
          "Scope is cut to what earns its keep",
          "Delivered in short, reviewable increments",
          "Handed over with documentation and monitoring",
        ],
        integrations: ["React", "FastAPI", "Node.js", "PostgreSQL"],
      },
      {
        slug: "mobile-applications",
        name: "Mobile Applications",
        summary: "Cross-platform apps for field teams, customers and operations.",
        howItWorks: [
          "Offline and connectivity constraints considered up front",
          "One codebase for iOS and Android",
          "Store submission and release support",
        ],
        integrations: ["Flutter", "Firebase", "REST APIs", "Push notifications"],
      },
      {
        slug: "dashboards",
        name: "Dashboards",
        summary: "One place to see the numbers that drive decisions, updated automatically.",
        howItWorks: [
          "Metric definitions agreed once",
          "Data pipelines feed the dashboard on schedule",
          "Role-based views for each team",
        ],
        integrations: ["PostgreSQL", "BigQuery", "Metabase", "Power BI"],
      },
      {
        slug: "internal-business-tools",
        name: "Internal Business Tools",
        summary: "Replaces fragile spreadsheets with tools your team can trust.",
        howItWorks: [
          "Existing spreadsheets are audited",
          "Rules and validation are moved into the tool",
          "Access, audit trail and exports included",
        ],
        integrations: ["Google Sheets", "Databases", "SSO", "Existing ERP"],
      },
    ],
  },
];
