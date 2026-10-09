import { siteConfig } from "@/shared/lib/site";
import { perfil } from "../data/perfil";
import { Sparkle } from "./decor";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { personal } = perfil;

  return (
    <header className="site-header">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <nav className="site-header__bar" aria-label="Navegación principal">
        <a href="#inicio" className="site-header__brand" aria-label={`${personal.name}, inicio`}>
          <Sparkle className="site-header__mark" />
          <span>{personal.name}</span>
        </a>

        <ul className="site-header__links">
          {siteConfig.navigation.map((item) => (
            <li key={item.href}>
              <a className="nav-tag" href={item.href}>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="site-header__actions">
          <ThemeToggle />
          <a href={personal.cvUrl} className="button button--small">
            <span className="button__label">Ver CV</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
