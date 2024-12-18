import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CoreEngineController } from "./controllers/core-engine.controller";
import { CoreEngineAuthenticationMiddleware } from "./middleware/core-engine-auth.middleware";
import { ApplicationsBeModule } from "@api-assistant/applications-be";
import { ApplicationDetailsController } from "./controllers/application-details.controller";
import { CRUDAppAPIAdapter } from "@api-assistant/commons-be";

@Module({
  controllers: [CoreEngineController, ApplicationDetailsController],
  imports: [ApplicationsBeModule],
  providers: [CoreEngineAuthenticationMiddleware, CRUDAppAPIAdapter],
  exports: [CoreEngineAuthenticationMiddleware],
})
export class CoreEngineModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CoreEngineAuthenticationMiddleware)
      .forRoutes(CoreEngineController);
  }
}
