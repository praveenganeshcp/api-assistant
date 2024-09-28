import { Usecase } from "@api-assistant/commons-be";
import { SaveActionPayload } from "@api-assistant/crud-engine-core";
import { Db, Document, InsertOneResult } from "mongodb";

interface CoreEngineInsertActionUsecaseInput {
    data: SaveActionPayload;
    db: Db;
    collectionName: string;
}

export class CoreEngineInsertActionUsecase implements Usecase<CoreEngineInsertActionUsecaseInput, InsertOneResult> {

    execute(input: CoreEngineInsertActionUsecaseInput): Promise<InsertOneResult<Document>> {
        return input.db.collection(input.collectionName).insertOne(input.data);
    }
}