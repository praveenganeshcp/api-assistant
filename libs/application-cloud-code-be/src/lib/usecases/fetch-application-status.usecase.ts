import { Usecase } from "@api-assistant/commons-be";
import { ObjectId } from "mongodb";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";
import { Injectable } from "@nestjs/common";

interface FetchApplicationStatusUsecaseOutput {
    uptime: string;
    reloadCount: number;
}

@Injectable()
export class FetchApplicationStatusUsecase implements Usecase<ObjectId, FetchApplicationStatusUsecaseOutput> {

    constructor(
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService
    ) {}

    async execute(applicationId: ObjectId): Promise<FetchApplicationStatusUsecaseOutput> {
        return this.cloudCodeProcessManagerService.getApplicationStatus(applicationId) as unknown as FetchApplicationStatusUsecaseOutput
    }
}