"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, isTheme, type Theme } from "@/shared/lib/theme";

const darkQuery = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/** Tema que se ve ahora: el elegido por el visitante o, si no eligió, el del sistema. */
function getResolvedTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;

  if (isTheme(chosen)) {
    return chosen;
  }

  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

function getServerTheme(): Theme | null {
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getResolvedTheme, getServerTheme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label =
    theme === null ? "Cambiar tema" : next === "dark" ? "Activar tema oscuro" : "Activar tema claro";

  function handleClick() {
    document.documentElement.dataset.theme = next;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento disponible: el tema se aplica solo en esta visita.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={label}
      title={label}
      data-theme-current={theme ?? undefined}
    >
      <Sun className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true" />
      <Moon className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true" />
    </button>
  );
}
