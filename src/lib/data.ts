export const profile = {
  name: "Alex Morgan",
  title: "Full Stack .NET Engineer",
  email: "alex.morgan.dev@example.com",
  linkedin: "https://www.linkedin.com/in/example",
  github: "https://github.com/example",
  location: "United States",
  summary:
    "Full stack engineer with 5+ years building scalable systems across financial and healthcare domains. I design resilient microservices, high-performance APIs, and polished web experiences—backed by strong DevOps practices and a track record of measurable impact.",
  yearsExperience: 5,
  projectsShipped: 24,
  systemsOptimized: 12,
};

export const rotatingSkills = [
  "C# & ASP.NET Core",
  "React & Angular",
  "Azure & AWS",
  "Microservices",
  "Distributed systems",
  "LLM & RAG pipelines",
];

export const skillCategories = [
  {
    name: "Backend",
    items: [
      { name: "C# / .NET", level: 95 },
      { name: "ASP.NET Core", level: 94 },
      { name: "REST / gRPC APIs", level: 92 },
      { name: "Microservices", level: 90 },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", level: 88 },
      { name: "Angular", level: 85 },
      { name: "TypeScript", level: 90 },
      { name: "Performance UX", level: 86 },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "Azure", level: 92 },
      { name: "AWS", level: 85 },
      { name: "Docker / Kubernetes", level: 88 },
      { name: "CI/CD (Azure DevOps)", level: 90 },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "SQL Server", level: 90 },
      { name: "PostgreSQL", level: 82 },
      { name: "Redis / Caching", level: 85 },
      { name: "Event stores", level: 78 },
    ],
  },
  {
    name: "AI / Modern Systems",
    items: [
      { name: "LLM integration", level: 82 },
      { name: "RAG pipelines", level: 80 },
      { name: "OCR pipelines", level: 76 },
      { name: "Observability", level: 88 },
    ],
  },
];

export const experiences = [
  {
    id: "rj",
    company: "Raymond James",
    role: "Full Stack .NET Engineer",
    period: "2022 — Present",
    current: true,
    summary:
      "Leading delivery of secure, high-throughput services for wealth management platforms with strict compliance requirements.",
    achievements: [
      "Cut p95 API latency by ~60% via query tuning, caching, and async processing patterns.",
      "Owned CI/CD hardening across multiple services; reduced failed releases by ~40%.",
      "Partnered with architecture on event-driven boundaries and service decomposition.",
    ],
    tech: [
      "C#",
      "ASP.NET Core",
      "Azure",
      "SQL Server",
      "React",
      "Docker",
      "Kubernetes",
    ],
  },
  {
    id: "wipro",
    company: "Wipro",
    role: "Software Engineer",
    period: "2019 — 2022",
    current: false,
    summary:
      "Built enterprise integrations and customer-facing portals with focus on reliability and maintainability.",
    achievements: [
      "Delivered modular APIs consumed by multiple LOB teams; improved integration test coverage significantly.",
      "Reduced incident MTTR through structured logging, dashboards, and on-call runbooks.",
      "Mentored junior engineers on .NET fundamentals and code review practices.",
    ],
    tech: ["C#", ".NET", "Angular", "SQL Server", "Azure DevOps", "REST"],
  },
];

export const projects = [
  {
    id: "insurance-ai",
    title: "AI Insurance Claims System",
    tagline: "LLM-assisted adjudication with human-in-the-loop controls",
    stack: ["C#", "ASP.NET Core", "Azure", "OpenAI", "PostgreSQL", "React"],
    features: [
      "Document ingestion with OCR normalization and confidence scoring",
      "RAG over policy corpora with citation-backed answers for analysts",
      "Workflow engine for approvals, escalations, and audit trails",
    ],
    metrics: [
      { label: "Review time", value: "-35%", detail: "avg. analyst cycle" },
      { label: "Accuracy lift", value: "+12%", detail: "post QA sampling" },
      { label: "Availability", value: "99.95%", detail: "multi-region" },
    ],
    detail:
      "End-to-end platform combining deterministic rules with retrieval-augmented generation. Emphasis on explainability, PII handling, and cost-aware model routing for production workloads.",
  },
  {
    id: "job-tracker",
    title: "Job Tracker App",
    tagline: "Pipeline visibility for high-volume recruiting workflows",
    stack: ["Next.js", "TypeScript", "ASP.NET Core", "SQL Server", "Azure"],
    features: [
      "Kanban boards with SLA timers and stakeholder notifications",
      "Full-text search across candidates and roles",
      "Role-based access with org-level tenancy",
    ],
    metrics: [
      { label: "User adoption", value: "500+", detail: "weekly actives" },
      { label: "Page load", value: "<1.2s", detail: "LCP p75" },
      { label: "Data sync", value: "<200ms", detail: "p95 mutations" },
    ],
    detail:
      "A pragmatic SaaS-style app focused on speed and clarity. Backend emphasizes clean domain boundaries; frontend leans on optimistic updates and resilient error states.",
  },
  {
    id: "pdf-editor",
    title: "PDF Editor",
    tagline: "In-browser collaboration for regulated document workflows",
    stack: ["Angular", "C#", "Web APIs", "Azure Blob", "SignalR"],
    features: [
      "Layered annotations with version history",
      "Server-side rendering for consistent print output",
      "Real-time co-editing sessions with presence",
    ],
    metrics: [
      { label: "Doc size", value: "200+ MB", detail: "supported uploads" },
      { label: "Concurrent users", value: "50+", detail: "per session peak" },
      { label: "Crash rate", value: "-48%", detail: "after stability sprint" },
    ],
    detail:
      "Heavy focus on memory-safe streaming, progressive loading, and conflict resolution. Integrated with existing identity providers and retention policies.",
  },
];

export const aiHighlights = [
  {
    title: "LLM integration",
    description:
      "Production patterns for prompts, guardrails, streaming responses, and fallback models.",
  },
  {
    title: "RAG pipelines",
    description:
      "Chunking, embeddings, re-ranking, and evaluation loops tuned for domain corpora.",
  },
  {
    title: "OCR pipelines",
    description:
      "Preprocessing, deskew, and confidence thresholds feeding downstream automation.",
  },
];
