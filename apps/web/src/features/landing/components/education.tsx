import { perfil } from "../data/perfil";
import { Section } from "./section";

export function Education() {
  return (
    <Section id="estudios" title="Estudios" kicker="carrera y formación" intro={perfil.languages}>
      <ol className="log log--compact">
        {perfil.education.map((item) => (
          <li key={item.title} className="log__entry">
            <p className="log__period">{item.period}</p>
            <article className="log__body">
              <h3 className="log__role">{item.title}</h3>
              <p className="log__company">{item.institution}</p>
              {item.detail ? <p className="log__summary">{item.detail}</p> : null}
              {item.courses ? (
                <ul className="log__achievements">
                  {item.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
