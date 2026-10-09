/**
 * Tema claro/oscuro (design doc §11, decisión 8).
 * Por defecto sigue al sistema operativo; si el visitante elige uno, se guarda en
 * `localStorage` y se aplica como `data-theme` en `<html>` antes del primer pintado.
 */

export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = "tema";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * Script en línea para `<head>`: aplica el tema guardado sin esperar a React.
 * Si no hay preferencia guardada no hace nada y manda `prefers-color-scheme`.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;
