import { Usecase } from '@api-assistant/commons-be';
import { Endpoint } from '../entities';
import { Injectable } from '@nestjs/common';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { ObjectId } from 'mongodb';

export interface CreateEndpointUsecaseInput
  extends Pick<
    Endpoint,
    'crud' | 'description' | 'name' | 'response' | 'url' | 'validations' | 'method'
  > {
  createdBy: ObjectId;
  applicationId: ObjectId;
}

@Injectable()
export class CreateEndpointUsecase
  implements Usecase<CreateEndpointUsecaseInput, Endpoint>
{
  constructor(private readonly endpointsRepo: EndpointsRepository) {}

  execute(data: CreateEndpointUsecaseInput): Promise<Endpoint> {
    return this.endpointsRepo.save({
      name: data.name,
      url: data.url,
      description: data.description,
      crud: data.crud,
      response: data.response,
      createdBy: data.createdBy,
      createdOn: new Date(),
      applicationId: data.applicationId,
      validations: data.validations,
      method: data.method
    });
  }
}
