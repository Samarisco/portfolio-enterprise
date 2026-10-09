# Design doc: Rediseño del portafolio público (contenido y dirección visual)

| | |
|---|---|
| Autor | `lead` (agente), para Samael Amaral |
| Revisores | Samael Amaral (responsable) · `seguridad` (datos personales publicados, dependencia nueva de pruebas) |
| Estado | Aprobado con decisiones de §11 (dominio pendiente) |
| Issue | (por crear) |
| Rama base | `feat/cv-imprimible` (PR #1, sin merge todavía) |
| Fuente de verdad | `C:\dev\datos\perfil.md` (actualizado el 2026-10-09) |

## 1. Contexto

La landing (`/`) cuenta otra historia que `perfil.md` y que el CV de PR #1:

- Se presenta como "Frontend Developer Jr.", cuando el eje real es **IT, automatización e IA aplicada**.
- No aparece la experiencia en Fast Market, que hoy es la principal.
- Publica proyectos que `perfil.md` no respalda ("Plataforma CMS 3D", "Dashboard responsive") y
  un "Roadmap 2026" con proyectos que no existen.
- Los niveles de habilidad están inflados o no coinciden con el nivel real ("JavaScript: Sólido",
  "HTML/CSS: Principal").
- Las fechas de Mubea no coinciden (dice "Ene 2025 - Jul 2025"; lo real es ene 2025 – ago 2025).
- Metadata y SEO: `lang="en"`, `og:locale en_US`, `metadataBase` en `portfolio-enterprise.local` y
  palabras clave de frontend.

El CV (`/cv`, `/cv/en`) ya se alineó con `perfil.md`. Si la landing no se corrige, un reclutador
verá dos perfiles distintos.

### 1.1 Estado actual de `apps/web`

- `src/app/page.tsx`: solo renderiza `<LandingPage />`.
- `src/app/layout.tsx`: fuentes Inter y JetBrains Mono, metadata global (ver arriba), `lang="en"`.
- `src/app/globals.css`: Tailwind v4, tokens `--background/--foreground/--accent` (verde azulado
  `#0f766e`) y `--signal` (ámbar), fondo de cuadrícula de 48 px, soporte de `prefers-reduced-motion`.
- `src/features/landing/components/landing-page.tsx` (413 líneas): **un solo Client Component**
  (`"use client"` por Framer Motion) con header fijo, hero con tarjeta tipo "ventana macOS"
  (`developer.profile`) y 4 métricas, y luego las secciones Experiencia, Proyectos, Skills,
  Roadmap y Contacto.
- `src/features/landing/data/profile.ts`: datos de la landing (resumen largo, stats, experiencia,
  proyectos, `languages` con nivel, `futureProjects`).
- `src/shared/lib/site.ts` (+ `site.spec.ts`): navegación duplicada con `profile.navigation`.
- `src/features/cv/*`: CV imprimible ES/EN con datos tipados (`cv.ts`, `cv.en.ts`), metadata y
  hreflang (`locales.ts`) y pruebas (`cv.spec.ts`, `e2e/cv.spec.ts`).
- `e2e/landing.spec.ts`: comprueba el titular viejo ("Desarrollador Frontend Jr. …"), el texto
  "Proyectos personales" y el heading "TypeScript". Habrá que reescribirla.
- `packages/ui`: solo `button.tsx`.

## 2. Objetivos y no-objetivos

**Objetivos**

1. La landing muestra solo hechos de `perfil.md`, con las mismas fechas, puestos y niveles que el CV.
2. El posicionamiento es claro en los primeros 5 segundos: titular, puesto confirmado y una
   acción (ver CV o contactar).
3. Tiene una identidad visual propia, coherente con "sistemas y operación". Sin plantilla genérica
   de SaaS (glassmorphism, cuadrícula, ventana macOS).
4. Se renderiza en el servidor por defecto. Mismo o mejor Lighthouse que hoy, con objetivo ≥ 95
   en Accesibilidad, Buenas prácticas y SEO.
5. Pruebas automáticas que impidan volver a publicar datos prohibidos (teléfono, Gmail, puesto no
   confirmado, IPs).

**No-objetivos**

- Versión en inglés de la landing: el CV en inglés ya existe en `/cv/en`. Ver preguntas abiertas.
- Cambios en `/cv`, `/cv/en` o en los PDF, salvo enlazarlos.
- Cambios en `apps/api`, base de datos o infraestructura.
- Formulario de contacto, analítica, blog o CMS.
- Unificar en un solo módulo los datos del CV y de la landing. Se deja como mejora posterior para
  no reabrir PR #1.

## 3. Propuesta

### 3.1 Arquitectura de información

Una sola página, en este orden. Las anclas se mantienen cortas y en español.

| # | Sección | Ancla | Contenido |
|---|---|---|---|
| 0 | Header | — | Nombre "Samael Amaral", navegación a las secciones y botón "Ver CV" (`/cv`). Enlace "Saltar al contenido". |
| 1 | Hero | `#inicio` | `h1`: **Especialista en Sistemas y Automatización · Frappe · Desarrollo asistido por IA**. Debajo: "Samael Amaral", puesto confirmado (Intern en Fast Market), ubicación y disponibilidad. Botones: "Ver CV" y "Contacto". |
| 2 | Experiencia | `#experiencia` | Fast Market (puesto Intern + 5 logros confirmados) y Mubea (Practicante de IT Support + 4 logros). |
| 3 | Proyectos | `#proyectos` | DiosesmonDex como caso destacado; Traductor de señas con la etiqueta **Prototipo**; el propio portafolio como proyecto técnico. |
| 4 | Habilidades | `#habilidades` | Tabla de 9 filas con el **nivel real literal** de `perfil.md`, más la frase "Cómo trabajo con IA". |
| 5 | Estudios | `#estudios` | Ingeniería (UVEG) y ONE G8 (Alura) con sus 4 cursos. Idiomas en una línea. |
| 6 | Contacto | `#contacto` | Correo, LinkedIn y GitHub, y enlaces al CV: `/cv`, `/cv/en` y el PDF. |
| 7 | Footer | — | Nombre, año y enlace a `/cv`. |

Nota sobre el titular: es el **posicionamiento** que `perfil.md` define como titular, no un puesto.
Para que no se confunda con el puesto pendiente de confirmar, el hero muestra justo debajo, en mono,
el puesto real: `IT Support, Development & Automation Intern · Fast Market · ago 2026 – oct 2026`.

Se eliminan: las stats del hero, la sección Roadmap, los proyectos "CMS 3D" y "Dashboard responsive"
y el resumen largo. Este último se reemplaza por 2 frases construidas solo con hechos (ver §3.3).

### 3.2 Dirección visual: "bitácora de operaciones"

La idea: la página se lee como el registro de un área de sistemas que alguien montó desde cero.
Es sobria, legible e informativa, y su "decoración" son datos con estructura: fechas en mono,
etiquetas de estado y reglas finas. Nada de efectos de vidrio ni de gradientes.

**Tipografía** (con `next/font/google`, autoalojada en el build, sin peticiones a terceros en runtime)

- Titulares: **IBM Plex Sans Condensed** 600. Es industrial y compacta, y aguanta bien un `h1`
  largo de 3 segmentos separados por `·`. Tamaños: `h1` con `clamp(2.25rem, 5vw, 4rem)` y
  `leading-[1.05]`; `h2` de 1.75rem.
- Texto: **IBM Plex Sans** 400/500, 1.0625rem e interlineado 1.65. Medida máxima de 68 caracteres.
- Datos (fechas, stack, niveles, etiquetas de sección): **IBM Plex Mono** 400/500, 0.8125rem,
  `uppercase` y `tracking-[0.08em]` solo en las etiquetas.
- Se quitan Inter y JetBrains Mono. Plex tiene buen soporte de acentos y "ñ".

**Paleta** (tokens CSS en `globals.css`; claro por defecto y oscuro con `prefers-color-scheme`)

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--paper` | `#F3F0E8` | `#0F1114` | fondo |
| `--ink` | `#17191D` | `#E9E6DF` | texto principal |
| `--ink-muted` | `#585E68` | `#9EA3AB` | texto secundario (verificar AA ≥ 4.5:1) |
| `--rule` | `#D6D1C4` | `#2A2E35` | reglas y bordes de 1 px |
| `--ok` | `#1E7148` | `#5CCB91` | acento: estado "en uso", enlaces y foco |
| `--warn` | `#9A4A0A` | `#F0AE4E` | etiqueta "Prototipo" |
| `--surface` | `#FBFAF6` | `#161A1F` | filas destacadas, sin sombra |

Usar solo dos colores de acento con significado (`ok` = en uso o confirmado, `warn` = prototipo)
refuerza la regla de contenido: lo que no está terminado se ve distinto.

**Layout**

- Contenedor de 72rem y rejilla de 12 columnas en `lg`. En desktop, la etiqueta de cada sección
  (`01 / EXPERIENCIA`, en mono) ocupa las columnas 1–3 y queda `sticky`, y el contenido va en
  las 4–12. En móvil, una sola columna con la etiqueta arriba.
- **Experiencia** como registro cronológico: cada puesto es una fila con la fecha en mono a la
  izquierda, una regla vertical de 1 px y un punto `--ok`, y a la derecha empresa, puesto y logros
  en lista. Sin tarjetas.
- **Proyectos**: DiosesmonDex ocupa todo el ancho con tres bloques (qué es, qué tiene, stack) y una
  franja de cifras verificables en mono con la nota "fuente: repositorio". El Traductor y el
  Portafolio van en dos columnas, más compactos. El Traductor lleva la etiqueta `PROTOTIPO`
  en `--warn`.
- **Habilidades**: una tabla semántica (`<table>`) con las columnas Área y Nivel. El nivel va en
  texto, más un indicador de 3 segmentos (Básico, Intermedio, Avanzado) marcado como
  `aria-hidden`. En las filas con matiz (JS/TS y SQL) el texto completo del nivel aparece tal
  cual y el indicador muestra el nivel principal, "Intermedio". Sin barras de porcentaje.
- Se quitan el fondo de cuadrícula, `backdrop-blur`, las sombras grandes y los iconos decorativos.
  Los iconos lucide se quedan solo en enlaces de contacto, con su texto visible.

**Movimiento**

- Solo CSS. Al cargar, el hero aparece con una entrada de 240 ms (opacidad y 8 px en Y) y
  escalonamiento de 60 ms. La regla vertical de Experiencia se dibuja con `scroll-timeline` donde
  el navegador lo soporte; donde no, se muestra estática (mejora progresiva).
- Hover y foco: subrayado que crece desde la izquierda en 150 ms. Foco visible con `outline` de
  2 px en `--ok` y `offset` de 3 px.
- `prefers-reduced-motion: reduce` desactiva todo. El bloque que ya existe en `globals.css` se
  conserva.
- Se elimina `framer-motion` de `apps/web`. La landing pasa a ser 100 % Server Components y deja
  de haber JS de cliente en `/` (el `print-button` del CV no cambia).

### 3.3 Mapeo de `perfil.md` a secciones

| Dato de `perfil.md` | Sección | Cómo se publica |
|---|---|---|
| Nombre: "Samael Amaral" (nombre completo en `<title>` y metadata) | Header, hero, footer, metadata | Literal |
| Ubicación: Apaseo el Grande, Guanajuato, México | Hero | Literal |
| Disponibilidad: cambio de residencia; híbrida o presencial | Hero | "Disponible para cambio de residencia · híbrido o presencial" |
| Titular de posicionamiento | Hero `h1`, `<title>`, OG | Literal |
| Puestos a los que apunta hoy | Hero (línea secundaria) y meta description | Resumen: "Busco roles de especialista en sistemas, soporte N2, automatización TI y desarrollo Frappe/ERPNext". Los puestos "a mediano plazo" no se publican. |
| Fast Market: Intern, ago 2026 – oct 2026 | Experiencia | Literal (ver pregunta 2 sobre "actual") |
| Fast Market: contexto "único responsable de crear y operar el área de sistemas" | Experiencia | Literal, sin mencionar España |
| Logros Fast Market: tickets Frappe (en uso), alertas por API y monitoreo, sistema multiagente, capacitación y reportes, soporte e incidencias | Experiencia | 5 bullets sin cifras. Multiagente con el verbo "Diseñé", sin afirmar que el área ya lo usa |
| Mubea: Practicante de IT Support, ene 2025 – ago 2025, más 4 logros | Experiencia | Literal, sin número de usuarios |
| DiosesmonDex: qué es, funciones, stack, enlace | Proyectos (destacado) | Literal, con enlace a `https://diosesmondex.onrender.com` |
| DiosesmonDex: 823 especies (rango 1–1013), 247 pruebas, fases 2–8 completadas del 3 al 5 de ago 2026 | Proyectos | Franja de cifras con la nota "fuente: repositorio". Sin cifra de usuarios |
| DiosesmonDex: por qué y qué aprendió | Proyectos | Una frase cada uno |
| Traductor de señas | Proyectos | Etiqueta **Prototipo**: "Funcional como prototipo; no terminado". Sin enlace hasta que haya repo o video |
| Portafolio (Next.js, NestJS, Prisma, PostgreSQL, Docker, CI) | Proyectos | Tarjeta compacta con enlace a GitHub |
| Tabla de habilidades (9 filas) | Habilidades | **Nivel literal**, incluidos los matices de JS/TS y SQL |
| "Cómo trabaja con IA" | Habilidades | Párrafo corto en primera persona |
| UVEG 2023 – mayo 2026, "carrera concluida, cédula profesional temporal, título en trámite" | Estudios | Literal |
| ONE G8 Back-End, Alura Latam, ene 2024 – ago 2025, con 4 cursos | Estudios | Literal |
| Idiomas: español nativo; inglés intermedio en lectura y documentación técnica, sin certificado | Estudios | Literal |
| Correo Amaral.Samael@Outlook.com, LinkedIn, GitHub | Contacto | Enlaces `mailto:` y externos con `rel="noreferrer"` |
| `/cv`, `/cv/en`, PDF ES y EN | Header y contacto | Enlaces internos |

Resumen del hero (2 frases, solo hechos, a validar por Samael): "Ingeniero en Sistemas
Computacionales. En Fast Market creé el área de sistemas: el sistema de tickets sobre Frappe, las
alertas automatizadas y la capacitación del equipo."

### 3.4 Datos que NO se publican

| Dato | Motivo |
|---|---|
| Teléfono (461 …) | `perfil.md`: no publicar en la web |
| Gmail (gnyt98@…) | `perfil.md`: no se usa en documentos profesionales |
| Puesto "Especialista en Sistemas y Automatización (México–España)", nov 2026 | Pendiente de nombramiento oficial |
| Expansión a España / Pronto Market | Ligado al puesto pendiente y sin detallar qué parte le toca |
| Herramientas o servicios monitoreados | Pendiente de confirmar; riesgo de exponer datos internos |
| Uso real del sistema multiagente en el área | Pendiente de confirmar |
| Automatizaciones locales de correos y tareas | `perfil.md`: no aparecen mientras no se detallen |
| Cualquier cifra de Fast Market o de Mubea (usuarios, tickets, tiempos) | Confidencial / decisión explícita |
| Nombres de clientes, IPs, sucursales, código privado | Regla general de `perfil.md` |
| Número de usuarios de DiosesmonDex | Sin cifra |
| Soporte independiente a familiares | Descartado |
| Puestos objetivo "a mediano plazo" | No es un hecho, es una aspiración. Se omite para no diluir el perfil |
| Proyectos "CMS 3D", "Dashboard responsive" y el Roadmap 2026 | No figuran en `perfil.md` |
| Ruta local `C:\dev\proyectos\Diosesdes` | Dato interno de la máquina |

### 3.5 Estructura de código

```
apps/web/src/features/landing/
  data/perfil.ts          # contenido tipado, única fuente en el código para la landing
  data/perfil.spec.ts     # guardas de contenido (ver §6)
  components/
    site-header.tsx  hero.tsx  experience.tsx  projects.tsx
    skills-table.tsx  education.tsx  contact.tsx  site-footer.tsx
    section.tsx           # etiqueta sticky + h2 + contenedor
  landing-page.tsx        # compone las secciones (Server Component)
```

`shared/lib/site.ts` pasa a ser la única fuente de la navegación y desaparece `profile.navigation`.
Los tipos se declaran con `interface` y `readonly`, como en `features/cv/data/cv.ts`, sin `any`.

## 4. Alternativas consideradas

| Alternativa | Por qué no |
|---|---|
| Solo cambiar los textos y mantener el diseño actual | Resuelve la veracidad, pero el diseño genérico de SaaS contradice el posicionamiento en sistemas. Además, el titular largo no cabe en la tarjeta del hero actual. Se hace de todos modos como primer PR (§8), para que el contenido correcto salga antes. |
| Reutilizar los datos del CV (`cv.ts`) en la landing | Las frases del CV están redactadas para papel. Acoplarlo reabre PR #1. Se deja para más adelante. |
| Mantener Framer Motion | Obliga a que toda la landing sea Client Component, en contra de `ENGINEERING_RULES.md`. El movimiento propuesto se resuelve con CSS. |
| Barras de porcentaje en habilidades | Implican una precisión que no existe y contradicen "nivel real tal cual". |
| Tema oscuro por defecto con neón | Visto en exceso en portafolios de desarrolladores y menos legible para textos largos. |

## 5. Impacto por país y marca

- **México**: es el público principal. Idioma `es-MX` (`<html lang="es-MX">`, `og:locale es_MX`).
  Ubicación y experiencia son mexicanas.
- **España**: el sitio no opera en España ni trata datos de usuarios, así que no aplica el RGPD.
  El único impacto es de contenido: **no se menciona Pronto Market ni la expansión** hasta que se
  confirme el puesto México–España. Cuando se confirme, basta un PR de contenido en `perfil.ts`
  (y en `cv.ts`), sin cambiar el diseño. El texto se redacta en español neutro para que lo lea
  bien un reclutador de España (sin regionalismos).
- **Marca**: Fast Market aparece solo como empleador, sin logos ni datos internos.

## 6. Seguridad y datos personales

- Datos personales publicados: nombre, ciudad, correo profesional, LinkedIn y GitHub. Los autoriza
  `perfil.md`.
- Guarda automática (`perfil.spec.ts`, Vitest) que recorre todo el contenido serializado de la
  landing y del CV y falla si encuentra:
  - teléfono (`/\b\d{3}[\s.-]?\d{3}[\s.-]?\d{4}\b/`) o la cadena `gnyt98` / `@gmail.com`;
  - `México–España` / `Mexico-Spain`, o `Pronto Market`;
  - patrón de IPv4;
  - las palabras `Roadmap`, `CMS 3D`, `Dashboard responsive`.
- Enlaces externos con `rel="noreferrer"`. Sin scripts de terceros. Las fuentes se autoalojan con
  `next/font`.
- `seguridad` revisa el PR de contenido (datos personales) y el de pruebas a11y (dependencia nueva
  `@axe-core/playwright`, versión fija).

## 7. Pruebas y verificación

| Tipo | Qué verifica | Archivo |
|---|---|---|
| Vitest: guardas de contenido | §6 | `features/landing/data/perfil.spec.ts` |
| Vitest: consistencia | Fechas y puestos de Fast Market y Mubea iguales en `perfil.ts` y `cv.ts`; 9 habilidades con nivel dentro del conjunto permitido | `perfil.spec.ts` |
| Vitest: navegación | `siteConfig.navigation` = `#experiencia, #proyectos, #habilidades, #estudios, #contacto` | `shared/lib/site.spec.ts` |
| Playwright: narrativa | `h1` con el titular exacto; un solo `h1`; los 5 `h2` en orden; enlace "Ver CV" → `/cv`; `mailto:` correcto; etiqueta "Prototipo" visible en el Traductor | `e2e/landing.spec.ts` |
| Playwright: contenido prohibido | El HTML renderizado de `/` no contiene teléfono, Gmail ni el puesto pendiente | `e2e/landing.spec.ts` |
| Playwright: a11y | `@axe-core/playwright` sin violaciones `serious`/`critical` en `/` (claro y oscuro con `emulateMedia`) y en `/cv` | `e2e/a11y.spec.ts` |
| Playwright: movimiento | Con `reducedMotion: "reduce"` el hero es visible de inmediato | `e2e/landing.spec.ts` |
| Playwright: metadata/SEO | `html[lang=es-MX]`; `<title>` y `description` nuevos; `og:locale=es_MX`; `canonical`; `robots.txt` y `sitemap.xml` responden 200 e incluyen `/`, `/cv`, `/cv/en` | `e2e/seo.spec.ts` |
| Manual (`qa`) | Lighthouse móvil en `/` (objetivo ≥ 95 en A11y, Buenas prácticas y SEO; LCP < 2.5 s); navegación solo con teclado; zoom al 200 %; anchos de 360 px, 768 px y 1280 px | Informe en el PR |

Criterio de aceptación global: `pnpm lint`, `pnpm typecheck`, `pnpm test` y `pnpm test:e2e` en
verde, cada dato visible rastreable a una línea de `perfil.md` y la aprobación de Samael sobre los
textos finales.

## 8. Plan de trabajo (PRs pequeños, en orden)

Todos se apilan sobre `feat/cv-imprimible` hasta que PR #1 se fusione. Después se rebasan sobre `main`.

| PR | Agente | Archivos | Criterio de aceptación | Pruebas |
|---|---|---|---|---|
| **1. Contenido veraz** | `frontend` | `features/landing/data/perfil.ts` (reemplaza `profile.ts`), `landing-page.tsx` (adaptación mínima de lectura de datos; quitar stats y Roadmap), `shared/lib/site.ts`, `site.spec.ts`, `e2e/landing.spec.ts` | Todo dato visible está en `perfil.md`; no aparece nada de §3.4; habilidades con nivel literal; diseño actual sin cambios | `perfil.spec.ts` (guardas + consistencia con `cv.ts`), e2e de narrativa y contenido prohibido. `seguridad` revisa |
| **2. Metadata y SEO** | `frontend` | `app/layout.tsx` (metadata, `lang`, OG), `app/sitemap.ts`, `app/robots.ts` | `lang=es-MX`; título "Samael Amaral · Especialista en Sistemas y Automatización…" (posicionamiento); dominio canónico confirmado (pregunta 1); sitemap con `/`, `/cv`, `/cv/en` | `e2e/seo.spec.ts` |
| **3. Sistema visual (tokens y tipografía)** | `frontend` | `app/globals.css`, `app/layout.tsx` (fuentes Plex) | Tokens de §3.2; sin fondo de cuadrícula; contraste AA verificado en claro y oscuro; `/cv` sin regresiones visuales | Captura de `/` y `/cv` antes/después en el PR; e2e existentes en verde |
| **4. Layout: header, hero y experiencia** | `frontend` | `components/section.tsx`, `site-header.tsx`, `hero.tsx`, `experience.tsx`, `landing-page.tsx` | Server Components; skip link; etiqueta sticky en `lg`; registro cronológico; el puesto confirmado se muestra bajo el `h1` | e2e de narrativa (h1 y h2), teclado |
| **5. Layout: proyectos, habilidades, estudios, contacto y footer** | `frontend` | `projects.tsx`, `skills-table.tsx`, `education.tsx`, `contact.tsx`, `site-footer.tsx`; borrar `framer-motion` de `package.json` y del lockfile | `/` sin JS de cliente propio; tabla semántica de habilidades; Prototipo en `--warn`; enlaces al CV | e2e completo; `pnpm build` muestra `/` como estático |
| **6. Movimiento y accesibilidad** | `frontend` | `globals.css` (keyframes, `scroll-timeline` con `@supports`), `e2e/a11y.spec.ts`, `apps/web/package.json` (`@axe-core/playwright` fijo) | Movimiento de §3.2; con reduced motion, nada se mueve; axe sin `serious`/`critical` | `e2e/a11y.spec.ts`, prueba de reduced motion. `seguridad` revisa la dependencia |
| **7. Verificación final** | `qa` | (sin código) informe en el PR 6 | Lighthouse, teclado, zoom, anchos y revisión de cada texto contra `perfil.md` | Manual + toda la suite |

No hay trabajo para `backend` ni `devops`. El despliegue en Vercel (si el dominio cambia) queda
fuera de este plan.

## 9. Despliegue y rollback

Sin migraciones ni variables de entorno nuevas. Cada PR se puede revertir por separado con
`git revert`. El PR 1 es el más importante y no depende de los demás, así que, si el rediseño se
retrasa, el contenido correcto puede salir solo.

## 10. Riesgos

| Riesgo | Mitigación |
|---|---|
| Apilar sobre PR #1, aún sin merge, provoca conflictos si PR #1 cambia | Los PRs 1–2 no tocan `features/cv`. Se rebasan en cuanto PR #1 se fusione |
| Que el titular "Especialista en Sistemas y Automatización…" se lea como el puesto no confirmado | Puesto real en mono bajo el `h1`. Decisión explícita de Samael (pregunta 3) |
| El periodo del Intern ("ago–oct 2026" en `perfil.md` y "ago 2026 – actual" en el CV) queda desactualizado en noviembre | Prueba de consistencia con `cv.ts`. Un solo cambio de contenido al confirmar el puesto |
| Contraste insuficiente de `--ink-muted` o `--warn` en oscuro | Verificación con axe y medición manual en el PR 3 |
| `scroll-timeline` sin soporte en Safari/Firefox | `@supports`; sin él, la regla se ve estática |
| Se cuela contenido no confirmado en futuras ediciones | Guardas de §6 en CI |

## 11. Decisiones (9 oct 2026)

1. **Dominio canónico**: el link actual no es `https://samael-dev.vercel.app`. **Pendiente**: Samael
   pasa el dominio correcto. Bloquea solo el PR 2 (metadata/SEO).
2. **Periodo del Intern**: se publica **"ago 2026 – oct 2026"**, como en `perfil.md`. El puesto
   cambia en noviembre y se actualiza entonces. La prueba de consistencia con `cv.ts` no aplica
   mientras el CV del PR #1 diga "actual".
3. **Titular**: se usa como `h1` y título del sitio; es el titular definido en `perfil.md`, no un
   cargo. Debajo va el puesto real de Intern.
4. **Resumen del hero**: se usa la frase de §3.3.
5. **DiosesmonDex**: se publican las fases y fechas tal cual (cifras verificables del repo).
6. **Traductor de señas**: se publica como Prototipo, sin enlace, hasta tener repo o video.
7. **Landing en inglés**: fuera de alcance; basta con enlazar `/cv/en`.
8. **Tema**: claro y oscuro **seleccionable por el visitante** con un botón en el header. Por
   defecto sigue al sistema operativo; la elección se guarda en `localStorage` y se aplica antes
   del primer pintado (script inline en `<head>`, sin parpadeo). El botón es el único Client
   Component nuevo de la landing y se agrega en el PR 3, con prueba e2e de cambio y persistencia.
