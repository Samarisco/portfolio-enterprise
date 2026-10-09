import { siteConfig } from "@/shared/lib/site";
import { perfil } from "../data/perfil";
import { ThemeToggle } from "./theme-toggle";

/** Marca: un nodo central con tres aristas, el mismo lenguaje del grafo del hero. */
function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 16 L16 4 M16 16 L26.4 22 M16 16 L5.6 22" />
      <circle cx="16" cy="16" r="4.5" className="mark__hub" />
      <circle cx="16" cy="4" r="2.5" />
      <circle cx="26.4" cy="22" r="2.5" />
      <circle cx="5.6" cy="22" r="2.5" />
    </svg>
  );
}

export function SiteHeader() {
  const { personal } = perfil;

  return (
    <header className="site-header">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <nav className="site-header__bar" aria-label="Navegación principal">
        <a href="#inicio" className="site-header__brand" aria-label={`${personal.name}, inicio`}>
          <Mark />
          <span>{personal.name}</span>
        </a>

        <ul className="site-header__links">
          {siteConfig.navigation.map((item) => (
            <li key={item.href}>
              <a className="link-underline" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="site-header__actions">
          <ThemeToggle />
          <a href={personal.cvUrl} className="button button--small">
            Ver CV
          </a>
        </div>
      </nav>
    </header>
  );
}
