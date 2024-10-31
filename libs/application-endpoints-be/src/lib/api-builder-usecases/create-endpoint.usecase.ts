import { Usecase } from '@api-assistant/commons-be';
import { Endpoint } from '../entities';
import { Injectable } from '@nestjs/common';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { ObjectId } from 'mongodb';
import { UpdateRouteHandlersUsecase } from '../cloud-code-usecases/update-route-handlers.usecase';

export interface CreateEndpointUsecaseInput
  extends Pick<
    Endpoint,
    | 'crud'
    | 'description'
    | 'name'
    | 'response'
    | 'url'
    | 'validations'
    | 'method'
    | 'isAuthenticated'
    | 'requestHandler'
    | 'useCloudCode'
  > {
  createdBy: ObjectId;
  applicationId: ObjectId;
}

@Injectable()
export class CreateEndpointUsecase
  implements Usecase<CreateEndpointUsecaseInput, Endpoint>
{
  constructor(
    private readonly endpointsRepo: EndpointsRepository,
    private readonly updateRouteHandlersUsecase: UpdateRouteHandlersUsecase
  ) {}

  async execute(data: CreateEndpointUsecaseInput): Promise<Endpoint> {
    const endpoint = await this.endpointsRepo.save({
      name: data.name,
      url: data.url,
      description: data.description,
      crud: data.crud,
      response: data.response,
      createdBy: data.createdBy,
      createdOn: new Date(),
      applicationId: data.applicationId,
      validations: data.validations,
      method: data.method,
      isAuthenticated: data.isAuthenticated,
      useCloudCode: data.useCloudCode,
      requestHandler: data.requestHandler
    });
    await this.updateRouteHandlersUsecase.execute(data.applicationId)
    return endpoint;
  }
}
