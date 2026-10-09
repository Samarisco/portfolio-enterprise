import { ArrowRight, MapPin } from "lucide-react";
import { perfil } from "../data/perfil";
import { AgentGraph } from "./agent-graph";
import { Sparkle } from "./decor";

/* Cada línea del titular es un plano distinto: invertido, limpio y cian. */
const LINE_STYLES = ["hero__line--plane", "hero__line--plain", "hero__line--pop"] as const;

export function Hero() {
  const { personal, agentSystem } = perfil;
  const lines = personal.headlineLines;

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-titulo">
      <div className="hero__slash" aria-hidden="true" />

      <div className="hero__copy">
        <p className="hero__role reveal" style={{ animationDelay: "0ms" }}>
          {personal.currentRole}
        </p>

        <h1 id="hero-titulo" className="hero__title">
          {lines.map((line, index) => (
            <span
              key={line}
              className={`hero__line ${LINE_STYLES[index % LINE_STYLES.length] ?? ""}`}
              style={{ animationDelay: `${120 + index * 110}ms` }}
            >
              <span className="hero__line-text">{line}</span>
              {index === lines.length - 1 ? null : " "}
            </span>
          ))}
          <Sparkle className="hero__spark hero__spark--a" />
          <Sparkle className="hero__spark hero__spark--b" />
        </h1>

        <div className="hero__text reveal" style={{ animationDelay: "480ms" }}>
          <p>{personal.summary}</p>
          <p>{personal.targetRoles}</p>
        </div>

        <div className="hero__actions reveal" style={{ animationDelay: "560ms" }}>
          <a href={personal.cvUrl} className="button">
            <span className="button__label">
              Ver CV
              <ArrowRight className="button__icon" aria-hidden="true" />
            </span>
          </a>
          <a href="#contacto" className="button button--ghost">
            <span className="button__label">Contacto</span>
          </a>
        </div>

        <p className="hero__meta reveal" style={{ animationDelay: "640ms" }}>
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
