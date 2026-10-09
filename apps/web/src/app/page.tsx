import type { Metadata } from "next";
import { LandingPage } from "@/features/landing/components/landing-page";
import { homeMetadata } from "@/shared/lib/metadata";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return <LandingPage />;
}
