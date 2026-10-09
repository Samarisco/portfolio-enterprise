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
  description:
    "Especialista en Sistemas y Automatización · Frappe · Desarrollo asistido por IA. Busco roles de especialista en sistemas, soporte N2, automatización TI y desarrollo Frappe/ERPNext.",
  /** Única fuente de la navegación de la landing. */
  navigation,
} as const;
