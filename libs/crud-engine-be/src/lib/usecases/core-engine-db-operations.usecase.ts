import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import {
  CRUDActionDefinition,
  CRUDActionResponse,
} from '@api-assistant/crud-engine-core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { CRUD_DB_CONNECTION } from '../utils/utils';
import { CRUDActionExecutorUsecase } from './crud-action-executor.usecase';

interface CoreEngineDatabaseOperationsUsecaseInput {
  definition: CRUDActionDefinition;
  applicationId: ObjectId;
}

@Injectable()
export class CoreEngineDatabaseOperationsUsecase
  implements
    Usecase<
      CoreEngineDatabaseOperationsUsecaseInput,
      CanBeNull<CRUDActionResponse>
    >
{
  private readonly logger = new Logger(
    CoreEngineDatabaseOperationsUsecase.name
  );

  constructor(
    @Inject(CRUD_DB_CONNECTION) private dbConnection: MongoClient,
    private readonly crudActionExecutorUsecase: CRUDActionExecutorUsecase
  ) {}

  execute(
    data: CoreEngineDatabaseOperationsUsecaseInput
  ): Promise<CanBeNull<CRUDActionResponse>> {
    this.logger.log(
      'connecting to application db ' + data.applicationId.toString()
    );
    const db = this.dbConnection.db(
      `api-crud-${data.applicationId.toString()}`
    );
    this.logger.log('connected to db');
    return this.crudActionExecutorUsecase.execute({
      db,
      actionDef: {
        collectionName: data.definition.collectionName,
        payload: data.definition.payload,
        operation: data.definition.operation,
      },
    });
  }
}
