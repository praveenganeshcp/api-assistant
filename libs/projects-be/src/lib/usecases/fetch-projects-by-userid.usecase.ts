import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectWithMetadata } from '../entities/project-metadata.entity';

@Injectable()
export class FetchProjectsByUserIdUsecase
  implements Usecase<ObjectId, Array<ProjectWithMetadata>>
{
  constructor(private projectRepo: ProjectRepository) {}

  execute(userId: ObjectId): Promise<ProjectWithMetadata[]> {
    return this.projectRepo.aggregate<Array<ProjectWithMetadata>>([
      { $match: { createdBy: userId } },
      {
        $lookup: {
          from: 'project_metadata',
          localField: '_id',
          foreignField: 'projectId',
          as: 'metadata',
        },
      },
      {
        $unwind: '$metadata',
      },
    ]);
  }
}