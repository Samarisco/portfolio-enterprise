/** Piezas gráficas propias (SVG): destellos y letras recortadas. Todas decorativas o de texto plano. */

interface SparkleProps {
  readonly className?: string;
}

/** Destello de cuatro puntas. */
export function Sparkle({ className }: SparkleProps) {
  return (
    <svg
      className={`sparkle${className ? ` ${className}` : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
    </svg>
  );
}

/* Patrón fijo (no aleatorio) para que servidor y cliente pinten lo mismo. */
const PATTERN = [0, 1, 2, 0, 3, 1, 0, 2, 3, 1, 2, 0, 1] as const;

interface RansomProps {
  readonly text: string;
}

/**
 * Titular de "letras recortadas": cada letra es un recorte con su propia fuente y fondo.
 * El texto sigue siendo el mismo para lectores de pantalla y buscadores.
 */
export function Ransom({ text }: RansomProps) {
  return (
    <span className="ransom">
      {Array.from(text).map((char, index) => (
        <span key={`${char}-${index}`} className={`ransom__cut ransom__cut--${PATTERN[(index + text.length) % PATTERN.length] ?? 0}`}>
          {char}
        </span>
      ))}
    </span>
  );
}
