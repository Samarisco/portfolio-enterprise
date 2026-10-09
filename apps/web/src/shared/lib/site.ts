export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

const navigation: readonly NavigationItem[] = [
  { label: "Experiencia", href: "#experiencia" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Estudios", href: "#estudios" },
  { label: "Contacto", href: "#contacto" },
];

export const siteConfig = {
  name: "Samael Amaral",
  /** Dominio canónico (design doc §11, decisión 1). */
  url: "https://portfolio-enterprise-web.vercel.app",
  /** Titular de posicionamiento, igual al `h1` de la landing. */
  headline: "Sistemas, automatización e IA aplicada",
  /** Rutas públicas que van al sitemap. */
  routes: ["/", "/cv", "/cv/en"],
  description:
    "Sistemas, automatización e IA aplicada. Busco roles de especialista en sistemas, soporte N2, automatización TI y desarrollo asistido por IA.",
  /** Única fuente de la navegación de la landing. */
  navigation,
} as const;
