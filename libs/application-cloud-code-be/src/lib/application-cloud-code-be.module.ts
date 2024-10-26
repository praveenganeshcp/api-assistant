import { Module } from '@nestjs/common';
import { BootstrapApplicationUsecase } from './usecases/bootstrap-app.usecase';
import { CloudCodeProcessManagerService } from './usecases/cloud-code-process-manager.service';
import { FetchAllHandlersUsecase } from './usecases/fetch-all-handlers.usecase';

@Module({
  controllers: [],
  providers: [
    BootstrapApplicationUsecase,
    FetchAllHandlersUsecase,
    CloudCodeProcessManagerService
  ],
  exports: [
    BootstrapApplicationUsecase,
    CloudCodeProcessManagerService,
    FetchAllHandlersUsecase,
  ],
})
export class ApplicationCloudCodeBeModule {}
