import { Module } from '@nestjs/common';
import { EndpointsRepository } from './repositories/endpoints.repository';
import { CreateEndpointUsecase } from './usecases/create-endpoint.usecase';
import { GetEndpointByURLUsecase } from './usecases/get-endpoint-by-url.usecase';
import { GetAllEndpointsMinimalInfoUsecase } from './usecases/get-all-endpoints-minimal-info.usecase';
import { GetEndpointByIdUsecase } from './usecases/get-endpoint-by-id.usecase';

@Module({
  controllers: [],
  providers: [
    EndpointsRepository,
    CreateEndpointUsecase,
    GetEndpointByURLUsecase,
    GetAllEndpointsMinimalInfoUsecase,
    GetEndpointByIdUsecase,
  ],
  exports: [
    CreateEndpointUsecase,
    GetEndpointByURLUsecase,
    GetAllEndpointsMinimalInfoUsecase,
    GetEndpointByIdUsecase,
  ],
})
export class EndpointsBeModule {}
