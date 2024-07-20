import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { ProjectRepository } from '../repositories/project.repository';
import { Project } from '../entities/project.entity';

@Injectable()
export class FetchProjectsByUserIdUsecase
  implements Usecase<ObjectId, Array<Project>>
{
  constructor(private projectRepo: ProjectRepository) {}

  execute(userId: ObjectId): Promise<Project[]> {
    return this.projectRepo.findAll({ createdBy: userId });
  }
}
