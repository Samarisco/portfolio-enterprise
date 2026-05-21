"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Blocks,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Mail,
  MapPin,
  Rocket,
  Sparkles,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Button } from "@portfolio/ui/components/button";
import { profile } from "../data/profile";

const iconMap = {
  TS: Code2,
  JS: Terminal,
  RE: Blocks,
  ND: Terminal,
  H5: Globe2,
  CSS: Sparkles,
  DB: Database,
  DV: GitBranch,
  PY: Terminal,
  QA: ShieldCheck,
  UI: Sparkles,
} as const;

export function LandingPage() {
  const { personal } = profile;

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background)]/82 backdrop-blur-xl">
        <nav
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8"
          aria-label="Primary navigation"
        >
          <a href="#top" className="flex items-center gap-3" aria-label={`${personal.name} home`}>
            <span className="grid size-9 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--surface)]">
              <Blocks className="size-4 text-[color:var(--accent)]" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-normal">{personal.name}</span>
          </a>

          <div className="hidden items-center gap-6 text-sm text-[color:var(--muted)] lg:flex">
            {profile.navigation.map((item) => (
              <a
                key={item.href}
                className="transition hover:text-[color:var(--foreground)]"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>


        </nav>
      </header>

      <section
        id="top"
        className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:pb-24 lg:pt-24"
      >
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-sm text-[color:var(--muted)] backdrop-blur"
          >
            <Sparkles className="size-4 text-[color:var(--signal)]" aria-hidden="true" />
            {personal.role}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="max-w-4xl text-balance text-5xl font-semibold leading-[1.03] tracking-normal sm:text-6xl lg:text-7xl"
          >
            {personal.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[color:var(--muted)]"
          >
            {personal.summary}
          </motion.p>
        </div>

        <motion.aside
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
          className="relative overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] shadow-2xl shadow-black/10 backdrop-blur"
          aria-label="Resumen profesional"
        >
          <div className="flex h-12 items-center justify-between border-b border-[color:var(--border)] px-4">
            <div className="flex gap-2" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ef4444]" />
              <span className="size-2.5 rounded-full bg-[#f59e0b]" />
              <span className="size-2.5 rounded-full bg-[#10b981]" />
            </div>
            <div className="font-mono text-xs text-[color:var(--muted)]">developer.profile</div>
          </div>

          <div className="grid gap-4 p-4 sm:p-5">
            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[color:var(--muted)]">Perfil</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-normal">{personal.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {personal.availability}
                  </p>
                </div>
                <span className="rounded-full bg-[color:var(--accent)]/12 px-3 py-1 text-sm font-medium text-[color:var(--accent-strong)]">
                  Open
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {profile.stats.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-4"
                >
                  <p className="text-sm text-[color:var(--muted)]">{metric.label}</p>
                  <p className="mt-2 text-xl font-semibold">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium">Contacto directo</p>
                <Mail className="size-4 text-[color:var(--accent)]" aria-hidden="true" />
              </div>
              <ContactLine icon={MapPin} label={personal.location} />
              <ContactLine icon={Mail} label={personal.email} href={`mailto:${personal.email}`} />
              <ContactLine icon={Code2} label="GitHub" href={personal.githubUrl} />
              <ContactLine icon={BriefcaseBusiness} label="LinkedIn" href={personal.linkedinUrl} />
            </div>
          </div>
        </motion.aside>
      </section>

      <section
        id="experience"
        className="border-y border-[color:var(--border)] bg-[color:var(--surface)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Experiencia"
            title="Una historia junior presentada con estructura profesional."
            copy="La experiencia inicial tambien puede comunicar criterio: arquitectura, procesos, calidad y responsabilidad tecnica."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {profile.experience.map((item) => (
              <article
                key={`${item.role}-${item.company}`}
                className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{item.company}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)]">
                    <Calendar className="size-4" aria-hidden="true" />
                    {item.period}
                  </span>
                </div>
                <p className="mt-5 leading-7 text-[color:var(--muted)]">{item.summary}</p>
                <div className="mt-6 grid gap-3">
                  {item.achievements.map((achievement) => (
                    <div key={achievement} className="flex gap-3">
                      <CheckCircle2
                        className="mt-1 size-4 shrink-0 text-[color:var(--accent)]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-6 text-[color:var(--muted)]">{achievement}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Proyectos personales"
          title="Proyectos que muestran aprendizaje aplicado, no solo pantallas bonitas."
          copy="Cada proyecto esta pensado para demostrar una habilidad tecnica concreta: frontend, backend, datos, seguridad, testing o despliegue."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {profile.projects.map((project) => (
            <article
              key={project.name}
              className="group rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition hover:-translate-y-1 hover:bg-[color:var(--surface-strong)]"
            >
              <div className="flex items-center justify-between gap-4">
                <Code2 className="size-5 text-[color:var(--signal)]" aria-hidden="true" />
                <span className="rounded-full bg-[color:var(--accent)]/12 px-3 py-1 text-xs font-medium text-[color:var(--accent-strong)]">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{project.name}</h3>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[color:var(--border)] px-3 py-1 font-mono text-xs text-[color:var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent-strong)]"
              >
                Ver repositorio
                <ArrowUpRight
                  className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        id="skills"
        className="border-y border-[color:var(--border)] bg-[color:var(--surface)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Lenguajes y herramientas"
            title="Stack actual con foco en TypeScript y desarrollo full stack."
            copy="La prioridad es dominar fundamentos solidos y construir sobre ellos: interfaces accesibles, APIs mantenibles y bases de datos bien modeladas."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.languages.map((language) => {
              const Icon = iconMap[language.icon];

              return (
                <article
                  key={language.name}
                  className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] font-mono text-sm font-semibold text-[color:var(--accent-strong)]">
                      {language.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold">{language.name}</h3>
                      <p className="text-sm text-[color:var(--muted)]">{language.level}</p>
                    </div>
                    <Icon className="ml-auto size-5 text-[color:var(--accent)]" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-sm leading-6 text-[color:var(--muted)]">
                    {language.detail}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="roadmap" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Proyectos futuros"
          title="Roadmap publico para mostrar direccion, ambicion y criterio tecnico."
          copy="Esta seccion comunica hacia donde va tu crecimiento profesional y que problemas quieres aprender a resolver."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {profile.futureProjects.map((project) => (
            <article
              key={project.name}
              className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
            >
              <Rocket className="size-5 text-[color:var(--signal)]" aria-hidden="true" />
              <p className="mt-5 font-mono text-sm text-[color:var(--muted)]">{project.timeline}</p>
              <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
              <p className="mt-4 leading-7 text-[color:var(--muted)]">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="border-t border-[color:var(--border)] bg-[color:var(--foreground)] text-[color:var(--background)]"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8">
          <div>
            <h2 className="mt-5 text-3xl font-semibold tracking-normal">
              Disponible para colaborar, aprender y aportar desde el primer sprint.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard label="Email" value={personal.email} href={`mailto:${personal.email}`} />
            <ContactCard label="GitHub" value="Ver codigo" href={personal.githubUrl} />
            <ContactCard label="LinkedIn" value="Perfil profesional" href={personal.linkedinUrl} />
            <ContactCard label="CV" value="Descargar resume" href={personal.resumeUrl} />
          </div>
        </div>
      </section>
    </main>
  );
}

interface SectionIntroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly copy: string;
}

function SectionIntro({ eyebrow, title, copy }: SectionIntroProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">{title}</h2>
      <p className="mt-4 leading-7 text-[color:var(--muted)]">{copy}</p>
    </div>
  );
}

interface ContactLineProps {
  readonly icon: typeof Mail;
  readonly label: string;
  readonly href?: string;
}

function ContactLine({ icon: Icon, label, href }: ContactLineProps) {
  const content = (
    <>
      <Icon className="size-4 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
      <span className="truncate text-sm text-[color:var(--muted)]">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="flex items-center gap-3 border-t border-[color:var(--border)] py-3 first:border-t-0 first:pt-0 last:pb-0"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center gap-3 border-t border-[color:var(--border)] py-3 first:border-t-0 first:pt-0 last:pb-0">
      {content}
    </div>
  );
}

interface ContactCardProps {
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

function ContactCard({ label, value, href }: ContactCardProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
      rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
      className="rounded-md border border-white/12 bg-white/6 p-5 transition hover:bg-white/10"
    >
      <p className="text-sm text-white/62">{label}</p>
      <p className="mt-2 flex items-center gap-2 font-medium">
        {value}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </p>
    </a>
  );
}
