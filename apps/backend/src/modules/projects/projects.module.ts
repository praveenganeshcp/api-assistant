import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectMetadataRepository } from './repositories/project-metadata.repository';
import { CreateProjectUsecase } from './usecases/create-project.usecase';
import { FetchProjectsByUserIdUsecase } from './usecases/fetch-projects-by-userid.usecase';
import { FetchProjectByIdUsecase } from './usecases/fetch-project-by-id.usecase';
import { AccountsModule } from "../accounts/accounts.module";
import { AuthenticationMiddleware } from '../accounts/middlewares/authentication.middleware';


@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectRepository,
    ProjectMetadataRepository,
    CreateProjectUsecase,
    FetchProjectsByUserIdUsecase,
    FetchProjectByIdUsecase,
  ],
  imports: [AccountsModule],
  exports: [ProjectMetadataRepository],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ProjectsController);
  }
}
