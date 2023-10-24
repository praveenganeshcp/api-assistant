import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../repository/abstract-repository';
import { DB_COLLECTIONS } from '../../repository/db-collections';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectRepository extends AbstractRepository<Project> {
  constructor() {
    super(DB_COLLECTIONS.PROJECTS);
  }
}
