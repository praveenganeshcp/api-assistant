import { Injectable } from '@nestjs/common';
import { Repository } from '@api-assistant/repository';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor() {
    super('projects');
  }
}
