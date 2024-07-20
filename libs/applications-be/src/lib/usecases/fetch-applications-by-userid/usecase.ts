import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { ApplicationRepository } from '../../repositories/application.repository';
import { Application } from '@api-assistant/application-core';

@Injectable()
export class FetchApplicationsByUserIdUsecase
  implements Usecase<ObjectId, Application[]>
{
  constructor(private readonly applicationRepo: ApplicationRepository) {}

  execute(userId: ObjectId): Promise<Application[]> {
    return this.applicationRepo.findAll({ createdBy: userId });
  }
}
