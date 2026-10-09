/** Piezas gráficas propias (SVG): destellos decorativos. */

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
