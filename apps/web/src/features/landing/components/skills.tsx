import { perfil, type SkillLevel } from "../data/perfil";
import { Section } from "./section";

const TIERS = 3;

/** Nivel principal (1 Básico, 2 Intermedio, 3 Avanzado) para el indicador visual. */
function tierOf(level: SkillLevel): number {
  if (level.startsWith("Avanzado")) {
    return 3;
  }

  return level.startsWith("Intermedio") ? 2 : 1;
}

export function Skills() {
  return (
    <Section id="habilidades" title="Habilidades" kicker="nivel real, tal cual">
      <p className="pull-quote">{perfil.aiWorkflow}</p>

      <table className="skills">
        <caption className="sr-only">Habilidades y nivel real</caption>
        <thead>
          <tr>
            <th scope="col">Área</th>
            <th scope="col">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {perfil.skills.map((skill) => {
            const tier = tierOf(skill.level);

            return (
              <tr key={skill.area}>
                <th scope="row">{skill.area}</th>
                <td>
                  <span className="meter" aria-hidden="true">
                    {Array.from({ length: TIERS }, (_, index) => (
                      <span key={index} data-on={index < tier ? "true" : undefined} />
                    ))}
                  </span>
                  <span className="skills__level">{skill.level}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
}
