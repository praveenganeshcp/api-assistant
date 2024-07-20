import { Module } from '@nestjs/common';
import { ProjectRepository } from './repositories/project.repository';
import { CreateProjectUsecase } from './usecases/create-project.usecase';
import { FetchProjectsByUserIdUsecase } from './usecases/fetch-projects-by-userid.usecase';
import { EndpointsBeModule } from '@api-assistant/endpoints-be';

@Module({
  imports: [EndpointsBeModule],
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
