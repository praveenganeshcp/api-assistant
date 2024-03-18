import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectMetadataRepository } from './repositories/project-metadata.repository';
import { CreateProjectUsecase } from './usecases/create-project.usecase';
import { FetchProjectByIdUsecase } from './usecases/fetch-project-by-id.usecase';
import { FetchProjectsByUserIdUsecase } from './usecases/fetch-projects-by-userid.usecase';

@Module({
  providers: [
    ProjectRepository,
    ProjectMetadataRepository,
    CreateProjectUsecase,
    FetchProjectByIdUsecase,
    FetchProjectsByUserIdUsecase,
  ],
  exports: [
    CreateProjectUsecase,
    FetchProjectByIdUsecase,
    FetchProjectsByUserIdUsecase,
    ProjectMetadataRepository,
    ProjectRepository
  ],
})
export class ProjectsBeModule {}
