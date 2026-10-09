import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Download, FileText, Mail } from "lucide-react";
import { perfil } from "../data/perfil";

interface ContactLink {
  readonly label: string;
  readonly href: string;
  readonly icon: LucideIcon;
  /** Texto solo para lectores de pantalla, antes de la etiqueta visible. */
  readonly srPrefix?: string;
  readonly external?: boolean;
  readonly primary?: boolean;
}

export function Contact() {
  const { personal } = perfil;

  const links: readonly ContactLink[] = [
    {
      label: personal.email,
      href: `mailto:${personal.email}`,
      icon: Mail,
      srPrefix: "Correo: ",
      primary: true,
    },
    { label: "LinkedIn", href: personal.linkedinUrl, icon: ArrowUpRight, external: true },
    { label: "GitHub", href: personal.githubUrl, icon: ArrowUpRight, external: true },
    { label: "Ver CV", href: personal.cvUrl, icon: FileText },
    { label: "Descargar CV", href: personal.resumeUrl, icon: Download, external: true },
  ];

  return (
    <section id="contacto" className="contact" aria-labelledby="contacto-titulo">
      <div className="contact__head">
        <h2 id="contacto-titulo" className="contact__title">
          Contacto
        </h2>
        <p className="contact__line">¿Un proceso que automatizar o un sistema que montar? Escríbeme.</p>
      </div>

      <ul className="chips">
        {links.map(({ label, href, icon: Icon, srPrefix, external, primary }) => (
          <li key={href}>
            <a
              href={href}
              className={`chip${primary ? " chip--primary" : ""}`}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {srPrefix ? <span className="sr-only">{srPrefix}</span> : null}
              <span>{label}</span>
              <Icon className="chip__icon" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <p className="contact__alt">
        <span lang="en">English:</span>{" "}
        <a className="link-underline" href={personal.cvEnUrl}>
          CV en inglés
        </a>
        <span aria-hidden="true"> · </span>
        <a className="link-underline" href={personal.resumeEnUrl} target="_blank" rel="noreferrer">
          PDF en inglés
        </a>
      </p>
    </section>
  );
}
