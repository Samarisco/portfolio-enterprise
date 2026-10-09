/**
 * Patrones de datos que no deben publicarse en el sitio (design doc §6).
 * Los usan las pruebas unitarias (contenido serializado) y las e2e (HTML renderizado).
 * Son genéricos a propósito: nunca escribir aquí los datos privados reales.
 */

export interface ForbiddenPattern {
  readonly name: string;
  readonly pattern: RegExp;
}

export const forbiddenPatterns: readonly ForbiddenPattern[] = [
  { name: "Gmail", pattern: /gmail/i },
  { name: "enlace tel:", pattern: /tel:/i },
  { name: "puesto pendiente (México–España)", pattern: /M[eé]xico\s*[–-]\s*Espa[ñn]a/i },
  { name: "puesto pendiente (Mexico-Spain)", pattern: /Mexico\s*[–-]\s*Spain/i },
  { name: "Pronto Market", pattern: /Pronto\s*Market/i },
  { name: "IPv4", pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/ },
  { name: "Roadmap", pattern: /Roadmap/i },
  { name: "CMS 3D", pattern: /CMS\s*3D/i },
  { name: "Dashboard responsive", pattern: /Dashboard responsive/i },
  { name: "ruta local de Windows", pattern: /\b[A-Z]:\\/ },
];

/**
 * Secuencias de dígitos con separadores típicos de teléfono (espacios, puntos, guiones,
 * paréntesis y "+"). Se normalizan quitando todo lo que no es dígito.
 */
const phoneCandidate = /\+?\(?\d[\d\s().+-]*\d/g;

/** Mínimo de dígitos para considerar una secuencia como teléfono (10 en México). */
export const PHONE_MIN_DIGITS = 10;

/**
 * Secuencias legítimas de 10+ dígitos (ya normalizadas) que pueden aparecer en el sitio.
 * Agregar aquí, con su motivo, cualquier falso positivo comprobado.
 */
export const phoneAllowlist: readonly string[] = [];

/** Devuelve las secuencias normalizadas que parecen un teléfono. */
export function findPhoneLikeSequences(text: string): string[] {
  const matches = text.match(phoneCandidate) ?? [];

  return matches
    .map((match) => match.replace(/\D/g, ""))
    .filter((digits) => digits.length >= PHONE_MIN_DIGITS && !phoneAllowlist.includes(digits));
}

/**
 * Quita del HTML solo la geometría de los iconos SVG (elementos `<svg>` y la propiedad
 * `d` serializada en el payload de React), cuyas coordenadas parecen secuencias de
 * dígitos. Todo lo demás, incluidos atributos como `href`, se conserva para el escaneo.
 */
export function stripVectorGeometry(html: string): string {
  return html
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, "<svg></svg>")
    .replace(/(\\*")d\1:\1[^"\\]*\1/g, "");
}

/** Nombres de los patrones prohibidos encontrados en el texto (vacío si no hay ninguno). */
export function findForbiddenContent(text: string): string[] {
  const found = forbiddenPatterns.filter(({ pattern }) => pattern.test(text)).map(({ name }) => name);

  if (findPhoneLikeSequences(text).length > 0) {
    found.push("teléfono");
  }

  return found;
}
