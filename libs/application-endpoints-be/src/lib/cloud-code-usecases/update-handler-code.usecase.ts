import { Usecase } from "@api-assistant/commons-be";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";

interface UpdateHandlerCodeUsecaseInput {
    applicationId: ObjectId;
    fileName: string;
    code: string
}

@Injectable()
export class UpdateHandlerCodeUsecase implements Usecase<UpdateHandlerCodeUsecaseInput, void> {

    private logger = new Logger(UpdateHandlerCodeUsecase.name);

    constructor(
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService,
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) {}

    async execute(data: UpdateHandlerCodeUsecaseInput): Promise<void> {
        const applicationPath = `${this.crudApplicationConfig.ROOTDIR}/${data.applicationId.toString()}`;
        const scriptPath = `${applicationPath}/src/routes/${data.fileName}`;
        await writeFile(scriptPath, data.code, 'utf-8');
        this.logger.log('code updated')
        await this.cloudCodeProcessManagerService.restartApplication(data.applicationId);
        this.logger.log('application restarted');
    }
}