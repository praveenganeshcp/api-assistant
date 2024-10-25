import { Module } from '@nestjs/common';
import { BootstrapApplicationUsecase } from './usecases/bootstrap-app.usecase';
import { CloudCodeProcessManagerService } from './usecases/cloud-code-process-manager.service';

@Module({
  controllers: [],
  providers: [
    BootstrapApplicationUsecase,
    CloudCodeProcessManagerService
  ],
  exports: [
    BootstrapApplicationUsecase,
    CloudCodeProcessManagerService
  ],
})
export class ApplicationCloudCodeBeModule {}
