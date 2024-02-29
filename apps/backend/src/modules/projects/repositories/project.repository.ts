import { Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { Repository } from '@api-assistant/repository';

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor() {
    super('projects');
  }
}
