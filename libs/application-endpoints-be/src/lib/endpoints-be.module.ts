import { Module } from '@nestjs/common';
import { EndpointsRepository } from './repositories/endpoints.repository';
import { CreateEndpointUsecase } from './api-builder-usecases/create-endpoint.usecase';
import { GetEndpointByURLUsecase } from './api-builder-usecases/get-endpoint-by-url.usecase';
import { GetAllEndpointsMinimalInfoUsecase } from './api-builder-usecases/get-all-endpoints-minimal-info.usecase';
import { GetEndpointByIdUsecase } from './api-builder-usecases/get-endpoint-by-id.usecase';
import { UpdateEndpointUsecase } from './api-builder-usecases/update-endpoint.usecase';
import { DeleteEndpointsUsecase } from './api-builder-usecases/delete-endpoint.usecase';
import { CreateAllBuiltinEndpointsUsecase } from './api-builder-usecases/create-builtin-endpoints.usecase';
import { FindEndpointByPathMatchUsecase } from './api-builder-usecases/find-endpoint-by-path-match.usecase';
import { FetchAllEndpointsByApplicationIdUsecase } from './api-builder-usecases/fetch-all-endpoints-by-app-id.usecase';
import { BootstrapApplicationUsecase } from './cloud-code-usecases/bootstrap-app.usecase';
import { CloudCodeProcessManagerService } from './cloud-code-usecases/cloud-code-process-manager.service';
import { FetchAllHandlersUsecase } from './cloud-code-usecases/fetch-all-handlers.usecase';
import { FetchApplicationStatusUsecase } from './cloud-code-usecases/fetch-application-status.usecase';
import { FetchRequestHandlerCodeUsecase } from './cloud-code-usecases/fetch-request-handler-code.usecase';
import { UpdateHandlerCodeUsecase } from './cloud-code-usecases/update-handler-code.usecase';
import { UpdateRouteHandlersUsecase } from './cloud-code-usecases/update-route-handlers.usecase';
import { UpdateEndpointCodeInAppUsecase } from './api-builder-usecases/update-endpoint-code-in-app.usecase';
import { DeleteEndpointsInApplicationUsecase } from './api-builder-usecases/delete-endpoints-in-app.usecase';

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
    CreateAllBuiltinEndpointsUsecase,
    FindEndpointByPathMatchUsecase,
    FetchAllEndpointsByApplicationIdUsecase,
    BootstrapApplicationUsecase,
    FetchAllHandlersUsecase,
    CloudCodeProcessManagerService,
    UpdateRouteHandlersUsecase,
    FetchRequestHandlerCodeUsecase,
    UpdateHandlerCodeUsecase,
    FetchApplicationStatusUsecase,
    UpdateEndpointCodeInAppUsecase,
    DeleteEndpointsInApplicationUsecase
  ],
  exports: [
    CreateEndpointUsecase,
    GetEndpointByURLUsecase,
    GetAllEndpointsMinimalInfoUsecase,
    GetEndpointByIdUsecase,
    UpdateEndpointUsecase,
    DeleteEndpointsUsecase,
    CreateAllBuiltinEndpointsUsecase,
    FindEndpointByPathMatchUsecase,
    FetchAllEndpointsByApplicationIdUsecase,
    FetchAllEndpointsByApplicationIdUsecase,
    BootstrapApplicationUsecase,
    FetchAllHandlersUsecase,
    CloudCodeProcessManagerService,
    UpdateRouteHandlersUsecase,
    FetchRequestHandlerCodeUsecase,
    UpdateHandlerCodeUsecase,
    FetchApplicationStatusUsecase,
    UpdateEndpointCodeInAppUsecase,
    DeleteEndpointsInApplicationUsecase
  ],
})
export class EndpointsBeModule {}
