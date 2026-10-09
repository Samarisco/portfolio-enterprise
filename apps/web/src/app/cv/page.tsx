import type { Metadata } from "next";
import { CvPage } from "@/features/cv/components/cv-page";
import { getCvMetadata } from "@/features/cv/data/locales";

export const metadata: Metadata = getCvMetadata("es");

export default function CvRoute() {
  return <CvPage locale="es" />;
}
