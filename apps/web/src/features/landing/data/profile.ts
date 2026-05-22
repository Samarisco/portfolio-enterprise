export const profile = {
  personal: {
    name: "Juan Samael Amaral Bravo",
    role: "Ingeniero en Sistemas Computacionales | Soporte TI | Infraestructura | IA ",
    location: "Apaseo el Grande, Guanajuato, Mexico",
    availability: "Buscando oportunidades Jr., trainee o entry-level en frontend o desarrollo full stack con enfoque en IA aplicada y automatización.",
    headline: "Frontend Developer | IA & Automatización",
    summary:
      "Profesional en formación en Ingeniería en Sistemas Computacionales con experiencia en soporte técnico corporativo, infraestructura TI y transformación digital en entornos empresariales e industriales. He participado en la resolución de incidencias, mantenimiento de sistemas, administración de equipos y optimización de procesos tecnológicos, desarrollando una sólida capacidad para adaptarme a distintos escenarios técnicos y operativos. Apasionado por el desarrollo frontend, la automatización y la inteligencia artificial aplicada a soluciones reales, con interés en crear experiencias digitales modernas, eficientes y funcionales. Me caracterizo por un enfoque autodidacta, pensamiento analítico y orientación a la resolución de problemas complejos mediante el uso de tecnologías innovadoras.",
    email: "Amaral.Samael@Outlook.com",
    githubUrl: "https://github.com/Samarisco",
    linkedinUrl: "https://www.linkedin.com/in/samaelamaral",
    resumeUrl: "https://samael-dev.vercel.app",
  },
  navigation: [
    { label: "Experiencia", href: "#experience" },
    { label: "Proyectos", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Contacto", href: "#contact" },
  ],
  stats: [
    { label: "Rol objetivo", value: "Full Stack Jr." },
    { label: "Stack principal", value: "Node + React" },
    { label: "Base tecnica", value: "TS + REST + SQL" },
    { label: "Diferencial", value: "IA aplicada" },
  ],
  experience: [
    {
      role: "Desarrollador frontend en formacion",
      company: "Proyectos personales y portfolio enterprise",
      period: "2025 - Presente",
      summary:
        "Desarrollo proyectos personales con enfoque profesional para practicar arquitectura modular, APIs REST, interfaces responsive, bases de datos relacionales, Docker y buenas practicas de ingenieria.",
      achievements: [
        "Construyo un monorepo full stack con Next.js, NestJS, Prisma, PostgreSQL, TailwindCSS y paquetes compartidos.",
        "Aplico TypeScript, separacion de responsabilidades, DTOs, validacion de datos y estructura modular para mantener codigo claro.",
        "Integro pruebas basicas con Vitest, smoke tests con Playwright y documentacion tecnica para simular un flujo de trabajo real.",
      ],
    },
    {
      role: "Soporte tecnico e infraestructura TI",
      company: "MUBEA",
      period: "Ene 2025 - Jul 2025",
      summary:
        "Experiencia resolviendo problemas tecnicos, dando soporte a usuarios y entendiendo necesidades operativas. Esta base me ayuda a desarrollar software con criterio practico y orientado a usuarios reales.",
      achievements: [
        "Atencion y diagnostico de incidentes tecnicos con enfoque en causa raiz, comunicacion clara y seguimiento.",
        "Apoyo en infraestructura TI, configuracion de equipos y resolucion de problemas en ambientes de trabajo reales.",
        "Desarrollo una vision practica sobre automatizacion, mejora continua y tecnologia aplicada a procesos industriales.",
      ],
    },

  ],
  projects: [
    {
      name: "Portfolio Enterprise",
      status: "En desarrollo",
      stack: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
      summary:
        "Portfolio full stack construido como producto SaaS: frontend premium, API modular, Prisma, Docker, testing basico, CI y documentacion tecnica. El objetivo es demostrar criterio de ingenieria mas alla de una landing estatica.",
      links: {
        github: "https://github.com/samarisco/portfolio-enterprise",
      },
    },
    {
      name: "Plataforma CMS 3D para Portfolios Industriales",
      status: "En desarrollo",
      stack: ["NestJS", "TypeScript", "REST API", "CMS Ready", "PostgreSQL", "Prisma ORM"],
      summary:
        "Backend modular orientado a portfolios premium con visualización 3D interactiva, gestión dinámica de proyectos y arquitectura escalable para experiencias web modernas y cinematográficas.",
      links: {
        github: "https://github.com/samarisco",
      },
    },
    {
      name: "Dashboard responsive",
      status: "En desarrollo",
      stack: ["React", "Next.js", "TailwindCSS", "TypeScript", "Vitest"],
      summary:
        "Interfaz tipo dashboard para practicar componentes reutilizables, estados de UI, responsive design, accesibilidad basica y pruebas unitarias sobre logica de interfaz.",
      links: {
        github: "https://github.com/samarisco",
      },
    },
  ],
  languages: [
     {
      name: "HTML / CSS / TailwindCSS",
      icon: "UI",
      level: "Principal",
      detail: "Semantica, accesibilidad, responsive design, tokens visuales y componentes reutilizables.",
    },
     {
      name: "React / Next.js",
      icon: "RE",
      level: "Practico",
      detail: "Componentes, routing, layouts, responsive UI y renderizado orientado a performance.",
    },
    {
      name: "TypeScript",
      icon: "TS",
      level: "Practico",
      detail: "Tipado, contratos, frontend con React/Next.js y backend con NestJS.",
    },
    {
      name: "JavaScript",
      icon: "JS",
      level: "Solido",
      detail: "Fundamentos del lenguaje, asincronia, modulos, APIs y tooling moderno.",
    },

    {
      name: "Node.js / NestJS",
      icon: "ND",
      level: "Practico",
      detail: "APIs REST, modulos, DTOs, validacion, servicios y estructura backend mantenible.",
    },
    {
      name: "PostgreSQL / Prisma",
      icon: "DB",
      level: "Practico",
      detail: "Modelado relacional, consultas, ORM, migraciones y persistencia de datos.",
    },
    {
      name: "Docker / Git",
      icon: "DV",
      level: "Base practica",
      detail: "Contenedores locales, control de versiones, flujo de ramas y preparacion para CI/CD.",
    },
    {
      name: "Python",
      icon: "PY",
      level: "Basico",
      detail: "Scripts, automatizacion, fundamentos y exploracion de IA/vision por computadora.",
    },
    {
      name: "Vitest",
      icon: "QA",
      level: "Basico",
      detail: "Pruebas unitarias iniciales para validar logica y proteger cambios pequenos.",
    },
  ],
  futureProjects: [
    {
      name: "Computer Vision Quality Check",
      timeline: "Roadmap 2026",
      summary:
        "Prototipo con Python y vision por computadora para detectar patrones visuales simples en un flujo inspirado en procesos industriales.",
    },
    {
      name: "AI Knowledge Base",
      timeline: "Roadmap 2026",
      summary:
        "Base de conocimiento para notas tecnicas con busqueda, etiquetas, panel admin y exploracion responsable de IA aplicada.",
    },
    {
      name: "Automation Ops Dashboard",
      timeline: "Roadmap 2026",
      summary:
        "Dashboard para visualizar eventos, tareas automatizadas y metricas operativas usando APIs REST, PostgreSQL y una UI enfocada en claridad.",
    },
  ],
} as const;
