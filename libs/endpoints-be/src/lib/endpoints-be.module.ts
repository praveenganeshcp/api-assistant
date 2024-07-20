import { Module } from '@nestjs/common';
import { EndpointsRepository } from './repositories/endpoints.repository';
import { CreateEndpointUsecase } from './usecases/create-endpoint.usecase';
import { GetEndpointByURLUsecase } from './usecases/get-endpoint-by-url.usecase';
import { GetAllEndpointsMinimalInfoUsecase } from './usecases/get-all-endpoints-minimal-info.usecase';
import { GetEndpointByIdUsecase } from './usecases/get-endpoint-by-id.usecase';
import { UpdateEndpointUsecase } from './usecases/update-endpoint.usecase';
import { DeleteEndpointsUsecase } from './usecases/delete-endpoint.usecase';
import { CreateAllBuiltinEndpointsUsecase } from './usecases/create-builtin-endpoints.usecase';

@Module({
  controllers: [],
  providers: [
    EndpointsRepository,
    CreateEndpointUsecase,
    GetEndpointByURLUsecase,
    GetAllEndpointsMinimalInfoUsecase,
    GetEndpointByIdUsecase,
    UpdateEndpointUsecase,
    DeleteEndpointsUsecase,
    CreateAllBuiltinEndpointsUsecase
  ],
  exports: [
    CreateEndpointUsecase,
    GetEndpointByURLUsecase,
    GetAllEndpointsMinimalInfoUsecase,
    GetEndpointByIdUsecase,
    UpdateEndpointUsecase,
    DeleteEndpointsUsecase,
    CreateAllBuiltinEndpointsUsecase
  ],
})
export class EndpointsBeModule {}
