import { Usecase } from '@api-assistant/commons-be';
import { Endpoint } from '../entities';
import { Injectable, Logger } from '@nestjs/common';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { ObjectId } from 'mongodb';
import { UpdateRouteHandlersUsecase } from '../cloud-code-usecases/update-route-handlers.usecase';
import { UpdateEndpointCodeInAppUsecase } from './update-endpoint-code-in-app.usecase';

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
  private readonly logger = new Logger(CreateEndpointUsecase.name);

  constructor(
    private readonly endpointsRepo: EndpointsRepository,
    private readonly updateRouteHandlersUsecase: UpdateRouteHandlersUsecase,
    private readonly updateEndpointCodeInAppUsecase: UpdateEndpointCodeInAppUsecase
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
    this.logger.log('new endpoint record added in db')
    await this.updateEndpointCodeInAppUsecase.execute(endpoint);
    await this.updateRouteHandlersUsecase.execute(data.applicationId)
    this.logger.log('route handlers updated and builded');
    return endpoint;
  }
}
