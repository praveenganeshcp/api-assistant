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
      .aggregate([
        {
          $lookup: {
            from: "endpoints",
            localField: "_id",
            foreignField: "applicationId",
            as: "endpoints"
          },
        }
      ])
      .then((applications) => {
        const allApps =  applications as Array<ApplicationDashboardView & {endpoints: []}>
        return allApps.map((application) => ({
          _id: application._id.toString(),
          name: application.name,
          endpointsCount: application.endpoints.length,
          createdOn: application.createdOn,
          createdBy: application.createdBy
        }));
      });
  }
}
