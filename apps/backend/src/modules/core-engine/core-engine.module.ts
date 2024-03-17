import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CoreEngineController } from './controllers/core-engine.controller';
import { CoreEngineAuthenticationMiddleware } from './middleware/core-engine-auth.middleware';
import { CoreEngineCRUDUsecase } from './usecases/core-engine-crud.usecase';
import { CoreEngineFetchCollectionsUsecase } from './usecases/core-engine-fetch-collections.usecase';
import { CoreEngineFetchFilesUsecase } from './usecases/core-engine-fetch-files.usecase';
import { ProjectsBeModule } from '@api-assistant/projects-be';

@Module({
  controllers: [CoreEngineController],
  imports: [ProjectsBeModule],
  providers: [
    CoreEngineCRUDUsecase,
    CoreEngineFetchCollectionsUsecase,
    CoreEngineFetchFilesUsecase,
  ],
})
export class CoreEngineModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CoreEngineAuthenticationMiddleware)
      .forRoutes(CoreEngineController);
  }
}
