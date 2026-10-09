import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { OG_SIZE, ogContent, type OgVariant } from "./og-content";

/*
 * Imagen para compartir (1200×630) con la estética "menú en frío": planos inclinados,
 * trama de medios tonos y destello. Se genera en el build (rutas estáticas) con `next/og`.
 *
 * Fuentes: Satori no lee woff2 ni las fuentes de `next/font`, así que se usan los TTF
 * estáticos de Anton e Instrument Sans guardados en `src/shared/og/fonts/` (licencia OFL,
 * archivos junto a los TTF). Se leen del disco con `process.cwd()` = `apps/web`.
 */

const COLORS = {
  bg: "#05070f",
  ink: "#eef3ff",
  muted: "#a7b2cf",
  pop: "#22e1ff",
  volt: "#3d63ff",
} as const;

const fontsDir = path.join(process.cwd(), "src", "shared", "og", "fonts");

async function loadFonts() {
  const [anton, sansMedium, sansBold] = await Promise.all([
    readFile(path.join(fontsDir, "Anton-Regular.ttf")),
    readFile(path.join(fontsDir, "InstrumentSans-Medium.ttf")),
    readFile(path.join(fontsDir, "InstrumentSans-Bold.ttf")),
  ]);

  return [
    { name: "Anton", data: anton, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Sans", data: sansMedium, weight: 500 as const, style: "normal" as const },
    { name: "Instrument Sans", data: sansBold, weight: 700 as const, style: "normal" as const },
  ];
}

const STAR = "M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z";

export async function renderOgImage(variant: OgVariant): Promise<ImageResponse> {
  const content = ogContent[variant];
  const [first, second, third] = content.lines;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: COLORS.bg,
          color: COLORS.ink,
          fontFamily: "Instrument Sans",
          overflow: "hidden",
        }}
      >
        {/* Plano diagonal con trama de medios tonos (sin texto encima). */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: 760,
            width: 640,
            height: 720,
            display: "flex",
            backgroundImage: `radial-gradient(circle at center, ${COLORS.pop} 0%, ${COLORS.pop} 12%, transparent 16%)`,
            backgroundSize: "18px 18px",
            backgroundRepeat: "repeat",
            opacity: 0.38,
            transform: "skewX(-14deg)",
          }}
        />
        {/* Franja de azul eléctrico. */}
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 600,
            width: 760,
            height: 16,
            display: "flex",
            background: COLORS.volt,
            transform: "rotate(-16deg)",
          }}
        />
        {/* Destellos. */}
        <svg
          width="210"
          height="210"
          viewBox="0 0 24 24"
          style={{ position: "absolute", top: 230, left: 900 }}
        >
          <path d={STAR} fill={COLORS.pop} />
        </svg>
        <svg
          width="70"
          height="70"
          viewBox="0 0 24 24"
          style={{ position: "absolute", top: 150, left: 1100 }}
        >
          <path d={STAR} fill={COLORS.ink} />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderLeft: `8px solid ${COLORS.pop}`,
                background: "#0d1226",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {content.kicker}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 34,
              fontFamily: "Anton",
              fontSize: 104,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 22px 0",
                  background: COLORS.ink,
                  color: COLORS.bg,
                  transform: "skewX(-6deg)",
                }}
              >
                {first}
              </div>
            </div>
            <div style={{ display: "flex", padding: "8px 0 10px 40px" }}>{second}</div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 22px 0",
                  background: COLORS.pop,
                  color: COLORS.bg,
                  boxShadow: `12px 12px 0 0 ${COLORS.volt}`,
                  transform: "rotate(-2deg)",
                }}
              >
                {third}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 44,
              color: COLORS.muted,
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            {content.footnote}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
