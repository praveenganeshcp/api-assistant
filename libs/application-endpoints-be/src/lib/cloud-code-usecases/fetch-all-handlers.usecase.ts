import { Usecase } from "@api-assistant/commons-be";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { readdir } from "fs/promises";
import { ObjectId } from "mongodb";

@Injectable()
export class FetchAllHandlersUsecase implements Usecase<ObjectId, string[]> {

    constructor(
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) { }

    async execute(applicationId: ObjectId): Promise<string[]> {
        const applicationsRootPath = this.crudApplicationConfig.ROOTDIR
        const applicationPath = `${applicationsRootPath}/${applicationId.toString()}/src/routes`;
        const allFiles = await readdir(applicationPath)
        return allFiles
    }
}