import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CoreEngineController } from './controllers/core-engine.controller';
import { CrudEngineBeModule } from '@api-assistant/crud-engine-be';
import { CoreEngineAuthenticationMiddleware } from './middleware/core-engine-auth.middleware';
import { ProjectsBeModule } from '@api-assistant/projects-be';

@Module({
  controllers: [CoreEngineController],
  imports: [
    CrudEngineBeModule,
    ProjectsBeModule
  ],
  providers: [
    CoreEngineAuthenticationMiddleware
  ],
  exports: [
    CoreEngineAuthenticationMiddleware
  ]
})
export class CoreEngineModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CoreEngineAuthenticationMiddleware)
      .forRoutes(CoreEngineController);
  }
}
