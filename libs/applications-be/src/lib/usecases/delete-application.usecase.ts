import { Usecase } from "@api-assistant/commons-be";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ApplicationRepository } from "../repositories/application.repository";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";
import { rm } from "fs/promises";
import { CloudCodeProcessManagerService } from "@api-assistant/application-endpoints-be";
import { DeleteEndpointsInApplicationUsecase } from "libs/application-endpoints-be/src/lib/api-builder-usecases/delete-endpoints-in-app.usecase";

@Injectable()
export class DeleteApplicationUsecase implements Usecase<ObjectId, void> {

    private readonly logger = new Logger(DeleteApplicationUsecase.name);

    constructor(
        private readonly repo: ApplicationRepository,
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService,
        private readonly deleteEndpointsInApplicationUsecase: DeleteEndpointsInApplicationUsecase
    ) {}

    async execute(applicationId: ObjectId): Promise<void> {
        this.logger.log('deleting application '+applicationId.toString());
        await this.repo.deleteOne({ _id: applicationId });
        this.logger.log('removed from db')
        this.deleteEndpointsInApplicationUsecase.execute(applicationId);
        this.logger.log('removed endpoints');
        await this.cloudCodeProcessManagerService.deleteApp(applicationId)
        this.logger.log('cloud code process stopped')
        await this.deleteApplicationFolder(applicationId);
        this.logger.log('cloud code files removed');
    }

    private async deleteApplicationFolder(applicationId: ObjectId) {
        this.logger.log(`deleting app folder at ${this.crudApplicationConfig.ROOTDIR}/${applicationId.toString()}`);
        await rm(`${this.crudApplicationConfig.ROOTDIR}/${applicationId.toString()}`, { recursive: true, force: true });
    }
}