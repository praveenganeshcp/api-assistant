import { Usecase } from "@api-assistant/commons-be";
import { ObjectId } from "mongodb";
import { CreateMigrationUsecase } from "./create-migration.usecase";
import { Injectable } from "@nestjs/common";

interface CreateSampleMigrationUsecaseInput {
    applicationId: ObjectId
}

@Injectable()
export class CreateSampleMigrationUsecase implements Usecase<CreateSampleMigrationUsecaseInput, void> {

    constructor(
        private readonly createMigrationUsecase: CreateMigrationUsecase
    ) {}

    async execute(data: CreateSampleMigrationUsecaseInput): Promise<void> {
        await this.createMigrationUsecase.execute({
            fileName: "add-employees", 
            applicationId: data.applicationId,
          })
    }
}