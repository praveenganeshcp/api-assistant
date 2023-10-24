import { Injectable } from '@angular/core';
import { ProjectRepository } from '../repositories/project.repository';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private projectRepsitory: ProjectRepository) {}

  public loadProjects() {
    return this.projectRepsitory.loadProjects();
  }

  public createProject(name: string) {
    return this.projectRepsitory.createProject(name);
  }
}
