"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import type { LandingAgentSystem } from "../data/perfil";

/** Tiempo que cada agente queda activo en el recorrido automático. */
const STEP_MS = 2400;
const CENTER = 50;
const RADIUS = 37;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
/* En el servidor se asume movimiento reducido: el botón de pausa aparece al hidratar. */
const getServerReducedMotion = () => true;

interface Point {
  readonly x: number;
  readonly y: number;
}

/** Posiciones en un hexágono alrededor del coordinador, empezando arriba y en sentido horario. */
function agentPosition(index: number, total: number): Point {
  const angle = ((-90 + (360 / total) * index) * Math.PI) / 180;

  return {
    x: Math.round((CENTER + RADIUS * Math.cos(angle)) * 100) / 100,
    y: Math.round((CENTER + RADIUS * Math.sin(angle)) * 100) / 100,
  };
}

interface AgentGraphProps {
  readonly system: LandingAgentSystem;
}

export function AgentGraph({ system }: AgentGraphProps) {
  const { agents, coordinator } = system;
  /* Los agentes son los pasos 0..n-1; el paso n es la entrega del coordinador. */
  const deliveryStep = agents.length;
  const totalSteps = agents.length + 1;

  const [step, setStep] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = rootRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const running = !reducedMotion && !paused && inView && hovered === null;

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setStep((current) => (current + 1) % totalSteps);
      }
    }, STEP_MS);

    return () => window.clearInterval(timer);
  }, [running, totalSteps]);

  const active = hovered ?? step;
  const isDelivery = active === deliveryStep;
  const activeAgent = agents[active];
  const positions = agents.map((_, index) => agentPosition(index, agents.length));

  function select(index: number) {
    setStep(index);
    setHovered(index);
  }

  return (
    <figure
      ref={rootRef}
      className="graph"
      data-running={running ? "true" : "false"}
      aria-labelledby="graph-title"
      aria-describedby="graph-caption"
    >
      <div className="graph__stage">
        <svg className="graph__wires" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <circle className="graph__orbit" cx={CENTER} cy={CENTER} r={RADIUS} />
          <circle className="graph__orbit graph__orbit--inner" cx={CENTER} cy={CENTER} r={RADIUS / 2} />

          {positions.map((point, index) => (
            <line
              key={agents[index]?.id}
              className="graph__edge"
              data-active={active === index || isDelivery ? "true" : undefined}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
            />
          ))}

          {/* Pulso que viaja por la arista activa: hacia el agente o, al entregar, de vuelta. */}
          {positions.map((point, index) =>
            active === index || isDelivery ? (
              <line
                key={`${active}-${agents[index]?.id}`}
                className={`graph__packet${isDelivery ? " graph__packet--inbound" : ""}`}
                x1={CENTER}
                y1={CENTER}
                x2={point.x}
                y2={point.y}
                pathLength={100}
              />
            ) : null,
          )}

          {activeAgent ? (
            <circle
              key={`ping-${active}`}
              className="graph__ping"
              cx={positions[active]?.x}
              cy={positions[active]?.y}
              r={4}
            />
          ) : (
            <circle key="ping-center" className="graph__ping" cx={CENTER} cy={CENTER} r={7} />
          )}
        </svg>

        <button
          type="button"
          className="graph__node graph__node--hub"
          style={{ left: `${CENTER}%`, top: `${CENTER}%` }}
          aria-pressed={isDelivery}
          onClick={() => select(deliveryStep)}
          onMouseEnter={() => setHovered(deliveryStep)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(deliveryStep)}
          onBlur={() => setHovered(null)}
        >
          {coordinator.id}
        </button>

        {agents.map((agent, index) => (
          <button
            key={agent.id}
            type="button"
            className="graph__node"
            style={{
              left: `${positions[index]?.x ?? CENTER}%`,
              top: `${positions[index]?.y ?? CENTER}%`,
              animationDelay: `${240 + index * 90}ms`,
            }}
            aria-pressed={active === index}
            onClick={() => select(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(index)}
            onBlur={() => setHovered(null)}
          >
            {agent.id}
          </button>
        ))}
      </div>

      <div className="graph__readout">
        <p className="graph__route">
          <span>{coordinator.id}</span>
          <span className="graph__arrow" aria-hidden="true">
            →
          </span>
          <span className="graph__target">{activeAgent ? activeAgent.id : system.output}</span>
        </p>
        <p className="graph__role">{activeAgent ? activeAgent.role : coordinator.role}</p>

        <div className="graph__controls">
          <ol className="graph__steps" aria-hidden="true">
            {Array.from({ length: totalSteps }, (_, index) => (
              <li key={index} data-done={index <= active ? "true" : undefined} />
            ))}
          </ol>
          {reducedMotion ? null : (
            <button
              type="button"
              className="graph__pause"
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? (
                <Play className="size-3.5" aria-hidden="true" />
              ) : (
                <Pause className="size-3.5" aria-hidden="true" />
              )}
              {paused ? "Reanudar" : "Pausar"}
              <span className="sr-only"> recorrido</span>
            </button>
          )}
        </div>
      </div>

      <figcaption className="graph__caption">
        <span id="graph-title" className="graph__title">
          {system.title}
        </span>
        <span id="graph-caption">{system.caption}</span>
      </figcaption>
    </figure>
  );
}
