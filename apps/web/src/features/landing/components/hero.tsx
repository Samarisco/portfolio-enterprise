import { ArrowRight, MapPin } from "lucide-react";
import { perfil } from "../data/perfil";
import { AgentGraph } from "./agent-graph";

export function Hero() {
  const { personal, agentSystem } = perfil;
  const lines = personal.headlineLines;
  const lastIndex = lines.length - 1;

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-titulo">
      <div className="hero__copy">
        <p className="hero__role reveal" style={{ animationDelay: "0ms" }}>
          <span className="hero__role-dot" aria-hidden="true" />
          {personal.currentRole}
        </p>

        <h1 id="hero-titulo" className="hero__title">
          {lines.map((line, index) => (
            <span
              key={line}
              className={`hero__line reveal${index === lastIndex ? " hero__line--accent" : ""}`}
              style={{ animationDelay: `${80 + index * 90}ms` }}
            >
              {line}
              {index === lastIndex ? (
                <svg className="hero__trace" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M2 16 H120 L132 6 H196 L206 18 H298" pathLength={100} />
                </svg>
              ) : null}
              {index === lastIndex ? null : " "}
            </span>
          ))}
        </h1>

        <div className="hero__text reveal" style={{ animationDelay: "380ms" }}>
          <p>{personal.summary}</p>
          <p>{personal.targetRoles}</p>
        </div>

        <div className="hero__actions reveal" style={{ animationDelay: "460ms" }}>
          <a href={personal.cvUrl} className="button">
            Ver CV
            <ArrowRight className="button__icon" aria-hidden="true" />
          </a>
          <a href="#contacto" className="button button--ghost">
            Contacto
          </a>
        </div>

        <p className="hero__meta reveal" style={{ animationDelay: "540ms" }}>
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span>
            {personal.location} · {personal.availability}
          </span>
        </p>
      </div>

      <div className="hero__visual">
        <AgentGraph system={agentSystem} />
      </div>
    </section>
  );
}
