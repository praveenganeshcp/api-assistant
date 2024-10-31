import { Usecase } from "@api-assistant/commons-be";
import { Injectable } from "@nestjs/common";
import { readFile } from "fs/promises";
import { ObjectId } from "mongodb";

interface FetchRequestHandlerCodeUsecaseInput {
    applicationId: ObjectId;
    fileName: string;
}

@Injectable()
export class FetchRequestHandlerCodeUsecase implements Usecase<FetchRequestHandlerCodeUsecaseInput, {code: string}> {

    async execute(data: FetchRequestHandlerCodeUsecaseInput): Promise<{code: string}> {
        const applicationsRootPath = "/Users/praveenkumar/Documents/projects/cloud_code"
        const filePath = `${applicationsRootPath}/${data.applicationId.toString()}/routes/${data.fileName}`;
        const fileContent = await readFile(filePath);
        return {code: fileContent.toString()};
    }
}