import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { Injectable } from '@nestjs/common';

interface DeleteEndpointsUsecaseInput {
  id: ObjectId;
  createdBy: ObjectId;
  applicationId: ObjectId;
}

@Injectable()
export class DeleteEndpointsUsecase
  implements Usecase<DeleteEndpointsUsecaseInput, void>
{
  constructor(
    private readonly repo: EndpointsRepository
  ) {}

  async execute(data: DeleteEndpointsUsecaseInput): Promise<void> {
    await this.repo.deleteOne({
      _id: data.id,
      createdBy: data.createdBy,
      applicationId: data.applicationId,
    });
    return;
  }
}
