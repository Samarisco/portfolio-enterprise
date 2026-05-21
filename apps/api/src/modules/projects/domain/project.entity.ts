import type { PortfolioProject, ProjectStatus, TechnologyTag } from "@portfolio/types";

export class ProjectEntity implements PortfolioProject {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly title: string,
    public readonly summary: string,
    public readonly status: ProjectStatus,
    public readonly impactScore: number,
    public readonly stack: readonly TechnologyTag[],
    public readonly links: PortfolioProject["links"],
  ) {}

  get isPublished() {
    return this.status === "published";
  }
}
