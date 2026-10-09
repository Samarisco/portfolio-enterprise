import { OG_SIZE, ogContent } from "@/shared/og/og-content";
import { renderOgImage } from "@/shared/og/og-image";

export const alt = ogContent["cv"].alt;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("cv");
}
