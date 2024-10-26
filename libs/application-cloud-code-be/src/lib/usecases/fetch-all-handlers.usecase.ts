import { Usecase } from "@api-assistant/commons-be";
import { Injectable } from "@nestjs/common";
import { readdir } from "fs/promises";
import { ObjectId } from "mongodb";

@Injectable()
export class FetchAllHandlersUsecase implements Usecase<ObjectId, string[]> {
    async execute(applicationId: ObjectId): Promise<string[]> {
        const applicationsRootPath = "/Users/praveenkumar/Documents/projects/cloud_code"
        const applicationPath = `${applicationsRootPath}/${applicationId.toString()}/routes`;
        const allFiles = await readdir(applicationPath)
        return allFiles
    }
}