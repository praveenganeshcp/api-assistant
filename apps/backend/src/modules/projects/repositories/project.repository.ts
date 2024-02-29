import { Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { AbstractRepository } from '@api-assistant/repository';

@Injectable()
export class ProjectRepository extends AbstractRepository<Project> {
  constructor() {
    super('projects');
  }
}
