import { Usecase } from "@api-assistant/commons-be";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { readFile } from "fs/promises";
import { ObjectId } from "mongodb";

@Injectable()
export class FetchApplicationLogsUsecase implements Usecase<ObjectId, string> {

    constructor(
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>
    ) {}

    async execute(applicationId: ObjectId): Promise<string> {
        const logFilePath = `${this.crudApplicationConfig.ROOTDIR}/${applicationId.toString()}/logs/log.log`
        const fileContents = await readFile(logFilePath, 'utf-8');
        return fileContents;
    }
}