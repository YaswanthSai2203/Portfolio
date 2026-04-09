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

export const projects = [
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
  },
];

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
