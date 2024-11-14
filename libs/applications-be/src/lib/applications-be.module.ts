import { Module } from '@nestjs/common';
import { EndpointsBeModule } from '@api-assistant/application-endpoints-be';
import { ApplicationRepository } from './repositories/application.repository';
import { CreateApplicationUsecase } from './usecases/create-application/usecase';
import { FetchApplicationsByUserIdUsecase } from './usecases/fetch-applications-by-userid/usecase';
import { FetchApplicationByIdUsecase } from './usecases/fetch-application-by-id.usecase';
import { RestartAllApplicationsUsecase } from './usecases/restart-all-apps.usecase';
import { DeleteApplicationUsecase } from './usecases/delete-application.usecase';
import { ApplicationCounterRepository } from './repositories/application-counter.repository';
import { FetchApplicationByAPIKeyUsecase } from './usecases/fetch-app-by-apikey.usecase';
import { FetchApplicationLogsUsecase } from './usecases/fetch-application-logs.usecase';

@Module({
  imports: [EndpointsBeModule],
  providers: [
    ApplicationRepository,
    CreateApplicationUsecase,
    FetchApplicationsByUserIdUsecase,
    FetchApplicationByIdUsecase,
    RestartAllApplicationsUsecase,
    DeleteApplicationUsecase,
    ApplicationCounterRepository,
    FetchApplicationByAPIKeyUsecase,
    FetchApplicationLogsUsecase
  ],
  exports: [
    ApplicationRepository,
    CreateApplicationUsecase,
    FetchApplicationsByUserIdUsecase,
    FetchApplicationByIdUsecase,
    RestartAllApplicationsUsecase,
    DeleteApplicationUsecase,
    ApplicationCounterRepository,
    FetchApplicationByAPIKeyUsecase,
    FetchApplicationLogsUsecase
  ],
})
export class ApplicationsBeModule {}
