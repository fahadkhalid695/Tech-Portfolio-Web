import { Skill } from '../types';

// ═══════════════════════════════════════════════════════════════════════════
// SKILLS DATA — Redesigned categories for August 2026 profile
//
// Categories:
//   01 — AI & Machine Learning
//   02 — Cloud & DevOps
//   03 — Cybersecurity
//   04 — Software Development
//   05 — Data & Databases
//   06 — Tools & Platforms
//
// Levels reflect genuine capability supported by existing projects/certs.
// No fabricated skill percentages are used in the UI.
// ═══════════════════════════════════════════════════════════════════════════

export const skills: Skill[] = [

  // ── 01 — AI & Machine Learning ───────────────────────────────────────────
  {
    id: 101,
    category: "AI & Machine Learning",
    name: "Machine Learning",
    level: "Advanced",
    icon: "BrainIcon"
  },
  {
    id: 102,
    category: "AI & Machine Learning",
    name: "Generative AI",
    level: "Intermediate",
    icon: "SparklesIcon"
  },
  {
    id: 103,
    category: "AI & Machine Learning",
    name: "AI Agents / Agentic AI",
    level: "Intermediate",
    icon: "BotIcon"
  },
  {
    id: 104,
    category: "AI & Machine Learning",
    name: "Computer Vision",
    level: "Intermediate",
    icon: "EyeIcon"
  },
  {
    id: 105,
    category: "AI & Machine Learning",
    name: "TensorFlow",
    level: "Advanced",
    icon: "TensorFlowIcon"
  },
  {
    id: 106,
    category: "AI & Machine Learning",
    name: "PyTorch",
    level: "Intermediate",
    icon: "PyTorchIcon"
  },
  {
    id: 107,
    category: "AI & Machine Learning",
    name: "Scikit-learn",
    level: "Advanced",
    icon: "ScikitLearnIcon"
  },
  {
    id: 108,
    category: "AI & Machine Learning",
    name: "Prompt Engineering",
    level: "Intermediate",
    icon: "PromptIcon"
  },

  // ── 02 — Cloud & DevOps ───────────────────────────────────────────────────
  {
    id: 201,
    category: "Cloud & DevOps",
    name: "AWS",
    level: "Advanced",
    icon: "AwsIcon"
  },
  {
    id: 202,
    category: "Cloud & DevOps",
    name: "Microsoft Azure",
    level: "Intermediate",
    icon: "AzureIcon"
  },
  {
    id: 203,
    category: "Cloud & DevOps",
    name: "Google Cloud",
    level: "Beginner",
    icon: "GoogleCloudIcon"
  },
  {
    id: 204,
    category: "Cloud & DevOps",
    name: "Docker",
    level: "Intermediate",
    icon: "DockerIcon"
  },
  {
    id: 205,
    category: "Cloud & DevOps",
    name: "Kubernetes",
    level: "Intermediate",
    icon: "KubernetesIcon"
  },
  {
    id: 206,
    category: "Cloud & DevOps",
    name: "Linux",
    level: "Advanced",
    icon: "LinuxIcon"
  },
  {
    id: 207,
    category: "Cloud & DevOps",
    name: "CI/CD",
    level: "Intermediate",
    icon: "CiCdIcon"
  },
  {
    id: 208,
    category: "Cloud & DevOps",
    name: "GitHub Actions",
    level: "Intermediate",
    icon: "GithubActionsIcon"
  },

  // ── 03 — Cybersecurity ────────────────────────────────────────────────────
  {
    id: 301,
    category: "Cybersecurity",
    name: "Cybersecurity Fundamentals",
    level: "Intermediate",
    icon: "ShieldIcon"
  },
  {
    id: 302,
    category: "Cybersecurity",
    name: "Cloud Security",
    level: "Intermediate",
    icon: "CloudShieldIcon"
  },
  {
    id: 303,
    category: "Cybersecurity",
    name: "Network Security",
    level: "Beginner",
    icon: "NetworkIcon"
  },
  {
    id: 304,
    category: "Cybersecurity",
    name: "CTF / Security Labs",
    level: "Intermediate",
    icon: "FlagIcon"
  },
  {
    id: 305,
    category: "Cybersecurity",
    name: "Ethical Hacking",
    level: "Beginner",
    icon: "HackIcon"
  },

  // ── 04 — Software Development ─────────────────────────────────────────────
  {
    id: 401,
    category: "Software Development",
    name: "Python",
    level: "Advanced",
    icon: "PythonIcon"
  },
  {
    id: 402,
    category: "Software Development",
    name: "JavaScript / TypeScript",
    level: "Intermediate",
    icon: "JsIcon"
  },
  {
    id: 403,
    category: "Software Development",
    name: "React / Next.js",
    level: "Intermediate",
    icon: "ReactIcon"
  },
  {
    id: 404,
    category: "Software Development",
    name: "Node.js",
    level: "Intermediate",
    icon: "NodeIcon"
  },
  {
    id: 405,
    category: "Software Development",
    name: "REST APIs",
    level: "Intermediate",
    icon: "ApiIcon"
  },
  {
    id: 406,
    category: "Software Development",
    name: "C++",
    level: "Intermediate",
    icon: "CppIcon"
  },
  {
    id: 407,
    category: "Software Development",
    name: "Git",
    level: "Advanced",
    icon: "GitIcon"
  },

  // ── 05 — Data & Databases ─────────────────────────────────────────────────
  {
    id: 501,
    category: "Data & Databases",
    name: "Data Analysis",
    level: "Advanced",
    icon: "DataIcon"
  },
  {
    id: 502,
    category: "Data & Databases",
    name: "Pandas / NumPy",
    level: "Advanced",
    icon: "PandasIcon"
  },
  {
    id: 503,
    category: "Data & Databases",
    name: "Matplotlib / Seaborn",
    level: "Advanced",
    icon: "ChartIcon"
  },
  {
    id: 504,
    category: "Data & Databases",
    name: "MongoDB",
    level: "Intermediate",
    icon: "MongoIcon"
  },
  {
    id: 505,
    category: "Data & Databases",
    name: "SQL",
    level: "Intermediate",
    icon: "SqlIcon"
  },

  // ── 06 — Tools & Platforms ───────────────────────────────────────────────
  {
    id: 601,
    category: "Tools & Platforms",
    name: "GitHub Copilot",
    level: "Advanced",
    icon: "CopilotIcon"
  },
  {
    id: 602,
    category: "Tools & Platforms",
    name: "Kiro (AWS)",
    level: "Advanced",
    icon: "KiroIcon"
  },
  {
    id: 603,
    category: "Tools & Platforms",
    name: "Gemini AI",
    level: "Advanced",
    icon: "GeminiIcon"
  },
  {
    id: 604,
    category: "Tools & Platforms",
    name: "Vercel",
    level: "Intermediate",
    icon: "VercelIcon"
  },
  {
    id: 605,
    category: "Tools & Platforms",
    name: "Bolt",
    level: "Advanced",
    icon: "BoltIcon"
  }
];

// Convenience: group skills by category in the intended display order
export const SKILL_CATEGORY_ORDER = [
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Cybersecurity",
  "Software Development",
  "Data & Databases",
  "Tools & Platforms"
] as const;

export type SkillCategory = typeof SKILL_CATEGORY_ORDER[number];
