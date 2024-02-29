import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons';
import { Project } from '../entities/project.entity';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectMetadataRepository } from '../repositories/project-metadata.repository';
import { ObjectId } from 'mongodb';
import {
  ProjectMetadata,
  ProjectWithMetadata,
} from '../entities/project-metadata.entity';

import { createHash } from 'crypto';

interface CreateProjectUsecaseInput {
  createdBy: ObjectId;
  name: string;
}

@Injectable()
export class CreateProjectUsecase
  implements Usecase<CreateProjectUsecaseInput, Project>
{
  constructor(
    private projectRepo: ProjectRepository,
    private projectMetadataRepo: ProjectMetadataRepository
  ) {}

  async execute({
    name,
    createdBy,
  }: CreateProjectUsecaseInput): Promise<ProjectWithMetadata> {
    const project = await this.projectRepo.save({
      name,
      createdBy,
      createdOn: new Date(),
    });
    const projectMetadata: ProjectMetadata =
      await this.projectMetadataRepo.save({
        projectId: project._id,
        count: {
          createAction: 0,
          readAction: 0,
          updateAction: 0,
          deleteAction: 0,
          aggregate: 0,
        },
        apiKey: this.createApiProjectKey(project._id.toString()),
        apiKeyLastGeneratedOn: new Date(),
        noOfFiles: 0,
        storage: 0,
        users: 0,
      });
    return {
      ...project,
      metadata: projectMetadata,
    };
  }

  createApiProjectKey(projectId: string): string {
    return createHash('sha256')
      .update(projectId + Date.now())
      .digest('hex');
  }
}
