export interface CvLink {
  readonly label: string;
  readonly href: string;
}

export interface CvPosition {
  readonly title: string;
  readonly period: string;
}

export interface CvExperience {
  readonly company: string;
  readonly companyNote?: string;
  readonly location: string;
  readonly positions: readonly CvPosition[];
  readonly highlights: readonly string[];
}

export interface CvProject {
  readonly name: string;
  readonly link?: CvLink;
  readonly meta: string;
  readonly highlights: readonly string[];
}

export interface CvSkillGroup {
  readonly label: string;
  readonly items: string;
}

export interface CvEducation {
  readonly title: string;
  readonly institution: string;
  readonly period: string;
  readonly detail: string;
}

export type CvLocale = "es" | "en";

export interface CvLabels {
  readonly toolbar: string;
  readonly back: string;
  readonly print: string;
  readonly download: string;
  readonly languageSwitcher: string;
  readonly sections: {
    readonly summary: string;
    readonly experience: string;
    readonly projects: string;
    readonly skills: string;
    readonly education: string;
    readonly languages: string;
  };
}

export interface CvData {
  readonly locale: CvLocale;
  /** Valor del atributo `lang` del contenedor del CV. */
  readonly lang: string;
  /** Nombre del idioma en su propio idioma (descripción del enlace del selector). */
  readonly languageName: string;
  /** Texto visible del selector ES/EN. */
  readonly languageCode: string;
  /** Locale de Open Graph (p. ej. `es_MX`). */
  readonly ogLocale: string;
  /** Título de la página (se completa con la plantilla del layout). */
  readonly pageTitle: string;
  /** Descripción para la metadata de la página. */
  readonly pageDescription: string;
  readonly path: string;
  readonly pdfUrl: string;
  readonly labels: CvLabels;
  readonly name: string;
  readonly location: string;
  /** Nota opcional junto a la ubicación (p. ej. disponibilidad para reubicarse). */
  readonly locationNote?: string;
  readonly email: string;
  readonly links: readonly CvLink[];
  readonly headline: string;
  readonly summary: string;
  readonly experience: readonly CvExperience[];
  readonly projects: readonly CvProject[];
  readonly skills: readonly CvSkillGroup[];
  readonly education: readonly CvEducation[];
  readonly languages: string;
}

/** Ruta pública del PDF generado con `pnpm --filter @portfolio/web cv:pdf`. */
export const CV_PDF_URL = "/CV-Samael-Amaral.pdf";

/**
 * Contenido del CV. Página pública: no incluir teléfono ni otros datos personales sensibles.
 */
