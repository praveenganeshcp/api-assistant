import { FetchAllHandlersUsecase, FetchRequestHandlerCodeUsecase, UpdateHandlerCodeUsecase } from "@api-assistant/application-endpoints-be";
import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Controller('applications/:applicationId/cloud-code')
export class CloudCodeController {

    constructor(
        private readonly fetchAllHandlersUsecase: FetchAllHandlersUsecase,
        private readonly fetchRequestHandlerCodeUsecase: FetchRequestHandlerCodeUsecase,
        private readonly updateHandlerCodeUsecase: UpdateHandlerCodeUsecase
    ) {}

    @Get('handlers')
    fetchAllRequestHandlers(@Param('applicationId') applicationId: string) {
        return this.fetchAllHandlersUsecase.execute(new ObjectId(applicationId))
    }

    @Get(':fileName')
    fetchRequestHandlerCode(
        @Param('applicationId') applicationId: string,
        @Param('fileName') fileName: string
    ) {
        return this.fetchRequestHandlerCodeUsecase.execute({
            applicationId: new ObjectId(applicationId),
            fileName
        })
    }

    @Patch(':fileName')
    updateRequestHandlerCode(
        @Param('applicationId') applicationId: string,
        @Param('fileName') fileName: string,
        @Body('code') code: string
    ) {
        return this.updateHandlerCodeUsecase.execute({
            applicationId: new ObjectId(applicationId),
            fileName,
            code
        })
    }
}