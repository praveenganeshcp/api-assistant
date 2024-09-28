import { Usecase } from "@api-assistant/commons-be";
import { ALLOWED_DB_OPERATIONS, CoreEngineUnSupportedActionException, CRUDActionDefinition, FindActionPayload } from "@api-assistant/crud-engine-core";
import { Injectable, Logger } from "@nestjs/common";
import { Db } from "mongodb";
import { CoreEngineInsertActionUsecase } from "./core-engine-insert-action.usecase";
import { CoreEngineFindOneActionUsecase } from "./core-engine-find-one-action.usecase";

interface CRUDActionExecutorUsecaseInput {
    db: Db;
    actionDef: CRUDActionDefinition;
}

@Injectable()
export class CRUDActionExecutorUsecase implements Usecase<CRUDActionExecutorUsecaseInput, unknown> {

    private readonly logger = new Logger(CRUDActionExecutorUsecase.name);

    constructor(
        private readonly insertActionUsecase: CoreEngineInsertActionUsecase,
        private readonly findOneActionUsecase: CoreEngineFindOneActionUsecase
    ) {}

   async  execute(data: CRUDActionExecutorUsecaseInput): Promise<unknown> {
        const { db, actionDef } = data;
        switch(actionDef.operation) {
            case ALLOWED_DB_OPERATIONS.insertOne: {
                this.logger.log(`performing insertone action`, data.actionDef);
                const result = await this.insertActionUsecase.execute({
                    db,
                    collectionName: actionDef.collectionName,
                    data: actionDef.payload
                })
                this.logger.log('insertone action performed', result);
                return result;
            }
            case ALLOWED_DB_OPERATIONS.findOne: {
                this.logger.log(`performing findone action`, data.actionDef);
                const result = await this.findOneActionUsecase.execute({
                    db,
                    collectionName: actionDef.collectionName,
                    query: actionDef.payload as FindActionPayload
                })
                this.logger.log('findone action performed', result);
                return result;
            }
            default: {
                throw new CoreEngineUnSupportedActionException(actionDef.operation);
            }
        }
    }
}