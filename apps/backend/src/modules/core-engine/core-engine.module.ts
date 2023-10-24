import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CoreEngineController } from './controllers/core-engine.controller';
import { CoreEngineAuthenticationMiddleware } from './middleware/core-engine-auth.middleware';
import { ProjectModule } from '../projects/projects.module';
import { CoreEngineCRUDUsecase } from './usecases/core-engine-crud.usecase';
import { CoreEngineFetchCollectionsUsecase } from './usecases/core-engine-fetch-collections.usecase';
import { CoreEngineFetchFilesUsecase } from './usecases/core-engine-fetch-files.usecase';

@Module({
  controllers: [CoreEngineController],
  imports: [ProjectModule],
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
