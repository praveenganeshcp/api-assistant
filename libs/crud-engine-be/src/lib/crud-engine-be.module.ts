import { Module } from '@nestjs/common';
import { CoreEngineCRUDUsecase } from './usecases/core-engine-crud.usecase';
import { CoreEngineFetchCollectionsUsecase } from './usecases/core-engine-fetch-collections.usecase';
import { CoreEngineFetchFilesUsecase } from './usecases/core-engine-fetch-files.usecase';
import { ProjectsBeModule } from '@api-assistant/projects-be';
import { DeleteProjectUsecase } from './usecases/delete-project.usecase';
import { EndpointsBeModule } from '@api-assistant/endpoints-be';

@Module({
  imports: [ProjectsBeModule, EndpointsBeModule],
  providers: [
    CoreEngineCRUDUsecase,
    CoreEngineFetchCollectionsUsecase,
    CoreEngineFetchFilesUsecase,
    DeleteProjectUsecase,
  ],
  exports: [
    CoreEngineCRUDUsecase,
    CoreEngineFetchCollectionsUsecase,
    CoreEngineFetchFilesUsecase,
    DeleteProjectUsecase,
  ],
})
export class CrudEngineBeModule {}
