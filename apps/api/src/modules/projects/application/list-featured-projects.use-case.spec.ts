import { describe, expect, it } from "vitest";
import { ListFeaturedProjectsUseCase } from "./list-featured-projects.use-case";
import type { ProjectsRepository } from "../domain/projects.repository";
import { ProjectEntity } from "../domain/project.entity";

describe("ListFeaturedProjectsUseCase", () => {
  it("returns published projects ordered by repository contract", async () => {
    const repository: ProjectsRepository = {
      findFeatured: async () => [
        new ProjectEntity(
          "id",
          "slug",
          "Title",
          "Summary",
          "published",
          99,
          [{ name: "NestJS", category: "backend" }],
          {},
        ),
      ],
    };
    const useCase = new ListFeaturedProjectsUseCase(repository);

    await expect(useCase.execute()).resolves.toHaveLength(1);
  });
});
