import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { CreateProjectUsecase } from './usecases/create-project.usecase';
import { FetchProjectsByUserIdUsecase } from './usecases/fetch-projects-by-userid.usecase';

@Module({
  providers: [
    ProjectRepository,
    CreateProjectUsecase,
    FetchProjectsByUserIdUsecase,
  ],
  exports: [
    CreateProjectUsecase,
    FetchProjectsByUserIdUsecase,
    ProjectRepository
  ],
})
export class ProjectsBeModule {}
