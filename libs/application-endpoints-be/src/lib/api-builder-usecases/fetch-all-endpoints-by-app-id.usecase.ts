import { Usecase } from "@api-assistant/commons-be";
import { ObjectId } from "mongodb";
import { Endpoint } from "../entities";
import { EndpointsRepository } from "../repositories/endpoints.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FetchAllEndpointsByApplicationIdUsecase implements Usecase<ObjectId, Endpoint[]> {
    constructor(
        private readonly repo: EndpointsRepository
    ) {}

    execute(applicationId: ObjectId): Promise<Endpoint[]> {
        return this.repo.findAll({ applicationId })
    }
}