import { Module } from '@nestjs/common';
import { CoreEngineCRUDUsecase } from './usecases/core-engine-crud.usecase';
import { CoreEngineFetchCollectionsUsecase } from './usecases/core-engine-fetch-collections.usecase';
import { CoreEngineFetchFilesUsecase } from './usecases/core-engine-fetch-files.usecase';
import { ApplicationsBeModule } from '@api-assistant/applications-be';
import { DeleteApplicationUsecase } from './usecases/delete-application.usecase';
import { EndpointsBeModule } from '@api-assistant/endpoints-be';
import { CRUDActionExecutorUsecase } from './usecases/crud-action-executor.usecase';
import { CoreEngineInsertActionUsecase } from './usecases/core-engine-insert-action.usecase';
import { CoreEngineFindOneActionUsecase } from './usecases/core-engine-find-one-action.usecase';
import { RequestDataValidatorService } from './usecases/request-data-validator.service';
import { RequestDataAsyncValidatorService } from './usecases/request-data-async-validator.service';
import { RequestDataValidatorFacadeService } from './usecases/request-data-validator-facade.service';
import { ParamsParserService } from './usecases/params-parser.service';
import { CoreEngineSignupUsecase } from './usecases/core-engine-signup.usecase';
import { CoreEngineJWTService } from './services/core-engine-jwt.service';
import { CoreEngineLoginUsecase } from './usecases/core-engine-login.usecase';
import { AuthenticateAppUserUsecase } from './usecases/authenticate-app-user.usecase';

@Module({
  imports: [ApplicationsBeModule, EndpointsBeModule],
  providers: [
    CoreEngineCRUDUsecase,
    CoreEngineFetchCollectionsUsecase,
    CoreEngineFetchFilesUsecase,
    DeleteApplicationUsecase,
    CRUDActionExecutorUsecase,
    CoreEngineInsertActionUsecase,
    CoreEngineFindOneActionUsecase,
    RequestDataValidatorService,
    RequestDataAsyncValidatorService,
    RequestDataValidatorFacadeService,
    ParamsParserService,
    CoreEngineSignupUsecase,
    CoreEngineJWTService,
    CoreEngineLoginUsecase,
    AuthenticateAppUserUsecase
  ],
  exports: [
    CoreEngineCRUDUsecase,
    CoreEngineFetchCollectionsUsecase,
    CoreEngineFetchFilesUsecase,
    DeleteApplicationUsecase,
    CoreEngineSignupUsecase,
    CoreEngineLoginUsecase
  ],
})
export class CrudEngineBeModule {}
