import { Injectable } from '@nestjs/common';
import { ProjectMetadata } from '../entities/project-metadata.entity';
import { Repository } from '@api-assistant/repository';

@Injectable()
export class ProjectMetadataRepository extends Repository<ProjectMetadata> {
  constructor() {
    super('project_metadata');
  }
}
