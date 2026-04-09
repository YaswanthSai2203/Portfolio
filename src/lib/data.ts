export const profile = {
  /** Hero, header, footer, tab title (layout), resume download filename */
  name: "Sai Satish Sreerama",
  title: "Full Stack .NET Engineer",
  email: "saisatishsreerama@gmail.com",
  linkedin: "https://www.linkedin.com/in/saisatish-sreerama/",
  github: "https://github.com/YaswanthSai2203",
  location: "United States",
  summary:
    "I build systems that think and scale—engineering resilient microservices, high-performance APIs, and AI-driven workflows across financial and healthcare domains. Passionate about turning complex problems into reliable, real-world impact.",
  yearsExperience: 5,
  projectsShipped: 24,
  systemsOptimized: 15,
};

export const rotatingSkills = [
  "C# & ASP.NET Core",
  "React & Angular",
  "Azure & AWS",
  "Microservices Architecture",
  "Distributed Systems",
  "LLM & RAG Pipelines",
];

export const skillCategories = [
  {
    name: "Backend",
    items: [
      { name: "C# / .NET", level: 95 },
      { name: "ASP.NET Core", level: 94 },
      { name: "REST APIs", level: 92 },
      { name: "Microservices", level: 92 },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", level: 88 },
      { name: "Angular", level: 86 },
      { name: "TypeScript", level: 90 },
      { name: "UX Performance", level: 87 },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "Azure", level: 93 },
      { name: "AWS", level: 86 },
      { name: "Docker / Kubernetes", level: 90 },
      { name: "CI/CD (Azure DevOps)", level: 92 },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "SQL Server", level: 92 },
      { name: "PostgreSQL", level: 84 },
      { name: "Redis / Caching", level: 86 },
      { name: "Event-driven storage", level: 80 },
    ],
  },
  {
    name: "AI / Modern Systems",
    items: [
      { name: "LLM Integration", level: 85 },
      { name: "RAG Pipelines", level: 83 },
      { name: "OCR Pipelines", level: 80 },
      { name: "Observability", level: 90 },
    ],
  },
];

