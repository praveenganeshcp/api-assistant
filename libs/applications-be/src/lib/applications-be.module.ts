import { Module } from '@nestjs/common';
import { EndpointsBeModule } from '@api-assistant/application-endpoints-be';
import { ApplicationRepository } from './repositories/application.repository';
import { CreateApplicationUsecase } from './usecases/create-application/usecase';
import { FetchApplicationsByUserIdUsecase } from './usecases/fetch-applications-by-userid/usecase';
import { FetchApplicationByIdUsecase } from './usecases/fetch-application-by-id.usecase';
import { RestartAllApplicationsUsecase } from './usecases/restart-all-apps.usecase';
import { DeleteApplicationUsecase } from './usecases/delete-application.usecase';

@Module({
  imports: [EndpointsBeModule],
  providers: [
    ApplicationRepository,
    CreateApplicationUsecase,
    FetchApplicationsByUserIdUsecase,
    FetchApplicationByIdUsecase,
    RestartAllApplicationsUsecase,
    DeleteApplicationUsecase
  ],
  exports: [
    ApplicationRepository,
    CreateApplicationUsecase,
    FetchApplicationsByUserIdUsecase,
    FetchApplicationByIdUsecase,
    RestartAllApplicationsUsecase,
    DeleteApplicationUsecase
  ],
})
export class ApplicationsBeModule {}
