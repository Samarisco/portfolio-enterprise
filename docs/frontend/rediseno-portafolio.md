# Design doc: Rediseño del portafolio público (contenido y dirección visual)

| | |
|---|---|
| Autor | `lead` (agente), para Samael Amaral |
| Revisores | Samael Amaral (responsable) · `seguridad` (datos personales publicados) · `qa` |
| Estado | Implementado en `feat/rediseno-portafolio` (ver §12) |
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
| 1 | Hero | `#inicio` | `h1`: **Sistemas, automatización e IA aplicada** (ver §11, decisión 9). Debajo: "Samael Amaral", puesto confirmado (Intern en Fast Market), ubicación y disponibilidad. Botones: "Ver CV" y "Contacto". |
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

### 3.2 Dirección visual: "menú en frío"

> Historial: "bitácora de operaciones" (papel cálido) → "sistema en marcha" (9 oct 2026) →
> **"menú en frío"** (9 oct 2026, a pedido de Samael: "me gusta mucho Persona 5 y su estética,
> ¿podemos adaptar ese estilo punk urbano a algo profesional? Me gustan los colores del espectro
> frío"). Los PRs 3–5 de §8 se entregan juntos.

La idea: el lenguaje gráfico de los menús de videojuego punk (planos inclinados, recortes, contraste
extremo, energía) reinterpretado para un portafolio profesional y en paleta fría. **El estilo vive en
los marcos, títulos y transiciones; el texto de cuerpo va siempre sobre color sólido y recto.**

**Derechos**: no se usa ningún asset, logo, personaje, fuente ni texto de Persona 5 / Atlus. Todo es
CSS y SVG propio con fuentes libres de Google Fonts; solo se toma el lenguaje gráfico.

**Firma: grafo multiagente** (`components/agent-graph.tsx`, Client Component). Se conserva como
ancla narrativa: el sistema de ingeniería multiagente de Samael (coordinador → lead, backend,
frontend, devops, qa, seguridad → pull request). Re-estilizado: el coordinador sobre un estallido
dentado que gira, nodos como etiquetas inclinadas, el activo como recorte cian con sombra dura, y un
pulso que viaja por la arista. Elegir agente con clic, hover o teclado; botón Pausar/Reanudar
(WCAG 2.2.2). Con `prefers-reduced-motion` no hay recorrido automático.

**Recursos gráficos** (todos propios)

- Planos inclinados (`skewX(-12deg)`) en botones, chips, nav, etiquetas de fecha y nodos; la
  etiqueta interior se endereza para leerse recta.
- Titular del hero en 3 planos: invertido, limpio y cian con sombra dura.
- Títulos de sección (`h2`) con el mismo tratamiento del hero: Anton en mayúsculas sobre un plano
  inclinado con sombra cian; el texto es un único nodo.
- Trama de medios tonos en un plano diagonal detrás del grafo (nunca detrás de texto de cuerpo) y en
  la esquina derecha de la banda de contacto (oculta en móvil).
- Destellos de 4 puntas (marca del header, nodos del registro, hero, contacto).
- Tarjetas de proyecto con esquina recortada y sombra dura desplazada en azul eléctrico (cian al
  pasar el puntero). Cifras y "Cómo trabajo con IA" en planos invertidos.
- Contacto: banda invertida con borde superior en diagonal, una línea de texto y chips inclinados.

**Tipografía** (`next/font/google`, autoalojada)

- Impacto: **Anton** (titular del hero, nombre, títulos de sección y de proyecto).
- Texto: **Instrument Sans**. Datos: **Martian Mono** al 87.5 % de ancho.
- Inter y JetBrains Mono quedan solo para `/cv` (sin precarga). Se quitó Bricolage Grotesque.

**Paleta fría** (tokens en `globals.css`; alias `--background/--foreground/--border` para `/cv`)

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--bg` | `#F2F5FB` | `#05070F` (negro azulado) | fondo |
| `--surface` | `#FFFFFF` | `#0D1226` | tarjetas, nodos |
| `--ink` / `--muted` | `#060914` / `#465069` | `#EEF3FF` / `#A7B2CF` | texto |
| `--plane` / `--on-plane` | `#060914` / `#F2F5FB` | `#EEF3FF` / `#05070F` | plano de contraste extremo, siempre opuesto al fondo |
| `--accent` | `#0F3BEA` | `#3FE3FF` | texto de acento, enlaces, foco |
| `--pop` / `--on-pop` | `#00CFF5` / `#060914` | `#22E1FF` / `#05070F` | cian eléctrico, solo como relleno |
| `--volt` / `--on-volt` | `#1F4BFF` / `#FFFFFF` | `#3D63FF` / `#FFFFFF` | azul eléctrico: sombras duras, estallido |
| `--violet` / `--on-violet` | `#5A23D8` / `#FFFFFF` | `#B49CFF` / `#05070F` | etiqueta "Prototipo" |

En claro se invierte con criterio: el fondo es blanco frío y los planos de contraste pasan a negro
azulado; el cian se mantiene como relleno con texto oscuro. Contraste medido (WCAG): texto ≥ 7.3:1,
`--accent` ≥ 6.8:1, `--violet` ≥ 7.2:1; cada relleno con su `--on-*` ≥ 4.7:1 (el mínimo es
`--on-volt` sobre `--volt` en oscuro). Ningún texto va sobre trama.

**Layout**: header fuera de `main` con regla de 2 px, skip link y botón de tema inclinado. Hero a
dos columnas en `lg` (texto | grafo), apilado en móvil. Secciones con título en plano inclinado `sticky` a la
izquierda y un dato verdadero en etiqueta (rango de fechas, conteo). Experiencia y Estudios como
registro con destellos en una línea vertical. Habilidades en `<table>` semántica con indicador de 3
segmentos inclinados (`aria-hidden`) y el nivel literal.

**Movimiento**: entrada "cut-in" de cada línea del titular (recorte diagonal que se descubre),
arranque de nodos, recorrido del grafo, destellos que titilan y, donde el navegador soporta
`animation-timeline: view()`, los títulos de sección entran en diagonal al hacer scroll (mejora
progresiva). Microinteracciones: plano cian que entra en diagonal tras los enlaces del menú, sombra
dura que aparece en botones y chips, tarjetas que se elevan. `prefers-reduced-motion` lo desactiva
todo. Sin `framer-motion`: la landing es Server Component salvo `theme-toggle.tsx` y `agent-graph.tsx`.

### 3.3 Mapeo de `perfil.md` a secciones

| Dato de `perfil.md` | Sección | Cómo se publica |
|---|---|---|
| Nombre: "Samael Amaral" (nombre completo en `<title>` y metadata) | Header, hero, footer, metadata | Literal |
| Ubicación: Apaseo el Grande, Guanajuato, México | Hero | Literal |
| Disponibilidad: cambio de residencia; híbrida o presencial | Hero | "Disponible para cambio de residencia · híbrido o presencial" |
| Titular de posicionamiento | Hero `h1`, `<title>`, OG | Literal |
| Puestos a los que apunta hoy | Hero (línea secundaria) y meta description | Resumen: "Busco roles de especialista en sistemas, soporte N2, automatización TI y desarrollo asistido por IA". Los puestos "a mediano plazo" no se publican. |
| Fast Market: Intern, ago 2026 – oct 2026 | Experiencia | Literal (ver pregunta 2 sobre "actual") |
| Fast Market: contexto "único responsable de crear y operar el área de sistemas" | Experiencia | Literal, sin mencionar España |
| Logros Fast Market: sistema interno de tickets (en uso), alertas por API y monitoreo, sistema multiagente, capacitación y reportes, soporte e incidencias | Experiencia | 5 bullets sin cifras. Multiagente con el verbo "Diseñé", sin afirmar que el área ya lo usa |
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
Computacionales. En Fast Market creé el área de sistemas: el sistema interno de tickets e
incidencias, las alertas automatizadas y la capacitación del equipo." (Sin Frappe, §11 decisión 9.)

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
| Playwright: a11y | `@axe-core/playwright` sin violaciones `serious`/`critical` en `/` (claro y oscuro con `emulateMedia`) y en `/cv` | `e2e/a11y.spec.ts` **(pendiente, ver §12)** |
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

1. **Dominio canónico**: `https://portfolio-enterprise-web.vercel.app` (no `samael-dev.vercel.app`).
   Se usa en `metadataBase`, canonical y sitemap (PR 2).
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
9. **Frappe fuera de la landing** (9 oct 2026): Samael lo usó una vez y no representa su trabajo.
   Se quita del titular, del resumen, de los puestos buscados y de Habilidades (quedan 8 filas,
   como en `perfil.md`). El sistema de tickets se describe como "sistema interno de tickets e
   incidencias", sin nombrar la herramienta. Nuevo titular de posicionamiento: **"Sistemas,
   automatización e IA aplicada"** (eje de `perfil.md`); debajo, el puesto real de Intern. Una
   prueba unitaria y una e2e fallan si "Frappe" vuelve a la landing. `/cv` no se toca en este
   cambio.
10. **Dirección visual**: "menú en frío" (§3.2), inspirada en el lenguaje gráfico de los menús de
    Persona 5 pero en paleta fría y sin ningún asset, fuente ni texto de Atlus. Reemplaza a
    "sistema en marcha", que reemplazó a "bitácora de operaciones". Los PRs 3–5 de §8 se entregan
    juntos. El botón de tema (decisión 8) está en el header.

## 12. Estado de implementación (9 oct 2026)

Todo se entregó en la rama `feat/rediseno-portafolio`, apilada sobre `feat/cv-imprimible`:

| PR del plan (§8) | Estado |
|---|---|
| 1. Contenido veraz | Hecho. Más la decisión 9 (Frappe fuera de la landing) |
| 2. Metadata y SEO | Hecho: `lang="es-MX"`, título y descripción con el posicionamiento, `og:locale=es_MX`, dominio canónico de la decisión 1, canonical en `/`, `/cv` y `/cv/en`, `robots.txt` y `sitemap.xml` (`shared/lib/metadata.ts`, `app/robots.ts`, `app/sitemap.ts`, `e2e/seo.spec.ts`). Las guardas de contenido prohibido cubren también la metadata y el `<head>` |
| 3–5. Sistema visual y layout | Hecho y fusionado en uno, con la dirección "menú en frío" (§3.2). Se quitó `framer-motion` |
| 6. Movimiento y accesibilidad | Movimiento hecho, con prueba e2e de `prefers-reduced-motion`. **Sin** `@axe-core/playwright`: no se agregó la dependencia |
| 7. Verificación final | `qa` hizo una revisión de accesibilidad manual con axe: 0 violaciones |

Además: icono propio (destello cian sobre plano inclinado con sombra azul, `app/icon.svg` y
`app/apple-icon.tsx`) e imágenes Open Graph/Twitter de 1200×630 para `/`, `/cv` y `/cv/en`
(`shared/og/`), con `twitter:card=summary_large_image`. Sus textos pasan por las guardas
(`og-content.spec.ts`) y `e2e/seo.spec.ts` verifica que respondan como PNG de 1200×630.

Pendientes:

- Pruebas de accesibilidad automáticas (`e2e/a11y.spec.ts` con `@axe-core/playwright` en versión
  fija, claro y oscuro). Requiere agregar la dependencia y la revisión de `seguridad`.
- Landing en inglés: fuera de alcance (decisión 7); el CV en inglés está en `/cv/en`.
- Lighthouse móvil (objetivo de §2) cuando haya despliegue en el dominio canónico.
