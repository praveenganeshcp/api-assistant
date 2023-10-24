import { Injectable } from '@nestjs/common';
import { Usecase, CanBeNull } from '@api-assistant/utils';
import { ObjectId } from 'mongodb';
import { ProjectWithMetadata } from '../entities/project-metadata.entity';
import { ProjectRepository } from '../repositories/project.repository';

interface FetchProjectDetailByIdUsecaseInput {
  userId: ObjectId;
  projectId: ObjectId;
}

@Injectable()
export class FetchProjectByIdUsecase
  implements
    Usecase<FetchProjectDetailByIdUsecaseInput, CanBeNull<ProjectWithMetadata>>
{
  constructor(private projectRepo: ProjectRepository) {}

  async execute({
    userId,
    projectId,
  }: FetchProjectDetailByIdUsecaseInput): Promise<
    CanBeNull<ProjectWithMetadata>
  > {
    const result: [ProjectWithMetadata] = await this.projectRepo.aggregate<
      [ProjectWithMetadata]
    >([
      { $match: { _id: projectId, createdBy: userId } },
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
    return Array.isArray(result) ? result[0] : null;
  }
}
