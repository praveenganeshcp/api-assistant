import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import {
  ALLOWED_DB_OPERATIONS,
  CoreEngineUnSupportedActionException,
  CRUDActionDefinition,
  CRUDActionResponse,
  FindActionPayload,
} from '@api-assistant/applications-crud-engine-core';
import { Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import { CoreEngineInsertActionUsecase } from './core-engine-insert-action.usecase';
import { CoreEngineFindOneActionUsecase } from './core-engine-find-one-action.usecase';
import { CoreEngineFindAllActionUsecase } from './core-engine-findall-action.usecase';

interface CRUDActionExecutorUsecaseInput {
  db: Db;
  actionDef: CRUDActionDefinition;
}

@Injectable()
export class CRUDActionExecutorUsecase
  implements
    Usecase<CRUDActionExecutorUsecaseInput, CanBeNull<CRUDActionResponse>>
{
  private readonly logger = new Logger(CRUDActionExecutorUsecase.name);

  constructor(
    private readonly insertActionUsecase: CoreEngineInsertActionUsecase,
    private readonly findOneActionUsecase: CoreEngineFindOneActionUsecase,
    private readonly findAllActionUsecase: CoreEngineFindAllActionUsecase
  ) {}

  async execute(
    data: CRUDActionExecutorUsecaseInput
  ): Promise<CanBeNull<CRUDActionResponse>> {
    const { db, actionDef } = data;
    switch (actionDef.operation) {
      case ALLOWED_DB_OPERATIONS.insertOne: {
        this.logger.log(`performing insertone action`, data.actionDef);
        const result = await this.insertActionUsecase.execute({
          db,
          collectionName: actionDef.collectionName,
          data: actionDef.payload,
        });
        this.logger.log('insertone action performed', result);
        return result;
      }
      case ALLOWED_DB_OPERATIONS.findOne: {
        this.logger.log(`performing findone action`, data.actionDef);
        const result = await this.findOneActionUsecase.execute({
          db,
          collectionName: actionDef.collectionName,
          query: actionDef.payload as FindActionPayload,
        });
        this.logger.log('findone action performed', result);
        return result;
      }
      case ALLOWED_DB_OPERATIONS.find: {
        this.logger.log(`performing find all action`, data.actionDef);
        const result = await this.findAllActionUsecase.execute({
          db,
          collectionName: actionDef.collectionName,
          query: actionDef.payload as FindActionPayload,
        });
        this.logger.log('find all action performed', result);
        return result;
      }
      default: {
        throw new CoreEngineUnSupportedActionException(actionDef.operation);
      }
    }
  }
}