export const experiences = [
  {
    id: "rj",
    company: "Raymond James",
    role: "Full Stack .NET Engineer",
    period: "Aug 2024 — Present",
    current: true,
    summary:
      "Building high-throughput financial systems with strict compliance, focusing on scalability, automation, and reliability.",
    achievements: [
      "Reduced manual processing by 60% by automating payment and document workflows using RESTful APIs.",
      "Built microservices integrating Azure Service Bus and AWS SQS with retry and idempotency patterns.",
      "Cut document processing time from 2 hours to under 10 minutes using OCR + parallel processing pipelines.",
      "Designed scalable APIs and services deployed via Docker, Kubernetes (AKS), and CI/CD pipelines.",
      "Improved SQL performance and API response times through indexing and query optimization.",
    ],
    tech: [
      "C#",
      "ASP.NET Core",
      "Azure",
      "AWS",
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
    period: "Jun 2019 — Aug 2022",
    current: false,
    summary:
      "Developed healthcare systems handling high-volume transactions with a focus on reliability and compliance.",
    achievements: [
      "Built microservices supporting ~12,000 daily transactions for patient workflows.",
      "Improved batch processing time from 2 hours to 18 minutes via DB optimization.",
      "Restored SSO authentication success rate from 72% to 99% by resolving Azure AD issues.",
      "Implemented real-time notifications reducing response time from 30 minutes to under 5 minutes.",
      "Deployed containerized apps using Docker and Azure DevOps CI/CD pipelines.",
    ],
    tech: ["C#", ".NET", "Angular", "SQL Server", "Azure DevOps", "Docker"],
  },
];

export type ProjectDemoKind = "rag" | "api" | "dashboard" | "none";

export type ProjectDetail = {
  id: string;
  title: string;
  tagline: string;
  stack: string[];
  features: string[];
  metrics: { label: string; value: string; detail: string }[];
  detail: string;
  problem: string;
  /** Mini architecture diagram (monospace lines) */
  architectureLines: string[];
  techDecisions: { choice: string; rationale: string }[];
  challenges: { challenge: string; solution: string }[];
  demoKind: ProjectDemoKind;
};

/** Tags for stack fingerprint filter on the home page */
export const stackFingerprintTags = [
  "Azure",
  ".NET",
  "React",
  "Angular",
  "AWS",
  "PostgreSQL",
  "Next.js",
] as const;

export type StackFingerprintTag = (typeof stackFingerprintTags)[number];

export function projectMatchesStackTags(
  stack: string[],
  tags: Set<StackFingerprintTag>,
): boolean {
  if (tags.size === 0) return true;
  const j = stack.map((s) => s.toLowerCase()).join(" ");
  for (const tag of tags) {
    let ok = false;
    switch (tag) {
      case "Azure":
        ok = j.includes("azure");
        break;
      case ".NET":
        ok = /\.net|asp\.net|c#/.test(j);
        break;
      case "React":
        ok = j.includes("react");
        break;
      case "Angular":
        ok = j.includes("angular");
        break;
      case "AWS":
        ok = j.includes("aws");
        break;
      case "PostgreSQL":
        ok = j.includes("postgres");
        break;
      case "Next.js":
        ok = j.includes("next");
        break;
      default:
        ok = false;
    }
    if (!ok) return false;
  }
  return true;
}

export const impactRows = [
  {
    role: "Raymond James — Full Stack .NET",
    metric: "Manual processing time",
    before: "High touch, spreadsheet-heavy",
    after: "~60% reduction in manual steps",
    measured:
      "Workflow timing samples + ticket volume before/after automation rollout.",
  },
  {
    role: "Raymond James — APIs & data",
    metric: "Document processing",
    before: "~2 hours end-to-end",
    after: "<10 minutes (OCR + parallel pipelines)",
    measured:
      "P95 job duration from processing queue telemetry.",
  },
  {
    role: "Wipro — Healthcare microservices",
    metric: "Daily transaction throughput",
    before: "Baseline cluster load",
    after: "~12k transactions/day sustained",
    measured:
      "Service metrics + DB throughput dashboards.",
  },
  {
    role: "Wipro — Auth reliability",
    metric: "SSO success rate",
    before: "72%",
    after: "99%",
    measured:
      "Azure AD sign-in logs + app error rates.",
  },
] as const;

export const recruiterFaq = [
  {
    q: "Work authorization?",
    a: "Update this line with your status (e.g. US citizen, Green Card, H1B, etc.).",
  },
  {
    q: "Notice period?",
    a: "Typically X weeks — confirm with your current employer policy.",
  },
  {
    q: "Remote / hybrid?",
    a: "Open to remote-first or hybrid within [region]. Willing to travel occasionally for on-sites.",
  },
  {
    q: "Compensation expectations?",
    a: "Competitive with senior full-stack / backend roles in [market]. Happy to align after scope and level are clear.",
  },
  {
    q: "What roles are you targeting?",
    a: "Senior / staff full-stack .NET, platform engineering, or backend-heavy product teams with strong engineering culture.",
  },
] as const;

export const insuranceAiCaseStudy = {
  id: "insurance-ai",
  title: "AI Insurance Claims System",
  subtitle:
    "RAG, OCR, and workflow automation for regulated claims — case study",
  intro:
    "End-to-end narrative of how we moved from manual document triage to grounded AI assistance with auditability. Names and figures are representative; tune copy to what you can disclose.",
  timeline: [
    {
      phase: "Discovery",
      period: "Weeks 1–3",
      summary:
        "Mapped analyst journeys, policy corpus sources, and compliance checkpoints. Defined non-negotiables: citations, retention, PII boundaries.",
    },
    {
      phase: "MVP pipeline",
      period: "Weeks 4–10",
      summary:
        "OCR + normalization workers, vector index over policy chunks, rules engine for hard gates, LLM path only when retrieval confidence cleared a bar.",
    },
    {
      phase: "Hardening",
      period: "Weeks 11–16",
      summary:
        "Evaluation sets for citation accuracy, cost caps per tenant, DLQs and replay for workers, dashboards for queue depth and model spend.",
    },
    {
      phase: "Rollout",
      period: "Weeks 17+",
      summary:
        "Phased enablement by LOB, human-in-the-loop for low-confidence, feedback loop into chunking and re-ranking.",
    },
  ],
  sequenceDiagram: `
Analyst UI          API              Workers           Vector DB / LLM
   |                 |                  |                    |
   |-- upload doc -->|                  |                    |
   |                 |-- enqueue OCR -->|                    |
   |                 |                  |-- embed chunks --->|
   |                 |<-- status -------|                    |
   |<-- draft -------|                  |                    |
   |                 |-- RAG query ------------------------>|
   |                 |<-- answer + citations ----------------|
`.trim(),
  architectureDeep: [
    "  ┌────────────┐    ┌─────────────┐    ┌──────────────────┐",
    "  │   Gateway  │───▶│ Claims API  │───▶│  Domain services │",
    "  │  + authZ   │    │  (ASP.NET)  │    │  + outbox        │",
    "  └────────────┘    └──────┬──────┘    └────────┬─────────┘",
    "                           │                    │",
    "                    ┌──────▼──────┐      ┌──────▼─────────┐",
    "                    │  Bus /    │      │ PostgreSQL      │",
    "                    │  queues   │      │ + vectors       │",
    "                    └──────┬──────┘      └────────────────┘",
    "                           │",
    "                    ┌──────▼──────┐      ┌────────────────┐",
    "                    │ OCR / NLP  │      │ LLM router     │",
    "                    │ workers    │      │ (guardrailed)  │",
    "                    └────────────┘      └────────────────┘",
  ],
  whatNext: [
    "Tighter offline eval loops: golden sets per product line with regression gates in CI.",
    "Multi-model routing: cheaper models for classification, premium only for synthesis.",
    "Stronger lineage: document version → chunk → embedding id in every audit record.",
    "Federated search if policies span multiple repositories with different ACLs.",
  ],
} as const;

export const projects: ProjectDetail[] = [
  {
    id: "insurance-ai",
    title: "AI Insurance Claims System",
    tagline: "AI-powered claims processing with RAG and automation",
    stack: ["C#", "ASP.NET Core", "Azure", "LLMs", "PostgreSQL", "React"],
    features: [
      "OCR-based document ingestion with intelligent preprocessing",
      "RAG pipelines for policy-based claim validation",
      "Automated claim summarization and fraud detection signals",
    ],
    metrics: [
      { label: "Processing time", value: "-70%", detail: "automation impact" },
      { label: "Accuracy", value: "+15%", detail: "AI-assisted decisions" },
      { label: "Manual effort", value: "-50%", detail: "reduced workload" },
    ],
    detail:
      "End-to-end AI system combining document processing, vector search, and LLM orchestration with a focus on explainability and production scalability.",
    problem:
      "Claims analysts were drowning in unstructured documents and policy lookups; decisions were slow, inconsistent, and hard to audit for compliance.",
    architectureLines: [
      "  ┌─────────────┐     ┌──────────────┐     ┌─────────────────┐",
      "  │  Upload /   │────▶│  OCR + norm  │────▶│  Vector index   │",
      "  │  intake API │     │  pipeline    │     │  (policy RAG)   │",
      "  └─────────────┘     └──────────────┘     └────────┬────────┘",
      "         │                      │                    │",
      "         │               ┌──────▼──────┐      ┌──────▼──────┐",
      "         └──────────────▶│ Rules engine │◀─────│ LLM + guard │",
      "                         └──────┬──────┘      │   rails     │",
      "                                │             └─────────────┘",
      "                         ┌──────▼──────┐",
      "                         │ Workflow +  │",
      "                         │ audit trail │",
      "                         └─────────────┘",
    ],
    techDecisions: [
      {
        choice: "RAG over fine-tuning for policy Q&A",
        rationale:
          "Policies change often; retrieval keeps answers grounded in the latest corpus with citations for auditors.",
      },
      {
        choice: "PostgreSQL + pgvector (or equivalent)",
        rationale:
          "Single operational store for structured claim data and embeddings simplifies backups and compliance boundaries.",
      },
      {
        choice: "Async workers for OCR",
        rationale:
          "Decouples heavy document CPU from API latency and allows retries without blocking analysts.",
      },
    ],
    challenges: [
      {
        challenge: "Hallucinations on niche policy clauses",
        solution:
          "Forced citation snippets, confidence thresholds, and human-in-the-loop for low-confidence answers.",
      },
      {
        challenge: "PII in documents",
        solution:
          "Redaction pipeline before embedding; strict tenancy and encryption at rest for raw files.",
      },
    ],
    demoKind: "rag",
  },
  {
    id: "job-tracker",
    title: "Job Tracker App",
    tagline: "Smart job pipeline tracking and analytics",
    stack: ["Next.js", "TypeScript", "ASP.NET Core", "SQL Server", "Azure"],
    features: [
      "End-to-end job tracking lifecycle with analytics dashboard",
      "Advanced filtering and search across applications",
      "Recruiter interaction tracking and reminders",
    ],
    metrics: [
      { label: "User productivity", value: "+40%", detail: "tracking efficiency" },
      { label: "Response tracking", value: "100%", detail: "pipeline visibility" },
    ],
    detail:
      "A full-stack application designed to simplify job search workflows with structured tracking, analytics, and insights.",
    problem:
      "Candidates lost visibility across many applications; no single place for stage, follow-ups, or SLA-style reminders.",
    architectureLines: [
      "  ┌──────────┐      ┌─────────────┐      ┌────────────────┐",
      "  │ Next.js  │─────▶│  BFF / API  │─────▶│  ASP.NET Core  │",
      "  │   UI     │◀─────│   (REST)    │◀─────│   services     │",
      "  └──────────┘      └──────┬──────┘      └───────┬────────┘",
      "                             │                     │",
      "                      ┌──────▼──────┐      ┌───────▼────────┐",
      "                      │ Redis cache │      │ SQL Server +   │",
      "                      │ (sessions)  │      │ full-text idx  │",
      "                      └─────────────┘      └────────────────┘",
    ],
    techDecisions: [
      {
        choice: "Next.js on the front",
        rationale:
          "App Router + server components where it helps; snappy UX for dashboards and filters.",
      },
      {
        choice: "SQL Server full-text",
        rationale:
          "Native search across notes and job descriptions without running a second search cluster early on.",
      },
      {
        choice: "Optimistic UI updates",
        rationale:
          "Kanban-style moves feel instant; reconcile on the server with clear error rollback.",
      },
    ],
    challenges: [
      {
        challenge: "Stale board state across tabs",
        solution:
          "Lightweight polling or SignalR-style push for stage changes; version column on rows for conflict detection.",
      },
      {
        challenge: "Heavy list queries",
        solution:
          "Cursor pagination, indexed filters, and selective projections for list views.",
      },
    ],
    demoKind: "dashboard",
  },
  {
    id: "pdf-editor",
    title: "PDF Editor",
    tagline: "High-performance document editing and annotation",
    stack: ["Angular", "C#", "Web APIs", "Azure Blob", "SignalR"],
    features: [
      "Real-time document editing and annotations",
      "Secure file storage and versioning",
      "Digital signature integration",
    ],
    metrics: [
      { label: "Performance", value: "+45%", detail: "optimized rendering" },
      { label: "File handling", value: "200MB+", detail: "large docs supported" },
    ],
    detail:
      "A scalable document processing system focused on performance, security, and real-time collaboration.",
    problem:
      "Regulated teams needed in-browser collaboration on large PDFs without corrupting print fidelity or leaking versions.",
    architectureLines: [
      "  ┌──────────┐     ┌────────────┐     ┌───────────────┐",
      "  │ Angular  │────▶│  Web API   │────▶│  Blob storage │",
      "  │  client  │     │  (stream)  │     │  + versions   │",
      "  └────┬─────┘     └─────┬──────┘     └───────────────┘",
      "       │                 │",
      "       │           ┌─────▼─────┐",
      "       └──────────▶│ SignalR   │◀──── presence + ops",
      "                   │ hub       │",
      "                   └───────────┘",
    ],
    techDecisions: [
      {
        choice: "Chunked streaming from API",
        rationale:
          "Keeps memory bounded on the server while supporting 200MB+ uploads and progressive load in the client.",
      },
      {
        choice: "SignalR for co-editing",
        rationale:
          "First-class .NET integration and automatic fallback transports for corporate networks.",
      },
      {
        choice: "Server-side render for print",
        rationale:
          "One source of truth for pixel-accurate output vs. what users see in the canvas.",
      },
    ],
    challenges: [
      {
        challenge: "Memory spikes on huge files",
        solution:
          "Windowed page rendering, dispose of off-DOM buffers, and back-pressure on the upload pipeline.",
      },
      {
        challenge: "Concurrent edits",
        solution:
          "Operational transforms or last-write-wins with explicit merge UI for conflict hotspots.",
      },
    ],
    demoKind: "api",
  },
];

export function getProjectById(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}

export const engineeringPhilosophy = [
  {
    title: "Reliability over cleverness",
    body: "Boring, observable systems beat clever hacks. I design for clear failure modes and fast recovery.",
  },
  {
    title: "Measure before optimizing",
    body: "Trace, log, and profile with real traffic. Optimization without data is guesswork.",
  },
  {
    title: "Design for failure",
    body: "Retries, idempotency, and backpressure are defaults in distributed systems—not stretch goals.",
  },
  {
    title: "APIs as contracts",
    body: "Versioning, schemas, and documentation keep teams aligned as services multiply.",
  },
  {
    title: "Security and compliance by design",
    body: "Data boundaries and audit trails are modeled early—not bolted on after launch.",
  },
] as const;

export type CertificationCategory = "agile" | "cloud" | "experience";

export const certificationCategoryLabels: Record<
  CertificationCategory,
  string
> = {
  agile: "Agile & product",
  cloud: "Cloud",
  experience: "Experience programs",
};

export const certifications = [
  {
    id: "atlassian-agile-pro",
    title: "Atlassian Agile Project Management Professional Certificate",
    issuer: "Atlassian",
    issuedLabel: "Mar 2026",
    issuedIso: "2026-03-01",
    expiresLabel: null as string | null,
    expiresIso: null as string | null,
    credentialId: null as string | null,
    verifyUrl: null as string | null,
    category: "agile" as CertificationCategory,
    skills: ["Agile", "Jira", "Sprint planning", "Delivery leadership"],
    summary:
      "End-to-end agile project management with Atlassian tooling—backlogs, boards, and stakeholder-ready reporting.",
  },
  {
    id: "pspo-i",
    title: "Professional Scrum Product Owner™ I (PSPO I)",
    issuer: "Scrum.org",
    issuedLabel: "Mar 2026",
    issuedIso: "2026-03-01",
    expiresLabel: null,
    expiresIso: null,
    credentialId: null,
    verifyUrl: "https://www.scrum.org/certificates",
    category: "agile",
    skills: ["Scrum", "Product ownership", "Backlog", "Value delivery"],
    summary:
      "Scrum.org credential for product vision, backlog ordering, and maximizing value within empirical process control.",
  },
  {
    id: "azure-developer-associate",
    title: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    issuedLabel: "May 2025",
    issuedIso: "2025-05-01",
    expiresLabel: "May 2026",
    expiresIso: "2026-05-01",
    credentialId: "CB4D1D499DB27310",
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/",
    category: "cloud",
    skills: ["Azure", "App Service", "APIs", "Security", "Storage", "CI/CD"],
    summary:
      "Builds, deploys, and secures cloud-native apps on Azure—aligned with how I ship production .NET services.",
  },
  {
    id: "jpmc-agile-vexp",
    title: "Agile Virtual Experience Program",
    issuer: "JPMorganChase",
    issuedLabel: "Jul 2023",
    issuedIso: "2023-07-01",
    expiresLabel: null,
    expiresIso: null,
    credentialId: "BL3bh9LRZeSCbRtp8",
    verifyUrl: null,
    category: "experience",
    skills: ["Agile ceremonies", "Enterprise context", "Technical storytelling"],
    summary:
      "Virtual program applying agile workflows in a global financial services setting—bridging delivery and compliance.",
  },
] as const;

export const readingList = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    type: "book" as const,
    note: "Reference for distributed systems trade-offs and data modeling.",
  },
  {
    title: "Building Microservices (2e)",
    author: "Sam Newman",
    type: "book" as const,
    note: "Boundaries, deployment, and evolution of service architectures.",
  },
  {
    title: "Microsoft Learn — Azure architecture",
    author: "Microsoft",
    type: "course" as const,
    url: "https://learn.microsoft.com/en-us/azure/architecture/",
    note: "Well-architected patterns I revisit before major design reviews.",
  },
  {
    title: "Architecture Notes",
    author: "Various",
    type: "newsletter" as const,
    url: "https://architecturenotes.co/",
    note: "Short, visual breakdowns of real-world system designs.",
  },
] as const;

