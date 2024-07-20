import { Module } from '@nestjs/common';
import { CoreEngineCRUDUsecase } from './usecases/core-engine-crud.usecase';
import { CoreEngineFetchCollectionsUsecase } from './usecases/core-engine-fetch-collections.usecase';
import { CoreEngineFetchFilesUsecase } from './usecases/core-engine-fetch-files.usecase';
import { ApplicationsBeModule } from '@api-assistant/applications-be';
import { DeleteApplicationUsecase } from './usecases/delete-application.usecase';
import { EndpointsBeModule } from '@api-assistant/endpoints-be';

@Module({
  imports: [ApplicationsBeModule, EndpointsBeModule],
  providers: [
    CoreEngineCRUDUsecase,
    CoreEngineFetchCollectionsUsecase,
    CoreEngineFetchFilesUsecase,
    DeleteApplicationUsecase,
  ],
  exports: [
    CoreEngineCRUDUsecase,
    CoreEngineFetchCollectionsUsecase,
    CoreEngineFetchFilesUsecase,
    DeleteApplicationUsecase,
  ],
})
export class CrudEngineBeModule {}
