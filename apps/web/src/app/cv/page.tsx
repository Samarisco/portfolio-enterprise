import type { Metadata } from "next";
import { CvPage } from "@/features/cv/components/cv-page";
import { cv } from "@/features/cv/data/cv";

export const metadata: Metadata = {
  title: "CV",
  description: `Currículum de ${cv.name}: ${cv.headline}.`,
  alternates: {
    canonical: "/cv",
  },
  openGraph: {
    title: `CV | ${cv.name}`,
    description: cv.headline,
    type: "profile",
    locale: "es_MX",
  },
};

export default function CvRoute() {
  return <CvPage />;
}
