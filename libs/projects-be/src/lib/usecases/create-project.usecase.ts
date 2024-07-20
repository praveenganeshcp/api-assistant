import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { ProjectRepository } from '../repositories/project.repository';
import { ObjectId } from 'mongodb';

import { createHash } from 'crypto';
import { Project } from '../entities/project.entity';
import { CreateAllBuiltinEndpointsUsecase } from '@api-assistant/endpoints-be';

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
    private readonly createAllBuiltinEndpointsUsecase: CreateAllBuiltinEndpointsUsecase
  ) {}

  async execute({
    name,
    createdBy,
  }: CreateProjectUsecaseInput): Promise<Project> {
    const project = await this.projectRepo.save({
      name,
      createdBy,
      createdOn: new Date(),
    });
    await this.createAllBuiltinEndpointsUsecase.execute({
      userId: createdBy,
      projectId: project._id
    })
    return project;
  }

  createApiProjectKey(projectId: string): string {
    return createHash('sha256')
      .update(projectId + Date.now())
      .digest('hex');
  }
}
