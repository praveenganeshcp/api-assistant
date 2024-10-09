import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import { Endpoint } from '../entities';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

interface GetEndpointByURLUsecaseInput {
  endpointUrl: string;
  applicationId: ObjectId;
}
@Injectable()
export class GetEndpointByURLUsecase
  implements Usecase<GetEndpointByURLUsecaseInput, CanBeNull<Endpoint>>
{
  constructor(private readonly endpointsRepo: EndpointsRepository) {}

  execute(input: GetEndpointByURLUsecaseInput): Promise<CanBeNull<Endpoint>> {
    return this.endpointsRepo.findOne({
      url: input.endpointUrl,
      applicationId: input.applicationId,
    });
  }
}
