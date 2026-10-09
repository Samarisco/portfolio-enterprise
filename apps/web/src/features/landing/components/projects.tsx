import { ArrowUpRight } from "lucide-react";
import { perfil, type LandingProject } from "../data/perfil";
import { Section } from "./section";

export function Projects() {
  const [featured, ...rest] = perfil.projects;

  return (
    <Section id="proyectos" title="Proyectos" kicker="1 en línea · 1 prototipo · este sitio">
      <div className="projects">
        {featured ? <ProjectCard project={featured} featured /> : null}
        <div className="projects__grid">
          {rest.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}

interface ProjectCardProps {
  readonly project: LandingProject;
  readonly featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const statusClass =
    project.status === "Prototipo"
      ? "status status--warn"
      : project.status === "En mejora"
        ? "status status--outline"
        : "status";

  return (
    <article className={`project${featured ? " project--featured" : ""}`}>
      <div className="project__top">
        <span className={statusClass}>{project.status}</span>
        {project.period ? <span className="project__period">{project.period}</span> : null}
      </div>

      <h3 className="project__name">{project.name}</h3>
      <p className="project__summary">{project.summary}</p>

      {project.details.length > 0 ? (
        <div className="project__details">
          {project.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>
      ) : null}

      {project.facts ? (
        <div className="readout">
          <ul className="readout__list">
            {project.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <p className="readout__source">fuente: repositorio</p>
        </div>
      ) : null}

      <ul className="stack" aria-label={`Tecnologías de ${project.name}`}>
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      {project.link ? (
        <a href={project.link.href} target="_blank" rel="noreferrer" className="project__link">
          {project.link.label}
          <span className="sr-only">: {project.name} (se abre en otra pestaña)</span>
          <ArrowUpRight className="project__link-icon" aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}
