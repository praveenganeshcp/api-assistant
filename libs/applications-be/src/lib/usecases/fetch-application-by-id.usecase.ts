import { Application } from '@api-assistant/application-core';
import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { ApplicationRepository } from '../repositories/application.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchApplicationByIdUsecase
  implements Usecase<ObjectId, CanBeNull<Application>>
{
  constructor(private readonly applicationRepo: ApplicationRepository) {}

  execute(applicationId: ObjectId): Promise<CanBeNull<Application>> {
    return this.applicationRepo.findOne({ _id: applicationId });
  }
}
