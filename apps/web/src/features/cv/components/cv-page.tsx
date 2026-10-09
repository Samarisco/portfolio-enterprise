import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@portfolio/ui/components/button";
import { CV_PDF_URL, cv, type CvLink } from "../data/cv";
import { PrintButton } from "./print-button";
import "./cv.css";

export function CvPage() {
  return (
    <div className="cv-root" lang="es-MX" data-cv-root>
      <div className="cv-toolbar" role="region" aria-label="Acciones del CV">
        <Link href="/" className="cv-toolbar__back">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al portafolio
        </Link>
        <div className="cv-toolbar__actions">
          <PrintButton />
          <Button asChild size="sm">
            <a href={CV_PDF_URL} download>
              <Download className="size-4" aria-hidden="true" />
              Descargar PDF
            </a>
          </Button>
        </div>
      </div>

      <main className="cv-sheet">
        <header className="cv-header">
          <h1 className="cv-name">{cv.name}</h1>
          <p className="cv-headline">{cv.headline}</p>
          <address className="cv-contact">
            <span>{cv.location}</span>
            <Separator />
            <a href={`mailto:${cv.email}`}>{cv.email}</a>
            {cv.links.map((link) => (
              <span key={link.href} className="cv-contact__item">
                <Separator />
                <ExternalLink link={link} />
              </span>
            ))}
          </address>
        </header>

        <section className="cv-section" aria-labelledby="cv-perfil">
          <h2 id="cv-perfil" className="cv-section__title">
            Perfil
          </h2>
          <p className="cv-summary">{cv.summary}</p>
        </section>

        <section className="cv-section" aria-labelledby="cv-experiencia">
          <h2 id="cv-experiencia" className="cv-section__title">
            Experiencia
          </h2>
          {cv.experience.map((job) => (
            <article key={job.company} className="cv-entry">
              <div className="cv-entry__head">
                <h3 className="cv-entry__title">
                  {job.company}
                  {job.companyNote ? (
                    <span className="cv-entry__note"> ({job.companyNote})</span>
                  ) : null}
                </h3>
                <span className="cv-entry__meta">{job.location}</span>
              </div>
              {job.positions.map((position) => (
                <div key={position.title} className="cv-entry__head cv-entry__head--sub">
                  <p className="cv-entry__role">{position.title}</p>
                  <span className="cv-entry__meta">{position.period}</span>
                </div>
              ))}
              <ul className="cv-list">
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="cv-section" aria-labelledby="cv-proyectos">
          <h2 id="cv-proyectos" className="cv-section__title">
            Proyectos
          </h2>
          {cv.projects.map((project) => (
            <article key={project.name} className="cv-entry">
              <div className="cv-entry__head">
                <h3 className="cv-entry__title">
                  {project.name}
                  {project.link ? (
                    <>
                      <span className="cv-entry__note"> — </span>
                      <ExternalLink link={project.link} className="cv-entry__link" />
                    </>
                  ) : null}
                </h3>
                <span className="cv-entry__meta">{project.meta}</span>
              </div>
              <ul className="cv-list">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="cv-section" aria-labelledby="cv-habilidades">
          <h2 id="cv-habilidades" className="cv-section__title">
            Habilidades
          </h2>
          <dl className="cv-skills">
            {cv.skills.map((group) => (
              <div key={group.label} className="cv-skills__row">
                <dt>{group.label}:</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-section" aria-labelledby="cv-educacion">
          <h2 id="cv-educacion" className="cv-section__title">
            Educación y certificaciones
          </h2>
          {cv.education.map((item) => (
            <article key={item.title} className="cv-entry cv-entry--compact">
              <div className="cv-entry__head">
                <h3 className="cv-entry__title">
                  {item.title}
                  <span className="cv-entry__note"> — {item.institution}</span>
                </h3>
                <span className="cv-entry__meta">{item.period}</span>
              </div>
              <p className="cv-entry__detail">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="cv-section" aria-labelledby="cv-idiomas">
          <h2 id="cv-idiomas" className="cv-section__title">
            Idiomas
          </h2>
          <p className="cv-summary">{cv.languages}</p>
        </section>
      </main>
    </div>
  );
}

function Separator() {
  return (
    <span className="cv-contact__sep" aria-hidden="true">
      ·
    </span>
  );
}

interface ExternalLinkProps {
  readonly link: CvLink;
  readonly className?: string;
}

function ExternalLink({ link, className }: ExternalLinkProps) {
  return (
    <a href={link.href} target="_blank" rel="noreferrer" className={className}>
      {link.label}
    </a>
  );
}
