import type { ReactNode } from "react";

interface SectionProps {
  readonly id: string;
  readonly title: string;
  /** Dato breve y verdadero sobre el contenido (rango de fechas, conteo…). */
  readonly kicker: string;
  readonly intro?: string;
  readonly children: ReactNode;
}

/** Sección de la landing: título fijo a la izquierda en escritorio y contenido a la derecha. */
export function Section({ id, title, kicker, intro, children }: SectionProps) {
  const headingId = `${id}-titulo`;

  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <div className="section__head">
        <p className="section__kicker">{kicker}</p>
        <h2 id={headingId} className="section__title">
          {title}
        </h2>
        {intro ? <p className="section__intro">{intro}</p> : null}
      </div>
      <div className="section__body">{children}</div>
    </section>
  );
}
