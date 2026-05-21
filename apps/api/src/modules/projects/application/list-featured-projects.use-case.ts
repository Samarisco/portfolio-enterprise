import { Inject, Injectable } from "@nestjs/common";
import {
  PROJECTS_REPOSITORY,
  type ProjectsRepository,
} from "../domain/projects.repository";
import type { ProjectEntity } from "../domain/project.entity";

@Injectable()
export class ListFeaturedProjectsUseCase {
  constructor(
    @Inject(PROJECTS_REPOSITORY)
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  execute(limit = 6): Promise<readonly ProjectEntity[]> {
    return this.projectsRepository.findFeatured(limit);
  }
}
