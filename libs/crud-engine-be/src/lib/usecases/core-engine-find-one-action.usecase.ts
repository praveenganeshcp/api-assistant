import { CanBeNull, Usecase } from "@api-assistant/commons-be";
import { FindActionPayload } from "@api-assistant/crud-engine-core";
import { Db } from "mongodb";

interface CoreEngineFindOneActionUsecaseInput {
    query: FindActionPayload
    db: Db;
    collectionName: string;
}

export class CoreEngineFindOneActionUsecase implements Usecase<CoreEngineFindOneActionUsecaseInput, CanBeNull<Object>> {

    execute(input: CoreEngineFindOneActionUsecaseInput): Promise<CanBeNull<Object>> {
        return input.db.collection(input.collectionName).findOne(input.query.filter, input.query.options);
    }
}