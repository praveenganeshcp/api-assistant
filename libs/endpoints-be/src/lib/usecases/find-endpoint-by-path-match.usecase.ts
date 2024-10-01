import { CanBeNull, Usecase } from "@api-assistant/commons-be";
import { CRUDEngineHttpMethods } from "@api-assistant/crud-engine-core";
import { Endpoint } from "../entities";
import { ObjectId } from "mongodb";
import { Injectable, Logger } from "@nestjs/common";
import { EndpointsRepository } from "../repositories/endpoints.repository";
import { match } from "path-to-regexp";

interface FindEndpointByPathMatchUsecaseInput {
    method: CRUDEngineHttpMethods;
    url: string;
    applicationId: ObjectId
}


interface FindEndpointByPathMatchUsecaseOutput {
    endpoint: Endpoint;
    params: Record<string, string>
}

@Injectable()
export class FindEndpointByPathMatchUsecase implements Usecase<FindEndpointByPathMatchUsecaseInput, CanBeNull<FindEndpointByPathMatchUsecaseOutput>> {

    private readonly logger = new Logger(FindEndpointByPathMatchUsecase.name);

    constructor(
        private readonly endpointsRepo: EndpointsRepository
    ) {}

    async execute(data: FindEndpointByPathMatchUsecaseInput): Promise<CanBeNull<FindEndpointByPathMatchUsecaseOutput>> {
        const applicationAllEndpoints: Endpoint[] = await this.endpointsRepo.findAll({
            applicationId: data.applicationId,
            method: data.method
        })
        return this.findMatchingRoute(data.url, applicationAllEndpoints);
    }

    private findMatchingRoute(path: string, endpoints: Endpoint[]): CanBeNull<FindEndpointByPathMatchUsecaseOutput> {
        this.logger.log('Received endpoints to match path ' + path, endpoints)
        for (const endpoint of endpoints) {
          this.logger.log('validating endpoint path: '+endpoint.url);
          const matcher = match(endpoint.url, { decode: decodeURIComponent });
          const result = matcher(path);
          if (result) {
            this.logger.log('path matched for endpoint path: '+ endpoint.url);
            return {
              endpoint: endpoint,
              params: result.params as FindEndpointByPathMatchUsecaseOutput['params'],
            };
          }
        }
        return null;
      }
      
}