import { forwardRef, Module } from '@nestjs/common';
import { BootstrapApplicationUsecase } from './usecases/bootstrap-app.usecase';
import { CloudCodeProcessManagerService } from './usecases/cloud-code-process-manager.service';
import { FetchAllHandlersUsecase } from './usecases/fetch-all-handlers.usecase';
import { UpdateRouteHandlersUsecase } from './usecases/update-route-handlers.usecase';
import { EndpointsBeModule } from '@api-assistant/application-endpoints-be';
import { FetchRequestHandlerCodeUsecase } from './usecases/fetch-request-handler-code.usecase';
import { UpdateHandlerCodeUsecase } from './usecases/update-handler-code.usecase';
import { FetchApplicationStatusUsecase } from './usecases/fetch-application-status.usecase';

@Module({
  imports: [forwardRef(() => EndpointsBeModule)],
  controllers: [],
  providers: [
    BootstrapApplicationUsecase,
    FetchAllHandlersUsecase,
    CloudCodeProcessManagerService,
    UpdateRouteHandlersUsecase,
    FetchRequestHandlerCodeUsecase,
    UpdateHandlerCodeUsecase,
    FetchApplicationStatusUsecase
  ],
  exports: [
    BootstrapApplicationUsecase,
    CloudCodeProcessManagerService,
    FetchAllHandlersUsecase,
    UpdateRouteHandlersUsecase,
    FetchRequestHandlerCodeUsecase,
    UpdateHandlerCodeUsecase,
    FetchApplicationStatusUsecase
  ],
})
export class ApplicationCloudCodeBeModule {}
