import { perfil } from "../data/perfil";

export function SiteFooter() {
  const { personal } = perfil;

  return (
    <footer className="site-footer">
      <p>
        {personal.name} · {new Date().getFullYear()}
      </p>
      <a className="link-underline" href={personal.cvUrl}>
        Ver CV
      </a>
    </footer>
  );
}
