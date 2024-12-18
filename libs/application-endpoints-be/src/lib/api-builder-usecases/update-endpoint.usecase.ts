import { CanBeNull, Usecase, valueIsDefined } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { Endpoint } from '../entities';
import { Injectable } from '@nestjs/common';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { UpdateRouteHandlersUsecase } from '../cloud-code-usecases/update-route-handlers.usecase';
import { UpdateEndpointCodeInAppUsecase } from './update-endpoint-code-in-app.usecase';

interface UpdateEndpointUsecaseInput {
  id: ObjectId;
  details: Pick<
    Endpoint,
    | 'name'
    | 'url'
    | 'response'
    | 'crud'
    | 'description'
    | 'validations'
    | 'method'
    | 'isAuthenticated'
    | 'requestHandler'
  >;
  userId: ObjectId;
  applicationId: ObjectId;
  skipCloudCodeUpdate: boolean
}

@Injectable()
export class UpdateEndpointUsecase
  implements Usecase<UpdateEndpointUsecaseInput, CanBeNull<Endpoint>>
{
  constructor(
    private readonly repo: EndpointsRepository,
    private readonly updateRouteHandlersUsecase: UpdateRouteHandlersUsecase,
    private readonly updateEndpointInAppUsecase: UpdateEndpointCodeInAppUsecase
  ) {}

  async execute(
    data: UpdateEndpointUsecaseInput
  ): Promise<CanBeNull<Endpoint>> {
    await this.repo.updateOne(
      {
        _id: data.id,
        createdBy: data.userId,
        applicationId: data.applicationId,
      },
      {
        $set: {
          name: data.details.name,
          url: data.details.url,
          crud: data.details.crud,
          response: data.details.response,
          description: data.details.description,
          validations: data.details.validations,
          method: data.details.method,
          isAuthenticated: data.details.isAuthenticated,
          requestHandler: data.details.requestHandler
        },
      }
    );
    const updatedEndpoint = await this.repo.findOne({ _id: data.id })
    if(valueIsDefined(updatedEndpoint) && !data.skipCloudCodeUpdate) {
      await this.updateEndpointInAppUsecase.execute(updatedEndpoint);
      await this.updateRouteHandlersUsecase.execute(data.applicationId);
    }
    return updatedEndpoint;
  }
}
