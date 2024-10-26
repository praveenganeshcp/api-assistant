import { forwardRef, Module } from '@nestjs/common';
import { BootstrapApplicationUsecase } from './usecases/bootstrap-app.usecase';
import { CloudCodeProcessManagerService } from './usecases/cloud-code-process-manager.service';
import { FetchAllHandlersUsecase } from './usecases/fetch-all-handlers.usecase';
import { UpdateRouteHandlersUsecase } from './usecases/update-route-handlers.usecase';
import { EndpointsBeModule } from '@api-assistant/application-endpoints-be';

@Module({
  imports: [forwardRef(() => EndpointsBeModule)],
  controllers: [],
  providers: [
    BootstrapApplicationUsecase,
    FetchAllHandlersUsecase,
    CloudCodeProcessManagerService,
    UpdateRouteHandlersUsecase,
  ],
  exports: [
    BootstrapApplicationUsecase,
    CloudCodeProcessManagerService,
    FetchAllHandlersUsecase,
    UpdateRouteHandlersUsecase,
  ],
})
export class ApplicationCloudCodeBeModule {}
