import type { CvData } from "./cv";

/** Ruta pública del PDF en inglés generado con `pnpm --filter @portfolio/web cv:pdf`. */
export const CV_EN_PDF_URL = "/CV-Samael-Amaral-EN.pdf";

/**
 * Versión en inglés (EE. UU.) del CV. Mantener sincronizada con `cv.ts`.
 * Página pública: no incluir teléfono ni otros datos personales sensibles.
 */
export const cvEn: CvData = {
  locale: "en",
  lang: "en-US",
  languageName: "English",
  languageCode: "EN",
  ogLocale: "en_US",
  pageTitle: "Resume",
  pageDescription: "Resume of Juan Samael Amaral Bravo: Systems & Automation Specialist · AI-Assisted Development.",
  path: "/cv/en",
  pdfUrl: CV_EN_PDF_URL,
  labels: {
    toolbar: "Resume actions",
    back: "Back to portfolio",
    print: "Print",
    download: "Download PDF",
    languageSwitcher: "Resume language",
    sections: {
      summary: "Summary",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      education: "Education & Certifications",
      languages: "Languages",
    },
  },
  name: "Juan Samael Amaral Bravo",
  location: "Apaseo el Grande, Guanajuato, Mexico",
  locationNote: "Open to relocation",
  email: "Amaral.Samael@Outlook.com",
  links: [
    { label: "linkedin.com/in/samaelamaral", href: "https://www.linkedin.com/in/samaelamaral" },
    { label: "github.com/Samarisco", href: "https://github.com/Samarisco" },
  ],
  headline: "Systems & Automation Specialist · AI-Assisted Development",
  summary:
    "Computer Systems Engineer and sole owner of the IT function at Fast Market, where I built the internal ticketing system, API-driven automated alerts, and the team's technical training program. I build software with AI agents using my own workflow for planning, review, and testing. Seeking roles in advanced IT support, automation, and infrastructure.",
  experience: [
    {
      company: "Fast Market",
      location: "Apaseo el Grande, Mexico",
      positions: [
        // PUESTO PENDIENTE DE ACTIVAR (no se renderiza mientras esté comentado).
        // Al activarlo, cambiar el periodo del puesto de Intern a "Aug 2026 – Oct 2026"
        // y descomentar el bullet de Pronto Market.
        // {
        //   title: "Systems & Automation Specialist (Mexico–Spain)",
        //   period: "Nov 2026 – Present",
        // },
        {
          title: "IT Support, Development & Automation Intern (Mexico)",
          period: "Aug 2026 – Oct 2026",
        },
      ],
      highlights: [
        "Designed and built the internal ticketing and incident-management system, tailored to daily operations and ready to scale, centralizing support-request tracking.",
        "Implemented API-driven automated alerts and monitoring for systems and services to detect incidents and track them to resolution.",
        "Designed a multi-agent engineering system (an orchestrator plus tech-lead, backend, frontend, QA, security, and DevOps agents) with standards, hooks, and a pull-request workflow for controlled AI-assisted development.",
        "Created the IT training program (manuals, videos, and guides) and ticket reporting to standardize the department's operations.",
        // BULLET PENDIENTE DE ACTIVAR junto con el puesto de España:
        // "Preparing the technology infrastructure for the expansion into Spain (Pronto Market).",
      ],
    },
    {
      company: "Mubea",
      companyNote: "automotive manufacturing",
      location: "Apaseo el Grande, Mexico",
      positions: [{ title: "IT Support Intern", period: "Jan 2025 – Aug 2025" }],
      highlights: [
        "Resolved hardware, software, and connectivity incidents for corporate users on the plant floor, from diagnosis through closure.",
        "Managed Active Directory accounts: account provisioning (including executive accounts), password resets, and profile updates.",
        "Configured wireless access points and network drops, and supported IT infrastructure assessments.",
        "Performed data backup and recovery for user workstations.",
      ],
    },
  ],
  projects: [
    {
      name: "DiosesmonDex",
      link: { label: "diosesmondex.onrender.com", href: "https://diosesmondex.onrender.com" },
      meta: "Aug–Oct 2026",
      highlights: [
        "Built a community-driven Pokédex for a Cobblemon (Minecraft) server with React + TypeScript, Node/Express, and PostgreSQL (Neon), deployed on Render and documenting 823 species from real server data.",
        "Developed a versioned public API with OpenAPI docs and rate limiting, Discord OAuth2 login, Discord bots, and real-time chat (SSE).",
        "Took the project from MVP to a full platform with a public API and bots in 3 days, working with AI agents and backed by 247 automated tests (Vitest).",
      ],
    },
    {
      name: "Sign Language Translator",
      meta: "Python · OpenCV · TTS",
      highlights: [
        "Prototyped hand-position and gesture detection with OpenCV, converting signs into text and speech.",
      ],
    },
  ],
  skills: [
    {
      label: "Systems & Support",
      items:
        "Active Directory, networking (APs, network drops), backup & recovery, Windows 11, PowerShell, monitoring",
    },
    {
      label: "Development & Automation",
      items:
        "Python, JavaScript/TypeScript, React, Node/Express, SQL (PostgreSQL, SQLite), MongoDB, Docker, Git/GitHub",
    },
    {
      label: "Applied AI",
      items: "agent-based development (Claude Code, OpenCode), multi-agent workflow design",
    },
  ],
  education: [
    {
      title: "B.S. in Computer Systems Engineering",
      institution: "Virtual University of the State of Guanajuato (UVEG)",
      period: "2023–2026",
      detail: "Degree completed; temporary professional license issued, diploma pending.",
    },
    {
      title: "ONE Tech Foundation G8 – Back-End Track (Oracle Next Education)",
      institution: "Alura Latam",
      period: "Jan 2024 – Aug 2025",
      detail: "Spring Boot, Spring AI with OpenAI.",
    },
  ],
  languages:
    "Spanish (native) · English (intermediate — technical reading and documentation; actively improving)",
};
