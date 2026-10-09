import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.routes.map((route) => ({
    url: `${siteConfig.url}${route === "/" ? "" : route}`,
  }));
}
