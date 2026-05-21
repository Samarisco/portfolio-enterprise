import type { ProjectEntity } from "./project.entity";

export const PROJECTS_REPOSITORY = Symbol("PROJECTS_REPOSITORY");

export interface ProjectsRepository {
  findFeatured(limit: number): Promise<readonly ProjectEntity[]>;
}
