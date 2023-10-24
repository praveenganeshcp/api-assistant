import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../repository/abstract-repository';
import { DB_COLLECTIONS } from '../../repository/db-collections';
import { ProjectMetadata } from '../entities/project-metadata.entity';

@Injectable()
export class ProjectMetadataRepository extends AbstractRepository<ProjectMetadata> {
  constructor() {
    super(DB_COLLECTIONS.PROJECT_METADATA);
  }
}
