import { Injectable } from "@nestjs/common";
import type { ProjectsRepository } from "../domain/projects.repository";
import { ProjectEntity } from "../domain/project.entity";

const featuredProjects = [
  new ProjectEntity(
    "revenue-intelligence-os",
    "revenue-intelligence-os",
    "Revenue Intelligence OS",
    "Executive analytics platform with RBAC, typed APIs and event-driven insights.",
    "published",
    94,
    [
      { name: "Next.js", category: "frontend" },
      { name: "NestJS", category: "backend" },
      { name: "PostgreSQL", category: "database" },
      { name: "Playwright", category: "testing" },
    ],
    {
      github: "https://github.com",
      demo: "https://example.com",
    },
  ),
  new ProjectEntity(
    "internal-cms-platform",
    "internal-cms-platform",
    "Internal CMS Platform",
    "Markdown-first content operations with auditability, validation and SEO workflows.",
    "published",
    91,
    [
      { name: "App Router", category: "frontend" },
      { name: "Prisma", category: "database" },
      { name: "RBAC", category: "security" },
    ],
    {
      github: "https://github.com",
    },
  ),
] as const;

@Injectable()
export class InMemoryProjectsRepository implements ProjectsRepository {
  async findFeatured(limit: number): Promise<readonly ProjectEntity[]> {
    return featuredProjects
      .filter((project) => project.isPublished)
      .sort((left, right) => right.impactScore - left.impactScore)
      .slice(0, limit);
  }
}