export const cv: CvData = {
  locale: "es",
  lang: "es-MX",
  languageName: "Español",
  languageCode: "ES",
  ogLocale: "es_MX",
  pageTitle: "CV",
  pageDescription: "Currículum de Juan Samael Amaral Bravo: Especialista en Sistemas y Automatización · Frappe · Desarrollo asistido por IA.",
  path: "/cv",
  pdfUrl: CV_PDF_URL,
  labels: {
    toolbar: "Acciones del CV",
    back: "Volver al portafolio",
    print: "Imprimir",
    download: "Descargar PDF",
    languageSwitcher: "Idioma del CV",
    sections: {
      summary: "Perfil",
      experience: "Experiencia",
      projects: "Proyectos",
      skills: "Habilidades",
      education: "Educación y certificaciones",
      languages: "Idiomas",
    },
  },
  name: "Juan Samael Amaral Bravo",
  location: "Apaseo el Grande, Gto., México",
  email: "Amaral.Samael@Outlook.com",
  links: [
    { label: "linkedin.com/in/samaelamaral", href: "https://www.linkedin.com/in/samaelamaral" },
    { label: "github.com/Samarisco", href: "https://github.com/Samarisco" },
  ],
  headline: "Especialista en Sistemas y Automatización · Frappe · Desarrollo asistido por IA",
  summary:
    "Ingeniero en Sistemas Computacionales y único responsable del área de sistemas en Fast Market, donde construí el sistema de tickets sobre Frappe, las alertas automatizadas por API y la capacitación técnica del equipo. Desarrollo software con agentes de IA siguiendo un flujo propio de planificación, revisión y pruebas. Busco roles de soporte avanzado, automatización e infraestructura.",
  experience: [
    {
      company: "Fast Market",
      location: "Apaseo el Grande, Gto.",
      positions: [
        // PUESTO PENDIENTE DE ACTIVAR (no se renderiza mientras esté comentado).
        // Al activarlo, cambiar el periodo del puesto de Intern a "ago 2026 – oct 2026".
        // {
        //   title: "Especialista en Sistemas y Automatización (México–España)",
        //   period: "nov 2026 – actual",
        // },
        {
          title: "IT Support, Development & Automation Intern (México)",
          period: "ago 2026 – actual",
        },
      ],
      highlights: [
        // BULLET PENDIENTE DE ACTIVAR junto con el puesto de España:
        // "Preparo la infraestructura tecnológica para la expansión a España (Pronto Market).",
        "Diseñé y desarrollé el sistema interno de tickets e incidencias sobre Frappe, adaptado a la operación y preparado para crecer, centralizando el seguimiento de las solicitudes de soporte.",
        "Implementé alertas automatizadas a partir de APIs y monitoreo de sistemas y servicios para detectar incidentes y dar seguimiento a su resolución.",
        "Diseñé un sistema de ingeniería multiagente (coordinador + agentes de liderazgo técnico, backend, frontend, QA, seguridad y DevOps) con normas, hooks y flujo de pull requests para desarrollar con IA de forma controlada.",
        "Creé el programa de capacitación en sistemas (manuales, videos y guías) y los reportes de tickets para estandarizar la operación del área.",
      ],
    },
    {
      company: "Mubea",
      companyNote: "industria automotriz",
      location: "Apaseo el Grande, Gto.",
      positions: [{ title: "Practicante de IT Support", period: "ene 2025 – ago 2025" }],
      highlights: [
        "Atendí incidencias de hardware, software y conectividad de usuarios corporativos en planta, con diagnóstico y seguimiento hasta el cierre.",
        "Administré cuentas en Active Directory: altas, cuentas ejecutivas, restablecimiento de contraseñas y perfiles.",
        "Configuré puntos de acceso y nodos de red y apoyé en el análisis de la infraestructura TI.",
        "Ejecuté respaldos y recuperación de información de equipos de usuario.",
      ],
    },
  ],
  projects: [
    {
      name: "DiosesmonDex",
      link: { label: "diosesmondex.onrender.com", href: "https://diosesmondex.onrender.com" },
      meta: "ago–oct 2026",
      highlights: [
        "Construí una Pokédex colaborativa para una comunidad de Cobblemon con React + TypeScript, Node/Express y PostgreSQL (Neon), desplegada en Render, con 823 especies documentadas con datos reales del servidor.",
        "Desarrollé una API pública versionada con OpenAPI y rate-limit, login con Discord OAuth2, bots de Discord y chat en tiempo real (SSE).",
        "Llevé el proyecto de MVP a plataforma con API pública y bots en 3 días, desarrollando con agentes de IA y respaldado por 247 pruebas automatizadas (Vitest).",
      ],
    },
    {
      name: "Traductor de lenguaje de señas",
      meta: "Python · OpenCV · TTS",
      highlights: [
        "Prototipé la detección de posiciones y movimientos de manos con OpenCV y su conversión a texto y voz mediante Text-to-Speech.",
      ],
    },
  ],
  skills: [
    {
      label: "Sistemas y soporte",
      items:
        "Active Directory, redes (AP, nodos), respaldo y recuperación, Windows 11, PowerShell, monitoreo",
    },
    {
      label: "Desarrollo y automatización",
      items:
        "Frappe, Python, JavaScript/TypeScript, React, Node/Express, SQL (PostgreSQL, SQLite), MongoDB, Docker, Git/GitHub",
    },
    {
      label: "IA aplicada",
      items: "desarrollo con agentes (Claude Code, OpenCode), diseño de flujos multiagente",
    },
  ],
  education: [
    {
      title: "Ingeniería en Sistemas Computacionales",
      institution: "UVEG",
      period: "2023–2026",
      detail: "Carrera concluida; cédula profesional temporal, título en trámite.",
    },
    {
      title: "ONE Tech Foundation G8 – Back-End",
      institution: "Alura Latam",
      period: "ene 2024 – ago 2025",
      detail: "Spring Boot, Spring AI con OpenAI.",
    },
  ],
  languages:
    "Español nativo · Inglés intermedio (lectura y documentación técnica), en aprendizaje continuo.",
};
