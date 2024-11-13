import { Usecase } from "@api-assistant/commons-be";
import { Injectable, Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { EndpointsRepository } from "../repositories/endpoints.repository";

@Injectable()
export class DeleteEndpointsInApplicationUsecase implements Usecase<ObjectId, void> {

    private readonly logger = new Logger(DeleteEndpointsInApplicationUsecase.name);

    constructor(
        private readonly repo: EndpointsRepository
    ) {}

    async execute(applicationId: ObjectId): Promise<void> {
        this.logger.log('deleting all endpoints in application '+applicationId.toString());
        await this.repo.deleteAll({ _id: applicationId });
        this.logger.log('all endpoints deleted');
    }
}