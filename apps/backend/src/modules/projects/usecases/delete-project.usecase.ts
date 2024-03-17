import { Usecase } from "@api-assistant/commons-be";
import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ProjectRepository } from "../repositories/project.repository";
import { ProjectMetadataRepository } from "../repositories/project-metadata.repository";
import { CORE_ENGINE_UPLOAD_ROOT, crudDbConnectionFactory } from "../../core-engine/utils";
import { join } from "path";
import { rm } from "fs/promises";
import { existsSync } from "fs";

interface DeleteProjectUsecaseInput {
    userId: ObjectId;
    projectId: ObjectId
}

@Injectable()
export class DeleteProjectUsecase implements Usecase<DeleteProjectUsecaseInput, string> {

    constructor(
        private projectsRepository: ProjectRepository,
        private projectMetadataRepository: ProjectMetadataRepository
    ) {}

    async execute(data: DeleteProjectUsecaseInput): Promise<string> {
        await this.projectsRepository.deleteOne({
            createdBy: data.userId,
            _id: data.projectId
        })

        await this.projectMetadataRepository.deleteOne({
            projectId: data.projectId
        })

        const destinationPath = join(
            process.cwd(),
            CORE_ENGINE_UPLOAD_ROOT,
            data.projectId.toString()
        )

        if(existsSync(destinationPath))
            await rm(destinationPath, { recursive: true })

        const { db, connection } = await crudDbConnectionFactory(data.projectId.toString());

        await db.dropDatabase();

        await connection.close();

        return destinationPath;
    }
}