import { Usecase } from "@api-assistant/commons-be";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";
import { Injectable } from "@nestjs/common";

interface UpdateHandlerCodeUsecaseInput {
    applicationId: ObjectId;
    fileName: string;
    code: string
}

@Injectable()
export class UpdateHandlerCodeUsecase implements Usecase<UpdateHandlerCodeUsecaseInput, void> {

    constructor(
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService
    ) {}

    async execute(data: UpdateHandlerCodeUsecaseInput): Promise<void> {
        const scriptPath = `/Users/praveenkumar/Documents/projects/cloud_code/${data.applicationId.toString()}/routes/${data.fileName}`;
        await writeFile(scriptPath, data.code, 'utf-8');
        this.cloudCodeProcessManagerService.restartApplication(data.applicationId);
    }
}