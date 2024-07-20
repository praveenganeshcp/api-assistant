import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { Injectable } from '@nestjs/common';
import { MinimalEndpointInfo } from '../models';

interface GetAllEndpointsMinimalInfoUsecaseInput {
  userId: ObjectId;
  applicationId: ObjectId;
}

@Injectable()
export class GetAllEndpointsMinimalInfoUsecase
  implements
    Usecase<GetAllEndpointsMinimalInfoUsecaseInput, MinimalEndpointInfo[]>
{
  constructor(private readonly endpointsRepository: EndpointsRepository) {}

  execute(
    data: GetAllEndpointsMinimalInfoUsecaseInput
  ): Promise<MinimalEndpointInfo[]> {
    return this.endpointsRepository
      .findAll({
        applicationId: data.applicationId,
        createdBy: data.userId,
      })
      .then((allEndpoints) => {
        return allEndpoints.map((endpoint) => {
          const endpointMinimalInfo: MinimalEndpointInfo = {
            _id: endpoint._id,
            name: endpoint.name,
            description: endpoint.description,
            url: endpoint.url,
            createdOn: endpoint.createdOn,
            applicationId: endpoint.applicationId,
          };
          return endpointMinimalInfo;
        });
      });
  }
}
