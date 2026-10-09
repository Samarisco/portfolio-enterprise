import { perfil } from "../data/perfil";
import { Section } from "./section";

export function Experience() {
  return (
    <Section
      id="experiencia"
      title="Experiencia"
      kicker="ene 2025 – oct 2026"
      intro="Soporte, sistemas y automatización en empresas de Apaseo el Grande, Guanajuato."
    >
      <ol className="log">
        {perfil.experience.map((job) => (
          <li key={`${job.company}-${job.role}`} className="log__entry">
            <p className="log__period">{job.period}</p>
            <article className="log__body">
              <h3 className="log__role">{job.role}</h3>
              <p className="log__company">
                {job.company}
                {job.companyNote ? <span> · {job.companyNote}</span> : null}
                <span> · {job.location}</span>
              </p>
              <p className="log__summary">{job.summary}</p>
              <ul className="log__achievements">
                {job.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
