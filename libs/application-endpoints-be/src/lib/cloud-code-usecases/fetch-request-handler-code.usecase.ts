import { Usecase } from "@api-assistant/commons-be";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { readFile } from "fs/promises";
import { ObjectId } from "mongodb";

interface FetchRequestHandlerCodeUsecaseInput {
    applicationId: ObjectId;
    fileName: string;
}

@Injectable()
export class FetchRequestHandlerCodeUsecase implements Usecase<FetchRequestHandlerCodeUsecaseInput, {code: string}> {

    constructor(
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) { }

    async execute(data: FetchRequestHandlerCodeUsecaseInput): Promise<{code: string}> {
        const applicationsRootPath = this.crudApplicationConfig.ROOTDIR;
        const filePath = `${applicationsRootPath}/${data.applicationId.toString()}/src/routes/${data.fileName}`;
        const fileContent = await readFile(filePath);
        return {code: fileContent.toString()};
    }
}