export const nowUpdates = [
  {
    date: "2026-04",
    text: "Deepening RAG evaluation: citation accuracy checks and cost caps per tenant.",
  },
  {
    date: "2026-03",
    text: "Sharpening AKS + GitOps patterns for zero-downtime API rollouts.",
  },
  {
    date: "2026-02",
    text: "Experimenting with structured logging conventions across .NET + frontends.",
  },
] as const;

export const speakingAndWriting = [
  {
    title: "Internal tech talk — Idempotent message consumers",
    venue: "Team brownbag",
    year: "2025",
    url: null as string | null,
    kind: "talk" as const,
  },
  {
    title: "README templates for microservices",
    venue: "Engineering wiki",
    year: "2024",
    url: null as string | null,
    kind: "writing" as const,
  },
] as const;

export const openSourceHighlights = [
  {
    title: "Portfolio (this site)",
    role: "Owner",
    url: "https://github.com/YaswanthSai2203/Portfolio",
    detail: "Next.js 16, R3F backdrop, contact API, SEO + JSON-LD.",
  },
  {
    title: "Sample contributions",
    role: "PRs / issues",
    url: "https://github.com/YaswanthSai2203",
    detail: "Replace with repos or PRs you want to highlight publicly.",
  },
] as const;

export const showcaseSnippet = {
  title: "Idempotent queue consumer (.NET)",
  language: "csharp",
  code: `// Process message at-least-once without duplicate side effects
public async Task HandleAsync(ClaimSubmitted msg, CancellationToken ct)
{
    var key = $"claim:{msg.IdempotencyKey}";
    if (!await _store.TryAcquireOnceAsync(key, TimeSpan.FromHours(24), ct))
        return; // already processed

    await _db.ExecuteInTransactionAsync(async () =>
    {
        await _claims.UpsertAsync(msg, ct);
        await _bus.PublishAsync(new ClaimIndexed(msg.ClaimId), ct);
    }, ct);
}`,
} as const;

export const aiHighlights = [
  {
    title: "LLM Integration",
    description:
      "Designing production-grade AI workflows with prompt engineering, guardrails, and cost-aware model usage.",
  },
  {
    title: "RAG Pipelines",
    description:
      "Building retrieval systems with embeddings, vector search, and domain-tuned ranking strategies.",
  },
  {
    title: "OCR Pipelines",
    description:
      "Automating document workflows using OCR, preprocessing, and intelligent extraction pipelines.",
  },
];
