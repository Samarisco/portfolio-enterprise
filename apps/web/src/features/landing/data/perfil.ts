import { CV_PDF_URL } from "../../cv/data/cv";
import { CV_EN_PDF_URL } from "../../cv/data/cv.en";

/**
 * Contenido de la landing (`/`). Fuente de verdad: perfil.md (privado).
 *
 * Página pública: solo hechos confirmados. No publicar teléfono, Gmail, el puesto
 * pendiente de nombramiento, la expansión a España ni cifras internas de las empresas.
 * `perfil.spec.ts` falla si alguno de esos datos se cuela.
 */

export interface LandingLink {
  readonly label: string;
  readonly href: string;
}

export interface LandingPersonal {
  /** Nombre visible en la página. */
  readonly name: string;
  /** Nombre completo, para metadata. */
  readonly fullName: string;
  /** Titular de posicionamiento (no es un puesto). Es `headlineLines` unido con espacios. */
  readonly headline: string;
  /** El titular partido en las líneas del hero; la última va resaltada. */
  readonly headlineLines: readonly string[];
  /** Puesto confirmado que se muestra bajo el titular. */
  readonly currentRole: string;
  readonly summary: string;
  readonly targetRoles: string;
  readonly location: string;
  readonly availability: string;
  readonly email: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly cvUrl: string;
  readonly cvEnUrl: string;
  readonly resumeUrl: string;
  readonly resumeEnUrl: string;
}

export interface LandingExperience {
  readonly company: string;
  readonly companyNote?: string;
  readonly location: string;
  readonly role: string;
  readonly period: string;
  readonly summary: string;
  readonly achievements: readonly string[];
}

export type ProjectStatus = "Destacado" | "Prototipo" | "En mejora";

export interface LandingProject {
  readonly name: string;
  readonly status: ProjectStatus;
  readonly period?: string;
  readonly summary: string;
  readonly details: readonly string[];
  readonly stack: readonly string[];
  /** Cifras verificables; se muestran con la nota "fuente: repositorio". */
  readonly facts?: readonly string[];
  readonly link?: LandingLink;
}

export const SKILL_LEVELS = [
  "Avanzado",
  "Intermedio",
  "Intermedio para leer, depurar e integrar; básico para escribir desde cero sin IA",
  "Intermedio para leer, depurar e integrar",
  "Básico",
  "Básico (cursos)",
] as const;

export type SkillLevel = (typeof SKILL_LEVELS)[number];

export interface LandingSkill {
  readonly area: string;
  /** Nivel literal de `perfil.md`. */
  readonly level: SkillLevel;
}

export interface LandingEducation {
  readonly title: string;
  readonly institution: string;
  readonly period: string;
  readonly detail?: string;
  readonly courses?: readonly string[];
}

export interface LandingAgent {
  /** Nombre del agente tal como se llama en el sistema. */
  readonly id: string;
  /** Qué hace dentro del flujo, en una frase. */
  readonly role: string;
}

/** Sistema multiagente que Samael diseñó; es el visual del hero. */
export interface LandingAgentSystem {
  readonly title: string;
  readonly caption: string;
  readonly coordinator: LandingAgent;
  /** Agentes especialistas en el orden en que reciben el trabajo. */
  readonly agents: readonly LandingAgent[];
  /** Lo que sale del ciclo. */
  readonly output: string;
}

export interface LandingProfile {
  readonly personal: LandingPersonal;
  readonly experience: readonly LandingExperience[];
  readonly projects: readonly LandingProject[];
  readonly skills: readonly LandingSkill[];
  readonly agentSystem: LandingAgentSystem;
  readonly aiWorkflow: string;
  readonly education: readonly LandingEducation[];
  readonly languages: string;
}

