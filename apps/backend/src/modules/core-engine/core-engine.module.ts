import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreEngineController } from './controllers/core-engine.controller';
import { CrudEngineBeModule } from '@api-assistant/application-crud-engine-be';
import { CoreEngineAuthenticationMiddleware } from './middleware/core-engine-auth.middleware';
import { ApplicationsBeModule } from '@api-assistant/applications-be';
import { ApplicationDetailsController } from './controllers/application-details.controller';

@Module({
  controllers: [CoreEngineController, ApplicationDetailsController],
  imports: [CrudEngineBeModule, ApplicationsBeModule],
  providers: [CoreEngineAuthenticationMiddleware],
  exports: [CoreEngineAuthenticationMiddleware],
})
export class CoreEngineModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CoreEngineAuthenticationMiddleware)
      .forRoutes(CoreEngineController);
  }
}
