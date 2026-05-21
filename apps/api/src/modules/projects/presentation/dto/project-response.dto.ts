import type { PortfolioProject } from "@portfolio/types";

export class ProjectResponseDto {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly status: PortfolioProject["status"];
  readonly impactScore: number;
  readonly stack: PortfolioProject["stack"];
  readonly links: PortfolioProject["links"];

  constructor(project: PortfolioProject) {
    this.id = project.id;
    this.slug = project.slug;
    this.title = project.title;
    this.summary = project.summary;
    this.status = project.status;
    this.impactScore = project.impactScore;
    this.stack = project.stack;
    this.links = project.links;
  }
}
