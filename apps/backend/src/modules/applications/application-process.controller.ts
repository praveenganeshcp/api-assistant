import { CloudCodeProcessManagerService } from "@api-assistant/application-cloud-code-be";
import { Controller, Get, Param, Patch } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Controller('applications/process/')
export class ApplicationProcessManagerController {

    constructor(
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService
    ) {}

    @Get('')
    async fetchAllApplicationCloudCodeStatus() {
      return this.cloudCodeProcessManagerService.getAllApplicationStatus();
    }

    @Patch('restart/:applicationId')
    async restartApplicationProcess(@Param('applicationId') applicationId: string) {
        return this.cloudCodeProcessManagerService.restartApplication(new ObjectId(applicationId))
    }

    @Patch('stop/:applicationId')
    async stopApplicationProcess(@Param('applicationId') applicationId: string) {
        return this.cloudCodeProcessManagerService.stopApplication(new ObjectId(applicationId))
    }

    @Patch('start/:applicationId')
    async startApplicationProcess(@Param('applicationId') applicationId: string) {
        return this.cloudCodeProcessManagerService.startApplication(new ObjectId(applicationId))
    }
}