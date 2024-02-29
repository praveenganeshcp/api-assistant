import { Injectable } from '@nestjs/common';
import { ProjectMetadata } from '../entities/project-metadata.entity';
import { AbstractRepository } from '@api-assistant/repository';

@Injectable()
export class ProjectMetadataRepository extends AbstractRepository<ProjectMetadata> {
  constructor() {
    super('project_metadata');
  }
}
