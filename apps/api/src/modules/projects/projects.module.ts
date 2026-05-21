import { Module } from "@nestjs/common";
import { ListFeaturedProjectsUseCase } from "./application/list-featured-projects.use-case";
import { PROJECTS_REPOSITORY } from "./domain/projects.repository";
import { InMemoryProjectsRepository } from "./infrastructure/in-memory-projects.repository";
import { ProjectsController } from "./presentation/projects.controller";

@Module({
  controllers: [ProjectsController],
  providers: [
    ListFeaturedProjectsUseCase,
    {
      provide: PROJECTS_REPOSITORY,
      useClass: InMemoryProjectsRepository,
    },
  ],
})
export class ProjectsModule {}
