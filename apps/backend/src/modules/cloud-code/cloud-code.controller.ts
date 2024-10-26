import { FetchAllHandlersUsecase } from "@api-assistant/application-cloud-code-be";
import { Controller, Get, Param } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Controller('applications/:applicationId/cloud-code')
export class CloudCodeController {

    constructor(
        private readonly fetchAllHandlersUsecase: FetchAllHandlersUsecase
    ) {}

    @Get('handlers')
    fetchAllRequestHandlers(@Param('applicationId') applicationId: string) {
        return this.fetchAllHandlersUsecase.execute(new ObjectId(applicationId))
    }
}