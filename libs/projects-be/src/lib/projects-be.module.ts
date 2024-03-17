import { Module } from "@nestjs/common";
import { ProjectRepository } from "./repositories/project.repository";
import { ProjectMetadataRepository } from "./repositories/project-metadata.repository";
import { CreateProjectUsecase } from "./usecases/create-project.usecase";
import { DeleteProjectUsecase } from "./usecases/delete-project.usecase";
import { FetchProjectByIdUsecase } from "./usecases/fetch-project-by-id.usecase";
import { FetchProjectsByUserIdUsecase } from "./usecases/fetch-projects-by-userid.usecase";

@Module({
    providers: [
        ProjectRepository,
        ProjectMetadataRepository,
        CreateProjectUsecase,
        DeleteProjectUsecase,
        FetchProjectByIdUsecase,
        FetchProjectsByUserIdUsecase
    ],
    exports: [
        CreateProjectUsecase,
        DeleteProjectUsecase,
        FetchProjectByIdUsecase,
        FetchProjectsByUserIdUsecase,
        ProjectMetadataRepository
    ]
})
export class ProjectsBeModule {}