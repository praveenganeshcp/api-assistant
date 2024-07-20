import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { ApplicationRepository } from '../../repositories/application.repository';
import { ApplicationDashboardView } from '@api-assistant/application-core';

@Injectable()
export class FetchApplicationsByUserIdUsecase
  implements Usecase<ObjectId, ApplicationDashboardView[]>
{
  constructor(private readonly applicationRepo: ApplicationRepository) {}

  execute(userId: ObjectId): Promise<ApplicationDashboardView[]> {
    return this.applicationRepo
      .findAll({ createdBy: userId })
      .then((applications) => {
        return applications.map((application) => ({
          ...application,
          endpointsCount: 2,
          usersCount: 3,
          _id: application._id.toString(),
        }));
      });
  }
}
