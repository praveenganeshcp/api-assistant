import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import {
  AccountsBeModule,
  AuthenticationMiddleware,
} from '@api-assistant/auth-be';
import { ProjectsBeModule } from '@api-assistant/projects-be';

@Module({
  controllers: [ProjectsController],
  imports: [AccountsBeModule, ProjectsBeModule],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ProjectsController);
  }
}
