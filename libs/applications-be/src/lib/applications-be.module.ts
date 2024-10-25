import { Module } from '@nestjs/common';
import { EndpointsBeModule } from '@api-assistant/application-endpoints-be';
import { ApplicationRepository } from './repositories/application.repository';
import { CreateApplicationUsecase } from './usecases/create-application/usecase';
import { FetchApplicationsByUserIdUsecase } from './usecases/fetch-applications-by-userid/usecase';
import { FetchApplicationByIdUsecase } from './usecases/fetch-application-by-id.usecase';
import { ApplicationCloudCodeBeModule } from '@api-assistant/application-cloud-code-be';

@Module({
  imports: [EndpointsBeModule, ApplicationCloudCodeBeModule],
  providers: [
    ApplicationRepository,
    CreateApplicationUsecase,
    FetchApplicationsByUserIdUsecase,
    FetchApplicationByIdUsecase,
  ],
  exports: [
    ApplicationRepository,
    CreateApplicationUsecase,
    FetchApplicationsByUserIdUsecase,
    FetchApplicationByIdUsecase,
  ],
})
export class ApplicationsBeModule {}