export const perfil: LandingProfile = {
  personal: {
    name: "Samael Amaral",
    fullName: "Juan Samael Amaral Bravo",
    headline: "Sistemas, automatización e IA aplicada",
    headlineLines: ["Sistemas,", "automatización", "e IA aplicada"],
    currentRole: "IT Support, Development & Automation Intern · Fast Market · ago 2026 – oct 2026",
    summary:
      "Ingeniero en Sistemas Computacionales. En Fast Market creé el área de sistemas: el sistema interno de tickets e incidencias, las alertas automatizadas y la capacitación del equipo.",
    targetRoles:
      "Busco roles de especialista en sistemas, soporte N2, automatización TI y desarrollo asistido por IA.",
    location: "Apaseo el Grande, Guanajuato, México",
    availability: "Disponible para cambio de residencia · híbrido o presencial",
    email: "Amaral.Samael@Outlook.com",
    githubUrl: "https://github.com/Samarisco",
    linkedinUrl: "https://www.linkedin.com/in/samaelamaral",
    cvUrl: "/cv",
    cvEnUrl: "/cv/en",
    resumeUrl: CV_PDF_URL,
    resumeEnUrl: CV_EN_PDF_URL,
  },
  experience: [
    {
      company: "Fast Market",
      location: "Apaseo el Grande, Gto.",
      role: "IT Support, Development & Automation Intern",
      period: "ago 2026 – oct 2026",
      summary: "Único responsable de crear y operar el área de sistemas.",
      achievements: [
        "Diseñé y desarrollé solo el sistema interno de tickets e incidencias, adaptado a la operación y pensado para crecer. Está en uso.",
        "Implementé alertas automatizadas a partir de APIs y monitoreo de sistemas y servicios.",
        "Diseñé el sistema de ingeniería multiagente para programar con IA: coordinador más agentes de liderazgo técnico, backend, frontend, QA, seguridad y DevOps, con normas, hooks y flujo de PR.",
        "Creé el programa de capacitación en sistemas (manuales, videos y guías) y los reportes de tickets.",
        "Doy soporte técnico y gestiono incidencias: diagnóstico, seguimiento y resolución.",
      ],
    },
    {
      company: "Mubea",
      companyNote: "industria automotriz",
      location: "Apaseo el Grande, Gto.",
      role: "Practicante de IT Support",
      period: "ene 2025 – ago 2025",
      summary: "Prácticas profesionales en el área de TI de la planta.",
      achievements: [
        "Atendí incidencias de hardware, software y conectividad de usuarios corporativos en planta.",
        "Administré cuentas en Active Directory: altas, cuentas ejecutivas, contraseñas y perfiles.",
        "Configuré puntos de acceso y nodos de red, y apoyé en el análisis de la infraestructura.",
        "Realicé respaldo y recuperación de información.",
      ],
    },
  ],
  projects: [
    {
      name: "DiosesmonDex",
      status: "Destacado",
      period: "ago – oct 2026",
      summary:
        "Pokédex colaborativa del servidor de Cobblemon Diosesmon: la comunidad documenta, verifica y comparte dónde aparece cada Pokémon.",
      details: [
        "Login con Discord OAuth2, aportes con evidencias, moderación e historial, API pública versionada con OpenAPI y rate-limit, bots de Discord, webhooks, chat en tiempo real (SSE), ranking y logros, panel de administración y mapa de biomas.",
        "Por qué: darle a mi comunidad una fuente de datos verificada.",
        "Qué aprendí: a desarrollar con agentes de IA y a llevar un proyecto por fases con documentación, pruebas y despliegue.",
      ],
      stack: ["React 18", "TypeScript", "Vite", "Node/Express", "PostgreSQL (Neon)", "SQLite", "Vitest", "Render"],
      facts: [
        "823 especies con datos reales de aparición (rango 1–1013)",
        "247 pruebas automatizadas",
        "Fases 2 a 8 (de MVP a API pública y bots) completadas del 3 al 5 de ago 2026",
      ],
      link: { label: "Ver sitio", href: "https://diosesmondex.onrender.com" },
    },
    {
      name: "Traductor de lenguaje de señas",
      status: "Prototipo",
      summary:
        "Detecta posiciones y movimientos de las manos con Python y OpenCV y los convierte en texto y voz (TTS).",
      details: ["Funcional como prototipo; no terminado."],
      stack: ["Python", "OpenCV", "TTS"],
    },
    {
      name: "Portafolio",
      status: "En mejora",
      summary: "Este sitio: monorepo con Next.js, NestJS, Prisma, PostgreSQL, Docker y CI.",
      details: [],
      stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Docker", "CI"],
      link: { label: "Ver repositorio", href: "https://github.com/Samarisco/portfolio-enterprise" },
    },
  ],
  skills: [
    {
      area: "Desarrollo asistido por IA y diseño de flujos multiagente (Claude Code, OpenCode)",
      level: "Avanzado",
    },
    { area: "Soporte TI, Active Directory, redes, respaldo y recuperación", level: "Intermedio" },
    { area: "Docker, Git/GitHub, PowerShell, Windows 11", level: "Intermedio" },
    { area: "Python (OpenCV)", level: "Intermedio" },
    {
      area: "JavaScript/TypeScript, React, Node/Express",
      level: "Intermedio para leer, depurar e integrar; básico para escribir desde cero sin IA",
    },
    { area: "SQL (PostgreSQL, SQLite)", level: "Intermedio para leer, depurar e integrar" },
    { area: "MongoDB", level: "Básico" },
    { area: "Java / Spring Boot", level: "Básico (cursos)" },
  ],
  agentSystem: {
    title: "Mi sistema de ingeniería multiagente",
    caption:
      "Lo diseñé para programar con IA: un coordinador reparte cada pedido entre agentes especialistas, con normas, hooks y flujo de PR.",
    coordinator: {
      id: "coordinador",
      role: "Recibe el pedido, reparte el trabajo y lo entrega como pull request.",
    },
    agents: [
      { id: "lead", role: "Liderazgo técnico: arma el plan." },
      { id: "backend", role: "Implementa APIs y datos." },
      { id: "frontend", role: "Implementa la interfaz." },
      { id: "devops", role: "Prepara infraestructura y despliegue." },
      { id: "qa", role: "Verifica el resultado al final." },
      { id: "seguridad", role: "Revisa permisos, datos y dependencias." },
    ],
    output: "pull request",
  },
  aiWorkflow:
    "Cómo trabajo con IA: entiendo los procesos, sé qué pedir en cada situación, comprendo cada solución y corrijo a la IA cuando se equivoca.",
  education: [
    {
      title: "Ingeniería en Sistemas Computacionales",
      institution: "Universidad Virtual del Estado de Guanajuato (UVEG)",
      period: "2023 – mayo 2026",
      detail: "Carrera concluida, con constancia de terminación y cédula profesional temporal; título en trámite.",
    },
    {
      title: "ONE Tech Foundation G8 – Back-End",
      institution: "Alura Latam (Oracle Next Education)",
      period: "ene 2024 – ago 2025",
      courses: [
        "Formación Java Web: aplicaciones con Spring Boot",
        "Spring AI: integración de una aplicación con OpenAI",
        "ChatGPT: optimizando la calidad de los resultados",
        "Practicando con Java: Challenge Conversor de Monedas",
      ],
    },
  ],
  languages:
    "Español: nativo · Inglés: intermedio en lectura y documentación técnica; sigo aprendiendo. Sin certificado.",
};
