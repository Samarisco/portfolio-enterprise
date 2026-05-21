export type ProjectStatus = "draft" | "published" | "archived";

export interface TechnologyTag {
  readonly name: string;
  readonly category: "frontend" | "backend" | "database" | "devops" | "testing" | "security";
}

export interface PortfolioProject {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly status: ProjectStatus;
  readonly impactScore: number;
  readonly stack: readonly TechnologyTag[];
  readonly links: {
    readonly github?: string;
    readonly demo?: string;
  };
}
