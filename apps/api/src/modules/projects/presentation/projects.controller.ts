import { Controller, Get, Query } from "@nestjs/common";
import { IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import { ListFeaturedProjectsUseCase } from "../application/list-featured-projects.use-case";
import { ProjectResponseDto } from "./dto/project-response.dto";

class FeaturedProjectsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  readonly limit?: number;
}

@Controller("projects")
export class ProjectsController {
  constructor(private readonly listFeaturedProjects: ListFeaturedProjectsUseCase) {}

  @Get("featured")
  async getFeaturedProjects(
    @Query() query: FeaturedProjectsQueryDto,
  ): Promise<readonly ProjectResponseDto[]> {
    const projects = await this.listFeaturedProjects.execute(query.limit);
    return projects.map((project) => new ProjectResponseDto(project));
  }
}
