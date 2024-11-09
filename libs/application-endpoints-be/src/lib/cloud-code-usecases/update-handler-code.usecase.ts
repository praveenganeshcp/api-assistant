import { Usecase } from "@api-assistant/commons-be";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";
import { Inject, Injectable } from "@nestjs/common";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";

interface UpdateHandlerCodeUsecaseInput {
    applicationId: ObjectId;
    fileName: string;
    code: string
}

@Injectable()
export class UpdateHandlerCodeUsecase implements Usecase<UpdateHandlerCodeUsecaseInput, void> {

    constructor(
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService,
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) {}

    async execute(data: UpdateHandlerCodeUsecaseInput): Promise<void> {
        const scriptPath = `${this.crudApplicationConfig.ROOTDIR}/${data.applicationId.toString()}/src/routes/${data.fileName}`;
        await writeFile(scriptPath, data.code, 'utf-8');
        this.cloudCodeProcessManagerService.restartApplication(data.applicationId);
    }
}