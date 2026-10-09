import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icono para iOS (180 px): la misma marca que `icon.svg`, sobre fondo completo. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#05070f",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 32 32">
          <path d="M10 3H31L25 31H4Z" fill="#3d63ff" />
          <path d="M7 1H28L22 29H1Z" fill="#0d1226" />
          <path
            d="M14.5 5.5C15.2 11.3 17.2 13.3 23 14.9C17.2 16.5 15.2 18.5 14.5 24.3C13.8 18.5 11.8 16.5 6 14.9C11.8 13.3 13.8 11.3 14.5 5.5Z"
            fill="#22e1ff"
          />
        </svg>
      </div>
    ),
    size,
  );
}
