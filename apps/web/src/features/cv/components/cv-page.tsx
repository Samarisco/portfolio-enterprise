import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@portfolio/ui/components/button";
import type { CvLink, CvLocale } from "../data/cv";
import { cvByLocale, cvLocales } from "../data/locales";
import { PrintButton } from "./print-button";
import "./cv.css";

interface CvPageProps {
  readonly locale: CvLocale;
}

export function CvPage({ locale }: CvPageProps) {
  const cv = cvByLocale[locale];
  const { labels } = cv;

  return (
    <div className="cv-root" lang={cv.lang} data-cv-root>
      <div className="cv-toolbar" role="region" aria-label={labels.toolbar}>
        <Link href="/" className="cv-toolbar__back">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {labels.back}
        </Link>
        <div className="cv-toolbar__actions">
          <nav className="cv-lang" aria-label={labels.languageSwitcher}>
            {cvLocales.map((code) => {
              const target = cvByLocale[code];
              const current = code === locale;
              return (
                <Link
                  key={code}
                  href={target.path}
                  hrefLang={target.lang}
                  lang={target.lang}
                  title={target.languageName}
                  aria-current={current ? "page" : undefined}
                  className="cv-lang__link"
                >
                  {target.languageCode}
                </Link>
              );
            })}
          </nav>
          <PrintButton label={labels.print} />
          <Button asChild size="sm">
            <a href={cv.pdfUrl} download>
              <Download className="size-4" aria-hidden="true" />
              {labels.download}
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
            {cv.locationNote ? (
              <span className="cv-contact__item">
                <Separator />
                {cv.locationNote}
              </span>
            ) : null}
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

        <section className="cv-section" aria-labelledby="cv-summary">
          <h2 id="cv-summary" className="cv-section__title">
            {labels.sections.summary}
          </h2>
          <p className="cv-summary">{cv.summary}</p>
        </section>

        <section className="cv-section" aria-labelledby="cv-experience">
          <h2 id="cv-experience" className="cv-section__title">
            {labels.sections.experience}
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

        <section className="cv-section" aria-labelledby="cv-projects">
          <h2 id="cv-projects" className="cv-section__title">
            {labels.sections.projects}
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

        <section className="cv-section" aria-labelledby="cv-skills">
          <h2 id="cv-skills" className="cv-section__title">
            {labels.sections.skills}
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

        <section className="cv-section" aria-labelledby="cv-education">
          <h2 id="cv-education" className="cv-section__title">
            {labels.sections.education}
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

        <section className="cv-section" aria-labelledby="cv-languages">
          <h2 id="cv-languages" className="cv-section__title">
            {labels.sections.languages}
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
