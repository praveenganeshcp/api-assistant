import { CloudCodeProcessManagerService } from "@api-assistant/application-endpoints-be";
import { Usecase } from "@api-assistant/commons-be";
import { Injectable, Logger } from "@nestjs/common";
import { ApplicationRepository } from "../repositories/application.repository";

@Injectable()
export class RestartAllApplicationsUsecase implements Usecase<void, void> {

    private readonly logger = new Logger(RestartAllApplicationsUsecase.name);

    constructor(
        private readonly repo: ApplicationRepository,
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService
    ) {
    }

    async execute(data: void): Promise<void> {
        this.logger.log('restarting all apps');
        const allApps = await this.repo.findAll({});
        const allAppIds = allApps.map(app => app._id);
        await this.cloudCodeProcessManagerService.restartApps(allAppIds);
        this.logger.log('all apps restarted');
    }
}