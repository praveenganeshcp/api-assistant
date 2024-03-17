import { Injectable } from '@nestjs/common';
import { Repository } from '@api-assistant/repository';
import { ProjectMetadata } from '../entities/project-metadata.entity';

@Injectable()
export class ProjectMetadataRepository extends Repository<ProjectMetadata> {
  constructor() {
    super('project_metadata');
  }
}
