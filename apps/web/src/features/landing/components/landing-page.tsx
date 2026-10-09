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
  FileText,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { siteConfig } from "@/shared/lib/site";
import { perfil, type LandingProject } from "../data/perfil";

const iconMap = {
  IA: Sparkles,
  TI: ShieldCheck,
  FR: Blocks,
  DV: GitBranch,
  PY: Terminal,
  JS: Code2,
  DB: Database,
  MG: Database,
  JV: Terminal,
} as const;

type SkillCode = keyof typeof iconMap;

function isSkillCode(code: string): code is SkillCode {
  return code in iconMap;
}

const ctaPrimaryClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)] transition hover:opacity-88 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]";
const ctaSecondaryClass =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] px-5 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]";

export function LandingPage() {
  const { personal } = perfil;

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background)]/82 backdrop-blur-xl">
        <nav
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          <a href="#inicio" className="flex items-center gap-3" aria-label={`${personal.name}, inicio`}>
            <span className="grid size-9 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--surface)]">
              <Blocks className="size-4 text-[color:var(--accent)]" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-normal">{personal.name}</span>
          </a>

          <div className="hidden items-center gap-6 text-sm text-[color:var(--muted)] lg:flex">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                className="transition hover:text-[color:var(--foreground)]"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={personal.cvUrl}
            className="inline-flex h-9 items-center rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] px-3 text-sm font-medium transition hover:bg-[color:var(--surface-strong)]"
          >
            Ver CV
          </a>
        </nav>
      </header>

      <section
        id="inicio"
        className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:pb-24 lg:pt-24"
      >
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-2xl sm:rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 font-mono text-xs text-[color:var(--muted)] backdrop-blur"
          >
            <BriefcaseBusiness className="size-4 shrink-0 text-[color:var(--signal)]" aria-hidden="true" />
            {personal.currentRole}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            className="max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl"
          >
            {personal.headline}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[color:var(--muted)]"
          >
            <p>{personal.summary}</p>
            <p className="mt-3">{personal.targetRoles}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={personal.cvUrl} className={ctaPrimaryClass}>
                Ver CV
              </a>
              <a href="#contacto" className={ctaSecondaryClass}>
                Contacto
              </a>
            </div>
          </motion.div>
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
                  <p className="mt-2 text-2xl font-semibold tracking-normal">{personal.name}</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {personal.availability}
                  </p>
                </div>
                <span className="rounded-full bg-[color:var(--accent)]/12 px-3 py-1 text-sm font-medium text-[color:var(--accent-strong)]">
                  Disponible
                </span>
              </div>
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
        id="experiencia"
        className="border-y border-[color:var(--border)] bg-[color:var(--surface)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="01"
            title="Experiencia"
            copy="Soporte, sistemas y automatización en empresas de Apaseo el Grande, Guanajuato."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {perfil.experience.map((item) => (
              <article
                key={`${item.role}-${item.company}`}
                className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      {item.company}
                      {item.companyNote ? ` (${item.companyNote})` : null} · {item.location}
                    </p>
                  </div>
                  <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)]">
                    <Calendar className="size-4" aria-hidden="true" />
                    {item.period}
                  </span>
                </div>
                <p className="mt-5 leading-7 text-[color:var(--muted)]">{item.summary}</p>
                <ul className="mt-6 grid gap-3">
                  {item.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3">
                      <CheckCircle2
                        className="mt-1 size-4 shrink-0 text-[color:var(--accent)]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-6 text-[color:var(--muted)]">{achievement}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="02"
          title="Proyectos"
          copy="Un proyecto en línea, un prototipo y el propio portafolio."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {perfil.projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <section
        id="habilidades"
        className="border-y border-[color:var(--border)] bg-[color:var(--surface)]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <SectionIntro eyebrow="03" title="Habilidades" copy={perfil.aiWorkflow} />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perfil.skills.map((skill) => {
              const Icon = isSkillCode(skill.code) ? iconMap[skill.code] : Terminal;

              return (
                <article
                  key={skill.area}
                  className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="grid size-12 shrink-0 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] font-mono text-sm font-semibold text-[color:var(--accent-strong)]"
                      aria-hidden="true"
                    >
                      {skill.code}
                    </span>
                    <div>
                      <h3 className="font-semibold">{skill.area}</h3>
                      <p className="mt-1 text-sm text-[color:var(--muted)]">{skill.level}</p>
                    </div>
                    <Icon className="ml-auto size-5 shrink-0 text-[color:var(--accent)]" aria-hidden="true" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="estudios" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="04" title="Estudios" copy={perfil.languages} />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {perfil.education.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{item.institution}</p>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[color:var(--border)] px-3 py-1 text-sm text-[color:var(--muted)]">
                  <GraduationCap className="size-4" aria-hidden="true" />
                  {item.period}
                </span>
              </div>
              {item.detail ? (
                <p className="mt-5 leading-7 text-[color:var(--muted)]">{item.detail}</p>
              ) : null}
              {item.courses ? (
                <ul className="mt-5 grid gap-3">
                  {item.courses.map((course) => (
                    <li key={course} className="flex gap-3">
                      <CheckCircle2
                        className="mt-1 size-4 shrink-0 text-[color:var(--accent)]"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-6 text-[color:var(--muted)]">{course}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section
        id="contacto"
        className="border-t border-[color:var(--border)] bg-[color:var(--foreground)] text-[color:var(--background)]"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.85fr_1fr] lg:px-8">
          <div>
            <h2 className="mt-5 text-3xl font-semibold tracking-normal">Contacto</h2>
            <p className="mt-4 leading-7 text-white/72">{personal.availability}.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContactCard label="Correo" value={personal.email} href={`mailto:${personal.email}`} />
            <ContactCard label="LinkedIn" value="Perfil profesional" href={personal.linkedinUrl} />
            <ContactCard label="GitHub" value="Ver código" href={personal.githubUrl} />
            <ContactCard label="CV" value="Ver CV en línea" href={personal.cvUrl} />
            <ContactCard label="PDF" value="Descargar CV" href={personal.resumeUrl} />
            <ContactCard label="CV en inglés" value="Ver en línea" href={personal.cvEnUrl} />
            <ContactCard label="CV en inglés" value="Descargar PDF" href={personal.resumeEnUrl} />
          </div>
        </div>
      </section>
    </main>
  );
}

interface ProjectCardProps {
  readonly project: LandingProject;
}

function ProjectCard({ project }: ProjectCardProps) {
  const isPrototype = project.status === "Prototipo";

  return (
    <article
      className={`group rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition hover:-translate-y-1 hover:bg-[color:var(--surface-strong)]${
        project.status === "Destacado" ? " lg:col-span-3" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <Code2 className="size-5 text-[color:var(--signal)]" aria-hidden="true" />
        <span
          className={
            isPrototype
              ? "rounded-full border border-[color:var(--signal)] px-3 py-1 text-xs font-medium text-[color:var(--foreground)]"
              : "rounded-full bg-[color:var(--accent)]/12 px-3 py-1 text-xs font-medium text-[color:var(--accent-strong)]"
          }
        >
          {project.status}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold">{project.name}</h3>
      {project.period ? (
        <p className="mt-1 font-mono text-xs text-[color:var(--muted)]">{project.period}</p>
      ) : null}
      <p className="mt-4 leading-7 text-[color:var(--muted)]">{project.summary}</p>
      {project.details.map((detail) => (
        <p key={detail} className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
          {detail}
        </p>
      ))}
      {project.facts ? (
        <div className="mt-6 rounded-md border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-4">
          <ul className="grid gap-2 font-mono text-xs text-[color:var(--foreground)] sm:grid-cols-3">
            {project.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-xs text-[color:var(--muted)]">fuente: repositorio</p>
        </div>
      ) : null}
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
      {project.link ? (
        <a
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent-strong)]"
        >
          {project.link.label}
          <span className="sr-only">: {project.name}</span>
          <ArrowUpRight
            className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      ) : null}
    </article>
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
      <p
        className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent)]"
        aria-hidden="true"
      >
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
  const opensNewTab = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
      className="rounded-md border border-white/12 bg-white/6 p-5 transition hover:bg-white/10"
    >
      <p className="text-sm text-white/62">{label}</p>
      <p className="mt-2 flex items-center gap-2 font-medium">
        {value}
        {href.endsWith(".pdf") ? (
          <FileText className="size-4" aria-hidden="true" />
        ) : (
          <ArrowUpRight className="size-4" aria-hidden="true" />
        )}
      </p>
    </a>
  );
}
