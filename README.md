# Portfolio Enterprise

Portafolio profesional de **Samael Amaral** (Sistemas, automatización e IA aplicada). Es un monorepo
con la web pública (`apps/web`), una API NestJS (`apps/api`) y paquetes compartidos.

- Dominio canónico: `https://portfolio-enterprise-web.vercel.app`
- Rutas públicas: `/` (landing), `/cv` (CV imprimible en español) y `/cv/en` (en inglés), más los
  PDF `/CV-Samael-Amaral.pdf` y `/CV-Samael-Amaral-EN.pdf`.
- Contenido: solo hechos confirmados de la fuente de verdad privada (`perfil.md`). Las pruebas fallan
  si se publica un dato prohibido (teléfono, Gmail, puestos no confirmados, IPs, etc.).

## Web (`apps/web`)

- Next.js 16 (App Router), React 19, TypeScript estricto y Tailwind CSS 4.
- La landing está hecha con Server Components; los únicos Client Components son el botón de tema
  y el grafo multiagente del hero. No usa librerías de animación: el movimiento es CSS/SVG propio
  y respeta `prefers-reduced-motion`.
- Tema claro/oscuro: sigue al sistema por defecto, se puede cambiar con el botón del header y la
  elección se guarda en `localStorage` y se aplica antes del primer pintado.
- Fuentes autoalojadas con `next/font`: Anton (titulares), Instrument Sans (texto) y Martian Mono
  (datos) en la landing; Inter y JetBrains Mono en la hoja del CV.
- Metadata y SEO: `lang="es-MX"`, Open Graph `es_MX`, canonical por ruta, `robots.txt` y
  `sitemap.xml`.
- Iconos: `lucide-react`. Pruebas: Vitest (unitarias) y Playwright (e2e en escritorio y móvil).

Dirección visual y decisiones: [`docs/frontend/rediseno-portafolio.md`](docs/frontend/rediseno-portafolio.md).

## Comandos

Desde la raíz:

```bash
pnpm install
pnpm db:generate
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Solo la web (`apps/web`):

```bash
pnpm --filter @portfolio/web dev        # http://localhost:3000
pnpm --filter @portfolio/web test       # Vitest
pnpm --filter @portfolio/web test:e2e   # Playwright (reutiliza el servidor de :3000 si está activo)
pnpm --filter @portfolio/web cv:pdf     # regenera los PDF del CV (ES y EN) en public/
```

`cv:pdf` necesita Chromium de Playwright (`pnpm exec playwright install chromium`). Con
`CV_BASE_URL=http://localhost:3000` usa un servidor ya levantado; si no, compila y levanta uno
temporal.

## Servicios locales

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- Health: `http://localhost:4000/health`

`docker-compose.yml` levanta PostgreSQL, la API y la web. CI (`.github/workflows/ci.yml`) corre
lint, typecheck, test y build.

## Principio de arquitectura

Cada módulo se diseña como una unidad de producto: dominio claro, contratos tipados, seguridad por
defecto, rendimiento medible y documentación de las decisiones importantes.
