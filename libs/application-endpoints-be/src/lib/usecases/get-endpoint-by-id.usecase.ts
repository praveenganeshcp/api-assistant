import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { Endpoint } from '../entities';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { Injectable } from '@nestjs/common';

interface GetEndpointByIdUsecaseInput {
  id: ObjectId;
  applicationId: ObjectId;
  userId: ObjectId;
}

@Injectable()
export class GetEndpointByIdUsecase
  implements Usecase<GetEndpointByIdUsecaseInput, CanBeNull<Endpoint>>
{
  constructor(private readonly endpointsRepository: EndpointsRepository) {}

  execute(data: GetEndpointByIdUsecaseInput): Promise<CanBeNull<Endpoint>> {
    return this.endpointsRepository.findOne({
      _id: data.id,
      applicationId: data.applicationId,
      createdBy: data.userId,
    });
  }
}
